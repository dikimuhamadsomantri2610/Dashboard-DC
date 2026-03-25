import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, FileText, Activity, Users, Truck, ArrowUpRight } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Selamat Datang di Dashboard DC! 👋</h2>
                    <p className="text-blue-100 max-w-2xl">
                        PROSES DALAM PENGEMBANGAN By. Diki. Pantau ringkasan aktivitas, performa armada, dan data operasional harian Anda di sini.
                    </p>
                </div>
                {/* Decorative background elements */}
                <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute right-40 -bottom-20 h-40 w-40 rounded-full bg-blue-400/20 blur-2xl"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {/* Card 1 */}
                <Card className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 dark:hover:shadow-zinc-800/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Total Koli</CardTitle>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                            <Package className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <div className="flex items-center mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            <span>+20% dari bulan lalu</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 2 */}
                <Card className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 dark:hover:shadow-zinc-800/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Total Register</CardTitle>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
                            <FileText className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">856</div>
                        <div className="flex items-center mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            <span>+10% dari bulan lalu</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 3 */}
                <Card className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 dark:hover:shadow-zinc-800/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Karyawan Receiving</CardTitle>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
                            <Users className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45</div>
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Total Aktif</p>
                    </CardContent>
                </Card>

                {/* Card 4 */}
                <Card className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 dark:hover:shadow-zinc-800/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Karyawan Warehouse</CardTitle>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                            <Users className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">120</div>
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Total Aktif</p>
                    </CardContent>
                </Card>

                {/* Card 5 */}
                <Card className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 dark:hover:shadow-zinc-800/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Karyawan Dist. & Deliv.</CardTitle>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
                            <Users className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85</div>
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Total Aktif</p>
                    </CardContent>
                </Card>

                {/* Card 6 */}
                <Card className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 dark:hover:shadow-zinc-800/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Rekap Armada</CardTitle>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400">
                            <Truck className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">32</div>
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Armada Beroperasi</p>
                    </CardContent>
                </Card>

                {/* Card 7 */}
                <Card className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 dark:hover:shadow-zinc-800/50 md:col-span-2 lg:col-span-2 xl:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Aktivitas Sistem</CardTitle>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                            <Activity className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent className="h-full">
                        <div className="text-2xl font-bold mt-2">Status: Normal Aktif</div>
                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            Pusat Data Logistik berjalan dengan baik. Layanan backend dan frontend terhubung tanpa kendala, dan sinkronisasi server tercatat sinkron pada hari ini.
                        </p>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
