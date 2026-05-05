"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart2 } from 'lucide-react';

export default function ReportReguler() {
    return (
        <div className="space-y-6">
            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400 shadow-sm ring-1 ring-amber-200 dark:ring-amber-800/40">
                        <BarChart2 className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Report Reguler</h2>
                        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                            Laporan data rekap armada kendaraan reguler.
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Placeholder Card ── */}
            <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
                <CardHeader>
                    <CardTitle>Laporan Armada Reguler</CardTitle>
                    <CardDescription>Data report armada reguler akan ditampilkan di sini.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl border-zinc-200 dark:border-zinc-800 gap-3">
                        <BarChart2 className="h-10 w-10 text-zinc-300 dark:text-zinc-600" />
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Fitur sedang dalam pengembangan.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
