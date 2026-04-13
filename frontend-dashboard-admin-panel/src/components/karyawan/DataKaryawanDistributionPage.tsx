"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Download, Pencil, Trash2, X, Truck } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useKaryawan } from '@/context/KaryawanContext';

const DIVISI_OPTIONS = [
    'Admin Distribution',
    'Staff Distribution',
    'Checker Distribution',
    'Helper Distribution',
];

const DIVISI_FILTER = new Set(DIVISI_OPTIONS);

export default function DataKaryawanDistribution() {
    const { karyawan, addKaryawan, deleteKaryawan } = useKaryawan();
    const data = karyawan.filter((k) => DIVISI_FILTER.has(k.divisi));

    const [perPage, setPerPage] = useState(20);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ nama: '', nik: '', divisi: '' });
    const [formError, setFormError] = useState('');

    const handleExportExcel = () => {
        if (data.length === 0) return;
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Karyawan Distribution");
        XLSX.writeFile(wb, `Data_Karyawan_Distribution_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const handleOpenModal = () => {
        setForm({ nama: '', nik: '', divisi: '' });
        setFormError('');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormError('');
    };

    const handleSubmit = async () => {
        if (!form.nama.trim() || !form.nik.trim() || !form.divisi) {
            setFormError('Semua field harus diisi.');
            return;
        }
        try {
            await addKaryawan({ nik: form.nik.trim(), nama: form.nama.trim(), divisi: form.divisi });
            setShowModal(false);
        } catch (err: any) {
            const msg = err?.response?.data?.error || 'Gagal menyimpan data.';
            setFormError(msg);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 shadow-sm">
                        <Truck className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Data Karyawan Distribution & Delivery</h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Kelola data karyawan untuk bagian Distribution dan Delivery.</p>
                    </div>
                </div>
                <Button
                    onClick={handleOpenModal}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    <Plus className="h-4 w-4" />
                    ADD
                </Button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="relative w-full max-w-md rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-2xl p-6">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <h3 className="text-lg font-semibold mb-5">Tambah Karyawan Distribution</h3>
                        <div className="space-y-4">
                            {/* Nama */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Nama</label>
                                <input
                                    type="text"
                                    placeholder="Masukkan nama"
                                    value={form.nama}
                                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                                    className="h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-zinc-300 dark:text-white"
                                />
                            </div>
                            {/* NIK */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">NIK</label>
                                <input
                                    type="text"
                                    placeholder="Masukkan NIK"
                                    value={form.nik}
                                    onChange={(e) => setForm({ ...form, nik: e.target.value })}
                                    className="h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-zinc-300 dark:text-white"
                                />
                            </div>
                            {/* Divisi */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Divisi</label>
                                <select
                                    value={form.divisi}
                                    onChange={(e) => setForm({ ...form, divisi: e.target.value })}
                                    className="h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-zinc-300 dark:text-white"
                                >
                                    <option value="">-- Pilih Divisi --</option>
                                    {DIVISI_OPTIONS.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                            {formError && <p className="text-sm text-red-500">{formError}</p>}
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <Button variant="outline" onClick={handleCloseModal}>Batal</Button>
                            <Button
                                onClick={handleSubmit}
                                className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-lime-500 dark:hover:bg-lime-600"
                            >
                                Simpan
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <Card>
                <CardHeader className="pt-4 pb-2 sm:pb-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                variant="outline"
                                onClick={handleExportExcel}
                                className="flex items-center gap-2 h-9"
                            >
                                <Download className="h-4 w-4" />
                                Export Excel
                            </Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Show:</span>
                            <select
                                className="h-9 rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 dark:border-zinc-800 dark:focus-visible:ring-zinc-300"
                                value={perPage}
                                onChange={(e) => setPerPage(Number(e.target.value))}
                            >
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 sm:pt-2 rounded-b-xl">
                    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">NIK</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Divisi</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.slice(0, perPage).map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.nik}</TableCell>
                                        <TableCell>{item.nama}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{item.divisi}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="outline" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:border-blue-300">
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:border-red-300"
                                                    onClick={() => deleteKaryawan(item.id)}
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8 text-zinc-500">
                                            Belum ada data.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
