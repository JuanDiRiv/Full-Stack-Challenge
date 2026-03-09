import { Skeleton } from "@/components/ui/skeleton";

export function PostCardSkeleton() {
    return (
        <article className="rounded-lg border border-slate-200 bg-white p-4">
            <Skeleton className="h-5 w-3/4" />
            <div className="mt-3 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-8/12" />
            </div>
            <Skeleton className="mt-3 h-3 w-40" />

            <div className="mt-4 flex items-center gap-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-9 w-16" />
            </div>
        </article>
    );
}
