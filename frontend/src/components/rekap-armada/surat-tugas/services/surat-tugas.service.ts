import api from '@/lib/axios';
import type { CreateSuratTugasPayload } from '../types/surat-tugas.types';

export const fetchSuratTugas = async () => {
    const response = await api.get('/surat-tugas');
    return response.data;
};

export const deleteSuratTugas = async (id: number) => {
    const response = await api.delete(`/surat-tugas/${id}`);
    return response.data;
};

export const fetchArmadaList = async () => {
    const response = await api.get('/armada');
    return response.data;
};

export const createSuratTugas = async (payload: CreateSuratTugasPayload) => {
    const response = await api.post('/surat-tugas', payload);
    return response.data;
};

export const fetchDistributionCenters = async () => {
    const response = await api.get('/distribution-centers');
    return response.data;
};

export const updateStatusSuratTugasGroup = async (ids: number[], status: 'approved' | 'rejected') => {
    const response = await api.patch('/surat-tugas/group-status', { ids, status });
    return response.data;
};

