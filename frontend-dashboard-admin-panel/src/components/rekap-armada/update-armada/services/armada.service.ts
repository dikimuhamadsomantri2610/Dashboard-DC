import api from '@/lib/axios';

export interface ArmadaItem {
    id: number;
    noMobil: string;
    jenisArmada: string;
    namaDriver: string;
    vendor: string;
    inisialDc: string;
    status: string;
}

export interface ArmadaPayload {
    noArmada: string;
    jenisArmada: string;
    namaDriver: string;
    vendor: string;
    inisialDc: string;
    status: string;
}

export interface ArmadaApiItem {
    id: number;
    noArmada: string;
    jenisArmada: string;
    namaDriver: string;
    vendor: string;
    inisialDc: string;
    status: string;
}

export const fetchArmada = async (): Promise<ArmadaItem[]> => {
    const res = await api.get('/armada');
    return res.data.map((item: ArmadaApiItem) => ({
        id: item.id,
        noMobil: item.noArmada,
        jenisArmada: item.jenisArmada,
        namaDriver: item.namaDriver,
        vendor: item.vendor,
        inisialDc: item.inisialDc,
        status: item.status,
    }));
};

export const createArmada = async (payload: ArmadaPayload) => {
    const res = await api.post('/armada', payload);
    return res.data;
};

export const updateArmada = async (id: number, payload: ArmadaPayload) => {
    const res = await api.put(`/armada/${id}`, payload);
    return res.data;
};

export const deleteArmada = async (id: number) => {
    const res = await api.delete(`/armada/${id}`);
    return res.data;
};
