import LoginBackground from './components/LoginBackground';
import LoginForm from './components/LoginForm';

export default function LoginPage() {
    return (
        <div className="login-page relative flex min-h-screen items-center justify-center p-4 overflow-hidden">
            <LoginBackground />
            <LoginForm />
        </div>
    );
}
