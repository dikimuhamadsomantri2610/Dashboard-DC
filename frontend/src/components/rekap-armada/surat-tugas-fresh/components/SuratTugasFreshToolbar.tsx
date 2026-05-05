"use client";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardHeader } from '@/components/ui/card';
import { Download, X, Search } from 'lucide-react';

interface SuratTugasFreshToolbarProps {
    startDate: string;
    setStartDate: (val: string) => void;
    endDate: string;
    setEndDate: (val: string) => void;
    dcFilter: string;
    setDcFilter: (val: string) => void;
    resetDateFilter: () => void;
    handleExportExcel: () => void;
    perPage: number;
    setPerPage: (val: number) => void;
    searchQuery: string;
    setSearchQuery: (val: string) => void;
}

export default function SuratTugasFreshToolbar({
    startDate, setStartDate,
    endDate, setEndDate,
    dcFilter, setDcFilter,
    resetDateFilter, handleExportExcel,
    perPage, setPerPage,
    searchQuery, setSearchQuery,
}: SuratTugasFreshToolbarProps) {
    const hasFilter = startDate || endDate || dcFilter !== 'All';

    return (
        <CardHeader className="pt-4 pb-0">
            <div className="flex flex-col gap-3">

                {/* ── Row 1: filters + controls ── */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    {/* Left: date + DC filter */}
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 whitespace-nowrap">Dari:</span>
                            <Input
                                type="date"
                                className="w-[130px] h-9 text-sm"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 whitespace-nowrap">Sampai:</span>
                            <Input
                                type="date"
                                className="w-[130px] h-9 text-sm"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 whitespace-nowrap">DC:</span>
                            <select
                                className="h-9 rounded-md border border-zinc-200 bg-transparent px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 dark:border-zinc-800 dark:focus-visible:ring-zinc-300 text-zinc-700 dark:text-zinc-300"
                                value={dcFilter}
                                onChange={(e) => setDcFilter(e.target.value)}
                            >
                                <option value="All">All</option>
                                <option value="DC GBG">DC GBG</option>
                                <option value="DC D53">DC D53</option>
                                <option value="DC DRE">DC DRE</option>
                                <option value="DC DMR">DC DMR</option>
                            </select>
                        </div>
                        {hasFilter && (
                            <Button variant="ghost" size="icon" onClick={resetDateFilter} className="h-8 w-8 text-zinc-400" title="Clear Filter">
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    {/* Right: per-page + export */}
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 whitespace-nowrap">Show:</span>
                            <select
                                className="h-9 rounded-md border border-zinc-200 bg-transparent px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 dark:border-zinc-800 dark:focus-visible:ring-zinc-300 text-zinc-700 dark:text-zinc-300"
                                value={perPage}
                                onChange={(e) => setPerPage(Number(e.target.value))}
                            >
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleExportExcel}
                            className="flex items-center gap-2 h-9 text-sm"
                        >
                            <Download className="h-4 w-4" />
                            <span>Export Excel</span>
                        </Button>
                    </div>
                </div>

                {/* ── Row 2: search ── */}
                <div className="flex border-t border-zinc-200 dark:border-zinc-800 pt-3 pb-1">
                    <div className="relative w-full sm:w-auto sm:ml-auto sm:min-w-[250px]">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                        <Input
                            type="text"
                            placeholder="Cari armada, driver, toko..."
                            className="h-9 pl-8 pr-8 w-full text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                                title="Hapus pencarian"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </CardHeader>
    );
}
