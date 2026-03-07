import Link from "next/link";
import Image from "next/image";
import type { ReqResUser } from "@/types/reqres-user";

type UserCardProps = {
    user: ReqResUser;
};

export function UserCard({ user }: UserCardProps) {
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

            <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-slate-500">External ID: {user.id}</p>
                <Link
                    href={`/users/${user.id}`}
                    className="text-sm font-medium text-slate-900 underline-offset-2 hover:underline"
                >
                    View details
                </Link>
            </div>
        </article>
    );
}
