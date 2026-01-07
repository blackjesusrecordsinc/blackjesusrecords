"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const WORK_IMAGES = Array.from(
  { length: 11 },
  (_, i) => `/work/${String(i + 1).padStart(2, "0")}.jpg`
);

type Props = {
  count?: number;
  intervalMs?: number;
};

export default function WorkBackground({
  count = 11,
  intervalMs = 7000,
}: Props) {
  const images = WORK_IMAGES.slice(0, count);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((v) => (v + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* IMAGE */}
      <Image
        key={images[index]}
        src={images[index]}
        alt="Black Jesus Records — background"
        fill
        priority
        className="
          object-cover
          animate-[bgFloat_40s_linear_infinite]
          transition-opacity
          duration-[2500ms]
        "
      />

      {/* LAYER AQUARIUM (PAS DE NOIR) */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* TEINTE BLEU / PROFONDEUR */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#061428]/40 via-[#020b1a]/30 to-[#020b1a]/50" />

      {/* GRAIN CINÉ */}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[url('/noise.png')]" />
    </div>
  );
}
