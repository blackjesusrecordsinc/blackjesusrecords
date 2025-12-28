"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Slide = { src: string; alt: string };

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function HeroCineSlider({
  className = "",
  count = 10,
  ext = ".jpg",
  intervalMs = 8000,
  fadeSeconds = 1.15,
  onIndexChange,

  // ✅ nouveaux réglages “premium”
  darkness = 0.56, // plus haut = plus sombre (0.45–0.65 recommandé)
  vignette = 0.55, // force du vignettage (0.35–0.65)
  glow = 0.10, // halo doré (0.06–0.14)
  grain = 0.10, // grain (0.06–0.12)
  showDots = true,
}: {
  className?: string;
  count?: number;
  ext?: ".jpg" | ".png" | ".jpeg";
  intervalMs?: number;
  fadeSeconds?: number;
  onIndexChange?: (index: number) => void;

  darkness?: number;
  vignette?: number;
  glow?: number;
  grain?: number;
  showDots?: boolean;
}) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const paused = useRef(false);
  const timer = useRef<number | null>(null);

  const slides: Slide[] = useMemo(() => {
    return Array.from({ length: Math.max(2, count) }, (_, idx) => {
      const n = idx + 1;
      return {
        src: `/work/${pad2(n)}${ext}`, // /public/work/01.jpg ...
        alt: `Black Jesus Records — Work ${pad2(n)}`,
      };
    });
  }, [count, ext]);

  // Ken Burns presets (alternance)
  const ken = useMemo(() => {
    const presets = [
      { s0: 1.08, s1: 1.14, x0: 0, x1: -14, y0: 0, y1: 10 },
      { s0: 1.10, s1: 1.16, x0: 10, x1: -10, y0: -8, y1: 12 },
      { s0: 1.09, s1: 1.15, x0: -12, x1: 8, y0: 10, y1: -8 },
      { s0: 1.08, s1: 1.14, x0: 12, x1: -6, y0: 10, y1: 0 },
      { s0: 1.10, s1: 1.16, x0: -12, x1: 6, y0: -4, y1: 12 },
    ];
    return presets[i % presets.length];
  }, [i]);

  // autoplay
  useEffect(() => {
    if (timer.current) window.clearInterval(timer.current);

    timer.current = window.setInterval(() => {
      if (paused.current) return;
      setI((v) => (v + 1) % slides.length);
    }, intervalMs);

    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [intervalMs, slides.length]);

  // notify parent
  useEffect(() => {
    onIndexChange?.(i);
  }, [i, onIndexChange]);

  // swipe mobile
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches?.[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const x0 = startX.current;
    const x1 = e.changedTouches?.[0]?.clientX ?? null;
    if (x0 == null || x1 == null) return;
    const dx = x1 - x0;
    if (Math.abs(dx) < 45) return;
    if (dx < 0) setI((v) => (v + 1) % slides.length);
    else setI((v) => (v - 1 + slides.length) % slides.length);
    startX.current = null;
  };

  const current = slides[i];

  // clamp petit safety
  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

  const d = clamp01(darkness);
  const v = clamp01(vignette);
  const g = clamp01(glow);
  const gr = clamp01(grain);

  return (
    <div
      className={`absolute inset-0 ${className}`}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: fadeSeconds, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            initial={reduce ? { scale: 1, x: 0, y: 0 } : { scale: ken.s0, x: ken.x0, y: ken.y0 }}
            animate={reduce ? { scale: 1, x: 0, y: 0 } : { scale: ken.s1, x: ken.x1, y: ken.y1 }}
            transition={reduce ? { duration: 0 } : { duration: intervalMs / 1000 + 1, ease: "easeInOut" }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ✅ overlays réglables (plus “image visible”) */}
      {/* scrim global (assure la lisibilité) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom,
            rgba(0,0,0,${Math.max(0.35, d + 0.10)}) 0%,
            rgba(0,0,0,${Math.max(0.18, d - 0.20)}) 45%,
            rgba(0,0,0,${Math.max(0.35, d + 0.14)}) 100%)`,
        }}
      />

      {/* glow doré léger (ciné) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center,
            rgba(255, 215, 0, ${g}) 0%,
            rgba(0,0,0, ${Math.max(0.55, d + 0.18)}) 78%)`,
        }}
      />

      {/* vignette (moins violent que ton 140px) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 120px rgba(0,0,0,${v})`,
        }}
      />

      {/* grain film */}
      <motion.div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay pointer-events-none"
        style={{
          opacity: gr,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        }}
        animate={reduce ? {} : { x: [0, -10, 0], y: [0, 8, 0] }}
        transition={reduce ? {} : { duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* scanlines */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:100%_7px]" />

      {/* dots */}
      {showDots && (
        <div className="absolute bottom-6 left-6 flex items-center gap-2">
          {slides.slice(0, Math.min(slides.length, 10)).map((s, idx) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setI(idx)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                idx === i ? "bg-yellow-400" : "bg-white/25 hover:bg-white/40"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      <div className="absolute bottom-6 right-6 text-[11px] text-white/55 hidden sm:block pointer-events-none">
        Hover = pause · Swipe = change
      </div>
    </div>
  );
}
