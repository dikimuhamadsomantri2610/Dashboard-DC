"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, X, Pencil, Trash2, CheckCircle2, Wrench, XCircle, Search } from 'lucide-react';
import { useUpdateArmada } from './hooks/useUpdateArmada';

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{children}</label>
);

const StatusBadge = ({ statusValue }: { statusValue: string }) => {
    const s = statusValue.toLowerCase();
    if (s === 'aktif') return <div className="flex items-center gap-1.5 text-green-600 dark:text-green-500 font-medium text-sm"><CheckCircle2 className="h-4 w-4" />Aktif</div>;
    if (s === 'repair') return <div className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-500 font-medium text-sm"><Wrench className="h-4 w-4" />Repair</div>;
    if (s === 'mati') return <div className="flex items-center gap-1.5 text-red-600 dark:text-red-500 font-medium text-sm"><XCircle className="h-4 w-4" />Mati</div>;
    return <span>{statusValue}</span>;
};

export default function UpdateArmadaPage() {
    const {
        data, showForm, setShowForm, isLoading, editId,
        noMobil, setNoMobil, jenisArmada, setJenisArmada,
        namaDriver, setNamaDriver, vendor, setVendor,
        inisialDc, setInisialDc, dcList, status, setStatus,
        resetForm, handleEdit, handleRemove, handleSubmit,
    } = useUpdateArmada();

    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-6">
            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400 shadow-sm">
                        <Wrench className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Update Armada</h2>
                        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">Kelola dan perbarui data armada / kendaraan.</p>
                    </div>
                </div>
                <Button
                    onClick={() => setShowForm(prev => !prev)}
                    className="flex items-center gap-2 self-start sm:self-auto"
                >
                    {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    {showForm ? 'Tutup' : 'ADD'}
                </Button>
            </div>

            {/* ── Form ── */}
            {showForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editId ? 'Edit Data Armada' : 'Tambah Data Armada'}</CardTitle>
                        <CardDescription>
                            {editId ? 'Ubah informasi kendaraan armada di bawah ini.' : 'Isi form untuk menambahkan armada baru.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <FieldLabel>No Armada</FieldLabel>
                                    <Input placeholder="Contoh: B 1234 XTZ" value={noMobil} onChange={e => setNoMobil(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <FieldLabel>Jenis Armada</FieldLabel>
                                    <Input placeholder="Contoh: ENGKEL" value={jenisArmada} onChange={e => setJenisArmada(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <FieldLabel>Nama Driver</FieldLabel>
                                    <Input placeholder="Contoh: ASEP YUWANA" value={namaDriver} onChange={e => setNamaDriver(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <FieldLabel>Vendor</FieldLabel>
                                    <Input placeholder="Contoh: Internal" value={vendor} onChange={e => setVendor(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <FieldLabel>Distribution Center (DC)</FieldLabel>
                                    <select
                                        className="flex h-9 w-full rounded-md border border-input bg-background dark:bg-zinc-950 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                        value={inisialDc}
                                        onChange={e => setInisialDc(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Pilih DC</option>
                                        {dcList.map(dc => (
                                            <option key={dc.id} value={dc.inisialDc}>{dc.namaDc} ({dc.inisialDc})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <FieldLabel>Status</FieldLabel>
                                    <select
                                        className="flex h-9 w-full rounded-md border border-input bg-background dark:bg-zinc-950 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                        value={status}
                                        onChange={e => setStatus(e.target.value)}
                                    >
                                        <option value="Aktif">Aktif</option>
                                        <option value="Repair">Repair</option>
                                        <option value="Mati">Mati</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
                                <Button type="button" variant="outline" onClick={resetForm} className="w-full sm:w-auto">Batal</Button>
                                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                                    {isLoading ? 'Menyimpan...' : (editId ? 'Update' : 'Simpan')}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* ── Table Card ── */}
            <Card>
                <CardHeader className="pt-4 pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                            <CardTitle>Daftar Armada</CardTitle>
                            <CardDescription>Data armada yang telah terdaftar.</CardDescription>
                        </div>
                    </div>
                    {/* Search */}
                    <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                        <div className="relative w-full sm:w-[260px]">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                            <Input
                                type="text"
                                placeholder="Cari armada, driver..."
                                className="h-9 pl-8 pr-8 w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                                    title="Hapus pencarian"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-3 pb-4 sm:px-6 sm:pb-6 pt-3 rounded-b-xl">
                    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 overflow-x-auto">
                        <Table className="min-w-[1000px] w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12 text-center">No</TableHead>
                                    <TableHead>No Armada</TableHead>
                                    <TableHead className="hidden sm:table-cell">Jenis</TableHead>
                                    <TableHead>Nama Driver</TableHead>
                                    <TableHead className="hidden md:table-cell">Vendor</TableHead>
                                    <TableHead>DC</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-center w-24">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(() => {
                                    const filtered = searchQuery.trim()
                                        ? data.filter(item => {
                                            const q = searchQuery.trim().toLowerCase();
                                            return (
                                                item.noMobil.toLowerCase().includes(q) ||
                                                item.jenisArmada.toLowerCase().includes(q) ||
                                                item.namaDriver.toLowerCase().includes(q) ||
                                                item.vendor.toLowerCase().includes(q) ||
                                                item.inisialDc.toLowerCase().includes(q)
                                            );
                                        })
                                        : data;
                                    if (filtered.length === 0) return (
                                        <TableRow>
                                            <TableCell colSpan={8} className="text-center py-8 text-zinc-500 dark:text-zinc-400">
                                                {searchQuery ? 'Tidak ada data yang cocok.' : 'Belum ada data armada.'}
                                            </TableCell>
                                        </TableRow>
                                    );
                                    return filtered.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="text-center font-medium">{index + 1}</TableCell>
                                            <TableCell className="font-medium whitespace-nowrap">{item.noMobil}</TableCell>
                                            <TableCell className="hidden sm:table-cell">{item.jenisArmada}</TableCell>
                                            <TableCell>{item.namaDriver}</TableCell>
                                            <TableCell className="hidden md:table-cell">{item.vendor}</TableCell>
                                            <TableCell className="font-semibold text-zinc-700 dark:text-zinc-300">{item.inisialDc}</TableCell>
                                            <TableCell><StatusBadge statusValue={item.status} /></TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button variant="outline" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:border-blue-300 dark:hover:border-blue-700" title="Edit" onClick={() => handleEdit(item)}>
                                                        <Pencil className="h-3.5 w-3.5" />
                                                    </Button>
                                                    <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:border-red-300 dark:hover:border-red-700" onClick={() => handleRemove(item.id)} title="Hapus">
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ));
                                })()}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
