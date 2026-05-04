export interface GembokEntry {
    numberSeal: string;
    loadNumber: string;
    inisialToko: string;
    jumlahContainer: string;
    jumlahKoli: string;
    keterangan: string;
    materai: string;
    kodeGembok: string;
}

export const emptyEntry = (): GembokEntry => ({
    numberSeal: '',
    loadNumber: '',
    inisialToko: '',
    jumlahContainer: '',
    jumlahKoli: '',
    keterangan: 'R',
    materai: 'Tidak',
    kodeGembok: '',
});
