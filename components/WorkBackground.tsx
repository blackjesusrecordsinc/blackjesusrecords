"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Props = {
  count?: number; // 11
  intervalMs?: number; // 7000
};

const pad2 = (n: number) => String(n).padStart(2, "0");

export default function WorkBackground({ count = 11, intervalMs = 7000 }: Props) {
  const reduce = useReducedMotion();

  const images = useMemo(
    () => Array.from({ length: count }, (_, i) => `/work/${pad2(i + 1)}.jpg`),
    [count]
  );

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => {
      setIdx((v) => (v + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [images.length, intervalMs, reduce]);

  const src = images[idx];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.03 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
          transition={reduce ? { duration: 0 } : { duration: 0.9, ease: "easeOut" }}
        >
          <Image
            src={src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* overlay ciné (lisible + premium) */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/80" />

      {/* texture */}
      <div className="absolute inset-0 opacity-[0.09] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px]" />
    </div>
  );
}
