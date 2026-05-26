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

export default function AboutPage() {
  const strengths = [
    {
      title: "Clarity over cleverness",
      desc: "I design structure first—IA, system states, edge cases, and recovery—so complex products stay predictable.",
      featured: true,
      tone: "indigo",
      icon: "🧭",
    },
    {
      title: "Trust is designed",
      desc: "For AI-assisted UX, I make confidence, limits, and reasoning visible so people know what the system is doing.",
      tone: "violet",
      icon: "🛡️",
    },
    {
      title: "Accessibility is baseline",
      desc: "I design to WCAG in regulated contexts so experiences are inclusive, durable, and usable—not just compliant.",
      tone: "sky",
      icon: "♿",
    },
  ];

  const toneGlow = (tone: string) => {
    if (tone === "indigo") return "from-indigo-400/18 via-sky-300/10 to-transparent";
    if (tone === "violet") return "from-violet-400/18 via-fuchsia-300/10 to-transparent";
    return "from-sky-400/18 via-emerald-300/10 to-transparent";
  };

  const glassCard =
    "group relative overflow-hidden rounded-3xl border border-white/12 bg-black/22 backdrop-blur-xl " +
    "shadow-[0_14px_50px_rgba(0,0,0,0.35)] transition-all duration-200 ease-out " +
    "hover:-translate-y-[3px] hover:border-white/18 hover:bg-black/28 " +
    "hover:shadow-[0_28px_110px_rgba(0,0,0,0.55)]";

  const shineButton =
    // base
    "relative overflow-hidden isolate inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold " +
    "transition-all duration-200 ease-out hover:-translate-y-[1px] active:translate-y-0 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] " +
    // shine sweep (very subtle)
    "after:content-[''] after:absolute after:inset-y-[-40%] after:left-[-60%] after:w-[45%] " +
    "after:rotate-[22deg] after:bg-gradient-to-r after:from-transparent after:via-white/22 after:to-transparent " +
    "after:opacity-0 after:blur-[0.5px] after:transition-all after:duration-500 after:ease-out " +
    "hover:after:opacity-100 hover:after:left-[120%] " +
    // reduced motion: keep it calm
    "motion-reduce:hover:after:left-[-60%] motion-reduce:hover:after:opacity-0";

  return (
    <div className="min-h-screen text-white">
      <PageBackground />

      <div className="relative mx-auto max-w-7xl px-6 py-14">
        {/* HERO */}
        <header className="grid gap-8">
          <section className="group relative overflow-hidden rounded-3xl border border-white/14 bg-black/35 px-8 py-7 sm:px-10 sm:py-8 shadow-[0_25px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            {/* soft top sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />
            {/* gentle ambient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/6 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-indigo-400/8 blur-3xl"
            />

            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative h-36 w-36 sm:h-44 sm:w-44 shrink-0 overflow-hidden rounded-full border border-white/18 bg-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
                <Image
                  src="/me.jpg"
                  alt="Fan Wang portrait"
                  fill
                  sizes="176px"
                  className="object-cover transition duration-300 ease-out group-hover:brightness-[1.06] group-hover:contrast-[1.03]"
                  priority
                />
                {/* tiny highlight ring on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-[radial-gradient(120px_circle_at_30%_25%,rgba(255,255,255,0.16),transparent_60%)]"
                />
              </div>

              <div className="min-w-0 max-w-xl sm:ml-4">
                <div className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] text-white/75">
                  FAN WANG
                </div>

                <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight leading-tight text-white">
                  I design products people rely on to make decisions.
                </h1>

                <p className="mt-4 text-[16px] sm:text-[18px] leading-8 text-white/90">
                  B2B SaaS and enterprise platforms — where clarity, recovery, and trust matter.
                </p>

                <ul className="mt-4 space-y-2 text-[16px] sm:text-[18px] leading-8 text-white/90">
                  <li className="flex gap-3">
                    <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />
                    <span>
                      <span className="font-semibold text-white">Clear structure</span>
                      <span className="text-white/80"> — IA, content models, governance</span>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />
                    <span>
                      <span className="font-semibold text-white">Predictable states</span>
                      <span className="text-white/80"> — feedback, errors, recovery</span>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />
                    <span>
                      <span className="font-semibold text-white">Designed trust</span>
                      <span className="text-white/80"> — AI explainability, limits, confidence</span>
                    </span>
                  </li>
                </ul>

                <p className="mt-5 text-[13px] sm:text-sm leading-relaxed text-white/55 italic">
                  AI systems earn trust by showing their reasoning — not by hiding it.
                </p>

                <p className="mt-3 text-[13px] sm:text-sm leading-relaxed text-white/78">
                  Currently pursuing the IAAP CPACC certification to deepen my expertise in inclusive and accessible design.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/work"
                    className={
                      shineButton +
                      " border border-white/30 bg-white/12 text-white hover:bg-white/16 hover:border-white/40"
                    }
                  >
                    See selected work
                  </Link>

                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      shineButton +
                      " border border-white/22 bg-transparent text-white/95 hover:bg-white/10 hover:border-white/36"
                    }
                  >
                    Resume (PDF)
                  </a>
                </div>
              </div>
            </div>
          </section>
        </header>

        {/* HOW I WORK */}
        <section className="mt-12">
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            How I work
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {strengths.map((s) => {
              const glow = toneGlow(s.tone);

              return (
                <div
                  key={s.title}
                  className={[
                    glassCard,
                    s.featured
                      ? "md:col-span-2 p-7 hover:shadow-[0_38px_150px_rgba(99,102,241,0.18)]"
                      : "p-6",
                  ].join(" ")}
                >
                  {/* gradient wash */}
                  <div
                    aria-hidden
                    className={"pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br " + glow}
                  />

                  {/* hover sheen */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-[radial-gradient(700px_circle_at_18%_22%,rgba(255,255,255,0.12),transparent_55%)]"
                  />

                  {/* top highlight */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-lg" aria-hidden>
                      {s.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white/95">{s.title}</div>
                      <p className="mt-2 text-[13px] sm:text-sm leading-relaxed text-white/78">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* HOW I GOT HERE */}
        <section className="mt-10">
          <div className={glassCard + " p-7"}>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-[radial-gradient(700px_circle_at_18%_22%,rgba(255,255,255,0.10),transparent_55%)]"
            />
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              How I got here
            </h2>
            <div className="mt-3 space-y-3 text-sm sm:text-[15px] leading-relaxed text-white/78">
              <p>I started my career in finance, not design.</p>
              <p>
                Working with clients, I kept seeing the same problem: people weren’t making bad
                decisions — they were navigating confusing systems. The rules were correct, but the
                experience was cognitively overwhelming.
              </p>
              <p>
                That pushed me into product design. Today I build decision workflows and platforms
                that make the next step obvious, support recovery when things go wrong, and help
                teams ship with confidence.
              </p>
            </div>
            <p className="mt-6 text-xs text-white/40">
              Outside work: tennis, snowboarding, LEGO, and perfecting latte art.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}