"use client";

import { useEffect, useRef, useState } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

type Star = { x: number; y: number; r: number; a: number; tw: number; seed: number; vx: number; vy: number };

function generateStars(): Star[] {
  const count = 220;
  return Array.from({ length: count }, () => {
    const band = Math.random() < 0.55;
    const x = Math.random();
    const y = band
      ? clamp01(0.45 + (Math.random() - 0.5) * 0.22 + (x - 0.5) * 0.1)
      : Math.random();
    return {
      x,
      y,
      r: 0.35 + Math.random() * 0.9,
      a: 0.12 + Math.random() * 0.26,
      tw: 0.6 + Math.random() * 1.6,
      seed: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 0.006,
      vy: (Math.random() - 0.5) * 0.004,
    };
  });
}

function SubtleStars() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setStars(generateStars()));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (stars.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dt = Math.min(33, now - t0);
      t0 = now;

      ctx.clearRect(0, 0, w, h);

      const vg = ctx.createRadialGradient(
        w * 0.5,
        h * 0.45,
        0,
        w * 0.5,
        h * 0.45,
        Math.max(w, h) * 0.75
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.34)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        const tw = reducedMotion ? 0 : Math.sin((now / 1000) * s.tw + s.seed) * 0.08;
        const alpha = clamp01(s.a + tw);

        if (!reducedMotion) {
          s.x += (s.vx * dt) / 1000;
          s.y += (s.vy * dt) / 1000;
          if (s.x < -0.03) s.x = 1.03;
          if (s.x > 1.03) s.x = -0.03;
          if (s.y < -0.03) s.y = 1.03;
          if (s.y > 1.03) s.y = -0.03;
        }

        const x = s.x * w;
        const y = s.y * h;

        ctx.fillStyle = `rgba(235,245,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(120,185,255,${alpha * 0.1})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r * 2.1, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [stars, reducedMotion]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1]" aria-hidden />;
}

export default function PageBackground() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <>
      <div className="fixed inset-0 z-[-2]" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_30%_20%,rgba(35,90,255,0.40),transparent_55%),radial-gradient(900px_circle_at_75%_35%,rgba(0,55,180,0.40),transparent_60%),linear-gradient(to_bottom,rgba(4,16,45,0.94),rgba(2,8,24,0.98))]" />
        <div
          className={[
            "absolute inset-0 bg-[url('/galaxy/space2.jpg')] bg-cover bg-center",
            "opacity-[0.24] mix-blend-screen",
            reducedMotion ? "" : "animate-[bgDrift_26s_ease-in-out_infinite]",
          ].join(" ")}
        />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_35%,rgba(0,0,0,0),rgba(0,0,0,0.28))]" />
        <div className="absolute inset-0 bg-[rgba(2,8,28,0.62)]" />
      </div>
      <SubtleStars />
    </>
  );
}
