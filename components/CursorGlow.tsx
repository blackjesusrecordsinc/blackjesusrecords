"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorGlow() {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduce) return;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches; // mobile/tablet
    const canHover = window.matchMedia("(hover: hover)").matches;

    // uniquement desktop “vrai”
    const ok = !isCoarse && canHover;
    setEnabled(ok);

    if (!ok) return;

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5]"
      style={{
        background: `radial-gradient(240px circle at ${pos.x}px ${pos.y}px, rgba(250, 204, 21, 0.10), transparent 60%)`,
      }}
      animate={{ opacity: [0.55, 0.75, 0.55] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
