import api from '@/lib/axios';

export const fetchPresensiSummary = async () => {
    const res = await api.get('/presensi/summary');
    return res.data;
};

export const fetchPresensiDetail = async () => {
    const res = await api.get('/presensi/detail');
    return res.data;
};
