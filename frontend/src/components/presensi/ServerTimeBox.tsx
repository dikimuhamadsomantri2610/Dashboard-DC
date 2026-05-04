interface ServerTimeBoxProps {
    serverTimeStr: string;
}

export default function ServerTimeBox({ serverTimeStr }: ServerTimeBoxProps) {
    return (
        <div className="presensi-server-time-box">
            <div className="presensi-server-time-label">Waktu Server (Read-only)</div>
            <div className="presensi-server-time-value">{serverTimeStr || 'Mengambil waktu...'}</div>
        </div>
    );
}
