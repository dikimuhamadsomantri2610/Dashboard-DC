# Dashboard DC 🚀

Proyek ini adalah sistem Dashboard untuk Distribution Center (DC) yang dibangun dengan stack modern:
- **Frontend**: React (Vite) + Tailwind CSS + TypeScript
- **Backend**: Node.js + Express + Prisma ORM + TypeScript
- **DBMS / Database**: PostgreSQL

## Prasyarat Server
Sebelum menginstal, pastikan Anda telah memiliki:
1. **Node.js** (rekomendasi versi 18.x atau 20.x ke atas)
2. **NPM** (biasanya terinstal bersamaan dengan Node.js)
3. **DBMS / Database** (PostgreSQL, pastikan sudah berjalan)

---

## 🛠 Panduan Instalasi & Menjalankan Sistem

Karena sistem ini terbagi menjadi dua bagian (Backend dan Frontend), Anda harus menjalankan keduanya. Ikuti langkah-langkah di bawah ini secara berurutan.

### Tahap 1: Setup Backend

1. **Buka terminal dan masuk ke folder `backend`:**
   ```bash
   cd backend
   ```

2. **Instal dependensi (library yang dibutuhkan):**
   ```bash
   npm install
   ```

3. **Buat file Environment Variables (`.env`)**
   Salin file `.env.example` (jika ada) ke `.env`, atau buat file baru bernama `.env` di dalam folder `backend/` dan isikan konfigurasi database serta rahasia server. Contoh:
   ```env
   # Ganti URL ini sesuai dengan konfigurasi database Anda
   DATABASE_URL="mysql://username:password@localhost:3306/nama_database"
   
   # Rahasia untuk autentikasi JWT
   JWT_SECRET="rahasia_super_aman_123"
   
   # Port Backend
   PORT=5000
   ```

4. **Inisialisasi Database (Prisma)**
   Jalankan perintah ini untuk sinkronisasi schema Prisma ke dalam Database Anda dan men-generate Prisma Client:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
   *(Opsional)* Jika Anda ingin mengisi data awal (seeding), jalankan:
   ```bash
   npm run prisma:seed
   ```

5. **Jalankan Server Backend:**
   - Untuk mode pengembangan (auto-reload saat kode berubah):
     ```bash
     npm run dev
     ```
   - Untuk mode produksi berjalan sekali:
     ```bash
     npm start
     ```
   Backend sekarang berjalan (biasanya di `http://localhost:5000`). Biarkan terminal ini tetap terbuka.

---

### Tahap 2: Setup Frontend

1. **Buka tab terminal BARU, lalu masuk ke folder `frontend`:**
   ```bash
   cd frontend
   ```

2. **Instal dependensi (library yang dibutuhkan):**
   ```bash
   npm install
   ```

3. **Buat file Environment Variables (`.env`) untuk Frontend (jika diperlukan)**
   Jika frontend membutuhkan koneksi spesifik ke backend, buat file `.env` di folder `frontend/` (biasanya mengarah ke IP Backend):
   ```env
   VITE_API_BASE_URL="http://localhost:5000/api"
   ```

4. **Jalankan Web Frontend:**
   ```bash
   npm run dev
   ```

5. **Buka Aplikasi Dashboard**
   Perintah di atas akan memberikan tautan lokal (biasanya `http://localhost:5173/`). Buka tautan tersebut di browser (Google Chrome, Firefox, dll).

Selesai! Sistem sudah berhasil dijalankan secara penuh di komputer Anda. 🎉

---

## Ringkasan Perintah Cepat (Bila sudah di-setup sebelumnya)

Jika besok-besok Anda hanya ingin sekadar menjalankan kembali, cukup buka 2 terminal:

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

**Terminal 3 Optional (Jalankan Keduanya Menggunakan FIle .sh):**
```bash
cd dashboard
./start-backend.sh
./start-frontend.sh
