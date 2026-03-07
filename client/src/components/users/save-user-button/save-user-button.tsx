"use client";

import { useState } from "react";
import { importUserByExternalId } from "@/lib/api";

type SaveUserButtonProps = {
    externalId: number;
    onSaved: () => Promise<void> | void;
};

export function SaveUserButton({ externalId, onSaved }: SaveUserButtonProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSave() {
        setErrorMessage("");
        setIsSaving(true);

        try {
            await importUserByExternalId(externalId);
            await onSaved();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unable to save user";
            setErrorMessage(message);
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="flex flex-col items-end gap-2">
            <button
                type="button"
                onClick={() => {
                    void handleSave();
                }}
                disabled={isSaving}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSaving ? "Saving..." : "Save user"}
            </button>

            {errorMessage ? <p className="text-xs text-red-700">{errorMessage}</p> : null}
        </div>
    );
}
