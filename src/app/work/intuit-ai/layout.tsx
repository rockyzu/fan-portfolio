import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intuit AI-Assisted Workflows",
  description:
    "Designing AI clarification flows for ambiguous tax decisions — removing interpretive burden from users while making system reasoning transparent.",
  alternates: { canonical: "https://fanwang.ca/work/intuit-ai" },
  openGraph: {
    title: "Intuit AI-Assisted Workflows — Fan Wang",
    description:
      "Designing AI clarification flows for ambiguous tax decisions — removing interpretive burden from users while making system reasoning transparent.",
    url: "https://fanwang.ca/work/intuit-ai",
  },
  robots: { index: false, follow: false },
};

export default function IntuitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
