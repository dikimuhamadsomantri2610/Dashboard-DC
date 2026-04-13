"use client";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Save } from 'lucide-react';

interface PrintRegisterFilterProps {
    handleProses: (e: React.FormEvent) => void;
    tanggal: string;
    setTanggal: (val: string) => void;
    urutanTokoAwal: string;
    setUrutanTokoAwal: (val: string) => void;
    urutanTokoAkhir: string;
    setUrutanTokoAkhir: (val: string) => void;
    urutanJalurAwal: string;
    setUrutanJalurAwal: (val: string) => void;
    urutanJalurAkhir: string;
    setUrutanJalurAkhir: (val: string) => void;
    isProcessing: boolean;
}

export default function PrintRegisterFilter({
    handleProses,
    tanggal, setTanggal,
    urutanTokoAwal, setUrutanTokoAwal,
    urutanTokoAkhir, setUrutanTokoAkhir,
    urutanJalurAwal, setUrutanJalurAwal,
    urutanJalurAkhir, setUrutanJalurAkhir,
    isProcessing
}: PrintRegisterFilterProps) {
    return (
        <Card className="w-full lg:w-1/3 shrink-0 print:hidden h-fit">
            <CardHeader>
                <CardTitle>Filter Data Register</CardTitle>
                <CardDescription>Masukan parameter pencarian.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleProses} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tanggal</label>
                        <Input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium">Rentang Urutan Toko</label>
                        <div className="grid grid-cols-2 gap-4">
                            <Input type="number" min="1" max="999" value={urutanTokoAwal} onChange={(e) => setUrutanTokoAwal(e.target.value)} placeholder="Awal" required />
                            <Input type="number" min="1" max="999" value={urutanTokoAkhir} onChange={(e) => setUrutanTokoAkhir(e.target.value)} placeholder="Akhir" required />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium">Rentang Urutan Jalur</label>
                        <div className="grid grid-cols-2 gap-4">
                            <Input type="number" min="1" max="999" value={urutanJalurAwal} onChange={(e) => setUrutanJalurAwal(e.target.value)} placeholder="Awal" required />
                            <Input type="number" min="1" max="999" value={urutanJalurAkhir} onChange={(e) => setUrutanJalurAkhir(e.target.value)} placeholder="Akhir" required />
                        </div>
                    </div>

                    <Button type="submit" disabled={isProcessing} className="w-full gap-2 mt-4">
                        <Save className="w-4 h-4" />
                        {isProcessing ? 'Memproses...' : 'Proses'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
