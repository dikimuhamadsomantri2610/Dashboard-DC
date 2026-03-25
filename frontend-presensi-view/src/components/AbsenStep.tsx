import ServerTimeBox from './ServerTimeBox';

interface AbsenStepProps {
    serverTimeStr: string;
    isLoading: boolean;
    onSubmit: (jenis: string) => void;
}

export default function AbsenStep({ serverTimeStr, isLoading, onSubmit }: AbsenStepProps) {
    return (
        <div className="space-y">
            <ServerTimeBox serverTimeStr={serverTimeStr} />
            <div className="two-col">
                <button className="btn-primary" onClick={() => onSubmit('absen_datang')} disabled={isLoading}>
                    {isLoading ? '...' : '🟢 Masuk Kerja'}
                </button>
                <button className="btn-danger" onClick={() => onSubmit('absen_pulang')} disabled={isLoading}>
                    {isLoading ? '...' : '🔴 Pulang Kerja'}
                </button>
            </div>
        </div>
    );
}
