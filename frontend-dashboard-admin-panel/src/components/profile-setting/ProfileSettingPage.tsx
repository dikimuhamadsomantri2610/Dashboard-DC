"use client";
import { useRouter } from 'next/navigation';
import { useProfileSetting } from './hooks/useProfileSetting';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Lock, Save, ArrowLeft, UserCog } from 'lucide-react';

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
        {children}
    </label>
);

export default function ProfileSetting() {
    const router = useRouter();
    const {
        username,
        namaLengkap,
        setNamaLengkap,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        handleSubmit
    } = useProfileSetting();

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.back()}
                    className="h-9 w-9 shrink-0"
                    title="Kembali"
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400 shadow-sm shrink-0">
                    <UserCog className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Pengaturan Profil</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Atur informasi akun pribadi Anda di sini.</p>
                </div>
            </div>


            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        Informasi Personal
                    </CardTitle>
                    <CardDescription>
                        Perbarui nama tampilan dan password masuk Anda. Username tidak dapat diubah.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <FieldLabel>Username</FieldLabel>
                                <Input
                                    value={username}
                                    disabled
                                    className="bg-zinc-100 dark:bg-zinc-900 cursor-not-allowed text-zinc-500"
                                />
                                <p className="text-xs text-zinc-500 mt-1">Username digunakan untuk login dan tidak bisa diubah.</p>
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
                        </div>

                        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
                            <h3 className="font-semibold flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
                                <Lock className="h-4 w-4" />
                                Ganti Password
                            </h3>
                            <p className="text-sm text-zinc-500">Kosongkan kolom di bawah ini jika Anda tidak ingin mengubah password.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <FieldLabel>Password Baru</FieldLabel>
                                    <Input
                                        type="password"
                                        placeholder="Ketik password baru"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FieldLabel>Konfirmasi Password Baru</FieldLabel>
                                    <Input
                                        type="password"
                                        placeholder="Ketik ulang password baru"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        className={confirmPassword && password !== confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}
                                    />
                                    {confirmPassword && password !== confirmPassword && (
                                        <p className="text-xs text-red-500 mt-1">
                                            Password tidak sesuai.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button type="submit" disabled={isLoading} className="gap-2">
                                <Save className="h-4 w-4" />
                                {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
