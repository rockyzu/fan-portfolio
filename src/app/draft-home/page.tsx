"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";


type Project = {
  title: string;
  desc: string;
  tags: string[];
  href: string;
  coverLabel: string;
  locked?: boolean;
};

function TypingText({
  text,
  speed = 45,
  className,
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const [out, setOut] = useState("");

  useEffect(() => {
    let i = 0;
    const resetId = window.setTimeout(() => {
      setOut("");
    }, 0);
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => {
      window.clearTimeout(resetId);
      window.clearInterval(id);
    };
  }, [text, speed]);

  return (
    <div className={className}>
      <span className="border-r-2 border-purple-700 pr-1 animate-pulse">
        {out}
      </span>
    </div>
  );
}

const projects: Project[] = [
  {
    title: "OLG Corporate Website Redesign",
    desc: "Enterprise IA redesign focused on findability, governance, and scalable structure.",
    tags: ["Enterprise IA", "Governance", "Content strategy"],
    href: "/work/olg",
    coverLabel: "IA • Navigation • Governance",
    locked: true,
  },
  {
    title: "Pfizer Global Learning Platform",
    desc: "B2B platform experience for regulated learning journeys, navigation, and status systems.",
    tags: ["B2B SaaS", "Platform UX", "Regulated"],
    href: "/work/pfizer",
    coverLabel: "Platform UX • Journeys • Compliance",
    locked: true,
  },
  {
    title: "Intuit AI-Assisted Workflows",
    desc: "AI-assisted decision workflows designed for clarity, explainability, and recovery.",
    tags: ["AI UX", "Decision systems", "Trust"],
    href: "/work/intuit-ai",
    coverLabel: "AI • System states • Trust",
    locked: true,
  },
];

function Divider() {
  return (
    <div className="py-10">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-600/25 to-transparent" />
    </div>
  );
}

function Button({
  href,
  children,
  external,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  primary?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 " +
    "active:scale-[0.99]";

  const primaryStyle =
    "bg-purple-700 text-white hover:bg-purple-800 shadow-[0_12px_28px_rgba(88,28,135,0.24)]";

  const secondaryStyle =
    "border border-neutral-200 bg-white text-neutral-900 hover:border-purple-300 hover:text-purple-800 " +
    "hover:shadow-[0_14px_40px_rgba(88,28,135,0.12)] hover:-translate-y-[1px]";

  const cls = base + " " + (primary ? primaryStyle : secondaryStyle);

  if (external) return <a href={href} className={cls} target="_blank" rel="noopener noreferrer" aria-label={typeof children === "string" ? `${children} (opens in new tab)` : undefined}>{children}</a>;
  return <Link href={href} className={cls}>{children}</Link>;
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      href={p.href}
      aria-label={`View project: ${p.title}`}
      className="group h-full block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 rounded-3xl"
    >
      <article className="relative h-full overflow-hidden rounded-3xl border border-neutral-200 bg-white transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(88,28,135,0.18)] ring-1 ring-neutral-200 group-hover:ring-purple-200">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(600px_circle_at_50%_-20%,rgba(147,51,234,0.18),transparent_60%)]" />
        {/* Cover */}
        <div className="relative aspect-[16/10] w-full">
          <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(147,51,234,0.22),transparent_55%),radial-gradient(800px_circle_at_80%_20%,rgba(0,0,0,0.10),transparent_60%)]" />
          <div className="absolute inset-6 rounded-2xl border border-white/40 bg-white/40 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/55 group-hover:backdrop-blur-sm" />
          <div className="absolute left-6 top-6">
            <span className="rounded-full border border-white/35 bg-white/45 px-3 py-1 text-xs text-neutral-900">
              {p.coverLabel}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-base font-semibold leading-snug text-neutral-900">{p.title}</h3>

            <div className="mt-[2px] flex items-center gap-2 text-purple-800">
              {p.locked ? <span aria-hidden title="Password protected">🔒</span> : null}
              <span aria-hidden className="text-sm transition duration-300 group-hover:translate-x-1 group-hover:scale-110">→</span>
            </div>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-neutral-700">{p.desc}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}

