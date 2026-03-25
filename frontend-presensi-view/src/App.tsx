import { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import { Toaster } from 'sonner';
import { usePresensi } from './hooks/usePresensi';
import PageBackground from './components/PageBackground';
import ThemeToggle from './components/ThemeToggle';
import NikStep from './components/NikStep';
import MenuStep from './components/MenuStep';
import AbsenStep from './components/AbsenStep';
import IstirahatStep from './components/IstirahatStep';
import IzinStep from './components/IzinStep';
import PerubahanJadwalStep from './components/PerubahanJadwalStep';
import KuotaStep from './components/KuotaStep';
import CutiStep from './components/CutiStep';

export default function App() {
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
        <div className={dark ? 'dark' : ''}>
            <Toaster richColors />
            <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />

            <div className="page-wrap">
                <PageBackground />

                <div className="card">
                    {/* Header */}
                    <div className="card-header">
                        <div className="icon-badge">
                            <ClipboardList size={28} />
                        </div>
                        <div className="title">PORTAL PRESENSI</div>
                        <div className="desc">{cardDesc}</div>
                    </div>

                    {/* Body */}
                    <div className="card-body">
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
                        <div className="card-footer">
                            <button className="btn-ghost" onClick={() => step === 'MENU' ? resetForm() : setStep('MENU')}>
                                {step === 'MENU' ? '← Ganti NIK' : '← Kembali ke Menu'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
