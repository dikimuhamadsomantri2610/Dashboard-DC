import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDistributionCenters = async (_req: Request, res: Response) => {
    try {
        const dcs = await prisma.distributionCenter.findMany({
            orderBy: { namaDc: 'asc' },
        });
        res.json(dcs);
    } catch (error) {
        console.error('Error fetching distribution centers:', error);
        res.status(500).json({ message: 'Gagal mengambil data Distribution Center' });
    }
};
