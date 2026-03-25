import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getToko = async (req: Request, res: Response) => {
    try {
        const toko = await prisma.updateToko.findMany({ orderBy: { id: 'asc' } });
        res.json(toko);
    } catch (error) {
        console.error('Error fetching toko:', error);
        res.status(500).json({ error: 'Failed to fetch data toko' });
    }
};

export const createToko = async (req: Request, res: Response) => {
    try {
        const { site, inisialToko, namaToko, alamatToko } = req.body;

        if (!site || !inisialToko || !namaToko) {
            return res.status(400).json({ error: 'Semua field wajib diisi' });
        }

        const newToko = await prisma.updateToko.create({
            data: {
                site,
                inisialToko,
                namaToko,
                alamatToko: alamatToko || '-'
            }
        });

        res.status(201).json(newToko);
    } catch (error) {
        console.error('Error creating toko:', error);
        res.status(500).json({ error: 'Failed to create data toko' });
    }
};

export const deleteToko = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.updateToko.delete({ where: { id: Number(id) } });
        res.json({ message: 'Data toko berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting toko:', error);
        res.status(500).json({ error: 'Failed to delete data toko' });
    }
};

export const updateToko = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { site, inisialToko, namaToko, alamatToko } = req.body;

        if (!site || !inisialToko || !namaToko) {
            return res.status(400).json({ error: 'Semua field wajib diisi' });
        }

        const updatedToko = await prisma.updateToko.update({
            where: { id: Number(id) },
            data: {
                site,
                inisialToko,
                namaToko,
                alamatToko: alamatToko || '-'
            }
        });

        res.json(updatedToko);
    } catch (error) {
        console.error('Error updating toko:', error);
        res.status(500).json({ error: 'Failed to update data toko' });
    }
};
