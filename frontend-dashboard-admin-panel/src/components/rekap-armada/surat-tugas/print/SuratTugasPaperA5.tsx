"use client";
import type { GroupedSuratTugas } from '../types/surat-tugas.types';
import { generateKodeGembok } from '../utils/surat-tugas.utils';

import { BarcodeBox } from '@/components/ui/barcode-box';
interface SuratTugasPaperA5Props {
    selectedGroupForPrint: GroupedSuratTugas & { printIndex?: number } | null;
}

export default function SuratTugasPaperA5({ selectedGroupForPrint }: SuratTugasPaperA5Props) {
    if (!selectedGroupForPrint) return null;

    const getDcInfo = () => {
        const dcName = selectedGroupForPrint.items[0]?.dc || 'DC GBG';
        switch (dcName) {
            case 'DC GBG': return { addr: "Jl. Soekarno-Hatta No.724, Kota Bandung, Jawa Barat 40295", phone: "081519082630" };
            case 'DC D53': return { addr: "Jl. Jakarta No.53, Kebonwaru, Kec. Batununggal, Kota Bandung, Jawa Barat 40272", phone: "081234567890" };
            case 'DC DRE': return { addr: "Jl. Ranca Ekek", phone: "081222222222" };
            case 'DC DMR': return { addr: "Jl. Mekar Raya No.kav 9A, Mekar Mulya, Kec. Panyileukan, Kota Bandung, Jawa Barat", phone: "080987654321" };
            default: return { addr: "Jl. Gedebage Selatan, Babakan Penghulu, Kec. Cinambo, Kota Bandung, Jawa Barat 40293", phone: "081519082630" };
        }
    };
    const dcInfo = getDcInfo();

    return (
        <div className="hidden print:block print:w-full print:m-0 print:p-0 font-sans bg-white text-black print:absolute print:top-0 print:left-0" style={{ width: '210mm', height: '148mm' }}>
            <style>
                {`
                @media print {
                    @page { size: A5 landscape; margin: 0; }
                    html, body {
                        margin: 0 !important; padding: 0 !important; width: 210mm; height: 148mm;
                        overflow: hidden; -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important; background-color: white !important;
                        color: black !important; color-scheme: light !important; -webkit-font-smoothing: auto !important;
                    }
                }
                `}
            </style>
            <div className="print:px-4 print:pt-4 pb-0">
                <div className="relative flex justify-center items-center mb-4">
                    <div className="absolute left-0 top-0">
                        <img src="/logo_yomart_detail.svg" alt="Yomart Logo" className="h-15 object-contain" />
                    </div>
                    <div className="text-center pt-4">
                        <h1 className="text-[16px] font-bold tracking-wider mb-2">SURAT TUGAS PENGIRIMAN {selectedGroupForPrint.items[0]?.dc || 'DC GBG'}</h1>
                    </div>
                </div>

                <div className="text-[9px] font-normal mt-1">{dcInfo.addr}</div>
                <div className="text-[9px] font-normal mb-4">No. Telp : {dcInfo.phone}</div>

                <div className="grid grid-cols-2 gap-x-12 px-2 text-[11px] mb-4">
                    <div className="space-y-1">
                        <div className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5">
                            <span>NO</span><span>:</span>
                            <span className="font-semibold uppercase truncate">{selectedGroupForPrint.printIndex || 111}</span>
                        </div>
                        <div className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5">
                            <span>VENDOR</span><span>:</span>
                            <span className="font-semibold uppercase truncate">{selectedGroupForPrint.vendor}</span>
                        </div>
                        <div className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5">
                            <span>NAMA DRIVER</span><span>:</span>
                            <span className="font-semibold uppercase truncate">{selectedGroupForPrint.namaDriver}</span>
                        </div>
                        <div className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5">
                            <span>NO ARMADA</span><span>:</span>
                            <span className="font-semibold uppercase truncate">{selectedGroupForPrint.noArmada}</span>
                        </div>
                        <div className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5 items-start">
                            <span>HARI/ TANGGAL</span><span>:</span>
                            <span className="font-semibold uppercase overflow-hidden whitespace-nowrap text-ellipsis">
                                {new Date((selectedGroupForPrint.items[0]?.tanggalKirim) || selectedGroupForPrint.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5">
                            <span>JAM BERANGKAT</span><span>:</span>
                            <span className="font-semibold uppercase text-transparent select-none">-</span>
                        </div>
                        <div className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5">
                            <span>NUMBER SEAL</span><span>:</span>
                            <span className="font-semibold uppercase truncate">{selectedGroupForPrint.items[0]?.numberSeal || ''}</span>
                        </div>
                        {selectedGroupForPrint.items.slice(0, 3).map((item, idx) => (
                            <div key={`load-${idx}`} className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5">
                                <span>LOAD NUMBER {idx + 1}</span><span>:</span>
                                <span className="font-semibold uppercase truncate">{item.loadNumber}</span>
                            </div>
                        ))}
                        {selectedGroupForPrint.items.length < 3 && Array.from({ length: 3 - selectedGroupForPrint.items.length }).map((_, idx) => (
                            <div key={`empty-load-${idx}`} className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5">
                                <span>LOAD NUMBER {selectedGroupForPrint.items.length + idx + 1}</span><span>:</span>
                                <span className="font-semibold uppercase text-transparent select-none">-</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TABLE 1: Delivery info */}
                <table className="w-full border-collapse border border-black text-[9px] text-center" style={{ tableLayout: 'auto' }}>
                    <thead>
                        <tr className="bg-gray-200/50">
                            <td rowSpan={2} className="border border-black font-bold p-0.5 whitespace-nowrap">URUTAN<br />KIRIM</td>
                            <td rowSpan={2} className="border border-black font-bold p-0.5">INISIAL</td>
                            <td rowSpan={2} className="border border-black font-bold p-0.5">KODE</td>
                            <td rowSpan={2} className="border border-black font-bold p-0.5 px-1 w-[22%]">NAMA CABANG</td>
                            <td colSpan={2} className="border border-black font-bold p-0.5">JUMLAH</td>
                            <td rowSpan={2} className="border border-black font-bold p-0.5">KET</td>
                            <td rowSpan={2} className="border border-black font-bold p-0.5 whitespace-nowrap">KM TIBA</td>
                            <td rowSpan={2} className="border border-black font-bold p-0.5 whitespace-nowrap">JAM TIBA</td>
                            <td rowSpan={2} className="border border-black font-bold p-0.5 whitespace-nowrap">JAM<br />SELESAI</td>
                            <td rowSpan={2} className="border border-black font-bold p-0.5">BCL</td>
                            <td rowSpan={2} className="border border-black font-bold p-0.5">MATERAI</td>
                            <td rowSpan={2} className="border border-black font-bold p-0.5 w-[14%]">KETERANGAN</td>
                        </tr>
                        <tr className="bg-gray-200/50 font-bold">
                            <td className="border border-black p-0.5">CONT</td>
                            <td className="border border-black p-0.5">KOLI</td>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedGroupForPrint.items.map((item, idx) => (
                            <tr key={item.id}>
                                <td className="border border-black py-[3px] px-0.5">{idx + 1}</td>
                                <td className="border border-black py-[3px] px-0.5">{item.inisialToko}</td>
                                <td className="border border-black py-[3px] px-0.5">{item.site}</td>
                                <td className="border border-black py-[3px] px-1 text-left truncate" title={item.nama_toko}>{item.nama_toko}</td>
                                <td className="border border-black py-[3px] px-0.5">{item.jumlahContainer}</td>
                                <td className="border border-black py-[3px] px-0.5">{item.jumlahKoli}</td>
                                <td className="border border-black py-[3px] px-0.5">{item.keterangan}</td>
                                <td className="border border-black py-[3px] px-0.5"></td>
                                <td className="border border-black py-[3px] px-0.5"></td>
                                <td className="border border-black py-[3px] px-0.5"></td>
                                <td className="border border-black py-[3px] px-0.5 text-[7px]">YA/TDK</td>
                                <td className="border border-black py-[3px] px-0.5 uppercase text-[8px]">{item.materai === 'Iya' || item.materai.toLowerCase() === 'materai' ? 'MATERAI' : '-'}</td>
                                <td className="border border-black py-[3px] px-0.5"></td>
                            </tr>
                        ))}
                        {selectedGroupForPrint.items.length < 3 && Array.from({ length: 3 - selectedGroupForPrint.items.length }).map((_, idx) => (
                            <tr key={`empty-${idx}`}>
                                <td className="border border-black py-[3px] px-0.5 text-transparent select-none">-</td>
                                <td className="border border-black py-[3px] px-0.5 border-none" colSpan={12}></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* TABLE 2: BS / Return info */}
                <table className="w-full border-collapse border border-black text-[9px] text-center mt-2" style={{ tableLayout: 'auto' }}>
                    <thead>
                        <tr className="bg-gray-200/50">
                            <td rowSpan={2} className="border border-black font-bold p-0.5">TOKO</td>
                            <td colSpan={3} className="border border-black font-bold p-0.5">BAD STOCK</td>
                            <td rowSpan={2} className="border border-black font-bold p-0.5 leading-tight text-[8px]">BARANG<br />LEBIH</td>
                            <td rowSpan={2} className="border border-black font-bold p-0.5 leading-tight text-[8px]">KOTAK<br />PELURU</td>
                            <td rowSpan={2} className="border border-black font-bold p-0.5 leading-tight text-[8px]">CONTAINER<br />HIJAU</td>
                            <td colSpan={2} className="border border-black font-bold p-0.5">KERANJANG</td>
                            <td rowSpan={2} className="border border-black font-bold p-0.5 text-[8px]">KARDUS<br />(IKAT)</td>
                            <td rowSpan={2} className="border border-black font-bold p-0.5 text-[8px]">BOX<br />ORANGE</td>
                            <td rowSpan={2} className="border border-black font-bold p-0.5 text-[8px]">ASSET /<br />MARKETING</td>
                        </tr>
                        <tr className="bg-gray-200/50 font-bold text-[9px]">
                            <td className="border border-black p-0.5 w-[8%]">ROTI</td>
                            <td className="border border-black p-0.5 w-[8%]">RETURN</td>
                            <td className="border border-black p-0.5 w-[8%]">TOLAKAN</td>
                            <td className="border border-black p-0.5 w-[8%]">BAKERY</td>
                            <td className="border border-black p-0.5 w-[8%]">TELUR</td>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedGroupForPrint.items.map((item) => (
                            <tr key={`bs-${item.id}`}>
                                <td className="border border-black py-[3px] px-0.5">{item.inisialToko}</td>
                                {[...Array(11)].map((_, i) => <td key={i} className="border border-black py-[3px] px-0.5"></td>)}
                            </tr>
                        ))}
                        {selectedGroupForPrint.items.length < 3 && Array.from({ length: 3 - selectedGroupForPrint.items.length }).map((_, idx) => (
                            <tr key={`bs-empty-${idx}`}>
                                <td className="border border-black py-[3px] px-0.5 text-transparent select-none">-</td>
                                {[...Array(11)].map((_, i) => <td key={i} className="border border-black py-[3px] px-0.5"></td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Signatures & Additional Info Layout */}
                <div className="relative flex flex-col mt-2 text-[10px] font-bold">
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'start', gap: '8px' }}>
                        <div className="flex gap-2">
                            {['ADM. DISTRIBUSI', 'DRIVER', 'SECURITY'].map((title, i) => (
                                <div key={i} className={`flex flex-col border-2 border-black h-[75px] ${i === 0 ? 'w-[120px]' : 'w-[110px]'}`}>
                                    <div className="border-b-2 border-black py-0.5 text-center bg-gray-200/50"><span className="text-[9px]">{title}</span></div>
                                    <div className="flex-1"></div>
                                    <div className="border-t-2 border-black py-0.5 text-center bg-gray-200/50">
                                        <span className={`uppercase text-[9px] wrap-break-word px-1 ${i < 2 ? 'line-clamp-1' : ''}`} title={i === 0 ? selectedGroupForPrint.admin : i === 1 ? selectedGroupForPrint.namaDriver : ''}>
                                            {i === 0 ? selectedGroupForPrint.admin : i === 1 ? selectedGroupForPrint.namaDriver : '\u00A0'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-1 flex-wrap justify-center items-center">
                            {selectedGroupForPrint.items.map((item) => (
                                <BarcodeBox key={item.id} value={generateKodeGembok(item.kodeGembok, item.site) || ''} inisial={item.inisialToko} />
                            ))}
                        </div>

                        <div className="flex flex-col justify-end gap-4 text-right mb-2" style={{ minWidth: '150px' }}>
                            {['KM AWAL :', 'KM AKHIR :', 'TIBA DI DC:'].map((lbl, i) => (
                                <div key={i} className="grid grid-cols-[90px_auto] items-end border-b border-dotted border-black pb-1">
                                    <span className="text-left">{lbl}</span><span></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-4 left-4 text-[9px] font-normal italic">Note : Ket R=Reguler, SR=Sisa Reguler, B=Bakery/Roti, F=Fresh, M=Marketing, L=Lain-Lain</div>
            </div>
        </div>
    );
}
