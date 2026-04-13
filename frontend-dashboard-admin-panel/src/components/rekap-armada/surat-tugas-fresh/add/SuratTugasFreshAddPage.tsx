"use client";

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useSuratTugasFreshAdd } from './hooks/useSuratTugasFreshAdd';
import { SuratTugasFreshAddVehicleForm } from './components/SuratTugasFreshAddVehicleForm';
import { SuratTugasFreshAddEntriesForm } from './components/SuratTugasFreshAddEntriesForm';

export default function SuratTugasFreshAddPage() {
    const {
        isEditMode, noMobil, dc, setDc, dcList, namaDriver, setNamaDriver, tanggalKirim, setTanggalKirim,
        entries, armadaList, tokoList, isLoading, isFetchingEdit, handleNoMobilChange,
        updateEntry, addEntry, removeEntry, handleSubmit, router
    } = useSuratTugasFreshAdd();

    if (isFetchingEdit) {
        return (
            <div className="flex items-center justify-center h-48">
                <p className="text-zinc-500 dark:text-zinc-400 text-sm animate-pulse">Memuat data untuk diedit...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.push('/rekap-armada/surat-tugas-fresh')}
                    className="h-9 w-9"
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        {isEditMode ? 'Edit Surat Tugas Fresh Armada' : 'Surat Tugas Fresh Armada'}
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        {isEditMode ? 'Ubah data surat tugas fresh armada kendaraan.' : 'Isi form surat tugas fresh armada kendaraan.'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <SuratTugasFreshAddVehicleForm
                    noMobil={noMobil} handleNoMobilChange={handleNoMobilChange}
                    armadaList={armadaList} dc={dc} setDc={setDc} dcList={dcList}
                    namaDriver={namaDriver} setNamaDriver={setNamaDriver}
                    tanggalKirim={tanggalKirim} setTanggalKirim={setTanggalKirim}
                />

                <SuratTugasFreshAddEntriesForm
                    entries={entries} addEntry={addEntry}
                    removeEntry={removeEntry} updateEntry={updateEntry}
                    tokoList={tokoList}
                />

                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => router.push('/rekap-armada/surat-tugas-fresh')}>
                        Batal
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading
                            ? (isEditMode ? 'Memperbarui...' : 'Menyimpan...')
                            : (isEditMode ? 'Perbarui Data' : 'Simpan Data')
                        }
                    </Button>
                </div>
            </form>
        </div>
    );
}
