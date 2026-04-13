"use client";
import { useDataUser } from './hooks/useDataUser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Plus, X, Pencil, Trash2, ShieldCheck } from 'lucide-react';



const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {children}
    </label>
);

export default function DataUser() {
    const {
        data,
        showForm,
        setShowForm,
        isLoading,
        editId,
        username,
        setUsername,
        password,
        setPassword,
        namaLengkap,
        setNamaLengkap,
        resetForm,
        handleEdit,
        handleRemove,
        handleSubmit
    } = useDataUser();

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 shadow-sm">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Data User</h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Kelola dan perbarui data pengguna aplikasi.</p>
                    </div>
                </div>
                <Button
                    onClick={() => setShowForm(prev => !prev)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    {showForm ? 'Tutup' : 'ADD'}
                </Button>
            </div>

            {/* Form Tambah/Edit User */}
            {showForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editId ? 'Edit Data User' : 'Tambah Data User'}</CardTitle>
                        <CardDescription>
                            {editId
                                ? 'Ubah informasi data pengguna di bawah ini. Kosongkan password jika tidak ingin diubah.'
                                : 'Isi form untuk menambahkan pengguna baru.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <FieldLabel>Username</FieldLabel>
                                    <Input
                                        placeholder="Contoh: joko123"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FieldLabel>Nama Lengkap</FieldLabel>
                                    <Input
                                        placeholder="Contoh: Joko Widodo"
                                        value={namaLengkap}
                                        onChange={e => setNamaLengkap(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FieldLabel>Password</FieldLabel>
                                    <Input
                                        type="password"
                                        placeholder={editId ? '(Biarkan kosong jika tetap)' : 'Masukkan password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required={!editId}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <Button type="button" variant="outline" onClick={resetForm}>
                                    Batal
                                </Button>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Menyimpan...' : (editId ? 'Update' : 'Simpan')}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Tabel List User */}
            <Card>
                <CardHeader>
                    <CardTitle>Daftar User</CardTitle>
                    <CardDescription>Data pengguna aplikasi yang telah terdaftar.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12 text-center">No</TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Nama Lengkap</TableHead>
                                <TableHead className="text-center w-28">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-zinc-500 dark:text-zinc-400">
                                        Belum ada data user.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center font-medium">{index + 1}</TableCell>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell className="font-medium">{item.username}</TableCell>
                                        <TableCell>{item.namaLengkap}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:border-blue-300 dark:hover:border-blue-700"
                                                    title="Edit"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:border-red-300 dark:hover:border-red-700"
                                                    onClick={() => handleRemove(item.id)}
                                                    title="Hapus"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}
