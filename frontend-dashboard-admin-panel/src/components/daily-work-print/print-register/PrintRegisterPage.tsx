"use client";
import { usePrintRegister } from './hooks/usePrintRegister';
import PrintRegisterFilter from './components/PrintRegisterFilter';
import PrintRegisterDocument from './components/PrintRegisterDocument';

export default function PrintRegisterPage() {
    const {
        isLoading,
        isProcessing,
        tanggal,
        setTanggal,
        urutanTokoAwal,
        setUrutanTokoAwal,
        urutanTokoAkhir,
        setUrutanTokoAkhir,
        urutanJalurAwal,
        setUrutanJalurAwal,
        urutanJalurAkhir,
        setUrutanJalurAkhir,
        handleProses,
        handlePrint,
        fetchData
    } = usePrintRegister();

    return (
        <div className="space-y-6 print:space-y-0 print:-m-4 print:bg-white print:text-black">
            <style type="text/css" media="print">
                {`
                    @page { size: A4 portrait; margin: 0 !important; }
                    html, body { width: 100%; height: 100%; margin: 0 !important; padding: 0 !important; }
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                `}
            </style>
            <div className="flex items-center justify-between print:hidden">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Print Register - Masih Develop</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Daftar data Register yang tersedia di sistem.</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <PrintRegisterFilter
                    handleProses={handleProses}
                    tanggal={tanggal} setTanggal={setTanggal}
                    urutanTokoAwal={urutanTokoAwal} setUrutanTokoAwal={setUrutanTokoAwal}
                    urutanTokoAkhir={urutanTokoAkhir} setUrutanTokoAkhir={setUrutanTokoAkhir}
                    urutanJalurAwal={urutanJalurAwal} setUrutanJalurAwal={setUrutanJalurAwal}
                    urutanJalurAkhir={urutanJalurAkhir} setUrutanJalurAkhir={setUrutanJalurAkhir}
                    isProcessing={isProcessing}
                />

                <PrintRegisterDocument
                    tanggal={tanggal}
                    handlePrint={handlePrint}
                    fetchData={fetchData}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
