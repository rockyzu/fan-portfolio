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

type StarLayer = 0 | 1 | 2;
type Star = { x: number; y: number; r: number; a: number; tw: number; seed: number; vx: number; vy: number; layer: StarLayer };

const LAYER_CFG = [
  { twAmp: 0.05, r: 220, g: 232, b: 255, haloMul: 0,    haloScale: 0   },
  { twAmp: 0.13, r: 235, g: 245, b: 255, haloMul: 0.12, haloScale: 2.2 },
  { twAmp: 0.24, r: 248, g: 252, b: 255, haloMul: 0.28, haloScale: 3.2 },
] as const;

function generateStars(): Star[] {
  const out: Star[] = [];
  const add = (
    count: number, layer: StarLayer,
    rMin: number, rMax: number,
    aMin: number, aMax: number,
    heroWeight: number,
  ) => {
    for (let i = 0; i < count; i++) {
      const bias = Math.random() < heroWeight;
      out.push({
        x: bias ? 0.15 + Math.random() * 0.70 : Math.random(),
        y: bias ? Math.random() * 0.50         : Math.random(),
        r: rMin + Math.random() * (rMax - rMin),
        a: aMin + Math.random() * (aMax - aMin),
        tw: 0.3 + Math.random() * 1.8,
        seed: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.005,
        vy: (Math.random() - 0.5) * 0.003,
        layer,
      });
    }
  };
  add(300, 0, 0.15, 0.55, 0.06, 0.18, 0.30);
  add(100, 1, 0.45, 1.10, 0.22, 0.44, 0.35);
  add(25,  2, 0.90, 2.50, 0.50, 0.82, 0.50);
  return out;
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
        const cfg = LAYER_CFG[s.layer];
        const tw = reducedMotion ? 0 : Math.sin((now / 1000) * s.tw + s.seed) * cfg.twAmp;
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

        ctx.fillStyle = `rgba(${cfg.r},${cfg.g},${cfg.b},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (cfg.haloMul > 0) {
          ctx.fillStyle = `rgba(120,185,255,${alpha * cfg.haloMul})`;
          ctx.beginPath();
          ctx.arc(x, y, s.r * cfg.haloScale, 0, Math.PI * 2);
          ctx.fill();
        }
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
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,9,28,0.97),rgba(1,3,14,1.0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(18,52,165,0.52),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_15%_38%,rgba(25,68,210,0.28),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_48%_38%_at_84%_26%,rgba(0,34,145,0.24),transparent_62%)]" />
        <div
          className={[
            "absolute inset-0 bg-[url('/galaxy/space2.jpg')] bg-cover bg-center",
            "opacity-[0.30] mix-blend-screen",
            reducedMotion ? "" : "animate-[bgDrift_26s_ease-in-out_infinite]",
          ].join(" ")}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_35%,transparent_25%,rgba(0,0,0,0.42)_100%)]" />
        <div className="absolute inset-0 bg-[rgba(1,5,20,0.48)]" />
      </div>
      <SubtleStars />
    </>
  );
}
