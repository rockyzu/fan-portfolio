// src/app/work/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import PageBackground from "@/components/PageBackground";

type WorkItem = {
  number: string;
  domain: string;
  title: string;
  desc: string;
  href: string;
  locked: boolean;
  cover: string;
  comingSoon?: boolean;
};

const items: WorkItem[] = [
  {
    number: "01",
    domain: "Enterprise Workflow · Tax Platform",
    title: "Integrating a Specialized Tax Workflow",
    desc: "Bringing a standalone surplus calculation experience into a unified enterprise tax ecosystem while balancing workflow independence, compliance requirements, and platform consistency.",
    href: "/work/surplus-calculator",
    locked: true,
    cover: "",
    comingSoon: true,
  },
  {
    number: "02",
    domain: "Enterprise IA · Governance",
    title: "OLG Corporate Website Redesign",
    desc: "3,000+ pages organized around the org chart, not user intent. I rebuilt the architecture around what people actually came to do.",
    href: "/work/olg",
    locked: true,
    cover: "/covers/olg.png",
  },
  {
    number: "03",
    domain: "Healthcare Learning Platform",
    title: "Pfizer Global Learning Platform",
    desc: "Healthcare training split across disconnected tools. I consolidated it into one platform — with a shared model for learning, progress, and compliance.",
    href: "/work/pfizer",
    locked: true,
    cover: "/covers/pfizer.png",
  },
  {
    number: "04",
    domain: "AI Decision Systems",
    title: "Intuit AI-Assisted Workflows",
    desc: "Tax software that asks users to interpret complex rules. I designed the AI layer that interprets for them — and makes its reasoning visible.",
    href: "/work/intuit-ai",
    locked: true,
    cover: "/covers/intuit.png",
  },
];

function CoverPlaceholder() {
  return (
    <div className="absolute inset-0 bg-[#010b1f]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.11) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_38%_55%,rgba(29,78,216,0.28),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,0.55))]" />
    </div>
  );
}

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <Link
      href={item.href}
      prefetch={false}
      aria-label={item.comingSoon ? `${item.title} — coming soon` : `View project: ${item.title}`}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#02081c]/70 backdrop-blur transition-all duration-400 ease-out hover:-translate-y-1 hover:border-white/[0.14] hover:shadow-[0_24px_64px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.06)]">

        {/* IMAGE */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

          {item.cover ? (
            <Image
              src={item.cover}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-[1.09]"
            />
          ) : (
            <CoverPlaceholder />
          )}
        </div>

        {/* CONTENT */}
        <div className="px-6 pb-6 pt-5">
          {/* Number + Domain */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-white/25">{item.number}</span>
            <span className="text-[11px] text-white/20">/</span>
            <span className="text-[11px] font-semibold tracking-[0.14em] text-white/40 uppercase">
              {item.domain}
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-tight text-white transition-colors duration-200 group-hover:text-white">
            {item.title}
          </h3>

          {/* Description */}
          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/55">
            {item.desc}
          </p>

          {/* CTA */}
          <div className="mt-5">
            {item.comingSoon ? (
              <span className="text-[11px] font-semibold tracking-[0.14em] text-white/35 uppercase">
                Case Study in Progress
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[13px] text-white/50 transition-colors duration-200 group-hover:text-white/90">
                {item.locked && <span aria-hidden className="text-white/30">🔒</span>}
                View Case
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function WorkPage() {
  return (
    <div className="min-h-screen text-white">
      <PageBackground />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <section className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Selected work
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/60">
            A few projects that show how I think about complex systems — not just how they look, but how they work.
          </p>
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-2" aria-label="Work projects">
          {items.map((item) => (
            <WorkCard key={item.href} item={item} />
          ))}
        </section>

        <p className="mt-10 text-center text-[13px] text-white/35">
          More projects available upon request.
        </p>
      </div>
    </div>
  );
}
