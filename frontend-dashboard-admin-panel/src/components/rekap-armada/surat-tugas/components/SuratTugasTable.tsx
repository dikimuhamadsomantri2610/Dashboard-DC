"use client";
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Printer } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { GroupedSuratTugas } from '../types/surat-tugas.types';

interface SuratTugasTableProps {
    isLoading: boolean;
    currentData: GroupedSuratTugas[];
    groupedDataFiltered: GroupedSuratTugas[];
    currentPage: number;
    perPage: number;
    totalPages: number;
    setCurrentPage: (val: number | ((prev: number) => number)) => void;
    confirmDeleteGroup: (group: GroupedSuratTugas) => void;
    setGroupToConfirmPrint: (data: { group: GroupedSuratTugas; index: number }) => void;
}

export default function SuratTugasTable({
    isLoading,
    currentData,
    groupedDataFiltered,
    currentPage,
    perPage,
    totalPages,
    setCurrentPage,
    confirmDeleteGroup,
    setGroupToConfirmPrint
}: SuratTugasTableProps) {
    const router = useRouter();

    const handleEdit = (group: GroupedSuratTugas) => {
        router.push(`/rekap-armada/surat-tugas/add?groupId=${encodeURIComponent(group.groupId)}`);
    };

    return (
        <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 sm:pt-2 rounded-b-xl">
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 overflow-x-auto">
                <Table className="table-fixed w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[3%] text-center">No.</TableHead>
                            <TableHead className="w-[28%]">Daftar Toko</TableHead>
                            <TableHead className="w-[10%]">No Armada</TableHead>
                            <TableHead className="w-[14%]">Nama Driver</TableHead>
                            <TableHead className="w-[10%]">Admin</TableHead>
                            <TableHead className="w-[6%]">DC</TableHead>
                            <TableHead className="w-[14%]">Tanggal Di Buat</TableHead>
                            <TableHead className="text-center w-[10%]">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-zinc-500 dark:text-zinc-400">Loading...</TableCell>
                            </TableRow>
                        ) : currentData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-zinc-500 dark:text-zinc-400">Belum ada data surat tugas.</TableCell>
                            </TableRow>
                        ) : (
                            currentData.map((group, index) => {
                                const globalIndex = (currentPage - 1) * perPage + index;
                                const reverseNumber = groupedDataFiltered.length - globalIndex;

                                return (
                                    <TableRow key={group.groupId}>
                                        <TableCell className="text-center font-medium align-middle">{reverseNumber}</TableCell>
                                        <TableCell className="font-medium align-middle">
                                            <ul className="list-disc pl-4 space-y-1">
                                                {group.items.map(toko => (
                                                    <li key={toko.id} className="truncate max-w-[220px]" title={toko.nama_toko}>{toko.nama_toko}</li>
                                                ))}
                                            </ul>
                                        </TableCell>
                                        <TableCell className="align-middle">{group.noArmada}</TableCell>
                                        <TableCell className="align-middle">{group.namaDriver}</TableCell>
                                        <TableCell className="align-middle">{group.admin}</TableCell>
                                        <TableCell className="align-middle font-semibold text-zinc-700 dark:text-zinc-300">{group.dc}</TableCell>
                                        <TableCell className="align-middle">
                                            {new Date(group.createdAt).toLocaleString('id-ID', {
                                                day: '2-digit', month: '2-digit', year: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            }).replace(',', '')}
                                        </TableCell>
                                        <TableCell className="align-middle">
                                            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
                                                <Button variant="outline" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:border-blue-300" onClick={() => handleEdit(group)} title="Edit">
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:border-red-300" onClick={() => confirmDeleteGroup(group)} title="Hapus">
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button variant="outline" size="icon" className="h-8 w-8 text-zinc-700 hover:text-zinc-900 dark:text-zinc-300" onClick={() => setGroupToConfirmPrint({ group, index: reverseNumber })} title="Print">
                                                    <Printer className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            {!isLoading && groupedDataFiltered.length > 0 && (
                <div className="mt-4 flex items-center justify-between px-2">
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        Showing {(currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, groupedDataFiltered.length)} of {groupedDataFiltered.length} entries
                    </span>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" className="h-8" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Prev</Button>
                        {Array.from({ length: totalPages }).map((_, idx) => {
                            const page = idx + 1;
                            if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                                return (
                                    <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" className="h-8 w-8 p-0" onClick={() => setCurrentPage(page)}>
                                        {page}
                                    </Button>
                                );
                            } else if (page === currentPage - 2 || page === currentPage + 2) {
                                return <span key={page} className="px-1 text-zinc-400">...</span>;
                            }
                            return null;
                        })}
                        <Button variant="outline" size="sm" className="h-8" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
                    </div>
                </div>
            )}
        </CardContent>
    );
}
