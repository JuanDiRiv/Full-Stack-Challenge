"use client";

import { useRouter } from "next/navigation";
import { logoutRequest } from "@/lib/api";

export const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logoutRequest();
        } catch {
        }

        router.replace("/login");
    };

    return (
        <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
            Logout
        </button>
    );
};
