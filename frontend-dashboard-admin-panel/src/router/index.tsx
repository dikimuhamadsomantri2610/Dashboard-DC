import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Login from '../pages/Login';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import PrintKoli from '../pages/daily-work-print/PrintKoli';
import PrintRegister from '../pages/daily-work-print/PrintRegister';
import DataKaryawanReceiving from '../pages/karyawan/DataKaryawanReceiving';
import DataKaryawanWarehouse from '../pages/karyawan/DataKaryawanWarehouse';
import DataKaryawanDistribution from '../pages/karyawan/DataKaryawanDistribution';
import SuratTugas from '../pages/rekap-armada/SuratTugas';
import SuratTugasFresh from '../pages/rekap-armada/SuratTugasFresh';
import ReportArmada from '../pages/rekap-armada/ReportArmada';
import UpdateToko from '../pages/rekap-armada/UpdateToko';
import UpdateArmada from '../pages/rekap-armada/UpdateArmada';
import DataUser from '../pages/DataUser';
import ProfileSetting from '../pages/ProfileSetting';
import ReportPresensi from '../pages/presensi/ReportPresensi';
import PerubahanJadwal from '../pages/presensi/PerubahanJadwal';
import CutiIzin from '../pages/presensi/CutiIzin';
import KuotaJamLebih from '../pages/presensi/KuotaJamLebih';
import IzinKeluar from '../pages/presensi/IzinKeluar';

import LabelLokasiPermanent from '../pages/label/LabelLokasiPermanent';
import LabelAfterPick from '../pages/label/LabelAfterPick';
import LabelAfterPickFresh from '../pages/label/LabelAfterPickFresh';
import LabelPreprinted from '../pages/label/LabelPreprinted';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <>{children}</>;
};

export const RouterConfig = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="daily-work-print/print-koli" element={<PrintKoli />} />
                    <Route path="daily-work-print/print-register" element={<PrintRegister />} />
                    <Route path="data-karyawan-receiving" element={<DataKaryawanReceiving />} />
                    <Route path="data-karyawan-warehouse" element={<DataKaryawanWarehouse />} />
                    <Route path="data-karyawan-distribution" element={<DataKaryawanDistribution />} />
                    {/* rekap-armada dinonaktifkan — klik sidebar hanya toggle submenu */}
                    <Route path="rekap-armada/surat-tugas/*" element={<SuratTugas />} />
                    <Route path="rekap-armada/surat-tugas-fresh/*" element={<SuratTugasFresh />} />
                    <Route path="rekap-armada/update-toko" element={<UpdateToko />} />
                    <Route path="rekap-armada/update-armada" element={<UpdateArmada />} />
                    <Route path="rekap-armada/report" element={<ReportArmada />} />
                    <Route path="presensi/report" element={<ReportPresensi />} />
                    <Route path="presensi/perubahan-jadwal" element={<PerubahanJadwal />} />
                    <Route path="presensi/kuota-jam-lebih" element={<KuotaJamLebih />} />
                    <Route path="presensi/izin-keluar" element={<IzinKeluar />} />
                    <Route path="presensi/cuti-izin" element={<CutiIzin />} />
                    <Route path="label/lokasi-permanent" element={<LabelLokasiPermanent />} />
                    <Route path="label/after-pick" element={<LabelAfterPick />} />
                    <Route path="label/after-pick-fresh" element={<LabelAfterPickFresh />} />
                    <Route path="label/preprinted" element={<LabelPreprinted />} />
                    <Route path="users" element={<DataUser />} />
                    <Route path="profile" element={<ProfileSetting />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
