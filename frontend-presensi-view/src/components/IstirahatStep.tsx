import ServerTimeBox from './ServerTimeBox';

interface IstirahatStepProps {
    serverTimeStr: string;
    isLoading: boolean;
    onSubmit: (jenis: string) => void;
}

export default function IstirahatStep({ serverTimeStr, isLoading, onSubmit }: IstirahatStepProps) {
    return (
        <div className="space-y">
            <ServerTimeBox serverTimeStr={serverTimeStr} />
            <div className="two-col">
                <button className="btn-primary" onClick={() => onSubmit('istirahat_keluar')} disabled={isLoading}>
                    {isLoading ? '...' : 'Keluar Istirahat'}
                </button>
                <button className="btn-primary" onClick={() => onSubmit('istirahat_masuk')} disabled={isLoading}>
                    {isLoading ? '...' : 'Masuk Istirahat'}
                </button>
            </div>
        </div>
    );
}
