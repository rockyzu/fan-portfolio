"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 pt-5">
        <div
          className={[
            "flex items-center justify-between rounded-[28px] px-6 py-4",
            "border border-white/18 bg-white/14 backdrop-blur-xl",
            "shadow-[0_18px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10",
            "transition-shadow duration-300 ease-out",
            "hover:shadow-[0_22px_56px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)]",
            "text-white",
          ].join(" ")}
        >
          <Link
            href="/"
            aria-label="Fan Wang – Home"
            aria-current={pathname === "/" ? "page" : undefined}
            className="text-sm font-semibold tracking-tight text-white/95 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
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
                  className="nav-link text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
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
              className="nav-link text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
            >
              Resume
            </a>

            <a
              href="https://www.linkedin.com/in/fanwang0607/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in new tab)"
              className="hidden sm:inline nav-link text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
            >
              LinkedIn
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}