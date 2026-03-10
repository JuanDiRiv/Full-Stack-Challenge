"use client";

import { usePathname } from "next/navigation";
import { MainNav } from "@/components/main-nav/main-nav";
import { LogoutButton } from "@/components/logout-button/logout-button";

export const AppHeader = () => {
    const pathname = usePathname();

    if (pathname === "/login") {
        return null;
    }

    return (
        <header className="border-b border-slate-200 bg-white/95">
            <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <div>
                    <p className="text-sm font-semibold text-slate-900">Fullstack Challenge</p>
                    <p className="text-xs text-slate-500">Frontend Dashboard</p>
                </div>

                <div className="flex items-center gap-3">
                    <MainNav />
                    <div className="border-l border-slate-200 pl-3">
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </header>
    );
};
