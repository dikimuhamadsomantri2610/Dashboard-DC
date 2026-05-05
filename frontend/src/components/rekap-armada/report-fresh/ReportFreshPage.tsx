"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Snowflake, Download, RefreshCw, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useReportFresh } from "./hooks/useReportFresh";
import ReportFreshToolbar from "./components/ReportFreshToolbar";
import ReportFreshTable from "./components/ReportFreshTable";
import { exportReportFreshToExcel } from "./utils/report-fresh.utils";
import type { SuratTugasFreshApiItem } from "@/components/rekap-armada/surat-tugas-fresh/types/surat-tugas-fresh.types";

// ── Helpers ────────────────────────────────────────────────────────────────────
/** Ambil YYYY-MM-DD berdasarkan timezone lokal browser */
const toLocalDateKey = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const sumField = (arr: SuratTugasFreshApiItem[], key: keyof SuratTugasFreshApiItem) =>
  arr.reduce((s, r) => s + ((r[key] as number) || 0), 0);

const calcPct = (today: number, yesterday: number): number | null => {
  if (yesterday === 0) return null;
  return ((today - yesterday) / yesterday) * 100;
};

import { useState, useEffect } from "react";
// ── Percentage Badge ────────────────────────────────────────────────────────────
function PctBadge({ today, yesterday }: { today: number; yesterday: number }) {
  const p = calcPct(today, yesterday);
  if (p === null) {
    return (
      <span className="inline-flex items-center gap-0.5 text-[10px] text-zinc-400 dark:text-zinc-500">
        <Minus className="h-2.5 w-2.5" />
        Baru
      </span>
    );
  }
  const isUp = p >= 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${
        isUp
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-red-500 dark:text-red-400"
      }`}
    >
      {isUp ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
      {Math.abs(p).toFixed(1)}% vs kemarin
    </span>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function ReportFreshPage() {
  const {
    data, isLoading, filtered, currentData, totalPages, hasFilter,
    startDate, setStartDate,
    endDate, setEndDate,
    searchQuery, setSearchQuery,
    perPage, setPerPage,
    currentPage, setCurrentPage,
    fetchData, resetFilters,
  } = useReportFresh();

  // State untuk tanggal hari ini dan kemarin, menghindari impure function di render
  const [todayKey, setTodayKey] = useState<string>("");
  const [yesterdayKey, setYesterdayKey] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setTodayKey(toLocalDateKey(new Date().toISOString()));
      setYesterdayKey(toLocalDateKey(new Date(Date.now() - 86_400_000).toISOString()));
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  const todayData  = todayKey ? data.filter(r => toLocalDateKey(r.createdAt) === todayKey) : [];
  const yestData   = yesterdayKey ? data.filter(r => toLocalDateKey(r.createdAt) === yesterdayKey) : [];

  const stats = [
    {
      label: "Total Data",
      today: todayData.length,
      yesterday: yestData.length,
      color: "text-zinc-700 dark:text-zinc-200",
      bg: "bg-zinc-100 dark:bg-zinc-800/60",
      border: "border-zinc-200/70 dark:border-zinc-700/40",
    },
    {
      label: "Total Container",
      today: sumField(todayData, "jumlahContainer"),
      yesterday: sumField(yestData, "jumlahContainer"),
      color: "text-blue-700 dark:text-blue-300",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200/70 dark:border-blue-800/30",
    },
    {
      label: "Total Box",
      today: sumField(todayData, "jumlahBox"),
      yesterday: sumField(yestData, "jumlahBox"),
      color: "text-violet-700 dark:text-violet-300",
      bg: "bg-violet-50 dark:bg-violet-900/20",
      border: "border-violet-200/70 dark:border-violet-800/30",
    },
    {
      label: "Total Kardus",
      today: sumField(todayData, "jumlahDus"),
      yesterday: sumField(yestData, "jumlahDus"),
      color: "text-amber-700 dark:text-amber-300",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-200/70 dark:border-amber-800/30",
    },
    {
      label: "Total Bolit",
      today: sumField(todayData, "jumlahBolit"),
      yesterday: sumField(yestData, "jumlahBolit"),
      color: "text-rose-700 dark:text-rose-300",
      bg: "bg-rose-50 dark:bg-rose-900/20",
      border: "border-rose-200/70 dark:border-rose-800/30",
    },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* ── Page Header — sama persis dgn SuratTugasFreshPage ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400 shadow-sm">
            <Snowflake className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex flex-wrap items-center gap-2">
              Report Fresh
              <span className="inline-flex items-center rounded-full bg-cyan-100 dark:bg-cyan-900/40 px-2.5 py-0.5 text-[10px] font-medium text-cyan-700 dark:text-cyan-300 ring-1 ring-inset ring-cyan-200 dark:ring-cyan-800/40">
                Surat Tugas Fresh
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              Laporan lengkap seluruh data pengiriman Fresh.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            disabled={isLoading}
            className="flex items-center gap-2 h-9"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={() => exportReportFreshToExcel(filtered)}
            disabled={isLoading}
            className="flex items-center gap-2 h-9 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            <Download className="h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* ── Stats Strip — data hari ini + % vs kemarin ── */}
      {!isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} ${stat.border} rounded-xl px-4 py-3 flex flex-col gap-1 border`}
            >
              <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {stat.label}
              </span>
              <span className={`text-xl font-bold tracking-tight ${stat.color}`}>
                {stat.today.toLocaleString("id-ID")}
              </span>
              <PctBadge today={stat.today} yesterday={stat.yesterday} />
            </div>
          ))}
        </div>
      )}

      {/* ── Table Card ── */}
      <Card>
        <ReportFreshToolbar
          startDate={startDate} setStartDate={setStartDate}
          endDate={endDate} setEndDate={setEndDate}
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          perPage={perPage} setPerPage={setPerPage}
          hasFilter={hasFilter}
          resetFilters={resetFilters}
        />
        <ReportFreshTable
          isLoading={isLoading}
          hasFilter={hasFilter}
          filtered={filtered}
          currentData={currentData}
          currentPage={currentPage}
          perPage={perPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </Card>
    </div>
  );
}
