"use client";

import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileSpreadsheet, Loader2 } from "lucide-react";
import type { SuratTugasFreshApiItem } from "@/components/rekap-armada/surat-tugas-fresh/types/surat-tugas-fresh.types";
import { fmtDate } from "../utils/report-fresh.utils";

interface ReportFreshTableProps {
  isLoading: boolean;
  hasFilter: boolean;
  filtered: SuratTugasFreshApiItem[];
  currentData: SuratTugasFreshApiItem[];
  currentPage: number;
  perPage: number;
  totalPages: number;
  setCurrentPage: (v: number | ((p: number) => number)) => void;
}

export default function ReportFreshTable({
  isLoading,
  hasFilter,
  filtered,
  currentData,
  currentPage,
  perPage,
  totalPages,
  setCurrentPage,
}: ReportFreshTableProps) {
  const COLS = 12; // total kolom termasuk TGL Dibuat

  return (
    <CardContent className="px-3 pb-4 sm:px-6 sm:pb-6 pt-0 rounded-b-xl">
      {/* ── Table — responsive tanpa scroll horizontal di layar standar ── */}
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 overflow-x-auto mt-4">
        <Table className="min-w-[1000px] w-full">
          <TableHeader>
            <TableRow className="bg-zinc-50 dark:bg-zinc-900/60">
              <TableHead className="w-[3%] text-center font-semibold text-xs uppercase tracking-wide">
                No.
              </TableHead>
              <TableHead className="w-[8%] font-semibold text-xs uppercase tracking-wide">
                No Armada
              </TableHead>
              <TableHead className="w-[12%] text-center font-semibold text-xs uppercase tracking-wide">
                Nama Driver
              </TableHead>
              <TableHead className="w-[5%] font-semibold text-xs uppercase tracking-wide">
                DC
              </TableHead>
              <TableHead className="w-[25%] font-semibold text-xs uppercase tracking-wide">
                Nama Toko
              </TableHead>
              <TableHead className="w-[7%] font-semibold text-xs uppercase tracking-wide">
                Kode Gembok
              </TableHead>
              <TableHead className="w-[5%] text-center font-semibold text-xs uppercase tracking-wide">
                Cont.
              </TableHead>
              <TableHead className="w-[5%] text-center font-semibold text-xs uppercase tracking-wide">
                Box
              </TableHead>
              <TableHead className="w-[5%] text-center font-semibold text-xs uppercase tracking-wide">
                Kardus
              </TableHead>
              <TableHead className="w-[5%] text-center font-semibold text-xs uppercase tracking-wide">
                Bolit
              </TableHead>
              <TableHead className="w-[10%] font-semibold text-xs uppercase tracking-wide">
                Admin
              </TableHead>
              <TableHead className="w-[10%] font-semibold text-xs uppercase tracking-wide">
                Tgl. Dibuat
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={COLS}
                  className="text-center py-16 text-zinc-400"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin text-cyan-500" />
                    <span className="text-sm">Memuat data…</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : currentData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={COLS}
                  className="text-center py-16 text-zinc-400"
                >
                  <div className="flex flex-col items-center gap-2">
                    <FileSpreadsheet className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
                    <p className="text-sm">
                      {hasFilter
                        ? "Tidak ada data yang sesuai dengan filter."
                        : "Belum ada data Report Fresh."}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((item, idx) => {
                const globalIdx = (currentPage - 1) * perPage + idx + 1;
                return (
                  <TableRow
                    key={item.id}
                    className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    {/* No */}
                    <TableCell className="text-center text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                      {globalIdx}
                    </TableCell>

                    {/* No Armada */}
                    <TableCell>
                      <span className="inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 ring-1 ring-inset ring-zinc-200 dark:ring-zinc-700 whitespace-nowrap">
                        {item.noArmada}
                      </span>
                    </TableCell>

                    {/* Nama Driver */}
                    <TableCell className="text-sm text-center">
                      {item.namaDriver}
                    </TableCell>

                    {/* DC */}
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-cyan-50 dark:bg-cyan-900/30 px-2 py-0.5 text-xs font-semibold text-cyan-700 dark:text-cyan-300 ring-1 ring-inset ring-cyan-200 dark:ring-cyan-800/40 whitespace-nowrap">
                        {item.dc || "-"}
                      </span>
                    </TableCell>

                    {/* Nama Toko */}
                    <TableCell
                      className="text-sm max-w-[170px] truncate"
                      title={item.nama_toko}
                    >
                      {item.nama_toko || item.inisialToko || "-"}
                    </TableCell>

                    {/* Kode Gembok */}
                    <TableCell className="text-xs font-mono text-zinc-600 dark:text-zinc-300 whitespace-nowrap">
                      {item.kodeGembok || "-"}
                    </TableCell>

                    {/* Container */}
                    <TableCell className="text-center text-sm font-bold text-blue-600 dark:text-blue-400">
                      {item.jumlahContainer ?? "-"}
                    </TableCell>

                    {/* Box */}
                    <TableCell className="text-center text-sm font-bold text-violet-600 dark:text-violet-400">
                      {item.jumlahBox ?? "-"}
                    </TableCell>

                    {/* Kardus */}
                    <TableCell className="text-center text-sm font-bold text-amber-600 dark:text-amber-400">
                      {item.jumlahDus ?? "-"}
                    </TableCell>

                    {/* Bolit */}
                    <TableCell className="text-center text-sm font-bold text-rose-600 dark:text-rose-400">
                      {item.jumlahBolit ?? "-"}
                    </TableCell>

                    {/* Admin */}
                    <TableCell className="text-sm text-zinc-600 dark:text-zinc-300">
                      {item.admin}
                    </TableCell>

                    {/* Tgl. Dibuat — kolom baru dari createdAt, hanya tanggal */}
                    <TableCell className="text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                      {fmtDate(item.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Pagination ── */}
      {!isLoading && filtered.length > 0 && (
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center sm:text-left">
            Menampilkan{" "}
            <span className="font-medium text-zinc-700 dark:text-zinc-200">
              {(currentPage - 1) * perPage + 1}
            </span>
            {" – "}
            <span className="font-medium text-zinc-700 dark:text-zinc-200">
              {Math.min(currentPage * perPage, filtered.length)}
            </span>
            {" dari "}
            <span className="font-medium text-zinc-700 dark:text-zinc-200">
              {filtered.length}
            </span>
            {" data"}
          </p>

          <div className="flex items-center gap-1 flex-wrap justify-center">
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </Button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="px-1 text-zinc-400 text-sm">
                    …
                  </span>
                );
              }
              return null;
            })}

            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </CardContent>
  );
}
