"use client";

import { useState, useEffect } from "react";
import { FileText, Send, RotateCcw, Plus, X } from "lucide-react";
import { checkerNames } from "./data/checker.data";
import {
  fetchArmada,
  type ArmadaItem,
} from "../rekap-armada/update-armada/services/armada.service";
import {
  fetchToko,
  type TokoItem,
} from "../rekap-armada/update-toko/services/toko.service";
import api from "@/lib/axios";
import axios from "axios";

interface CheckerItem {
  id: string;
  inisialToko: string;
  namaChecker: string;
  jumlahContainer: string;
  jumlahKoli: string;
}

interface FormData {
  noArmada: string;
  kodeGembok: string;
  numberSeal: string;
  checkers: CheckerItem[];
}

export default function SuratTugasForm() {
  const [formData, setFormData] = useState<FormData>({
    noArmada: "",
    kodeGembok: "",
    numberSeal: "",
    checkers: [],
  });
  const [tempInisialToko, setTempInisialToko] = useState("");
  const [tempNamaChecker, setTempNamaChecker] = useState("");
  const [tempJumlahContainer, setTempJumlahContainer] = useState("");
  const [tempJumlahKoli, setTempJumlahKoli] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [armadaList, setArmadaList] = useState<ArmadaItem[]>([]);
  const [tokoList, setTokoList] = useState<TokoItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [armadaData, tokoData] = await Promise.all([
          fetchArmada(),
          fetchToko(),
        ]);
        setArmadaList(armadaData);
        setTokoList(tokoData);
      } catch (error) {
        console.error("Gagal memuat data saran:", error);
      }
    };
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddToko = () => {
    if (!tempInisialToko.trim()) {
      alert("Inisial Toko tidak boleh kosong");
      return;
    }
    if (!tempNamaChecker.trim()) {
      alert("Nama Checker harus dipilih");
      return;
    }
    if (!tempJumlahContainer.trim()) {
      alert("Jumlah Container tidak boleh kosong");
      return;
    }
    if (!tempJumlahKoli.trim()) {
      alert("Jumlah Koli tidak boleh kosong");
      return;
    }

    const newChecker: CheckerItem = {
      id: Date.now().toString(),
      inisialToko: tempInisialToko,
      namaChecker: tempNamaChecker,
      jumlahContainer: tempJumlahContainer,
      jumlahKoli: tempJumlahKoli,
    };

    setFormData((prev) => ({
      ...prev,
      checkers: [...prev.checkers, newChecker],
    }));

    setTempInisialToko("");
    setTempNamaChecker("");
    setTempJumlahContainer("");
    setTempJumlahKoli("");
  };

  const handleRemoveChecker = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      checkers: prev.checkers.filter((checker) => checker.id !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.noArmada.trim()) {
      alert("No Armada tidak boleh kosong");
      return;
    }
    if (!formData.kodeGembok.trim()) {
      alert("Kode Gembok tidak boleh kosong");
      return;
    }
    if (!formData.numberSeal.trim()) {
      alert("Number Seal tidak boleh kosong");
      return;
    }
    if (formData.checkers.length === 0) {
      alert("Tambahkan minimal 1 Toko & Checker");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/surat-tugas-check", {
        noArmada: formData.noArmada,
        kodeGembok: formData.kodeGembok,
        numberSeal: formData.numberSeal,
        checkers: formData.checkers
      });
      alert("Data berhasil dikirim!");
      handleReset();
    } catch (error) {
      console.error("Error:", error);
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Gagal mengirim data. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      noArmada: "",
      kodeGembok: "",
      numberSeal: "",
      checkers: [],
    });
    setTempInisialToko("");
    setTempNamaChecker("");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-900 via-indigo-800 to-purple-800 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15 text-white shadow-lg shadow-slate-950/20">
              <FileText size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Surat Tugas Checker
              </h1>
              <p className="mt-2 text-sm text-white/80">
                Verifikasi informasi armada dan seal
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.18)] sm:p-10"
        >
          <div className="grid gap-6">
            <div>
              <label
                htmlFor="noArmada"
                className="mb-2 block text-sm font-semibold uppercase tracking-[0.3em] text-slate-700"
              >
                No Armada
              </label>
              <input
                type="text"
                id="noArmada"
                name="noArmada"
                value={formData.noArmada}
                onChange={handleChange}
                list="armada-suggestions"
                placeholder="Masukkan No Armada"
                className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 placeholder:text-slate-400"
              />
              <datalist id="armada-suggestions">
                {armadaList.map((armada) => (
                  <option key={armada.id} value={armada.noMobil} />
                ))}
              </datalist>
            </div>

            <div>
              <label
                htmlFor="kodeGembok"
                className="mb-2 block text-sm font-semibold uppercase tracking-[0.3em] text-slate-700"
              >
                Kode Gembok
              </label>
              <input
                type="text"
                id="kodeGembok"
                name="kodeGembok"
                value={formData.kodeGembok}
                onChange={handleChange}
                placeholder="Masukkan Kode Gembok"
                className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label
                htmlFor="numberSeal"
                className="mb-2 block text-sm font-semibold uppercase tracking-[0.3em] text-slate-700"
              >
                Number Seal
              </label>
              <input
                type="text"
                id="numberSeal"
                name="numberSeal"
                value={formData.numberSeal}
                onChange={handleChange}
                placeholder="Masukkan Number Seal"
                className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="mb-4 block text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">
                Toko, Nama Checker dan Jumlah Container/Koli
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1.5fr_2fr_1fr_1fr_auto] lg:items-center">
                <div className="w-full">
                  <input
                    type="text"
                    value={tempInisialToko}
                    onChange={(e) => setTempInisialToko(e.target.value)}
                    list="toko-suggestions"
                    placeholder="Inisial Toko"
                    className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 placeholder:text-slate-400"
                  />
                  <datalist id="toko-suggestions">
                    {tokoList.map((toko) => (
                      <option key={toko.id} value={toko.inisialToko} />
                    ))}
                  </datalist>
                </div>
                <select
                  value={tempNamaChecker}
                  onChange={(e) => setTempNamaChecker(e.target.value)}
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 placeholder:text-slate-400"
                >
                  <option value="">Pilih Nama Checker</option>
                  {checkerNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={tempJumlahContainer}
                  onChange={(e) => setTempJumlahContainer(e.target.value)}
                  placeholder="Jumlah Container"
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 placeholder:text-slate-400"
                />
                <input
                  type="number"
                  value={tempJumlahKoli}
                  onChange={(e) => setTempJumlahKoli(e.target.value)}
                  placeholder="Jumlah Koli"
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={handleAddToko}
                  className="inline-flex h-[52px] w-full sm:col-span-2 lg:col-span-1 lg:w-[52px] items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  title="Tambah Checker"
                >
                  <Plus size={18} />
                </button>
              </div>

              {formData.checkers.length > 0 && (
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  {formData.checkers.map((checker) => (
                    <div
                      key={checker.id}
                      className="mb-3 flex flex-row items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3 shadow-sm last:mb-0 border-l-4 border-indigo-500"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 font-bold uppercase text-xs">
                          {checker.inisialToko}
                        </span>
                        <span className="text-sm font-semibold text-slate-700">
                          {checker.namaChecker}
                        </span>
                        <div className="flex gap-2">
                          <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                            {checker.jumlahContainer} Container
                          </span>
                          <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                            {checker.jumlahKoli} Koli
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveChecker(checker.id)}
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 transition hover:bg-red-200"
                        title="Hapus Toko"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RotateCcw size={18} />
              Reset
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Kirim
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
