export interface GembokFreshEntry {
    numberSeal: string;
    inisialToko: string;
    jumlahContainer: string;
    jumlahBox: string;
    jumlahDus: string;
    kodeGembok: string;
}

export const emptyFreshEntry = (): GembokFreshEntry => ({
    numberSeal: '',
    inisialToko: '',
    jumlahContainer: '',
    jumlahBox: '',
    jumlahDus: '',
    kodeGembok: '',
});
