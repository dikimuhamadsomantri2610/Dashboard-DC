import * as XLSX from 'xlsx';
import type { SuratTugasApiItem } from '../types/surat-tugas.types';

export const exportSuratTugasToExcel = (data: SuratTugasApiItem[]) => {
    if (data.length === 0) return;

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
        'Load Number': item.load_number,
        'Jumlah Container': item.jumlah_container,
        'Jumlah Koli': item.jumlah_koli,
        'Materai': item.materai,
        'Kode Gembok': item.kodeGembok,
        'Admin': item.admin,
        'Tanggal Dibuat': new Date(item.createdAt).toLocaleString('id-ID'),
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(flatData);
    XLSX.utils.book_append_sheet(wb, ws, "Surat Tugas");
    XLSX.writeFile(wb, `Surat_Tugas_Armada_${new Date().toISOString().split('T')[0]}.xlsx`);
};

// Fungsi convert Kode Gembok
export function generateKodeGembok(input: string, siteStr: string = ""): string {
    if (!input) return '';
    const valA2 = input.replace(/\D/g, '').padEnd(4, '0');
    const siteVal = siteStr.length >= 3 ? siteStr.slice(-3) : siteStr;
    const valB2 = siteVal.padStart(4, '0');
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const idx1 = Math.max(0, 18 - parseInt(valB2[0] || '0') - parseInt(valA2[0]));
    const idx2 = Math.max(0, 18 - parseInt(valB2[1] || '0') - parseInt(valA2[1]));
    const idx3 = Math.max(0, 18 - parseInt(valB2[2] || '0') - parseInt(valA2[2]));
    const idx4 = Math.max(0, 18 - parseInt(valB2[3] || '0') - parseInt(valA2[3]));

    return `${chars[idx1] || ''}${chars[idx2] || ''}${chars[idx3] || ''}${chars[idx4] || ''}`;
}
