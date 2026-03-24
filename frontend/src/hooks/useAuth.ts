import { useState, useEffect, useCallback } from 'react';

const decodeToken = (t: string | null) => {
    if (!t) return null;
    try {
        const payload = t.split('.')[1];
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
};

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [user, setUser] = useState<{ id: number; username: string; namaLengkap?: string } | null>(null);

    useEffect(() => {
        const handleStorageChange = () => {
            const currentToken = localStorage.getItem('token');
            setToken(currentToken);
            setUser(decodeToken(currentToken));
        };
        handleStorageChange(); // initial decode
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const login = useCallback((newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(decodeToken(newToken));
        // trigger storage event for the same window
        window.dispatchEvent(new Event('storage'));
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        window.dispatchEvent(new Event('storage'));
    }, []);

    return { token, user, login, logout, isAuthenticated: !!token };
};
