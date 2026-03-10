"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { createPost, getSavedUsers } from "@/lib/api";
import type { SavedUser } from "@/types/saved-user";

type CreatePostFormProps = {
    onCreated: () => Promise<void> | void;
};

export const CreatePostForm = ({ onCreated }: CreatePostFormProps) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [authorUserId, setAuthorUserId] = useState("");
    const [savedUsers, setSavedUsers] = useState<SavedUser[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const loadSavedUsers = async () => {
            try {
                const response = await getSavedUsers();
                const users = response.data || [];
                setSavedUsers(users);

                if (users.length > 0) {
                    setAuthorUserId(users[0]._id);
                }
            } catch {
                setSavedUsers([]);
            } finally {
                setIsLoadingUsers(false);
            }
        };

        void loadSavedUsers();
    }, []);

    const handleCreatePost = async () => {
        if (savedUsers.length === 0) {
            return;
        }

        setSuccessMessage("");
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            const response = await createPost({
                title,
                content,
                authorUserId,
            });

            setSuccessMessage(response.message || "Post created");
            setTitle("");
            setContent("");

            if (savedUsers.length > 0) {
                setAuthorUserId(savedUsers[0]._id);
            }

            await onCreated();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unable to create post";
            setErrorMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Create Post</h2>
            <p className="mt-1 text-sm text-slate-600">Add a new post to the local database.</p>

            <form
                className="mt-4 space-y-3"
                onSubmit={(event) => {
                    event.preventDefault();
                    void handleCreatePost();
                }}
            >
                <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Title"
                    required
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-slate-300 focus:ring"
                />

                <textarea
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    placeholder="Content"
                    required
                    rows={4}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-slate-300 focus:ring"
                />

                <div>
                    <label htmlFor="authorUserId" className="mb-1 block text-sm font-medium text-slate-700">
                        Author
                    </label>
                    {isLoadingUsers ? (
                        <Skeleton className="h-10 w-full" />
                    ) : (
                        <select
                            id="authorUserId"
                            value={authorUserId}
                            onChange={(event) => setAuthorUserId(event.target.value)}
                            required
                            disabled={savedUsers.length === 0}
                            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-slate-300 focus:ring disabled:cursor-not-allowed disabled:bg-slate-100"
                        >
                            {savedUsers.map((savedUser) => (
                                <option key={savedUser._id} value={savedUser._id}>
                                    {savedUser.firstName} {savedUser.lastName} — {savedUser.email}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || isLoadingUsers || savedUsers.length === 0}
                    className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {isSubmitting ? "Creating..." : "Create post"}
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
};
