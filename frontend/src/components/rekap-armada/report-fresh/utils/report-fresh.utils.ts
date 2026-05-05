import * as XLSX from "xlsx";
import type { SuratTugasFreshApiItem } from "@/components/rekap-armada/surat-tugas-fresh/types/surat-tugas-fresh.types";
import { toast } from "sonner";

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

export const fmtDateTime = (iso: string) =>
  new Date(iso)
    .toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", "");

export const exportReportFreshToExcel = (rows: SuratTugasFreshApiItem[]) => {
  if (rows.length === 0) {
    toast.warning("Tidak ada data untuk diekspor.");
    return;
  }

  const flatData = rows.map((item, idx) => ({
    No: idx + 1,
    "No Armada": item.noArmada,
    "Nama Driver": item.namaDriver,
    DC: item.dc,
    "Nama Toko": item.nama_toko || item.inisialToko || "-",
    "Kode Gembok": item.kodeGembok,
    "Jumlah Container": item.jumlahContainer,
    "Jumlah Box": item.jumlahBox,
    "Jumlah Kardus": item.jumlahDus,
    "Jumlah Bolit": item.jumlahBolit,
    Admin: item.admin,
    "Tanggal Kirim": item.tanggalKirim ? fmtDate(item.tanggalKirim) : "-",
    "Tanggal Dibuat": fmtDateTime(item.createdAt),
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(flatData);
  ws["!cols"] = [
    { wch: 5 }, { wch: 14 }, { wch: 20 }, { wch: 10 }, { wch: 25 },
    { wch: 16 }, { wch: 18 }, { wch: 14 }, { wch: 16 }, { wch: 14 },
    { wch: 14 }, { wch: 16 }, { wch: 20 },
  ];
  XLSX.utils.book_append_sheet(wb, ws, "Report Fresh");
  XLSX.writeFile(wb, `Report_Fresh_${new Date().toISOString().split("T")[0]}.xlsx`);
  toast.success("Export berhasil!", { description: "File Excel telah diunduh." });
};
