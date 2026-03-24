import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface KuotaProps {
    id: number;
    nik: string;
    nama: string;
    divisi: string;
    jam: string;
    tanggal: string;
}

const initialPending: KuotaProps[] = [
    { id: 1, nik: '1001', nama: 'Budi Santoso', divisi: 'Receiving', jam: '2 Jam', tanggal: '2026-03-15' },
    { id: 2, nik: '1002', nama: 'Siti Aminah', divisi: 'Warehouse', jam: '3 Jam', tanggal: '2026-03-16' },
];

export default function KuotaJamLebih() {
    const [pending, setPending] = useState<KuotaProps[]>(initialPending);
    const [approved, setApproved] = useState<KuotaProps[]>([]);

    const handleApprove = (item: KuotaProps) => {
        setPending(prev => prev.filter(p => p.id !== item.id));
        setApproved(prev => [...prev, item]);
        toast.success(`Berhasil menyetujui kuota jam lebih ${item.nama}`);
    };

    const handleReject = (item: KuotaProps) => {
        setPending(prev => prev.filter(p => p.id !== item.id));
        toast.error(`Pengajuan kuota jam lebih ${item.nama} ditolak`);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Kuota Jam Lebih</h2>
                    <p className="text-muted-foreground">
                        Kelola data pengajuan kuota jam lebih karyawan.
                    </p>
                </div>
            </div>

            <Card className="border-indigo-200 dark:border-indigo-900/50">
                <CardHeader className="bg-indigo-50/50 dark:bg-indigo-900/10 border-b border-indigo-100 dark:border-indigo-900/50">
                    <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
                        <Clock className="h-5 w-5" />
                        Menunggu Persetujuan
                    </CardTitle>
                    <CardDescription>Daftar pengajuan jam lebih yang belum diproses</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 bg-white dark:bg-zinc-950">
                    {pending.length === 0 ? (
                        <div className="text-center py-8 text-zinc-500">Tidak ada pengajuan baru.</div>
                    ) : (
                        <div className="grid gap-4">
                            {pending.map(item => (
                                <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 flex-1">
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
                                        <div className="col-span-2 md:col-span-1">
                                            <p className="text-xs text-zinc-500 mb-1">Tanggal</p>
                                            <p className="font-medium text-sm">{item.tanggal}</p>
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <p className="text-xs text-zinc-500 mb-1">Total Jam</p>
                                            <p className="font-medium text-sm">{item.jam}</p>
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
                        <Clock className="h-5 w-5 text-primary" />
                        Riwayat Disetujui
                    </CardTitle>
                    <CardDescription>Menampilkan daftar pengajuan kuota jam lebih yang telah disetujui.</CardDescription>
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
                                    <th className="px-4 py-3 whitespace-nowrap">Total Jam</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Atasan Menyetujui</th>
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
                                            <td className="px-4 py-3">{item.jam}</td>
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
