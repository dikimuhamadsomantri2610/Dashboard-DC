"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Check, X, FileSignature } from 'lucide-react';
import type { GroupedSuratTugas } from '../types/surat-tugas.types';

interface SuratTugasPendingCardProps {
    pendingGroups: GroupedSuratTugas[];
    onApprove: (group: GroupedSuratTugas) => void;
    onReject: (group: GroupedSuratTugas) => void;
}

export default function SuratTugasPendingCard({
    pendingGroups,
    onApprove,
    onReject,
}: SuratTugasPendingCardProps) {
    if (pendingGroups.length === 0) return null;

    return (
        <Card className="border-amber-300 dark:border-amber-700/60 shadow-sm">
            <CardHeader className="bg-amber-50/70 dark:bg-amber-900/15 border-b border-amber-200 dark:border-amber-700/50 py-4 px-5">
                <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-base">
                    <Clock className="h-5 w-5" />
                    Menunggu Persetujuan
                    <span className="ml-1 inline-flex items-center justify-center rounded-full bg-amber-500 text-white text-xs font-bold h-5 min-w-[20px] px-1.5">
                        {pendingGroups.length}
                    </span>
                </CardTitle>
                <CardDescription className="text-amber-600/80 dark:text-amber-500/80 text-xs">
                    Daftar surat tugas yang baru dibuat dan belum diproses
                </CardDescription>
            </CardHeader>

            <CardContent className="p-4 sm:p-5 bg-white dark:bg-zinc-950 space-y-3">
                {pendingGroups.map((group) => (
                    <div
                        key={group.groupId}
                        className="flex flex-col md:flex-row md:items-stretch gap-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/50 hover:border-amber-300 dark:hover:border-amber-700/60 transition-colors"
                    >
                        {/* Info grid */}
                        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-3">
                            <div>
                                <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-0.5">No Armada</p>
                                <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{group.noArmada}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-0.5">Nama Driver</p>
                                <p className="font-medium text-sm text-zinc-800 dark:text-zinc-200">{group.namaDriver}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-0.5">Admin</p>
                                <p className="font-medium text-sm text-zinc-800 dark:text-zinc-200">{group.admin}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-0.5">DC</p>
                                <p className="font-semibold text-sm text-zinc-700 dark:text-zinc-300">{group.dc}</p>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-0.5">Dibuat</p>
                                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                    {new Date(group.createdAt).toLocaleString('id-ID', {
                                        day: '2-digit', month: '2-digit', year: 'numeric',
                                        hour: '2-digit', minute: '2-digit'
                                    }).replace(',', '')}
                                </p>
                            </div>
                            <div className="col-span-2 sm:col-span-3 lg:col-span-5">
                                <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-1.5">
                                    Toko ({group.items.length})
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {group.items.map((toko) => (
                                        <span
                                            key={toko.id}
                                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-medium border border-amber-200 dark:border-amber-700/50"
                                            title={toko.nama_toko}
                                        >
                                            <FileSignature className="h-2.5 w-2.5 shrink-0" />
                                            {toko.inisialToko || toko.nama_toko}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 shrink-0 md:border-l md:border-zinc-200 md:dark:border-zinc-800 md:pl-4">
                            <div className="flex md:flex-col gap-2 w-full md:w-auto">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1 md:flex-none text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-800 hover:border-red-300"
                                    onClick={() => onReject(group)}
                                >
                                    <X className="w-3.5 h-3.5 mr-1" />
                                    Tolak
                                </Button>
                                <Button
                                    size="sm"
                                    className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white"
                                    onClick={() => onApprove(group)}
                                >
                                    <Check className="w-3.5 h-3.5 mr-1" />
                                    Setujui
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
