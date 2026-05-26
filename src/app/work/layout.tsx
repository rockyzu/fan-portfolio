import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies in enterprise IA, regulated platform design, and AI-assisted workflows.",
  alternates: { canonical: "https://fanwang.ca/work" },
  openGraph: {
    title: "Work — Fan Wang",
    description:
      "Selected case studies in enterprise IA, regulated platform design, and AI-assisted workflows.",
    url: "https://fanwang.ca/work",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
