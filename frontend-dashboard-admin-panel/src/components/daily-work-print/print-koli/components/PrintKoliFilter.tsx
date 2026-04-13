"use client";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Save } from 'lucide-react';

interface PrintKoliFilterProps {
    handleProses: (e: React.FormEvent) => void;
    tanggal: string;
    setTanggal: (val: string) => void;
    urutanAwal: string;
    setUrutanAwal: (val: string) => void;
    urutanAkhir: string;
    setUrutanAkhir: (val: string) => void;
    isProcessing: boolean;
}

export default function PrintKoliFilter({
    handleProses,
    tanggal, setTanggal,
    urutanAwal, setUrutanAwal,
    urutanAkhir, setUrutanAkhir,
    isProcessing
}: PrintKoliFilterProps) {
    return (
        <Card className="w-full lg:w-1/3 shrink-0 print:hidden h-fit">
            <CardHeader>
                <CardTitle>Filter Data Koli</CardTitle>
                <CardDescription>Masukan parameter untuk di proses.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleProses} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tanggal</label>
                        <Input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Toko Awal</label>
                            <Input type="number" min="1" max="999" value={urutanAwal} onChange={(e) => setUrutanAwal(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Toko Akhir</label>
                            <Input type="number" min="1" max="999" value={urutanAkhir} onChange={(e) => setUrutanAkhir(e.target.value)} required />
                        </div>
                    </div>
                    <Button type="submit" disabled={isProcessing} className="w-full gap-2">
                        <Save className="w-4 h-4" />
                        {isProcessing ? 'Memproses...' : 'Proses'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
