// src/app/work/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import PageBackground from "@/components/PageBackground";

const items = [
  {
    title: "OLG Corporate Website Redesign",
    desc: "3,000+ pages organized around the org chart, not user intent. I rebuilt the architecture around what people actually came to do.",
    href: "/work/olg",
    tags: ["Enterprise IA", "Governance", "Accessibility"],
    locked: true,
    cover: "/covers/olg.png",
  },
  {
    title: "Pfizer Global Learning Platform",
    desc: "Healthcare training split across disconnected tools. I consolidated it into one platform — with a shared model for learning, progress, and compliance.",
    href: "/work/pfizer",
    tags: ["B2B SaaS", "Platform UX", "Regulated"],
    locked: true,
    cover: "/covers/pfizer.png",
  },
  {
    title: "Intuit AI-Assisted Workflows",
    desc: "Tax software that asks users to interpret complex rules. I designed the AI layer that interprets for them — and makes its reasoning visible.",
    href: "/work/intuit-ai",
    tags: ["AI UX", "Decision Support", "Trust"],
    locked: true,
    cover: "/covers/intuit.png",
  },
];

export default function WorkPage() {
  return (
    <div className="min-h-screen text-white">
      <PageBackground />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <section className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Selected work
          </h1>
          <p className="mt-4 text-white/90 leading-relaxed">
            A few projects that show how I design system behavior — not just interfaces. Some work is private (🔒).
          </p>
        </section>

        <section className="mt-14 grid gap-10 md:grid-cols-2">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              prefetch={false}
              aria-label={`View project: ${i.title}`}
              className="group block overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-black/50 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30 rounded-3xl"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-3xl border-b border-white/10 bg-black/30">
                {i.cover ? (
                  <Image
                    src={i.cover}
                    alt={i.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Text */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {i.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs text-white/95 backdrop-blur"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-start justify-between gap-4">
                  <div className="text-lg font-semibold tracking-tight text-white">
                    {i.title}
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    {i.locked ? (
                      <span aria-hidden title="Private">🔒</span>
                    ) : null}
                    <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                  </div>
                </div>

                <p className="mt-3 text-sm text-white/90 leading-relaxed line-clamp-2">
                  {i.desc}
                </p>
              </div>
            </Link>
          ))}
        </section>

        <p className="mt-10 text-center text-sm text-white/80">
          More projects in progress — available upon request.
        </p>
      </div>
    </div>
  );
}