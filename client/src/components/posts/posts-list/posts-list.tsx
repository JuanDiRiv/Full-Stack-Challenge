import { PostCard } from "@/components/posts/post-card/post-card";
import { PostCardSkeleton } from "@/components/posts/post-card-skeleton/post-card-skeleton";
import type { Post } from "@/types/post";
import type { SavedUser } from "@/types/saved-user";

type PostsListProps = {
    posts: Post[];
    isLoading: boolean;
    errorMessage: string;
    onDeleted: () => Promise<void> | void;
    savedUsers: SavedUser[];
};

export function PostsList({
    posts,
    isLoading,
    errorMessage,
    onDeleted,
    savedUsers,
}: PostsListProps) {
    if (isLoading) {
        return (
            <section>
                <h2 className="text-lg font-semibold text-slate-900">Posts</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
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

    if (posts.length === 0) {
        return (
            <section className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600">
                No posts found. Create one to get started.
            </section>
        );
    }

    return (
        <section>
            <h2 className="text-lg font-semibold text-slate-900">Posts</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {posts.map((post) => (
                    <PostCard key={post._id} post={post} onDeleted={onDeleted} savedUsers={savedUsers} />
                ))}
            </div>
        </section>
    );
}
