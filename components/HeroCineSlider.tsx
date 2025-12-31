"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Slide = { src: string; alt: string };

type Props = {
  className?: string;
  count?: number;
  ext?: ".jpg" | ".png" | ".jpeg";
  intervalMs?: number;
  fadeSeconds?: number;
  onIndexChange?: (index: number) => void;

  // overlays (lisibilité + premium)
  darkness?: number; // 0.55–0.70
  vignette?: number; // 0.30–0.60
  glow?: number; // 0.00–0.12
  grain?: number; // 0.00–0.10
  showDots?: boolean; // OFF par défaut
};

const pad2 = (n: number) => String(n).padStart(2, "0");

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export default function HeroCineSlider({
  className = "",
  count = 14,
  ext = ".jpg",
  intervalMs = 9000,
  fadeSeconds = 2.6,
  onIndexChange,

  darkness = 0.62,
  vignette = 0.48,
  glow = 0.06,
  grain = 0.05,
  showDots = false,
}: Props) {
  const reduce = useReducedMotion();

  const d = clamp01(darkness);
  const v = clamp01(vignette);
  const g = clamp01(glow);
  const gr = clamp01(grain);

  // ✅ détecte touch
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // ✅ pause + visibilité (perf)
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof window === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) setIsPaused(true);
  }, [isVisible]);

  // ✅ slides
  const slides: Slide[] = useMemo(() => {
    const total = Math.max(2, count);
    return Array.from({ length: total }, (_, i) => ({
      src: `/work/${pad2(i + 1)}${ext}`,
      alt: `Black Jesus Records — Work ${pad2(i + 1)}`,
    }));
  }, [count, ext]);

  const len = slides.length;

  // ✅ double buffer A/B (crossfade)
  const [front, setFront] = useState(0);
  const [back, setBack] = useState(1);
  const [showA, setShowA] = useState(true);

  // refs anti stale closure
  const frontRef = useRef(front);
  useEffect(() => {
    frontRef.current = front;
  }, [front]);

  // ✅ preload (3 prochaines) + current
  useEffect(() => {
    if (typeof window === "undefined") return;

    const preload = (src: string) => {
      const img = new window.Image();
      img.decoding = "async";
      img.loading = "eager";
      img.src = src;
    };

    preload(slides[front].src);
    for (let i = 1; i <= 3; i++) {
      preload(slides[(front + i) % len].src);
    }
  }, [front, len, slides]);

  // ✅ interval adapté au touch (encore + imperceptible)
  const effectiveIntervalMs = isTouch ? intervalMs * 2 : intervalMs;

  // ✅ autoplay (pause aware)
  useEffect(() => {
    if (reduce) return; // si reduced motion, pas d'autoplay
    if (isPaused) return;

    const id = window.setInterval(() => {
      setShowA((x) => !x);

      const next = (frontRef.current + 1) % len;
      frontRef.current = next;

      setFront(next);
      setBack((next + 1) % len);

      onIndexChange?.(next);
    }, effectiveIntervalMs);

    return () => window.clearInterval(id);
  }, [effectiveIntervalMs, isPaused, len, onIndexChange, reduce]);

  // ✅ Ken Burns ultra léger (presque imperceptible)
  const ken = useMemo(() => {
    const duration = effectiveIntervalMs / 1000 + 1;
    // micro mouvement, pas de “wow” visible
    return {
      initial: { scale: 1.02, x: 0, y: 0 },
      animate: { scale: 1.045, x: -6, y: 4 },
      transition: { duration, ease: "easeInOut" as const },
    };
  }, [effectiveIntervalMs]);

  const fade = reduce ? 0 : fadeSeconds;

  // ✅ filtre image stable (pas de classe tailwind dynamique)
  const imageStyle = useMemo(
    () =>
      ({
        filter: "saturate(0.9) contrast(0.95) brightness(0.88)",
      }) as React.CSSProperties,
    []
  );

  const A = slides[front];
  const B = slides[back];

  return (
    <div
      ref={rootRef}
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
      role="presentation"
      onMouseEnter={() => !isTouch && setIsPaused(true)}
      onMouseLeave={() => !isTouch && setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => window.setTimeout(() => setIsPaused(false), 900)}
    >
      {/* LAYER A */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: showA ? 1 : 0 }}
        transition={{ duration: fade, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          initial={reduce ? {} : ken.initial}
          animate={reduce ? {} : ken.animate}
          transition={reduce ? {} : ken.transition}
        >
          <Image
            src={A.src}
            alt={A.alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            style={imageStyle}
            priority={front === 0}
          />
        </motion.div>
      </motion.div>

      {/* LAYER B */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: showA ? 0 : 1 }}
        transition={{ duration: fade, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          initial={reduce ? {} : ken.initial}
          animate={reduce ? {} : ken.animate}
          transition={reduce ? {} : ken.transition}
        >
          <Image
            src={B.src}
            alt={B.alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            style={imageStyle}
          />
        </motion.div>
      </motion.div>

      {/* overlay lisibilité (stable) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom,
            rgba(0,0,0,${Math.max(0.45, d + 0.12)}) 0%,
            rgba(0,0,0,${Math.max(0.22, d - 0.22)}) 50%,
            rgba(0,0,0,${Math.max(0.45, d + 0.18)}) 100%)`,
        }}
      />

      {/* glow jaune (subtil) */}
      {g > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center,
              rgba(245,197,66,${g}) 0%,
              rgba(0,0,0,0) 55%)`,
          }}
        />
      )}

      {/* vignette douce */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 ${isTouch ? 90 : 140}px rgba(0,0,0,${v})`,
        }}
      />

      {/* grain (optionnel) */}
      {!reduce && gr > 0 && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            opacity: gr,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.30'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
          }}
        />
      )}

      {/* dots (désactivés par défaut) */}
      {showDots && (
        <div className="absolute bottom-6 left-6 flex gap-2">
          {slides.slice(0, Math.min(10, slides.length)).map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => {
                setFront(i);
                setBack((i + 1) % len);
                frontRef.current = i;
                setShowA(true);
                onIndexChange?.(i);
              }}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === front ? "bg-[var(--brand-yellow)]" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
