"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Printer } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface TokoItem {
  id: number;
  site: string;
  inisialToko: string;
  namaToko: string;
  alamatToko: string;
}

export default function LabelAfterPickFresh() {
  const { user } = useAuth();
  const [tokoList, setTokoList] = useState<TokoItem[]>([]);
  const [selectedTokoId, setSelectedTokoId] = useState<string>("");
  const [totalKoli, setTotalKoli] = useState<string>("");

  const currentDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  useEffect(() => {
    const fetchToko = async () => {
      try {
        const res = await api.get("/toko");
        setTokoList(res.data);
      } catch (error) {
        console.error("Error fetching toko:", error);
        toast.error("Gagal memuat data toko");
      }
    };
    fetchToko();
  }, []);

  const selectedToko = tokoList.find((t) => t.id.toString() === selectedTokoId);
  const koliCount = parseInt(totalKoli) || 0;

  const handlePrint = () => {
    if (!selectedToko) {
      toast.error("Pilih Toko terlebih dahulu");
      return;
    }
    if (koliCount < 1) {
      toast.error("Masukkan total koli yang valid (minimal 1)");
      return;
    }

    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <>
      <style>
        {`
        /* 
           SISTEM CETAK THERMAL 40x20mm ZT410 (DYNAMIC VIEWPORT SCALING)
        */
        @media screen {
          #thermal-print-section { display: none !important; }
        }

        @media print {
          /* RESET BROWSER */
          body * {
            visibility: hidden;
            box-sizing: border-box;
          }
          
          #thermal-print-section, #thermal-print-section * {
            visibility: visible;
          }

          /* SETTING UKURAN KERTAS PRINTER: Lebar 4 cm dan Tinggi 2 cm, TANPA BATAS (MARGIN 0) */
          @page {
            size: 400mm 200mm;
            margin: 0;
          }

          html, body {
            width: 100vw;
            height: 100vh;
            margin: 0 !important;
            padding: 0 !important;
            background: #fff;
          }

          /* CONTAINER UTAMA MENEMPEL KE TEPI (Mencegah "Freespace" Massive akibat resolusi Chrome DPI) */
          #thermal-print-section {
            position: absolute;
            left: 0;
            top: 0;
            margin: 0;
            padding: 0;
            width: 100vw;
            height: 100vh;
            display: block;
          }

          /* SETIAP HALAMAN = 100% Penuh mengikuti layar Preview Printer */
          .thermal-label {
            width: 100vw !important;    /* WAJIB menyesuaikan layar 100% (ANTI KECIL DI TENGAH) */
            height: 100vh !important;   /* Memakai 100vh dari 20mm kertas */
            margin: 0 !important;
            padding: 1vw !important;    /* Padding tipis dinamik 1% layar */
            page-break-after: always !important; /* Pemotong 10 Halaman */
            overflow: hidden !important;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: #fff;
            color: #000;
            font-family: 'Poppins', sans-serif;
          }

          /* TYPOGRAPHY BERBASIS VW (Bypass Scaling Bug Chrome pada elemen fisik "mm/px") */
          h1, h2, h3, p {
             margin: 0;
             padding: 0;
             line-height: 1; /* Tekan jarak antar baris */
          }
        }
        `}
      </style>

      {/* --- UI LAYER --- */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Label After Pick Fresh</h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Generate dan cetak label thermal 4x2 cm khusus Printer Zebra.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Setup Cetak Label</CardTitle>
            <CardDescription>
              Pilih tujuan dan total koli. Sistem merender ukuran dinamis agar memenuhi kertas thermal 100%.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Inisial Toko</label>
                <select
                  className="w-full h-10 px-3 rounded-md border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-zinc-300"
                  value={selectedTokoId}
                  onChange={(e) => setSelectedTokoId(e.target.value)}
                >
                  <option value="" disabled>-- Pilih Toko --</option>
                  {tokoList.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.inisialToko} - {t.namaToko}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Total Koli</label>
                <Input
                  type="number"
                  min="1"
                  placeholder="Contoh: 10"
                  value={totalKoli}
                  onChange={(e) => setTotalKoli(e.target.value)}
                  className="h-10"
                />
              </div>
              <div className="flex items-end">
                <Button
                  className="w-full gap-2 h-10"
                  onClick={handlePrint}
                  disabled={!selectedToko || koliCount < 1}
                >
                  <Printer className="w-4 h-4" /> Cetak Label Sekarang
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- PRINT LAYER (Scaling Dinamis Mengisi Viewport Kertas 100%) --- */}
      <div id="thermal-print-section">
        {selectedToko &&
          koliCount > 0 &&
          Array.from({ length: koliCount }).map((_, i) => (
            <div key={i} className="thermal-label">

              {/* KEPALA (Logo & Alamat DC & Tanggal) */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: "1vh", marginBottom: "5vh" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1vw" }}>
                  <img
                    src="/logo_yomart.svg"
                    alt="logo"
                    style={{ width: "8vw", height: "8vw", objectFit: "contain" }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", gap: "1vh", marginTop: "2vh" }}>
                    <h1 style={{ fontSize: "3vw", fontWeight: "bold", letterSpacing: "-0.2vw", lineHeight: "1" }}>
                      DC YOMART FRESH
                    </h1>
                    <p style={{ fontSize: "2vw", lineHeight: "1" }}>
                      Jl. Soekarno-Hatta No.236, Kb. Lega, Kec. Bojongloa Kidul, Kota Bandung, Jawa Barat 40235
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: "right", marginTop: "2vh", marginRight: "1vw" }}>
                  <p style={{ fontSize: "2.5vw", fontWeight: "bold" }}>{currentDate}</p>
                </div>
              </div>

              {/* BADAN (Tujuan / Ship To) */}
              <div style={{ marginTop: "1vh", marginBottom: "1vh" }}>
                <p style={{ fontSize: "3vw", marginBottom: "2vh", textTransform: "uppercase" }}>Ship to :</p>
                <h2 style={{ fontSize: "4.5vw", fontWeight: "900", letterSpacing: "-0.2vw", marginBottom: "1vh", lineHeight: "1" }}>
                  YM {selectedToko.inisialToko} - {selectedToko.site}
                </h2>
                <h3
                  style={{
                    fontSize: "5.5vw",
                    fontWeight: "900",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: "1"
                  }}
                > YOMART {selectedToko.namaToko}
                </h3>
              </div>

              {/* KAKI (Info Koli) */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "auto", marginBottom: "2vh" }}>
                <div>
                  <p style={{ fontSize: "4vw", fontWeight: "900", marginBottom: "1vh" }}>KOLI- KE :</p>
                  <h1 style={{ fontSize: "4vw", fontWeight: "900", lineHeight: "1" }}>{i + 1}</h1>
                </div>
                <div style={{ textAlign: "right", marginRight: "1vw" }}>
                  <p style={{ fontSize: "4vw", fontWeight: "900", marginBottom: "1vh" }}>TOTAL-KOLI :</p>
                  <h1 style={{ fontSize: "4vw", fontWeight: "900", lineHeight: "1" }}>{koliCount}</h1>
                </div>

              </div>
              <div>
                <p style={{ fontSize: "2.5vw", marginTop: "1vh" }}>
                  Printed By: {user?.namaLengkap || user?.username || "ADMIN"}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
