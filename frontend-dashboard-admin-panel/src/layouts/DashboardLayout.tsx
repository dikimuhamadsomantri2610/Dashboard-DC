"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/components/common/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { KaryawanProvider } from '@/context/KaryawanContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AutoLogout from '@/components/common/AutoLogout';
import {
    LayoutDashboard, Printer, FileText, LogOut, Menu,
    Moon, Sun, Users, Truck, ChevronRight, ChevronDown,
    BarChart2, FileSignature, Store, Wrench, ClipboardCheck,
    CalendarDays, CalendarRange, Tags, MapPin, Box, Hash,
    Snowflake
} from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

// ─── Tipe navigasi ──────────────────────────────────────────────────────────
interface NavChild {
    name: string;
    href: string;
    icon: React.ElementType;
    iconColor?: string;
}
interface NavItem {
    name: string;
    href: string;
    icon: React.ElementType;
    iconColor?: string;
    children?: NavChild[];
}

// ─── Daftar menu ────────────────────────────────────────────────────────────
const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard, iconColor: 'text-blue-500 dark:text-blue-400' },
    {
        name: 'Daily Work Print',
        href: '#',
        icon: Printer,
        iconColor: 'text-violet-500 dark:text-violet-400',
        children: [
            { name: 'Print Koli', href: '/daily-work-print/print-koli', icon: Printer, iconColor: 'text-violet-500 dark:text-violet-400' },
            { name: 'Print Register', href: '/daily-work-print/print-register', icon: FileText, iconColor: 'text-violet-400 dark:text-violet-300' },
        ],
    },
    {
        name: 'Rekap Armada',
        href: '#',
        icon: Truck,
        iconColor: 'text-amber-500 dark:text-amber-400',
        children: [
            { name: 'Surat Tugas', href: '/rekap-armada/surat-tugas', icon: FileSignature, iconColor: 'text-amber-500 dark:text-amber-400' },
            { name: 'Surat Tugas Fresh', href: '/rekap-armada/surat-tugas-fresh', icon: Snowflake, iconColor: 'text-amber-400 dark:text-blue-300' },
            { name: 'Update Toko', href: '/rekap-armada/update-toko', icon: Store, iconColor: 'text-orange-500 dark:text-orange-400' },
            { name: 'Update Armada', href: '/rekap-armada/update-armada', icon: Wrench, iconColor: 'text-orange-400 dark:text-orange-300' },
            { name: 'Report', href: '/rekap-armada/report', icon: BarChart2, iconColor: 'text-yellow-500 dark:text-yellow-400' },
        ],
    },
    {
        name: 'Presensi',
        href: '#',
        icon: ClipboardCheck,
        iconColor: 'text-emerald-500 dark:text-emerald-400',
        children: [
            { name: 'Report Presensi Kehadiran Karyawan', href: '/presensi/report', icon: FileText, iconColor: 'text-emerald-500 dark:text-emerald-400' },
            { name: 'Perubahan Jadwal', href: '/presensi/perubahan-jadwal', icon: CalendarDays, iconColor: 'text-emerald-400 dark:text-emerald-300' },
            { name: 'Kuota Jam Lebih', href: '/presensi/kuota-jam-lebih', icon: CalendarDays, iconColor: 'text-teal-500 dark:text-teal-400' },
            { name: 'Izin Keluar Jam Kerja', href: '/presensi/izin-keluar', icon: CalendarDays, iconColor: 'text-teal-400 dark:text-teal-300' },
            { name: 'Cuti/Izin', href: '/presensi/cuti-izin', icon: CalendarRange, iconColor: 'text-green-500 dark:text-green-400' },
        ],
    },
    {
        name: 'Labeling',
        href: '#',
        icon: Tags,
        iconColor: 'text-rose-500 dark:text-rose-400',
        children: [
            { name: 'Label Lokasi Permanent', href: '/label/lokasi-permanent', icon: MapPin, iconColor: 'text-rose-500 dark:text-rose-400' },
            { name: 'Label After Pick', href: '/label/after-pick', icon: Box, iconColor: 'text-pink-500 dark:text-pink-400' },
            { name: 'Label After Pick Fresh', href: '/label/after-pick-fresh', icon: Box, iconColor: 'text-pink-400 dark:text-pink-300' },
            { name: 'Label Preprinted', href: '/label/preprinted', icon: Hash, iconColor: 'text-rose-400 dark:text-rose-300' },
        ],
    },
    {
        name: 'List Karyawan',
        href: '#',
        icon: Users,
        iconColor: 'text-sky-500 dark:text-sky-400',
        children: [
            { name: 'Receiving & Return', href: '/data-karyawan-receiving', icon: Users, iconColor: 'text-sky-500 dark:text-sky-400' },
            { name: 'Warehouse', href: '/data-karyawan-warehouse', icon: Users, iconColor: 'text-cyan-500 dark:text-cyan-400' },
            { name: 'Distribution & Delivery', href: '/data-karyawan-distribution', icon: Users, iconColor: 'text-blue-500 dark:text-blue-400' },
        ],
    },
];


