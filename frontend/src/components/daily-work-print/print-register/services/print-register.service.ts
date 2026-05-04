import api from '@/lib/axios';

export const fetchPrintRegister = async () => {
    const response = await api.get('/register');
    return response.data;
};
