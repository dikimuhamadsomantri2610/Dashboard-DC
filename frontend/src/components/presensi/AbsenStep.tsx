import ServerTimeBox from './ServerTimeBox';

interface AbsenStepProps {
    serverTimeStr: string;
    isLoading: boolean;
    onSubmit: (jenis: string) => void;
}

export default function AbsenStep({ serverTimeStr, isLoading, onSubmit }: AbsenStepProps) {
    return (
        <div className="presensi-space-y">
            <ServerTimeBox serverTimeStr={serverTimeStr} />
            <div className="presensi-two-col">
                <button className="presensi-btn-primary" onClick={() => onSubmit('absen_datang')} disabled={isLoading}>
                    {isLoading ? '...' : '🟢 Masuk Kerja'}
                </button>
                <button className="presensi-btn-danger" onClick={() => onSubmit('absen_pulang')} disabled={isLoading}>
                    {isLoading ? '...' : '🔴 Pulang Kerja'}
                </button>
            </div>
        </div>
    );
}
