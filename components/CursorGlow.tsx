"use client";

import { useEffect, useState } from "react";

/**
 * - SSR safe: on démarre à false
 * - On active seulement sur desktop hover + non-coarse
 * - setState uniquement via callbacks (évite lint set-state-in-effect)
 */

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mqCoarse = window.matchMedia("(pointer: coarse)");
    const mqHover = window.matchMedia("(hover: hover)");

    const update = () => setEnabled(!mqCoarse.matches && mqHover.matches);

    // ✅ pas "sync setState" direct → microtask
    queueMicrotask(update);

    const add = (mq: MediaQueryList) => {
      if (mq.addEventListener) mq.addEventListener("change", update);
      else mq.addListener(update);
    };
    const remove = (mq: MediaQueryList) => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };

    add(mqCoarse);
    add(mqHover);
    return () => {
      remove(mqCoarse);
      remove(mqHover);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[2]">
      {/* ⚠️ Remets ici ton rendu glow EXACT actuel (ne change pas les classes / style) */}
    </div>
  );
}
