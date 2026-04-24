import axios from 'axios';

export const api = axios.create({
    baseURL: '/api'
});

export async function checkNik(nik: string) {
    return api.get(`/presensi/check-nik/${nik}`);
}

export async function getServerTime(): Promise<string> {
    const res = await api.get('/presensi/time');
    return res.data.serverTime as string;
}

// Submit semua jenis presensi ke backend (POST /presensi — public, no auth)
export async function submitPresensi(
    nik: string,
    jenis: string,
    waktu?: string,
    extraData: Record<string, unknown> = {}
) {
    return api.post('/presensi', { nik, jenis, waktu, ...extraData });
}
