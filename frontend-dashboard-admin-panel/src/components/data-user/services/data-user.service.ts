import api from '@/lib/axios';

export interface UserPayload {
    username: string;
    namaLengkap: string;
    password?: string;
}

export const fetchUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const deleteUser = async (id: number) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
};

export const updateUser = async (id: number, payload: UserPayload) => {
    const response = await api.put(`/users/${id}`, payload);
    return response.data;
};

export const createUser = async (payload: UserPayload) => {
    const response = await api.post('/users', payload);
    return response.data;
};
