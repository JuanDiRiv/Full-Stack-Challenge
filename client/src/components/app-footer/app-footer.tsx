"use client";

import { usePathname } from "next/navigation";

export function AppFooter() {
    const pathname = usePathname();

    if (pathname === "/login") {
        return null;
    }

    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto grid w-full max-w-5xl gap-4 px-4 py-5 text-xs text-slate-600 sm:px-6 lg:grid-cols-2 lg:px-8">
                <div className="space-y-1">
                    <p className="font-medium text-slate-700">Fullstack Challenge</p>
                    <p>© {currentYear} Juan Diego Rivero Tirado</p>
                    <p>Built for a technical assessment</p>
                </div>

                <div className="space-y-2 lg:text-right">
                    <p>
                        <span className="font-medium text-slate-700">Tech stack:</span> Next.js,
                        TypeScript, Tailwind CSS, Express, MongoDB, Zod, Jest, Docker
                    </p>
                    <p>
                        <span className="font-medium text-slate-700">Implemented modules:</span> Auth,
                        Users, Posts
                    </p>
                </div>
            </div>
        </footer>
    );
}