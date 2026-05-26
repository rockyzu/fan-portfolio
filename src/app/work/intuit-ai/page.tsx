"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect } from "react";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

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
      className={[
        "transform-gpu transition-all duration-700 ease-out motion-reduce:transition-none",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-semibold tracking-[0.16em] text-neutral-500">
      {children}
    </div>
  );
}

function LayerLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t border-neutral-200/80 pt-12 first:pt-0">
      <div className="text-[10px] font-semibold tracking-[0.2em] text-neutral-400 uppercase">
        {children}
      </div>
    </div>
  );
}

function Figure({
  src,
  alt,
  caption,
  glow = "blue",
}: {
  src: string;
  alt: string;
  caption?: string;
  glow?: "blue" | "violet";
}) {
  const glowClass =
    "bg-[radial-gradient(circle_at_30%_20%,rgba(35,108,255,0.20),transparent_55%)]";
  const shadowClass =
    "shadow-[0_28px_80px_rgba(35,108,255,0.12)]";

  return (
    <figure className="mt-6">
      <div className="relative">
        <div
          aria-hidden
          className={[
            "pointer-events-none absolute inset-0 rounded-3xl blur-2xl opacity-60",
            glowClass,
          ].join(" ")}
        />
        <div
          className={[
            "group relative aspect-[16/9] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100",
            shadowClass,
          ].join(" ")}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
            sizes="(min-width: 1200px) 980px, (min-width: 768px) 88vw, 94vw"
          />
          <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(700px_circle_at_18%_15%,rgba(255,255,255,0.35),transparent_60%)]" />
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-xs leading-relaxed text-neutral-600">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function ProblemItem({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="border-t border-neutral-200 py-4 first:border-t-0 first:pt-0">
      <div className="text-sm font-semibold text-neutral-900">{title}</div>
      <p className="mt-1 text-sm leading-6 text-neutral-700">{body}</p>
    </div>
  );
}

function InsightItem({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <div className="relative pl-10">
      <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-300 bg-white text-[11px] font-semibold text-neutral-600">
        {index}
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-white/92 p-5 shadow-[0_8px_24px_rgba(17,24,39,0.03)]">
        <div className="text-sm font-semibold text-neutral-900">{title}</div>
        <p className="mt-2 text-sm leading-6 text-neutral-700">{body}</p>
      </div>
    </div>
  );
}

function WorkflowStep({
  step,
  title,
  body,
}: {
  step: string;
  title: string;
  body: string;
}) {
  return (
    <div className="relative rounded-2xl border border-neutral-200 bg-white px-5 py-5 shadow-[0_8px_24px_rgba(17,24,39,0.03)]">
      <div className="text-[11px] font-semibold tracking-[0.14em] text-neutral-500">
        {step}
      </div>
      <div className="mt-2 text-sm font-semibold text-neutral-900">{title}</div>
      <p className="mt-2 text-sm leading-6 text-neutral-700">{body}</p>
    </div>
  );
}

