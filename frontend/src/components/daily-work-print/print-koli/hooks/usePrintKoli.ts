"use client";
import { useState, useEffect, useCallback } from 'react';
import { fetchPrintKoli } from '../services/print-koli.service';
import { toast } from 'sonner';

export const usePrintKoli = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    // Form State
    const [tanggal, setTanggal] = useState('');
    const [urutanAwal, setUrutanAwal] = useState('1');
    const [urutanAkhir, setUrutanAkhir] = useState('999');

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetchPrintKoli(); // Keep network call for loader effect
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleProses = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate processing
        setTimeout(() => {
            setIsProcessing(false);
            toast.success('Proses Berhasil', {
                description: `Memuat data untuk urutan toko ${urutanAwal} - ${urutanAkhir} `,
            });
            fetchData();
        }, 1000);
    };

    const handlePrint = () => {
        window.print();
    };

    return {
        isLoading,
        isProcessing,
        tanggal,
        setTanggal,
        urutanAwal,
        setUrutanAwal,
        urutanAkhir,
        setUrutanAkhir,
        handleProses,
        handlePrint,
        fetchData
    };
};
