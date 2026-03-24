import api from '@/lib/axios';

export interface ArmadaItem {
    id: number;
    noMobil: string;
    jenisArmada: string;
    namaDriver: string;
    vendor: string;
    status: string;
}

export interface ArmadaPayload {
    no_armada: string;
    jenis_armada: string;
    nama_driver: string;
    vendor: string;
    status: string;
}

export const fetchArmada = async (): Promise<ArmadaItem[]> => {
    const res = await api.get('/armada');
    return res.data.map((item: any) => ({
        id: item.id,
        noMobil: item.no_armada,
        jenisArmada: item.jenis_armada,
        namaDriver: item.nama_driver,
        vendor: item.vendor,
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
