// src/app/work/page.tsx
"use client";

import PageBackground from "@/components/PageBackground";
import { ProjectCard, type ProjectItem } from "@/components/ProjectCard";

type WorkItem = ProjectItem;

const items: WorkItem[] = [
  {
    number: "01",
    domain: "Enterprise Tax Platform · Selected Work",
    title: "KPMG — Enterprise Tax Platform Work",
    desc: "Designing complex workflows and platform experiences across enterprise tax products.",
    href: "/work/kpmg",
    cover: "/covers/kpmg.png",
    ctaLabel: "Explore KPMG work",
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
            <ProjectCard key={item.href} item={item} />
          ))}
        </section>

        <p className="mt-10 text-center text-[13px] text-white/35">
          More projects available upon request.
        </p>
      </div>
    </div>
  );
}
