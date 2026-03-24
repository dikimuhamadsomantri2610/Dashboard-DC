
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useSuratTugasAdd } from './hooks/useSuratTugasAdd';
import { SuratTugasAddVehicleForm } from './components/SuratTugasAddVehicleForm';
import { SuratTugasAddEntriesForm } from './components/SuratTugasAddEntriesForm';

export default function SuratTugasAddPage() {
    const {
        isEditMode, noMobil, dc, setDc, namaDriver, setNamaDriver, tanggalKirim, setTanggalKirim,
        entries, armadaList, isLoading, isFetchingEdit, handleNoMobilChange, 
        updateEntry, addEntry, removeEntry, handleSubmit, navigate
    } = useSuratTugasAdd();

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
                    onClick={() => navigate('/rekap-armada/surat-tugas')}
                    className="h-9 w-9"
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        {isEditMode ? 'Edit Surat Tugas Armada' : 'Surat Tugas Armada'}
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        {isEditMode ? 'Ubah data surat tugas armada kendaraan.' : 'Isi form surat tugas armada kendaraan.'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <SuratTugasAddVehicleForm
                    noMobil={noMobil} handleNoMobilChange={handleNoMobilChange}
                    armadaList={armadaList} dc={dc} setDc={setDc}
                    namaDriver={namaDriver} setNamaDriver={setNamaDriver}
                    tanggalKirim={tanggalKirim} setTanggalKirim={setTanggalKirim}
                />

                <SuratTugasAddEntriesForm
                    entries={entries} addEntry={addEntry} 
                    removeEntry={removeEntry} updateEntry={updateEntry}
                />

                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => navigate('/rekap-armada/surat-tugas')}>
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
