import * as XLSX from 'xlsx';
import type { SuratTugasFreshApiItem } from '../types/surat-tugas-fresh.types';

export const exportSuratTugasToExcel = (data: SuratTugasFreshApiItem[]) => {
    if (data.length === 0) return;

    // Flatten data untuk mempermudah baca di excel
    const flatData = data.map((item, index) => ({
        'No': index + 1,
        'No Armada': item.no_armada,
        'Vendor': item.vendor || '-',
        'Nama Driver': item.nama_driver,
        'DC': item.dc || '-',
        'Inisial Toko': item.inisial_toko,
        'Kode Toko': item.site,
        'Nama Toko': item.nama_toko,
        'Number Seal': item.number_seal,
        'Jumlah Koli': item.jumlah_koli,
        'Kode Gembok': item.kodeGembok,
        'Admin': item.admin,
        'Tanggal Dibuat': new Date(item.createdAt).toLocaleString('id-ID'),
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(flatData);
    XLSX.utils.book_append_sheet(wb, ws, "Surat Tugas");
    XLSX.writeFile(wb, `Surat_Tugas_Armada_${new Date().toISOString().split('T')[0]}.xlsx`);
};
