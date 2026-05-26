"use client";

import dynamic from "next/dynamic";

const HomeClient = dynamic(() => import("@/components/HomeClient"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[60vh] items-center justify-center bg-[#02081c] text-white/90">
      <p>Loading…</p>
    </div>
  ),
});

export default function HomePageClient() {
  return <HomeClient />;
}
