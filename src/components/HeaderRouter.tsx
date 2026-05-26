"use client";
import { usePathname } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import ContentHeader from "@/components/ContentHeader";

export default function HeaderRouter() {
  const pathname = usePathname();
  const useSiteHeader = pathname === "/" || pathname === "/about" || pathname === "/work";

  return useSiteHeader ? <SiteHeader /> : <ContentHeader />;
}