import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { fetchUsers, deleteUser, updateUser, createUser } from '../services/data-user.service';

export interface UserItem {
    id: number;
    username: string;
    namaLengkap: string;
}

export const useDataUser = () => {
    const [data, setData] = useState<UserItem[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    // Field form
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [namaLengkap, setNamaLengkap] = useState('');

    const loadUsers = async () => {
        try {
            const data = await fetchUsers();
            setData(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Gagal memuat data user');
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const resetForm = () => {
        setUsername(''); setPassword(''); setNamaLengkap('');
        setEditId(null);
        setShowForm(false);
    };

    const handleEdit = (item: UserItem) => {
        setUsername(item.username);
        setNamaLengkap(item.namaLengkap);
        setPassword(''); // Kosongkan password saat edit, diisi hanya jika ingin diubah
        setEditId(item.id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRemove = async (id: number) => {
        if (!confirm('Apakah anda yakin ingin menghapus data user ini?')) return;

        try {
            await deleteUser(id);
            toast.success('Data user berhasil dihapus');
            loadUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Gagal menghapus data user');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !namaLengkap.trim()) {
            toast.error('Gagal', { description: 'Mohon lengkapi username dan nama lengkap' });
            return;
        }

        if (!editId && !password.trim()) {
            toast.error('Gagal', { description: 'Password wajib diisi untuk user baru' });
            return;
        }

        setIsLoading(true);
        try {
            const payload: any = {
                username: username.trim(),
                namaLengkap: namaLengkap.trim()
            };
            if (password.trim()) {
                payload.password = password.trim();
            }

            if (editId) {
                await updateUser(editId, payload);
                toast.success('Data user berhasil diupdate');
            } else {
                await createUser(payload);
                toast.success('Data user berhasil ditambahkan');
            }

            loadUsers();
            resetForm();
        } catch (error: any) {
            console.error('Error saving user:', error);
            const errMsg = error.response?.data?.error || 'Gagal menyimpan data user';
            toast.error(errMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        data,
        showForm,
        setShowForm,
        isLoading,
        editId,
        username,
        setUsername,
        password,
        setPassword,
        namaLengkap,
        setNamaLengkap,
        resetForm,
        handleEdit,
        handleRemove,
        handleSubmit
    };
};
