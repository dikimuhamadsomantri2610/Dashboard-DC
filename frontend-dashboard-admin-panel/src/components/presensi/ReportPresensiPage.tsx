"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, ChevronLeft, ChevronRight, ClipboardCheck, Search, X } from 'lucide-react';
import { useReportPresensi } from './hooks/useReportPresensi';

export default function ReportPresensiPage() {
    const {
        summaryData, filteredData, loading,
        totals, currentPage, itemsPerPage, setItemsPerPage,
        totalPages, startIndex, currentData,
        handleNextPage, handlePrevPage, handlePageClick, handleExportExcel,
        dateFrom, setDateFrom,
        dateTo, setDateTo,
        searchQuery, setSearchQuery,
    } = useReportPresensi();

    const hasFilters = dateFrom || dateTo || searchQuery;

    const handleClearFilters = () => {
        setDateFrom('');
        setDateTo('');
        setSearchQuery('');
    };

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
                <CardHeader className="flex flex-col gap-3 pb-4">
                    {/* Judul */}
                    <div>
                        <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />Detail Presensi</CardTitle>
                        <CardDescription>Menampilkan detail kehadiran masing-masing karyawan.</CardDescription>
                    </div>

                    {/* Baris 1: Show list | Export Excel | Dari | Sampai — sejajar */}
                    <div className="flex flex-wrap items-end gap-3">
                        {/* Show list */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Show list</label>
                            <select
                                className="h-9 rounded-md border border-zinc-200 bg-zinc-50/50 px-3 py-1 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50"
                                value={itemsPerPage}
                                onChange={e => { setItemsPerPage(Number(e.target.value)); }}
                            >
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={150}>150</option>
                                <option value={filteredData.length}>ALL</option>
                            </select>
                        </div>

                        {/* Export Excel */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-transparent select-none">Export</label>
                            <Button variant="outline" className="h-9 flex items-center gap-2" onClick={handleExportExcel} disabled={loading}>
                                <Download className="h-4 w-4" />Export Excel
                            </Button>
                        </div>

                        {/* Separator */}
                        <div className="hidden sm:block h-9 w-px bg-zinc-200 dark:bg-zinc-700 self-end" />

                        {/* Dari */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Dari</label>
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="h-9 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/50 px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-zinc-300 dark:text-white"
                            />
                        </div>

                        {/* Sampai */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Sampai</label>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                className="h-9 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/50 px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-zinc-300 dark:text-white"
                            />
                        </div>

                        {/* Reset filter — di baris 1 jika tidak ada search */}
                        {hasFilters && !searchQuery && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleClearFilters}
                                className="h-9 flex items-center gap-1.5 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 self-end"
                            >
                                <X className="h-3.5 w-3.5" />
                                Reset
                            </Button>
                        )}
                    </div>

                    {/* Baris 2: Search full-width */}
                    <div className="flex items-end gap-3">
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Cari Nama / NIK</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Cari berdasarkan nama atau NIK karyawan..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/50 pl-9 pr-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-zinc-300 dark:text-white"
                                />
                            </div>
                        </div>
                        {hasFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleClearFilters}
                                className="h-9 flex items-center gap-1.5 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                            >
                                <X className="h-3.5 w-3.5" />
                                Reset Filter
                            </Button>
                        )}
                    </div>

                    {/* Info jumlah hasil filter */}
                    {hasFilters && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Menampilkan <span className="font-semibold text-zinc-700 dark:text-zinc-200">{filteredData.length}</span> hasil dari total{' '}
                            <span className="font-semibold text-zinc-700 dark:text-zinc-200">{filteredData.length}</span> data yang sesuai filter.
                        </p>
                    )}
                </CardHeader>
                <CardContent className="p-0 sm:p-6 sm:pt-0">
                    <div className="rounded-md border border-zinc-200 dark:border-zinc-800 overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 font-medium border-b border-zinc-200 dark:border-zinc-800">
                                <tr>{['Nama','NIK','Divisi','Tanggal','Jam Absen Masuk','Jam Absen Pulang','Jam Istirahat Keluar','Jam Beres Istirahat'].map(h => <th key={h} className="px-4 py-3 whitespace-nowrap">{h}</th>)}</tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                {currentData.length > 0 ? currentData.map((row) => (
                                    <tr key={row.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                                        <td className="px-4 py-3 font-medium">{row.nama}</td>
                                        <td className="px-4 py-3">{row.nik}</td>
                                        <td className="px-4 py-3">{row.divisi}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{row.tanggal || '-'}</td>
                                        <td className="px-4 py-3">{row.jamAbsenMasuk}</td>
                                        <td className="px-4 py-3">{row.jamAbsenPulang}</td>
                                        <td className="px-4 py-3">{row.jamIstirahatKeluar}</td>
                                        <td className="px-4 py-3">{row.jamIstirahatSelesai}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-10 text-center text-zinc-500 dark:text-zinc-400">
                                            {hasFilters ? 'Tidak ada data yang cocok dengan filter.' : 'Belum ada data presensi.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-4 px-4 sm:px-0">
                            <div className="text-sm text-zinc-500 dark:text-zinc-400">Menampilkan {startIndex + 1} sampai {Math.min(startIndex + itemsPerPage, filteredData.length)} dari {filteredData.length} baris</div>
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
