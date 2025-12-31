"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function TopProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Spring très doux (pas de jitter)
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.25,
  });

  // Respect accessibilité
  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="
        fixed top-0 left-0 right-0
        z-[60]
        h-[2px]
        origin-left
        bg-primary
      "
      style={{
        scaleX,
        willChange: "transform",
      }}
    />
  );
}
