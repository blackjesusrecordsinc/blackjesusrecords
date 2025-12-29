"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const ALL_IMAGES = Array.from(
  { length: 11 },
  (_, i) => `/work/${String(i + 1).padStart(2, "0")}.jpg`
);

type Props = {
  count?: number;
  intervalMs?: number;
};

export default function WorkBackground({
  count = 7,
  intervalMs = 10000,
}: Props) {
  const images = useMemo(() => ALL_IMAGES.slice(0, count), [count]);
  const [front, setFront] = useState(0);
  const [back, setBack] = useState(1);
  const showFront = useRef(true);

  // autoplay (crossfade réel)
  useEffect(() => {
    const id = setInterval(() => {
      showFront.current = !showFront.current;
      setBack((v) => (v + 1) % images.length);
      setFront((v) => (v + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  const A = images[front];
  const B = images[back];

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* LAYER A */}
      <div
        className={`absolute inset-0 transition-opacity duration-[2200ms] ${
          showFront.current ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={A}
          alt=""
          fill
          sizes="100vw"
          className="object-cover scale-[1.03]"
        />
      </div>

      {/* LAYER B */}
      <div
        className={`absolute inset-0 transition-opacity duration-[2200ms] ${
          showFront.current ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={B}
          alt=""
          fill
          sizes="100vw"
          className="object-cover scale-[1.03]"
        />
      </div>

      {/* OVERLAY LISIBILITÉ — NEUTRE (PAS BLEU) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.45), rgba(0,0,0,0.8))",
        }}
      />

      {/* VOILE SOFT (léger, pas destructeur) */}
      <div className="absolute inset-0 backdrop-blur-[1.5px]" />

      {/* GRAIN CINÉ (léger) */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('/noise.png')]" />
    </div>
  );
}
