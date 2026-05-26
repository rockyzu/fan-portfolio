"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CaseStudyFigure } from "@/components/CaseStudyFigure";

function HeroIAComparison() {
  const before = [
    { label: "About OLG", children: ["History", "Leadership", "Values", "Annual Reports"] },
    { label: "Corporate Responsibility", children: ["Environment", "Community", "Responsible Gambling"] },
    { label: "For Business", children: ["Lottery Retail", "Gaming Facilities", "Partnerships"] },
    { label: "Media", children: ["News", "Press Releases", "Media Kit"] },
  ];

  const after = [
    { label: "Who we are", children: ["About", "Governance", "Reports"], accent: true },
    { label: "What we offer", children: ["Gaming", "Lottery", "Partnerships"], accent: true },
    { label: "Responsibility", children: ["Community", "Environment", "Safe Play"], accent: true },
    { label: "Media & Investors", children: ["News", "Publications", "Contact"], accent: true },
  ];

  const Col = ({ label, children: items, accent = false }: { label: string; children: string[]; accent?: boolean }) => (
    <div className="flex-1 min-w-0">
      <div className={`rounded-lg px-3 py-2 text-[11px] font-semibold leading-snug ${
        accent
          ? "bg-[#4F46E5]/8 border border-[#4F46E5]/20 text-[#4F46E5]"
          : "bg-neutral-100 border border-neutral-200 text-neutral-500"
      }`}>
        {label}
      </div>
      <div className="mt-1.5 ml-2 space-y-1">
        {items.map((item) => (
          <div key={item} className={`text-[10px] leading-snug ${accent ? "text-neutral-600" : "text-neutral-400"}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <figure className="mt-10 md:mt-12">
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-6 py-7 md:px-8 md:py-8">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-start">

          {/* Before */}
          <div>
            <div className="mb-4 text-[10px] font-semibold tracking-[0.18em] text-neutral-400 uppercase">Before — Org-driven</div>
            <div className="grid grid-cols-2 gap-2">
              {before.map((g) => <Col key={g.label} label={g.label}>{g.children}</Col>)}
            </div>
          </div>

          {/* Divider */}
          <div className="flex flex-col items-center pt-6 gap-1.5 self-start">
            <div className="w-px h-8 bg-neutral-300" />
            <div className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400 rotate-0">→</div>
            <div className="w-px h-8 bg-neutral-300" />
          </div>

          {/* After */}
          <div>
            <div className="mb-4 text-[10px] font-semibold tracking-[0.18em] text-[#4F46E5] uppercase">After — Intent-driven</div>
            <div className="grid grid-cols-2 gap-2">
              {after.map((g) => <Col key={g.label} label={g.label} accent>{g.children}</Col>)}
            </div>
          </div>

        </div>
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-neutral-500">
        Navigation restructured around user intent — from org-chart hierarchy to task-based groupings.
      </figcaption>
    </figure>
  );
}

function ContentGovernanceDiagram() {
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

  const columns = [
    {
      label: "Content",
      sub: "As inherited",
      nodes: ["Org-driven pages", "Fragmented ownership", "No shared labels"],
      tone: "border-red-100 bg-red-50/60 text-neutral-700",
    },
    {
      label: "IA",
      sub: "Restructured",
      nodes: ["Intent-based groups", "Consolidated hierarchy", "Standardized labels"],
      tone: "border-indigo-100 bg-indigo-50/60 text-neutral-700",
    },
    {
      label: "Governance",
      sub: "Established",
      nodes: ["Clear ownership", "Publishing rules", "Scalable patterns"],
      tone: "border-emerald-100 bg-emerald-50/60 text-neutral-700",
    },
  ];

  return (
    <div ref={ref} className="mt-10 overflow-x-auto pb-2">
      <div className="flex items-start min-w-[440px]">
        {columns.map((col, ci) => (
          <React.Fragment key={col.label}>
            <div
              className={[
                "flex-1 transition-all duration-500 ease-out motion-reduce:transition-none",
                active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
              style={{ transitionDelay: active ? `${ci * 120}ms` : "0ms" }}
            >
              <div className="text-center mb-3">
                <div className="text-[11px] font-semibold tracking-[0.18em] text-neutral-400 uppercase">{col.label}</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">{col.sub}</div>
              </div>
              <div className="mx-2 space-y-2">
                {col.nodes.map((node) => (
                  <div
                    key={node}
                    className={["rounded-lg border px-3 py-2.5 text-center text-[12px] leading-snug", col.tone].join(" ")}
                  >
                    {node}
                  </div>
                ))}
              </div>
            </div>
            {ci < columns.length - 1 && (
              <div
                aria-hidden
                className={[
                  "flex-none w-8 flex items-center justify-center pt-8 text-neutral-300 text-sm transition-opacity duration-300 motion-reduce:transition-none",
                  active ? "opacity-100" : "opacity-0",
                ].join(" ")}
                style={{ transitionDelay: active ? `${ci * 120 + 80}ms` : "0ms" }}
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

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
      style={{ transitionDelay: `${delay}ms` }}
      className={
        "transform-gpu transition-all duration-700 ease-out motion-reduce:transition-none " +
        (visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8")
      }
    >
      {children}
    </div>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

function CountUp({
  value,
  suffix = "",
  className = "",
  durationMs = 900,
}: {
  value: number;
  suffix?: string;
  className?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || done) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();

        if (reduced) {
          setDisplay(value);
          setDone(true);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(eased * value));
          if (t < 1) requestAnimationFrame(tick);
          else setDone(true);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.2, rootMargin: "0px 0px -15% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [value, durationMs, reduced, done]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={`${value}${suffix}`}
    >
      {display}
      {suffix}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
      className="h-1 w-full overflow-hidden rounded-full bg-neutral-200/70"
    >
      <div
        className="h-full rounded-full bg-[#4F46E5] transition-[width] duration-200 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}


const ACCENT = "text-[#4F46E5]";
/** Single content width so paragraphs and images align. */
const CONTENT_MAX = "max-w-5xl";
const BODY_MAX = "w-full";

function CaseStudyHero({
  eyebrow,
  title,
  summary,
  supportingStatement,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  supportingStatement?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="pt-2 pb-4 md:pt-6 md:pb-8">
      <Reveal delay={50}>
        <p className={`text-[13px] font-medium tracking-[0.12em] uppercase ${ACCENT}`}>{eyebrow}</p>
        <h1 className="mt-4 text-[1.875rem] sm:text-[2.4rem] md:text-[2.75rem] font-semibold leading-[1.1] tracking-tight text-neutral-900 lg:text-[4rem] xl:text-[4.5rem]">
          {title}
        </h1>
        <p className="mt-6 text-lg md:text-xl leading-[1.6] text-neutral-800 w-full">
          {summary}
        </p>
        {supportingStatement ? (
          <p className="mt-3 text-base text-neutral-600 w-full">{supportingStatement}</p>
        ) : null}
        {children ? <div className="mt-12">{children}</div> : null}
      </Reveal>
    </header>
  );
}

function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 pt-20 md:pt-28 ${className}`}>
      <Reveal>
        {eyebrow ? (
          <p className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${ACCENT}`}>{eyebrow}</p>
        ) : null}
        <h2 className="mt-3 text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-semibold tracking-tight text-neutral-900 leading-tight">
          {title}
        </h2>
        {lead ? (
          <p className={`mt-5 ${BODY_MAX} text-lg leading-[1.65] text-neutral-800 font-medium`}>{lead}</p>
        ) : null}
        <div className="mt-10 md:mt-12">{children}</div>
      </Reveal>
    </section>
  );
}

function ExecutiveSummary({
  metadata,
  problem,
  complexity,
  led,
  changed,
}: {
  metadata?: { label: string; value: string }[];
  problem: string;
  complexity: string;
  led: string;
  changed: string;
}) {
  return (
    <section className="border-t border-b border-neutral-200/90 py-10 md:py-12">
      <p className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${ACCENT}`}>Executive summary</p>

      {/* Top metadata row */}
      {metadata && metadata.length > 0 ? (
        <dl className="mt-5 flex flex-wrap gap-x-12 gap-y-4 text-[13px] md:text-[13px] text-neutral-800">
          {metadata.map(({ label, value }) => (
            <div key={label} className="min-w-[11rem]">
              <dt className="text-[10px] font-semibold tracking-[0.16em] text-neutral-400 uppercase">
                {label}
              </dt>
              <dd className="mt-1 leading-[1.6]">{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {/* Main narrative flow: Problem → Complexity → What I led → Outcome */}
      <dl className="mt-8 md:mt-10 grid gap-8 md:gap-10 lg:grid-cols-4 text-[14px] md:text-[15px]">
        <div className="space-y-2">
          <dt className="text-[11px] font-semibold tracking-[0.18em] text-neutral-500 uppercase">
            Problem
          </dt>
          <dd className="leading-[1.7] text-neutral-800">
            {problem}
          </dd>
        </div>
        <div className="space-y-2">
          <dt className="text-[11px] font-semibold tracking-[0.18em] text-neutral-500 uppercase">
            Complexity
          </dt>
          <dd className="leading-[1.7] text-neutral-800">
            {complexity}
          </dd>
        </div>
        <div className="space-y-2">
          <dt className="text-[11px] font-semibold tracking-[0.18em] text-neutral-500 uppercase">
            What I led
          </dt>
          <dd className="leading-[1.7] text-neutral-800">
            {led}
          </dd>
        </div>
        <div className="space-y-2">
          <dt className={`text-[11px] font-semibold tracking-[0.18em] uppercase ${ACCENT}`}>
            Outcome
          </dt>
          <dd className="leading-[1.7] text-neutral-900 rounded-xl border border-[#4F46E5]/20 bg-[#4F46E5]/5 px-4 py-3">
            {changed}
          </dd>
        </div>
      </dl>
    </section>
  );
}

function ConstraintGrid({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <div className="grid gap-5 md:gap-6 sm:grid-cols-2 w-full">
      {items.map(({ title }) => (
        <div
          key={title}
          className="rounded-xl border border-neutral-200 bg-white/80 px-5 py-4 md:px-6 md:py-5"
        >
          <h3 className="text-[15px] md:text-[16px] font-semibold tracking-tight text-neutral-900">
            {title}
          </h3>
        </div>
      ))}
    </div>
  );
}

function InsightCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-12 border-l-4 border-[#4F46E5] pl-6 md:pl-8 py-1">
      <p className={`${BODY_MAX} text-lg leading-[1.65] text-neutral-900 font-medium`}>
        {children}
      </p>
    </div>
  );
}

function StrategicPrinciplesSteps({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <div className="w-full divide-y divide-neutral-200">
      {items.map(({ title, body }, i) => (
        <div
          key={title}
          className="grid grid-cols-[2rem_1fr] md:grid-cols-[2.5rem_11rem_1fr] gap-x-5 md:gap-x-8 py-6 md:py-7 items-baseline"
        >
          <span className="text-[11px] font-semibold tracking-[0.18em] text-[#4F46E5] tabular-nums pt-px select-none">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="text-[15px] md:text-[16px] font-semibold tracking-tight text-neutral-900 leading-snug">
            {title}
          </h3>
          <p className="col-start-2 md:col-start-3 mt-1.5 md:mt-0 text-[13px] md:text-[14px] leading-[1.65] text-neutral-600">
            {body}
          </p>
        </div>
      ))}
    </div>
  );
}

function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  caption,
  aspect = "16/9",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  caption?: string;
  aspect?: "16/9" | "4/3" | "3/2";
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (isDragging.current) updateFromClientX(e.clientX);
    };
    const onUp = () => { isDragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const aspectClass =
    aspect === "4/3" ? "aspect-[4/3]" :
    aspect === "3/2" ? "aspect-[3/2]" :
    "aspect-[16/9]";

  return (
    <figure className="mt-10 md:mt-12">
      {/* Accessible range input sits above the visual, invisible */}
      <label className="sr-only" htmlFor="ba-slider">
        Slide to compare before and after information architecture
      </label>
      <div
        ref={containerRef}
        role="group"
        aria-label="Before and after comparison"
        className={[
          "relative w-full overflow-hidden rounded-2xl select-none touch-none cursor-col-resize",
          "border border-neutral-200",
          "shadow-[0_18px_50px_rgba(15,23,42,0.08),0_2px_8px_rgba(15,23,42,0.04)]",
          aspectClass,
        ].join(" ")}
        onMouseDown={(e) => {
          isDragging.current = true;
          updateFromClientX(e.clientX);
        }}
        onTouchStart={(e) => updateFromClientX(e.touches[0].clientX)}
        onTouchMove={(e) => {
          e.preventDefault();
          updateFromClientX(e.touches[0].clientX);
        }}
      >
        {/* After image — base layer, always full width */}
        <div className="absolute inset-0">
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            unoptimized
            sizes="(min-width: 1200px) 900px, 94vw"
            className="object-cover object-top"
          />
        </div>

        {/* Before image — clipped from the right to reveal after */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden
        >
          <Image
            src={beforeSrc}
            alt=""
            fill
            unoptimized
            sizes="(min-width: 1200px) 900px, 94vw"
            className="object-cover object-top"
          />
        </div>

        {/* Divider line — white with shadow for contrast on any image */}
        <div
          className="pointer-events-none absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
          style={{ left: `${position}%` }}
          aria-hidden
        >
          {/* Handle — solid white, dark border, strong shadow for WCAG contrast */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-neutral-800/70 shadow-[0_2px_8px_rgba(0,0,0,0.28)] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M4 3L1.5 7L4 11" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 3L12.5 7L10 11" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Before label */}
        <div
          aria-hidden
          className={[
            "pointer-events-none absolute top-3.5 left-3.5 rounded-full px-2.5 py-1",
            "bg-neutral-900/70 backdrop-blur-sm",
            "text-[10px] font-semibold tracking-[0.14em] text-white uppercase",
            "transition-opacity duration-200",
            position < 12 ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          Before
        </div>

        {/* After label */}
        <div
          aria-hidden
          className={[
            "pointer-events-none absolute top-3.5 right-3.5 rounded-full px-2.5 py-1",
            "bg-neutral-900/70 backdrop-blur-sm",
            "text-[10px] font-semibold tracking-[0.14em] text-white uppercase",
            "transition-opacity duration-200",
            position > 88 ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          After
        </div>

        {/* Accessible range input — keyboard-operable, visually hidden */}
        <input
          id="ba-slider"
          type="range"
          min={2}
          max={98}
          step={0.5}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="sr-only"
        />
      </div>

      {caption && (
        <figcaption className="mt-3 text-xs leading-relaxed text-neutral-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}


function ImpactBand({
  metrics,
  qualitative,
}: {
  metrics: { value: React.ReactNode; label: string }[];
  qualitative: string[];
}) {
  return (
    <div className="pt-10 md:pt-12">
      <div className="grid gap-10 sm:grid-cols-3 w-full">
        {metrics.map(({ value, label }) => (
          <div key={label}>
            <div className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">{value}</div>
            <p className="mt-1 text-[15px] text-neutral-600">{label}</p>
          </div>
        ))}
      </div>
      <ul className="mt-12 space-y-2 w-full text-[15px] md:text-base leading-[1.65] text-neutral-700">
        {qualitative.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ReflectionSection({
  lead,
  children,
}: {
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <section id="reflection" className="scroll-mt-24 pt-20 md:pt-28">
      <Reveal>
        <p className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${ACCENT}`}>Reflection</p>
        <h2 className="mt-3 text-[1.75rem] md:text-[2rem] font-semibold tracking-tight text-neutral-900">
          What I'd scale next
        </h2>
        <p className={`mt-5 ${BODY_MAX} text-lg leading-[1.65] text-neutral-800 font-medium`}>{lead}</p>
        <div className={`mt-6 ${BODY_MAX} text-[15px] md:text-base leading-[1.65] text-neutral-700`}>
          {children}
        </div>
      </Reveal>
    </section>
  );
}

export default function OLGPage() {
  const toc = useMemo(
    () => [
      { id: "summary",     label: "Executive summary",         arc: "CONTEXT"     },
      { id: "challenge",   label: "Platform challenge",        arc: "PROBLEM"     },
      { id: "constraints", label: "Competing constraints",     arc: "CONSTRAINTS" },
      { id: "role",        label: "What I led",                arc: "APPROACH"    },
      { id: "insights",    label: "Research-backed insights",  arc: "APPROACH"    },
      { id: "principles",  label: "Strategic principles",      arc: "SOLUTION"    },
      { id: "system",      label: "System-level changes",      arc: "SOLUTION"    },
      { id: "impact",      label: "Impact",                    arc: "OUTCOME"     },
      { id: "reflection",  label: "What I'd scale next",       arc: undefined     },
    ],
    []
  );

  const ARC_STAGES = ["CONTEXT", "PROBLEM", "CONSTRAINTS", "APPROACH", "SOLUTION", "OUTCOME"] as const;

  const [activeId, setActiveId] = useState<string>("summary");
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(pct);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = toc
      .map((t) => document.getElementById(t.id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: [0.05, 0.1, 0.2, 0.4] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [toc]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 96; // offset for sticky headers
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-neutral-900">
      {/* Mobile reading progress — visible only below lg where the sidebar is hidden */}
      <div className="lg:hidden fixed top-[73px] left-0 right-0 z-40 h-[2px] bg-neutral-100">
        <div
          className="h-full bg-[#4F46E5] transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Reading progress"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="pt-4 pb-4">
          <Link
            href="/work"
            aria-label="Back to work"
            className="nav-link inline-flex items-center gap-3 text-sm text-neutral-700 hover:text-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/50 focus-visible:ring-offset-2 rounded"
          >
            <span aria-hidden>←</span>
            <span>Back to work</span>
          </Link>
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[220px_1fr] lg:items-start">
          <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <div className="pt-8 space-y-8 pr-6">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">Reading progress</p>
                <div className="mt-2 w-40">
                  <ProgressBar value={progress} />
                </div>
              </div>

              {/* Narrative arc indicator */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400 mb-2">Narrative arc</p>
                <div className="space-y-1">
                  {ARC_STAGES.map((stage, i) => {
                    const activeStage = toc.find((t) => t.id === activeId)?.arc;
                    const isActive = activeStage === stage;
                    const stageIndex = ARC_STAGES.indexOf(stage);
                    const activeIndex = activeStage ? ARC_STAGES.indexOf(activeStage as typeof ARC_STAGES[number]) : -1;
                    const isPast = stageIndex < activeIndex;
                    return (
                      <div key={stage} className="flex items-center gap-2">
                        <div className={[
                          "h-1 w-1 rounded-full flex-none transition-colors duration-300",
                          isActive ? "bg-[#4F46E5]" : isPast ? "bg-neutral-300" : "bg-neutral-200",
                        ].join(" ")} />
                        <span className={[
                          "text-[10px] font-medium tracking-[0.1em] transition-colors duration-300",
                          isActive ? "text-[#4F46E5]" : isPast ? "text-neutral-400" : "text-neutral-300",
                        ].join(" ")}>
                          {stage}
                        </span>
                        {i < ARC_STAGES.length - 1 && <span className="sr-only">→</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <nav className="mt-1 space-y-2" aria-label="On this page">
                  {toc.map((t) => (
                    <a
                      key={t.id}
                      href={`#${t.id}`}
                      aria-current={activeId === t.id ? "true" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(t.id);
                      }}
                      className={
                        "block text-xs leading-5 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/50 focus-visible:ring-offset-2 " +
                        (activeId === t.id
                          ? "text-[#4F46E5] font-medium"
                          : "text-neutral-500 hover:text-neutral-800")
                      }
                    >
                      {t.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
          <div className={CONTENT_MAX}>

            {/* Hero */}
            <CaseStudyHero
              eyebrow="Ontario Lottery & Gaming"
              title="Transforming a regulated content platform"
              summary="Redesigned OLG's corporate website to improve clarity, accessibility, and long-term governance across a complex, regulated content ecosystem."
              supportingStatement="A platform transformation focused on information architecture, scalability, and cross-functional alignment, not just visual redesign."
            >
              <CaseStudyFigure
                src="/work/olg/olg-hero.png"
                alt="OLG corporate platform — redesigned information architecture and governance structure"
                caption="OLG corporate platform — restructured for clarity and governance."
              />
            </CaseStudyHero>

            {/* Executive summary */}
            <section id="summary" className="scroll-mt-24">
              <Reveal>
                <ExecutiveSummary
                  metadata={[
                    { label: "Role", value: "Lead Product / UX Designer" },
                    { label: "Scope", value: "Corporate site, IA, governance" },
                    { label: "Stakeholders", value: "Investors, media, municipalities, partners, public" },
                  ]}
                  problem="Content sprawl and org-driven navigation made information hard to find and difficult to manage."
                  complexity="Multiple audiences, regulatory requirements, and competing stakeholder needs required careful tradeoffs."
                  led="IA strategy, research synthesis, stakeholder alignment, and scalable governance patterns."
                  changed="A clearer structure, reduced page volume, and a more maintainable platform."
                />
              </Reveal>
            </section>

            {/* The platform challenge */}
            <Section
              id="challenge"
              eyebrow="Platform"
              title="The platform challenge"
              lead="This was not primarily a visual design problem. The site was organized around internal structure rather than user needs, making content difficult to find and harder to maintain."
            >
              <div className={`${BODY_MAX} space-y-6 text-[15px] md:text-base leading-[1.65] text-neutral-700`}>
                <p>
                  OLG's corporate website serves diverse audiences including investors, media, municipalities, partners, and the public. Over time, fragmented ownership and inconsistent content structures created challenges in findability, accessibility, and governance.
                </p>
                <CaseStudyFigure
                  src="/work/olg/olg-problem.png"
                  alt="OLG navigation before redesign — structured around internal teams rather than user intent"
                  caption="The old structure: navigation organized around internal teams, not user intent."
                />
              </div>
            </Section>

            {/* Competing constraints */}
            <Section
              id="constraints"
              eyebrow="Constraints"
              title="Competing constraints"
              lead="The redesign required balancing several competing priorities."
            >
              <ConstraintGrid
                items={[
                  {
                    title: "Compliance vs clarity",
                    body: "Simplify structure and language without compromising regulated content requirements.",
                  },
                  {
                    title: "Alignment vs consistency",
                    body: "Support stakeholder needs while keeping the experience coherent and governable.",
                  },
                  {
                    title: "Accessibility vs flexibility",
                    body: "Improve the system without weakening accessibility standards.",
                  },
                  {
                    title: "Scale vs maintainability",
                    body: "Create an architecture that could grow without returning to content sprawl.",
                  },
                ]}
              />
            </Section>

            {/* What I led */}
            <Section
              id="role"
              eyebrow="Ownership"
              title="What I led"
              lead="I led the transformation by defining the IA direction, aligning stakeholders, and establishing scalable patterns — not by executing a fixed brief."
            >
              <ul className={`${BODY_MAX} space-y-3 text-[15px] md:text-base leading-[1.65] text-neutral-700 list-disc pl-6`}>
                <li>Defined scope through a full content and navigation audit; mapped existing system and ownership gaps.</li>
                <li>Translated audience and journey research into top tasks and intent-based groupings.</li>
                <li>Structured the new information architecture and navigation model.</li>
                <li>Aligned stakeholders using audit and behavioral evidence to resolve conflicts and prioritize.</li>
                <li>Established governance-ready patterns and documentation for implementation and future maintenance.</li>
              </ul>
            </Section>

            {/* Research-backed insights */}
            <Section
              id="insights"
              eyebrow="Research"
              title="Research-backed insights"
              lead="Evidence from system audit and user behavior was combined to converge on a single, governable IA."
            >
              <div className={`${BODY_MAX} space-y-8`}>
                <p className="text-[15px] md:text-base leading-[1.65] text-neutral-700">
                  Stakeholder workshops (8 stakeholders, 24 MVP pages, conflict resolution) and analytics (e.g. critical action CTR 0.09%, key-section reach 1.9%) showed that user intent existed but the architecture blocked discovery. That observation informed the decision to restructure around tasks and intent, not departments.
                </p>
                <InsightCallout>
                  Users weren’t struggling because information was missing. They struggled because it was organized like an org chart. The platform needed to behave like a service: intent-based, predictable, and governable.
                </InsightCallout>
                <CaseStudyFigure
                  src="/work/olg/olg-audit.png"
                  alt="Content audit and stakeholder workshop output — structural gaps and ownership conflicts mapped"
                  caption="Content audit and stakeholder synthesis — surfacing ownership gaps and structural conflicts."
                  objectPosition="center"
                />
              </div>
            </Section>

            {/* Strategic principles */}
            <Section
              id="principles"
              eyebrow="Strategy"
              title="Strategic principles"
              lead="The redesign was guided by four principles that translated research findings into IA decisions and governance patterns."
            >
              <StrategicPrinciplesSteps
                items={[
                  {
                    title: "Task-driven navigation",
                    body: "Content grouped by user intent and top tasks — not internal org structure. Standardized labels and consolidation to eliminate redundant pages.",
                  },
                  {
                    title: "Clearer content hierarchy",
                    body: "Predictable depth and consistent labeling so users and content owners know exactly where information lives.",
                  },
                  {
                    title: "Reusable and scalable patterns",
                    body: "Shared page and navigation patterns to prevent future sprawl and keep behavior consistent across sections.",
                  },
                  {
                    title: "Stronger governance",
                    body: "Clear ownership and decision rules for publishing — so the structure stays maintainable without reverting to fragmentation.",
                  },
                ]}
              />
              <BeforeAfterSlider
                beforeSrc="/work/olg/olg-ia-before.png"
                afterSrc="/work/olg/olg-ia-after.png"
                beforeAlt="OLG navigation before redesign — organized around internal teams rather than user intent"
                afterAlt="OLG information architecture after redesign — intent-based groupings, standardized labels"
                caption="Drag to compare: old navigation structure (Before) vs. redesigned intent-based IA (After)."
              />
            </Section>

            {/* System-level changes */}
            <Section
              id="system"
              eyebrow="System"
              title="System-level changes"
              lead="Changes were structural and procedural — restructured navigation, simplified pathways, standardized patterns, and clearer ownership."
            >
              <div className={`${BODY_MAX} space-y-6 text-[15px] md:text-base leading-[1.65] text-neutral-700`}>
                <p>
                  I used audit findings and behavior evidence to guide decisions, resolve competing stakeholder requests, and align teams around a shared structure. Outcomes included: restructured navigation around user intent; simplified pathways to key content; improved content grouping and standardized component behavior; scalable content architecture with clear ownership and decision rules for future maintenance.
                </p>
                <ContentGovernanceDiagram />
              </div>
            </Section>

            {/* Impact — prominent */}
            <section id="impact" className="scroll-mt-24 pt-16 md:pt-24">
              <Reveal>
                <p className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${ACCENT}`}>Impact</p>
                <h2 className="mt-3 text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-semibold tracking-tight text-neutral-900">
                  Platform impact
                </h2>
                <p className={`mt-5 ${BODY_MAX} text-lg leading-[1.65] text-neutral-800 font-medium`}>
                  The transformation delivered measurable and qualitative gains across user experience, organizational alignment, and system maintainability.
                </p>
                <ImpactBand
                  metrics={[
                    { value: <CountUp value={25} suffix="%" durationMs={1200} className={ACCENT} />, label: "Reduction in total pages" },
                    { value: <CountUp value={5} suffix="%" durationMs={1200} className={ACCENT} />, label: "Increase in customer retention" },
                    { value: "—", label: "Findability & governance" },
                  ]}
                  qualitative={[
                    "Clearer navigation model and improved content findability.",
                    "Increased consistency across sections and stronger internal alignment.",
                    "More scalable content architecture and reduced structural complexity.",
                    "Improved accessibility confidence and governance-ready patterns.",
                  ]}
                />
                <CaseStudyFigure
                  src="/work/olg/olg-finaldesign.png"
                  alt="OLG redesigned homepage — clearer pathways, reduced page volume, governance-ready structure"
                  caption="Final platform — clearer pathways, reduced page volume, governance-ready structure."
                  objectFit="contain"
                />
              </Reveal>
            </section>

            {/* Reflection */}
            <ReflectionSection
              lead="Complex enterprise problems are often organizational; the leverage is in alignment, language, and structure."
            >
              <p>
                I would scale governance documentation and pattern libraries so future content and navigation decisions stay consistent. I’d also extend the same intent-based and ownership model to adjacent touchpoints so the whole ecosystem behaves like one platform, not a set of siloed sites — and treat the next phase as platform maturity, not another one-off project.
              </p>
            </ReflectionSection>

            <section className="pt-16 md:pt-24 pb-16" aria-labelledby="olg-next-heading">
              <Reveal>
              <h2 id="olg-next-heading" className="text-xl font-semibold tracking-tight text-neutral-900">
                Next case study
              </h2>
              <p className="mt-2 w-full text-sm leading-relaxed text-neutral-600">
                Global learning platform for healthcare: training, compliance, and platform architecture.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/work"
                  aria-label="Back to work"
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/50 focus-visible:ring-offset-2"
                >
                  Back to Work
                </Link>
                <Link
                  href="/work/pfizer"
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/50 focus-visible:ring-offset-2"
                >
                  Next: Pfizer →
                </Link>
              </div>
              </Reveal>
            </section>

          </div>

        </div>
      </div>
    </div>
  );
}