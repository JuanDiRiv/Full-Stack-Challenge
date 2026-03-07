"use client";

import { ReactNode, useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

type AuthGuardMode = "protected" | "guest";

type AuthGuardProps = {
    mode: AuthGuardMode;
    children: ReactNode;
};

export function AuthGuard({ mode, children }: AuthGuardProps) {
    const router = useRouter();

    const token = useSyncExternalStore(
        () => () => {
            return;
        },
        () => getToken(),
        () => undefined,
    );

    const isCheckingAuth = typeof token === "undefined";
    const shouldRedirectToLogin = mode === "protected" && token === null;
    const shouldRedirectToHome = mode === "guest" && typeof token === "string";
    const isAllowed =
        (mode === "protected" && typeof token === "string") ||
        (mode === "guest" && token === null);

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