// ─── NavLinks ────────────────────────────────────────────────────────────────
const NavLinks = ({ onClick, isSidebarOpen = true }: { onClick?: () => void; isSidebarOpen?: boolean }) => {
    const pathname = usePathname() || '/';
    const location = { pathname };

    // State collapsible per item yang punya children
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

    const toggleMenu = (name: string) => {
        setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const linkClass = (active: boolean) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors overflow-hidden ${active
            ? 'bg-primary/10 text-primary dark:bg-primary/20'
            : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-800/50'
        }`;

    return (
        <div className="space-y-1">
            {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href ||
                    item.children?.some(c => location.pathname === c.href);
                const isOpen = openMenus[item.name] ?? false;

                // Item dengan submenu
                if (item.children && item.children.length > 0) {
                    return (
                        <div key={item.name}>
                            <div
                                className={linkClass(!!isActive)}
                                style={{ cursor: 'pointer' }}
                                onClick={() => toggleMenu(item.name)}
                            >
                                <Icon className={`h-5 w-5 shrink-0 ${item.iconColor ?? ''}`} />
                                {isSidebarOpen && <span className="truncate flex-1">{item.name}</span>}
                                {isSidebarOpen && (
                                    isOpen
                                        ? <ChevronDown className="h-4 w-4 shrink-0" />
                                        : <ChevronRight className="h-4 w-4 shrink-0" />
                                )}
                            </div>

                            {isSidebarOpen && isOpen && (
                                <div className="ml-4 mt-1 space-y-1 border-l border-zinc-200 dark:border-zinc-700 pl-3">
                                    {item.children.map((child) => {
                                        const ChildIcon = child.icon;
                                        const childActive = location.pathname === child.href;
                                        return (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                onClick={onClick}
                                                className={linkClass(childActive)}
                                            >
                                                <ChildIcon className={`h-4 w-4 shrink-0 ${child.iconColor ?? ''}`} />
                                                <span className="truncate">{child.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                }

                // Item biasa (tanpa submenu)
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={onClick}
                        className={linkClass(location.pathname === item.href)}
                        title={!isSidebarOpen ? item.name : undefined}
                    >
                        <Icon className={`h-5 w-5 shrink-0 ${item.iconColor ?? ''}`} />
                        {isSidebarOpen && <span className="truncate">{item.name}</span>}
                    </Link>
                );
            })}
        </div>
    );
};

// ─── DashboardLayout ─────────────────────────────────────────────────────────
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { logout, user } = useAuth();
    const { theme, setTheme } = useTheme();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    let initials = 'AD';
    if (user?.username) {
        const name = user.username;
        initials = name.length >= 3 ? name[0] + name[2] : name.substring(0, 2);
        initials = initials.toUpperCase();
    }

    return (
        <KaryawanProvider>
        <div className="flex h-screen overflow-hidden bg-zinc-100 dark:bg-background">
            <AutoLogout />
            {/* Desktop Sidebar */}
            <aside
                className={`hidden print:hidden border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 md:flex md:flex-col h-full overflow-y-auto shrink-0 transition-[width] duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'}`}
            >
                <div className={`flex h-16 items-center border-b border-zinc-200 dark:border-zinc-800 font-semibold text-lg tracking-tight overflow-hidden ${isSidebarOpen ? 'justify-between px-4' : 'justify-center w-full'}`}>
                    <div className="flex items-center justify-center">
                        <span className="flex items-center justify-center font-bold truncate">
                            {isSidebarOpen
                                ? (<><img src="/logo_yomart.svg" alt="logo" className="h-5 w-5 mr-2" />ADMIN PANEL</>)
                                : (<img src="/logo_yomart.svg" alt="logo" className="h-6 w-6" />)}
                        </span>
                    </div>
                    {isSidebarOpen && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => setIsSidebarOpen(false)}>
                            <Menu className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                <div className="flex-1 overflow-auto py-4 px-3">
                    <NavLinks isSidebarOpen={isSidebarOpen} />
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col">
                {/* Top Navbar */}
                <header className="sticky top-0 z-999 flex h-16 items-center gap-4 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-md px-4 sm:px-6 print:hidden">
                    <div className="flex items-center gap-2">
                        {/* Mobile Menu Trigger */}
                        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="md:hidden shrink-0 print:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col w-64 p-0">
                                <VisuallyHidden>
                                    <SheetTitle>Menu Bar</SheetTitle>
                                    <SheetDescription>Dashboard DC Navigation</SheetDescription>
                                </VisuallyHidden>
                                <div className="flex h-16 items-center border-b border-zinc-200 dark:border-zinc-800 px-4 font-semibold text-lg">
                                    <img src="/logo_yomart.svg" alt="logo" className="h-5 w-5 inline-block mr-2" />Dashboard DC
                                </div>
                                <div className="flex-1 overflow-auto py-4 px-3">
                                    <NavLinks onClick={() => setIsMobileOpen(false)} />
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Desktop Sidebar Open Trigger */}
                        {!isSidebarOpen && (
                            <Button
                                variant="outline"
                                size="icon"
                                className="hidden md:flex shrink-0 print:hidden"
                                onClick={() => setIsSidebarOpen(true)}
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Open sidebar</span>
                            </Button>
                        )}
                    </div>

                    <div className="w-full flex-1" />

                    <div className="flex items-center gap-4 shrink-0 print:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            <span className="sr-only">Toggle theme</span>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-primary/20 transition-all hover:ring-primary">
                                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium uppercase">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64 p-2">
                                <DropdownMenuLabel className="font-normal p-2">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 shrink-0">
                                            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold uppercase">
                                                {initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col space-y-1 overflow-hidden">
                                            <p className="text-sm font-medium leading-none truncate">
                                                {(user as { namaLengkap?: string })?.namaLengkap || 'Nama Lengkap'}
                                            </p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                                                @{user?.username || 'pengguna'}
                                            </p>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="cursor-pointer flex items-center p-2 rounded-md transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                        <Users className="mr-2 h-4 w-4" />
                                        <span>Pengaturan Profil</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50 cursor-pointer p-2 rounded-md"
                                    onClick={logout}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-zinc-100 dark:bg-background p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto max-w-6xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
        </KaryawanProvider>
    );
}
