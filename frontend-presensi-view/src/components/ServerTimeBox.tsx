interface ServerTimeBoxProps {
    serverTimeStr: string;
}

export default function ServerTimeBox({ serverTimeStr }: ServerTimeBoxProps) {
    return (
        <div className="server-time-box">
            <div className="server-time-label">Waktu Server (Read-only)</div>
            <div className="server-time-value">{serverTimeStr || 'Mengambil waktu...'}</div>
        </div>
    );
}
