import type { Metadata } from "next";
import Link from "next/link";
import PageBackground from "@/components/PageBackground";
import { ProjectCard, type ProjectItem } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "KPMG — Enterprise Tax Platform Work",
  description:
    "Enterprise product design work at KPMG — complex workflows, platform integration, and tax technology experiences.",
  alternates: { canonical: "https://fanwang.ca/work/kpmg" },
  openGraph: {
    title: "KPMG — Enterprise Tax Platform Work — Fan Wang",
    description:
      "Enterprise product design work at KPMG — complex workflows, platform integration, and tax technology experiences.",
    url: "https://fanwang.ca/work/kpmg",
  },
  robots: { index: true, follow: true },
};

const FEATURED: ProjectItem = {
  number: "01",
  domain: "Platform Integration · Enterprise Workflow",
  title: "Integrating a Specialized Tax Workflow",
  desc: "Exploring how a standalone surplus calculation experience could become part of a unified enterprise tax platform while preserving workflow independence and aligning with existing platform patterns.",
  href: "/work/surplus-calculator",
  locked: true,
  ctaLabel: "View Case Study",
};

const SECONDARY: { item: ProjectItem; placeholderVariant: number }[] = [
  {
    item: {
      number: "02",
      domain: "Workflow Management · Operational UX",
      title: "Making Complex Work Visible",
      desc: "Reframing service-team activities into a clearer task-based workflow so users can understand ownership, progress, and what requires attention.",
      comingSoon: true,
    },
    placeholderVariant: 1,
  },
  {
    item: {
      number: "03",
      domain: "Wealth & Asset Management",
      title: "WAM — Enterprise Platform",
      desc: "Platform design for enterprise wealth and asset management services at KPMG.",
      comingSoon: true,
    },
    placeholderVariant: 2,
  },
];

export default function KpmgHubPage() {
  return (
    <div className="min-h-screen text-white">
      <PageBackground />

      <div className="relative mx-auto max-w-7xl px-6 py-20">

        {/* Back nav */}
        <div className="mb-8">
          <Link
            href="/work"
            aria-label="Back to all work"
            className="inline-flex items-center gap-1.5 text-[13px] text-white/35 hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30 rounded"
          >
            <span aria-hidden>←</span>
            <span>Work</span>
          </Link>
        </div>

        {/* Hero */}
        <header className="max-w-3xl">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40">
            KPMG
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            Enterprise Tax Platform Work
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/65 max-w-2xl">
            Designing complex workflows, platform integrations, and enterprise experiences across a growing tax technology ecosystem.
          </p>
          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
            <div>
              <dt className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/35">Role</dt>
              <dd className="mt-1 text-[13px] text-white/70">Product Designer / UX Designer</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/35">Focus</dt>
              <dd className="mt-1 text-[13px] text-white/70">Enterprise Platforms · Complex Workflows · Tax Technology</dd>
            </div>
          </dl>
        </header>

        {/* Context */}
        <section className="mt-12 border-t border-white/[0.08] pt-10 max-w-2xl">
          <p className="text-[15px] leading-[1.75] text-white/55">
            My work at KPMG Ignition Tax spans multiple initiatives across enterprise tax products and platforms. One Port is one of the primary platforms I contribute to, alongside other initiatives with distinct product and business contexts. Together, this body of work covers platform integration, workflow design, and operational UX — addressing different problems while operating within the broader Ignition Tax ecosystem.
          </p>
        </section>

        {/* Featured project */}
        <section className="mt-12">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/30">
            Featured Project
          </p>
          <div className="mt-5">
            <ProjectCard item={FEATURED} imageAspect="featured" placeholderVariant={0} />
          </div>
        </section>

        {/* Secondary projects */}
        <section className="mt-8">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/30">
            More from KPMG
          </p>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            {SECONDARY.map(({ item, placeholderVariant }) => (
              <ProjectCard
                key={item.number}
                item={item}
                placeholderVariant={placeholderVariant}
              />
            ))}
          </div>
        </section>

        {/* Explore more work */}
        <section
          className="mt-24 border-t border-white/[0.08] pt-16 pb-20"
          aria-labelledby="explore-heading"
        >
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/30">
            Explore more work
          </p>

          <div className="mt-6">
            <Link
              href="/work/olg"
              aria-label="View case study: OLG Corporate Website Redesign"
              className="group inline-flex items-end gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
            >
              <h2
                id="explore-heading"
                className="text-2xl sm:text-3xl font-semibold tracking-tight text-white transition-colors duration-200 group-hover:text-white/80"
              >
                OLG Corporate Website Redesign
              </h2>
              <span
                aria-hidden
                className="mb-1 flex-none text-[22px] leading-none text-white/25 transition-all duration-200 group-hover:text-white/65 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-white/55">
            Restructuring a 3,000-page regulated content platform around user intent — IA strategy, stakeholder alignment, and scalable governance.
          </p>

          <p className="mt-4 inline-flex items-center gap-1.5 text-[12px] text-white/30">
            <span aria-hidden>🔒</span>
            <span>Password protected</span>
          </p>
        </section>

      </div>
    </div>
  );
}
