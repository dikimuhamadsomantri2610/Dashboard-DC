export interface SuratTugasApiItem {
    id: number;
    noArmada: string;
    dc: string;
    namaDriver: string;
    numberSeal: string;
    loadNumber: string;
    inisialToko: string;
    nama_toko: string;   // masih snake_case karena dikirim dari backend join
    site: string;
    jumlahContainer: number;
    jumlahKoli: number;
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
    noArmada: string;
    dc: string;
    namaDriver: string;
    admin: string;
    createdAt: string;
    vendor: string;
    items: SuratTugasApiItem[];
}
