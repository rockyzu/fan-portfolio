"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const CASE_STUDY_PATHS = ["/work/intuit-ai", "/work/pfizer", "/work/olg"];

export default function SiteFooter() {
  const pathname = usePathname();
  const isCaseStudy = pathname ? CASE_STUDY_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/")) : false;

  return (
    <footer
      className={
        isCaseStudy
          ? "mt-6 border-t border-neutral-200/40 bg-transparent"
          : "mt-6 border-t border-neutral-200/80 bg-white"
      }
    >
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Fan Wang
          </div>

          <p className={[
            "text-[11px] tracking-[0.06em] text-center",
            isCaseStudy ? "text-neutral-400" : "text-neutral-500",
          ].join(" ")}>
            Design is most useful when it makes the next decision obvious.
          </p>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" aria-label="Footer navigation">
            <Link
              className="nav-link text-neutral-700 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2 rounded"
              href="/work"
            >
              Work
            </Link>
            <Link
              className="nav-link text-neutral-700 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2 rounded"
              href="/about"
            >
              About
            </Link>
            <a
              className="nav-link text-neutral-700 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2 rounded"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume (opens in new tab)"
            >
              Resume
            </a>
            <a
              className="nav-link text-neutral-700 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2 rounded"
              href="mailto:fan.wang0607@gmail.com"
              aria-label="Email Fan Wang"
            >
              Email
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}