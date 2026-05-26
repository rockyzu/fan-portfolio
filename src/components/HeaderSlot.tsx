"use client";

import { useEffect, useState } from "react";
import HeaderRouter from "@/components/HeaderRouter";

/**
 * Renders the header only after client mount so usePathname() in HeaderRouter
 * is never called during SSR. This avoids the entire page hanging in Next.js 16
 * when navigation hooks run in the root layout.
 */
export default function HeaderSlot() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50" aria-hidden="true">
        <div className="mx-auto max-w-7xl px-6 pt-5">
          <div className="flex h-[60px] items-center rounded-[28px] border border-white/18 bg-white/14 px-6" />
        </div>
      </header>
    );
  }

  return <HeaderRouter />;
}
