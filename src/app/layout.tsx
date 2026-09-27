// src/app/layout.tsx
import React from "react";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import HeaderSlot from "@/components/HeaderSlot";
import SiteFooter from "@/components/SiteFooter";
import RootFallback from "@/components/RootFallback";
import WorkPageBodyBackground from "@/components/WorkPageBodyBackground";

export const metadata: Metadata = {
  metadataBase: new URL("https://fanwang.ca"),

  title: {
    default: "Fan Wang — Senior Product Designer",
    template: "%s | Fan Wang",
  },
  description:
    "Designing enterprise and AI systems where clarity and trust matter most.",
  keywords: [
    "Senior Product Designer",
    "UX Designer",
    "Product Design",
    "AI UX",
    "Enterprise UX",
    "Information Architecture",
    "Fintech UX",
    "SaaS Design",
    "Accessibility",
    "Design Systems",
  ],
  authors: [{ name: "Fan Wang", url: "https://fanwang.ca" }],
  creator: "Fan Wang",

  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://fanwang.ca",
    siteName: "Fan Wang",
    title: "Fan Wang — Senior Product Designer",
    description:
      "Designing enterprise and AI systems where clarity and trust matter most.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fan Wang — Senior Product Designer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Fan Wang — Senior Product Designer",
    description:
      "Designing enterprise and AI systems where clarity and trust matter most.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://fanwang.ca",
  },
};

export const viewport: Viewport = {
  themeColor: "#02081c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <WorkPageBodyBackground />
        <RootFallback />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <HeaderSlot />
        <main id="main-content" className="relative" role="main">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}