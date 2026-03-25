interface CutiStepProps {
    tanggalMulai: string;
    tanggalAkhir: string;
    isLoading: boolean;
    onTanggalMulaiChange: (v: string) => void;
    onTanggalAkhirChange: (v: string) => void;
    onSubmit: (jenis: string, extra: Record<string, unknown>) => void;
}

export default function CutiStep({
    tanggalMulai, tanggalAkhir, isLoading,
    onTanggalMulaiChange, onTanggalAkhirChange, onSubmit,
}: CutiStepProps) {
    return (
        <div className="space-y">
            <div>
                <label className="field-label">Tanggal Mulai Cuti</label>
                <input type="date" className="input-field" value={tanggalMulai} onChange={e => onTanggalMulaiChange(e.target.value)} />
            </div>
            <div>
                <label className="field-label">Tanggal Selesai Cuti</label>
                <input type="date" className="input-field" value={tanggalAkhir} onChange={e => onTanggalAkhirChange(e.target.value)} />
            </div>
            <button
                className="btn-primary"
                style={{ marginTop: '0.5rem' }}
                onClick={() => onSubmit('cuti', { tanggalMulai, tanggalAkhir })}
                disabled={!tanggalMulai || !tanggalAkhir || isLoading}
            >
                {isLoading ? 'Menyimpan...' : 'Ajukan Cuti'}
            </button>
        </div>
    );
}