function Testimonial({
  quote,
  name,
  title,
  imageSrc,
  linkedin,
}: {
  quote: string;
  name: string;
  title: string;
  imageSrc: string;
  linkedin: string;
}) {
  return (
    <div className="rounded-3xl bg-neutral-50/70 p-6">
      <p className="text-sm leading-relaxed text-neutral-800">“{quote}”</p>

      <div className="mt-6 flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-neutral-100">
          <Image src={imageSrc} alt={name} fill className="object-cover" sizes="40px" />
        </div>

        <div className="leading-tight">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn (opens in new tab)`}
            className="text-sm font-semibold text-neutral-900 underline decoration-transparent underline-offset-4 transition hover:text-purple-800 hover:decoration-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 rounded"
          >
            {name}
          </a>
          <div className="text-xs text-neutral-700">{title}</div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="py-12 relative">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[rgba(2,6,23,0.60)]" />
      <div className="relative z-10">
      {/* Hero (more editorial, fewer pills) */}
      <header className="pt-10">
        <TypingText
          text="Hi, I’m Fan — thanks for stopping by."
          className="text-sm text-neutral-800"
        />
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-white px-3 py-1 text-xs text-purple-900">
          <span className="h-2 w-2 rounded-full bg-purple-700" />
          Complex systems • B2B SaaS • AI workflows
        </div>

        <h1 className="mt-8 text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          <span className="block opacity-0 hero-fadeup-1">Product designer who makes</span>
          <span className="block text-purple-800 opacity-0 hero-fadeup-2">
            complex systems feel simple.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-700">
          I design enterprise and platform experiences with clear information architecture,
          predictable system states, and trustworthy AI-assisted workflows.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/work" primary>View work</Button>
          <Button href="/resume">Download resume</Button>
          <Button href="mailto:fan.wang0607@gmail.com" external>Email</Button>
        </div>
      </header>

      <Divider />

      {/* Selected work (interactive list, not heavy cards) */}
      <section>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Case studies</h2>
          </div>

          <Link
            href="/work"
            className="text-sm text-neutral-700 underline underline-offset-4 hover:text-purple-800"
          >
            View all
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3 items-stretch">
          {projects.map((p) => (
            <ProjectCard key={p.href} p={p} />
          ))}
        </div>

        <p className="mt-3 text-xs text-neutral-700">
          🔒 Some work is password-protected for interview sharing.
        </p>
      </section>

      <Divider />

      {/* Testimonials (lighter, no “card grid” feel) */}
      <section>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">What collaborators say</h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Testimonial
            quote="Fan is a thoughtful collaborator who brings a creative yet analytical approach to problem-solving. I have no doubt she will continue to excel and make significant contributions."
            name="Maddie Brown"
            title="Head of Product Design at Publicis Production"
            imageSrc="/testimonials/maddie.png"
            linkedin="https://www.linkedin.com/in/maddie-brown-97329777/"
          />
          <Testimonial
            quote="Fan collaborated seamlessly with team members and consistently showed strong commitment to delivering high-quality work. She’s a great addition to any team."
            name="Karl Stahl"
            title="Associate Director, Experience Design"
            imageSrc="/testimonials/maddie.png"
            linkedin="https://linkedin.com"
          />
          <Testimonial
            quote="Fan is a passionate designer with strong research and design instincts. Her expertise leads to simple, effective solutions."
            name="Jeff Coombs"
            title="Senior Product Designer"
            imageSrc="/testimonials/maddie.png"
            linkedin="https://linkedin.com"
          />
        </div>
      </section>

      <Divider />

{/* Contact */}
<section id="contact" className="mt-16 pb-6">
  <div className="mx-auto max-w-3xl">
    <div className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      <div className="grid md:grid-cols-[160px_1fr]">

        {/* Left visual panel */}
        <div className="relative min-h-[160px] bg-[radial-gradient(700px_circle_at_30%_20%,rgba(147,51,234,0.22),transparent_55%),radial-gradient(700px_circle_at_80%_40%,rgba(0,0,0,0.12),transparent_60%)]">
          <div className="absolute inset-3 rounded-2xl border border-white/40 bg-white/35" />
        </div>

        {/* Right content */}
        <div className="p-8">
          <h2 className="text-3xl font-semibold tracking-tight">Fan Wang</h2>
          <p className="mt-1 text-sm text-neutral-800">
            Product designer // Toronto, Canada
          </p>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-800">
            If you’re hiring for complex systems, platforms, or AI workflows, I’d love to chat.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="mailto:fan.wang0607@gmail.com" external primary>
              Email me
            </Button>
            <Button href="https://www.linkedin.com/in/fanwang0607/" external>
              LinkedIn
            </Button>
            <Button href="/resume">Resume</Button>
          </div>
        </div>

      </div>
      <style jsx global>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Staggered headline entrance */
        .hero-fadeup-1 {
          animation: heroFadeUp 700ms ease-out 120ms forwards;
        }
        .hero-fadeup-2 {
          animation: heroFadeUp 700ms ease-out 320ms forwards;
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .hero-fadeup-1, .hero-fadeup-2 { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </div>
  </div>
</section>
</div>
    </div>
  );
}
