import api from '@/lib/axios';

export const fetchSuratTugasFresh = async () => {
    const response = await api.get('/surat-tugas-fresh');
    return response.data;
};

export const deleteSuratTugasFresh = async (id: number) => {
    const response = await api.delete(`/surat-tugas-fresh/${id}`);
    return response.data;
};

export const createSuratTugasFresh = async (payload: any) => {
    const response = await api.post('/surat-tugas-fresh', payload);
    return response.data;
};

export const fetchDistributionCenters = async () => {
    const response = await api.get('/distribution-centers');
    return response.data;
};
