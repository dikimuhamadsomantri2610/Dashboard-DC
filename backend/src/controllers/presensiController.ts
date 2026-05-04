import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get Detail Presensi (All presensi records, all dates)
export const getDetailPresensi = async (req: Request, res: Response) => {
    try {
        // Fetch all presensi records sorted by newest first
        const allPresensi = await prisma.presensi.findMany({
            orderBy: { createdAt: 'desc' }
        });

        const detailedData = allPresensi.map(p => {
            // Format tanggal as dd/mm/yyyy
            const tgl = p.tanggal ? new Date(p.tanggal) : new Date(p.createdAt);
            const tanggal = tgl.toLocaleDateString('id-ID', {
                day: '2-digit', month: '2-digit', year: 'numeric'
            });
            return {
                id: p.id,
                nama: p.nama,
                nik: p.nik,
                divisi: p.divisi,
                tanggal,
                createdAt: p.createdAt,
                jamAbsenMasuk: p.jamAbsenMasuk || '-',
                jamAbsenPulang: p.jamAbsenPulang || '-',
                jamIstirahatKeluar: p.jamIstirahatKeluar || '-',
                jamIstirahatSelesai: p.jamBeresIstirahat || '-',
                jamBeresIstirahat: p.jamBeresIstirahat || '-'
            };
        });

        res.json(detailedData);
    } catch (error) {
        console.error('Error fetching detail presensi:', error);
        res.status(500).json({ error: 'Failed to fetch detail presensi' });
    }
};

// Helper: parse jadwalJamKerja (misal "07.00-15.00", "07.00 - 15.00", "07.00 s/d 15.00")
// dan kembalikan jam + menit mulai sebagai { hour, minute }
function parseJamMulai(jadwal: string): { hour: number; minute: number } | null {
    if (!jadwal) return null;
    // Ambil bagian pertama sebelum separator (-, s/d, dll)
    const part = jadwal.split(/[\s\-\/]+/)[0]; // "07.00" atau "07"
    const [hStr, mStr] = part.replace(',', '.').split('.');
    const hour = parseInt(hStr, 10);
    const minute = parseInt(mStr || '0', 10);
    if (isNaN(hour)) return null;
    return { hour, minute };
}

// Helper: parse string jam "HH:MM" atau "HH.MM" ke { hour, minute }
function parseJamAbsen(jamStr: string): { hour: number; minute: number } | null {
    if (!jamStr || jamStr === '-') return null;
    const [hStr, mStr] = jamStr.replace('.', ':').split(':');
    const hour = parseInt(hStr, 10);
    const minute = parseInt(mStr || '0', 10);
    if (isNaN(hour)) return null;
    return { hour, minute };
}

// Get Summary Presensi (Total per divisi) dengan deteksi keterlambatan
export const getSummaryPresensi = async (req: Request, res: Response) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        // All presensi created today
        const presensiToday = await prisma.presensi.findMany({
            where: { createdAt: { gte: startOfDay } }
        });

        // Semua karyawan + jadwal jam kerja mereka
        const karyawans = await prisma.karyawan.findMany();

        // Map NIK -> jadwalJamKerja untuk lookup cepat
        const nikToJadwal = new Map<string, string>();
        for (const k of karyawans) {
            nikToJadwal.set(k.nik, k.jadwalJamKerja);
        }

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

        // Toleransi keterlambatan: 15 menit setelah jam mulai jadwal
        const TOLERANSI_MENIT = 15;

        // Kalkulasi dari presensiToday
        for (const p of presensiToday) {
            if (!summaryMap[p.divisi]) continue;

            // Kurangi belum scan
            if (summaryMap[p.divisi].belumScan > 0) {
                summaryMap[p.divisi].belumScan -= 1;
            }

            // Cek apakah terlambat
            const jadwal = nikToJadwal.get(p.nik);
            const jamMulai = parseJamMulai(jadwal || '');
            const jamAbsen = parseJamAbsen(p.jamAbsenMasuk || '');

            let isTerlambat = false;
            if (jamMulai && jamAbsen) {
                const mntJadwal = jamMulai.hour * 60 + jamMulai.minute + TOLERANSI_MENIT;
                const mntAbsen  = jamAbsen.hour * 60 + jamAbsen.minute;
                isTerlambat = mntAbsen > mntJadwal;
            }

            if (isTerlambat) {
                // Terlambat: tetap hadir tapi increment terlambat
                summaryMap[p.divisi].hadir += 1;
                summaryMap[p.divisi].terlambat += 1;
            } else {
                summaryMap[p.divisi].hadir += 1;
            }
        }

        const summaryResult = Object.values(summaryMap);
        res.json(summaryResult);
    } catch (error) {
        console.error('Error fetching summary presensi:', error);
        res.status(500).json({ error: 'Failed to fetch summary presensi' });
    }
};


