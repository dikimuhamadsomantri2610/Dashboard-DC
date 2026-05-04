"use client";

import { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import { Toaster } from 'sonner';
import { usePresensi } from '@/hooks/usePresensi';
import PageBackground from './PageBackground';
import ThemeToggle from './ThemeToggle';
import NikStep from './NikStep';
import MenuStep from './MenuStep';
import AbsenStep from './AbsenStep';
import IstirahatStep from './IstirahatStep';
import IzinStep from './IzinStep';
import PerubahanJadwalStep from './PerubahanJadwalStep';
import KuotaStep from './KuotaStep';
import CutiStep from './CutiStep';

export default function PresensiApp() {
    const [dark, setDark] = useState(false);
    const {
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
    } = usePresensi();

    const cardDesc =
        step === 'NIK'  ? 'Masukkan NIK Anda untuk melanjutkan' :
        step === 'MENU' ? `Pilih Menu Layanan — NIK: ${nik}`    :
        'Silakan isi form berikut';

    return (
        <div className={`presensi-root${dark ? ' presensi-dark' : ''}`}>
            <Toaster richColors />
            <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />

            <div className="presensi-page-wrap">
                <PageBackground />

                <div className="presensi-card">
                    {/* Header */}
                    <div className="presensi-card-header">
                        <div className="presensi-icon-badge">
                            <ClipboardList size={28} />
                        </div>
                        <div className="presensi-title">PORTAL PRESENSI</div>
                        <div className="presensi-desc">{cardDesc}</div>
                    </div>

                    {/* Body */}
                    <div className="presensi-card-body">
                        {step === 'NIK' && (
                            <NikStep nik={nik} isLoading={isLoading} onNikChange={setNik} onSubmit={handleNikSubmit} />
                        )}
                        {step === 'MENU' && (
                            <MenuStep nik={nik} onMenuClick={handleMenuClick} />
                        )}
                        {step === 'ABSEN' && (
                            <AbsenStep serverTimeStr={serverTimeStr} isLoading={isLoading} onSubmit={submitData} />
                        )}
                        {step === 'ISTIRAHAT' && (
                            <IstirahatStep serverTimeStr={serverTimeStr} isLoading={isLoading} onSubmit={submitData} />
                        )}
                        {step === 'IZIN' && (
                            <IzinStep serverTimeStr={serverTimeStr} isLoading={isLoading} onSubmit={submitData} />
                        )}
                        {step === 'PERUBAHAN_JADWAL' && (
                            <PerubahanJadwalStep
                                jamAwal={jamAwal} jamTujuan={jamTujuan} isLoading={isLoading}
                                onJamAwalChange={setJamAwal} onJamTujuanChange={setJamTujuan}
                                onSubmit={submitData}
                            />
                        )}
                        {step === 'KUOTA' && (
                            <KuotaStep
                                jumlahJam={jumlahJam} isLoading={isLoading}
                                onJumlahJamChange={setJumlahJam} onSubmit={submitData}
                            />
                        )}
                        {step === 'CUTI' && (
                            <CutiStep
                                tanggalMulai={tanggalMulai} tanggalAkhir={tanggalAkhir} isLoading={isLoading}
                                onTanggalMulaiChange={setTanggalMulai} onTanggalAkhirChange={setTanggalAkhir}
                                onSubmit={submitData}
                            />
                        )}
                    </div>

                    {/* Footer */}
                    {step !== 'NIK' && (
                        <div className="presensi-card-footer">
                            <button className="presensi-btn-ghost" onClick={() => step === 'MENU' ? resetForm() : setStep('MENU')}>
                                {step === 'MENU' ? '← Ganti NIK' : '← Kembali ke Menu'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
