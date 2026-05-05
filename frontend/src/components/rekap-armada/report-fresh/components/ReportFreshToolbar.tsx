"use client";

import { Input } from "@/components/ui/input";
import { CardHeader } from "@/components/ui/card";
import { X, Search, CalendarRange } from "lucide-react";

interface ReportFreshToolbarProps {
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  perPage: number;
  setPerPage: (v: number) => void;
  hasFilter: boolean;
  resetFilters: () => void;
}

export default function ReportFreshToolbar({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  searchQuery,
  setSearchQuery,
  perPage,
  setPerPage,
  hasFilter,
  resetFilters,
}: ReportFreshToolbarProps) {
  return (
    <CardHeader className="px-4 pt-4 pb-0 sm:px-6">
      <div className="flex flex-col gap-3">
        {/* ── Row 1: date range + per-page ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Left: date range */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 w-full sm:w-auto">
              <CalendarRange className="h-4 w-4 text-zinc-400 shrink-0" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="text-sm bg-transparent border-none outline-none text-zinc-700 dark:text-zinc-300 min-w-0 flex-1 sm:w-[120px]"
              />
              <span className="text-zinc-400 text-sm shrink-0">—</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="text-sm bg-transparent border-none outline-none text-zinc-700 dark:text-zinc-300 min-w-0 flex-1 sm:w-[120px]"
              />
              {hasFilter && (
                <button
                  onClick={resetFilters}
                  className="ml-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 shrink-0"
                  title="Reset filter"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right: per-page */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
              Tampilkan:
            </span>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="h-8 rounded-md border border-zinc-200 dark:border-zinc-700 bg-transparent px-2 text-sm text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value={20}>20</option>
              <option value={100}>100</option>
              <option value={250}>250</option>
            </select>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              data
            </span>
          </div>
        </div>

        {/* ── Row 2: search bar ── */}
        <div className="flex border-t border-zinc-100 dark:border-zinc-800 pt-3 pb-1">
          <div className="relative w-full sm:w-auto sm:ml-auto sm:min-w-[260px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Cari armada, driver, toko, admin…"
              className="h-9 pl-8 pr-8 text-sm w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </CardHeader>
  );
}
