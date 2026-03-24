import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function ReportArmada() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate('/rekap-armada/surat-tugas')}
                    className="h-9 w-9"
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Report Armada</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Laporan data rekap armada kendaraan.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Laporan Armada</CardTitle>
                    <CardDescription>Data report armada akan ditampilkan di sini.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg border-zinc-200 dark:border-zinc-800">
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Fitur sedang dalam pengembangan.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
