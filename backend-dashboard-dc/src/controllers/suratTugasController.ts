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

        const kirimDate = tanggalKirim ? new Date(tanggalKirim) : new Date();

        const dataToInsert = entries.map((entry: any) => ({
            noArmada: noMobil,
            dc: dc || 'DC GBG',
            namaDriver: namaDriver,
            numberSeal: entry.numberSeal || '',
            loadNumber: entry.loadNumber || '',
            inisialToko: entry.inisialToko || '',
            jumlahContainer: Number(entry.jumlahContainer) || 0,
            jumlahKoli: Number(entry.jumlahKoli) || 0,
            materai: entry.materai || 'Tidak',
            kodeGembok: entry.kodeGembok || '',
            keterangan: entry.keterangan || 'R',
            admin: adminName,
            tanggalKirim: kirimDate
        }));

        await prisma.suratTugas.createMany({ data: dataToInsert });

        res.status(201).json({ message: 'Surat Tugas armada berhasil disimpan', count: dataToInsert.length });
    } catch (error) {
        console.error('Error creating Surat Tugas:', error);
        res.status(500).json({ error: 'Gagal menyimpan Surat Tugas armada' });
    }
};

export const getSuratTugas = async (req: AuthRequest, res: Response) => {
    try {
        const suratTugasData = await prisma.suratTugas.findMany({
            orderBy: { createdAt: 'desc' }
        });

        const tokoData = await prisma.updateToko.findMany();
        const tokoMap = new Map();
        tokoData.forEach(toko => {
            tokoMap.set(toko.inisialToko.toUpperCase(), {
                namaToko: toko.namaToko,
                site: toko.site
            });
        });

        const armadaData = await prisma.updateArmada.findMany();
        const vendorMap = new Map();
        armadaData.forEach(armada => {
            vendorMap.set(armada.noArmada.toUpperCase(), armada.vendor);
        });

        const mappedData = suratTugasData.map(st => {
            const tokoInfo = tokoMap.get(st.inisialToko.toUpperCase()) || { namaToko: st.inisialToko, site: '' };
            return {
                ...st,
                nama_toko: tokoInfo.namaToko,
                site: tokoInfo.site,
                vendor: vendorMap.get(st.noArmada.toUpperCase()) || st.noArmada,
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
        await prisma.suratTugas.delete({ where: { id: Number(id) } });
        res.json({ message: 'Surat Tugas berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting Surat Tugas:', error);
        res.status(500).json({ error: 'Gagal menghapus data Surat Tugas' });
    }
};
