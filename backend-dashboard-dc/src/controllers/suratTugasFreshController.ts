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

        const kirimDate = tanggalKirim ? new Date(tanggalKirim) : new Date();

        const dataToInsert = entries.map((entry: any) => ({
            noArmada: noMobil,
            dc: dc || 'DC GBG',
            namaDriver: namaDriver,
            numberSeal: entry.numberSeal || '',
            inisialToko: entry.inisialToko || '',
            jumlahKoli: Number(entry.jumlahKoli) || 0,
            kodeGembok: entry.kodeGembok || '',
            admin: adminName,
            tanggalKirim: kirimDate
        }));

        await prisma.suratTugasFresh.createMany({ data: dataToInsert });

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
        await prisma.suratTugasFresh.delete({ where: { id: Number(id) } });
        res.json({ message: 'Surat Tugas Fresh berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting Surat Tugas Fresh:', error);
        res.status(500).json({ error: 'Gagal menghapus data Surat Tugas Fresh' });
    }
};
