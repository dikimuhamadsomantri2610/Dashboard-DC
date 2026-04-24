"use client";
import type {
  GroupedSuratTugasFresh,
  SuratTugasFreshApiItem,
} from "../types/surat-tugas-fresh.types";
import { generateKodeGembok } from "./utils/generateKodeGembok";
import { SuratTugasFreshBarcode as BarcodeBox } from "./components/SuratTugasFreshBarcode";

// Konstanta ini menentukan batas maksimal baris/toko yang akan dicetak di satu halaman A4.
// Jika melebihi 13, sisa data akan dicetak di halaman berikutnya.
const ITEMS_PER_PAGE = 13;

export interface DistributionCenterData {
  id: number;
  site: string;
  inisialDc: string;
  namaDc: string;
  alamatDc: string;
  phoneNumber: string;
}

interface SuratTugasFreshPaperA4Props {
  data: GroupedSuratTugasFresh & { printIndex?: number };
  distributionCenters?: DistributionCenterData[];
}

interface SinglePageProps {
  data: GroupedSuratTugasFresh & { printIndex?: number };
  pageItems: SuratTugasFreshApiItem[];
  startIndex: number;
  isLastPage: boolean;
  distributionCenters?: DistributionCenterData[];
}

// Komponen SingleA4Page bertugas untuk merender satu halaman fisik A4 ketika dicetak.
// Menerima data 13 baris toko (atau kurang), dan properti isLastPage untuk menentukan jeda halaman (page break).
function SingleA4Page({
  data,
  pageItems,
  startIndex,
  isLastPage,
  distributionCenters,
}: SinglePageProps) {
  // Menentukan nama, alamat, dan nomor telepon berdasarkan nama DC (Distribution Center).
  // Jika tidak ada data item, maka default-nya menggunakan 'DGC'.
  const rawDcName = data.items[0]?.dc || "DGC";

  // Cari DC yang cocok dengan site, inisialDc atau namaDc
  const matchedDc = distributionCenters?.find(
    (dc) =>
      dc.namaDc === rawDcName ||
      dc.inisialDc === rawDcName ||
      dc.site === rawDcName ||
      `DC ${dc.inisialDc}` === rawDcName,
  );

  const dcName = matchedDc?.namaDc || rawDcName;
  const address =
    matchedDc?.alamatDc ||
    "Jl. Soekarno-Hatta No.236a, Kopo, Kec. Bojongloa Kaler, Kota Bandung, Jawa Barat 40233";
  const phone = matchedDc?.phoneNumber || "08123456789";

  // Menghitung berapa baris kosong yang harus dirender.
  // Hal ini guna memastikan ukuran tabel tetap statis dan mengisi penuh halaman
  // meski jumlah toko yang masuk pada satu halaman itu kurang dari ITEMS_PER_PAGE.
  const emptyRowCount = Math.max(0, ITEMS_PER_PAGE - pageItems.length);

  return (
    <div
      className="print:flex print:flex-col print:w-full print:m-0 print:p-0 font-sans bg-white text-black overflow-hidden box-border"
      style={{
        // Spesifikasi ukuran standar A4 secara Landscape.
        width: "100%",
        height: "100vh", // Menggunakan 100vh agar tingginya pas seluas keras asli, tanpa tumpah
        // Logika page-break: memaksa browser/printer untuk pindah ke halaman baru
        // setelah elemen ini, kecuali jika instruksi ini ada di halaman yang terakhir.
        pageBreakAfter: isLastPage ? "avoid" : "always",
        breakAfter: isLastPage ? "avoid" : "page",
      }}
    >
      <div className="print:px-4 print:pt-4 pb-0 flex flex-col h-full">
        {/* Header Content */}
        <div className="relative flex justify-center items-center mb-4">
          <div className="absolute left-0 top-0">
            {/* Using <img> for SVG to ensure it prints well */}
            <img
              src="/logo_yomart_detail.svg"
              alt="Yomart Logo"
              className="h-15 object-contain"
            />
          </div>
          <div className="text-center pt-4">
            <h1 className="text-[16px] font-bold tracking-wider mb-2">
              SURAT TUGAS PENGIRIMAN {dcName}
            </h1>
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
              <span className="font-semibold uppercase truncate">
                {data.namaDriver}
              </span>
            </div>
            <div className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5">
              <span>NO ARMADA</span>
              <span>:</span>
              <span className="font-semibold uppercase truncate">
                {data.noArmada}
              </span>
            </div>
            <div className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5 items-start">
              <span>HARI/ TANGGAL</span>
              <span>:</span>
              <span className="font-semibold uppercase overflow-hidden whitespace-nowrap text-ellipsis">
                {new Date(
                  (data.items && data.items[0]?.tanggalKirim) || data.createdAt,
                ).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5">
              <span>JAM BERANGKAT</span>
              <span>:</span>
              <span className="font-semibold uppercase text-transparent select-none">
                -
              </span>
            </div>
            <div className="grid grid-cols-[100px_10px_auto] border-b border-dotted border-black pb-0.5">
              <span>NUMBER SEAL</span>
              <span>:</span>
              <span className="font-semibold uppercase truncate">
                {data.items[0]?.numberSeal || ""}
              </span>
            </div>
          </div>
        </div>

        {/* TABLE 1: Delivery info */}
        <table
          className="w-full border-collapse bg-white text-[12px] text-center"
          style={{ tableLayout: "fixed", border: "1px solid #000" }}
        >
          <thead>
            <tr className="bg-gray-200/50">
              <td
                style={{ border: "1px solid #000" }}
                rowSpan={2}
                className="font-bold p-0.5 whitespace-nowrap align-middle"
              >
                URUTAN
                <br />
                KIRIM
              </td>
              <td
                style={{ border: "1px solid #000" }}
                rowSpan={2}
                className="font-bold p-0.5 align-middle"
              >
                INISIAL
              </td>
              <td
                style={{ border: "1px solid #000" }}
                rowSpan={2}
                className="font-bold p-0.5 align-middle"
              >
                KODE
              </td>
              <td
                style={{ border: "1px solid #000" }}
                rowSpan={2}
                className="font-bold p-0.5 px-1 w-[20%] align-middle"
              >
                NAMA CABANG
              </td>
              <td
                style={{ border: "1px solid #000" }}
                colSpan={3}
                className="font-bold p-0.5 align-middle"
              >
                JUMLAH
              </td>
              <td
                style={{ border: "1px solid #000" }}
                rowSpan={2}
                className="font-bold p-0.5 whitespace-nowrap align-middle"
              >
                KM
                <br /> TIBA
              </td>
              <td
                style={{ border: "1px solid #000" }}
                rowSpan={2}
                className="font-bold p-0.5 whitespace-nowrap align-middle"
              >
                JAM
                <br /> TIBA
              </td>
              <td
                style={{ border: "1px solid #000" }}
                rowSpan={2}
                className="font-bold p-0.5 whitespace-nowrap align-middle"
              >
                JAM
                <br />
                SELESAI
              </td>
              <td
                style={{ border: "1px solid #000" }}
                rowSpan={2}
                className="font-bold p-0.5 px-1 w-[10%] align-middle"
              >
                KODE <br />
                GEMBOK
              </td>
              <td
                style={{ border: "1px solid #000" }}
                colSpan={2}
                className="font-bold p-0.5 align-middle"
              >
                BAD STOCK
              </td>
              <td
                style={{ border: "1px solid #000" }}
                rowSpan={2}
                className="font-bold p-0.5 px-1 w-[10%] align-middle"
              >
                TANDA TANGAN & CAP
              </td>
            </tr>

            <tr className="font-bold bg-gray-200/50">
              <td
                style={{ border: "1px solid #000" }}
                className="p-0.5 align-middle"
              >
                CONT
              </td>
              <td
                style={{ border: "1px solid #000" }}
                className="p-0.5 align-middle"
              >
                BOX
              </td>
              <td
                style={{ border: "1px solid #000" }}
                className="p-0.5 align-middle"
              >
                DUS
              </td>
              <td
                style={{ border: "1px solid #000" }}
                className="p-0.5 align-middle"
              >
                RETUR
              </td>
              <td
                style={{ border: "1px solid #000" }}
                className="p-0.5 align-middle"
              >
                TOLAKAN
              </td>
            </tr>
          </thead>

          <tbody>
            {/* MULAI ITERASI DATA TOKO: Loop array item yang ditugaskan pada halaman spesifik ini */}
            {pageItems.map((item, idx) => (
              <tr key={item.id} className="h-[30px]">
                <td
                  style={{ border: "1px solid #000" }}
                  className="px-0.5 align-middle"
                >
                  {startIndex + idx + 1}
                </td>
                <td
                  style={{ border: "1px solid #000" }}
                  className="px-0.5 align-middle"
                >
                  {item.inisialToko}
                </td>
                <td
                  style={{ border: "1px solid #000" }}
                  className="px-0.5 align-middle"
                >
                  {item.site}
                </td>

                <td
                  style={{ border: "1px solid #000" }}
                  className="px-1 text-left truncate align-middle"
                  title={item.nama_toko}
                >
                  {item.nama_toko}
                </td>

                <td
                  style={{ border: "1px solid #000" }}
                  className="px-0.5 align-middle"
                >
                  {item.jumlahContainer ? item.jumlahContainer : ''}
                </td>
                <td
                  style={{ border: "1px solid #000" }}
                  className="px-0.5 align-middle"
                >
                  {item.jumlahBox ? item.jumlahBox : ''}
                </td>
                <td
                  style={{ border: "1px solid #000" }}
                  className="px-0.5 align-middle"
                >
                  {item.jumlahDus ? item.jumlahDus : ''}
                </td>
                <td
                  style={{ border: "1px solid #000" }}
                  className="px-0.5 align-middle"
                ></td>
                <td
                  style={{ border: "1px solid #000" }}
                  className="px-0.5 align-middle"
                ></td>
                <td
                  style={{ border: "1px solid #000" }}
                  className="px-0.5 align-middle"
                ></td>

                <td
                  style={{ border: "1px solid #000" }}
                  className="px-0.5 align-middle"
                >
                  {/* Memanggil komponen Barcode berdasarkan helper kombinasi gembok dan sandi toko */}
                  <div className="flex items-center justify-center h-[24px] overflow-hidden">
                    <BarcodeBox
                      value={
                        generateKodeGembok(item.kodeGembok, item.site) || ""
                      }
                    />
                  </div>
                </td>

                <td
                  style={{ border: "1px solid #000" }}
                  className="px-0.5 align-middle"
                ></td>
                <td
                  style={{ border: "1px solid #000" }}
                  className="px-0.5 align-middle"
                ></td>
                <td
                  style={{ border: "1px solid #000" }}
                  className="px-0.5 align-middle"
                ></td>
              </tr>
            ))}

            {/* ROW KOSONG KORUM: Sederetan row strip "-" untuk memenuhi sisa sel tabel.
                            Sehingga tinggi grid dan garis kotak tabel tetap seimbang walau isinya kurang. */}
            {Array.from({ length: emptyRowCount }).map((_, idx) => (
              <tr key={`empty-${idx}`} className="h-[30px]">
                {Array.from({ length: 14 }).map((__, i) => (
                  <td
                    key={i}
                    style={{ border: "1px solid #000" }}
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
        {startIndex === 0 && (
          <div className="relative flex flex-col mt-auto text-[10px] font-bold">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                alignItems: "start",
                gap: "8px",
                marginBottom: "20px",
              }}
            >
              {/* Signature Boxes */}
              <div className="flex gap-2">
                {/* ADM. DISTRIBUSI */}
                <div
                  className="flex flex-col border-2 border-black w-[120px] h-[100px]"
                  style={{ border: "1px solid #000" }}
                >
                  <div className="border-b-2 border-black py-0.5 text-center bg-gray-200/50">
                    <span className="text-[9px]">STAFF. DISTRIBUSI</span>
                  </div>
                  <div className="flex-1"></div>
                  <div className="border-t-2 border-black py-0.5 text-center bg-gray-200/50">
                    <span
                      className="uppercase text-[9px] wrap-break-word px-1 line-clamp-1"
                      title={data.admin}
                    >
                      {data.admin}
                    </span>
                  </div>
                </div>
                {/* DRIVER */}
                <div className="flex flex-col border-2 border-black w-[110px] h-[100px]">
                  <div className="border-b-2 border-black py-0.5 text-center bg-gray-200/50">
                    <span className="text-[9px]">DRIVER</span>
                  </div>
                  <div className="flex-1"></div>
                  <div className="border-t-2 border-black py-0.5 text-center bg-gray-200/50">
                    <span
                      className="uppercase text-[9px] wrap-break-word px-1 line-clamp-1"
                      title={data.namaDriver}
                    >
                      {data.namaDriver}
                    </span>
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

              <div
                className="flex flex-col justify-end gap-4 text-right ml-[500px]"
                style={{ minWidth: "150px" }}
              >
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
        )}
      </div>
    </div>
  );
}

// Komponen utama yang dipanggil via parent UI, tersembunyi selama mode layar layar karena memakai `hidden print:block`.
// Komponen inilah yang akan dicetak oleh printer secara landscape menggunakan CSS pada bagian style di bawah.
export default function SuratTugasFreshPaperA4({
  data,
  distributionCenters,
}: SuratTugasFreshPaperA4Props) {
  if (!data) return null;

  // Chunk items: Memecah semua daftar kunjungan toko menjadi bagian-bagian kecil per ITEMS_PER_PAGE.
  // Misalnya ada 20 toko, maka chunks akan berisi 2 array: array pertama 13 item, array kedua 7 item.
  const chunks: SuratTugasFreshApiItem[][] = [];
  for (let i = 0; i < data.items.length; i += ITEMS_PER_PAGE) {
    chunks.push(data.items.slice(i, i + ITEMS_PER_PAGE));
  }
  // Jika surat tugas tidak memiliki items apapun (kasus langka),
  // kita setidaknya memberikan satu array kosong agar 1 halaman kosong tetap tercetak.
  if (chunks.length === 0) chunks.push([]);

  return (
    <div className="hidden print:block print:w-full print:m-0 print:p-0 font-sans bg-white text-black print:absolute print:top-0 print:left-0 z-50">
      {/* CSS SETTINGS KHUSUS UNTUK PRINTING:
                Menghapus margin bawaan browser, memaksakan warna tercetak akurat (print-color-adjust),
                dan menetapkan orientasi kertas sebagai Landscape.
            */}
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

      {/* LOOP HALAMAN: Merender ulang komponen `SingleA4Page` sebanyak jumlah sub-array (chunks).
                Parameter startIndex memastikan penomoran dalam tabel diteruskan sesuai halamannya (misal lanjut dari 14 di halaman kedua).
            */}
      {chunks.map((pageItems, pageIdx) => (
        <SingleA4Page
          key={pageIdx}
          data={data}
          pageItems={pageItems}
          startIndex={pageIdx * ITEMS_PER_PAGE}
          isLastPage={pageIdx === chunks.length - 1}
          distributionCenters={distributionCenters}
        />
      ))}
    </div>
  );
}
