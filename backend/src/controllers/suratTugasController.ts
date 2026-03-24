import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

export const createSuratTugas = async (req: AuthRequest, res: Response) => {
    try {
        const { noMobil, dc, namaDriver, tanggalKirim, entries } = req.body;
        const adminName = req.user?.namaLengkap || 'System';

        if (!noMobil || !namaDriver || !entries || !Array.isArray(entries) || entries.length === 0) {
            return res.status(400).json({ error: 'Data kendaraan dan daftar toko wajib diisi' });
        }

        // Parse tanggal kirim
        const kirimDate = tanggalKirim ? new Date(tanggalKirim) : new Date();

        // Siapkan array data untuk bulk insert
        const dataToInsert = entries.map((entry: any) => ({
            no_armada: noMobil,
            dc: dc || 'DC GBG',
            nama_driver: namaDriver,
            number_seal: entry.numberSeal || '',
            load_number: entry.loadNumber || '',
            inisial_toko: entry.inisialToko || '',
            jumlah_container: Number(entry.jumlahContainer) || 0,
            jumlah_koli: Number(entry.jumlahKoli) || 0,
            materai: entry.materai || 'Tidak',
            kodeGembok: entry.kodeGembok || '',
            keterangan: entry.keterangan || 'R',
            admin: adminName,
            tanggalKirim: kirimDate
        }));

        // Simpan multiple row (toko) dari satu surat tugas ke tabel SuratTugas
        await prisma.suratTugas.createMany({
            data: dataToInsert
        });

        res.status(201).json({ message: 'Surat Tugas armada berhasil disimpan', count: dataToInsert.length });
    } catch (error) {
        console.error('Error creating Surat Tugas:', error);
        res.status(500).json({ error: 'Gagal menyimpan Surat Tugas armada' });
    }
};

export const getSuratTugas = async (req: AuthRequest, res: Response) => {
    try {
        // Ambil semua surat tugas
        const suratTugasData = await prisma.suratTugas.findMany({
            orderBy: { createdAt: 'desc' }
        });

        // Ambil semua update toko untuk mapping inisial_toko ke nama_toko dan site
        const tokoData = await prisma.updateToko.findMany();

        // Buat map inisial -> { nama_toko, site }
        const tokoMap = new Map();
        tokoData.forEach(toko => {
            tokoMap.set(toko.inisial_toko.toUpperCase(), {
                nama_toko: toko.nama_toko,
                site: toko.site
            });
        });

        // Ambil semua armada untuk mapping no_armada ke vendor
        const armadaData = await prisma.updateArmada.findMany();
        const vendorMap = new Map();
        armadaData.forEach(armada => {
            vendorMap.set(armada.no_armada.toUpperCase(), armada.vendor);
        });

        // Map hasil data surat tugas
        const mappedData = suratTugasData.map(st => {
            const tokoInfo = tokoMap.get(st.inisial_toko.toUpperCase()) || { nama_toko: st.inisial_toko, site: '' };
            return {
                ...st,
                nama_toko: tokoInfo.nama_toko,
                site: tokoInfo.site,
                vendor: vendorMap.get(st.no_armada.toUpperCase()) || st.no_armada,
            };
        });

        res.json(mappedData);
    } catch (error) {
        console.error('Error fetching Surat Tugas:', error);
        res.status(500).json({ error: 'Gagal mengambil data Surat Tugas' });
    }
};

export const deleteSuratTugas = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.suratTugas.delete({
            where: { id: Number(id) }
        });
        res.json({ message: 'Surat Tugas berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting Surat Tugas:', error);
        res.status(500).json({ error: 'Gagal menghapus data Surat Tugas' });
    }
};
