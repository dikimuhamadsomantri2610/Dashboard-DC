import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get Detail Presensi (All Karyawan + Today's Presensi)
export const getDetailPresensi = async (req: Request, res: Response) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Fetch all karyawans
        const karyawans = await prisma.karyawan.findMany({
            orderBy: { nama: 'asc' }
        });

        // Fetch today's presensi records
        const presensiToday = await prisma.presensi.findMany({
            where: {
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            }
        });

        // Map presensi by NIK for quick lookup
        const presensiMap = new Map<string, any>();
        presensiToday.forEach(p => {
            presensiMap.set(p.nik, p);
        });

        // Combine data
        const detailedData = karyawans.map(karyawan => {
            const presensi = presensiMap.get(karyawan.nik);
            return {
                id: karyawan.id, // using karyawan.id
                nama: karyawan.nama,
                nik: karyawan.nik,
                divisi: karyawan.divisi,
                jamAbsenMasuk: presensi?.jamAbsenMasuk || '-',
                jamAbsenPulang: presensi?.jamAbsenPulang || '-',
                jamIstirahatKeluar: presensi?.jamIstirahatKeluar || '-',
                jamIstirahatSelesai: presensi?.jamBeresIstirahat || '-', // map to what frontend expects
                jamBeresIstirahat: presensi?.jamBeresIstirahat || '-'
            };
        });

        res.json(detailedData);
    } catch (error) {
        console.error('Error fetching detail presensi:', error);
        res.status(500).json({ error: 'Failed to fetch detail presensi' });
    }
};

// Get Summary Presensi (Total per divisi)
export const getSummaryPresensi = async (req: Request, res: Response) => {
    try {
        // We calculate start and end of today
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        // All presensi created today
        const presensiToday = await prisma.presensi.findMany({
            where: {
                createdAt: {
                    gte: startOfDay,
                }
            }
        });

        // Group Karyawan by Divisi
        const karyawans = await prisma.karyawan.findMany();
        
        const summaryMap: Record<string, any> = {};

        // Inisialisasi total karyawan per divisi
        for (const k of karyawans) {
            if (!summaryMap[k.divisi]) {
                summaryMap[k.divisi] = {
                    posisi: k.divisi,
                    hadir: 0,
                    cuti: 0,
                    off: 0,
                    isbsd: 0,
                    terlambat: 0,
                    belumScan: 0,
                    total: 0
                };
            }
            summaryMap[k.divisi].total += 1;
            summaryMap[k.divisi].belumScan += 1;
        }

        // Kalkulasi dari presensiToday
        for (const p of presensiToday) {
            if (summaryMap[p.divisi]) {
                summaryMap[p.divisi].hadir += 1;
                // Asumsikan yang absen hari ini berarti hadir
                // Kurangi counter belum scan, jika nilainya > 0
                if (summaryMap[p.divisi].belumScan > 0) {
                    summaryMap[p.divisi].belumScan -= 1;
                }
            }
        }

        const summaryResult = Object.values(summaryMap);
        res.json(summaryResult);
    } catch (error) {
        console.error('Error fetching summary presensi:', error);
        res.status(500).json({ error: 'Failed to fetch summary presensi' });
    }
};

// Scan Endpoint untuk Mesin (Aplikasi User/Scanner)
export const scanPresensi = async (req: Request, res: Response) => {
    try {
        const { nik, jenisScan } = req.body; 
        // jenisScan: 'Masuk' | 'Istirahat Keluar' | 'Beres Istirahat' | 'Pulang'

        // 1. Cek karyawan aktif
        const karyawan = await prisma.karyawan.findUnique({
            where: { nik }
        });

        if (!karyawan) {
            // Sesuai kriteria pengguna: "kalau tidak ada popup tidak bisa lanjut"
            return res.status(404).json({ error: 'Karyawan dengan NIK tersebut tidak ditemukan atau belum terdaftar.' });
        }

        // 2. Cek apakah hari ini sudah ada baris presensi untuk NIK ini
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        let presensiToday = await prisma.presensi.findFirst({
            where: {
                nik,
                createdAt: {
                    gte: startOfDay,
                }
            }
        });

        const now = new Date();
        const timestring = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

        if (!presensiToday) {
            // First scan of the day
            if (jenisScan !== 'Masuk') {
                return res.status(400).json({ error: 'Anda harus scan "Masuk" terlebih dahulu hari ini.' });
            }

            // Create record
            const newRecord = await prisma.presensi.create({
                data: {
                    nama: karyawan.nama,
                    nik: karyawan.nik,
                    divisi: karyawan.divisi,
                    jamAbsenMasuk: timestring,
                }
            });
            return res.json({ message: 'Berhasil Absen Masuk', data: newRecord });
        } else {
            // Sudah ada record hari ini, update tabel sesuai jenisScan
            let updateData: any = {};
            if (jenisScan === 'Masuk') {
                return res.status(400).json({ error: 'Anda sudah Absen Masuk hari ini.' });
            } else if (jenisScan === 'Istirahat Keluar') {
                updateData.jamIstirahatKeluar = timestring;
            } else if (jenisScan === 'Beres Istirahat') {
                updateData.jamBeresIstirahat = timestring;
            } else if (jenisScan === 'Pulang') {
                updateData.jamAbsenPulang = timestring;
            } else {
                return res.status(400).json({ error: 'Jenis scan tidak valid.' });
            }

            const updatedRecord = await prisma.presensi.update({
                where: { id: presensiToday.id },
                data: updateData
            });

            return res.json({ message: `Berhasil Absen ${jenisScan}`, data: updatedRecord });
        }

    } catch (error) {
        console.error('Error scanning presensi:', error);
        res.status(500).json({ error: 'Server error saat scan presensi' });
    }
};