function OutcomePill({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-3xl border border-[#236CFF]/12 bg-white px-5 py-5 shadow-[0_8px_24px_rgba(17,24,39,0.03)]">
      <div className="text-[11px] font-semibold tracking-[0.16em] text-neutral-500">
        {title}
      </div>
      <div className="mt-2 text-sm leading-6 text-neutral-700">{body}</div>
    </div>
  );
}

function DecisionFlow() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [active, setActive] = React.useState(false);

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
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const steps = [
    { n: "01", label: "User input", desc: "User describes their situation in natural language" },
    { n: "02", label: "Clarification", desc: "System identifies gaps and asks targeted follow-up questions" },
    { n: "03", label: "Rule mapping", desc: "Collected context matched against tax reporting rules" },
    { n: "04", label: "Recommendation", desc: "Reporting direction proposed with visible reasoning" },
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
              style={{ transitionDelay: active ? `${i * 130}ms` : "0ms" }}
            >
              <div
                className={[
                  "flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-semibold transition-all duration-500 motion-reduce:transition-none",
                  active
                    ? "bg-[#236CFF] text-white shadow-[0_0_0_5px_rgba(35,108,255,0.10)]"
                    : "bg-neutral-100 text-neutral-400",
                ].join(" ")}
                style={{ transitionDelay: active ? `${i * 130}ms` : "0ms" }}
              >
                {s.n}
              </div>
              <div className="mt-3 text-[12px] font-semibold text-neutral-900 leading-tight">{s.label}</div>
              <p className="mt-1 text-[11px] leading-[1.5] text-neutral-500 max-w-[108px]">{s.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <div
                aria-hidden
                className={[
                  "mt-[17px] shrink-0 px-1 text-neutral-300 text-xs transition-opacity duration-300 motion-reduce:transition-none",
                  active ? "opacity-100" : "opacity-0",
                ].join(" ")}
                style={{ transitionDelay: active ? `${i * 130 + 80}ms` : "0ms" }}
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

export default function IntuitAICaseStudyPage() {
  return (
    <main className="min-h-screen text-neutral-900">
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-10">
        <div className="mb-8">
          <Link
            href="/work"
            aria-label="Back to work"
            className="nav-link inline-flex items-center gap-3 text-sm text-neutral-700 hover:text-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#236CFF]/50 focus-visible:ring-offset-2 rounded"
          >
            <span aria-hidden>←</span>
            <span>Back to Work</span>
          </Link>
        </div>

        {/* HERO */}
        <Reveal>
          <header className="relative overflow-hidden pt-2 pb-4">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(35,108,255,0.10),transparent_65%)] blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-4 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(35,108,255,0.06),transparent_65%)] blur-3xl"
            />

            <div className="relative">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#236CFF] uppercase">
                Intuit · AI Systems · Financial Decision Design
              </p>

              <h1 className="mt-4 text-[1.875rem] sm:text-[2.4rem] md:text-[2.75rem] lg:text-[3.25rem] font-semibold leading-[1.1] tracking-tight text-neutral-900">
                Designing an AI agent for ambiguous tax decisions
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-[1.65] text-neutral-800">
                Most tax software asks users to interpret complex rules. This one interprets them for users.
              </p>

              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-[13px] text-neutral-700">
                <div>
                  <dt className="text-[10px] font-semibold tracking-[0.16em] uppercase text-neutral-400">Role</dt>
                  <dd className="mt-0.5">Product Designer — Internal Innovation</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold tracking-[0.16em] uppercase text-neutral-400">Focus</dt>
                  <dd className="mt-0.5">AI decision systems · Clarification flows · Human-AI trust</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold tracking-[0.16em] uppercase text-neutral-400">Context</dt>
                  <dd className="mt-0.5">Intuit · Self-employed tax filing</dd>
                </div>
              </dl>

              <div className="mt-10">
                <Figure
                  src="/covers/intuit-ai.png"
                  alt="Concept overview: guided AI decision flow for self-employed income reporting"
                  caption="Concept overview: guided AI decision flow for self-employed income reporting."
                  glow="blue"
                />
              </div>
            </div>
          </header>
        </Reveal>

        <div className="mt-20">
          <LayerLabel>System Design</LayerLabel>
        </div>

        {/* PROBLEM */}
        <Reveal className="mt-14">
          <section>
            <SectionLabel>PROBLEM</SectionLabel>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
              Problem
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] font-semibold leading-7 text-neutral-900">
              Tax systems assume clean categories, but real income situations are messy.
            </p>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-700">
              Self-employed users often deal with irregular income, side work, or occasional freelance jobs that do not clearly map to predefined tax categories. As a result, users must interpret complex reporting rules on their own.
            </p>

            <div className="mt-8 rounded-[28px] border border-neutral-200 bg-white/90 p-6 sm:p-7">
              <ProblemItem
                title="Ambiguous inputs"
                body="Real income situations are not standardized — side gigs, occasional work, and mixed patterns resist clean categorization."
              />
              <ProblemItem
                title="Rule interpretation burden"
                body="Users must translate policy into personal decisions without the system sharing how rules apply to their case."
              />
              <ProblemItem
                title="Low confidence at commitment"
                body="Users answer before they fully understand the implications, increasing risk of errors and anxiety."
              />
            </div>
          </section>
        </Reveal>

        {/* RESEARCH SIGNALS */}
        <Reveal className="mt-14">
          <section>
            <SectionLabel>RESEARCH</SectionLabel>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
              Research signals
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] font-semibold leading-7 text-neutral-900">
              Users were often asked to interpret tax rules on their own.
            </p>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-700">
              Observed patterns included:
            </p>
            <div className="relative mt-6 space-y-5">
              <div
                aria-hidden
                className="absolute left-3 top-3 bottom-3 w-px bg-neutral-200"
              />
              <InsightItem
                index="01"
                title="External validation behavior"
                body="Users frequently searched forums or tax help articles before answering questions."
              />
              <InsightItem
                index="02"
                title="Confusion around edge cases"
                body="Situations involving occasional work or mixed income sources were difficult to classify."
              />
              <InsightItem
                index="03"
                title="Low confidence in final answers"
                body="Users hesitated before submitting when they were unsure how the system interpreted their situation."
              />
            </div>
          </section>
        </Reveal>

        {/* CORE DESIGN CHALLENGE */}
        <Reveal className="mt-14">
          <section className="rounded-[28px] border border-neutral-200 bg-white/90 p-7 sm:p-8">
            <SectionLabel>CHALLENGE</SectionLabel>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
              Core challenge
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] font-semibold leading-7 text-neutral-900">
              How might we help users turn messy real-life income situations into clear reporting decisions?
            </p>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-700">
              The challenge was not simply improving the interface. The system needed to gather context, interpret ambiguous situations, and guide users toward the correct reporting decision.
            </p>
          </section>
        </Reveal>

        {/* DECISION MODEL */}
        <Reveal className="mt-14">
          <section>
            <SectionLabel>SYSTEM MODEL</SectionLabel>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
              Translating reality into a tax decision
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] font-semibold leading-7 text-neutral-900">
              The hardest part was translating real-world situations into structured tax logic.
            </p>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-700">
              Users describe income in everyday terms rather than tax categories. The system therefore needed a way to interpret user context before determining reporting requirements.
            </p>

            <div className="mt-8 rounded-[28px] border border-neutral-200 bg-white/90 p-6 sm:p-7">
              <ProblemItem
                title="User-stated situation is incomplete"
                body="Initial descriptions rarely contain everything needed for classification; the system must identify gaps."
              />
              <ProblemItem
                title="Classification depends on more than one factor"
                body="Frequency, intent, consistency, and context all affect how income should be reported."
              />
              <ProblemItem
                title="Conversation becomes the mechanism for gathering missing context"
                body="Targeted follow-up questions replace the burden of user self-interpretation."
              />
            </div>

            <DecisionFlow />

            <Figure
              src="/work/intuit-ai/flow.png"
              alt="Decision model: from user context to reporting recommendation"
              caption="Decision model: from user context to reporting recommendation"
              glow="violet"
            />
          </section>
        </Reveal>

        <LayerLabel>Interaction Design</LayerLabel>

        {/* AGENT WORKFLOW */}
        <Reveal className="mt-14">
          <section>
            <SectionLabel>WORKFLOW</SectionLabel>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
              Key workflows
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] font-semibold leading-7 text-neutral-900">
              The experience was designed as a guided decision workflow.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <WorkflowStep
                step="01"
                title="Understand the user's situation"
                body="Capture how the user describes their income in their own words."
              />
              <WorkflowStep
                step="02"
                title="Ask clarifying follow-up questions"
                body="Probe for details that affect the reporting decision."
              />
              <WorkflowStep
                step="03"
                title="Resolve uncertainty in the context"
                body="Clarify frequency, intent, and consistency."
              />
              <WorkflowStep
                step="04"
                title="Map the situation to tax rules"
                body="Use collected context to determine the appropriate reporting path."
              />
              <WorkflowStep
                step="05"
                title="Prompt the user to review the recommendation"
                body="Show the suggested direction before the user commits."
              />
            </div>
          </section>
        </Reveal>

        {/* INTERACTION PRINCIPLES */}
        <Reveal className="mt-14">
          <section className="rounded-[28px] border border-neutral-200 bg-white/90 p-7 sm:p-8">
            <SectionLabel>INTERACTION DESIGN</SectionLabel>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
              Interaction principles for reducing ambiguity
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <div className="border-t border-neutral-200 pt-4">
                <div className="text-sm font-semibold text-neutral-900">Clarify before answering</div>
                <p className="mt-2 text-sm leading-6 text-neutral-700">The system should not rush to a conclusion when user intent is still unclear.</p>
              </div>
              <div className="border-t border-neutral-200 pt-4">
                <div className="text-sm font-semibold text-neutral-900">Explain why a question matters</div>
                <p className="mt-2 text-sm leading-6 text-neutral-700">Users are more willing to answer follow-up questions when the purpose is visible.</p>
              </div>
              <div className="border-t border-neutral-200 pt-4">
                <div className="text-sm font-semibold text-neutral-900">Separate interpretation from commitment</div>
                <p className="mt-2 text-sm leading-6 text-neutral-700">The experience should help users understand the recommendation before they finalize anything.</p>
              </div>
              <div className="border-t border-neutral-200 pt-4">
                <div className="text-sm font-semibold text-neutral-900">Make uncertainty visible</div>
                <p className="mt-2 text-sm leading-6 text-neutral-700">The system should acknowledge when additional context is needed instead of pretending it already knows.</p>
              </div>
            </div>
          </section>
        </Reveal>

        <LayerLabel>Interface Design</LayerLabel>

        {/* KEY INTERFACE MOMENTS */}
        <Reveal className="mt-14">
          <section>
            <SectionLabel>INTERFACE</SectionLabel>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
              Key interface moments
            </h2>

            <div className="mt-8 space-y-12">
              <div className="grid gap-8 lg:grid-cols-[0.52fr_0.48fr] items-start">
                <div>
                  <div className="text-sm font-semibold text-neutral-900">Guided clarification</div>
                  <p className="mt-3 text-[15px] leading-7 text-neutral-700">
                    Instead of forcing users to choose a category immediately, the system first clarifies the user's situation through targeted follow-up questions.
                  </p>
                </div>
                <div>
                  <Figure
                    src="/work/intuit-ai/conversation.png"
                    alt="Guided clarification"
                    caption="Guided clarification: understanding the situation before narrowing the decision."
                    glow="blue"
                  />
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-[0.48fr_0.52fr] items-start">
                <div className="order-2 lg:order-1">
                  <Figure
                    src="/work/intuit-ai/states.png"
                    alt="Reasoning preview"
                    caption="Reasoning preview: how the system interpreted the situation."
                    glow="blue"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <div className="text-sm font-semibold text-neutral-900">Reasoning preview</div>
                  <p className="mt-3 text-[15px] leading-7 text-neutral-700">
                    The system summarizes how it interpreted the user's situation before showing a final answer, so the recommendation is traceable.
                  </p>
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-[0.52fr_0.48fr] items-start">
                <div>
                  <div className="text-sm font-semibold text-neutral-900">Final confirmation</div>
                  <p className="mt-3 text-[15px] leading-7 text-neutral-700">
                    Users review the suggested reporting direction before committing.
                  </p>
                </div>
                <div>
                  <Figure
                    src="/work/intuit-ai/system.png"
                    alt="Final confirmation"
                    caption="Final confirmation: review before commitment."
                    glow="violet"
                  />
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* SYSTEM BEHAVIOR */}
        <Reveal className="mt-20">
          <section className="rounded-[28px] border border-neutral-200 bg-white/90 p-7 sm:p-8">
            <SectionLabel>SYSTEM BEHAVIOR</SectionLabel>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
              This was not a chatbot problem — it was a system behavior problem
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] leading-7 text-neutral-700">
              The design challenge focused on orchestrating system behavior: identifying missing context, asking relevant questions, and determining when the system had enough information to recommend a reporting decision.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <div className="border-t border-neutral-200 pt-4">
                <div className="text-sm font-semibold text-neutral-900">Maintain context across turns</div>
                <p className="mt-2 text-sm leading-6 text-neutral-700">Keep what the user has shared in scope so follow-up questions stay relevant.</p>
              </div>
              <div className="border-t border-neutral-200 pt-4">
                <div className="text-sm font-semibold text-neutral-900">Ask only decision-relevant questions</div>
                <p className="mt-2 text-sm leading-6 text-neutral-700">Probe for details that materially affect the reporting path, not for the sake of conversation.</p>
              </div>
              <div className="border-t border-neutral-200 pt-4">
                <div className="text-sm font-semibold text-neutral-900">Balance automation with user control</div>
                <p className="mt-2 text-sm leading-6 text-neutral-700">Recommend a direction but let the user review and confirm before anything is recorded.</p>
              </div>
            </div>
          </section>
        </Reveal>

        {/* OUTCOME */}
        <Reveal className="mt-20">
          <section className="rounded-[28px] border border-[#236CFF]/15 bg-[linear-gradient(180deg,rgba(35,108,255,0.04)_0%,rgba(255,255,255,0.98)_100%)] p-7 sm:p-8">
            <SectionLabel>OUTCOME</SectionLabel>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
              Outcome
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] font-semibold leading-7 text-neutral-900">
              The concept reframed tax reporting as a guided decision process rather than a direct questionnaire.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <OutcomePill
                title="REDUCED AMBIGUITY"
                body="Users could understand the recommended direction before finalizing an answer."
              />
              <OutcomePill
                title="CLEARER REASONING"
                body="Visible interpretation and follow-up purpose increased trust in the flow."
              />
              <OutcomePill
                title="BETTER DECISION CONFIDENCE"
                body="The experience positioned AI as support for judgment, not a replacement for it."
              />
            </div>
          </section>
        </Reveal>

        {/* LEARNINGS */}
        <Reveal className="mt-20 pb-2">
          <section className="border-t border-neutral-200 pt-10">
            <SectionLabel>LEARNINGS</SectionLabel>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
              What I learned
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] font-semibold leading-7 text-neutral-900">
              Designing AI decision systems requires balancing automation with transparency.
            </p>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-700">
              Users trust AI recommendations more when the system reveals how it interprets their situation and why additional context is needed.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/work"
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:-translate-y-[1px] hover:bg-neutral-50 active:translate-y-0"
              >
                Back to Work
              </Link>
              <span className="text-sm text-neutral-500">More projects are coming.</span>
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}