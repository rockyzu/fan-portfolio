"use client";

import Link from "next/link";
import Image from "next/image";

export type ProjectItem = {
  number: string;
  domain: string;
  title: string;
  desc: string;
  href?: string;
  locked?: boolean;
  cover?: string;
  comingSoon?: boolean;
  ctaLabel?: string;
};

function CoverPlaceholder({ variant = 0 }: { variant?: number }) {
  // variant 0 — dot grid + restrained blue glow (Surplus Calculator, KPMG top-level)
  if (variant === 0) {
    return (
      <div className="absolute inset-0 bg-[#010b1f]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_38%_55%,rgba(29,78,216,0.20),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,0.55))]" />
      </div>
    );
  }

  // variant 1 — horizontal dot rows + faint banding (TSS — workflow/task-flow)
  if (variant === 1) {
    return (
      <div className="absolute inset-0 bg-[#010b1f]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "40px 22px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "100% 22px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_64%_40%,rgba(37,99,235,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.60))]" />
      </div>
    );
  }

  // variant 2 — fine crosshatch grid (WAM — modular panels / data structure)
  return (
    <div className="absolute inset-0 bg-[#010b1f]" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_65%,rgba(29,78,216,0.12),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.60))]" />
    </div>
  );
}

export function ProjectCard({
  item,
  linkClassName,
  imageAspect = "standard",
  placeholderVariant = 0,
  dataCard,
}: {
  item: ProjectItem;
  linkClassName?: string;
  imageAspect?: "standard" | "photo" | "featured";
  placeholderVariant?: number;
  dataCard?: string;
}) {
  const isInteractive = !item.comingSoon && !!item.href;

  const aspectClass =
    imageAspect === "photo"
      ? "aspect-[16/10]"
      : imageAspect === "featured"
      ? "aspect-[16/9] md:aspect-[8/3]"
      : "aspect-[16/9]";

  const articleClass = [
    "relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.16)] bg-[#0c1a38]/90 backdrop-blur",
    "shadow-[0_4px_24px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 ease-out",
    isInteractive &&
      "hover:-translate-y-1 hover:border-[rgba(255,255,255,0.28)] hover:shadow-[0_20px_56px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.13)]",
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperClass = [
    "group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30",
    linkClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <article className={articleClass}>
      <div className={`relative ${aspectClass} overflow-hidden`}>
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        {item.cover ? (
          <Image
            src={item.cover}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-[1.09]"
          />
        ) : (
          <CoverPlaceholder variant={placeholderVariant} />
        )}
      </div>

      <div className="px-6 pb-6 pt-5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-white/25">{item.number}</span>
          <span className="text-[11px] text-white/20">/</span>
          <span className="text-[11px] font-semibold tracking-[0.14em] text-white/40 uppercase">
            {item.domain}
          </span>
        </div>

        <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-tight text-white">
          {item.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/55">
          {item.desc}
        </p>

        <div className="mt-5">
          {item.comingSoon ? (
            <span className="text-[11px] font-semibold tracking-[0.14em] text-white/45 uppercase">
              Coming Soon
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[13px] text-white/50 transition-colors duration-200 group-hover:text-white/90">
              {item.locked && (
                <span aria-hidden className="text-white/70">
                  🔒
                </span>
              )}
              {item.ctaLabel ?? "View Case"}
              <span
                aria-hidden
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (!isInteractive) {
    return (
      <div
        className={wrapperClass}
        aria-label={`${item.title} — coming soon`}
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={item.href!}
      prefetch={false}
      data-card={dataCard}
      aria-label={`View project: ${item.title}`}
      className={wrapperClass}
    >
      {inner}
    </Link>
  );
}
