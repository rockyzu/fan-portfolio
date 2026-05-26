"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

const CASE_STUDY_PATHS = ["/work/intuit-ai", "/work/pfizer", "/work/olg"];

export default function ContentHeader() {
  const pathname = usePathname();
  const isCaseStudy = pathname ? CASE_STUDY_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/")) : false;

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 pt-5">
        <div
          className={[
            "flex items-center justify-between rounded-[28px] px-6 py-4",
            "border border-neutral-200/80 backdrop-blur-md",
            "transition-shadow duration-300 ease-out",
            "hover:shadow-[0_16px_40px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]",
            "text-neutral-900",
            isCaseStudy
              ? "bg-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
              : "bg-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
          ].join(" ")}
        >
          <Link
            href="/"
            aria-label="Fan Wang – Home"
            className="text-sm font-semibold tracking-tight text-neutral-900 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2"
          >
            Fan Wang
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6 text-sm" aria-label="Main navigation">
            {nav.map((item) => {
              const active = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "nav-link transition",
                    active ? "text-neutral-900" : "text-neutral-700 hover:text-neutral-900",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume (opens in new tab)"
              className="nav-link text-neutral-700 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2"
            >
              Resume
            </a>

            <a
              href="https://www.linkedin.com/in/fanwang0607/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in new tab)"
              className="hidden sm:inline nav-link text-neutral-700 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2"
            >
              LinkedIn
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}