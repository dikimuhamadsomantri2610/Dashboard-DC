"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RefreshCw, Printer, ChevronLeft, ChevronRight } from 'lucide-react';

interface PrintRegisterDocumentProps {
    tanggal: string;
    handlePrint: () => void;
    fetchData: () => void;
    isLoading: boolean;
}

export default function PrintRegisterDocument({
    tanggal,
    handlePrint,
    fetchData,
    isLoading
}: PrintRegisterDocumentProps) {
    const leftTableData = [
        { no: '1', store: 'CPY', contId: '44009449', sku: '16' },
        { no: '2', store: 'CGI', contId: '44009012', sku: '26' },
        { no: '3', store: 'KDN', contId: '43943249', sku: '25' },
        { no: '4', store: 'CW3', contId: '43942945', sku: '44' },
        { no: '5', store: 'LPN', contId: '44009869', sku: '40' },
        { no: '6', store: 'CAL', contId: '44007841', sku: '19' },
        { no: '7', store: 'MIM', contId: '44008244', sku: '35' },
        { no: '8', store: 'ATI', contId: '43939679', sku: '1' },
        { no: '', store: 'ATI', contId: '43939686', sku: '1' },
        { no: '', store: 'ATI', contId: '43947483', sku: '25' },
        { no: '9', store: 'CJE', contId: '43946615', sku: '26' },
        { no: '10', store: 'PJI', contId: '43946752', sku: '26' },
        { no: '11', store: 'NGG', contId: '43945656', sku: '51' },
        { no: '12', store: 'PYN', contId: '43946219', sku: '29' },
        { no: '13', store: 'BHN', contId: '44008619', sku: '34' },
        { no: '14', store: 'KTI', contId: '43950834', sku: '16' },
        { no: '', store: 'KTI', contId: '43950841', sku: '62' },
        { no: '15', store: 'CPA', contId: '43948947', sku: '21' },
        { no: '16', store: 'BTJ', contId: '43949487', sku: '57' },
        { no: '17', store: 'CLI', contId: '43949333', sku: '24' },
        { no: '18', store: 'PDR', contId: '43950346', sku: '52' },
        { no: '', store: 'PDR', contId: '43950353', sku: '3' },
        { no: '19', store: 'MAH', contId: '43953910', sku: '43' },
        { no: '', store: 'MAH', contId: '43953927', sku: '1' },
        { no: '20', store: 'BBN', contId: '43952821', sku: '36' },
        { no: '21', store: 'PLN', contId: '43952456', sku: '24' },
        { no: '22', store: 'CBA', contId: '43954573', sku: '49' },
        { no: '', store: 'CBA', contId: '43954597', sku: '5' },
    ];

    const rightTableData = [
        { no: '23', store: 'CBK', contId: '43953644', sku: '45' },
        { no: '24', store: 'CST', contId: '43953309', sku: '19' },
        { no: '25', store: 'CSA', contId: '44022455', sku: '34' },
        { no: '26', store: 'RBY', contId: '44023087', sku: '34' },
        { no: '27', store: 'LSS', contId: '44023681', sku: '33' },
        { no: '28', store: 'BPN', contId: '44022882', sku: '15' },
        { no: '29', store: 'PWP', contId: '44021540', sku: '18' },
        { no: '30', store: 'REM', contId: '44022004', sku: '55' },
        { no: '', store: 'REM', contId: '44022011', sku: '6' },
        { no: '31', store: 'TWG', contId: '43966453', sku: '58' },
        { no: '32', store: 'CPT', contId: '43964596', sku: '34' },
        { no: '33', store: 'PSI', contId: '43966002', sku: '48' },
        { no: '34', store: 'WN1', contId: '43965074', sku: '37' },
        { no: '35', store: 'WRT', contId: '43964114', sku: '44' },
        { no: '36', store: 'VTN', contId: '43965517', sku: '39' },
        { no: '37', store: 'PRD', contId: '43968204', sku: '7' },
        { no: '38', store: 'THI', contId: '43967726', sku: '27' },
        { no: '39', store: 'AAC', contId: '43968976', sku: '42' },
        { no: '40', store: 'GKG', contId: '43967016', sku: '21' },
        { no: '', store: 'GKG', contId: '44011763', sku: '1' },
        { no: '41', store: 'SKU', contId: '43967092', sku: '56' },
        { no: '42', store: 'DPR', contId: '43968563', sku: '12' },
        { no: '43', store: 'JLG', contId: '43970924', sku: '47' },
        { no: '44', store: 'PSH', contId: '43970153', sku: '26' },
        { no: '45', store: 'CPK', contId: '43970597', sku: '40' },
        { no: '', store: 'CPK', contId: '43970603', sku: '12' },
        { no: '46', store: 'CP2', contId: '43971242', sku: '49' },
        { no: '\u00A0', store: '', contId: '', sku: '' },
    ];

    return (
        <Card className="flex-1 overflow-x-auto print:overflow-visible print:w-full print:shadow-none print:border-none print:p-0 print:bg-transparent">
            <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-200 dark:border-zinc-800 print:hidden">
                <div>
                    <CardTitle>Hasil Data Register</CardTitle>
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
                <div className="min-w-[700px] max-w-[800px] mx-auto bg-white text-black p-8 sm:p-12 rounded-xl ring-1 ring-zinc-200 dark:ring-0 print:ring-0 print:max-w-none print:w-[100vw] print:h-[100vh] print:fixed print:inset-0 print:z-50 print:m-0 print:p-[5mm] print:flex print:flex-col print:box-border font-sans">
                    <div className="flex justify-between items-end mb-2">
                        <div className="space-y-1">
                            <div className="font-bold text-[15px] print:text-[16px] leading-none mb-1">48798 - DC GBG</div>
                            <div className="flex items-center text-xs print:text-[13px] pt-1 mt-1">
                                <span className="mr-2 leading-none">Jalur/Aisle</span>
                                <span className="font-bold text-base print:text-lg leading-none mr-8">01</span>
                                <span className="leading-none flex items-end">
                                    Nama :<span className="inline-block w-48 border-b border-dotted border-black ml-2 mb-[2px]"></span>
                                </span>
                            </div>
                        </div>
                        <div className="text-right space-y-1 pb-1">
                            <div className="font-bold text-xs print:text-[13px] tracking-widest leading-none mb-2">.: FORM REGISTER :.</div>
                            <div className="text-xs print:text-[13px] leading-none">
                                Tgl Proses <span className="font-bold">{tanggal ? new Date(tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '06 Mar 2026'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full text-[11px] print:text-[10px] print:flex-1 print:h-full">
                        <table className="flex-1 w-1/2 table-fixed border-collapse border border-black text-center leading-snug print:h-full">
                            <thead>
                                <tr>
                                    <th className="border border-black font-normal py-0.5 w-[10%]">NO.</th>
                                    <th className="border border-black font-normal py-0.5 w-[15%]">STORE</th>
                                    <th className="border border-black font-normal py-0.5 w-[25%]">CONT. ID</th>
                                    <th className="border border-black font-normal py-0.5 w-[20%]">TOTAL SKU</th>
                                    <th className="border border-black font-normal py-0.5 w-[15%]">TTL QTY</th>
                                    <th className="border border-black font-normal py-0.5 w-[15%]">TTL.KOLI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leftTableData.map((row, i) => (
                                    <tr key={i}>
                                        <td className="border border-black py-0.5">{row.no}</td>
                                        <td className="border border-black py-0.5">{row.store}</td>
                                        <td className="border border-black py-0.5 tracking-tight">{row.contId}</td>
                                        <td className="border border-black py-0.5">{row.sku}</td>
                                        <td className="border border-black py-0.5"></td><td className="border border-black py-0.5"></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <table className="flex-1 w-1/2 table-fixed border-collapse border border-black text-center leading-snug print:h-full">
                            <thead>
                                <tr>
                                    <th className="border border-black font-normal py-0.5 w-[10%]">NO.</th>
                                    <th className="border border-black font-normal py-0.5 w-[15%]">STORE</th>
                                    <th className="border border-black font-normal py-0.5 w-[25%]">CONT. ID</th>
                                    <th className="border border-black font-normal py-0.5 w-[20%]">TOTAL SKU</th>
                                    <th className="border border-black font-normal py-0.5 w-[15%]">TTL QTY</th>
                                    <th className="border border-black font-normal py-0.5 w-[15%]">TTL.KOLI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rightTableData.map((row, i) => (
                                    <tr key={i}>
                                        <td className="border border-black py-0.5">{row.no}</td>
                                        <td className="border border-black py-0.5">{row.store}</td>
                                        <td className="border border-black py-0.5 tracking-tight">{row.contId}</td>
                                        <td className="border border-black py-0.5">{row.sku}</td>
                                        <td className="border border-black py-0.5"></td><td className="border border-black py-0.5"></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-start mt-1">
                        <div className="text-xs print:text-[13px] leading-none pt-1">
                            Jalur/Aisle <span className="font-bold">01</span>
                        </div>
                        <div className="text-[10px] print:text-[10px] italic pr-2 pt-2">
                            Jaga kesehatan dan kebersihan
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
