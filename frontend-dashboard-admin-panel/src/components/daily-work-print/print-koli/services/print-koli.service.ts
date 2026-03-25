import api from '@/lib/axios';

export const fetchPrintKoli = async () => {
    const response = await api.get('/koli');
    return response.data;
};
