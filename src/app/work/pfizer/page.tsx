"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function LearnerCertificationFlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) { setActive(true); io.disconnect(); }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const steps = [
    { n: "01", label: "Enroll", sub: "Learner assigned to program" },
    { n: "02", label: "Complete", sub: "Courses and modules tracked" },
    { n: "03", label: "Progress", sub: "State visible to all roles" },
    { n: "04", label: "Certify", sub: "Rules-based completion" },
    { n: "05", label: "Comply", sub: "Admin audit-ready record" },
  ];

  return (
    <div ref={ref} className="mt-8 overflow-x-auto pb-2">
      <div className="flex items-start min-w-[520px]">
        {steps.map((s, i) => (
          <React.Fragment key={s.n}>
            <div
              className={[
                "flex flex-col items-center text-center flex-1 transition-all duration-500 ease-out motion-reduce:transition-none",
                active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
              style={{ transitionDelay: active ? `${i * 110}ms` : "0ms" }}
            >
              <div
                className={[
                  "flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-semibold transition-all duration-500 motion-reduce:transition-none",
                  active
                    ? "bg-[#562499] text-white shadow-[0_0_0_5px_rgba(86,36,153,0.10)]"
                    : "bg-neutral-100 text-neutral-400",
                ].join(" ")}
                style={{ transitionDelay: active ? `${i * 110}ms` : "0ms" }}
              >
                {s.n}
              </div>
              <div className="mt-3 text-[12px] font-semibold text-neutral-900 leading-tight">{s.label}</div>
              <p className="mt-1 text-[11px] leading-[1.5] text-neutral-500 max-w-[96px]">{s.sub}</p>
            </div>
            {i < steps.length - 1 && (
              <div
                aria-hidden
                className={[
                  "mt-[17px] shrink-0 px-1 text-neutral-300 text-xs transition-opacity duration-300 motion-reduce:transition-none",
                  active ? "opacity-100" : "opacity-0",
                ].join(" ")}
                style={{ transitionDelay: active ? `${i * 110 + 70}ms` : "0ms" }}
              >
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/** Single content width so titles, paragraphs, and images align. */
const CONTENT_MAX = "max-w-5xl";

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={
        "transform-gpu transition-all duration-700 ease-out motion-reduce:transition-none " +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8") +
        (className ? " " + className : "")
      }
    >
      {children}
    </div>
  );
}

function Figure({
  src,
  alt,
  caption,
  aspect = "16/9",
}: {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "16/9" | "4/3";
}) {
  const aspectClass = aspect === "16/9" ? "aspect-[16/9]" : "aspect-[4/3]";
  return (
    <figure className="mt-12 first:mt-8">
      <div
        className={[
          "group relative w-full overflow-hidden rounded-2xl bg-neutral-100",
          aspectClass,
        ].join(" ")}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
          sizes="(min-width: 1200px) 980px, (min-width: 768px) 88vw, 94vw"
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(700px_circle_at_18%_15%,rgba(86,36,153,0.06),transparent_60%)]" />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-xs leading-relaxed text-neutral-600">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function TOC() {
  const links = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "insights", label: "Research Insights" },
    { id: "challenge", label: "Design Challenge" },
    { id: "architecture", label: "System Architecture" },
    { id: "workflows", label: "Key Workflows" },
    { id: "solutions", label: "Interface Solutions" },
    { id: "outcomes", label: "Outcomes" },
    { id: "reflection", label: "Reflection" },
  ];

  return (
    <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
      <div className="overflow-hidden rounded-2xl border border-[#562499]/15 bg-white/90 backdrop-blur-md px-3 py-3">
        <div className="text-[11px] font-semibold tracking-[0.16em] text-[#562499]">
          ON THIS PAGE
        </div>
        <nav className="mt-3 space-y-1">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="group flex min-w-0 items-center gap-2 rounded-lg px-2 py-2 text-[12px] text-neutral-700 transition hover:bg-[#562499]/10 hover:text-[#562499] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#562499]/50 focus-visible:ring-offset-2"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300 transition group-hover:bg-[#562499]" />
              <span className="min-w-0 truncate transition group-hover:translate-x-[2px]" title={l.label}>
                {l.label}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function EditorialSection({
  id,
  eyebrow,
  title,
  lead,
  intro,
  intro2,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  intro?: string;
  intro2?: string;
  children?: React.ReactNode;
}) {
  const introClass = "w-full text-[15px] leading-7 text-neutral-700";
  const introMargin = lead ? "mt-3" : "mt-5";
  return (
    <section id={id} className="scroll-mt-28 border-t border-neutral-200/70 pt-20 pb-10 first:border-t-0 first:pt-12">
      {eyebrow ? (
        <div className="text-[11px] font-semibold tracking-[0.18em] text-[#562499] uppercase">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-2 text-[26px] font-semibold tracking-tight text-neutral-900 sm:text-[28px]">
        {title}
      </h2>
      {lead ? (
        <p className="mt-5 w-full text-[15px] font-semibold leading-7 text-neutral-900">{lead}</p>
      ) : null}
      {intro ? (
        <p className={`${introMargin} ${introClass}`}>{intro}</p>
      ) : null}
      {intro2 ? (
        <p className="mt-3 w-full text-[15px] leading-7 text-neutral-700">{intro2}</p>
      ) : null}
      {children}
    </section>
  );
}

export default function PfizerCaseStudyPage() {
  return (
    <main className="min-h-screen text-neutral-900">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8">
          <Link
            href="/work"
            aria-label="Back to work"
            className="nav-link inline-flex items-center gap-3 text-sm text-neutral-700 hover:text-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600/50 focus-visible:ring-offset-2 rounded"
          >
            <span aria-hidden>←</span>
            <span>Back to Work</span>
          </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-[180px_1fr]">
          <TOC />

          <article className={`min-w-0 ${CONTENT_MAX}`}>
            {/* HERO */}
            <Reveal>
            <header className="pt-2 pb-4">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#562499] uppercase">
                Pfizer · Enterprise SaaS Platform
              </p>
              <h1 className="mt-4 text-[1.875rem] sm:text-[2.4rem] md:text-[2.75rem] lg:text-[3.25rem] font-semibold leading-[1.1] tracking-tight text-neutral-900">
                Pfizer Global Learning Platform
              </h1>
              <p className="mt-5 text-lg leading-[1.65] text-neutral-800 max-w-2xl">
                Three disconnected tools replaced by one platform — designed around how healthcare professionals actually learn, track progress, and certify.
              </p>
              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-[13px] text-neutral-700">
                <div>
                  <dt className="text-[10px] font-semibold tracking-[0.16em] uppercase text-neutral-400">Role</dt>
                  <dd className="mt-0.5">Lead Product Designer</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold tracking-[0.16em] uppercase text-neutral-400">Scope</dt>
                  <dd className="mt-0.5">Platform UX, IA, compliance workflows</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold tracking-[0.16em] uppercase text-neutral-400">Platform</dt>
                  <dd className="mt-0.5">Global B2B SaaS · Healthcare</dd>
                </div>
              </dl>
              <div className="mt-10">
                <Figure
                  src="/covers/pfizer.png"
                  alt="Concept overview of the global learning platform interface and system structure"
                  caption="Platform overview: training, progress, and compliance in one system."
                  aspect="16/9"
                />
              </div>
            </header>
            </Reveal>

            {/* OVERVIEW */}
            <Reveal>
            <EditorialSection
              id="overview"
              title="Overview"
              lead="One platform serves three roles: learners, program managers, and administrators."
              intro="The system manages learning programs, course modules, certification tracking, and compliance reporting for global healthcare training at Pfizer."
            >
              <ul className="mt-8 space-y-2.5 w-full text-[15px] leading-7 text-neutral-700 list-disc list-inside pl-2">
                <li><strong className="text-neutral-900">Learners</strong> — Healthcare professionals completing required training programs.</li>
                <li><strong className="text-neutral-900">Program managers</strong> — Organize courses and monitor progress.</li>
                <li><strong className="text-neutral-900">Administrators</strong> — Oversee certification compliance and reporting.</li>
              </ul>
            </EditorialSection>
            </Reveal>

            {/* PROBLEM */}
            <Reveal>
            <EditorialSection
              id="problem"
              title="Problem"
              lead="Training lived in multiple tools—no single place to see progress or compliance."
              intro="Three issues drove the redesign."
            >
              <ul className="mt-8 space-y-2.5 w-full text-[15px] leading-7 text-neutral-700 list-disc list-inside pl-2">
                <li><strong className="text-neutral-900">Fragmented systems</strong> — Content, certification tracking, and reporting were spread across separate tools.</li>
                <li><strong className="text-neutral-900">Limited progress visibility</strong> — Learners could not see required courses or training status in one place.</li>
                <li><strong className="text-neutral-900">Weak compliance tooling</strong> — Admins lacked clear tools to track certification completion across teams.</li>
              </ul>
            </EditorialSection>
            </Reveal>

            {/* RESEARCH INSIGHTS */}
            <Reveal>
            <EditorialSection
              id="insights"
              title="Research Insights"
              lead="Users needed visibility; managers needed control; the business needed audit-ready compliance."
              intro="Findings drove the information architecture and role-based workflows."
            >
              <ul className="mt-8 space-y-2.5 w-full text-[15px] leading-7 text-neutral-700 list-disc list-inside pl-2">
                <li><strong className="text-neutral-900">Learning visibility</strong> — Users needed a clear overview of assigned courses and progress.</li>
                <li><strong className="text-neutral-900">Administrative control</strong> — Program managers needed tools to organize programs and monitor participation.</li>
                <li><strong className="text-neutral-900">Compliance tracking</strong> — Regulated healthcare training requires accurate reporting and certification records.</li>
              </ul>
            </EditorialSection>
            </Reveal>

            {/* DESIGN CHALLENGE */}
            <Reveal>
            <EditorialSection
              id="challenge"
              title="Design Challenge"
              lead="We had to solve for information architecture, a clear state model, and distinct workflows per role."
              intro="Hierarchy (programs → courses → modules), progress states, and compliance reporting had to be first-class and visible."
            >
              <ul className="mt-8 space-y-2.5 w-full text-[15px] leading-7 text-neutral-700 list-disc list-inside pl-2">
                <li><strong className="text-neutral-900">Information architecture</strong> — Programs contain courses and dependencies; certification rules must be explicit.</li>
                <li><strong className="text-neutral-900">State model</strong> — Track learner progress through enrolled, in progress, completed, and certified.</li>
                <li><strong className="text-neutral-900">Multi-role workflows</strong> — Learners, program managers, and admins each need distinct paths and entry points.</li>
              </ul>
            </EditorialSection>
            </Reveal>

            {/* SYSTEM ARCHITECTURE */}
            <Reveal>
            <EditorialSection
              id="architecture"
              title="System Architecture"
              lead="One model: programs → courses → modules; enrollment and certification derive from it."
              intro="Enrollment ties learner to program and carries state; certification follows completion rules."
              intro2="The same model drives learner progress and admin reporting—no duplicate logic."
            >
              <LearnerCertificationFlow />
              <div className="mt-8">
                <Figure
                  src="/work/pfizer/ia.png"
                  alt="Information architecture diagram showing relationships between programs, courses, enrollments, and certifications"
                  caption="Single model: programs → courses → modules; enrollment and certification derive from it."
                  aspect="16/9"
                />
              </div>
            </EditorialSection>
            </Reveal>

            {/* KEY WORKFLOWS */}
            <Reveal>
            <EditorialSection
              id="workflows"
              title="Key Workflows"
              lead="Learners complete training; managers assign and monitor; admins ensure compliance."
              intro="Each role has a distinct path and entry point—no one-size-fits-all screens."
            >
              <ul className="mt-8 space-y-2.5 w-full text-[15px] leading-7 text-neutral-700 list-disc list-inside pl-2">
                <li><strong className="text-neutral-900">Learner</strong> — Enroll in programs, complete courses, track certification progress.</li>
                <li><strong className="text-neutral-900">Program manager</strong> — Organize programs, assign courses, monitor completion.</li>
                <li><strong className="text-neutral-900">Administrator</strong> — Review certification records and ensure requirements are met.</li>
              </ul>
            </EditorialSection>
            </Reveal>

            {/* INTERFACE SOLUTIONS */}
            <Reveal>
            <EditorialSection
              id="solutions"
              title="Interface Solutions"
              lead="Dashboard, progress states, and program navigation—each role gets what it needs in one place."
              intro="The UI surfaces the data model: where you are, what’s required, what’s next. Reusable patterns (cards, status indicators, navigation) keep the product consistent as programs and users scale."
            >
              <ul className="mt-8 space-y-2.5 w-full text-[15px] leading-7 text-neutral-700 list-disc list-inside pl-2">
                <li><strong className="text-neutral-900">Dashboard</strong> — Single view for assigned courses, progress, and upcoming requirements.</li>
                <li><strong className="text-neutral-900">Progress tracking</strong> — Explicit states (enrolled, in progress, completed, certified) so learners and admins share one truth.</li>
                <li><strong className="text-neutral-900">Program navigation</strong> — Structured course layouts for complex training programs.</li>
              </ul>
              <div className="mt-10 space-y-12">
                <Figure
                  src="/work/pfizer/dashboard.png"
                  alt="Pfizer dashboard screen"
                  caption="Learner dashboard: assigned courses, progress, and next steps in one view."
                  aspect="16/9"
                />
                <Figure
                  src="/work/pfizer/progress.png"
                  alt="Progress and state logic"
                  caption="Explicit states (enrolled, in progress, completed, certified)—learners and admins share one truth."
                  aspect="16/9"
                />
                <Figure
                  src="/work/pfizer/system.png"
                  alt="Design system patterns"
                  caption="Shared navigation and status patterns so new programs and regions scale without new UI."
                  aspect="16/9"
                />
              </div>
            </EditorialSection>
            </Reveal>

            {/* OUTCOMES */}
            <Reveal>
            <EditorialSection
              id="outcomes"
              title="Outcomes"
              lead="Learners see their path; admins get one source of truth; the platform scales without redesign."
              intro="Value across all three roles."
            >
              <ul className="mt-8 space-y-2.5 w-full text-[15px] leading-7 text-neutral-700 list-disc list-inside pl-2">
                <li><strong className="text-neutral-900">Improved learning visibility</strong> — Healthcare professionals can track required training and progress in one place.</li>
                <li><strong className="text-neutral-900">Simplified program management</strong> — Admins have centralized tools for training programs and certification records.</li>
                <li><strong className="text-neutral-900">Scalable platform structure</strong> — Architecture supports new programs and global users without redesign.</li>
              </ul>
            </EditorialSection>
            </Reveal>

            {/* REFLECTION */}
            <Reveal>
            <EditorialSection
              id="reflection"
              title="Reflection"
              lead="Enterprise design is system design—not just screens."
              intro="Success depended on aligning IA, role-based workflows, and progress tracking into one platform."
              intro2="The leverage was the shared model and consistent UI; isolated features would not have fixed fragmentation."
            >
              <div className="mt-16 md:mt-20">
                <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                  Next case study
                </h2>
                <p className="mt-2 w-full text-sm leading-relaxed text-neutral-600">
                  Designing an AI agent for ambiguous tax decisions and guided filing.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/work"
                  className="inline-flex items-center justify-center rounded-xl border border-[#562499]/25 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-[#562499]/10 hover:border-[#562499]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#562499]/50 focus-visible:ring-offset-2"
                >
                  Back to Work
                </Link>
                <Link
                  href="/work/intuit-ai"
                  className="inline-flex items-center justify-center rounded-xl border border-[#562499]/25 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-[#562499]/10 hover:border-[#562499]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#562499]/50 focus-visible:ring-offset-2"
                >
                  Next: Intuit AI →
                </Link>
                </div>
              </div>
            </EditorialSection>
            </Reveal>
          </article>
        </div>
      </div>
    </main>
  );
}
