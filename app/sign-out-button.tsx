"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  async function handleSignOut() {
    setPending(true);
    await signOut();
    router.push("/sign-in");
    router.refresh();
  }
  return (
    <button
      className="flex h-11 items-center justify-center rounded-full border border-solid border-black/[.08] px-5 text-sm font-medium transition-colors hover:border-transparent hover:bg-black/[.04] disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
      type="button"
      onClick={handleSignOut}
      disabled={pending}
    >
      {pending ? "Signing out..." : "Sign out"}
    </button>
  );
}
