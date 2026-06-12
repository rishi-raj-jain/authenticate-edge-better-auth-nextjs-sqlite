"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUp } from "@/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    const { error: signUpError } = await signUp.email({ name, email, password });
    if (signUpError) {
      setError(signUpError.message ?? "Sign up failed");
      setPending(false);
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <main className="w-full max-w-sm rounded-2xl border border-black/[.08] bg-white p-8 dark:border-white/[.145] dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Create account
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Start with a local account stored in Bunny Database.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Name
            <input
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 font-normal text-black outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-black dark:text-zinc-50"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Email
            <input
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 font-normal text-black outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-black dark:text-zinc-50"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Password
            <input
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 font-normal text-black outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-black dark:text-zinc-50"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error ? (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          ) : null}

          <button
            className="mt-2 flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-[#ccc]"
            type="submit"
            disabled={pending}
          >
            {pending ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-black underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Sign in
          </Link>
        </p>
      </main>
    </div>
  );
}
