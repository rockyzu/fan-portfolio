import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surplus Calculator — KPMG One Port Integration",
  description:
    "Designing how a standalone surplus calculation tool could become part of KPMG's One Port ecosystem without disrupting critical tax workflows.",
  alternates: { canonical: "https://fanwang.ca/work/surplus-calculator" },
  openGraph: {
    title: "Surplus Calculator — Fan Wang",
    description:
      "Enterprise platform integration and workflow architecture for KPMG's One Port ecosystem.",
    url: "https://fanwang.ca/work/surplus-calculator",
  },
  robots: { index: false, follow: false },
};

export default function SurplusCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
