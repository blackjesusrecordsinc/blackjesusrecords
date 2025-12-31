"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Slide = { src: string; alt: string };
const pad2 = (n: number) => String(n).padStart(2, "0");

<<<<<<< HEAD
function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function HeroCineSlider({
  className = "",
  count = 14,
  ext = ".jpg",
  intervalMs = 9000,
  fadeSeconds = 2.8,
  onIndexChange,
}: {
=======
type Props = {
>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013
  className?: string;
  count?: number;
  ext?: ".jpg" | ".png" | ".jpeg";
  intervalMs?: number;
  fadeSeconds?: number;
  onIndexChange?: (index: number) => void;
<<<<<<< HEAD
}) {
  const reduce = useReducedMotion();

  /* ================= SLIDES ================= */
  const slides: Slide[] = useMemo(() => {
    return Array.from({ length: Math.max(2, count) }, (_, idx) => {
      const n = idx + 1;
      return {
        src: `/work/${pad2(n)}${ext}`,
        alt: `Black Jesus Records — Work ${pad2(n)}`,
      };
    });
  }, [count, ext]);

  /* ================= DOUBLE BUFFER ================= */
  const [frontIdx, setFrontIdx] = useState(0);
  const [backIdx, setBackIdx] = useState(1);
  const [frontIsA, setFrontIsA] = useState(true);

  const paused = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  /* ================= PRELOAD ================= */
=======

  darkness?: number;
  vignette?: number;
  glow?: number;
  grain?: number;
  showDots?: boolean;
};

export default function HeroCineSlider({
  className = "",
  count = 8,
  ext = ".jpg",
  intervalMs = 10000,
  fadeSeconds = 2.0,
  onIndexChange,

  darkness = 0.62,
  vignette = 0.45,
  glow = 0.06,
  grain = 0.05,
  showDots = false,
}: Props) {
  const reduce = useReducedMotion();

  // ✅ touch/desktop
  const [isTouch, setIsTouch] = useState(false);
>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // ✅ pause (hover / hors écran)
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

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

  // Slides
  const slides: Slide[] = useMemo(
    () =>
      Array.from({ length: Math.max(2, count) }, (_, i) => ({
        src: `/work/${pad2(i + 1)}${ext}`,
        alt: `Black Jesus Records — Work ${pad2(i + 1)}`,
      })),
    [count, ext]
  );

  const len = slides.length;

  // ✅ indices + toggle A/B
  const [front, setFront] = useState(0);
  const [back, setBack] = useState(1);
  const [showA, setShowA] = useState(true);

  // ✅ refs anti stale closure
  const frontRef = useRef(front);
  useEffect(() => {
    frontRef.current = front;
  }, [front]);

  // ✅ preload (3 prochaines)
  useEffect(() => {
    // évite crash SSR
    if (typeof window === "undefined") return;

    const preload = (src: string) => {
      const img = new window.Image();
      img.decoding = "async";
      img.loading = "eager";
      img.src = src;
    };

<<<<<<< HEAD
  /* ================= AUTOPLAY ================= */
  useEffect(() => {
    const tick = () => {
      if (!paused.current) {
        setFrontIdx((cur) => {
          const next = (cur + 1) % slides.length;
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

  /* ================= KEN BURNS (MICRO) ================= */
  const ken = useMemo(() => {
    const presets = [
      { s0: 1.01, s1: 1.035, x0: 0, x1: -4, y0: 0, y1: 3 },
      { s0: 1.01, s1: 1.035, x0: 4, x1: -3, y0: -2, y1: 3 },
      { s0: 1.01, s1: 1.035, x0: -4, x1: 3, y0: 3, y1: -2 },
    ];
    return presets[frontIdx % presets.length];
  }, [frontIdx]);

  const fade = reduce ? 0 : fadeSeconds;

  const aIsFront = frontIsA;
  const bIsFront = !frontIsA;
=======
    for (let i = 1; i <= 3; i++) {
      const idx = (front + i) % len;
      preload(slides[idx].src);
    }
  }, [front, len, slides]);

  // ✅ interval adapté touch
  const effectiveIntervalMs = isTouch ? intervalMs * 2 : intervalMs;

  // ✅ autoplay (pause aware) — interval stable, sans fuite
  useEffect(() => {
    if (reduce) return; // si reduced motion, pas d'autoplay (micro perf / UX)
    if (isPaused) return;

    const id = window.setInterval(() => {
      setShowA((v) => !v);

      const nextFront = (frontRef.current + 1) % len;
      frontRef.current = nextFront;

      setFront(nextFront);
      setBack((nextFront + 1) % len);

      onIndexChange?.(nextFront);
    }, effectiveIntervalMs);

    return () => window.clearInterval(id);
  }, [effectiveIntervalMs, isPaused, len, onIndexChange, reduce]);

  // ✅ Ken Burns memo (dépend de l’interval effectif)
  const kenBurns = useMemo(() => {
    const duration = effectiveIntervalMs / 1000 + 1;
    return {
      initial: { scale: 1.02, x: 0, y: 0 },
      animate: { scale: 1.045, x: -6, y: 4 },
      transition: { duration, ease: "easeInOut" as const },
    };
  }, [effectiveIntervalMs]);

  const fade = reduce ? 0 : fadeSeconds;

  // ✅ filter style (pas de classe dynamique)
  const imageStyle = useMemo(
    () =>
      ({
        filter: "saturate(0.9) contrast(0.95) brightness(0.88)",
      }) as React.CSSProperties,
    []
  );
>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013

  const A = slides[front];
  const B = slides[back];

  return (
    <div
<<<<<<< HEAD
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
=======
      ref={rootRef}
      className={`absolute inset-0 ${className} hero-slider-container`}
      aria-hidden="true"
      role="presentation"
      aria-label="Diaporama de travaux"
      onMouseEnter={() => !isTouch && setIsPaused(true)}
      onMouseLeave={() => !isTouch && setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => {
        // petite pause puis reprise (optionnel)
        window.setTimeout(() => setIsPaused(false), 900);
      }}
>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013
    >
      {/* ===== LAYER A ===== */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: showA ? 1 : 0 }}
        transition={{ duration: fade, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0"
<<<<<<< HEAD
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
            reduce
              ? { duration: 0 }
              : { duration: intervalMs / 1000 + 1, ease: "easeInOut" }
          }
=======
          initial={reduce ? {} : kenBurns.initial}
          animate={reduce ? {} : kenBurns.animate}
          transition={reduce ? {} : kenBurns.transition}
>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013
        >
          <Image
            src={A.src}
            alt={A.alt}
            fill
<<<<<<< HEAD
            priority={aIdx === 0}
            sizes="100vw"
            className="object-cover object-center"
=======
            sizes="100vw"
            className="object-cover object-center"
            style={imageStyle}
>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013
          />
        </motion.div>
      </motion.div>

      {/* ===== LAYER B ===== */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: showA ? 0 : 1 }}
        transition={{ duration: fade, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0"
<<<<<<< HEAD
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
            reduce
              ? { duration: 0 }
              : { duration: intervalMs / 1000 + 1, ease: "easeInOut" }
          }
=======
          initial={reduce ? {} : kenBurns.initial}
          animate={reduce ? {} : kenBurns.animate}
          transition={reduce ? {} : kenBurns.transition}
>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013
        >
          <Image
            src={B.src}
            alt={B.alt}
            fill
<<<<<<< HEAD
            priority={false}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>
=======
            sizes="100vw"
            className="object-cover object-center"
            style={imageStyle}
          />
        </motion.div>
      </motion.div>

      {/* OVERLAY LISIBILITÉ (NEUTRE) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom,
            rgba(0,0,0,${Math.max(0.45, darkness + 0.12)}) 0%,
            rgba(0,0,0,${Math.max(0.22, darkness - 0.22)}) 50%,
            rgba(0,0,0,${Math.max(0.45, darkness + 0.18)}) 100%)`,
        }}
      />

      {/* VIGNETTE DOUCE (réduite sur touch si tu veux — ici: micro adapt) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 ${isTouch ? 90 : 140}px rgba(0,0,0,${vignette})`,
        }}
      />

      {/* GLOW JAUNE */}
      {glow > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center,
              rgba(245,197,66,${glow}) 0%,
              rgba(0,0,0,0) 55%)`,
          }}
        />
      )}

      {/* GRAIN (désactivé reduce motion) */}
      {!reduce && grain > 0 && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('/noise.png')]"
        />
      )}

      {/* DOTS */}
      {showDots && (
        <div className="absolute bottom-6 left-6 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setFront(i);
                setBack((i + 1) % len);
                frontRef.current = i;
                setShowA(true);
                onIndexChange?.(i);
              }}
              className={`h-2.5 w-2.5 rounded-full ${i === front ? "bg-primary" : "bg-white/30"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Indicateur pause (optionnel) */}
      {isPaused && !isTouch && (
        <div className="absolute bottom-4 right-4 text-xs text-white/50">Pause</div>
      )}
>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013
    </div>
  );
}
