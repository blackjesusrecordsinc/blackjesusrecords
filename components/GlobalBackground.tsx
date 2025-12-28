"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const WORK_IMAGES = Array.from(
  { length: 11 },
  (_, i) => `/work/${String(i + 1).padStart(2, "0")}.jpg`
);

export default function GlobalBackground() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((v) => (v + 1) % WORK_IMAGES.length);
    }, 9000); // lent, ciné
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      <Image
        key={WORK_IMAGES[index]}
        src={WORK_IMAGES[index]}
        alt="Black Jesus Records background"
        fill
        priority
        className="object-cover transition-opacity duration-1000"
      />

      {/* overlays cinéma */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[1.5px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />
    </div>
  );
}
