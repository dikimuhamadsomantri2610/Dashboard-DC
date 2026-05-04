export interface GembokFreshEntry {
    numberSeal: string;
    inisialToko: string;
    jumlahContainer: string;
    jumlahBox: string;
    jumlahDus: string;
    jumlahBolit: string;
    kodeGembok: string;
}

export const emptyFreshEntry = (): GembokFreshEntry => ({
    numberSeal: '',
    inisialToko: '',
    jumlahContainer: '',
    jumlahBox: '',
    jumlahDus: '',
    jumlahBolit: '',
    kodeGembok: '',
});
