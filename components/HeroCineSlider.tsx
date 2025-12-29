"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Slide = { src: string; alt: string };

const pad2 = (n: number) => String(n).padStart(2, "0");

type Props = {
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

  /* slides */
  const slides: Slide[] = useMemo(
    () =>
      Array.from({ length: Math.max(2, count) }, (_, i) => ({
        src: `/work/${pad2(i + 1)}${ext}`,
        alt: `Black Jesus Records — Work ${pad2(i + 1)}`,
      })),
    [count, ext]
  );

  /* indices A/B */
  const [front, setFront] = useState(0);
  const [back, setBack] = useState(1);
  const showA = useRef(true);

  /* autoplay stable */
  useEffect(() => {
    const id = setInterval(() => {
      showA.current = !showA.current;
      setFront((v) => (v + 1) % slides.length);
      setBack((v) => (v + 2) % slides.length);
      onIndexChange?.((front + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs, slides.length]);

  /* Ken Burns très léger */
  const ken = useMemo(
    () => ({ s0: 1.02, s1: 1.045, x0: 0, x1: -6, y0: 0, y1: 4 }),
    []
  );

  const fade = reduce ? 0 : fadeSeconds;

  const A = slides[front];
  const B = slides[back];

  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden>
      {/* LAYER A */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: showA.current ? 1 : 0 }}
        transition={{ duration: fade, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          initial={reduce ? {} : { scale: ken.s0, x: ken.x0, y: ken.y0 }}
          animate={reduce ? {} : { scale: ken.s1, x: ken.x1, y: ken.y1 }}
          transition={{ duration: intervalMs / 1000 + 1, ease: "easeInOut" }}
        >
          <Image
            src={A.src}
            alt={A.alt}
            fill
            sizes="100vw"
            className="object-cover object-center [filter:saturate(.9)_contrast(.95)_brightness(.88)]"
          />
        </motion.div>
      </motion.div>

      {/* LAYER B */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: showA.current ? 0 : 1 }}
        transition={{ duration: fade, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          initial={reduce ? {} : { scale: ken.s0, x: ken.x0, y: ken.y0 }}
          animate={reduce ? {} : { scale: ken.s1, x: ken.x1, y: ken.y1 }}
          transition={{ duration: intervalMs / 1000 + 1, ease: "easeInOut" }}
        >
          <Image
            src={B.src}
            alt={B.alt}
            fill
            sizes="100vw"
            className="object-cover object-center [filter:saturate(.9)_contrast(.95)_brightness(.88)]"
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

      {/* VIGNETTE DOUCE */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: `inset 0 0 140px rgba(0,0,0,${vignette})` }}
      />

      {/* GLOW JAUNE (TRÈS SUBTIL) */}
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

      {/* GRAIN LÉGER (DÉSACTIVÉ SI REDUCED MOTION) */}
      {!reduce && grain > 0 && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay
                     bg-[url('/noise.png')]"
        />
      )}

      {/* DOTS (OPTIONNEL) */}
      {showDots && (
        <div className="absolute bottom-6 left-6 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setFront(i);
                setBack((i + 1) % slides.length);
                showA.current = true;
                onIndexChange?.(i);
              }}
              className={`h-2.5 w-2.5 rounded-full ${
                i === front ? "bg-primary" : "bg-white/30"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
