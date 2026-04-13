"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Tunggu sampai token selesai dibaca dari sessionStorage
        if (!isLoading && !isAuthenticated) {
            router.replace('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    // Saat masih loading, tampilkan blank (tidak redirect dulu)
    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}

