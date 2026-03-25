import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';

export default function LoginForm() {
    const { username, setUsername, password, setPassword, isLoading, handleLogin } = useLogin();

    return (
        <Card className="login-card z-10 w-full max-w-sm shadow-2xl rounded-2xl backdrop-blur-xl border">
            <CardHeader className="space-y-1 text-center pb-6">
                <div className="flex justify-center mb-4">
                    <div className="login-icon-badge h-14 w-14 rounded-2xl flex items-center justify-center">
                        <Package size={28} />
                    </div>
                </div>
                <CardTitle className="login-title text-2xl font-bold tracking-tight">
                    DASHBOARD DC
                </CardTitle>
                <CardDescription className="login-desc">
                    Masukkan username dan password Anda
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleLogin}>
                <CardContent className="space-y-5 mb-2">
                    <Input
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="login-input h-12 px-4 rounded-xl"
                    />
                    <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-input h-12 px-4 rounded-xl"
                    />
                </CardContent>

                <CardFooter className="pt-2 pb-6">
                    <Button
                        type="submit"
                        className="login-btn w-full rounded-xl h-12 text-md font-semibold transition-all duration-200 border-0"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Sign In'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
