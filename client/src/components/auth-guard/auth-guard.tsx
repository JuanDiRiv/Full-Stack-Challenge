"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSessionStatus } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

type AuthGuardMode = "protected" | "guest";

type AuthGuardProps = {
    mode: AuthGuardMode;
    children: ReactNode;
};

export const AuthGuard = ({ mode, children }: AuthGuardProps) => {
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkSessionStatus = async () => {
            try {
                const sessionStatusResponse = await getSessionStatus();
                setIsAuthenticated(sessionStatusResponse.data.authenticated);
            } catch {
                setIsAuthenticated(false);
            } finally {
                setIsCheckingAuth(false);
            }
        };

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
            <div className="rounded-lg border border-slate-200 bg-white p-6">
                <div className="space-y-3">
                    <Skeleton className="h-4 w-44" />
                    <Skeleton className="h-4 w-64" />
                </div>
            </div>
        );
    }

    if (!isAllowed) {
        return null;
    }

    return <>{children}</>;
};
