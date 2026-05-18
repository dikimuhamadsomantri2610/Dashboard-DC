"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Check, X, FileSignature } from "lucide-react";
import type { GroupedSuratTugas } from "../types/surat-tugas.types";

interface SuratTugasPendingCardProps {
  pendingGroups: GroupedSuratTugas[];
  onApprove: (
    group: GroupedSuratTugas,
    details?: {
      id: number;
      materai: string;
      loadNumber: string;
      keterangan: string;
    }[],
  ) => void;
  onReject: (group: GroupedSuratTugas) => void;
}

interface ModalState {
  group: GroupedSuratTugas;
  inputs: Record<
    number,
    { materai: string; loadNumber: string; keterangan: string }
  >;
}

export default function SuratTugasPendingCard({
  pendingGroups,
  onApprove,
  onReject,
}: SuratTugasPendingCardProps) {
  const [modalState, setModalState] = useState<ModalState | null>(null);

  if (pendingGroups.length === 0) return null;

  const openModal = (group: GroupedSuratTugas) => {
    const initialInputs: Record<
      number,
      { materai: string; loadNumber: string; keterangan: string }
    > = {};
    group.items.forEach((item) => {
      initialInputs[item.id] = {
        materai: "Tidak",
        loadNumber: "",
        keterangan: "R",
      };
    });
    setModalState({ group, inputs: initialInputs });
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    if (!modalState) return;
    setModalState({
      ...modalState,
      inputs: {
        ...modalState.inputs,
        [id]: { ...modalState.inputs[id], [field]: value },
      },
    });
  };

  const handleProcess = () => {
    if (!modalState) return;
    const details = Object.entries(modalState.inputs).map(([id, vals]) => ({
      id: Number(id),
      materai: vals.materai,
      loadNumber: vals.loadNumber,
      keterangan: vals.keterangan,
    }));
    onApprove(modalState.group, details);
    setModalState(null);
  };

  return (
    <>
      <Card className="border-amber-300 dark:border-amber-700/60 shadow-sm">
        <CardHeader className="bg-amber-50/70 dark:bg-amber-900/15 border-b border-amber-200 dark:border-amber-700/50 py-4 px-5">
          <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-base">
            <Clock className="h-5 w-5" />
            Menunggu Persetujuan
            <span className="ml-1 inline-flex items-center justify-center rounded-full bg-amber-500 text-white text-xs font-bold h-5 min-w-[20px] px-1.5">
              {pendingGroups.length}
            </span>
          </CardTitle>
          <CardDescription className="text-amber-600/80 dark:text-amber-500/80 text-xs">
            Daftar surat tugas yang baru dibuat dan belum diproses
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-5 bg-white dark:bg-zinc-950 space-y-3">
          {pendingGroups.map((group) => (
            <div
              key={group.groupId}
              className="flex flex-col md:flex-row md:items-stretch gap-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/50 hover:border-amber-300 dark:hover:border-amber-700/60 transition-colors"
            >
              {/* Info grid */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-3">
                <div>
                  <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-0.5">
                    No Armada
                  </p>
                  <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                    {group.noArmada}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-0.5">
                    Nama Driver
                  </p>
                  <p className="font-medium text-sm text-zinc-800 dark:text-zinc-200">
                    {group.namaDriver}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-0.5">
                    Checker
                  </p>
                  <p className="font-medium text-sm text-zinc-800 dark:text-zinc-200">
                    {group.namaChecker}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-0.5">
                    DC
                  </p>
                  <p className="font-semibold text-sm text-zinc-700 dark:text-zinc-300">
                    {group.dc}
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-0.5">
                    Dibuat
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {new Date(group.createdAt)
                      .toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      .replace(",", "")}
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-3 lg:col-span-5">
                  <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-1.5">
                    Toko ({group.items.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((toko) => (
                      <span
                        key={toko.id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-medium border border-amber-200 dark:border-amber-700/50"
                        title={toko.nama_toko}
                      >
                        <FileSignature className="h-2.5 w-2.5 shrink-0" />
                        {toko.inisialToko || toko.nama_toko}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0 md:border-l md:border-zinc-200 md:dark:border-zinc-800 md:pl-4">
                <div className="flex md:flex-col gap-2 w-full md:w-auto">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 md:flex-none text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-800 hover:border-red-300"
                    onClick={() => onReject(group)}
                  >
                    <X className="w-3.5 h-3.5 mr-1" />
                    Tolak
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white"
                    onClick={() => openModal(group)}
                  >
                    <Check className="w-3.5 h-3.5 mr-1" />
                    Review
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modal */}
      {modalState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-2xl p-6 my-auto max-h-[90vh] flex flex-col">
            <button
              onClick={() => setModalState(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold mb-6">Proses Surat Tugas</h3>

            <div className="overflow-y-auto pr-2 flex-1 min-h-0 space-y-6">
              {/* Header Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                    No Armada
                  </span>
                  <p className="font-medium text-base mt-1">
                    {modalState.group.noArmada}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                    Kode Gembok
                  </span>
                  <p className="font-medium text-base mt-1">
                    {modalState.group.items[0]?.kodeGembok || "-"}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                    Number Seal
                  </span>
                  <p className="font-medium text-base mt-1">
                    {modalState.group.items[0]?.numberSeal || "-"}
                  </p>
                </div>
              </div>

              {/* Toko Inputs */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <FileSignature className="h-5 w-5 text-amber-500" />
                  Detail Toko
                </h4>
                {modalState.group.items.map((toko, index) => (
                  <div
                    key={toko.id}
                    className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 shadow-sm relative"
                  >
                    <div className="absolute top-0 left-0 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg rounded-tl-lg">
                      #{index + 1}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-4">
                      <div>
                        <span className="text-xs text-zinc-500">
                          Inisial Toko
                        </span>
                        <p className="font-medium text-sm">
                          {toko.inisialToko}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-zinc-500">
                          Nama Checker
                        </span>
                        <p className="font-medium text-sm">
                          {toko.namaChecker}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-zinc-500">
                          Jml Container
                        </span>
                        <p className="font-medium text-sm">
                          {toko.jumlahContainer}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-zinc-500">Jml Koli</span>
                        <p className="font-medium text-sm">{toko.jumlahKoli}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                      <div>
                        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                          Materai
                        </label>
                        <select
                          value={modalState.inputs[toko.id]?.materai || "Tidak"}
                          onChange={(e) =>
                            handleInputChange(
                              toko.id,
                              "materai",
                              e.target.value,
                            )
                          }
                          className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="Tidak">Tidak</option>
                          <option value="Ya">Ya</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                          Load Number
                        </label>
                        <input
                          type="text"
                          value={modalState.inputs[toko.id]?.loadNumber || ""}
                          onChange={(e) =>
                            handleInputChange(
                              toko.id,
                              "loadNumber",
                              e.target.value,
                            )
                          }
                          placeholder="Masukkan load number..."
                          className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                          Keterangan
                        </label>
                        <select
                          value={modalState.inputs[toko.id]?.keterangan || "R"}
                          onChange={(e) =>
                            handleInputChange(
                              toko.id,
                              "keterangan",
                              e.target.value,
                            )
                          }
                          className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="R">R</option>
                          <option value="SR">SR</option>
                          <option value="B">B</option>
                          <option value="F">F</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-2 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setModalState(null)}>
                Batal
              </Button>
              <Button
                onClick={handleProcess}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Processed
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
