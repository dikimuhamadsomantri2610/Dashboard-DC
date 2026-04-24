"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { type GembokFreshEntry } from '../types/surat-tugas-fresh-add.types';

const FieldLabel = ({ children, required = false }: { children: React.ReactNode; required?: boolean }) => (
    <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300">
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
    </label>
);

interface EntriesFormProps {
    entries: GembokFreshEntry[];
    addEntry: () => void;
    removeEntry: (index: number) => void;
    updateEntry: (index: number, field: keyof GembokFreshEntry, value: string) => void;
    tokoList?: { id: number; inisialToko: string; namaToko: string }[];
}

export function SuratTugasFreshAddEntriesForm({ entries, addEntry, removeEntry, updateEntry, tokoList = [] }: EntriesFormProps) {
    return (
        <Card>
            <CardHeader className="sticky top-0 sm:-top-6 z-20 bg-card/95 backdrop-blur border-b shadow-sm mb-4">
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
                                <FieldLabel required>Number Seal</FieldLabel>
                                <Input
                                    placeholder="Number Seal Hitam"
                                    value={entry.numberSeal}
                                    onChange={e => updateEntry(index, 'numberSeal', e.target.value)}
                                    disabled={index > 0}
                                />
                            </div>
                            <div className="space-y-2">
                                <FieldLabel required>Inisial Toko</FieldLabel>
                                <Input
                                    placeholder="Inisial toko"
                                    value={entry.inisialToko}
                                    onChange={e => updateEntry(index, 'inisialToko', e.target.value)}
                                    maxLength={3}
                                    list={`toko-list-${index}`}
                                />
                                <datalist id={`toko-list-${index}`}>
                                    {tokoList.map(toko => (
                                        <option key={toko.id} value={toko.inisialToko}>
                                            {toko.namaToko}
                                        </option>
                                    ))}
                                </datalist>
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
                                <FieldLabel>Jumlah Box</FieldLabel>
                                <Input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={entry.jumlahBox}
                                    onChange={e => updateEntry(index, 'jumlahBox', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <FieldLabel>Jumlah Dus</FieldLabel>
                                <Input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={entry.jumlahDus}
                                    onChange={e => updateEntry(index, 'jumlahDus', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <FieldLabel required>Kode Gembok</FieldLabel>
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
                        <p className="text-xs text-zinc-500">
                            * Wajib diisi: Number Seal, Inisial Toko, dan Kode Gembok.
                        </p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
