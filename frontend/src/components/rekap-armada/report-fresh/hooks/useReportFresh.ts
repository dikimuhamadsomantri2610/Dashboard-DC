"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchSuratTugasFresh } from "@/components/rekap-armada/surat-tugas-fresh/services/surat-tugas-fresh.service";
import type { SuratTugasFreshApiItem } from "@/components/rekap-armada/surat-tugas-fresh/types/surat-tugas-fresh.types";
import { toast } from "sonner";

// ── Samakan logika filter tanggal dengan SuratTugasFresh ─────────
export const toLocalDateKey = (iso: string): string => {
  return new Date(iso).toISOString().slice(0, 10);
};

export const useReportFresh = () => {
  const [data, setData] = useState<SuratTugasFreshApiItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchSuratTugasFresh();
      const sorted = [...res].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setData(sorted);
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengambil data Report Fresh.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);
  useEffect(() => { setCurrentPage(1); }, [startDate, endDate, searchQuery, perPage]);

  const filtered = useMemo(() => {
    let result = [...data];

    // ── Gunakan local date (bukan toISOString/UTC) agar WIB tepat ──
    if (startDate) {
      result = result.filter(item => toLocalDateKey(item.createdAt) >= startDate);
    }
    if (endDate) {
      result = result.filter(item => toLocalDateKey(item.createdAt) <= endDate);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        item =>
          item.noArmada.toLowerCase().includes(q) ||
          item.namaDriver.toLowerCase().includes(q) ||
          item.dc.toLowerCase().includes(q) ||
          (item.nama_toko || "").toLowerCase().includes(q) ||
          item.admin.toLowerCase().includes(q) ||
          item.kodeGembok.toLowerCase().includes(q)
      );
    }
    return result;
  }, [data, startDate, endDate, searchQuery]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const currentData = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const hasFilter = !!(startDate || endDate || searchQuery);

  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setSearchQuery("");
  };

  return {
    data, isLoading, filtered, currentData, totalPages, hasFilter,
    startDate, setStartDate,
    endDate, setEndDate,
    searchQuery, setSearchQuery,
    perPage, setPerPage,
    currentPage, setCurrentPage,
    fetchData, resetFilters,
  };
};
