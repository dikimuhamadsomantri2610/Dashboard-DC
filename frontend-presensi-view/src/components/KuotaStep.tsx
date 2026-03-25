interface KuotaStepProps {
    jumlahJam: string;
    isLoading: boolean;
    onJumlahJamChange: (v: string) => void;
    onSubmit: (jenis: string, extra: Record<string, unknown>) => void;
}

export default function KuotaStep({ jumlahJam, isLoading, onJumlahJamChange, onSubmit }: KuotaStepProps) {
    return (
        <div className="space-y">
            <div>
                <label className="field-label">Jumlah Jam Kuota yang Diambil</label>
                <input
                    type="number"
                    min="1"
                    max="24"
                    className="input-field"
                    value={jumlahJam}
                    onChange={e => onJumlahJamChange(e.target.value)}
                    placeholder="Contoh: 2"
                />
            </div>
            <button
                className="btn-primary"
                style={{ marginTop: '0.5rem' }}
                onClick={() => onSubmit('ambil_kuota', { jumlahJam })}
                disabled={!jumlahJam || isLoading}
            >
                {isLoading ? 'Menyimpan...' : 'Simpan Kuota'}
            </button>
        </div>
    );
}