// Submit Presensi — endpoint utama dari frontend-presensi-view (kiosk)
// Menangani: absen_datang, absen_pulang, istirahat_keluar, istirahat_masuk,
//            izin_keluar, izin_masuk, perubahan_jadwal, ambil_kuota, cuti
export const submitPresensi = async (req: Request, res: Response) => {
    try {
        const { nik, jenis, waktu, ...extraData } = req.body;

        if (!nik || !jenis) {
            return res.status(400).json({ message: 'NIK dan jenis wajib diisi.' });
        }

        // Cek karyawan
        const karyawan = await prisma.karyawan.findUnique({ where: { nik } });
        if (!karyawan) {
            return res.status(404).json({ message: 'NIK tidak terdaftar di database.' });
        }

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // ── ABSEN DATANG ──────────────────────────────────────────────
        if (jenis === 'absen_datang') {
            const existing = await prisma.presensi.findFirst({
                where: { nik, createdAt: { gte: startOfDay } }
            });
            if (existing) {
                return res.status(400).json({ message: 'Anda sudah Absen Datang hari ini.' });
            }
            const timeStr = waktu
                ? new Date(waktu).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                : new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            const record = await prisma.presensi.create({
                data: {
                    nama: karyawan.nama, nik: karyawan.nik, divisi: karyawan.divisi,
                    tanggal: today, jamAbsenMasuk: timeStr,
                }
            });
            return res.json({ message: 'Berhasil Absen Datang', data: record });
        }

        // ── ABSEN PULANG ──────────────────────────────────────────────
        if (jenis === 'absen_pulang') {
            const existing = await prisma.presensi.findFirst({
                where: { nik, createdAt: { gte: startOfDay } }
            });
            if (!existing) {
                return res.status(400).json({ message: 'Anda belum Absen Datang hari ini.' });
            }
            const timeStr = waktu
                ? new Date(waktu).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                : new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            const record = await prisma.presensi.update({
                where: { id: existing.id },
                data: { jamAbsenPulang: timeStr }
            });
            return res.json({ message: 'Berhasil Absen Pulang', data: record });
        }

        // ── ISTIRAHAT KELUAR ──────────────────────────────────────────
        if (jenis === 'istirahat_keluar') {
            const existing = await prisma.presensi.findFirst({
                where: { nik, createdAt: { gte: startOfDay } }
            });
            if (!existing) {
                return res.status(400).json({ message: 'Anda belum Absen Datang hari ini.' });
            }
            const timeStr = waktu
                ? new Date(waktu).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                : new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            const record = await prisma.presensi.update({
                where: { id: existing.id },
                data: { jamIstirahatKeluar: timeStr }
            });
            return res.json({ message: 'Berhasil Istirahat Keluar', data: record });
        }

        // ── ISTIRAHAT MASUK (BERES ISTIRAHAT) ─────────────────────────
        if (jenis === 'istirahat_masuk') {
            const existing = await prisma.presensi.findFirst({
                where: { nik, createdAt: { gte: startOfDay } }
            });
            if (!existing) {
                return res.status(400).json({ message: 'Anda belum Absen Datang hari ini.' });
            }
            const timeStr = waktu
                ? new Date(waktu).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                : new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            const record = await prisma.presensi.update({
                where: { id: existing.id },
                data: { jamBeresIstirahat: timeStr }
            });
            return res.json({ message: 'Berhasil Masuk dari Istirahat', data: record });
        }

        // ── IZIN KELUAR ───────────────────────────────────────────────
        if (jenis === 'izin_keluar') {
            const timeStr = waktu
                ? new Date(waktu).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                : new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            const record = await prisma.keluarJamKerja.create({
                data: {
                    nama: karyawan.nama, nik: karyawan.nik, divisi: karyawan.divisi,
                    tanggal: today, jamKeluar: timeStr,
                }
            });
            return res.json({ message: 'Izin Keluar berhasil dicatat', data: record });
        }

        // ── IZIN MASUK ────────────────────────────────────────────────
        if (jenis === 'izin_masuk') {
            const timeStr = waktu
                ? new Date(waktu).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                : new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            // Update record izin keluar terakhir hari ini
            const izinRecord = await prisma.keluarJamKerja.findFirst({
                where: { nik, tanggal: today },
                orderBy: { createdAt: 'desc' }
            });
            if (!izinRecord) {
                return res.status(400).json({ message: 'Tidak ada data Izin Keluar hari ini.' });
            }
            const record = await prisma.keluarJamKerja.update({
                where: { id: izinRecord.id },
                data: { jamKembali: timeStr }
            });
            return res.json({ message: 'Izin Masuk berhasil dicatat', data: record });
        }

        // ── PERUBAHAN JADWAL ──────────────────────────────────────────
        if (jenis === 'perubahan_jadwal') {
            const { jamAwal, jamTujuan } = extraData as { jamAwal: string; jamTujuan: string };
            if (!jamAwal || !jamTujuan) {
                return res.status(400).json({ message: 'Jam awal dan jam tujuan wajib diisi.' });
            }
            const record = await prisma.perubahanJadwal.create({
                data: {
                    nama: karyawan.nama, nik: karyawan.nik, divisi: karyawan.divisi,
                    tanggal: today, jamAsal: jamAwal, jamPerubahan: jamTujuan,
                }
            });
            return res.json({ message: 'Perubahan jadwal berhasil diajukan', data: record });
        }

        // ── AMBIL KUOTA ───────────────────────────────────────────────
        if (jenis === 'ambil_kuota') {
            const { jumlahJam } = extraData as { jumlahJam: string };
            if (!jumlahJam) {
                return res.status(400).json({ message: 'Jumlah jam wajib diisi.' });
            }
            const record = await prisma.kuotaJamLebih.create({
                data: {
                    nama: karyawan.nama, nik: karyawan.nik, divisi: karyawan.divisi,
                    tanggal: today, totalJam: parseInt(jumlahJam, 10),
                }
            });
            return res.json({ message: 'Kuota jam lebih berhasil dicatat', data: record });
        }

        // ── CUTI ──────────────────────────────────────────────────────
        if (jenis === 'cuti') {
            const { tanggalMulai, tanggalAkhir } = extraData as { tanggalMulai: string; tanggalAkhir: string };
            if (!tanggalMulai || !tanggalAkhir) {
                return res.status(400).json({ message: 'Tanggal mulai dan akhir cuti wajib diisi.' });
            }
            const record = await prisma.cuti.create({
                data: {
                    nama: karyawan.nama, nik: karyawan.nik, divisi: karyawan.divisi,
                    tanggalCutiAwal: new Date(tanggalMulai),
                    tanggalCutiAkhir: new Date(tanggalAkhir),
                }
            });
            return res.json({ message: 'Cuti berhasil diajukan', data: record });
        }

        return res.status(400).json({ message: `Jenis "${jenis}" tidak dikenali.` });

    } catch (error) {
        console.error('Error submit presensi:', error);
        res.status(500).json({ message: 'Server error saat menyimpan data.' });
    }
};

