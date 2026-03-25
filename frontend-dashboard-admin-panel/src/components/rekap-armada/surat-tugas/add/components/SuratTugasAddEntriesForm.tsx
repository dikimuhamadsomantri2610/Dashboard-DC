import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { type GembokEntry } from '../types/surat-tugas-add.types';

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300">
        {children}
    </label>
);

interface EntriesFormProps {
    entries: GembokEntry[];
    addEntry: () => void;
    removeEntry: (index: number) => void;
    updateEntry: (index: number, field: keyof GembokEntry, value: string) => void;
}

export function SuratTugasAddEntriesForm({ entries, addEntry, removeEntry, updateEntry }: EntriesFormProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Detail Muatan Armada</CardTitle>
                    <Button type="button" size="sm" onClick={addEntry} className="flex items-center gap-1">
                        <Plus className="h-4 w-4" />
                        Tambah Toko
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {entries.map((entry, index) => (
                    <div key={index} className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                                Toko Pengiriman ke- #{index + 1}
                            </span>
                            {entries.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeEntry(index)}
                                    className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <FieldLabel>Number Seal</FieldLabel>
                                <Input
                                    placeholder="Number Seal Hitam"
                                    value={entry.numberSeal}
                                    onChange={e => updateEntry(index, 'numberSeal', e.target.value)}
                                    disabled={index > 0}
                                />
                            </div>
                            <div className="space-y-2">
                                <FieldLabel>Load Number</FieldLabel>
                                <Input
                                    placeholder="Load number"
                                    value={entry.loadNumber}
                                    onChange={e => updateEntry(index, 'loadNumber', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <FieldLabel>Inisial Toko</FieldLabel>
                                <Input
                                    placeholder="Inisial toko"
                                    value={entry.inisialToko}
                                    onChange={e => updateEntry(index, 'inisialToko', e.target.value)}
                                    maxLength={3}
                                />
                            </div>
                            <div className="space-y-2">
                                <FieldLabel>Jumlah Container</FieldLabel>
                                <Input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={entry.jumlahContainer}
                                    onChange={e => updateEntry(index, 'jumlahContainer', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <FieldLabel>Jumlah Koli</FieldLabel>
                                <Input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={entry.jumlahKoli}
                                    onChange={e => updateEntry(index, 'jumlahKoli', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <FieldLabel>Materai</FieldLabel>
                                <select
                                    className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus-visible:ring-zinc-300"
                                    value={entry.materai}
                                    onChange={e => updateEntry(index, 'materai', e.target.value)}
                                >
                                    <option value="Tidak">Tidak</option>
                                    <option value="Iya">Iya</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <FieldLabel>Keterangan</FieldLabel>
                                <select
                                    className="flex h-9 w-full rounded-md border border-input bg-background dark:bg-zinc-950 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                    value={entry.keterangan}
                                    onChange={e => updateEntry(index, 'keterangan', e.target.value)}
                                >
                                    <option value="R" className="bg-background text-foreground">R</option>
                                    <option value="SR" className="bg-background text-foreground">SR</option>
                                    <option value="B" className="bg-background text-foreground">B</option>
                                    <option value="F" className="bg-background text-foreground">F</option>
                                    <option value="M" className="bg-background text-foreground">M</option>
                                    <option value="L" className="bg-background text-foreground">L</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <FieldLabel>Kode Gembok</FieldLabel>
                                <Input
                                    placeholder="Input Kode Gembok"
                                    value={entry.kodeGembok}
                                    onChange={e => {
                                        const numericValue = e.target.value.replace(/\D/g, '');
                                        updateEntry(index, 'kodeGembok', numericValue.substring(0, 4));
                                    }}
                                    maxLength={4}
                                    disabled={index > 0}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
