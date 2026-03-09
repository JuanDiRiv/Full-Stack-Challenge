import type { ReqResUser } from "@/types/reqres-user";
import { UserCard } from "@/components/users/user-card/user-card";
import { UserCardSkeleton } from "@/components/users/user-card-skeleton/user-card-skeleton";

type UsersListProps = {
    users: ReqResUser[];
    isLoading: boolean;
    errorMessage: string;
    emptyMessage?: string;
    savedExternalIds: number[];
    onSaveUser: () => Promise<void> | void;
};

export function UsersList({
    users,
    isLoading,
    errorMessage,
    emptyMessage = "No users found",
    savedExternalIds,
    onSaveUser,
}: UsersListProps) {
    if (isLoading) {
        return (
            <section>
                <h2 className="text-lg font-semibold text-slate-900">Users</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <UserCardSkeleton />
                    <UserCardSkeleton />
                    <UserCardSkeleton />
                    <UserCardSkeleton />
                </div>
            </section>
        );
    }

    if (errorMessage) {
        return (
            <section className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-700">
                {errorMessage}
            </section>
        );
    }

    if (users.length === 0) {
        return (
            <section className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600">
                {emptyMessage}
            </section>
        );
    }

    return (
        <section>
            <h2 className="text-lg font-semibold text-slate-900">Users</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        isSaved={savedExternalIds.includes(user.id)}
                        onSave={onSaveUser}
                    />
                ))}
            </div>
        </section>
    );
}
