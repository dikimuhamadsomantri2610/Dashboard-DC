import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getArmada = async (req: Request, res: Response) => {
    try {
        const armada = await prisma.updateArmada.findMany({
            orderBy: { id: 'asc' }
        });
        res.json(armada);
    } catch (error) {
        console.error('Error fetching armada:', error);
        res.status(500).json({ error: 'Failed to fetch data armada' });
    }
};

export const createArmada = async (req: Request, res: Response) => {
    try {
        const { no_armada, jenis_armada, nama_driver, vendor, status } = req.body;

        if (!no_armada || !jenis_armada || !nama_driver || !vendor || !status) {
            return res.status(400).json({ error: 'Semua field wajib diisi' });
        }

        const newArmada = await prisma.updateArmada.create({
            data: {
                no_armada,
                jenis_armada,
                nama_driver,
                vendor,
                status
            }
        });

        res.status(201).json(newArmada);
    } catch (error) {
        console.error('Error creating armada:', error);
        res.status(500).json({ error: 'Failed to create data armada' });
    }
};

export const deleteArmada = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.updateArmada.delete({
            where: { id: Number(id) }
        });

        res.json({ message: 'Data armada berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting armada:', error);
        res.status(500).json({ error: 'Failed to delete data armada' });
    }
};

export const updateArmada = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { no_armada, jenis_armada, nama_driver, vendor, status } = req.body;

        if (!no_armada || !jenis_armada || !nama_driver || !vendor || !status) {
            return res.status(400).json({ error: 'Semua field wajib diisi' });
        }

        const updatedArmada = await prisma.updateArmada.update({
            where: { id: Number(id) },
            data: {
                no_armada,
                jenis_armada,
                nama_driver,
                vendor,
                status
            }
        });

        res.json(updatedArmada);
    } catch (error) {
        console.error('Error updating armada:', error);
        res.status(500).json({ error: 'Failed to update data armada' });
    }
};
