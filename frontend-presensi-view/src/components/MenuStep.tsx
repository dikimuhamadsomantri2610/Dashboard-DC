import { Clock, Coffee, ArrowLeftRight, ArrowRightLeft, CalendarDays } from 'lucide-react';
import type { Step } from '../types';

interface MenuStepProps {
    nik: string;
    onMenuClick: (step: Step) => void;
}

export default function MenuStep({ nik, onMenuClick }: MenuStepProps) {
    const menus: { step: Step; icon: React.ReactNode; label: string }[] = [
        { step: 'ABSEN',           icon: <Clock size={26} style={{ color: 'var(--accent)' }} />,         label: 'Absen Datang / Pulang' },
        { step: 'ISTIRAHAT',       icon: <Coffee size={26} style={{ color: 'var(--accent)' }} />,        label: 'Istirahat' },
        { step: 'PERUBAHAN_JADWAL',icon: <ArrowLeftRight size={26} style={{ color: 'var(--accent)' }} />,label: 'Perubahan Jadwal' },
        { step: 'KUOTA',           icon: <Clock size={26} style={{ color: 'var(--accent)' }} />,         label: 'Ambil Kuota' },
        { step: 'IZIN',            icon: <ArrowRightLeft size={26} style={{ color: 'var(--accent)' }} />,label: 'Izin Keluar / Masuk' },
        { step: 'CUTI',            icon: <CalendarDays size={26} style={{ color: 'var(--accent)' }} />,  label: 'Cuti' },
    ];

    return (
        <>
            <p className="desc" style={{ marginBottom: '0.75rem' }}>NIK: <strong>{nik}</strong></p>
            <div className="menu-grid">
                {menus.map(({ step, icon, label }) => (
                    <button key={step} className="menu-card" onClick={() => onMenuClick(step)}>
                        {icon}
                        {label}
                    </button>
                ))}
            </div>
        </>
    );
}
