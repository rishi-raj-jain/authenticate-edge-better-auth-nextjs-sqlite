import { headers } from "next/headers";
import { auth } from "@/auth";
import { SignOutButton } from "./sign-out-button";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <main className="w-full max-w-lg rounded-2xl border border-black/[.08] bg-white p-8 dark:border-white/[.145] dark:bg-zinc-950">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Home
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Welcome, {session?.user.name ?? "there"}
        </h1>
        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
          Signed in as{" "}
          <span className="font-medium text-black dark:text-zinc-50">
            {session?.user.email}
          </span>
        </p>
        <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-black">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Session ID</p>
          <p className="mt-1 break-all font-mono text-sm text-zinc-900 dark:text-zinc-100">
            {session?.session.id}
          </p>
        </div>
        <div className="mt-8">
          <SignOutButton />
        </div>
      </main>
    </div>
  );
}
