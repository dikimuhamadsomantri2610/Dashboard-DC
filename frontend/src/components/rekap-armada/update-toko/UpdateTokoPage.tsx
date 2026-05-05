"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, X, Pencil, Trash2, Store, Search } from 'lucide-react';
import { useUpdateToko } from './hooks/useUpdateToko';

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{children}</label>
);

export default function UpdateTokoPage() {
    const {
        data, showForm, setShowForm, isLoading, editId,
        site, setSite, inisial, setInisial,
        namaToko, setNamaToko, alamatToko, setAlamatToko,
        resetForm, handleEdit, handleRemove, handleSubmit,
    } = useUpdateToko();

    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-6">
            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400 shadow-sm">
                        <Store className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Update Toko</h2>
                        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">Kelola dan perbarui data toko armada.</p>
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
                        <CardTitle>{editId ? 'Edit Data Toko' : 'Tambah Data Toko'}</CardTitle>
                        <CardDescription>
                            {editId ? 'Ubah informasi data toko armada di bawah ini.' : 'Isi form untuk menambahkan toko baru.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <FieldLabel>Site</FieldLabel>
                                    <Input placeholder="Contoh: 48502" value={site} onChange={e => setSite(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <FieldLabel>Inisial Toko</FieldLabel>
                                    <Input placeholder="Contoh: AAC" value={inisial} onChange={e => setInisial(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <FieldLabel>Nama Toko</FieldLabel>
                                    <Input placeholder="Contoh: ALUN ALUN CIWIDEY" value={namaToko} onChange={e => setNamaToko(e.target.value)} required />
                                </div>
                                <div className="space-y-2 sm:col-span-2 lg:col-span-3">
                                    <FieldLabel>Alamat Toko</FieldLabel>
                                    <Input placeholder="Alamat lengkap toko" value={alamatToko} onChange={e => setAlamatToko(e.target.value)} />
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
                            <CardTitle>Daftar Toko</CardTitle>
                            <CardDescription>Data toko yang telah terdaftar.</CardDescription>
                        </div>
                    </div>
                    {/* Search */}
                    <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                        <div className="relative w-full sm:w-[260px]">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                            <Input
                                type="text"
                                placeholder="Cari toko, site, inisial..."
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
                                    <TableHead>Site</TableHead>
                                    <TableHead>Inisial Toko</TableHead>
                                    <TableHead>Nama Toko</TableHead>
                                    <TableHead className="hidden md:table-cell">Alamat Toko</TableHead>
                                    <TableHead className="hidden sm:table-cell">Created At</TableHead>
                                    <TableHead className="text-center w-24">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(() => {
                                    const filtered = searchQuery.trim()
                                        ? data.filter(item => {
                                            const q = searchQuery.trim().toLowerCase();
                                            return (
                                                item.site.toLowerCase().includes(q) ||
                                                item.inisialToko.toLowerCase().includes(q) ||
                                                item.namaToko.toLowerCase().includes(q) ||
                                                (item.alamatToko && item.alamatToko.toLowerCase().includes(q))
                                            );
                                        })
                                        : data;
                                    if (filtered.length === 0) return (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-zinc-500 dark:text-zinc-400">
                                                {searchQuery ? 'Tidak ada data yang cocok.' : 'Belum ada data toko.'}
                                            </TableCell>
                                        </TableRow>
                                    );
                                    return filtered.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="text-center font-medium">{index + 1}</TableCell>
                                            <TableCell>{item.site}</TableCell>
                                            <TableCell className="font-medium">{item.inisialToko}</TableCell>
                                            <TableCell>{item.namaToko}</TableCell>
                                            <TableCell className="hidden md:table-cell truncate max-w-[200px]" title={item.alamatToko}>{item.alamatToko}</TableCell>
                                            <TableCell className="hidden sm:table-cell">{item.createdAt}</TableCell>
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
