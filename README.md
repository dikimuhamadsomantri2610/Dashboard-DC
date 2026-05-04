# Dashboard DC & Portal Presensi 🚀

Proyek ini adalah sistem manajemen operasional terintegrasi untuk Distribution Center (DC). Sistem ini kini menyatukan **Dashboard Admin Panel** dan **Portal Presensi Kios** dalam satu frontend yang solid.

Dibangun dengan teknologi modern:
- **Frontend**: React (Next.js App Router) + Tailwind CSS + TypeScript
- **Backend**: Node.js + Express + Prisma ORM + TypeScript
- **DBMS / Database**: PostgreSQL

---

## 📂 Struktur Direktori

Sistem kini dipecah menjadi dua bagian utama yang lebih ringkas:

- `backend/` (sebelumnya `backend-dashboard-dc`)
  Berisi REST API, konfigurasi database (Prisma), dan logika bisnis.
- `frontend/` (gabungan `frontend-dashboard-admin-panel` & `frontend-presensi-view`)
  Berisi aplikasi web Next.js. 
  - Admin Panel (Protected Route): Diakses melalui `/`
  - Portal Presensi (Public Route): Diakses melalui `/presensi`

---

## 📋 Prasyarat Sistem

Sebelum menginstal dan menjalankan aplikasi, pastikan Anda telah memasang:

1. **Node.js** (Rekomendasi versi 18.x atau 20.x LTS)
2. **NPM** (Bawaan Node.js)
3. **PostgreSQL** (Pastikan service database berjalan dan dapat diakses)

---

## 🛠 Panduan Instalasi & Menjalankan Sistem (Manual / Development)

Ikuti langkah-langkah di bawah ini secara berurutan untuk menjalankan environment di lokal / development.

### Tahap 1: Setup Backend

1. **Masuk ke folder `backend`:**
   ```bash
   cd backend
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables (`.env`)**
   Salin `.env.example` ke `.env` (atau buat baru) di dalam folder `backend/`:
   ```env
   # Koneksi Database
   DATABASE_URL="postgres://username:password@localhost:5432/nama_database"

   # Secret JWT
   JWT_SECRET="rahasia_super_aman_123"

   # Port Backend
   PORT=5000
   ```

4. **Inisialisasi Database (Prisma)**
   Sinkronkan skema ke database dan generate Prisma Client:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
   *(Opsional)* Untuk mengisi data awal (seeding):
   ```bash
   npm run prisma:seed
   ```

5. **Jalankan Server Backend:**
   - Development (auto-reload): `npm run dev`
   - Production: `npm start`
   
   Backend akan berjalan di `http://localhost:5000`.

---

### Tahap 2: Setup Frontend (Admin Panel & Presensi)

1. **Buka terminal baru dan masuk ke folder `frontend`:**
   ```bash
   cd frontend
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables (`.env`)**
   Buat file `.env` di folder `frontend/`:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5000/api"
   ```
   *(Catatan: Next.js juga mengandalkan konfigurasi `rewrites` di `next.config.mjs` untuk mengarahkan `/api/*` ke backend).*

4. **Jalankan Web Frontend:**
   - Development: 
     ```bash
     npm run dev
     ```
   - Production: 
     ```bash
     npm run build
     npm start
     ```
   
   Frontend akan berjalan di `http://localhost:3000`.

---

## 🌐 Akses Aplikasi

Setelah kedua layanan (Backend & Frontend) berjalan, Anda dapat mengakses:

1. **Dashboard Admin Panel (Protected)**
   👉 `http://localhost:3000/`
   *(Membutuhkan login)*

2. **Portal Presensi Kios (Public)**
   👉 `http://localhost:3000/presensi`
   *(Tanpa login, digunakan untuk mesin absen karyawan)*

---

## 🚀 Menjalankan Sebagai Service (Production / Systemd)

Untuk lingkungan produksi (server Linux), aplikasi telah disiapkan agar berjalan otomatis menggunakan `systemd` di background.

### 1. Backend Service
File service terletak di `/etc/systemd/system/backend.service`.
- **Start**: `sudo systemctl start backend.service`
- **Stop**: `sudo systemctl stop backend.service`
- **Status**: `sudo systemctl status backend.service`
- **Logs**: `journalctl -u backend.service -f`

### 2. Frontend Service
File service terletak di `/etc/systemd/system/frontend-dashboard-admin-panel.service`.
*(Service ini menjalankan Next.js di folder `frontend/`)*
- **Start**: `sudo systemctl start frontend-dashboard-admin-panel.service`
- **Stop**: `sudo systemctl stop frontend-dashboard-admin-panel.service`
- **Status**: `sudo systemctl status frontend-dashboard-admin-panel.service`
- **Logs**: `journalctl -u frontend-dashboard-admin-panel.service -f`

> **Penting saat deploy update Frontend:**
> Setiap ada perubahan kode di folder `frontend`, lakukan proses build ulang sebelum merestart service:
> ```bash
> cd frontend
> npm run build
> sudo systemctl restart frontend-dashboard-admin-panel.service
> ```

---

## ⚡ Ringkasan Perintah Cepat (Development)

Jika Anda hanya ingin menjalankan environment development dengan cepat:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
