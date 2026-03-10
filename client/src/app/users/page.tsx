"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AuthGuard } from "@/components/auth-guard/auth-guard";
import { PaginationControls } from "@/components/users/pagination-controls/pagination-controls";
import { UsersSearch } from "@/components/users/users-search/users-search";
import { UsersList } from "@/components/users/users-list/users-list";
import { getSavedUsers, getUsers } from "@/lib/api";
import type { ReqResUser } from "@/types/reqres-user";
import type { SavedUser } from "@/types/saved-user";

const UsersPage = () => {
    const [users, setUsers] = useState<ReqResUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [savedUsers, setSavedUsers] = useState<SavedUser[]>([]);

    const loadUsers = async (nextPage: number) => {
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
    };

    const loadSavedUsers = async () => {
        try {
            const response = await getSavedUsers();
            setSavedUsers(response.data || []);
        } catch {
            setSavedUsers([]);
        }
    };

    useEffect(() => {
        void loadUsers(1);
        void loadSavedUsers();
    }, []);

    const savedExternalIds = savedUsers.map((user) => user.externalId);

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
                <header className="mb-6">
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
                        <p className="mt-2 text-sm text-slate-600">
                            Explore ReqRes users and save selected records locally.
                        </p>
                    </div>
                </header>

                <div className="space-y-4">
                    <UsersSearch value={searchValue} onChange={setSearchValue} />

                    <UsersList
                        users={filteredUsers}
                        isLoading={isLoading}
                        errorMessage={errorMessage}
                        savedExternalIds={savedExternalIds}
                        onSaveUser={loadSavedUsers}
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
};

export default UsersPage;
