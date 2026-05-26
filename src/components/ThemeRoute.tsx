"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ThemeRoute() {
  const pathname = usePathname();

  useEffect(() => {
    // 只让 Home 是 dark，其它页面都是 light
    const theme = pathname === "/" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, [pathname]);

  return null;
}