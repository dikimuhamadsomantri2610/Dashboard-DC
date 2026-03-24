export interface SuratTugasApiItem {
    id: number;
    no_armada: string;
    dc: string;
    nama_driver: string;
    number_seal: string;
    load_number: string;
    inisial_toko: string;
    nama_toko: string;
    site: string;
    jumlah_container: number;
    jumlah_koli: number;
    materai: string;
    keterangan: string;
    kodeGembok: string;
    admin: string;
    createdAt: string;
    vendor?: string;
    tanggalKirim?: string;
}

export interface GroupedSuratTugas {
    groupId: string;
    no_armada: string;
    dc: string;
    nama_driver: string;
    admin: string;
    createdAt: string;
    vendor: string;
    items: SuratTugasApiItem[];
}
