"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ProjectCard, type ProjectItem } from "@/components/ProjectCard";

type WorkItem = ProjectItem;

const WORK: WorkItem[] = [
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


function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

type StarLayer = 0 | 1 | 2;
type Star = { x: number; y: number; r: number; a: number; tw: number; seed: number; vx: number; vy: number; layer: StarLayer };

const LAYER_CFG = [
  { twAmp: 0.05, r: 220, g: 232, b: 255, haloMul: 0,    haloScale: 0   }, // distant — tiny, dim, no halo
  { twAmp: 0.13, r: 235, g: 245, b: 255, haloMul: 0.12, haloScale: 2.2 }, // medium  — varied brightness, soft halo
  { twAmp: 0.24, r: 248, g: 252, b: 255, haloMul: 0.28, haloScale: 3.2 }, // hero    — bright accent stars, visible glow
] as const;

function generateStars(): Star[] {
  const out: Star[] = [];
  const add = (
    count: number, layer: StarLayer,
    rMin: number, rMax: number,
    aMin: number, aMax: number,
    heroWeight: number,
  ) => {
    for (let i = 0; i < count; i++) {
      const bias = Math.random() < heroWeight;
      out.push({
        x: bias ? 0.15 + Math.random() * 0.70 : Math.random(),
        y: bias ? Math.random() * 0.50         : Math.random(),
        r: rMin + Math.random() * (rMax - rMin),
        a: aMin + Math.random() * (aMax - aMin),
        tw: 0.3 + Math.random() * 1.8,
        seed: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.005,
        vy: (Math.random() - 0.5) * 0.003,
        layer,
      });
    }
  };
  add(300, 0, 0.15, 0.55, 0.06, 0.18, 0.30); // distant: many tiny dim stars
  add(100, 1, 0.45, 1.10, 0.22, 0.44, 0.35); // medium: varied brightness
  add(25,  2, 0.90, 2.50, 0.50, 0.82, 0.50); // hero: few bright accent stars
  return out;
}

function SubtleStars() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setStars(generateStars()));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (stars.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dt = Math.min(33, now - t0);
      t0 = now;

      ctx.clearRect(0, 0, w, h);

      const vg = ctx.createRadialGradient(
        w * 0.5,
        h * 0.45,
        0,
        w * 0.5,
        h * 0.45,
        Math.max(w, h) * 0.75
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.34)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        const cfg = LAYER_CFG[s.layer];
        const tw = reducedMotion ? 0 : Math.sin((now / 1000) * s.tw + s.seed) * cfg.twAmp;
        const alpha = clamp01(s.a + tw);

        if (!reducedMotion) {
          s.x += (s.vx * dt) / 1000;
          s.y += (s.vy * dt) / 1000;
          if (s.x < -0.03) s.x = 1.03;
          if (s.x > 1.03) s.x = -0.03;
          if (s.y < -0.03) s.y = 1.03;
          if (s.y > 1.03) s.y = -0.03;
        }

        const x = s.x * w;
        const y = s.y * h;

        ctx.fillStyle = `rgba(${cfg.r},${cfg.g},${cfg.b},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (cfg.haloMul > 0) {
          ctx.fillStyle = `rgba(120,185,255,${alpha * cfg.haloMul})`;
          ctx.beginPath();
          ctx.arc(x, y, s.r * cfg.haloScale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [stars, reducedMotion]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1]" aria-hidden />;
}


function ArrowButton({
  dir,
  onClick,
  label,
}: {
  dir: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  const isLeft = dir === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-black/40 text-white/95 backdrop-blur transition hover:bg-black/55 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
    >
      <span aria-hidden className="text-lg transition group-hover:scale-110">{isLeft ? "←" : "→"}</span>
    </button>
  );
}

function SectionShell({
  title,
  subtitle,
  right,
  children,
  sectionId,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  sectionId?: string;
}) {
  const headingId = sectionId ? `${sectionId}-heading` : undefined;
  return (
    <section className="mt-14" aria-labelledby={headingId} id={sectionId}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 id={headingId} className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
          {subtitle ? <p className="mt-2 max-w-2xl text-sm text-white/90">{subtitle}</p> : null}
        </div>
        {right ? <div className="hidden md:flex gap-2">{right}</div> : null}
      </div>
      {children}
    </section>
  );
}

function HorizontalCarousel({
  children,
  scrollRef,
  ariaLabel,
}: {
  children: React.ReactNode;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  ariaLabel?: string;
}) {
  return (
    <div
      ref={scrollRef}
      role="region"
      aria-label={ariaLabel}
      className="mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-5 pr-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {children}
    </div>
  );
}

function WorkCarousel({ items }: { items: WorkItem[] }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (dir: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card='work']");
    const amount = card ? Math.floor(card.offsetWidth * 0.85) : 480;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <SectionShell
      title="Selected Work"
      sectionId="work"
      right={
        <>
          <ArrowButton dir="left" onClick={() => scrollByAmount("left")} label="Scroll work left" />
          <ArrowButton dir="right" onClick={() => scrollByAmount("right")} label="Scroll work right" />
        </>
      }
    >
      <HorizontalCarousel scrollRef={ref} ariaLabel="Work projects">
        {items.map((w) => (
          <ProjectCard
            key={w.href}
            item={w}
            dataCard="work"
            imageAspect="photo"
            linkClassName="relative snap-start min-w-[86%] sm:min-w-[62%] md:min-w-[500px]"
          />
        ))}
      </HorizontalCarousel>

      <div className="mt-4 flex gap-2 md:hidden">
        <ArrowButton dir="left" onClick={() => scrollByAmount("left")} label="Scroll work left" />
        <ArrowButton dir="right" onClick={() => scrollByAmount("right")} label="Scroll work right" />
      </div>
    </SectionShell>
  );
}



function TestimonialsSection() {
  return (
    <section className="mt-14" aria-labelledby="testimonials-heading">
      <h2 id="testimonials-heading" className="text-2xl font-semibold tracking-tight text-white">
        What people I've worked with say
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <figure className="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur">
          <blockquote>
            <p className="text-[13px] leading-relaxed text-white/78">
              "Fan is a thoughtful collaborator who brings a creative yet analytical approach to problem-solving. I have no doubt that she will continue to excel and make significant contributions wherever her career takes her next."
            </p>
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/15">
              <Image src="/testimonials/maddie.png" alt="Maddie Brown" fill sizes="32px" className="object-cover" />
            </div>
            <div>
              <a
                href="https://www.linkedin.com/in/maddie-brown-97329777/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-semibold text-white/90 underline decoration-white/20 underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
              >
                Maddie Brown
              </a>
              <div className="text-[11px] text-white/50">Head of Product Design, Publicis Production</div>
            </div>
          </figcaption>
        </figure>

        <figure className="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur">
          <blockquote>
            <p className="text-[13px] leading-relaxed text-white/78">
              "Fan collaborated seamlessly with team members and consistently showed strong commitment to delivering high-quality work. She's a great addition to any team, and I highly recommend her for future UX opportunities."
            </p>
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/15">
              <Image src="/testimonials/karl.jpeg" alt="Karl Stahl" fill sizes="32px" className="object-cover" />
            </div>
            <div>
              <div className="text-[12px] font-semibold text-white/90">Karl Stahl</div>
              <div className="text-[11px] text-white/50">Associate Director, Experience Design</div>
            </div>
          </figcaption>
        </figure>

        <figure className="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur">
          <blockquote>
            <p className="text-[13px] leading-relaxed text-white/78">
              "Fan is a passionate designer with strong research and design instincts. Her expertise leads to simple, effective solutions. A great partner and enthusiastic team member."
            </p>
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/15">
              <Image src="/testimonials/jeff.jpeg" alt="Jeff Coombs" fill sizes="32px" className="object-cover" />
            </div>
            <div>
              <div className="text-[12px] font-semibold text-white/90">Jeff Coombs</div>
              <div className="text-[11px] text-white/50">Senior Product Designer</div>
            </div>
          </figcaption>
        </figure>

      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="mt-24 pb-16" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 id="contact-heading" className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
          Let's build something clear.
        </h2>
        <p className="mt-6 mx-auto max-w-2xl text-lg text-white/90 leading-relaxed">
          If you're hiring for complex systems, platforms, or AI workflows, I'd love to chat.
        </p>
      </div>
    </section>
  );
}

export default function HomeClient() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="min-h-screen text-white">
      <div className="fixed inset-0 z-[-2]" aria-hidden="true">
        {/* Base — deep navy foundation */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,9,28,0.97),rgba(1,3,14,1.0))]" />
        {/* Hero focal glow — concentrated behind headline area */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(18,52,165,0.52),transparent_70%)]" />
        {/* Left galaxy depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_15%_38%,rgba(25,68,210,0.28),transparent_65%)]" />
        {/* Right atmospheric layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_48%_38%_at_84%_26%,rgba(0,34,145,0.24),transparent_62%)]" />
        {/* Space image texture */}
        <div
          className={[
            "absolute inset-0 bg-[url('/galaxy/space2.jpg')] bg-cover bg-center",
            "opacity-[0.30] mix-blend-screen",
            reducedMotion ? "" : "animate-[bgDrift_26s_ease-in-out_infinite]",
          ].join(" ")}
        />
        {/* Edge vignette — pulls attention inward */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_35%,transparent_25%,rgba(0,0,0,0.42)_100%)]" />
        {/* Dark base overlay — reduced from 0.62 to let depth breathe */}
        <div className="absolute inset-0 bg-[rgba(1,5,20,0.48)]" />
      </div>

      <SubtleStars />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mt-14">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50">
            Enterprise · AI Workflows · Regulated UX
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Product designer who makes
            <span className="block text-white">complex systems feel simple.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
            I design enterprise platforms, regulated products, and AI-assisted workflows — turning complex requirements into experiences people can understand and act on.
          </p>
          <p className="mt-4 text-sm text-white/55">
            Currently designing enterprise tax platform experiences at KPMG Canada.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center justify-center rounded-2xl border border-white/35 bg-white/20 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-200 ease-out hover:bg-white/28 hover:border-white/50 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02081c]"
              href="/work"
              aria-label="View selected work"
            >
              View work
            </a>
            <a
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-black/25 px-6 py-3 text-sm font-medium text-white/95 transition-all duration-200 ease-out hover:bg-black/40 hover:border-white/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02081c]"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume (opens in new tab)"
            >
              Resume
            </a>
            <a
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-black/25 px-6 py-3 text-sm font-medium text-white/95 transition-all duration-200 ease-out hover:bg-black/40 hover:border-white/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02081c]"
              href="mailto:fan.wang0607@gmail.com"
              aria-label="Email Fan Wang"
            >
              Email
            </a>
          </div>
        </header>
        <WorkCarousel items={WORK} />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </div>
  );
}
