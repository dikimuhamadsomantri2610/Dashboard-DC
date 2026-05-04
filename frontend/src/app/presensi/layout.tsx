import type { Metadata } from 'next';
import './presensi.css';

export const metadata: Metadata = {
    title: 'Portal Presensi',
    description: 'Portal Presensi DC — Kiosk Absensi Karyawan',
};

/**
 * Layout khusus route /presensi.
 * ⚠️ SENGAJA tidak membungkus dengan <ProtectedRoute> atau <DashboardLayout>.
 * Route ini adalah halaman PUBLIK — dapat diakses tanpa login.
 */
export default function PresensiPageLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
