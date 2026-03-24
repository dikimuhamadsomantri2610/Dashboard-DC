import { Request, Response } from 'express';
import prisma from '../config/db';

export const getKoli = async (req: Request, res: Response) => {
    try {
        const data: any[] = []; // await prisma.koli.findMany({
        //     orderBy: { createdAt: 'desc' }
        // });
        res.json(data);
    } catch (error) {
        console.error('Error fetching Koli data:', error);
        res.status(500).json({ message: 'Failed to fetch Koli data' });
    }
};

export const getRegister = async (req: Request, res: Response) => {
    try {
        const data: any[] = []; // await prisma.register.findMany({
        //     orderBy: { createdAt: 'desc' }
        // });
        res.json(data);
    } catch (error) {
        console.error('Error fetching Register data:', error);
        res.status(500).json({ message: 'Failed to fetch Register data' });
    }
};
