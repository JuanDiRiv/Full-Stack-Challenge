import { AuthGuard } from "@/components/auth-guard/auth-guard";
import { LoginForm } from "@/components/login-form/login-form";

const LoginPage = () => {
    return (
        <AuthGuard mode="guest">
            <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
                <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                    <h1 className="text-2xl font-semibold text-slate-900">Sign in</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Use your account credentials to access the app.
                    </p>

                    <LoginForm />
                </div>
            </section>
        </AuthGuard>
    );
};

export default LoginPage;
