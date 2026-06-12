"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const ACCENT = "#1D4ED8";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
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
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        "transform-gpu transition-all duration-700 ease-out motion-reduce:transition-none",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[11px] font-semibold tracking-[0.18em] uppercase"
      style={{ color: ACCENT }}
    >
      {children}
    </div>
  );
}

// ─── DIAGRAM 1: Platform Map ──────────────────────────────────────────────────

function PlatformMap() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const existingModules = ["T2 Filing", "Foreign Affiliates", "Tax Analytics", "Compliance Tracker"];

  return (
    <figure className="mt-10 overflow-x-auto pb-2">
      <div className="flex items-stretch gap-5 min-w-[520px]" ref={ref}>
        {/* Standalone side */}
        <div
          className={[
            "w-44 flex-none rounded-xl border-2 border-dashed border-neutral-300 bg-white p-4 transition-all duration-500 ease-out",
            active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <div className="text-[9px] font-semibold tracking-[0.16em] text-neutral-400 uppercase mb-3">
            Before — Standalone
          </div>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-3 text-center">
            <div className="text-[12px] font-semibold text-neutral-600">Surplus Calculator</div>
            <div className="mt-1 text-[10px] text-neutral-400">Isolated workflow</div>
          </div>
          <p className="mt-3 text-[10px] leading-[1.5] text-neutral-400">
            Own navigation, own patterns, disconnected from the broader platform.
          </p>
        </div>

        {/* Arrow */}
        <div
          className={[
            "flex-none flex flex-col items-center justify-center gap-1 transition-all duration-400",
            active ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{ transitionDelay: active ? "160ms" : "0ms" }}
        >
          <div className="text-[9px] tracking-[0.1em] text-neutral-400">Integration</div>
          <div className="flex items-center gap-1 text-neutral-300">
            <div className="w-6 h-px bg-neutral-300" />
            <span className="text-xs">→</span>
          </div>
        </div>

        {/* One Port side */}
        <div
          className={[
            "flex-1 rounded-xl border border-neutral-200 bg-neutral-50/60 p-4 transition-all duration-500 ease-out",
            active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
          style={{ transitionDelay: active ? "240ms" : "0ms" }}
        >
          <div className="text-[9px] font-semibold tracking-[0.16em] text-neutral-500 uppercase mb-3">
            After — One Port Platform
          </div>
          <div className="grid grid-cols-2 gap-2">
            {existingModules.map((m) => (
              <div
                key={m}
                className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[11px] text-neutral-500"
              >
                {m}
              </div>
            ))}
            <div
              className="col-span-2 rounded-lg border px-3 py-2.5 text-[11px] font-semibold"
              style={{
                borderColor: `${ACCENT}35`,
                backgroundColor: `${ACCENT}09`,
                color: ACCENT,
              }}
            >
              Surplus Calculator — Platform native ✓
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-neutral-500">
        Integration target: Surplus Calculator gains a first-class address within One Port while connecting to shared platform infrastructure.
      </figcaption>
    </figure>
  );
}

// ─── DIAGRAM 2: Workflow Pipeline ─────────────────────────────────────────────

function WorkflowPipeline() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stages = [
    { n: "01", label: "Foreign Affiliates", role: "Preparer", note: "Affiliate data configured" },
    { n: "02", label: "Tax Configuration", role: "Preparer", note: "Tax year & inputs set" },
    { n: "03", label: "Calculator", role: "Preparer", note: "Surplus calculated" },
    { n: "04", label: "Review", role: "Reviewer", note: "Submission evaluated" },
    { n: "05", label: "Approval", role: "Specialist", note: "Audit record created" },
  ];

  return (
    <figure ref={ref} className="mt-10 overflow-x-auto pb-2">
      <div className="flex items-start min-w-[580px]">
        {stages.map((s, i) => (
          <React.Fragment key={s.n}>
            <div
              className={[
                "flex flex-col items-center text-center flex-1 min-w-0 transition-all duration-500 ease-out motion-reduce:transition-none",
                active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
              style={{ transitionDelay: active ? `${i * 85}ms` : "0ms" }}
            >
              <div
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-semibold transition-all duration-500",
                  active ? "text-white shadow-[0_0_0_4px_rgba(29,78,216,0.11)]" : "bg-neutral-100 text-neutral-400",
                ].join(" ")}
                style={active ? { backgroundColor: ACCENT } : {}}
              >
                {s.n}
              </div>
              <div className="mt-2.5 text-[12px] font-semibold text-neutral-900 leading-tight">{s.label}</div>
              <div
                className="mt-1 rounded-full px-2 py-0.5 text-[9px] font-semibold tracking-[0.08em]"
                style={{ backgroundColor: `${ACCENT}12`, color: ACCENT }}
              >
                {s.role}
              </div>
              <p className="mt-1.5 text-[10px] leading-[1.5] text-neutral-400 max-w-[76px]">{s.note}</p>
            </div>
            {i < stages.length - 1 && (
              <div
                aria-hidden
                className={[
                  "flex-none mt-3.5 px-1 text-neutral-300 text-xs transition-opacity duration-300",
                  active ? "opacity-100" : "opacity-0",
                ].join(" ")}
                style={{ transitionDelay: active ? `${i * 85 + 55}ms` : "0ms" }}
              >
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div
        className={[
          "mt-6 rounded-lg border border-amber-100 bg-amber-50/80 px-4 py-3 transition-all duration-500",
          active ? "opacity-100" : "opacity-0",
        ].join(" ")}
        style={{ transitionDelay: active ? "520ms" : "0ms" }}
      >
        <p className="text-[12px] leading-[1.6] text-amber-800">
          <span className="font-semibold">Timing constraint:</span>{" "}
          Surplus calculations often complete outside the T2 filing window — requiring workflow access that cannot depend on the broader T2 timeline. This is the fact that made the obvious integration path wrong.
        </p>
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-neutral-500">
        The existing standalone workflow: five stages across three roles, with timing independence from the T2 filing cycle.
      </figcaption>
    </figure>
  );
}

// ─── DIAGRAM 3: Integration Decision Matrix ───────────────────────────────────

function IntegrationDecisionMatrix() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  type Tone = "positive" | "neutral" | "negative";

  const options: {
    label: string;
    name: string;
    note: string;
    alignment: { value: string; tone: Tone };
    independence: { value: string; tone: Tone };
    discoverability: { value: string; tone: Tone };
    recommended: boolean;
  }[] = [
    {
      label: "Option A",
      name: "Embed in Foreign Affiliates",
      note: "Proximity to source data, but the calculator risks feeling like a sub-feature rather than a complete workflow with its own lifecycle.",
      alignment: { value: "Strong", tone: "positive" },
      independence: { value: "Limited", tone: "negative" },
      discoverability: { value: "At risk", tone: "negative" },
      recommended: false,
    },
    {
      label: "Option B",
      name: "Integrate into existing engagement workflows",
      note: "Aligns with platform structure, but T2-oriented timing doesn't match surplus calculation cadence — creating access friction.",
      alignment: { value: "Moderate", tone: "neutral" },
      independence: { value: "Limited", tone: "negative" },
      discoverability: { value: "Moderate", tone: "neutral" },
      recommended: false,
    },
    {
      label: "Option C",
      name: "Dedicated platform-native experience",
      note: "Surplus Calculator becomes a first-class platform product with its own engagement model and contextual access to Foreign Affiliates data.",
      alignment: { value: "Strong", tone: "positive" },
      independence: { value: "Preserved", tone: "positive" },
      discoverability: { value: "Strong", tone: "positive" },
      recommended: true,
    },
  ];

  const toneStyles: Record<Tone, string> = {
    positive: "text-emerald-700 bg-emerald-50 border-emerald-100",
    neutral: "text-amber-700 bg-amber-50 border-amber-100",
    negative: "text-neutral-500 bg-neutral-100 border-neutral-200",
  };

  return (
    <figure ref={ref} className="mt-10 overflow-x-auto pb-2">
      <div className="min-w-[660px] space-y-2">
        {/* Column headers */}
        <div className="grid grid-cols-[1.9fr_1fr_1fr_1fr_88px] gap-2 px-1 pb-1">
          {["Option", "Platform Alignment", "Workflow Independence", "Discoverability", ""].map((h) => (
            <div key={h} className="text-[10px] font-semibold tracking-[0.15em] text-neutral-400 uppercase">
              {h}
            </div>
          ))}
        </div>

        {/* Option rows */}
        {options.map((opt, oi) => (
          <div
            key={opt.label}
            className={[
              "grid grid-cols-[1.9fr_1fr_1fr_1fr_88px] gap-px rounded-xl border overflow-hidden transition-all duration-500 ease-out",
              active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              opt.recommended
                ? "border-[#1D4ED8]/25 shadow-[0_4px_20px_rgba(29,78,216,0.09)]"
                : "border-neutral-200",
            ].join(" ")}
            style={{ transitionDelay: active ? `${oi * 100}ms` : "0ms" }}
          >
            {/* Name cell */}
            <div
              className="px-4 py-4"
              style={opt.recommended ? { backgroundColor: `${ACCENT}06` } : { backgroundColor: "white" }}
            >
              <div className="text-[10px] font-semibold tracking-[0.13em] text-neutral-400 uppercase">
                {opt.label}
              </div>
              <div
                className="mt-0.5 text-[13px] font-semibold leading-snug"
                style={opt.recommended ? { color: ACCENT } : { color: "rgb(64 64 64)" }}
              >
                {opt.name}
              </div>
              <p className="mt-2 text-[11px] leading-[1.55] text-neutral-500">{opt.note}</p>
            </div>

            {/* Criteria cells */}
            {([opt.alignment, opt.independence, opt.discoverability] as { value: string; tone: Tone }[]).map(
              (criterion, ci) => (
                <div
                  key={ci}
                  className="flex items-center justify-center px-2 py-4"
                  style={opt.recommended ? { backgroundColor: `${ACCENT}04` } : { backgroundColor: "white" }}
                >
                  <span
                    className={[
                      "rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                      toneStyles[criterion.tone],
                    ].join(" ")}
                  >
                    {criterion.value}
                  </span>
                </div>
              )
            )}

            {/* Selected badge */}
            <div
              className="flex items-center justify-center px-2 py-4"
              style={opt.recommended ? { backgroundColor: `${ACCENT}06` } : { backgroundColor: "white" }}
            >
              {opt.recommended ? (
                <span
                  className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-white"
                  style={{ backgroundColor: ACCENT }}
                >
                  Selected
                </span>
              ) : (
                <span className="text-neutral-300 text-sm">—</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-neutral-500">
        Three integration approaches evaluated against platform alignment, workflow independence, and discoverability.
      </figcaption>
    </figure>
  );
}

// ─── DIAGRAM 4: Edit vs. Advocate ─────────────────────────────────────────────

function EditVsAdvocate() {
  const adaptedItems = [
    "Table patterns for data-dense tax views",
    "Status indicator chips — state-aware, contextual actions",
    "Navigation hierarchy and breadcrumb structure",
    "Engagement-level access and management model",
    "Filter, search, and column interaction conventions",
    "Review and annotation model from existing workflows",
  ];

  const advocatedItems = [
    "Prerequisite readiness state surfaced before calculator entry — not after",
    "Role-specific visibility into workflow state transitions",
    "Inline reviewer annotations within the workflow context",
  ];

  return (
    <figure className="mt-10 grid gap-4 sm:grid-cols-2">
      {/* Adapted column */}
      <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-5">
        <div className="mb-1 text-[9px] font-semibold tracking-[0.17em] text-neutral-400 uppercase">
          Adapted from existing platform patterns
        </div>
        <p className="mb-4 text-[11px] text-neutral-500 leading-[1.5]">
          Decisions where existing One Port components already served the workflow need.
        </p>
        <ul className="space-y-2.5">
          {adaptedItems.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex-none h-4 w-4 rounded-full bg-neutral-200 flex items-center justify-center text-[9px] text-neutral-500 shrink-0">
                ✓
              </span>
              <span className="text-[12px] leading-[1.55] text-neutral-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Advocated column */}
      <div
        className="rounded-xl border p-5"
        style={{ borderColor: `${ACCENT}25`, backgroundColor: `${ACCENT}05` }}
      >
        <div
          className="mb-1 text-[9px] font-semibold tracking-[0.17em] uppercase"
          style={{ color: ACCENT }}
        >
          Advocated for workflow-specific enhancements
        </div>
        <p className="mb-4 text-[11px] text-neutral-500 leading-[1.5]">
          Decisions where genuine workflow needs weren't yet covered by platform patterns.
        </p>
        <ul className="space-y-2.5">
          {advocatedItems.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span
                className="mt-0.5 flex-none h-4 w-4 rounded-full flex items-center justify-center text-[9px] text-white shrink-0"
                style={{ backgroundColor: ACCENT }}
              >
                ↑
              </span>
              <span className="text-[12px] leading-[1.55] text-neutral-700">{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 border-t border-[#1D4ED8]/12 pt-4">
          <p className="text-[11px] leading-[1.6] text-neutral-500">
            Each enhancement was justified by a specific user behavior or workflow need — not by a design preference or prototype ambition.
          </p>
        </div>
      </div>

      <figcaption className="sm:col-span-2 mt-0 text-xs leading-relaxed text-neutral-500">
        The distinction between adapting and advocating is where editorial judgment matters most. Not every prototype idea improves the platform; not every platform constraint is worth accepting without question.
      </figcaption>
    </figure>
  );
}

// ─── DIAGRAM 5: Workflow State Swim-lane ──────────────────────────────────────

function WorkflowStateSwimLane() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const states = ["Draft", "Under Review", "Changes Requested", "Approved"];

  const lanes: {
    role: string;
    actions: { active: boolean; label: string | null }[];
  }[] = [
    {
      role: "Preparer",
      actions: [
        { active: true,  label: "Owns. Edits freely. Monitors readiness indicators." },
        { active: false, label: null },
        { active: true,  label: "Receives reviewer feedback. Revises and resubmits." },
        { active: false, label: null },
      ],
    },
    {
      role: "Reviewer",
      actions: [
        { active: false, label: null },
        { active: true,  label: "Owns. Reviews change diff. Annotates inline." },
        { active: false, label: null },
        { active: false, label: null },
      ],
    },
    {
      role: "Specialist",
      actions: [
        { active: false, label: null },
        { active: false, label: null },
        { active: false, label: null },
        { active: true,  label: "Approves. Read-only audit record generated." },
      ],
    },
  ];

  return (
    <figure ref={ref} className="mt-10 overflow-x-auto pb-2">
      <div className="min-w-[620px]">
        {/* State headers */}
        <div className="mb-2 grid grid-cols-[72px_1fr_1fr_1fr_1fr] gap-2">
          <div />
          {states.map((s, si) => (
            <div
              key={s}
              className={[
                "rounded-lg px-2 py-2 text-center text-[11px] font-semibold border transition-all duration-500",
                active ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
              ].join(" ")}
              style={{
                transitionDelay: active ? `${si * 70}ms` : "0ms",
                ...(si === 3
                  ? {
                      backgroundColor: `${ACCENT}12`,
                      color: ACCENT,
                      borderColor: `${ACCENT}25`,
                    }
                  : {
                      backgroundColor: "rgb(250 250 250)",
                      color: "rgb(82 82 91)",
                      borderColor: "rgb(228 228 231)",
                    }),
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Swim lanes */}
        {lanes.map((lane, li) => (
          <div
            key={lane.role}
            className={[
              "mb-2 grid grid-cols-[72px_1fr_1fr_1fr_1fr] gap-2 transition-all duration-500 ease-out",
              active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
            ].join(" ")}
            style={{ transitionDelay: active ? `${li * 100 + 200}ms` : "0ms" }}
          >
            <div className="flex items-center">
              <span className="text-[10px] font-semibold tracking-[0.1em] text-neutral-400">
                {lane.role}
              </span>
            </div>
            {lane.actions.map((action, ai) => (
              <div
                key={ai}
                className={[
                  "min-h-[60px] rounded-lg border px-3 py-2.5 flex items-center",
                  action.active
                    ? "border-[#1D4ED8]/20 bg-[#1D4ED8]/6"
                    : "border-neutral-100 bg-neutral-50/50",
                ].join(" ")}
              >
                {action.label ? (
                  <p className="text-[11px] leading-[1.5] text-neutral-700">{action.label}</p>
                ) : (
                  <div className="w-full h-px bg-neutral-200/70" />
                )}
              </div>
            ))}
          </div>
        ))}

        {/* Transfer annotation */}
        <div
          className={[
            "mt-3 transition-opacity duration-500",
            active ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{ transitionDelay: active ? "600ms" : "0ms" }}
        >
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            Highlighted cells indicate ownership — the role responsible for action in that state. Empty cells are read-only or inaccessible for that role.
          </p>
        </div>
      </div>

      <figcaption className="mt-3 text-xs leading-relaxed text-neutral-500">
        Workflow states as design units: each state carries distinct information architecture, action sets, and role ownership.
      </figcaption>
    </figure>
  );
}

// ─── DIAGRAM 6: Platform Pattern Grid ─────────────────────────────────────────

function PatternGrid() {
  const patterns = [
    {
      name: "Search & Filter",
      badge: "Platform standard",
      desc: "Consistent query model across all list views. Tax data filtered by affiliate, year, status, and engagement.",
      visual: "search",
    },
    {
      name: "Column Management",
      badge: "Role-aware",
      desc: "User-configurable column visibility, persistent per role. Preparers and reviewers see different default column sets.",
      visual: "columns",
    },
    {
      name: "Status Indicators",
      badge: "State-aware",
      desc: "State chips with contextual action menus. Behavior varies by workflow state and user role — the same chip does different things for different people.",
      visual: "status",
    },
    {
      name: "Expandable Row Detail",
      badge: "Platform standard",
      desc: "Progressive disclosure within table rows. Reviewer annotations and contextual detail surface inline — no secondary navigation required.",
      visual: "expand",
    },
  ];

  const visuals: Record<string, React.ReactNode> = {
    search: (
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="h-5 flex-1 rounded bg-neutral-200" />
          <div className="h-5 w-14 rounded bg-neutral-200" />
          <div className="h-5 w-10 rounded bg-neutral-200" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {["Affiliate", "Year", "Status"].map((f) => (
            <div
              key={f}
              className="rounded-full px-2 h-4 text-[9px] flex items-center font-semibold"
              style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
            >
              {f} ×
            </div>
          ))}
        </div>
      </div>
    ),
    columns: (
      <div className="space-y-1.5">
        <div className="flex gap-1.5">
          {["Name", "Status", "Year", "FA", "Actions"].map((col, ci) => (
            <div
              key={col}
              className={[
                "h-4 rounded text-[9px] flex items-center justify-center font-medium",
                ci === 2 ? "opacity-35" : "",
              ].join(" ")}
              style={{
                flex: 1,
                backgroundColor: ci === 2 ? "rgb(228 228 231)" : `${ACCENT}12`,
                color: ci === 2 ? "rgb(115 115 115)" : ACCENT,
              }}
            >
              {col}
            </div>
          ))}
        </div>
        <div className="h-px bg-neutral-200" />
        {[1, 2].map((r) => (
          <div key={r} className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((c) => (
              <div
                key={c}
                className={["h-4 rounded", c === 3 ? "bg-neutral-100" : "bg-neutral-200"].join(" ")}
                style={{ flex: 1 }}
              />
            ))}
          </div>
        ))}
      </div>
    ),
    status: (
      <div className="flex items-center gap-1.5 flex-wrap">
        {["Draft", "Under Review", "Changes Req.", "Approved"].map((s, si) => (
          <div
            key={s}
            className="rounded-full px-2.5 py-0.5 text-[9px] font-semibold border"
            style={
              si === 3
                ? { backgroundColor: `${ACCENT}12`, color: ACCENT, borderColor: `${ACCENT}30` }
                : si === 1
                ? { backgroundColor: "rgb(254 252 232)", color: "rgb(133 77 14)", borderColor: "rgb(253 230 138)" }
                : { backgroundColor: "rgb(250 250 250)", color: "rgb(115 115 115)", borderColor: "rgb(228 228 231)" }
            }
          >
            {s}
          </div>
        ))}
      </div>
    ),
    expand: (
      <div className="space-y-1">
        <div className="grid grid-cols-4 gap-1.5">
          {[1, 2, 3, 4].map((r) => (
            <div key={r} className="h-4 rounded bg-neutral-200" />
          ))}
        </div>
        <div className="h-px bg-neutral-200" />
        <div
          className="rounded-lg p-2.5 space-y-1.5"
          style={{ backgroundColor: `${ACCENT}06`, border: `1px solid ${ACCENT}15` }}
        >
          <div className="h-2.5 w-20 rounded bg-neutral-300" />
          <div className="h-2 w-full rounded bg-neutral-200" />
          <div className="h-2 w-3/4 rounded bg-neutral-200" />
        </div>
      </div>
    ),
  };

  return (
    <figure className="mt-10 grid gap-4 sm:grid-cols-2">
      {patterns.map((p) => (
        <div
          key={p.name}
          className="rounded-xl border border-neutral-200 bg-white p-5 hover:border-[#1D4ED8]/25 hover:shadow-[0_4px_16px_rgba(29,78,216,0.06)] transition-all duration-300"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="text-[13px] font-semibold text-neutral-900">{p.name}</div>
            <span
              className="flex-none rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
              style={{ backgroundColor: `${ACCENT}10`, color: ACCENT }}
            >
              {p.badge}
            </span>
          </div>
          <p className="mt-1.5 text-[12px] leading-[1.6] text-neutral-600">{p.desc}</p>
          <div className="mt-4 rounded-lg border border-neutral-100 bg-neutral-50 p-3">
            {visuals[p.visual]}
          </div>
        </div>
      ))}
      <figcaption className="sm:col-span-2 text-xs leading-relaxed text-neutral-500">
        Four recurring platform patterns — adapted from One Port's existing component library for the density and workflow requirements of tax data.
      </figcaption>
    </figure>
  );
}

// ─── DIAGRAM 7: Strategy Artifacts ───────────────────────────────────────────

function StrategyArtifacts() {
  const artifacts = [
    {
      id: "01",
      label: "Integration Architecture",
      body: "A documented decision model for where Surplus Calculator belongs within One Port — including the two rejected alternatives, the reasoning behind each, and why the dedicated platform-native experience was the preferred direction.",
    },
    {
      id: "02",
      label: "Workflow Translation Model",
      body: "A framework for adapting a standalone tool's interaction patterns to platform standards without eroding task-level familiarity for existing users — distinguishing what to adapt from what to advocate for.",
    },
    {
      id: "03",
      label: "Platform Design Precedent",
      body: "An approach to evaluating prototype-driven business expectations against platform consistency requirements — applicable to future One Port integration projects beyond Surplus Calculator.",
    },
  ];

  return (
    <figure className="mt-10 space-y-3">
      {artifacts.map((a) => (
        <div
          key={a.id}
          className="grid sm:grid-cols-[188px_1fr] gap-x-5 gap-y-2 rounded-xl border border-neutral-200 bg-neutral-50/60 p-5"
        >
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 flex-none flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold text-white shrink-0"
              style={{ backgroundColor: ACCENT }}
            >
              {a.id}
            </div>
            <div className="text-[13px] font-semibold text-neutral-900 leading-snug">{a.label}</div>
          </div>
          <p className="text-[13px] leading-[1.65] text-neutral-600">{a.body}</p>
        </div>
      ))}
      <figcaption className="text-xs leading-relaxed text-neutral-500">
        What the project produced: three durable artifacts that establish a model for future integrations — regardless of when implementation resumes.
      </figcaption>
    </figure>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function SurplusCalculatorPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-5xl px-6 py-14">
        {/* Back nav */}
        <div className="mb-8">
          <Link
            href="/work"
            aria-label="Back to work"
            className="inline-flex items-center gap-3 text-sm text-neutral-600 hover:text-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]/50 focus-visible:ring-offset-2 rounded"
          >
            <span aria-hidden>←</span>
            <span>Back to Work</span>
          </Link>
        </div>

        <article className="min-w-0 max-w-4xl">

          {/* ── HERO ── */}
          <Reveal>
            <header className="pt-2 pb-4">
              <p
                className="text-[11px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: ACCENT }}
              >
                KPMG · Enterprise Tax Platform
              </p>
              <h1 className="mt-4 text-[1.875rem] sm:text-[2.4rem] md:text-[2.75rem] font-semibold leading-[1.1] tracking-tight text-neutral-900">
                Migrating a Specialized Tax Workflow into a Unified Enterprise Platform
              </h1>
              <p className="mt-5 text-lg leading-[1.65] text-neutral-700 max-w-2xl">
                Designing how a standalone surplus calculation tool could become part of KPMG's One Port ecosystem without disrupting critical tax workflows.
              </p>
              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-[13px] text-neutral-700">
                <div>
                  <dt className="text-[10px] font-semibold tracking-[0.16em] uppercase text-neutral-400">Role</dt>
                  <dd className="mt-0.5">Product Designer</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold tracking-[0.16em] uppercase text-neutral-400">Scope</dt>
                  <dd className="mt-0.5">Platform strategy · Workflow IA · Design system alignment</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold tracking-[0.16em] uppercase text-neutral-400">Platform</dt>
                  <dd className="mt-0.5">Enterprise B2B · Tax</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold tracking-[0.16em] uppercase text-neutral-400">Status</dt>
                  <dd className="mt-0.5 font-semibold" style={{ color: ACCENT }}>
                    Strategy delivered — paused pre-launch
                  </dd>
                </div>
              </dl>
            </header>
          </Reveal>

          {/* ── SECTION 1: Platform Vision ── */}
          <Reveal className="mt-2">
            <section id="platform-vision" className="scroll-mt-28 border-t border-neutral-200 pt-14">
              <SectionEyebrow>ONE PORT</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
                The platform consolidation
              </h2>
              <p className="mt-5 max-w-3xl text-[15px] font-semibold leading-7 text-neutral-900">
                One Port is KPMG's enterprise tax platform initiative — designed to bring multiple tax products and workflows into a unified ecosystem.
              </p>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-700">
                At the time of this project, the platform already contained several tax-related experiences, making consistency, discoverability, and shared design patterns critical considerations when introducing a new module. Standalone tools — however well-designed in isolation — create long-term platform problems: inconsistent interaction patterns, duplicated navigation models, fragmented user experience across products.
              </p>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-700">
                The goal was not to rebuild Surplus Calculator. It was to determine how it could belong within One Port — on the platform's terms, without losing what made the original workflow work.
              </p>
              <PlatformMap />
            </section>
          </Reveal>

          {/* ── SECTION 2: Existing Workflow ── */}
          <Reveal className="mt-2">
            <section id="existing-workflow" className="scroll-mt-28 border-t border-neutral-200 pt-14">
              <SectionEyebrow>EXISTING WORKFLOW</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
                What Surplus Calculator actually did
              </h2>
              <p className="mt-5 max-w-3xl text-[15px] font-semibold leading-7 text-neutral-900">
                Surplus Calculator helped corporate tax teams manage foreign affiliates, configure tax inputs, complete calculations, collaborate through review, and generate consolidated outputs.
              </p>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-700">
                Three roles operated across the workflow. Tax Preparers owned the primary workflow — configuring affiliates, entering inputs, and submitting for review. Tax Reviewers evaluated submissions and could request changes. Tax Specialists held final approval authority, producing the audit record. Understanding how these roles moved through the workflow — and when — was essential to determining how integration could succeed without disrupting established ways of working.
              </p>
              <WorkflowPipeline />
            </section>
          </Reveal>

          {/* ── SECTION 3: Integration Paradox ── */}
          <Reveal className="mt-2">
            <section id="integration-paradox" className="scroll-mt-28 border-t border-neutral-200 pt-14">
              <SectionEyebrow>PLATFORM STRATEGY</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
                Three options, one right answer
              </h2>
              <p className="mt-5 max-w-3xl text-[15px] font-semibold leading-7 text-neutral-900">
                The central question: where should Surplus Calculator live inside One Port?
              </p>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-700">
                At first glance, the answer seemed obvious — place it within Foreign Affiliates, since the calculator consumes FA data as its primary input. But the obvious answer was wrong. Surplus calculations often complete outside the T2 filing window. Embedding the calculator inside T2-oriented structures would create access timing restrictions that don't reflect how corporate tax teams actually work. We evaluated three approaches before arriving at a preferred direction.
              </p>

              <IntegrationDecisionMatrix />

              <div
                className="mt-8 rounded-xl border p-5"
                style={{ borderColor: `${ACCENT}20`, backgroundColor: `${ACCENT}05` }}
              >
                <div
                  className="mb-2 text-[10px] font-semibold tracking-[0.14em] uppercase"
                  style={{ color: ACCENT }}
                >
                  The insight
                </div>
                <p className="text-[14px] leading-[1.65] text-neutral-700">
                  Platform integration doesn't always mean embedding. Sometimes the right integration is giving a workflow its own address within the platform — while connecting it to shared infrastructure where it matters.
                </p>
              </div>
            </section>
          </Reveal>

          {/* ── SECTION 4: Translating, Not Recreating ── */}
          <Reveal className="mt-2">
            <section id="translation" className="scroll-mt-28 border-t border-neutral-200 pt-14">
              <SectionEyebrow>DESIGN JUDGMENT</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
                Adapting, not inventing
              </h2>
              <p className="mt-5 max-w-3xl text-[15px] font-semibold leading-7 text-neutral-900">
                A key constraint: the experience needed to feel like One Port, not like a standalone application that happened to live inside it.
              </p>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-700">
                Business stakeholders had explored more advanced, visually rich prototypes built outside of One Port — including functionality and interactions that didn't align with existing platform standards. The design challenge was determining where innovation would genuinely improve the user experience versus where consistency would better serve usability and long-term platform adoption.
              </p>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-700">
                Rather than recreating standalone functionality exactly as prototyped, the work focused on identifying which enhancements addressed genuine workflow needs and which could be served by existing platform patterns. Existing users had established workflows and mental models from the standalone tool — the integration preserved the task sequence and logic of key operations while translating interface and interaction patterns into One Port's framework. Familiarity was preserved at the task level, not the component level.
              </p>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-700">
                This was not a compromise. It was the design principle.
              </p>
              <EditVsAdvocate />
            </section>
          </Reveal>

          {/* ── SECTION 5: Workflow States ── */}
          <Reveal className="mt-2">
            <section id="workflow-states" className="scroll-mt-28 border-t border-neutral-200 pt-14">
              <SectionEyebrow>WORKFLOW DESIGN</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
                Four states, three roles, one lifecycle
              </h2>
              <p className="mt-5 max-w-3xl text-[15px] font-semibold leading-7 text-neutral-900">
                Workflow states are not status labels. They are design units.
              </p>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-700">
                Each state carries a different information architecture, a different action set, and a different role audience. In <strong className="font-semibold text-neutral-900">Draft</strong>, the Preparer owns the workflow and edits freely — the interface surfaces readiness indicators and completion state. In <strong className="font-semibold text-neutral-900">Under Review</strong>, ownership transfers to the Reviewer, who sees a diff from the previous submission and can annotate inline. In <strong className="font-semibold text-neutral-900">Changes Requested</strong>, the Preparer receives control again, with reviewer notes surfaced within the workflow context rather than through a separate communication channel. In <strong className="font-semibold text-neutral-900">Approved</strong>, the record becomes read-only and the full audit trail surfaces for the Specialist.
              </p>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-700">
                Designing each state as a distinct capability set — rather than as a label on a shared interface — was the core information architecture decision.
              </p>
              <WorkflowStateSwimLane />
            </section>
          </Reveal>

          {/* ── SECTION 6: Platform Patterns ── */}
          <Reveal className="mt-2">
            <section id="patterns" className="scroll-mt-28 border-t border-neutral-200 pt-14">
              <SectionEyebrow>PLATFORM PATTERNS</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
                Designing for the platform, not the feature
              </h2>
              <p className="mt-5 max-w-3xl text-[15px] font-semibold leading-7 text-neutral-900">
                Consistency is a design decision.
              </p>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-700">
                The implementation reinforced four recurring platform patterns — adapted from One Port's existing component model for the density and workflow requirements of tax data. Choosing to use what already existed, rather than introducing new patterns, is how platforms stay coherent at scale. Each pattern serves a specific workflow need while remaining consistent with how other One Port modules behave.
              </p>
              <PatternGrid />
            </section>
          </Reveal>

          {/* ── SECTION 7: Strategy as Deliverable ── */}
          <Reveal className="mt-2">
            <section id="strategy" className="scroll-mt-28 border-t border-neutral-200 pt-14">
              <SectionEyebrow>OUTCOME</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
                Strategy as deliverable
              </h2>
              <p className="mt-5 max-w-3xl text-[15px] font-semibold leading-7 text-neutral-900">
                The project was paused before full implementation. The outcome was not a shipped product.
              </p>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-700">
                The outcome was a documented integration strategy, a set of validated architectural decisions, and a future-state model demonstrating how a specialized enterprise workflow could become a platform-native product — while maintaining workflow flexibility, preserving familiar user behaviors, and aligning with enterprise design standards.
              </p>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-700">
                Enterprise platform strategy often produces decisions more than deliverables. This project's value was in establishing a model that future integrations could reference — not in shipping a screen.
              </p>
              <StrategyArtifacts />
            </section>
          </Reveal>

          {/* ── REFLECTION ── */}
          <Reveal className="mt-2 pb-24">
            <section className="border-t border-neutral-200 pt-14">
              <SectionEyebrow>REFLECTION</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
                What this project reinforced
              </h2>
              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-neutral-700">
                Designing for enterprise platform integration requires a different kind of judgment than designing a standalone product. The hardest decisions aren't about which patterns to introduce — they're about which ones to resist introducing. Platform coherence is earned through restraint as much as through invention.
              </p>
              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-700">
                Working within a regulated, multi-stakeholder environment — where business expectations, platform constraints, and user familiarity pull in different directions — makes clear that a designer's role is as much about facilitation and editorial judgment as it is about craft. Getting the integration model right required being able to explain why the obvious answer was wrong, and to defend that position across a room of subject-matter experts.
              </p>
            </section>
          </Reveal>

        </article>
      </div>
    </main>
  );
}
