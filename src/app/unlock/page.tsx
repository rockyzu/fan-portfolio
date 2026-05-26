"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function UnlockForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/work";
  const error = searchParams.get("error") === "1";

  return (
    <main className="min-h-screen bg-white text-neutral-900" aria-labelledby="unlock-title">
      <div className="mx-auto max-w-lg px-6 py-20">
        <h1 id="unlock-title" className="text-3xl font-semibold tracking-tight">Protected case studies</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Enter password to view selected work.
        </p>

        <form method="POST" action="/api/unlock" className="mt-8 space-y-4" aria-label="Unlock protected content">
          <input type="hidden" name="next" value={next} />

          <label htmlFor="unlock-password" className="sr-only">
            Password
          </label>
          <input
            id="unlock-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
            required
          />

          {error ? (
            <p role="alert" className="text-sm text-red-600">
              Incorrect password. Try again.
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-2xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            Unlock
          </button>
        </form>
      </div>
    </main>
  );
}

export default function UnlockPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white text-neutral-900 flex items-center justify-center">
        <p className="text-neutral-500">Loading…</p>
      </main>
    }>
      <UnlockForm />
    </Suspense>
  );
}