export interface SuratTugasFreshApiItem {
    id: number;
    noArmada: string;
    dc: string;
    namaDriver: string;
    numberSeal: string;
    inisialToko: string;
    nama_toko: string;   // masih snake_case karena dikirim dari backend join
    site: string;
    jumlahContainer: number;
    jumlahBox: number;
    jumlahDus: number;
    kodeGembok: string;
    admin: string;
    createdAt: string;
    vendor?: string;
    tanggalKirim?: string;
}

export interface GroupedSuratTugasFresh {
    groupId: string;
    noArmada: string;
    dc: string;
    namaDriver: string;
    admin: string;
    createdAt: string;
    vendor: string;
    items: SuratTugasFreshApiItem[];
}
