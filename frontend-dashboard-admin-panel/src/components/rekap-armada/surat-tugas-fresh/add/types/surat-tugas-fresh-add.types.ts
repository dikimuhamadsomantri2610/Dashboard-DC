export interface GembokFreshEntry {
    numberSeal: string;
    inisialToko: string;
    jumlahKoli: string;
    kodeGembok: string;
}

export const emptyFreshEntry = (): GembokFreshEntry => ({
    numberSeal: '',
    inisialToko: '',
    jumlahKoli: '',
    kodeGembok: '',
});
