"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginRequest } from "@/lib/api";

export const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const submitLogin = async () => {
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            const response = await loginRequest({ email, password });

            if (!response.success) {
                throw new Error(response.message || "Login failed");
            }

            router.push("/");
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Unable to login right now";
            setErrorMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                void submitLogin();
            }}
            className="mt-6 space-y-4"
        >
            <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-slate-300 focus:ring"
                    placeholder="eve.holt@reqres.in"
                />
            </div>

            <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-slate-300 focus:ring"
                    placeholder="Enter your password"
                />
            </div>

            {errorMessage ? (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {errorMessage}
                </p>
            ) : null}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
                {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
        </form>
    );
};
