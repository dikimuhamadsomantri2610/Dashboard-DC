import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

export const createSuratTugasFresh = async (req: AuthRequest, res: Response) => {
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
            inisial_toko: entry.inisialToko || '',
            jumlah_koli: Number(entry.jumlahKoli) || 0,
            kodeGembok: entry.kodeGembok || '',
            admin: adminName,
            tanggalKirim: kirimDate
        }));

        await prisma.suratTugasFresh.createMany({
            data: dataToInsert
        });

        res.status(201).json({ message: 'Surat Tugas Fresh berhasil disimpan', count: dataToInsert.length });
    } catch (error) {
        console.error('Error creating Surat Tugas Fresh:', error);
        res.status(500).json({ error: 'Gagal menyimpan Surat Tugas Fresh' });
    }
};

export const getSuratTugasFresh = async (req: AuthRequest, res: Response) => {
    try {
        const suratTugasData = await prisma.suratTugasFresh.findMany({
            orderBy: { createdAt: 'desc' }
        });

        const tokoData = await prisma.updateToko.findMany();
        const tokoMap = new Map();
        tokoData.forEach(toko => {
            tokoMap.set(toko.inisial_toko.toUpperCase(), {
                nama_toko: toko.nama_toko,
                site: toko.site
            });
        });

        const armadaData = await prisma.updateArmada.findMany();
        const vendorMap = new Map();
        armadaData.forEach(armada => {
            vendorMap.set(armada.no_armada.toUpperCase(), armada.vendor);
        });

        const mappedData = suratTugasData.map(st => {
            const tokoInfo = tokoMap.get(st.inisial_toko.toUpperCase()) || { nama_toko: st.inisial_toko, site: '' };
            return {
                ...st,
                nama_toko: tokoInfo.nama_toko,
                site: tokoInfo.site,
                vendor: vendorMap.get(st.no_armada.toUpperCase()) || st.no_armada,
                jumlah_container: 0,
                materai: 'Tidak',
                load_number: '',
                keterangan: 'R'
            };
        });

        res.json(mappedData);
    } catch (error) {
        console.error('Error fetching Surat Tugas Fresh:', error);
        res.status(500).json({ error: 'Gagal mengambil data Surat Tugas Fresh' });
    }
};

export const deleteSuratTugasFresh = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.suratTugasFresh.delete({
            where: { id: Number(id) }
        });
        res.json({ message: 'Surat Tugas Fresh berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting Surat Tugas Fresh:', error);
        res.status(500).json({ error: 'Gagal menghapus data Surat Tugas Fresh' });
    }
};
