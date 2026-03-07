import { AuthGuard } from "@/components/auth-guard/auth-guard";
import { LogoutButton } from "@/components/logout-button/logout-button";
import { PlannedAreas } from "@/components/planned-areas/planned-areas";
import Link from "next/link";

export default function Home() {
  return (
    <AuthGuard mode="protected">
      <section>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Fullstack Challenge Frontend
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              The project foundation is ready. Core modules will be implemented
              in the next steps.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/users"
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Go to users
            </Link>
            <Link
              href="/posts"
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Go to posts
            </Link>
            <LogoutButton />
          </div>
        </div>

        <PlannedAreas />
      </section>
    </AuthGuard>
  );
}


