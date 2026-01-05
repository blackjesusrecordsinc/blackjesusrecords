"use client";

import { motion } from "framer-motion";

export default function OutlineCtaLine({
  label,
  sub,
  onClick,
  emphasis = false,
}: {
  label: string;
  sub: string;
  onClick: () => void;
  emphasis?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      className={[
        "relative w-full sm:w-[380px]",
        "px-8 py-4 rounded-2xl text-left",
        "overflow-hidden backdrop-blur-md transition",
        emphasis
          ? "bg-yellow-400 text-black"
          : "bg-black/20 text-white border border-white/20",
      ].join(" ")}
      aria-label={label}
    >
      {!emphasis && (
        <span className="absolute inset-0 outline-cta-border pointer-events-none" />
      )}

      <span className="relative block text-base font-extrabold">{label}</span>
      <span className="relative block text-xs mt-1 opacity-75">{sub}</span>
    </motion.button>
  );
}
