import { useState } from 'react';
import { toast } from 'sonner';
import type { Step } from '../types';
import { checkNik, getServerTime, submitPresensi } from '../api/presensiApi';

export function usePresensi() {
    const [step, setStep] = useState<Step>('NIK');
    const [nik, setNik] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [serverTimeStr, setServerTimeStr] = useState('');

    // Form state
    const [jamAwal, setJamAwal] = useState('');
    const [jamTujuan, setJamTujuan] = useState('');
    const [jumlahJam, setJumlahJam] = useState('');
    const [tanggalMulai, setTanggalMulai] = useState('');
    const [tanggalAkhir, setTanggalAkhir] = useState('');

    const resetForm = () => {
        setStep('NIK');
        setNik('');
        setJamAwal('');
        setJamTujuan('');
        setJumlahJam('');
        setTanggalMulai('');
        setTanggalAkhir('');
        setServerTimeStr('');
    };

    const fetchServerTime = async (): Promise<string> => {
        try {
            const serverTime = await getServerTime();
            const formatted = new Date(serverTime).toLocaleString('id-ID', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
            });
            setServerTimeStr(formatted);
            return serverTime;
        } catch {
            toast.error('Gagal mengambil waktu server');
            return new Date().toISOString();
        }
    };

    const handleNikSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nik.trim()) {
            toast.error('NIK tidak boleh kosong!');
            return;
        }
        setIsLoading(true);
        try {
            await checkNik(nik);
            setStep('MENU');
        } catch (err: unknown) {
            const e = err as { response?: { data?: { message?: string } } };
            toast.error(e.response?.data?.message || 'NIK tidak terdaftar di database');
        } finally {
            setIsLoading(false);
        }
    };

    const handleMenuClick = async (nextStep: Step) => {
        if (['ABSEN', 'ISTIRAHAT', 'IZIN'].includes(nextStep)) {
            setIsLoading(true);
            await fetchServerTime();
            setIsLoading(false);
        }
        setStep(nextStep);
    };

    const submitData = async (jenis: string, extraData: Record<string, unknown> = {}) => {
        setIsLoading(true);
        try {
            const needsTime = [
                'absen_datang', 'absen_pulang',
                'istirahat_keluar', 'istirahat_masuk',
                'izin_keluar', 'izin_masuk',
            ].includes(jenis);
            const waktuStr = needsTime ? await fetchServerTime() : undefined;
            await submitPresensi(nik, jenis, waktuStr, extraData);
            toast.success(`Data "${jenis.replace(/_/g, ' ')}" berhasil disimpan!`);
            resetForm();
        } catch (err: unknown) {
            const e = err as { response?: { data?: { message?: string } } };
            toast.error(e.response?.data?.message || 'Terjadi kesalahan');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        step, setStep,
        nik, setNik,
        isLoading,
        serverTimeStr,
        jamAwal, setJamAwal,
        jamTujuan, setJamTujuan,
        jumlahJam, setJumlahJam,
        tanggalMulai, setTanggalMulai,
        tanggalAkhir, setTanggalAkhir,
        resetForm,
        handleNikSubmit,
        handleMenuClick,
        submitData,
    };
}
