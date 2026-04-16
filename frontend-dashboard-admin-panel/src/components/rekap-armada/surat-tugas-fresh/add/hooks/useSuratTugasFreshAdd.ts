"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchSuratTugasFresh, deleteSuratTugasFresh, createSuratTugasFresh, fetchDistributionCenters } from '../../services/surat-tugas-fresh.service';
import { fetchArmadaList } from '../../../surat-tugas/services/surat-tugas.service';
import { fetchToko, type TokoItem } from '../../../update-toko/services/toko.service';
import { toast } from 'sonner';
import { type GembokFreshEntry, emptyFreshEntry } from '../types/surat-tugas-fresh-add.types';
import type { SuratTugasFreshApiItem } from '../../types/surat-tugas-fresh.types';

interface ArmadaItem {
    id: number;
    noArmada: string;
    namaDriver: string;
}

interface DcItem {
    id: number;
    inisialDc: string;
    namaDc: string;
}

export const useSuratTugasFreshAdd = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const groupId = searchParams?.get('groupId');
    const isEditMode = !!groupId;

    const [noMobil, setNoMobil] = useState('');
    const [dc, setDc] = useState('');
    const [namaDriver, setNamaDriver] = useState('');
    const [tanggalKirim, setTanggalKirim] = useState<string>(new Date().toISOString().split('T')[0]);
    const [entries, setEntries] = useState<GembokFreshEntry[]>([emptyFreshEntry()]);
    const [editItemIds, setEditItemIds] = useState<number[]>([]);
    
    const [armadaList, setArmadaList] = useState<ArmadaItem[]>([]);
    const [dcList, setDcList] = useState<DcItem[]>([]);
    const [tokoList, setTokoList] = useState<TokoItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingEdit, setIsFetchingEdit] = useState(false);

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

    // Fetch daftar DC
    useEffect(() => {
        const getDcList = async () => {
            try {
                const resData = await fetchDistributionCenters();
                setDcList(resData);
                if (resData.length > 0 && !dc) {
                    setDc(resData[0].inisialDc);
                }
            } catch (error) {
                console.error("Gagal mengambil data DC:", error);
            }
        };
        getDcList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Fetch daftar Toko
    useEffect(() => {
        const getTokoList = async () => {
            try {
                const resData = await fetchToko();
                setTokoList(resData);
            } catch (error) {
                console.error("Gagal mengambil data Toko:", error);
            }
        };
        getTokoList();
    }, []);

    useEffect(() => {
        if (!isEditMode || !groupId) return;

        const fetchAndPopulate = async () => {
            setIsFetchingEdit(true);
            try {
                const allItems = await fetchSuratTugasFresh() as SuratTugasFreshApiItem[];

                const groupItems = allItems.filter((item) => {
                    const timeKey = new Date(item.createdAt).toISOString().slice(0, 16);
                    const itemGroupId = `${item.noArmada}-${item.namaDriver}-${timeKey}`;
                    return itemGroupId === groupId;
                });

                if (groupItems.length === 0) {
                    toast.error('Data tidak ditemukan', { description: 'Grup surat tugas fresh tidak ditemukan.' });
                    router.push('/rekap-armada/surat-tugas-fresh');
                    return;
                }

                setNoMobil(groupItems[0].noArmada);
                setDc(groupItems[0].dc || '');
                setNamaDriver(groupItems[0].namaDriver);
                if (groupItems[0].tanggalKirim) {
                    setTanggalKirim(new Date(groupItems[0].tanggalKirim).toISOString().split('T')[0]);
                }

                setEditItemIds(groupItems.map((i) => i.id));
                const filledEntries: GembokFreshEntry[] = groupItems.map((item) => ({
                    numberSeal: item.numberSeal || '',
                    inisialToko: item.inisialToko || '',
                    jumlahContainer: String(item.jumlahContainer ?? ''),
                    jumlahBox: String(item.jumlahBox ?? ''),
                    jumlahDus: String(item.jumlahDus ?? ''),
                    kodeGembok: item.kodeGembok || '',
                }));
                setEntries(filledEntries);
            } catch (error) {
                console.error('Gagal fetch data edit surat tugas fresh:', error);
                toast.error('Gagal memuat data', { description: 'Tidak dapat mengambil data surat tugas fresh.' });
            } finally {
                setIsFetchingEdit(false);
            }
        };

        fetchAndPopulate();
    }, [groupId, isEditMode, router]);

    const handleNoMobilChange = (value: string) => {
        setNoMobil(value);
        const matchingArmada = armadaList.find(a => a.noArmada.toLowerCase() === value.toLowerCase());
        if (matchingArmada) {
            setNamaDriver(matchingArmada.namaDriver || '');
        }
    };

    const updateEntry = (index: number, field: keyof GembokFreshEntry, value: string) => {
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
        if (!lastEntry.numberSeal || !lastEntry.inisialToko || !lastEntry.kodeGembok) {
            toast.error('Data Belum Lengkap', { description: 'Pastikan semua inputan pada toko sebelumnya telah diisi sebelum menambah toko baru.' });
            return;
        }
        setEntries(prev => {
            const firstSeal = prev.length > 0 ? prev[0].numberSeal : '';
            const firstGembok = prev.length > 0 ? prev[0].kodeGembok : '';
            return [...prev, { ...emptyFreshEntry(), numberSeal: firstSeal, kodeGembok: firstGembok }];
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
                await Promise.all(editItemIds.map(id => deleteSuratTugasFresh(id)));
            }

            await createSuratTugasFresh({ noMobil, dc, namaDriver, tanggalKirim, entries });

            toast.success(isEditMode ? 'Berhasil Diperbarui' : 'Berhasil', {
                description: isEditMode ? 'Data Surat Tugas Fresh armada berhasil diperbarui.' : 'Data Surat Tugas Fresh armada berhasil disimpan.'
            });
            router.push('/rekap-armada/surat-tugas-fresh');
        } catch (error) {
            console.error('Submit Surat Tugas Fresh error:', error);
            const msg = error instanceof Error ? error.message : 'Terjadi kesalahan saat menyimpan data.';
            toast.error('Gagal Menyimpan', { description: msg });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isEditMode, noMobil, dc, setDc, dcList, namaDriver, setNamaDriver, tanggalKirim, setTanggalKirim,
        entries, armadaList, tokoList, isLoading, isFetchingEdit, handleNoMobilChange,
        updateEntry, addEntry, removeEntry, handleSubmit, router
    };
};
