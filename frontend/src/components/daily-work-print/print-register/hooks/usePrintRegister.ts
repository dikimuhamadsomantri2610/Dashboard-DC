import { useState, useEffect, useCallback } from 'react';
import { fetchPrintRegister } from '../services/print-register.service';
import { toast } from 'sonner';

export const usePrintRegister = () => {
    const [, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    // Form State
    const [tanggal, setTanggal] = useState('');
    const [urutanTokoAwal, setUrutanTokoAwal] = useState('1');
    const [urutanTokoAkhir, setUrutanTokoAkhir] = useState('999');
    const [urutanJalurAwal, setUrutanJalurAwal] = useState('1');
    const [urutanJalurAkhir, setUrutanJalurAkhir] = useState('999');

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await fetchPrintRegister();
            setData(data);
        } catch (error) {
            console.error(error);
            toast.error('Gagal memuat data', {
                description: 'Terjadi kesalahan saat mengambil data Register.',
            });
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
                description: `Memuat data berdasarkan filter yang diinputkan.`,
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
        urutanTokoAwal,
        setUrutanTokoAwal,
        urutanTokoAkhir,
        setUrutanTokoAkhir,
        urutanJalurAwal,
        setUrutanJalurAwal,
        urutanJalurAkhir,
        setUrutanJalurAkhir,
        handleProses,
        handlePrint,
        fetchData
    };
};
