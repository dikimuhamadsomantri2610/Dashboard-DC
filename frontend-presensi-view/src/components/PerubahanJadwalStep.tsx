interface PerubahanJadwalStepProps {
    jamAwal: string;
    jamTujuan: string;
    isLoading: boolean;
    onJamAwalChange: (v: string) => void;
    onJamTujuanChange: (v: string) => void;
    onSubmit: (jenis: string, extra: Record<string, unknown>) => void;
}

export default function PerubahanJadwalStep({
    jamAwal, jamTujuan, isLoading,
    onJamAwalChange, onJamTujuanChange, onSubmit,
}: PerubahanJadwalStepProps) {
    return (
        <div className="space-y">
            <div>
                <label className="field-label">Jam Jadwal Saat Ini</label>
                <input type="time" className="input-field" value={jamAwal} onChange={e => onJamAwalChange(e.target.value)} />
            </div>
            <div>
                <label className="field-label">Jam Jadwal Tujuan</label>
                <input type="time" className="input-field" value={jamTujuan} onChange={e => onJamTujuanChange(e.target.value)} />
            </div>
            <button
                className="btn-primary"
                style={{ marginTop: '0.5rem' }}
                onClick={() => onSubmit('perubahan_jadwal', { jamAwal, jamTujuan })}
                disabled={!jamAwal || !jamTujuan || isLoading}
            >
                {isLoading ? 'Menyimpan...' : 'Ajukan Perubahan'}
            </button>
        </div>
    );
}
