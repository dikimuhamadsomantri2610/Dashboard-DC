# Dashboard DC 🚀

Proyek ini adalah sistem Dashboard untuk Distribution Center (DC) yang dibangun dengan stack modern:

- **Frontend**: React (Next.js) + Tailwind CSS + TypeScript
- **Backend**: Node.js + Express + Prisma ORM + TypeScript
- **DBMS / Database**: PostgreSQL

Sistem ini terbagi menjadi satu Backend dan dua Frontend (Admin Panel dan Presensi View).

## Prasyarat Server

Sebelum menginstal, pastikan Anda telah memiliki:

1. **Node.js** (rekomendasi versi 18.x atau 20.x ke atas)
2. **NPM** (biasanya terinstal bersamaan dengan Node.js)
3. **DBMS / Database** (PostgreSQL, pastikan sudah berjalan)

---

## 🛠 Panduan Instalasi & Menjalankan Sistem

Karena sistem ini terbagi menjadi bagian Backend dan Frontend, Anda harus menjalankan semuanya atau yang dibutuhkan saja. Ikuti langkah-langkah di bawah ini secara berurutan.

### Tahap 1: Setup Backend

1. **Buka terminal dan masuk ke folder `backend-dashboard-dc`:**

   ```bash
   cd backend-dashboard-dc
   ```

2. **Instal dependensi (library yang dibutuhkan):**

   ```bash
   npm install
   ```

3. **Buat file Environment Variables (`.env`)**
   Salin file `.env.example` (jika ada) ke `.env`, atau buat file baru bernama `.env` di dalam folder `backend-dashboard-dc/` dan isikan konfigurasi database serta rahasia server. Contoh:

   ```env
   # Ganti URL ini sesuai dengan konfigurasi database Anda
   DATABASE_URL="postgres://username:password@localhost:5432/nama_database"

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

   _(Opsional)_ Jika Anda ingin mengisi data awal (seeding), jalankan:

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
     Backend sekarang berjalan di `http://localhost:5000`. Biarkan terminal ini tetap terbuka.

---

### Tahap 2: Setup Frontend (Admin Panel)

1. **Buka tab terminal BARU, lalu masuk ke folder `frontend-dashboard-admin-panel`:**

   ```bash
   cd frontend-dashboard-admin-panel
   ```

2. **Instal dependensi (library yang dibutuhkan):**

   ```bash
   npm install
   ```

3. **Buat file Environment Variables (`.env`) untuk Frontend**
   Buat file `.env` di folder `frontend-dashboard-admin-panel/`:

   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5000/api"
   ```

4. **Jalankan Web Frontend:**
   - Untuk mode pengembangan:
     ```bash
     npm run dev
     ```
   - Untuk mode produksi:
     ```bash
     npm run build
     npm start
     ```
   Aplikasi berjalan di port **3000** (`http://localhost:3000`).

---

### Tahap 3: Setup Frontend (Presensi View)

1. **Buka tab terminal BARU, lalu masuk ke folder `frontend-presensi-view`:**

   ```bash
   cd frontend-presensi-view
   ```

2. **Instal dependensi (library yang dibutuhkan):**

   ```bash
   npm install
   ```

3. **Buat file Environment Variables (`.env`)**

   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5000/api"
   ```

4. **Jalankan Web Frontend:**
   - Untuk mode pengembangan:
     ```bash
     npm run dev
     ```
   - Untuk mode produksi:
     ```bash
     npm run build
     npm start
     ```
   Aplikasi berjalan di port **3001** (`http://localhost:3001`).

Selesai! Sistem sudah berhasil dijalankan secara penuh di komputer Anda. 🎉

---

## Ringkasan Perintah Cepat (Bila sudah di-setup sebelumnya)

Jika besok-besok Anda hanya ingin sekadar menjalankan kembali, cukup buka terminal untuk masing-masing:

**Terminal 1 (Backend):**

```bash
cd backend-dashboard-dc
npm start
```

**Terminal 2 (Frontend Admin Panel):**

```bash
cd frontend-dashboard-admin-panel
npm start
```

**Terminal 3 (Frontend Presensi View):**

```bash
cd frontend-presensi-view
npm start
```
