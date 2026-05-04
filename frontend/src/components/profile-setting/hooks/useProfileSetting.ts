"use client";
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { updateProfile } from '../services/profile.service';

export const useProfileSetting = () => {
    const { user, login } = useAuth();

    const [username, setUsername] = useState('');
    const [namaLengkap, setNamaLengkap] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
            setNamaLengkap((user as any).namaLengkap || '');
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!namaLengkap.trim()) {
            toast.error('Gagal', { description: 'Nama Lengkap tidak boleh kosong' });
            return;
        }

        if (password && password !== confirmPassword) {
            toast.error('Gagal', { description: 'Konfirmasi password tidak cocok' });
            return;
        }

        setIsLoading(true);
        try {
            const payload: any = {
                namaLengkap: namaLengkap.trim()
            };
            if (password) {
                payload.password = password.trim();
            }

            const res = await updateProfile(payload);

            // Re-authenticate silently if the backend returns a new token
            if (res.token) {
                login(res.token);
            }

            toast.success('Profil berhasil diperbarui');
            setPassword('');
            setConfirmPassword('');

        } catch (error: any) {
            console.error('Error updating profile:', error);
            const errMsg = error.response?.data?.error || 'Gagal memperbarui profil';
            toast.error(errMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        username,
        namaLengkap,
        setNamaLengkap,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        handleSubmit
    };
};
