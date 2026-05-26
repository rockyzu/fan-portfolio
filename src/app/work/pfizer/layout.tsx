import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pfizer Global Learning Platform",
  description:
    "Unifying fragmented healthcare training tools into a single role-based platform for learners, program managers, and compliance admins.",
  alternates: { canonical: "https://fanwang.ca/work/pfizer" },
  openGraph: {
    title: "Pfizer Global Learning Platform — Fan Wang",
    description:
      "Unifying fragmented healthcare training tools into a single role-based platform for learners, program managers, and compliance admins.",
    url: "https://fanwang.ca/work/pfizer",
  },
  robots: { index: false, follow: false },
};

export default function PfizerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
