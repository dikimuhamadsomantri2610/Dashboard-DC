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
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Print Koli - Masih Develop</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Daftar data Koli yang tersedia di sistem.</p>
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
