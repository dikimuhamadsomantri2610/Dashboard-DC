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
    namaChecker: string;
    status: string;
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
    namaChecker: string;
    createdAt: string;
    vendor: string;
    status: string;
    items: SuratTugasApiItem[];
}

export interface SuratTugasEntry {
    numberSeal: string;
    loadNumber: string;
    inisialToko: string;
    jumlahContainer: number | string;
    jumlahKoli: number | string;
    materai: string;
    kodeGembok: string;
    keterangan: string;
}

export interface CreateSuratTugasPayload {
    noMobil: string;
    dc: string;
    namaDriver: string;
    tanggalKirim: string;
    entries: SuratTugasEntry[];
}
