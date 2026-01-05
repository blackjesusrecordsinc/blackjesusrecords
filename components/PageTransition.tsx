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
<<<<<<< HEAD
    <AnimatePresence mode="sync" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
        style={{ willChange: "opacity, transform" }}
=======
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => {
        // premium: évite arriver "au milieu" sur certaines navigations
        if (typeof window !== "undefined") window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }}
    >
      <motion.div
        key={pathname}
        className="relative"
        initial="hidden"
        animate="show"
        exit="exit"
        variants={{
          hidden: {
            opacity: 0,
            y: 8,
            filter: "blur(4px)",
          },
          show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
          },
          exit: {
            opacity: 0,
            y: -6,
            // ✅ pas de blur en exit = texte plus premium
            transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        style={{
          willChange: "transform, opacity, filter",
          transform: "translateZ(0)", // ✅ anti-jitter / rendu plus net
        }}
>>>>>>> 10e061a (Rebuild: premium layout + motion + readability)
      >
        {/* ✅ overlay ciné discret (pas jaune, pas tableau) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: "linear" }}
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.0) 35%, rgba(0,0,0,0.08) 100%)",
          }}
        />

        {children}
      </motion.div>
    </AnimatePresence>
  );
}
