"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthGuard } from "@/components/auth-guard/auth-guard";
import { SaveUserButton } from "@/components/users/save-user-button/save-user-button";
import { Skeleton } from "@/components/ui/skeleton";
import { getSavedUsers, getUserById } from "@/lib/api";
import type { ReqResUser } from "@/types/reqres-user";
import type { SavedUser } from "@/types/saved-user";

export default function UserDetailPage() {
    const params = useParams<{ id: string }>();
    const userId = params.id;

    const [user, setUser] = useState<ReqResUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [savedUsers, setSavedUsers] = useState<SavedUser[]>([]);

    async function loadSavedUsers() {
        try {
            const response = await getSavedUsers();
            setSavedUsers(response.data || []);
        } catch {
            setSavedUsers([]);
        }
    }

    useEffect(() => {
        async function loadUser() {
            setErrorMessage("");
            setIsLoading(true);

            try {
                const response = await getUserById(userId);
                setUser(response.data);
            } catch (error) {
                const message =
                    error instanceof Error ? error.message : "Unable to load user details";
                setErrorMessage(message);
            } finally {
                setIsLoading(false);
            }
        }

        if (userId) {
            void loadUser();
            void loadSavedUsers();
        }
    }, [userId]);

    const isSaved = user
        ? savedUsers.some((savedUser) => savedUser.externalId === user.id)
        : false;

    return (
        <AuthGuard mode="protected">
            <section>
                <header className="mb-6">
                    <div>
                        <p className="text-sm text-slate-600">
                            <Link href="/" className="underline-offset-2 hover:underline">
                                Home
                            </Link>{" "}
                            /{" "}
                            <Link href="/users" className="underline-offset-2 hover:underline">
                                Users
                            </Link>
                        </p>
                        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
                            User Details
                        </h1>
                    </div>
                </header>

                {isLoading ? (
                    <article className="rounded-lg border border-slate-200 bg-white p-6">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-16 w-16 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-6 w-56" />
                                <Skeleton className="h-4 w-64" />
                            </div>
                            <Skeleton className="h-9 w-28" />
                        </div>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-4 w-52" />
                            </div>
                        </div>
                    </article>
                ) : null}

                {!isLoading && errorMessage ? (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-700">
                        {errorMessage}
                    </div>
                ) : null}

                {!isLoading && !errorMessage && user ? (
                    <article className="rounded-lg border border-slate-200 bg-white p-6">
                        <div className="flex items-center gap-4">
                            <Image
                                src={user.avatar}
                                alt={`${user.firstName} ${user.lastName}`}
                                width={64}
                                height={64}
                                className="h-16 w-16 rounded-full border border-slate-200 object-cover"
                            />
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">
                                    {user.firstName} {user.lastName}
                                </h2>
                                <p className="text-sm text-slate-600">{user.email}</p>
                            </div>

                            <div className="ml-auto">
                                {isSaved ? (
                                    <p className="text-sm font-medium text-green-700">Saved locally</p>
                                ) : (
                                    <SaveUserButton externalId={user.id} onSaved={loadSavedUsers} />
                                )}
                            </div>
                        </div>

                        <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                            <div>
                                <dt className="text-slate-500">External ID</dt>
                                <dd className="font-medium text-slate-900">{user.id}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Email</dt>
                                <dd className="font-medium text-slate-900">{user.email}</dd>
                            </div>
                        </dl>
                    </article>
                ) : null}
            </section>
        </AuthGuard>
    );
}
