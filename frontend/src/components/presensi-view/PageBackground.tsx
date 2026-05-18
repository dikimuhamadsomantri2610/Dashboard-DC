import Image from 'next/image';
import { BG_ICONS, BG_LOGOS } from '@/constants/bgIcons';
import logoYomart from '@/assets/logo_yomart.svg';

export default function PageBackground() {
    return (
        <>
            {/* Orbs */}
            <div style={{ position: 'absolute', top: '25%', left: '25%', width: 384, height: 384, borderRadius: '50%', background: 'var(--presensi-orb1)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '25%', right: '25%', width: 320, height: 320, borderRadius: '50%', background: 'var(--presensi-orb2)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: 600, height: 600, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'var(--presensi-orb3)', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0 }} />

            {/* Floating icons */}
            {BG_ICONS.map(({ Icon, size, x, y, delay, dur, opacity }, i) => (
                <div key={i} className="presensi-float-el" style={{ left: x, top: y, opacity, animation: `presensiFloatY ${dur} ease-in-out ${delay} infinite` }}>
                    <Icon size={size} strokeWidth={2} />
                </div>
            ))}

            {/* Floating logos */}
            {BG_LOGOS.map(({ size, x, y, delay, dur, opacity }, i) => (
                <div key={`logo-${i}`} className="presensi-float-el" style={{ left: x, top: y, opacity, animation: `presensiFloatY ${dur} ease-in-out ${delay} infinite` }}>
                    <Image src={logoYomart} alt="" width={size} height={size} />
                </div>
            ))}

            {/* Grid overlay */}
            <div className="presensi-grid-overlay" />
        </>
    );
}
