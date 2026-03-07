"use client";

import { useEffect, useState } from "react";
import { getSavedUsers, updatePost } from "@/lib/api";
import type { Post } from "@/types/post";
import type { SavedUser } from "@/types/saved-user";

type EditPostFormProps = {
    post: Post;
    onUpdated: () => Promise<void> | void;
};

export function EditPostForm({ post, onUpdated }: EditPostFormProps) {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [authorUserId, setAuthorUserId] = useState(post.authorUserId);
    const [savedUsers, setSavedUsers] = useState<SavedUser[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setTitle(post.title);
        setContent(post.content);
        setAuthorUserId(post.authorUserId);
    }, [post]);

    useEffect(() => {
        async function loadSavedUsers() {
            try {
                const response = await getSavedUsers();
                setSavedUsers(response.data || []);
            } catch {
                setSavedUsers([]);
            } finally {
                setIsLoadingUsers(false);
            }
        }

        void loadSavedUsers();
    }, []);

    async function handleUpdatePost() {
        if (savedUsers.length === 0) {
            return;
        }

        setSuccessMessage("");
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            const response = await updatePost(post._id, {
                title,
                content,
                authorUserId,
            });

            setSuccessMessage(response.message || "Post updated");
            await onUpdated();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unable to update post";
            setErrorMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    const hasCurrentAuthorInSavedUsers = savedUsers.some(
        (savedUser) => savedUser._id === authorUserId,
    );

    return (
        <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Edit Post</h2>

            <form
                className="mt-4 space-y-3"
                onSubmit={(event) => {
                    event.preventDefault();
                    void handleUpdatePost();
                }}
            >
                <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-slate-300 focus:ring"
                />

                <textarea
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    required
                    rows={5}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-slate-300 focus:ring"
                />

                <div>
                    <label htmlFor="editAuthorUserId" className="mb-1 block text-sm font-medium text-slate-700">
                        Author
                    </label>
                    <select
                        id="editAuthorUserId"
                        value={authorUserId}
                        onChange={(event) => setAuthorUserId(event.target.value)}
                        required
                        disabled={isLoadingUsers || savedUsers.length === 0}
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-slate-300 focus:ring disabled:cursor-not-allowed disabled:bg-slate-100"
                    >
                        {!hasCurrentAuthorInSavedUsers && authorUserId ? (
                            <option value={authorUserId}>Unknown author (current value)</option>
                        ) : null}

                        {savedUsers.map((savedUser) => (
                            <option key={savedUser._id} value={savedUser._id}>
                                {savedUser.firstName} {savedUser.lastName} — {savedUser.email}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || isLoadingUsers || savedUsers.length === 0}
                    className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {isSubmitting ? "Saving..." : "Save changes"}
                </button>
            </form>

            {!isLoadingUsers && savedUsers.length === 0 ? (
                <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                    No saved users available. Please save a user from the Users section first.
                </p>
            ) : null}

            {successMessage ? (
                <p className="mt-3 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                    {successMessage}
                </p>
            ) : null}

            {errorMessage ? (
                <p className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {errorMessage}
                </p>
            ) : null}
        </section>
    );
}
