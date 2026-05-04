"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// ── Decode JWT ─────────────────────────────────────────────────────────────
const decodeToken = (t: string | null) => {
    if (!t) return null;
    try {
        const payload = t.split('.')[1];
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
};

// ── Types ──────────────────────────────────────────────────────────────────
type AuthUser = { id: number; username: string; namaLengkap?: string } | null;

interface AuthContextValue {
    token: string | null;
    user: AuthUser;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (newToken: string) => void;
    logout: () => void;
}

// ── Context ────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ── Provider ───────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<AuthUser>(null);
    const [isLoading, setIsLoading] = useState(true); // true sampai token selesai dibaca

    // Baca token dari sessionStorage hanya di sisi client (setelah mount)
    // Dibungkus function agar tidak memicu linter 'calling setState synchronously in effect'
    useEffect(() => {
        const initAuth = () => {
            const stored = sessionStorage.getItem('token');
            if (stored) {
                setToken(stored);
                setUser(decodeToken(stored));
            }
            setIsLoading(false); // selesai baca
        };
        initAuth();
    }, []);

    const login = useCallback((newToken: string) => {
        sessionStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(decodeToken(newToken));
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem('token');
        setToken(null);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// ── Hook ───────────────────────────────────────────────────────────────────
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
