import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchArmadaList, fetchSuratTugas, deleteSuratTugas, createSuratTugas } from '../../services/surat-tugas.service';
import { toast } from 'sonner';
import { type GembokEntry, emptyEntry } from '../types/surat-tugas-add.types';

export const useSuratTugasAdd = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const groupId = searchParams.get('groupId');
    const isEditMode = !!groupId;

    const [noMobil, setNoMobil] = useState('');
    const [dc, setDc] = useState('DC GBG');
    const [namaDriver, setNamaDriver] = useState('');
    const [tanggalKirim, setTanggalKirim] = useState<string>(new Date().toISOString().split('T')[0]);
    const [entries, setEntries] = useState<GembokEntry[]>([emptyEntry()]);
    const [editItemIds, setEditItemIds] = useState<number[]>([]);
    
    // State tambahan untuk saran Armada
    const [armadaList, setArmadaList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingEdit, setIsFetchingEdit] = useState(false);

    // Fetch daftar armada
    useEffect(() => {
        const getArmadaList = async () => {
            try {
                const resData = await fetchArmadaList();
                setArmadaList(resData);
            } catch (error) {
                console.error("Gagal mengambil data armada:", error);
            }
        };
        getArmadaList();
    }, []);

    // Fetch edit data
    useEffect(() => {
        if (!isEditMode || !groupId) return;

        const fetchAndPopulate = async () => {
            setIsFetchingEdit(true);
            try {
                const allItems: any[] = await fetchSuratTugas();

                const groupItems = allItems.filter((item: any) => {
                    const timeKey = new Date(item.createdAt).toISOString().slice(0, 16);
                    const itemGroupId = `${item.no_armada}-${item.nama_driver}-${timeKey}`;
                    return itemGroupId === groupId;
                });

                if (groupItems.length === 0) {
                    toast.error('Data tidak ditemukan', { description: 'Grup surat tugas tidak ditemukan.' });
                    navigate('/rekap-armada/surat-tugas');
                    return;
                }

                setNoMobil(groupItems[0].no_armada);
                setDc(groupItems[0].dc || 'DC GBG');
                setNamaDriver(groupItems[0].nama_driver);
                if (groupItems[0].tanggalKirim) {
                    setTanggalKirim(new Date(groupItems[0].tanggalKirim).toISOString().split('T')[0]);
                }

                setEditItemIds(groupItems.map((i: any) => i.id));
                const filledEntries: GembokEntry[] = groupItems.map((item: any) => ({
                    numberSeal: item.number_seal || '',
                    loadNumber: item.load_number || '',
                    inisialToko: item.inisial_toko || '',
                    jumlahContainer: String(item.jumlah_container ?? ''),
                    jumlahKoli: String(item.jumlah_koli ?? ''),
                    keterangan: item.keterangan || 'R',
                    materai: item.materai || 'Tidak',
                    kodeGembok: item.kodeGembok || '',
                }));
                setEntries(filledEntries);
            } catch (error) {
                console.error('Gagal fetch data edit surat tugas:', error);
                toast.error('Gagal memuat data', { description: 'Tidak dapat mengambil data surat tugas.' });
            } finally {
                setIsFetchingEdit(false);
            }
        };

        fetchAndPopulate();
    }, [groupId, isEditMode, navigate]);

    const handleNoMobilChange = (value: string) => {
        setNoMobil(value);
        const matchingArmada = armadaList.find(a => a.no_armada.toLowerCase() === value.toLowerCase());
        if (matchingArmada) {
            setNamaDriver(matchingArmada.nama_driver || '');
        }
    };

    const updateEntry = (index: number, field: keyof GembokEntry, value: string) => {
        setEntries(prev => {
            const newEntries = prev.map((e, i) => (i === index ? { ...e, [field]: value } : e));
            if (index === 0) {
                if (field === 'numberSeal') return newEntries.map(e => ({ ...e, numberSeal: value }));
                if (field === 'kodeGembok') return newEntries.map(e => ({ ...e, kodeGembok: value }));
            }
            return newEntries;
        });
    };

    const addEntry = () => {
        const lastEntry = entries[entries.length - 1];
        if (!lastEntry.numberSeal || !lastEntry.loadNumber || !lastEntry.inisialToko || !lastEntry.jumlahContainer || !lastEntry.jumlahKoli || !lastEntry.kodeGembok) {
            toast.error('Data Belum Lengkap', { description: 'Pastikan semua inputan pada toko sebelumnya telah diisi sebelum menambah toko baru.' });
            return;
        }
        setEntries(prev => {
            const firstSeal = prev.length > 0 ? prev[0].numberSeal : '';
            const firstGembok = prev.length > 0 ? prev[0].kodeGembok : '';
            return [...prev, { ...emptyEntry(), numberSeal: firstSeal, kodeGembok: firstGembok }];
        });
    };

    const removeEntry = (index: number) => {
        if (entries.length === 1) return;
        setEntries(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!noMobil || !namaDriver || entries.length === 0) {
            toast.error('Data Belum Lengkap', { description: 'Pastikan No Armada dan Nama Driver terisi dengan benar.' });
            return;
        }

        setIsLoading(true);
        try {
            if (isEditMode && editItemIds.length > 0) {
                await Promise.all(editItemIds.map(id => deleteSuratTugas(id)));
            }

            await createSuratTugas({ noMobil, dc, namaDriver, tanggalKirim, entries });

            toast.success(isEditMode ? 'Berhasil Diperbarui' : 'Berhasil', {
                description: isEditMode ? 'Data Surat Tugas armada berhasil diperbarui.' : 'Data Surat Tugas armada berhasil disimpan.'
            });
            navigate('/rekap-armada/surat-tugas');
        } catch (error: any) {
            console.error('Submit Surat Tugas error:', error);
            const msg = error.response?.data?.error || 'Terjadi kesalahan saat menyimpan data.';
            toast.error('Gagal Menyimpan', { description: msg });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isEditMode, noMobil, dc, setDc, namaDriver, setNamaDriver, tanggalKirim, setTanggalKirim,
        entries, armadaList, isLoading, isFetchingEdit, handleNoMobilChange, 
        updateEntry, addEntry, removeEntry, handleSubmit, navigate
    };
};
