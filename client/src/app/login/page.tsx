import { LoginForm } from "@/components/login-form/login-form";

export default function LoginPage() {
    return (
        <section className="mx-auto w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-slate-900">Sign in</h1>
            <p className="mt-2 text-sm text-slate-600">
                Use your account credentials to access the challenge app.
            </p>

            <LoginForm />
        </section>
    );
}
