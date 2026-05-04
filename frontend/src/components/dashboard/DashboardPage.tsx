"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity, Users, Truck, LayoutDashboard, Clock, UserCheck, CalendarDays, UserX, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

import { fetchUsers } from '@/components/data-user/services/data-user.service';
import { fetchArmada } from '@/components/rekap-armada/update-armada/services/armada.service';
import { fetchPresensiSummary } from '@/components/presensi/services/presensi.service';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalKaryawan: 0,
        totalArmada: 0,
        presensi: { hadir: 0, cuti: 0, off: 0, isbsd: 0, terlambat: 0, belumScan: 0, total: 0 }
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [users, armada, presensiSum] = await Promise.all([
                    fetchUsers().catch(() => []),
                    fetchArmada().catch(() => []),
                    fetchPresensiSummary().catch(() => [])
                ]);

                const pTotals = presensiSum.reduce(
                    (acc: Record<string, number>, row: Record<string, number>) => ({
                        hadir: acc.hadir + (row.hadir || 0),
                        cuti: acc.cuti + (row.cuti || 0),
                        off: acc.off + (row.off || 0),
                        isbsd: acc.isbsd + (row.isbsd || 0),
                        terlambat: acc.terlambat + (row.terlambat || 0),
                        belumScan: acc.belumScan + (row.belumScan || 0),
                        total: acc.total + (row.total || 0),
                    }),
                    { hadir: 0, cuti: 0, off: 0, isbsd: 0, terlambat: 0, belumScan: 0, total: 0 }
                );

                setStats({
                    totalKaryawan: users?.length || 0,
                    totalArmada: armada?.length || 0,
                    presensi: pTotals
                });
            } catch (error) {
                console.error("Gagal memuat data dashboard:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const chartData = [
        { name: 'Hadir', value: stats.presensi.hadir, color: '#10b981' },
        { name: 'Terlambat', value: stats.presensi.terlambat, color: '#f59e0b' },
        { name: 'Cuti', value: stats.presensi.cuti, color: '#3b82f6' },
        { name: 'Izin/Sakit', value: stats.presensi.isbsd, color: '#8b5cf6' },
        { name: 'Off', value: stats.presensi.off, color: '#64748b' },
        { name: 'Belum Scan', value: stats.presensi.belumScan, color: '#ef4444' }
    ];

    if (isLoading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="flex flex-col items-center text-zinc-500">
                    <Loader2 className="h-10 w-10 animate-spin text-blue-500 mb-4" />
                    <p className="animate-pulse">Memuat data Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                        <LayoutDashboard className="h-8 w-8 text-blue-200" />
                        Selamat Datang di Dashboard DC! 👋
                    </h2>
                    <p className="text-blue-100 max-w-2xl text-lg">
                        Pantau ringkasan aktivitas operasional, performa armada, dan kehadiran karyawan hari ini secara real-time.
                    </p>
                </div>
                {/* Decorative background elements */}
                <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl transition-transform duration-1000 hover:scale-110"></div>
                <div className="absolute right-40 -bottom-20 h-40 w-40 rounded-full bg-blue-400/30 blur-2xl transition-transform duration-1000 hover:-translate-y-10"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                
                {/* Total Karyawan */}
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/50 backdrop-blur-sm dark:bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Total Karyawan</CardTitle>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400 shadow-sm">
                            <Users className="h-5 w-5" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-zinc-900 dark:text-white">{stats.totalKaryawan}</div>
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 font-medium">Terdaftar dalam sistem</p>
                    </CardContent>
                </Card>

                {/* Total Armada */}
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/50 backdrop-blur-sm dark:bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Rekap Armada</CardTitle>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400 shadow-sm">
                            <Truck className="h-5 w-5" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-zinc-900 dark:text-white">{stats.totalArmada}</div>
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 font-medium">Armada Aktif/Beroperasi</p>
                    </CardContent>
                </Card>

                {/* Hadir Hari Ini */}
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/50 backdrop-blur-sm dark:bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Hadir Hari Ini</CardTitle>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 shadow-sm">
                            <UserCheck className="h-5 w-5" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.presensi.hadir}</div>
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 font-medium">Karyawan absen masuk</p>
                    </CardContent>
                </Card>

                {/* Terlambat */}
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/50 backdrop-blur-sm dark:bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Keterlambatan</CardTitle>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400 shadow-sm">
                            <Clock className="h-5 w-5" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">{stats.presensi.terlambat}</div>
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 font-medium">Karyawan masuk telat</p>
                    </CardContent>
                </Card>

            </div>

            {/* Charts and Details Section */}
            <div className="grid gap-6 md:grid-cols-3">
                
                {/* Main Custom Chart */}
                <Card className="md:col-span-2 overflow-hidden shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Activity className="h-5 w-5 text-blue-500" />
                            Grafik Kehadiran Harian
                        </CardTitle>
                        <CardDescription>Visualisasi data presensi karyawan hari ini secara real-time.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        allowDecimals={false}
                                    />
                                    <Tooltip 
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Stats / Mini List */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <CalendarDays className="h-5 w-5 text-indigo-500" />
                            Rincian Absensi
                        </CardTitle>
                        <CardDescription>Breakdown status karyawan yang tidak hadir atau off hari ini.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                <span className="font-medium text-sm">Cuti</span>
                            </div>
                            <span className="font-bold text-blue-700 dark:text-blue-400">{stats.presensi.cuti}</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                                <span className="font-medium text-sm">Izin / Sakit (ISBSD)</span>
                            </div>
                            <span className="font-bold text-purple-700 dark:text-purple-400">{stats.presensi.isbsd}</span>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-slate-500"></div>
                                <span className="font-medium text-sm">Off / Libur</span>
                            </div>
                            <span className="font-bold text-slate-700 dark:text-slate-400">{stats.presensi.off}</span>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50">
                            <div className="flex items-center gap-3">
                                <UserX className="h-4 w-4 text-red-500" />
                                <span className="font-medium text-sm text-red-700 dark:text-red-400">Belum Scan / Alpha</span>
                            </div>
                            <span className="font-bold text-red-700 dark:text-red-400">{stats.presensi.belumScan}</span>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
