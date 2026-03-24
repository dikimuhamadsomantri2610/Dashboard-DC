export interface SuratTugasFreshApiItem {
    id: number;
    no_armada: string;
    dc: string;
    nama_driver: string;
    number_seal: string;
    inisial_toko: string;
    nama_toko: string;
    site: string;
    jumlah_koli: number;
    kodeGembok: string;
    admin: string;
    createdAt: string;
    vendor?: string;
    tanggalKirim?: string;
}

export interface GroupedSuratTugasFresh {
    groupId: string;
    no_armada: string;
    dc: string;
    nama_driver: string;
    admin: string;
    createdAt: string;
    vendor: string;
    items: SuratTugasFreshApiItem[];
}
