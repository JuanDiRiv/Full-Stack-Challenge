"use client";

import { useRouter } from "next/navigation";
import { logoutRequest } from "@/lib/api";

export function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        try {
            await logoutRequest();
        } catch {
            // Always continue to login screen even if logout request fails.
        }

        router.replace("/login");
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
            Logout
        </button>
    );
}
