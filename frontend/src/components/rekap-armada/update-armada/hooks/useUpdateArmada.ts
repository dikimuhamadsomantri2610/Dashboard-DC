import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
    fetchArmada, createArmada, updateArmada, deleteArmada,
    type ArmadaItem
} from '../services/armada.service';

export const useUpdateArmada = () => {
    const [data, setData] = useState<ArmadaItem[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    const [noMobil, setNoMobil] = useState('');
    const [jenisArmada, setJenisArmada] = useState('');
    const [namaDriver, setNamaDriver] = useState('');
    const [vendor, setVendor] = useState('');
    const [status, setStatus] = useState('Aktif');

    const loadArmada = async () => {
        try {
            const result = await fetchArmada();
            setData(result);
        } catch {
            toast.error('Gagal memuat data armada');
        }
    };

    useEffect(() => { loadArmada(); }, []);

    const resetForm = () => {
        setNoMobil(''); setJenisArmada(''); setNamaDriver('');
        setVendor(''); setStatus('Aktif');
        setEditId(null); setShowForm(false);
    };

    const handleEdit = (item: ArmadaItem) => {
        setNoMobil(item.noMobil);
        setJenisArmada(item.jenisArmada);
        setNamaDriver(item.namaDriver);
        setVendor(item.vendor !== '-' ? item.vendor : '');
        setStatus(item.status);
        setEditId(item.id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRemove = async (id: number) => {
        if (!confirm('Apakah anda yakin ingin menghapus data armada ini?')) return;
        try {
            await deleteArmada(id);
            toast.success('Data armada berhasil dihapus');
            loadArmada();
        } catch {
            toast.error('Gagal menghapus data armada');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!noMobil.trim() || !jenisArmada.trim() || !namaDriver.trim() || !vendor.trim()) {
            toast.error('Gagal', { description: 'Mohon lengkapi semua field yang wajib' });
            return;
        }
        setIsLoading(true);
        try {
            const payload = {
                no_armada: noMobil.trim(), jenis_armada: jenisArmada.trim(),
                nama_driver: namaDriver.trim(), vendor: vendor.trim(),
                status: status.trim() || 'Aktif',
            };
            if (editId) {
                await updateArmada(editId, payload);
                toast.success('Data armada berhasil diupdate');
            } else {
                await createArmada(payload);
                toast.success('Data armada berhasil ditambahkan');
            }
            loadArmada(); resetForm();
        } catch {
            toast.error('Gagal menyimpan data armada');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        data, showForm, setShowForm, isLoading, editId,
        noMobil, setNoMobil, jenisArmada, setJenisArmada,
        namaDriver, setNamaDriver, vendor, setVendor, status, setStatus,
        resetForm, handleEdit, handleRemove, handleSubmit,
    };
};
