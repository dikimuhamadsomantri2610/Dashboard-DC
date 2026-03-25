import ServerTimeBox from './ServerTimeBox';

interface IzinStepProps {
    serverTimeStr: string;
    isLoading: boolean;
    onSubmit: (jenis: string) => void;
}

export default function IzinStep({ serverTimeStr, isLoading, onSubmit }: IzinStepProps) {
    return (
        <div className="space-y">
            <ServerTimeBox serverTimeStr={serverTimeStr} />
            <div className="two-col">
                <button className="btn-primary" onClick={() => onSubmit('izin_keluar')} disabled={isLoading}>
                    {isLoading ? '...' : 'Izin Keluar'}
                </button>
                <button className="btn-primary" onClick={() => onSubmit('izin_masuk')} disabled={isLoading}>
                    {isLoading ? '...' : 'Izin Masuk'}
                </button>
            </div>
        </div>
    );
}
