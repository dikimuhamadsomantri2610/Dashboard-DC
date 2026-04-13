"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function LabelPreprinted() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Label Preprinted</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Halaman untuk mengelola dan memantau Label Preprinted.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Data Label Preprinted</CardTitle>
                    <CardDescription>
                        Fitur ini sedang dalam tahap pengembangan.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                        <p className="text-zinc-500 dark:text-zinc-400">Content goes here...</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
