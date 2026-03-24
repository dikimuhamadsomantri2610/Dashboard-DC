import { Button } from '@/components/ui/button';
import { Trash2, FileText } from 'lucide-react';
import type { GroupedSuratTugas } from '../types/surat-tugas.types';

interface SuratTugasDialogsProps {
    groupToDelete: GroupedSuratTugas | null;
    setGroupToDelete: (val: GroupedSuratTugas | null) => void;
    executeDeleteGroup: () => void;
    groupToConfirmPrint: { group: GroupedSuratTugas; index: number } | null;
    setGroupToConfirmPrint: (val: { group: GroupedSuratTugas; index: number } | null) => void;
    setSelectedGroupForPrint: (val: GroupedSuratTugas & { printIndex?: number }) => void;
}

export default function SuratTugasDialogs({
    groupToDelete,
    setGroupToDelete,
    executeDeleteGroup,
    groupToConfirmPrint,
    setGroupToConfirmPrint,
    setSelectedGroupForPrint
}: SuratTugasDialogsProps) {
    return (
        <>
            {groupToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 print:hidden">
                    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 space-y-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2 text-red-600 dark:text-red-500">
                                <Trash2 className="h-5 w-5" />
                                Konfirmasi Hapus Data
                            </h2>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                Apakah Anda yakin ingin menghapus SELURUH surat tugas untuk armada <strong className="text-zinc-900 dark:text-zinc-100">{groupToDelete.no_armada}</strong>? Tindakan ini tidak dapat dibatalkan.
                            </p>
                        </div>
                        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900/50 flex justify-end gap-2 border-t border-zinc-200 dark:border-zinc-800">
                            <Button variant="outline" onClick={() => setGroupToDelete(null)}>Batal</Button>
                            <Button className="bg-red-600 text-white hover:bg-red-700" onClick={executeDeleteGroup}>Hapus</Button>
                        </div>
                    </div>
                </div>
            )}

            {groupToConfirmPrint && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 print:hidden">
                    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 space-y-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                                <FileText className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                                Konfirmasi Cetak
                            </h2>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Pastikan Printer Sudah Terpasang Kertas A-5
                            </p>
                        </div>
                        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900/50 flex justify-end gap-2 border-t border-zinc-200 dark:border-zinc-800">
                            <Button variant="outline" onClick={() => setGroupToConfirmPrint(null)}>Batal</Button>
                            <Button onClick={() => {
                                if (groupToConfirmPrint) {
                                    setSelectedGroupForPrint({ ...groupToConfirmPrint.group, printIndex: groupToConfirmPrint.index });
                                    setGroupToConfirmPrint(null);
                                    setTimeout(() => window.print(), 100);
                                }
                            }}>
                                Lanjutkan Print
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
