"use client";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardHeader } from '@/components/ui/card';
import { Download, X } from 'lucide-react';

interface SuratTugasToolbarProps {
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
}

export default function SuratTugasToolbar({
    startDate, setStartDate,
    endDate, setEndDate,
    dcFilter, setDcFilter,
    resetDateFilter,
    handleExportExcel,
    perPage, setPerPage
}: SuratTugasToolbarProps) {
    return (
        <CardHeader className="pt-4 pb-2 sm:pb-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Dari:</span>
                        <Input type="date" className="w-[140px] h-9" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Sampai:</span>
                        <Input type="date" className="w-[140px] h-9" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Filter DC:</span>
                        <select
                            className="h-9 rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 dark:border-zinc-800 dark:focus-visible:ring-zinc-300"
                            value={dcFilter} onChange={(e) => setDcFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="DC GBG">DC GBG</option>
                            <option value="DC D53">DC D53</option>
                            <option value="DC DRE">DC DRE</option>
                            <option value="DC DMR">DC DMR</option>
                        </select>
                    </div>
                    {(startDate || endDate || dcFilter !== 'All') && (
                        <Button variant="ghost" size="icon" onClick={resetDateFilter} className="h-9 w-9 text-zinc-500" title="Clear Filter">
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                    <Button variant="outline" onClick={handleExportExcel} className="flex items-center gap-2 h-9 ml-2">
                        <Download className="h-4 w-4" />
                        Export Excel
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Show:</span>
                    <select
                        className="h-9 rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 dark:border-zinc-800 dark:focus-visible:ring-zinc-300"
                        value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}
                    >
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>
        </CardHeader>
    );
}
