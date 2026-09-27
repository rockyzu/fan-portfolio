import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior product designer with a background in finance, focused on enterprise platforms, AI workflows, and regulated UX.",
  alternates: { canonical: "https://fanwang.ca/about" },
  openGraph: {
    title: "About Fan Wang",
    description:
      "Senior product designer with a background in finance, focused on enterprise platforms, AI workflows, and regulated UX.",
    url: "https://fanwang.ca/about",
  },
};

const principles = [
  {
    label: "Clarity over cleverness",
    body: "I design structure first — IA, system states, edge cases, and recovery — so complex products stay predictable under pressure.",
  },
  {
    label: "Trust is designed",
    body: "For AI-assisted UX, I make confidence, limits, and reasoning visible so people understand what the system is doing and why.",
  },
  {
    label: "Accessibility is baseline",
    body: "I design to WCAG in regulated contexts so experiences are inclusive and durable — not just technically compliant.",
  },
];

const focus = [
  "Enterprise workflow design",
  "Information architecture",
  "AI decision support",
  "Regulated UX",
  "Platform integration",
  "Design systems",
  "Multi-role collaboration",
  "B2B SaaS",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen text-white">
      <PageBackground />

      <div className="relative mx-auto max-w-5xl px-6 py-16">

        {/* ── HERO ── */}
        <header className="flex flex-col sm:flex-row items-start gap-8 sm:gap-10">
          {/* Photo */}
          <div className="relative h-28 w-28 sm:h-36 sm:w-36 shrink-0 overflow-hidden rounded-2xl border border-white/12 bg-white/5 shadow-[0_16px_48px_rgba(0,0,0,0.55)]">
            <Image
              src="/me.jpg"
              alt="Fan Wang"
              fill
              sizes="144px"
              className="object-cover"
              priority
            />
          </div>

          {/* Identity */}
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-white/45 uppercase">
              Fan Wang · Product Designer
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-semibold leading-[1.1] tracking-tight text-white">
              I design products people rely on<br className="hidden sm:block" /> to make decisions.
            </h1>
            <p className="mt-4 max-w-xl text-[16px] leading-7 text-white/70">
              Enterprise platforms and AI workflows — where clarity, recovery, and trust matter more than novelty.
            </p>
            <p className="mt-2 text-sm text-white/45">
              Currently designing enterprise tax platform experiences at KPMG Canada.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/work"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/16 hover:border-white/35 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
              >
                See selected work
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/14 bg-transparent px-5 py-2.5 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/8 hover:border-white/25 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
              >
                Resume (PDF)
              </a>
            </div>
          </div>
        </header>

        {/* ── FOCUS AREAS ── */}
        <section className="mt-16 border-t border-white/[0.08] pt-12">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-white/35 uppercase">
            Focus areas
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {focus.map((f) => (
              <span
                key={f}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[13px] text-white/65"
              >
                {f}
              </span>
            ))}
          </div>
        </section>

        {/* ── HOW I WORK ── */}
        <section className="mt-14 border-t border-white/[0.08] pt-12">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-white/35 uppercase">
            How I work
          </p>
          <div className="mt-6 space-y-0 divide-y divide-white/[0.07]">
            {principles.map((p) => (
              <div key={p.label} className="grid sm:grid-cols-[220px_1fr] gap-x-10 gap-y-1.5 py-5 first:pt-0">
                <div className="text-[14px] font-semibold text-white/90 leading-snug">
                  {p.label}
                </div>
                <p className="text-[14px] leading-[1.65] text-white/55">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BACKGROUND ── */}
        <section className="mt-14 border-t border-white/[0.08] pt-12">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-white/35 uppercase">
            Background
          </p>
          <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-7 text-white/65">
            <p>I started my career in finance, not design.</p>
            <p>
              Working with clients, I kept seeing the same pattern: people weren't making bad
              decisions — they were navigating confusing systems. The rules were correct, but the
              experience was cognitively overwhelming.
            </p>
            <p>
              That pushed me into product design. Today I build decision workflows and platforms
              that make the next step obvious, support recovery when things go wrong, and help
              teams ship with confidence.
            </p>
            <p className="text-white/35">
              Currently pursuing the IAAP CPACC certification to deepen expertise in inclusive design.
            </p>
          </div>
          <p className="mt-8 text-[13px] text-white/30">
            Outside work — tennis, snowboarding, LEGO, and perfecting latte art.
          </p>
        </section>

      </div>
    </div>
  );
}
