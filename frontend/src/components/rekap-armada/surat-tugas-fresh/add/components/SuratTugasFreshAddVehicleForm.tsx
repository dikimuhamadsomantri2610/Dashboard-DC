import React from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300">
        {children}
    </label>
);

interface VehicleFormProps {
    noMobil: string;
    handleNoMobilChange: (val: string) => void;
    armadaList: any[];
    dc: string;
    setDc: (val: string) => void;
    namaDriver: string;
    setNamaDriver: (val: string) => void;
    tanggalKirim: string;
    setTanggalKirim: (val: string) => void;
}

export function SuratTugasFreshAddVehicleForm({
    noMobil, handleNoMobilChange, armadaList, dc, setDc,
    namaDriver, setNamaDriver, tanggalKirim, setTanggalKirim
}: VehicleFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Informasi Kendaraan</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <FieldLabel>No Armada</FieldLabel>
                    <Input
                        list="armada-suggestions"
                        placeholder="Contoh: B 1234 XYZ (Ketik/Pilih navigasi)"
                        value={noMobil}
                        onChange={e => handleNoMobilChange(e.target.value)}
                        required
                    />
                    <datalist id="armada-suggestions">
                        {armadaList.map((a: any) => (
                            <option key={a.id} value={a.no_armada} />
                        ))}
                    </datalist>
                </div>
                <div className="space-y-2">
                    <FieldLabel>DC</FieldLabel>
                    <select
                        className="flex h-9 w-full rounded-md border border-input bg-background dark:bg-zinc-950 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                        value={dc}
                        onChange={e => setDc(e.target.value)}
                    >
                        <option value="DC FRESH" className="bg-background text-foreground">DC FRESH</option>
                        <option value="DC GBG" className="bg-background text-foreground">DC GBG</option>
                        <option value="DC D53" className="bg-background text-foreground">DC D53</option>
                        <option value="DC DRE" className="bg-background text-foreground">DC DRE</option>
                        <option value="DC DMR" className="bg-background text-foreground">DC DMR</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <FieldLabel>Nama Driver</FieldLabel>
                    <Input
                        placeholder="Nama lengkap driver"
                        value={namaDriver}
                        onChange={e => setNamaDriver(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <FieldLabel>Tanggal Kirim</FieldLabel>
                    <Input
                        type="date"
                        value={tanggalKirim}
                        onChange={e => setTanggalKirim(e.target.value)}
                        required
                    />
                </div>
            </CardContent>
        </Card>
    );
}
