"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarDays, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface JadwalProps {
    id: number;
    nik: string;
    nama: string;
    divisi: string;
    jam_keluar: string;
    jam_kembali: string;
    tanggal: string;
}

const initialPending: JadwalProps[] = [
    { id: 1, nik: '100000001', nama: 'Diki M. Somantri', divisi: 'Warehouse', jam_keluar: '08:00 WIB', jam_kembali: '09:00 WIB', tanggal: '2026-03-15' },
    { id: 2, nik: '100000002', nama: 'Asep Yuwana', divisi: 'Distribution', jam_keluar: '07:00 WIB', jam_kembali: '08:00 WIB', tanggal: '2026-03-16' },
];

export default function IzinKeluar() {
    const [pending, setPending] = useState<JadwalProps[]>(initialPending);
    const [approved, setApproved] = useState<JadwalProps[]>([]);

    const handleApprove = (item: JadwalProps) => {
        setPending(prev => prev.filter(p => p.id !== item.id));
        setApproved(prev => [...prev, item]);
        toast.success(`Berhasil menyetujui perubahan jadwal ${item.nama}`);
    };

    const handleReject = (item: JadwalProps) => {
        setPending(prev => prev.filter(p => p.id !== item.id));
        toast.error(`Perubahan jadwal ${item.nama} ditolak`);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400 shadow-sm">
                        <CalendarDays className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Izin Keluar Jam Kerja</h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Kelola data pengajuan perubahan jadwal kerja karyawan.</p>
                    </div>
                </div>
            </div>

            <Card className="border-orange-200 dark:border-orange-900/50">
                <CardHeader className="bg-orange-50/50 dark:bg-orange-900/10 border-b border-orange-100 dark:border-orange-900/50">
                    <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                        <CalendarDays className="h-5 w-5" />
                        Menunggu Persetujuan
                    </CardTitle>
                    <CardDescription>Daftar pengajuan perubahan jadwal yang belum diproses</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 bg-white dark:bg-zinc-950">
                    {pending.length === 0 ? (
                        <div className="text-center py-8 text-zinc-500">Tidak ada pengajuan baru.</div>
                    ) : (
                        <div className="grid gap-4">
                            {pending.map(item => (
                                <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                                    <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-3 gap-4 flex-1">
                                        <div>
                                            <p className="text-xs text-zinc-500 mb-1">NIK</p>
                                            <p className="font-medium text-sm">{item.nik}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 mb-1">Nama</p>
                                            <p className="font-medium text-sm">{item.nama}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 mb-1">Divisi</p>
                                            <p className="font-medium text-sm">{item.divisi}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 mb-1">Tanggal</p>
                                            <p className="font-medium text-sm">{item.tanggal}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 mb-1">Jam Keluar</p>
                                            <p className="font-medium text-sm">{item.jam_keluar}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 mb-1">Jam Kembali</p>
                                            <p className="font-medium text-sm">{item.jam_kembali}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0 md:border-l md:border-zinc-200 md:dark:border-zinc-800 md:pl-4">
                                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950" onClick={() => handleReject(item)}>
                                            <X className="w-4 h-4 mr-1" /> Tolak
                                        </Button>
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleApprove(item)}>
                                            <Check className="w-4 h-4 mr-1" /> Setujui
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-primary" />
                        Riwayat Disetujui
                    </CardTitle>
                    <CardDescription>Menampilkan daftar perubahan jadwal yang telah disetujui.</CardDescription>
                </CardHeader>
                <CardContent className="p-0 sm:p-6 sm:pt-0">
                    <div className="rounded-md border border-zinc-200 dark:border-zinc-800 overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 font-medium border-b border-zinc-200 dark:border-zinc-800">
                                <tr>
                                    <th className="px-4 py-3 whitespace-nowrap">NIK</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Nama</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Divisi</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Tanggal</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Jam Keluar</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Jam Kembali</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Keperluan</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Atasan Menyetujui</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Foto</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                {approved.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">Belum ada data disetujui.</td>
                                    </tr>
                                ) : (
                                    approved.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                                            <td className="px-4 py-3 font-medium">{item.nik}</td>
                                            <td className="px-4 py-3">{item.nama}</td>
                                            <td className="px-4 py-3">{item.divisi}</td>
                                            <td className="px-4 py-3">{item.tanggal}</td>
                                            <td className="px-4 py-3">{item.jam_keluar}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
