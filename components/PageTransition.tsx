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

  // reset scroll (optionnel)
  useEffect(() => {
    if (!resetScroll) return;
    if (reduce || shouldSkip) return;

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [pathname, reduce, resetScroll, shouldSkip]);

  // focus management a11y (optionnel)
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
    }, 320);

    return () => window.clearTimeout(t);
  }, [pathname, reduce, manageFocus, shouldSkip]);

  if (reduce || shouldSkip) return <div className={className}>{children}</div>;

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => {
        if (typeof window !== "undefined")
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
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
            transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
          },
          exit: {
            opacity: 0,
            y: -6,
            transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
          },
        }}
        style={{
          willChange: "transform, opacity, filter",
          transform: "translateZ(0)",
        }}
      >
        {/* overlay ciné discret */}
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

        <div className={className}>{children}</div>
      </motion.div>
    </AnimatePresence>
  );
}
