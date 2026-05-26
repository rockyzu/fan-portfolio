import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OLG Corporate Website Redesign",
  description:
    "Restructuring a regulated content platform around user intent — IA strategy, stakeholder alignment, and scalable governance for Ontario Lottery & Gaming.",
  alternates: { canonical: "https://fanwang.ca/work/olg" },
  openGraph: {
    title: "OLG Corporate Website Redesign — Fan Wang",
    description:
      "Restructuring a regulated content platform around user intent — IA strategy, stakeholder alignment, and scalable governance.",
    url: "https://fanwang.ca/work/olg",
  },
  robots: { index: false, follow: false },
};

export default function OLGLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
