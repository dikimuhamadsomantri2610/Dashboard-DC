import api from '@/lib/axios';

export interface TokoItem {
    id: number;
    site: string;
    inisialToko: string;
    namaToko: string;
    alamatToko: string;
    createdAt: string;
}

export interface TokoPayload {
    site: string;
    inisialToko: string;
    namaToko: string;
    alamatToko: string;
}

export const fetchToko = async (): Promise<TokoItem[]> => {
    const res = await api.get('/toko');
    return res.data.map((item: any) => ({
        id: item.id,
        site: item.site,
        inisialToko: item.inisialToko,
        namaToko: item.namaToko,
        alamatToko: item.alamatToko,
        createdAt: new Date(item.createdAt).toLocaleDateString('id-ID'),
    }));
};

export const createToko = async (payload: TokoPayload) => {
    const res = await api.post('/toko', payload);
    return res.data;
};

export const updateToko = async (id: number, payload: TokoPayload) => {
    const res = await api.put(`/toko/${id}`, payload);
    return res.data;
};

export const deleteToko = async (id: number) => {
    const res = await api.delete(`/toko/${id}`);
    return res.data;
};
