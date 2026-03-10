import { Skeleton } from "@/components/ui/skeleton";

export const UserCardSkeleton = () => {
    return (
        <article className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-56" />
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
                <div className="space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-20" />
                </div>

                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-20" />
                </div>
            </div>
        </article>
    );
};
