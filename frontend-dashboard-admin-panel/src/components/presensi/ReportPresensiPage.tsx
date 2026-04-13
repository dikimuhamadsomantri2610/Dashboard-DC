"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, ChevronLeft, ChevronRight, ClipboardCheck } from 'lucide-react';
import { useReportPresensi } from './hooks/useReportPresensi';

export default function ReportPresensiPage() {
    const {
        summaryData, detailedData, loading,
        totals, currentPage, itemsPerPage, setItemsPerPage,
        totalPages, startIndex, currentData,
        handleNextPage, handlePrevPage, handlePageClick, handleExportExcel,
    } = useReportPresensi();

    const renderPageNumbers = () => {
        const pages: (number | string)[] = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i <= 3 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== '...') {
                pages.push('...');
            }
        }
        return pages.map((page, idx) =>
            page === '...' ? (
                <span key={idx} className="px-3 py-2 text-sm text-zinc-500 font-medium">...</span>
            ) : (
                <Button key={idx} variant={currentPage === page ? 'default' : 'outline'} size="sm" className="w-8 h-8 p-0" onClick={() => handlePageClick(page as number)}>{page}</Button>
            )
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 shadow-sm">
                        <ClipboardCheck className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Report Presensi Kehadiran Karyawan</h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Laporan data presensi kehadiran karyawan terpusat.</p>
                    </div>
                </div>
            </div>


            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />Summary Presensi</CardTitle>
                    <CardDescription>Menampilkan ringkasan kehadiran karyawan harian dan bulanan.</CardDescription>
                </CardHeader>
                <CardContent className="p-0 sm:p-6 sm:pt-0">
                    <div className="rounded-md border border-zinc-200 dark:border-zinc-800 overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 font-medium border-b border-zinc-200 dark:border-zinc-800">
                                <tr>
                                    {['Posisi','Hadir','Cuti','Off','I/SB/SD','Terlambat','Belum SCAN','Total','% Kehadiran'].map(h => (
                                        <th key={h} className="px-4 py-3 whitespace-nowrap text-right first:text-left">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                {summaryData.map((row, idx) => {
                                    const percentage = row.total > 0 ? ((row.hadir / row.total) * 100).toFixed(1) + '%' : '0%';
                                    return (
                                        <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                                            <td className="px-4 py-3 font-medium">{row.posisi}</td>
                                            {[row.hadir, row.cuti, row.off, row.isbsd, row.terlambat, row.belumScan, row.total].map((v, i) => (
                                                <td key={i} className={`px-4 py-3 text-right${i === 6 ? ' font-bold' : ''}`}>{v}</td>
                                            ))}
                                            <td className="px-4 py-3 text-right">{percentage}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot className="bg-zinc-50 dark:bg-zinc-900/50 font-semibold border-t-2 border-zinc-200 dark:border-zinc-800">
                                <tr>
                                    <td className="px-4 py-3">Total</td>
                                    {[totals.hadir, totals.cuti, totals.off, totals.isbsd, totals.terlambat, totals.belumScan, totals.total].map((v, i) => (
                                        <td key={i} className="px-4 py-3 text-right">{v}</td>
                                    ))}
                                    <td className="px-4 py-3 text-right">{totals.total > 0 ? ((totals.hadir / totals.total) * 100).toFixed(1) + '%' : '0%'}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />Detail Presensi</CardTitle>
                        <CardDescription>Menampilkan detail kehadiran masing-masing karyawan.</CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-zinc-500 font-medium whitespace-nowrap">Show list</span>
                            <select className="h-9 rounded-md border border-zinc-200 bg-zinc-50/50 px-3 py-1 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50" value={itemsPerPage} onChange={e => { setItemsPerPage(Number(e.target.value)); }}>
                                <option value={50}>50</option><option value={100}>100</option><option value={150}>150</option>
                                <option value={detailedData.length}>ALL</option>
                            </select>
                        </div>
                        <Button variant="outline" className="flex items-center gap-2" onClick={handleExportExcel} disabled={loading}>
                            <Download className="h-4 w-4" />Export Excel
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0 sm:p-6 sm:pt-0">
                    <div className="rounded-md border border-zinc-200 dark:border-zinc-800 overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 font-medium border-b border-zinc-200 dark:border-zinc-800">
                                <tr>{['Nama','NIK','Divisi','Jam Absen Masuk','Jam Absen Pulang','Jam Istirahat Keluar','Jam Beres Istirahat'].map(h => <th key={h} className="px-4 py-3 whitespace-nowrap">{h}</th>)}</tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                {currentData.map((row) => (
                                    <tr key={row.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                                        <td className="px-4 py-3 font-medium">{row.nama}</td>
                                        <td className="px-4 py-3">{row.nik}</td>
                                        <td className="px-4 py-3">{row.divisi}</td>
                                        <td className="px-4 py-3">{row.jamAbsenMasuk}</td>
                                        <td className="px-4 py-3">{row.jamAbsenPulang}</td>
                                        <td className="px-4 py-3">{row.jamIstirahatKeluar}</td>
                                        <td className="px-4 py-3">{row.jamIstirahatSelesai}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-4 px-4 sm:px-0">
                            <div className="text-sm text-zinc-500 dark:text-zinc-400">Menampilkan {startIndex + 1} sampai {Math.min(startIndex + itemsPerPage, detailedData.length)} dari {detailedData.length} baris</div>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}><ChevronLeft className="h-4 w-4" /></Button>
                                <div className="hidden sm:flex items-center space-x-2">{renderPageNumbers()}</div>
                                <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages} className="gap-1 pr-2">Next <ChevronRight className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
