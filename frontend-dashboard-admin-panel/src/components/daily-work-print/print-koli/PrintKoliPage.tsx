"use client";
import { Printer } from 'lucide-react';
import { usePrintKoli } from './hooks/usePrintKoli';
import PrintKoliFilter from './components/PrintKoliFilter';
import PrintKoliDocument from './components/PrintKoliDocument';

export default function PrintKoliPage() {
    const {
        isLoading,
        isProcessing,
        tanggal,
        setTanggal,
        urutanAwal,
        setUrutanAwal,
        urutanAkhir,
        setUrutanAkhir,
        handleProses,
        handlePrint,
        fetchData
    } = usePrintKoli();

    return (
        <div className="space-y-6 print:space-y-0 print:m-0 print:p-0">
            <style type="text/css" media="print">
                {`
                    @page { size: A4 portrait; margin: 0 !important; }
                    html, body { width: 100%; height: 100%; margin: 0 !important; padding: 0 !important; }
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                `}
            </style>
            {/* Page Header */}
            <div className="flex items-center justify-between print:hidden">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400 shadow-sm">
                        <Printer className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Print Koli - Masih Develop</h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Daftar data Koli yang tersedia di sistem.</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 print:block print:gap-0">
                <PrintKoliFilter
                    handleProses={handleProses}
                    tanggal={tanggal} setTanggal={setTanggal}
                    urutanAwal={urutanAwal} setUrutanAwal={setUrutanAwal}
                    urutanAkhir={urutanAkhir} setUrutanAkhir={setUrutanAkhir}
                    isProcessing={isProcessing}
                />
                <PrintKoliDocument
                    tanggal={tanggal}
                    handlePrint={handlePrint}
                    fetchData={fetchData}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
