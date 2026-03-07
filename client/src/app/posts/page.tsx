"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AuthGuard } from "@/components/auth-guard/auth-guard";
import { LogoutButton } from "@/components/logout-button/logout-button";
import { CreatePostForm } from "@/components/posts/create-post-form/create-post-form";
import { PostsList } from "@/components/posts/posts-list/posts-list";
import { getPosts, getSavedUsers } from "@/lib/api";
import type { Post } from "@/types/post";
import type { SavedUser } from "@/types/saved-user";

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [savedUsers, setSavedUsers] = useState<SavedUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const loadPosts = useCallback(async () => {
        setErrorMessage("");
        setIsLoading(true);

        try {
            const [postsResponse, savedUsersResponse] = await Promise.all([
                getPosts(),
                getSavedUsers(),
            ]);

            setPosts(postsResponse.data || []);
            setSavedUsers(savedUsersResponse.data || []);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unable to load posts";
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadPosts();
    }, [loadPosts]);

    return (
        <AuthGuard mode="protected">
            <section>
                <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <p className="text-sm text-slate-600">
                            <Link href="/" className="underline-offset-2 hover:underline">
                                Home
                            </Link>{" "}
                            / Posts
                        </p>
                        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
                            Posts
                        </h1>
                    </div>

                    <LogoutButton />
                </header>

                <div className="space-y-6">
                    <CreatePostForm onCreated={loadPosts} />
                    <PostsList
                        posts={posts}
                        savedUsers={savedUsers}
                        isLoading={isLoading}
                        errorMessage={errorMessage}
                        onDeleted={loadPosts}
                    />
                </div>
            </section>
        </AuthGuard>
    );
}
