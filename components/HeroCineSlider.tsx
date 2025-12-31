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
  count = 14,
  ext = ".jpg",
  intervalMs = 9000,
  fadeSeconds = 2.8,
  onIndexChange,
}: {
  className?: string;
  count?: number;
  ext?: ".jpg" | ".png" | ".jpeg";
  intervalMs?: number;
  fadeSeconds?: number;
  onIndexChange?: (index: number) => void;
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
  useEffect(() => {
    slides.forEach((s) => {
      const img = new window.Image();
      img.src = s.src;
    });
  }, [slides]);

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

  const aIdx = aIsFront ? frontIdx : backIdx;
  const bIdx = bIsFront ? frontIdx : backIdx;

  const A = slides[aIdx];
  const B = slides[bIdx];

  return (
    <div
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {/* ===== LAYER A ===== */}
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
            reduce
              ? { duration: 0 }
              : { duration: intervalMs / 1000 + 1, ease: "easeInOut" }
          }
        >
          <Image
            src={A.src}
            alt={A.alt}
            fill
            priority={aIdx === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      {/* ===== LAYER B ===== */}
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
            reduce
              ? { duration: 0 }
              : { duration: intervalMs / 1000 + 1, ease: "easeInOut" }
          }
        >
          <Image
            src={B.src}
            alt={B.alt}
            fill
            priority={false}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
