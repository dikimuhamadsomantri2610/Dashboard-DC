"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, X, Pencil, Trash2, Store } from 'lucide-react';
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

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400 shadow-sm">
                        <Store className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Update Toko</h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Kelola dan perbarui data toko armada.</p>
                    </div>
                </div>
                <Button onClick={() => setShowForm(prev => !prev)} className="flex items-center gap-2">
                    {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    {showForm ? 'Tutup' : 'ADD'}
                </Button>
            </div>

            {showForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editId ? 'Edit Data Toko' : 'Tambah Data Toko'}</CardTitle>
                        <CardDescription>{editId ? 'Ubah informasi data toko armada di bawah ini.' : 'Isi form untuk menambahkan toko baru.'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-2"><FieldLabel>Site</FieldLabel><Input placeholder="Contoh: 48502" value={site} onChange={e => setSite(e.target.value)} required /></div>
                                <div className="space-y-2"><FieldLabel>Inisial Toko</FieldLabel><Input placeholder="Contoh: AAC" value={inisial} onChange={e => setInisial(e.target.value)} required /></div>
                                <div className="space-y-2"><FieldLabel>Nama Toko</FieldLabel><Input placeholder="Contoh: ALUN ALUN CIWIDEY" value={namaToko} onChange={e => setNamaToko(e.target.value)} required /></div>
                                <div className="space-y-2 lg:col-span-3"><FieldLabel>Alamat Toko</FieldLabel><Input placeholder="Alamat lengkap toko" value={alamatToko} onChange={e => setAlamatToko(e.target.value)} /></div>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <Button type="button" variant="outline" onClick={resetForm}>Batal</Button>
                                <Button type="submit" disabled={isLoading}>{isLoading ? 'Menyimpan...' : (editId ? 'Update' : 'Simpan')}</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader className="pt-4 pb-2 sm:pb-4">
                    <CardTitle>Daftar Toko</CardTitle>
                    <CardDescription>Data toko yang telah terdaftar.</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 sm:pt-2 rounded-b-xl">
                    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12 text-center">No</TableHead>
                                    <TableHead>Site</TableHead>
                                    <TableHead>Inisial Toko</TableHead>
                                    <TableHead>Nama Toko</TableHead>
                                    <TableHead>Alamat Toko</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead className="text-center w-28">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.length === 0 ? (
                                    <TableRow><TableCell colSpan={7} className="text-center py-8 text-zinc-500 dark:text-zinc-400">Belum ada data toko.</TableCell></TableRow>
                                ) : data.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center font-medium">{index + 1}</TableCell>
                                        <TableCell>{item.site}</TableCell>
                                        <TableCell className="font-medium">{item.inisialToko}</TableCell>
                                        <TableCell>{item.namaToko}</TableCell>
                                        <TableCell className="truncate max-w-[200px]" title={item.alamatToko}>{item.alamatToko}</TableCell>
                                        <TableCell>{item.createdAt}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center gap-2">
                                                <Button variant="outline" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:border-blue-300 dark:hover:border-blue-700" title="Edit" onClick={() => handleEdit(item)}><Pencil className="h-3.5 w-3.5" /></Button>
                                                <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:border-red-300 dark:hover:border-red-700" onClick={() => handleRemove(item.id)} title="Hapus"><Trash2 className="h-3.5 w-3.5" /></Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
