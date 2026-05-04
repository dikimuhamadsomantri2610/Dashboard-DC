import React from 'react';

interface NikStepProps {
    nik: string;
    isLoading: boolean;
    onNikChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export default function NikStep({ nik, isLoading, onNikChange, onSubmit }: NikStepProps) {
    return (
        <form onSubmit={onSubmit} className="presensi-space-y">
            <div>
                <label className="presensi-field-label" htmlFor="nik-input">NIK Karyawan</label>
                <input
                    id="nik-input"
                    className="presensi-input-field"
                    placeholder="Masukkan NIK"
                    value={nik}
                    onChange={e => onNikChange(e.target.value)}
                    autoFocus
                    required
                    style={{ textAlign: 'center', fontSize: '1.125rem', fontWeight: 700, letterSpacing: '0.1em' }}
                />
            </div>
            <button type="submit" className="presensi-btn-primary" style={{ marginTop: '1rem' }} disabled={isLoading}>
                {isLoading ? 'Memeriksa...' : 'Lanjut →'}
            </button>
        </form>
    );
}
