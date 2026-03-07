"use client";

import Link from "next/link";
import { useState } from "react";
import { deletePost } from "@/lib/api";
import type { Post } from "@/types/post";
import type { SavedUser } from "@/types/saved-user";

type PostCardProps = {
    post: Post;
    onDeleted: () => Promise<void> | void;
    savedUsers: SavedUser[];
};

export function PostCard({ post, onDeleted, savedUsers }: PostCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const matchedAuthor = savedUsers.find((savedUser) => savedUser._id === post.authorUserId);
    const authorLabel = matchedAuthor
        ? `${matchedAuthor.firstName} ${matchedAuthor.lastName} — ${matchedAuthor.email}`
        : "Unknown author";

    async function handleDelete() {
        setErrorMessage("");
        setIsDeleting(true);

        try {
            await deletePost(post._id);
            await onDeleted();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unable to delete post";
            setErrorMessage(message);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <article className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="text-base font-semibold text-slate-900">{post.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-slate-700">{post.content}</p>
            <p className="mt-3 text-xs text-slate-500">Author: {authorLabel}</p>

            <div className="mt-4 flex items-center gap-3">
                <Link
                    href={`/posts/${post._id}`}
                    className="text-sm font-medium text-slate-900 underline-offset-2 hover:underline"
                >
                    Detail / Edit
                </Link>

                <button
                    type="button"
                    onClick={() => {
                        void handleDelete();
                    }}
                    disabled={isDeleting}
                    className="rounded-md border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            </div>

            {errorMessage ? <p className="mt-2 text-xs text-red-700">{errorMessage}</p> : null}
        </article>
    );
}
