"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AuthGuard } from "@/components/auth-guard/auth-guard";
import { EditPostForm } from "@/components/posts/edit-post-form/edit-post-form";
import { Skeleton } from "@/components/ui/skeleton";
import { deletePost, getPostById, getSavedUsers } from "@/lib/api";
import type { Post } from "@/types/post";
import type { SavedUser } from "@/types/saved-user";

const PostDetailPage = () => {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const postId = params.id;

    const [post, setPost] = useState<Post | null>(null);
    const [savedUsers, setSavedUsers] = useState<SavedUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const [isRedirecting, setIsRedirecting] = useState(false);

    const loadPost = useCallback(async () => {
        setErrorMessage("");
        setIsLoading(true);

        try {
            const [postResponse, savedUsersResponse] = await Promise.all([
                getPostById(postId),
                getSavedUsers(),
            ]);

            setPost(postResponse.data);
            setSavedUsers(savedUsersResponse.data || []);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unable to load post";
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        if (postId) {
            void loadPost();
        }
    }, [postId, loadPost]);

    const handleDeletePost = async () => {
        setDeleteError("");
        setIsDeleting(true);

        try {
            await deletePost(postId);
            router.replace("/posts");
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unable to delete post";
            setDeleteError(message);
            setIsDeleting(false);
        }
    };

    const matchedAuthor = post
        ? savedUsers.find((savedUser) => savedUser._id === post.authorUserId)
        : null;

    const authorLabel = matchedAuthor
        ? `${matchedAuthor.firstName} ${matchedAuthor.lastName} — ${matchedAuthor.email}`
        : "Unknown author";

    if (isRedirecting) {
        return (
            <AuthGuard mode="protected">
                <section className="rounded-lg border border-slate-200 bg-white p-6"> 
                    <div className="flex items-center gap-3">
                        <span
                            className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900"
                            aria-hidden="true"
                        />
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">Saving changes</h2>
                            <p className="text-sm text-slate-600">Redirecting...</p>
                        </div>
                    </div>
                </section>
            </AuthGuard>
        );
    }

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
                            <Link href="/posts" className="underline-offset-2 hover:underline">
                                Posts
                            </Link>
                        </p>
                        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
                            Post Details
                        </h1>
                    </div>
                </header>

                {isLoading ? (
                    <div className="space-y-6">
                        <article className="rounded-lg border border-slate-200 bg-white p-6">
                            <Skeleton className="h-7 w-3/5" />
                            <div className="mt-3 space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-11/12" />
                                <Skeleton className="h-4 w-9/12" />
                            </div>

                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Skeleton className="h-3 w-16" />
                                    <Skeleton className="h-4 w-56" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-3 w-14" />
                                    <Skeleton className="h-4 w-44" />
                                </div>
                            </div>

                            <Skeleton className="mt-6 h-10 w-28" />
                        </article>

                        <section className="rounded-lg border border-slate-200 bg-white p-6">
                            <Skeleton className="h-6 w-32" />
                            <div className="mt-4 space-y-3">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-28 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-32" />
                            </div>
                        </section>
                    </div>
                ) : null}

                {!isLoading && errorMessage ? (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-700">
                        {errorMessage}
                    </div>
                ) : null}

                {!isLoading && !errorMessage && post ? (
                    <div className="space-y-6">
                        <article className="rounded-lg border border-slate-200 bg-white p-6">
                            <h2 className="text-xl font-semibold text-slate-900">{post.title}</h2>
                            <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{post.content}</p>

                            <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                                <div>
                                    <dt className="text-slate-500">Author</dt>
                                    <dd className="font-medium text-slate-900">{authorLabel}</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-500">Post ID</dt>
                                    <dd className="font-medium text-slate-900">{post._id}</dd>
                                </div>
                            </dl>

                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        void handleDeletePost();
                                    }}
                                    disabled={isDeleting}
                                    className="rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isDeleting ? "Deleting..." : "Delete post"}
                                </button>

                                {deleteError ? <p className="mt-2 text-sm text-red-700">{deleteError}</p> : null}
                            </div>
                        </article>

                        <EditPostForm
                            post={post}
                            onUpdated={async () => {
                                setIsRedirecting(true);
                                await new Promise((resolve) => {
                                    setTimeout(resolve, 700);
                                });
                                router.replace("/posts");
                            }}
                        />
                    </div>
                ) : null}
            </section>
        </AuthGuard>
    );
};

export default PostDetailPage;
