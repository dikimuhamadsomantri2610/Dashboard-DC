import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get valid server time to prevent local client modification
export const getServerTime = (req: Request, res: Response) => {
    // Return server time
    // Format is ISO string which is easy to parse on frontend
    res.json({ serverTime: new Date().toISOString() });
};

// Check if NIK exists
export const checkNik = async (req: Request, res: Response) => {
    try {
        const { nik } = req.params;
        const karyawan = await prisma.karyawan.findUnique({
            where: { nik }
        });

        if (!karyawan) {
            return res.status(404).json({ success: false, message: 'NIK tidak terdaftar' });
        }

        return res.json({ success: true, data: karyawan });
    } catch (error) {
        console.error('Error checking NIK:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
