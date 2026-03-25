import logoYomart from '../assets/logo_yomart.svg';
import { BG_ICONS, BG_LOGOS } from '../constants/bgIcons';

export default function PageBackground() {
    return (
        <>
            {/* Orbs */}
            <div style={{ position: 'absolute', top: '25%', left: '25%', width: 384, height: 384, borderRadius: '50%', background: 'var(--orb1)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '25%', right: '25%', width: 320, height: 320, borderRadius: '50%', background: 'var(--orb2)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: 600, height: 600, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'var(--orb3)', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0 }} />

            {/* Floating icons */}
            {BG_ICONS.map(({ Icon, size, x, y, delay, dur, opacity }, i) => (
                <div key={i} className="float-el" style={{ left: x, top: y, opacity, animation: `floatY ${dur} ease-in-out ${delay} infinite` }}>
                    <Icon size={size} strokeWidth={2} />
                </div>
            ))}

            {/* Floating logos */}
            {BG_LOGOS.map(({ size, x, y, delay, dur, opacity }, i) => (
                <div key={`logo-${i}`} className="float-el" style={{ left: x, top: y, opacity, animation: `floatY ${dur} ease-in-out ${delay} infinite` }}>
                    <img src={logoYomart} alt="" width={size} height={size} />
                </div>
            ))}

            {/* Grid overlay */}
            <div className="grid-overlay" />
        </>
    );
}
