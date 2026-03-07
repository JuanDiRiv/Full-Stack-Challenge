import Link from "next/link";
import Image from "next/image";
import type { ReqResUser } from "@/types/reqres-user";
import { SaveUserButton } from "@/components/users/save-user-button/save-user-button";

type UserCardProps = {
    user: ReqResUser;
    isSaved: boolean;
    onSave: () => Promise<void> | void;
};

export function UserCard({ user, isSaved, onSave }: UserCardProps) {
    return (
        <article className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
                <Image
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full border border-slate-200 object-cover"
                />
                <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                        {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-sm text-slate-600">{user.email}</p>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                    <p className="text-xs text-slate-500">External ID: {user.id}</p>
                    {isSaved ? (
                        <p className="mt-1 text-xs font-medium text-green-700">Saved locally</p>
                    ) : null}
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href={`/users/${user.id}`}
                        className="text-sm font-medium text-slate-900 underline-offset-2 hover:underline"
                    >
                        View details
                    </Link>

                    {!isSaved ? <SaveUserButton externalId={user.id} onSaved={onSave} /> : null}
                </div>
            </div>
        </article>
    );
}
