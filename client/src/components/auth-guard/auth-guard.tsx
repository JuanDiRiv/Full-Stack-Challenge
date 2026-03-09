"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSessionStatus } from "@/lib/api";

type AuthGuardMode = "protected" | "guest";

type AuthGuardProps = {
    mode: AuthGuardMode;
    children: ReactNode;
};

export function AuthGuard({ mode, children }: AuthGuardProps) {
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function checkSessionStatus() {
            try {
                const sessionStatusResponse = await getSessionStatus();
                setIsAuthenticated(sessionStatusResponse.data.authenticated);
            } catch {
                setIsAuthenticated(false);
            } finally {
                setIsCheckingAuth(false);
            }
        }

        void checkSessionStatus();
    }, []);

    const shouldRedirectToLogin = mode === "protected" && !isAuthenticated;
    const shouldRedirectToHome = mode === "guest" && isAuthenticated;
    const isAllowed =
        (mode === "protected" && isAuthenticated) ||
        (mode === "guest" && !isAuthenticated);

    useEffect(() => {
        if (isCheckingAuth) {
            return;
        }

        if (shouldRedirectToLogin) {
            router.replace("/login");
            return;
        }

        if (shouldRedirectToHome) {
            router.replace("/");
        }
    }, [isCheckingAuth, shouldRedirectToHome, shouldRedirectToLogin, router]);

    if (isCheckingAuth) {
        return (
            <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600">
                Checking authentication...
            </div>
        );
    }

    if (!isAllowed) {
        return null;
    }

    return <>{children}</>;
}
