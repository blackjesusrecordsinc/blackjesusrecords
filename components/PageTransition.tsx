"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  resetScroll?: boolean;
  disabledPaths?: string[];
  manageFocus?: boolean;
};

const variants = {
  initial: { opacity: 0, y: 6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function PageTransition({
  children,
  className = "",
  resetScroll = true,
  disabledPaths = [],
  manageFocus = true,
}: Props) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const shouldSkip =
    disabledPaths.length > 0 && disabledPaths.some((p) => pathname.startsWith(p));

  // ✅ reset scroll (optionnel)
  useEffect(() => {
    if (!resetScroll) return;
    if (reduce || shouldSkip) return;

    requestAnimationFrame(() => {
      // "instant" n'existe pas partout; auto est ok et immédiat
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [pathname, reduce, resetScroll, shouldSkip]);

  // ✅ focus management a11y (optionnel)
  useEffect(() => {
    if (!manageFocus) return;
    if (reduce || shouldSkip) return;

    const t = window.setTimeout(() => {
      const main = document.getElementById("main-content") as HTMLElement | null;
      if (!main) return;

      if (main.contains(document.activeElement)) return;

      const prevTab = main.getAttribute("tabindex");
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
      if (prevTab === null) main.removeAttribute("tabindex");
      else main.setAttribute("tabindex", prevTab);
    }, 320); // ~durée anim + marge

    return () => window.clearTimeout(t);
  }, [pathname, reduce, manageFocus, shouldSkip]);

  if (reduce || shouldSkip) return <div className={className}>{children}</div>;

  return (
    <AnimatePresence mode="sync" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
        style={{ willChange: "opacity, transform" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
