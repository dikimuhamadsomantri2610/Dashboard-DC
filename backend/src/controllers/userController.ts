import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { id: 'asc' },
            select: {
                id: true,
                username: true,
                namaLengkap: true,
                // Jangan melempar password ke frontend demi keamanan
            }
        });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch data users' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, password, namaLengkap } = req.body;

        if (!username || !password || !namaLengkap) {
            return res.status(400).json({ error: 'Semua field wajib diisi' });
        }

        // Check if username already exists
        const existingUser = await prisma.user.findUnique({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username sudah digunakan' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                namaLengkap
            },
            select: {
                id: true,
                username: true,
                namaLengkap: true
            }
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create data user' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, password, namaLengkap } = req.body;

        if (!username || !namaLengkap) {
            return res.status(400).json({ error: 'Username dan Nama Lengkap wajib diisi' });
        }

        // Prepare update data
        const updateData: any = {
            username,
            namaLengkap
        };

        // Update password if provided
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: updateData,
            select: {
                id: true,
                username: true,
                namaLengkap: true
            }
        });

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update data user' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.user.delete({
            where: { id: Number(id) }
        });

        res.json({ message: 'Data user berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete data user' });
    }
};

export const updateProfile = async (req: Request | any, res: Response) => {
    try {
        const userId = req.user?.id;
        const { namaLengkap, password } = req.body;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (!namaLengkap) {
            return res.status(400).json({ error: 'Nama Lengkap wajib diisi' });
        }

        const updateData: any = {
            namaLengkap
        };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id: Number(userId) },
            data: updateData,
            select: {
                id: true,
                username: true,
                namaLengkap: true
            }
        });

        // Generate new token so the frontend sees the new name
        import('jsonwebtoken').then(jwt => {
            const token = jwt.default.sign(
                { id: updatedUser.id, username: updatedUser.username, namaLengkap: updatedUser.namaLengkap },
                process.env.JWT_SECRET || 'dashboard_secret_key',
                { expiresIn: '1d' }
            );

            return res.json({ message: 'Profil berhasil diperbarui', token, user: updatedUser });
        });

    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Gagal memperbarui profil' });
    }
};
