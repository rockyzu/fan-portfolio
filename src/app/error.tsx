"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6" role="alert">
      <h1 className="text-xl font-semibold text-neutral-900">Something went wrong</h1>
      <p className="mt-2 max-w-md text-center text-sm text-neutral-600">
        Check the browser console for details. If the page was loading forever, the error may be listed there.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
      >
        Try again
      </button>
    </div>
  );
}
