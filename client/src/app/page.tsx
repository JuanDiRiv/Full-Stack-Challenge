import { AuthGuard } from "@/components/auth-guard/auth-guard";
import Link from "next/link";

const Home = () => {
  return (
    <AuthGuard mode="protected">
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Dashboard</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Manage ReqRes users, save them locally, and create posts linked to saved authors.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Users module</h2>
            <p className="mt-2 text-sm text-slate-600">
              Browse paginated users from ReqRes, inspect details, and save users to MongoDB.
            </p>
            <Link
              href="/users"
              className="mt-4 inline-flex rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Open users
            </Link>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Posts module</h2>
            <p className="mt-2 text-sm text-slate-600">
              Create, update, and delete local posts while selecting authors from saved users.
            </p>
            <Link
              href="/posts"
              className="mt-4 inline-flex rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Open posts
            </Link>
          </article>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Current scope</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li>Authentication with ReqRes login flow</li>
            <li>Users listing, search, detail, and local save</li>
            <li>Posts CRUD with author mapping from saved users</li>
          </ul>
        </div>
      </section>
    </AuthGuard>
  );
};

export default Home;


