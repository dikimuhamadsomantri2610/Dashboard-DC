import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

export const createSuratTugasCheck = async (req: Request, res: Response) => {
    try {
        const { noArmada, kodeGembok, numberSeal, checkers } = req.body;

        if (!noArmada || !kodeGembok || !numberSeal || !checkers || !Array.isArray(checkers) || checkers.length === 0) {
            return res.status(400).json({ error: 'Data kendaraan dan daftar toko wajib diisi' });
        }

        // Cari data Armada untuk mendapatkan namaDriver dan dc
        const armadaInfo = await prisma.updateArmada.findFirst({
            where: { noArmada: { equals: noArmada, mode: 'insensitive' } }
        });

        const namaDriver = armadaInfo ? armadaInfo.namaDriver : 'Unknown';
        const dc = armadaInfo ? armadaInfo.inisialDc : 'DC GBG';

        const dataToInsert = checkers.map((entry: any) => ({
            noArmada: noArmada,
            dc: dc,
            namaDriver: namaDriver,
            numberSeal: numberSeal,
            kodeGembok: kodeGembok,
            inisialToko: entry.inisialToko || '',
            jumlahContainer: Number(entry.jumlahContainer) || 0,
            jumlahKoli: Number(entry.jumlahKoli) || 0,
            namaChecker: entry.namaChecker || 'System',
            status: 'Pending',
        }));

        await prisma.suratTugasCheck.createMany({ data: dataToInsert });

        res.status(201).json({ message: 'Surat Tugas Check berhasil disimpan', count: dataToInsert.length });
    } catch (error) {
        console.error('Error creating Surat Tugas Check:', error);
        res.status(500).json({ error: 'Gagal menyimpan Surat Tugas Check' });
    }
};

export const getPendingSuratTugasCheck = async (req: AuthRequest, res: Response) => {
    try {
        const pendingData = await prisma.suratTugasCheck.findMany({
            where: { status: 'Pending' },
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

        const mappedData = pendingData.map(st => {
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
        console.error('Error fetching Pending Surat Tugas Check:', error);
        res.status(500).json({ error: 'Gagal mengambil data Pending Surat Tugas Check' });
    }
};

export const approveSuratTugasCheck = async (req: AuthRequest, res: Response) => {
    try {
        const { items } = req.body;
        const adminName = req.user?.namaLengkap || 'System';

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Data items wajib diisi' });
        }

        const ids = items.map((i: any) => Number(i.id));

        // Get the check items
        const checkItems = await prisma.suratTugasCheck.findMany({
            where: { id: { in: ids } }
        });

        if (checkItems.length === 0) {
            return res.status(404).json({ error: 'Data tidak ditemukan' });
        }

        const itemsMap = new Map();
        items.forEach((i: any) => itemsMap.set(Number(i.id), i));

        // Migrate to SuratTugas
        const dataToInsert = checkItems.map(item => {
            const extraData = itemsMap.get(item.id) || {};
            return {
                noArmada: item.noArmada,
                dc: item.dc,
                namaDriver: item.namaDriver,
                numberSeal: item.numberSeal,
                loadNumber: extraData.loadNumber || '',
                inisialToko: item.inisialToko,
                jumlahContainer: item.jumlahContainer,
                jumlahKoli: item.jumlahKoli,
                materai: extraData.materai || 'Tidak',
                kodeGembok: item.kodeGembok,
                keterangan: extraData.keterangan || 'R',
                admin: adminName,
                namaChecker: item.namaChecker,
                status: 'approved',
                createdAt: item.createdAt,
                tanggalKirim: new Date(),
            };
        });

        await prisma.$transaction([
            prisma.suratTugas.createMany({ data: dataToInsert }),
            prisma.suratTugasCheck.deleteMany({ where: { id: { in: ids } } })
        ]);

        res.json({ message: 'Surat Tugas Check berhasil disetujui dan dipindah ke tabel utama', count: ids.length });
    } catch (error) {
        console.error('Error approving Surat Tugas Check:', error);
        res.status(500).json({ error: 'Gagal menyetujui Surat Tugas Check' });
    }
};

export const rejectSuratTugasCheck = async (req: AuthRequest, res: Response) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: 'IDs wajib diisi' });
        }

        // We can just update status to Rejected or delete them. Let's delete them to keep it clean.
        await prisma.suratTugasCheck.deleteMany({
            where: { id: { in: ids.map(Number) } }
        });

        res.json({ message: 'Surat Tugas Check berhasil ditolak (dihapus)', count: ids.length });
    } catch (error) {
        console.error('Error rejecting Surat Tugas Check:', error);
        res.status(500).json({ error: 'Gagal menolak Surat Tugas Check' });
    }
};
