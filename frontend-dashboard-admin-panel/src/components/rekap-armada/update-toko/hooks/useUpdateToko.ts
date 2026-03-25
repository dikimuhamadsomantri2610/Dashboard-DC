import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
    fetchToko, createToko, updateToko, deleteToko,
    type TokoItem
} from '../services/toko.service';

export const useUpdateToko = () => {
    const [data, setData] = useState<TokoItem[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    const [site, setSite] = useState('');
    const [inisial, setInisial] = useState('');
    const [namaToko, setNamaToko] = useState('');
    const [alamatToko, setAlamatToko] = useState('');

    const loadToko = async () => {
        try {
            const result = await fetchToko();
            setData(result);
        } catch {
            toast.error('Gagal memuat data toko');
        }
    };

    useEffect(() => { loadToko(); }, []);

    const resetForm = () => {
        setSite(''); setInisial(''); setNamaToko(''); setAlamatToko('');
        setEditId(null); setShowForm(false);
    };

    const handleEdit = (item: TokoItem) => {
        setSite(item.site);
        setInisial(item.inisialToko);
        setNamaToko(item.namaToko);
        setAlamatToko(item.alamatToko !== '-' ? item.alamatToko : '');
        setEditId(item.id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRemove = async (id: number) => {
        if (!confirm('Apakah anda yakin ingin menghapus data toko ini?')) return;
        try {
            await deleteToko(id);
            toast.success('Data toko berhasil dihapus');
            loadToko();
        } catch {
            toast.error('Gagal menghapus data toko');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!site.trim() || !inisial.trim() || !namaToko.trim()) return;
        setIsLoading(true);
        try {
            const payload = {
                site: site.trim(), inisialToko: inisial.trim(),
                namaToko: namaToko.trim(), alamatToko: alamatToko.trim(),
            };
            if (editId) {
                await updateToko(editId, payload);
                toast.success('Data toko berhasil diupdate');
            } else {
                await createToko(payload);
                toast.success('Data toko berhasil ditambahkan');
            }
            loadToko(); resetForm();
        } catch {
            toast.error('Gagal menyimpan data toko');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        data, showForm, setShowForm, isLoading, editId,
        site, setSite, inisial, setInisial,
        namaToko, setNamaToko, alamatToko, setAlamatToko,
        resetForm, handleEdit, handleRemove, handleSubmit,
    };
};
