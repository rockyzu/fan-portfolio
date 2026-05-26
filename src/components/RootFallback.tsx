"use client";

import { useEffect, useState } from "react";

/**
 * Shows "Fan Wang — loading…" immediately so the page is never blank.
 * Hides itself after mount so the real app content is visible.
 */
export default function RootFallback() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(true);
  }, []);

  if (hidden) return null;

  return (
    <div
      id="root-fallback"
      style={{
        position: "fixed",
        inset: 0,
        background: "#02081c",
        color: "#e8e8e8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.125rem",
        zIndex: 9999,
      }}
      aria-hidden
      role="presentation"
    >
      <span>Fan Wang — loading…</span>
    </div>
  );
}
