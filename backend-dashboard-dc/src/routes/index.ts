import { Router } from 'express';
import { login } from '../controllers/authController';
import { getKoli, getRegister } from '../controllers/dataController';
import { getToko, createToko, deleteToko, updateToko } from '../controllers/tokoController';
import { getArmada, createArmada, deleteArmada, updateArmada } from '../controllers/armadaController';
import { createSuratTugas, getSuratTugas, deleteSuratTugas } from '../controllers/suratTugasController';
import { createSuratTugasFresh, getSuratTugasFresh, deleteSuratTugasFresh } from '../controllers/suratTugasFreshController';
import { getUsers, createUser, updateUser, deleteUser, updateProfile } from '../controllers/userController';
import { getKaryawan, createKaryawan, deleteKaryawan, updateKaryawan } from '../controllers/karyawanController';
import { getSummaryPresensi, getDetailPresensi, scanPresensi } from '../controllers/presensiController';
import { getServerTime, checkNik } from '../controllers/attendanceController';
import { getDistributionCenters } from '../controllers/distributionCenterController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Auth routes
router.post('/auth/login', login);

// Protected data routes
router.use('/koli', authenticateToken);
router.get('/koli', getKoli);

router.use('/register', authenticateToken);
router.get('/register', getRegister);

// Toko routes
router.use('/toko', authenticateToken);
router.get('/toko', getToko);
router.post('/toko', createToko);
router.delete('/toko/:id', deleteToko);
router.put('/toko/:id', updateToko);

// Armada routes
router.use('/armada', authenticateToken);
router.get('/armada', getArmada);
router.post('/armada', createArmada);
router.delete('/armada/:id', deleteArmada);
router.put('/armada/:id', updateArmada);

// Surat Tugas armada
router.use('/surat-tugas', authenticateToken);
router.post('/surat-tugas', createSuratTugas);
router.get('/surat-tugas', getSuratTugas);
router.delete('/surat-tugas/:id', deleteSuratTugas);

// Surat Tugas Fresh
router.use('/surat-tugas-fresh', authenticateToken);
router.post('/surat-tugas-fresh', createSuratTugasFresh);
router.get('/surat-tugas-fresh', getSuratTugasFresh);
router.delete('/surat-tugas-fresh/:id', deleteSuratTugasFresh);

// User/Account routes
router.use('/users', authenticateToken);
router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/profile', updateProfile); // This must be before /users/:id
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Distribution Center routes
router.use('/distribution-centers', authenticateToken);
router.get('/distribution-centers', getDistributionCenters);

// Karyawan routes
router.use('/karyawan', authenticateToken);
router.get('/karyawan', getKaryawan);
router.post('/karyawan', createKaryawan);
router.put('/karyawan/:id', updateKaryawan);
router.delete('/karyawan/:id', deleteKaryawan);

// Presensi public routes (kiosk — no auth required)
router.get('/presensi/time', getServerTime);
router.get('/presensi/check-nik/:nik', checkNik);

// Presensi protected routes
router.use('/presensi', authenticateToken);
router.get('/presensi/summary', getSummaryPresensi);
router.get('/presensi/detail', getDetailPresensi);
router.post('/presensi/scan', scanPresensi);

export default router;
