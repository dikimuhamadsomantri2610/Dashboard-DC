import api from '@/lib/axios';

export interface UpdateProfilePayload {
    namaLengkap: string;
    password?: string;
}

export const updateProfile = async (payload: UpdateProfilePayload) => {
    const response = await api.put('/users/profile', payload);
    return response.data;
};