// Scan Endpoint (legacy — tetap untuk kompatibilitas)
export const scanPresensi = async (req: Request, res: Response) => {
    try {
        const { nik, jenisScan } = req.body;
        const karyawan = await prisma.karyawan.findUnique({ where: { nik } });
        if (!karyawan) {
            return res.status(404).json({ error: 'Karyawan tidak ditemukan.' });
        }
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let presensiToday = await prisma.presensi.findFirst({
            where: { nik, createdAt: { gte: startOfDay } }
        });
        const timestring = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        if (!presensiToday) {
            if (jenisScan !== 'Masuk') {
                return res.status(400).json({ error: 'Scan "Masuk" terlebih dahulu.' });
            }
            const newRecord = await prisma.presensi.create({
                data: {
                    nama: karyawan.nama, nik: karyawan.nik, divisi: karyawan.divisi,
                    tanggal: today, jamAbsenMasuk: timestring,
                }
            });
            return res.json({ message: 'Berhasil Absen Masuk', data: newRecord });
        }
        let updateData: any = {};
        if (jenisScan === 'Masuk') return res.status(400).json({ error: 'Sudah Absen Masuk.' });
        else if (jenisScan === 'Istirahat Keluar') updateData.jamIstirahatKeluar = timestring;
        else if (jenisScan === 'Beres Istirahat') updateData.jamBeresIstirahat = timestring;
        else if (jenisScan === 'Pulang') updateData.jamAbsenPulang = timestring;
        else return res.status(400).json({ error: 'Jenis scan tidak valid.' });
        const updatedRecord = await prisma.presensi.update({
            where: { id: presensiToday.id }, data: updateData
        });
        return res.json({ message: `Berhasil Absen ${jenisScan}`, data: updatedRecord });
    } catch (error) {
        console.error('Error scanning presensi:', error);
        res.status(500).json({ error: 'Server error saat scan presensi' });
    }
};
