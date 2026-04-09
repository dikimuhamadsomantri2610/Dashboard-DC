import type { GroupedSuratTugasFresh, SuratTugasFreshApiItem } from '../types/surat-tugas-fresh.types';
import { generateKodeGembok } from './utils/generateKodeGembok';
import { SuratTugasFreshBarcode as BarcodeBox } from './components/SuratTugasFreshBarcode';

const ITEMS_PER_PAGE = 13;

interface SuratTugasFreshPaperA4Props {
    data: GroupedSuratTugasFresh & { printIndex?: number };
}

interface SinglePageProps {
    data: GroupedSuratTugasFresh & { printIndex?: number };
    pageItems: SuratTugasFreshApiItem[];
    startIndex: number;
    isLastPage: boolean;
}

function SingleA4Page({ data, pageItems, startIndex, isLastPage }: SinglePageProps) {
    const dcName = data.items[0]?.dc || 'DC GBG';
    let address = "";
    let phone = "";

    switch (dcName) {
        case 'DC GBG':
            address = "Jl. Soekarno-Hatta No.724, Kota Bandung, Jawa Barat 40295";
            phone = "081519082630";
            break;
        case 'DC D53':
            address = "Jl. Jakarta No.53, Kebonwaru, Kec. Batununggal, Kota Bandung, Jawa Barat 40272";
            phone = "081234567890";
            break;
        case 'DC DRE':
            address = "Jl. Ranca Ekek";
            phone = "081222222222";
            break;
        case 'DC DMR':
            address = "Jl. Mekar Raya No.kav 9A, Mekar Mulya, Kec. Panyileukan, Kota Bandung, Jawa Barat";
            phone = "080987654321";
            break;
        default:
            address = "Jl. Gedebage Selatan, Babakan Penghulu, Kec. Cinambo, Kota Bandung, Jawa Barat 40293";
            phone = "081519082630";
            break;
    }

    const emptyRowCount = Math.max(0, ITEMS_PER_PAGE - pageItems.length);

    return (
        <div
            className="print:flex print:flex-col print:w-full print:m-0 print:p-0 font-sans bg-white text-black"
            style={{ 
                width: '297mm', 
                height: '210mm',
                pageBreakAfter: isLastPage ? 'auto' : 'always',
                breakAfter: isLastPage ? 'auto' : 'page',
            }}
        >
            <div className="print:px-4 print:pt-4 pb-0 flex flex-col h-full">

                {/* Header Content */}
                <div className="relative flex justify-center items-center mb-4">
                    <div className="absolute left-0 top-0">
                        {/* Using <img> for SVG to ensure it prints well */}
                        <img src="/src/assets/logo_yomart_detail.svg" alt="Yomart Logo" className="h-15 object-contain" />
                    </div>
                    <div className="text-center pt-4">
                        <h1 className="text-[16px] font-bold tracking-wider mb-2">SURAT TUGAS PENGIRIMAN {dcName}</h1>
                    </div>
                </div>

                {/* Address Section */}
                <div className="text-[9px] font-normal mt-1">{address}</div>
                <div className="text-[9px] font-normal mb-4">No. Telp : {phone}</div>

                {/* Info Section */}
                <div className="grid grid-cols-2 gap-x-12 px-2 text-[12px] mb-4">
                    <div className="space-y-1">
                        <div className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5">
                            <span>NO</span>
                            <span>:</span>
                            <span className="font-semibold uppercase truncate">
                                {data.printIndex || 111}
                            </span>
                        </div>
                        <div className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5">
                            <span>VENDOR</span>
                            <span>:</span>
                            <span className="font-semibold uppercase truncate">
                                {data.vendor}
                            </span>
                        </div>
                        <div className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5">
                            <span>NAMA DRIVER</span>
                            <span>:</span>
                            <span className="font-semibold uppercase truncate">{data.namaDriver}</span>
                        </div>
                        <div className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5">
                            <span>NO ARMADA</span>
                            <span>:</span>
                            <span className="font-semibold uppercase truncate">{data.noArmada}</span>
                        </div>
                        <div className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5 items-start">
                            <span>HARI/ TANGGAL</span>
                            <span>:</span>
                            <span className="font-semibold uppercase overflow-hidden whitespace-nowrap text-ellipsis">
                                {new Date((data.items && data.items[0]?.tanggalKirim) || data.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5">
                            <span>JAM BERANGKAT</span>
                            <span>:</span>
                            <span className="font-semibold uppercase text-transparent select-none">-</span>
                        </div>
                        <div className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5">
                            <span>NUMBER SEAL</span>
                            <span>:</span>
                            <span className="font-semibold uppercase truncate">{data.items[0]?.numberSeal || ''}</span>
                        </div>
                    </div>
                </div>

                {/* TABLE 1: Delivery info */}
                <table
                    className="w-full border-collapse bg-white text-[12px] text-center"
                    style={{ tableLayout: 'fixed', border: '1px solid #000' }}
                >
                    <thead >
                        <tr className='bg-gray-200/50'>
                            <td style={{ border: '1px solid #000' }} rowSpan={2} className="font-bold p-0.5 whitespace-nowrap align-middle">
                                URUTAN<br />KIRIM
                            </td>
                            <td style={{ border: '1px solid #000' }} rowSpan={2} className="font-bold p-0.5 align-middle">INISIAL</td>
                            <td style={{ border: '1px solid #000' }} rowSpan={2} className="font-bold p-0.5 align-middle">KODE</td>
                            <td style={{ border: '1px solid #000' }} rowSpan={2} className="font-bold p-0.5 px-1 w-[15%] align-middle">
                                NAMA CABANG
                            </td>
                            <td style={{ border: '1px solid #000' }} rowSpan={2} className="font-bold p-0.5 align-middle">
                                JUMLAH <br />KOLI
                            </td>
                            <td style={{ border: '1px solid #000' }} rowSpan={2} className="font-bold p-0.5 whitespace-nowrap align-middle">
                                KM TIBA
                            </td>
                            <td style={{ border: '1px solid #000' }} rowSpan={2} className="font-bold p-0.5 whitespace-nowrap align-middle">
                                JAM TIBA
                            </td>
                            <td style={{ border: '1px solid #000' }} rowSpan={2} className="font-bold p-0.5 whitespace-nowrap align-middle">
                                JAM<br />SELESAI
                            </td>
                            <td style={{ border: '1px solid #000' }} rowSpan={2} className="font-bold p-0.5 px-1 w-[10%] align-middle">
                                KODE <br />GEMBOK
                            </td>
                            <td style={{ border: '1px solid #000' }} colSpan={2} className="font-bold p-0.5 align-middle">
                                BAD STOCK
                            </td>
                            <td style={{ border: '1px solid #000' }} rowSpan={2} className="font-bold p-0.5 px-1 w-[20%] align-middle">
                                TANDA TANGAN & CAP
                            </td>
                        </tr>

                        <tr className="font-bold bg-gray-200/50">
                            <td style={{ border: '1px solid #000' }} className="p-0.5 align-middle">RETUR</td>
                            <td style={{ border: '1px solid #000' }} className="p-0.5 align-middle">TOLAKAN</td>
                        </tr>
                    </thead>

                    <tbody>
                        {pageItems.map((item, idx) => (
                            <tr key={item.id} className="h-[30px]">
                                <td style={{ border: '1px solid #000' }} className="px-0.5 align-middle">{startIndex + idx + 1}</td>
                                <td style={{ border: '1px solid #000' }} className="px-0.5 align-middle">{item.inisialToko}</td>
                                <td style={{ border: '1px solid #000' }} className="px-0.5 align-middle">{item.site}</td>

                                <td
                                    style={{ border: '1px solid #000' }}
                                    className="px-1 text-left truncate align-middle"
                                    title={item.nama_toko}
                                >
                                    {item.nama_toko}
                                </td>

                                <td style={{ border: '1px solid #000' }} className="px-0.5 align-middle">{item.jumlahKoli}</td>
                                <td style={{ border: '1px solid #000' }} className="px-0.5 align-middle"></td>
                                <td style={{ border: '1px solid #000' }} className="px-0.5 align-middle"></td>
                                <td style={{ border: '1px solid #000' }} className="px-0.5 align-middle"></td>

                                <td style={{ border: '1px solid #000' }} className="px-0.5 align-middle">
                                    <div className="flex items-center justify-center h-[20px] overflow-hidden">
                                        <BarcodeBox
                                            value={generateKodeGembok(item.kodeGembok, item.site) || ''}
                                        />
                                    </div>
                                </td>

                                <td style={{ border: '1px solid #000' }} className="px-0.5 align-middle"></td>
                                <td style={{ border: '1px solid #000' }} className="px-0.5 align-middle"></td>
                                <td style={{ border: '1px solid #000' }} className="px-0.5 align-middle"></td>
                            </tr>
                        ))}

                        {/* EMPTY ROWS */}
                        {Array.from({ length: emptyRowCount }).map((_, idx) => (
                            <tr key={`empty-${idx}`} className="h-[30px]">
                                {Array.from({ length: 12 }).map((__, i) => (
                                    <td
                                        key={i}
                                        style={{ border: '1px solid #000' }}
                                        className="px-0.5 align-middle text-transparent select-none"
                                    >
                                        -
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Signatures & Additional Info Layout */}
                <div className="relative flex flex-col mt-auto text-[10px] font-bold">
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'start', gap: '8px', marginBottom: '20px' }}>

                        {/* Signature Boxes */}
                        <div className="flex gap-2">
                            {/* ADM. DISTRIBUSI */}
                            <div className="flex flex-col border-2 border-black w-[120px] h-[100px]" style={{ border: '1px solid #000' }}>
                                <div className="border-b-2 border-black py-0.5 text-center bg-gray-200/50">
                                    <span className="text-[9px]">STAFF. DISTRIBUSI</span>
                                </div>
                                <div className="flex-1"></div>
                                <div className="border-t-2 border-black py-0.5 text-center bg-gray-200/50">
                                    <span className="uppercase text-[9px] wrap-break-word px-1 line-clamp-1" title={data.admin}>{data.admin}</span>
                                </div>
                            </div>
                            {/* DRIVER */}
                            <div className="flex flex-col border-2 border-black w-[110px] h-[100px]">
                                <div className="border-b-2 border-black py-0.5 text-center bg-gray-200/50">
                                    <span className="text-[9px]">DRIVER</span>
                                </div>
                                <div className="flex-1"></div>
                                <div className="border-t-2 border-black py-0.5 text-center bg-gray-200/50">
                                    <span className="uppercase text-[9px] wrap-break-word px-1 line-clamp-1" title={data.namaDriver}>{data.namaDriver}</span>
                                </div>
                            </div>
                            {/* SECURITY */}
                            <div className="flex flex-col border-2 border-black w-[110px] h-[100px]">
                                <div className="border-b-2 border-black py-0.5 text-center bg-gray-200/50">
                                    <span className="text-[9px]">SECURITY</span>
                                </div>
                                <div className="flex-1"></div>
                                <div className="border-t-2 border-black py-0.5 text-center bg-gray-200/50">
                                    <span className="text-[9px]">&nbsp;</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-end gap-4 text-right ml-[500px]" style={{ minWidth: '150px' }}>
                            <div className="grid grid-cols-[90px_auto] items-end border-b border-dotted border-black pb-1">
                                <span className="text-left">KM AWAL :</span>
                                <span></span>
                            </div>
                            <div className="grid grid-cols-[90px_auto] items-end border-b border-dotted border-black pb-1">
                                <span className="text-left">KM AKHIR :</span>
                                <span></span>
                            </div>
                            <div className="grid grid-cols-[90px_auto] items-end border-b border-dotted border-black pb-1">
                                <span className="text-left">TIBA DI DC:</span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SuratTugasFreshPaperA4({ data }: SuratTugasFreshPaperA4Props) {
    if (!data) return null;

    // Chunk items menjadi kelompok maks 13 per halaman
    const chunks: SuratTugasFreshApiItem[][] = [];
    for (let i = 0; i < data.items.length; i += ITEMS_PER_PAGE) {
        chunks.push(data.items.slice(i, i + ITEMS_PER_PAGE));
    }
    // Jika tidak ada items, tetap render 1 halaman kosong
    if (chunks.length === 0) chunks.push([]);

    return (
        <div className="hidden print:block print:w-full print:m-0 print:p-0 font-sans bg-white text-black print:absolute print:top-0 print:left-0 z-50">
            <style>
                {`
                     @media print {
                        @page {
                            size: A4 landscape;
                            margin: 0;
                        }
                        html, body {
                            margin: 0 !important;
                            padding: 0 !important;
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                            background-color: white !important;
                            color: black !important;
                            color-scheme: light !important;
                            -webkit-font-smoothing: auto !important;
                        }
                    }
                `}
            </style>
            
            {chunks.map((pageItems, pageIdx) => (
                <SingleA4Page
                    key={pageIdx}
                    data={data}
                    pageItems={pageItems}
                    startIndex={pageIdx * ITEMS_PER_PAGE}
                    isLastPage={pageIdx === chunks.length - 1}
                />
            ))}
        </div>
    );
}
