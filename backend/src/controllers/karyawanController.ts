import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getKaryawan = async (req: Request, res: Response) => {
    try {
        const karyawan = await prisma.karyawan.findMany({
            orderBy: { id: 'asc' }
        });
        res.json(karyawan);
    } catch (error) {
        console.error('Error fetching karyawan:', error);
        res.status(500).json({ error: 'Failed to fetch data karyawan' });
    }
};

export const createKaryawan = async (req: Request, res: Response) => {
    try {
        const { nama, nik, divisi } = req.body;

        if (!nama || !nik || !divisi) {
            return res.status(400).json({ error: 'Semua field wajib diisi' });
        }

        const newKaryawan = await prisma.karyawan.create({
            data: { nama, nik, divisi }
        });

        res.status(201).json(newKaryawan);
    } catch (error: any) {
        if (error?.code === 'P2002') {
            return res.status(400).json({ error: 'NIK sudah terdaftar' });
        }
        console.error('Error creating karyawan:', error);
        res.status(500).json({ error: 'Failed to create data karyawan' });
    }
};

export const deleteKaryawan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.karyawan.delete({
            where: { id: Number(id) }
        });

        res.json({ message: 'Data karyawan berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting karyawan:', error);
        res.status(500).json({ error: 'Failed to delete data karyawan' });
    }
};

export const updateKaryawan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nama, nik, divisi } = req.body;

        if (!nama || !nik || !divisi) {
            return res.status(400).json({ error: 'Semua field wajib diisi' });
        }

        const updated = await prisma.karyawan.update({
            where: { id: Number(id) },
            data: { nama, nik, divisi }
        });

        res.json(updated);
    } catch (error) {
        console.error('Error updating karyawan:', error);
        res.status(500).json({ error: 'Failed to update data karyawan' });
    }
};
