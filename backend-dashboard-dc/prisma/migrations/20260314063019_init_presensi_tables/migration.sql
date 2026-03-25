-- CreateTable
CREATE TABLE "Koli" (
    "id" SERIAL NOT NULL,
    "kode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Koli_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Register" (
    "id" SERIAL NOT NULL,
    "kode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Register_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuratTugas" (
    "id" SERIAL NOT NULL,
    "no_armada" VARCHAR(20) NOT NULL,
    "dc" VARCHAR(10) NOT NULL,
    "nama_driver" VARCHAR(50) NOT NULL,
    "number_seal" VARCHAR(15) NOT NULL,
    "load_number" VARCHAR(10) NOT NULL,
    "inisial_toko" VARCHAR(10) NOT NULL DEFAULT '',
    "jumlah_container" INTEGER NOT NULL,
    "jumlah_koli" INTEGER NOT NULL,
    "materai" VARCHAR(5) NOT NULL,
    "kodeGembok" VARCHAR(50) NOT NULL,
    "keterangan" VARCHAR(5) NOT NULL DEFAULT 'R',
    "admin" VARCHAR(50) NOT NULL DEFAULT 'System',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalKirim" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SuratTugas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UpdateArmada" (
    "id" SERIAL NOT NULL,
    "no_armada" VARCHAR(20) NOT NULL,
    "jenis_armada" VARCHAR(20) NOT NULL,
    "nama_driver" VARCHAR(50) NOT NULL,
    "vendor" VARCHAR(20) NOT NULL,
    "status" VARCHAR(6) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UpdateArmada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UpdateToko" (
    "id" SERIAL NOT NULL,
    "site" VARCHAR(5) NOT NULL,
    "inisial_toko" VARCHAR(5) NOT NULL,
    "nama_toko" VARCHAR(25) NOT NULL,
    "alamat_toko" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UpdateToko_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "namaLengkap" TEXT NOT NULL DEFAULT 'User Baru',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Karyawan" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "nik" VARCHAR(20) NOT NULL,
    "divisi" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Karyawan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presensi" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "nik" VARCHAR(20) NOT NULL,
    "divisi" VARCHAR(50) NOT NULL,
    "jamAbsenMasuk" VARCHAR(10),
    "jamAbsenPulang" VARCHAR(10),
    "jamIstirahatKeluar" VARCHAR(10),
    "jamBeresIstirahat" VARCHAR(10),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Presensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerubahanJadwal" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "nik" VARCHAR(20) NOT NULL,
    "divisi" VARCHAR(50) NOT NULL,
    "tanggal" DATE NOT NULL,
    "jamAsal" VARCHAR(10) NOT NULL,
    "jamPerubahan" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PerubahanJadwal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KuotaJamLebih" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "nik" VARCHAR(20) NOT NULL,
    "divisi" VARCHAR(50) NOT NULL,
    "tanggal" DATE NOT NULL,
    "totalJam" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KuotaJamLebih_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeluarJamKerja" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "nik" VARCHAR(20) NOT NULL,
    "divisi" VARCHAR(50) NOT NULL,
    "tanggal" DATE NOT NULL,
    "jamKeluar" VARCHAR(10) NOT NULL,
    "jamKembali" VARCHAR(10),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KeluarJamKerja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cuti" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "nik" VARCHAR(20) NOT NULL,
    "divisi" VARCHAR(50) NOT NULL,
    "tanggalCutiAwal" DATE NOT NULL,
    "tanggalCutiAkhir" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cuti_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Karyawan_nik_key" ON "Karyawan"("nik");
