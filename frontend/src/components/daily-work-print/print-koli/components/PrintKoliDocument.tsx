"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RefreshCw, Printer, ChevronLeft, ChevronRight } from 'lucide-react';

interface PrintKoliDocumentProps {
    tanggal: string;
    handlePrint: () => void;
    fetchData: () => void;
    isLoading: boolean;
}

export default function PrintKoliDocument({
    tanggal,
    handlePrint,
    fetchData,
    isLoading
}: PrintKoliDocumentProps) {
    const zones = [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        '31', '32', '33', '34', '35', '41', '42'
    ];

    const contVals = [1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 0, 0, 1, 1, 3, 1, 1, 1];
    const pckVals = [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 2, 0, 0, 0, 0, 0, 0];

    return (
        <Card className="flex-1 overflow-x-auto print:overflow-visible print:w-full print:shadow-none print:border-none print:p-0 print:bg-transparent">
            <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-200 dark:border-zinc-800 print:hidden">
                <div>
                    <CardTitle>Hasil Data Koli</CardTitle>
                    <CardDescription className="print:hidden">Preview form serah terima barang.</CardDescription>
                </div>
                <div className="flex items-center gap-2 print:hidden">
                    <Button variant="outline" size="sm" className="gap-1">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">Back</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1"></div>
                    <Button onClick={handlePrint} variant="default" className="gap-2 shrink-0">
                        <Printer className="h-4 w-4" />
                        Print
                    </Button>
                    <Button onClick={fetchData} disabled={isLoading} variant="outline" size="icon" className="shrink-0">
                        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-8 print:p-0 print:m-0">
                <div className="min-w-[700px] max-w-[800px] mx-auto bg-white text-black p-8 sm:p-12 rounded-xl ring-1 ring-zinc-200 dark:ring-0 print:ring-0 print:max-w-none print:w-[100vw] print:h-[100vh] print:fixed print:inset-0 print:z-50 print:m-0 print:p-[5mm] print:flex print:flex-col print:box-border">
                    <div className="flex justify-between items-start mb-4 font-sans text-[13px] print:text-[12px] leading-snug">
                        <div>
                            <div className="text-xl print:text-[22px] font-bold tracking-widest mb-4 print:mb-2 text-left w-full">FORM SERAH TERIMA BARANG</div>
                            <div className="flex flex-col gap-y-1">
                                <div className="grid grid-cols-[140px_10px_auto] items-center">
                                    <span>Kode Store</span><span>:</span><span className="font-bold tracking-widest pl-2">MRN - 48449</span>
                                </div>
                                <div className="grid grid-cols-[140px_10px_auto] items-center">
                                    <span>Tanggal Penyiapan</span><span>:</span><span className="font-bold pl-2">{tanggal ? new Date(tanggal).toLocaleDateString('id-ID') : '3/5/2026'}</span>
                                </div>
                                <div className="grid grid-cols-[140px_10px_auto] items-center">
                                    <span>Jumlah Pallet</span><span>:</span><span className="font-bold pl-2"></span>
                                </div>
                                <div className="grid grid-cols-[140px_10px_auto] items-center">
                                    <span>Tanggal Kirim</span><span>:</span><span className="font-bold pl-2"></span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right flex flex-col items-end shrink-0">
                            <div className="font-bold text-[13px] print:text-[14px] mb-2 print:mb-1 mt-6 print:mt-1">48798 - DCG</div>
                            <div className="border border-black text-center w-24">
                                <div className="border-b border-black text-[11px] print:text-[12px] font-bold py-1 leading-tight">
                                    URUTAN<br />KIRIM
                                </div>
                                <div className="font-bold text-3xl print:text-[34px] pb-1 pt-1">1</div>
                            </div>
                        </div>
                    </div>

                    <table className="w-full print:h-full print:flex-1 table-fixed border-collapse border border-black text-[12px] print:text-[11px] font-sans text-center">
                        <thead>
                            <tr>
                                <td rowSpan={2} className="border border-black font-semibold py-1 w-[9.09%] text-sm print:text-[9px] leading-tight wrap-break-word">Jalur</td>
                                <td colSpan={10} className="border border-black font-semibold py-1 w-[90.9%]">JUMLAH KOLI</td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="border border-black">SISTEM</td>
                                <td colSpan={2} className="border border-black">HELPER DISDEL</td>
                                <td colSpan={2} className="border border-black">CHECKER</td>
                                <td colSpan={2} className="border border-black">LOADER</td>
                                <td colSpan={2} className="border border-black">TOKO</td>
                            </tr>
                            <tr>
                                <td className="border border-black py-1"></td>
                                <td className="border border-black text-[10px] py-0.5 w-[9.09%]">CONT</td>
                                <td className="border border-black text-[10px] py-0.5 w-[9.09%]">PCK</td>
                                <td className="border border-black text-[10px] py-0.5 w-[9.09%]">CONT</td>
                                <td className="border border-black text-[10px] py-0.5 w-[9.09%]">PCK</td>
                                <td className="border border-black text-[10px] py-0.5 w-[9.09%]">CONT</td>
                                <td className="border border-black text-[10px] py-0.5 w-[9.09%]">PCK</td>
                                <td className="border border-black text-[10px] py-0.5 w-[9.09%]">CONT</td>
                                <td className="border border-black text-[10px] py-0.5 w-[9.09%]">PCK</td>
                                <td className="border border-black text-[10px] py-0.5 w-[9.09%]">CONT</td>
                                <td className="border border-black text-[10px] py-0.5 w-[9.09%]">PCK</td>
                            </tr>
                        </thead>
                        <tbody>
                            {zones.map((zone, idx) => (
                                <tr key={zone}>
                                    <td className="border border-black py-0.5 font-semibold">{zone}</td>
                                    <td className="border border-black py-0.5">{contVals[idx]}</td>
                                    <td className="border border-black py-0.5">{pckVals[idx]}</td>
                                    <td className="border border-black py-0.5"></td><td className="border border-black py-0.5"></td>
                                    <td className="border border-black py-0.5"></td><td className="border border-black py-0.5"></td>
                                    <td className="border border-black py-0.5"></td><td className="border border-black py-0.5"></td>
                                    <td className="border border-black py-0.5"></td><td className="border border-black py-0.5"></td>
                                </tr>
                            ))}
                            <tr>
                                <td className="border border-black font-semibold py-1">** TOTAL **</td>
                                <td className="border border-black font-semibold">41</td>
                                <td className="border border-black font-semibold">9</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
