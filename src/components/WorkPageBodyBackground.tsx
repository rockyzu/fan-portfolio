"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const CASE_STUDY_BACKGROUNDS: Record<string, { background: string }> = {
  "/work/intuit-ai": {
    background: "linear-gradient(180deg, #EEF4FF 0%, #F7F7FB 38%, #F9F7FF 100%)",
  },
  "/work/pfizer": {
    background: "#F5F3F9",
  },
  "/work/olg": {
    background: "linear-gradient(to bottom, rgba(250, 245, 255, 0.4), #ffffff)",
  },
};

const DEFAULT_BACKGROUND = "#ffffff";

export default function WorkPageBodyBackground() {
  const pathname = usePathname();

  useEffect(() => {
    const style = CASE_STUDY_BACKGROUNDS[pathname ?? ""];
    if (style) {
      document.body.style.background = style.background;
      document.body.style.backgroundAttachment = "fixed";
    } else {
      document.body.style.background = DEFAULT_BACKGROUND;
      document.body.style.backgroundAttachment = "";
    }
    return () => {
      document.body.style.background = DEFAULT_BACKGROUND;
      document.body.style.backgroundAttachment = "";
    };
  }, [pathname]);

  return null;
}
