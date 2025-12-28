"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Slide = { src: string; alt: string };

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function HeroCineSlider({
  className = "",
  count = 10,
  ext = ".jpg",
  intervalMs = 9000,     // + lent = lecture sans distraction
  fadeSeconds = 2.2,     // crossfade cinéma
  onIndexChange,

  // overlays (lisibilité + premium)
  darkness = 0.62,       // 0.55–0.68
  vignette = 0.50,       // 0.35–0.60
  glow = 0.08,           // très léger
  grain = 0.06,          // faible = pas distrayant
  showDots = false,      // OFF par défaut (évite distraction)
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

  const slides: Slide[] = useMemo(() => {
    return Array.from({ length: Math.max(2, count) }, (_, idx) => {
      const n = idx + 1;
      return {
        src: `/work/${pad2(n)}${ext}`,
        alt: `Black Jesus Records — Work ${pad2(n)}`,
      };
    });
  }, [count, ext]);

  // ✅ vrai crossfade à 2 calques (A/B) => aucune coupure
  const [frontIdx, setFrontIdx] = useState(0);
  const [backIdx, setBackIdx] = useState(1);
  const [frontIsA, setFrontIsA] = useState(true);

  const paused = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  // clamp
  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
  const d = clamp01(darkness);
  const v = clamp01(vignette);
  const g = clamp01(glow);
  const gr = clamp01(grain);

  // ✅ préload images (évite flash / stutter)
  useEffect(() => {
    slides.forEach((s) => {
      const img = new window.Image();
      img.src = s.src;
    });
  }, [slides]);

  // ✅ autoplay stable (pas de drift, pause sans bug)
  useEffect(() => {
    const tick = () => {
      if (!paused.current) {
        setFrontIdx((cur) => {
          const next = (cur + 1) % slides.length;
          // back prépare la prochaine image pendant le fade
          setBackIdx(next);
          setFrontIsA((x) => !x);
          onIndexChange?.(next);
          return next;
        });
      }
      timeoutRef.current = window.setTimeout(tick, intervalMs);
    };

    timeoutRef.current = window.setTimeout(tick, intervalMs);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [intervalMs, slides.length, onIndexChange]);

  // ✅ Ken Burns TRÈS léger (sinon ça déconcentre)
  // (et désactivé si reduced motion)
  const ken = useMemo(() => {
    // micro mouvement seulement, presque imperceptible
    const presets = [
      { s0: 1.02, s1: 1.045, x0: 0, x1: -6, y0: 0, y1: 4 },
      { s0: 1.02, s1: 1.045, x0: 5, x1: -4, y0: -3, y1: 4 },
      { s0: 1.02, s1: 1.045, x0: -5, x1: 4, y0: 4, y1: -3 },
    ];
    return presets[frontIdx % presets.length];
  }, [frontIdx]);

  const fade = reduce ? 0 : fadeSeconds;

  // calques: A et B, on alterne qui est "front"
  const aIsFront = frontIsA;
  const bIsFront = !frontIsA;

  const aIdx = aIsFront ? frontIdx : backIdx;
  const bIdx = bIsFront ? frontIdx : backIdx;

  const A = slides[aIdx];
  const B = slides[bIdx];

  return (
    <div
      className={`absolute inset-0 ${className}`}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      aria-hidden="true"
    >
      {/* LAYER A */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: aIsFront ? 1 : 0 }}
        transition={{ duration: fade, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          initial={
            reduce
              ? { scale: 1, x: 0, y: 0 }
              : { scale: ken.s0, x: ken.x0, y: ken.y0 }
          }
          animate={
            reduce
              ? { scale: 1, x: 0, y: 0 }
              : { scale: ken.s1, x: ken.x1, y: ken.y1 }
          }
          transition={
            reduce ? { duration: 0 } : { duration: intervalMs / 1000 + 0.8, ease: "easeInOut" }
          }
        >
          {/* ✅ filtre directement sur le wrapper (calme l’image) */}
          <div className="absolute inset-0 [filter:saturate(.9)_contrast(.95)_brightness(.88)]">
            <Image
              src={A.src}
              alt={A.alt}
              fill
              priority={aIdx === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* LAYER B */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: bIsFront ? 1 : 0 }}
        transition={{ duration: fade, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          initial={
            reduce
              ? { scale: 1, x: 0, y: 0 }
              : { scale: ken.s0, x: ken.x0, y: ken.y0 }
          }
          animate={
            reduce
              ? { scale: 1, x: 0, y: 0 }
              : { scale: ken.s1, x: ken.x1, y: ken.y1 }
          }
          transition={
            reduce ? { duration: 0 } : { duration: intervalMs / 1000 + 0.8, ease: "easeInOut" }
          }
        >
          <div className="absolute inset-0 [filter:saturate(.9)_contrast(.95)_brightness(.88)]">
            <Image
              src={B.src}
              alt={B.alt}
              fill
              priority={false}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* ✅ overlay lisibilité (propre, stable, pas agressif) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom,
            rgba(0,0,0,${Math.max(0.45, d + 0.12)}) 0%,
            rgba(0,0,0,${Math.max(0.20, d - 0.22)}) 48%,
            rgba(0,0,0,${Math.max(0.45, d + 0.16)}) 100%)`,
        }}
      />

      {/* ✅ glow très subtil (optionnel, non distrayant) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center,
            rgba(255, 215, 0, ${g}) 0%,
            rgba(0,0,0, 0) 55%)`,
        }}
      />

      {/* ✅ vignette douce */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: `inset 0 0 140px rgba(0,0,0,${v})` }}
      />

      {/* ✅ voile soft (calme sans brouiller) */}
      <div className="absolute inset-0 pointer-events-none backdrop-blur-[1.5px]" />

      {/* ✅ grain faible (pas de scanlines = moins distract) */}
      {!reduce && gr > 0 && (
        <motion.div
          aria-hidden
          className="absolute inset-0 mix-blend-overlay pointer-events-none"
          style={{
            opacity: gr,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.30'/%3E%3C/svg%3E\")",
          }}
          animate={{ x: [0, -8, 0], y: [0, 6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* dots (désactivés par défaut) */}
      {showDots && (
        <div className="absolute bottom-6 left-6 flex items-center gap-2">
          {slides.slice(0, Math.min(slides.length, 10)).map((s, idx) => {
            const active = idx === frontIdx;
            return (
              <button
                key={s.src}
                type="button"
                onClick={() => {
                  setBackIdx(idx);
                  setFrontIdx(idx);
                  setFrontIsA(true);
                  onIndexChange?.(idx);
                }}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  active ? "bg-yellow-400" : "bg-white/25 hover:bg-white/40"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
