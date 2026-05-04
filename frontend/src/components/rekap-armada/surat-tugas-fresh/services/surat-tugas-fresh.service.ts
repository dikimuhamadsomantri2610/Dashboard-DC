import api from '@/lib/axios';
import type { GembokFreshEntry } from '../add/types/surat-tugas-fresh-add.types';

export interface CreateSuratTugasFreshPayload {
    noMobil: string;
    dc: string;
    namaDriver: string;
    tanggalKirim: string;
    entries: GembokFreshEntry[];
}

export const fetchSuratTugasFresh = async () => {
    const response = await api.get('/surat-tugas-fresh');
    return response.data;
};

export const deleteSuratTugasFresh = async (id: number) => {
    const response = await api.delete(`/surat-tugas-fresh/${id}`);
    return response.data;
};

export const createSuratTugasFresh = async (payload: CreateSuratTugasFreshPayload) => {
    const response = await api.post('/surat-tugas-fresh', payload);
    return response.data;
};

export const fetchDistributionCenters = async () => {
    const response = await api.get('/distribution-centers');
    return response.data;
};
