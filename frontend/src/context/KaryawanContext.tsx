"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '@/lib/axios';

export interface Karyawan {
    id: number;
    nik: string;
    nama: string;
    divisi: string;
    jadwalJamKerja: string;
}

interface KaryawanContextType {
    karyawan: Karyawan[];
    loading: boolean;
    addKaryawan: (item: Omit<Karyawan, 'id'>) => Promise<void>;
    deleteKaryawan: (id: number) => Promise<void>;
    refreshKaryawan: () => Promise<void>;
}

const KaryawanContext = createContext<KaryawanContextType | null>(null);

export function KaryawanProvider({ children }: { children: ReactNode }) {
    const [karyawan, setKaryawan] = useState<Karyawan[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchKaryawan = async () => {
        try {
            const res = await api.get('/karyawan');
            setKaryawan(res.data);
        } catch (err) {
            console.error('Gagal fetch karyawan:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKaryawan();
    }, []);

    const addKaryawan = async (item: Omit<Karyawan, 'id'>) => {
        const res = await api.post('/karyawan', item);
        setKaryawan((prev) => [...prev, res.data]);
    };

    const deleteKaryawan = async (id: number) => {
        await api.delete(`/karyawan/${id}`);
        setKaryawan((prev) => prev.filter((k) => k.id !== id));
    };

    const refreshKaryawan = async () => {
        await fetchKaryawan();
    };

    return (
        <KaryawanContext.Provider value={{ karyawan, loading, addKaryawan, deleteKaryawan, refreshKaryawan }}>
            {children}
        </KaryawanContext.Provider>
    );
}

export function useKaryawan() {
    const ctx = useContext(KaryawanContext);
    if (!ctx) throw new Error('useKaryawan must be used within KaryawanProvider');
    return ctx;
}
