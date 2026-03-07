"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AuthGuard } from "@/components/auth-guard/auth-guard";
import { LogoutButton } from "@/components/logout-button/logout-button";
import { PaginationControls } from "@/components/users/pagination-controls/pagination-controls";
import { UsersSearch } from "@/components/users/users-search/users-search";
import { UsersList } from "@/components/users/users-list/users-list";
import { getUsers } from "@/lib/api";
import type { ReqResUser } from "@/types/reqres-user";

export default function UsersPage() {
    const [users, setUsers] = useState<ReqResUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchValue, setSearchValue] = useState("");

    async function loadUsers(nextPage: number) {
        setErrorMessage("");
        setIsLoading(true);

        try {
            const response = await getUsers(nextPage);
            setUsers(response.data.users);
            setPage(response.data.page);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unable to load users";
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        void loadUsers(1);
    }, []);

    const normalizedSearch = searchValue.trim().toLowerCase();
    const filteredUsers = users.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const email = user.email.toLowerCase();

        if (!normalizedSearch) {
            return true;
        }

        return fullName.includes(normalizedSearch) || email.includes(normalizedSearch);
    });

    return (
        <AuthGuard mode="protected">
            <section>
                <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <p className="text-sm text-slate-600">
                            <Link href="/" className="underline-offset-2 hover:underline">
                                Home
                            </Link>{" "}
                            / Users
                        </p>
                        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
                            Users
                        </h1>
                    </div>

                    <LogoutButton />
                </header>

                <div className="space-y-4">
                    <UsersSearch value={searchValue} onChange={setSearchValue} />

                    <UsersList
                        users={filteredUsers}
                        isLoading={isLoading}
                        errorMessage={errorMessage}
                        emptyMessage={
                            normalizedSearch
                                ? "No users match your search for this page"
                                : "No users available on this page"
                        }
                    />

                    <PaginationControls
                        page={page}
                        totalPages={totalPages}
                        isLoading={isLoading}
                        onPrevious={() => {
                            if (page > 1) {
                                void loadUsers(page - 1);
                            }
                        }}
                        onNext={() => {
                            if (page < totalPages) {
                                void loadUsers(page + 1);
                            }
                        }}
                    />
                </div>
            </section>
        </AuthGuard>
    );
}
