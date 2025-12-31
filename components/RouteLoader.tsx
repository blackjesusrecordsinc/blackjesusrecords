"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/* =========================
   Helpers navigation
========================= */
function isModifiedEvent(e: MouseEvent) {
  return e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;
}

function getAnchorTarget(el: HTMLElement | null): HTMLAnchorElement | null {
  let node: HTMLElement | null = el;
  while (node) {
    if (node.tagName === "A") return node as HTMLAnchorElement;
    node = node.parentElement;
  }
  return null;
}

function isInternalHref(href: string) {
  if (!href) return false;
  if (href.startsWith("#")) return false;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;

  if (href.startsWith("http")) {
    try {
      const u = new URL(href);
      return u.origin === window.location.origin;
    } catch {
      return false;
    }
  }
  return href.startsWith("/");
}

function isSamePageHashNav(href: string) {
  try {
    const next = new URL(href, window.location.href);
    const cur = new URL(window.location.href);
    return (
      next.pathname === cur.pathname &&
      !!next.hash &&
      next.search === cur.search
    );
  } catch {
    return false;
  }
}

/* =========================
   Component
========================= */
export default function RouteLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reduce = useReducedMotion();

  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState("");

  const timeoutRef = useRef<number | null>(null);

  /* stop loader on route change */
  useEffect(() => {
    setLoading(false);
    setHint("");
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [pathname, searchParams?.toString()]);

  useEffect(() => {
    if (reduce) return;

    const start = (label = "Chargement…") => {
      setHint(label);
      setLoading(true);

      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setHint("");
        timeoutRef.current = null;
      }, 8000);
    };

    const onClickCapture = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (isModifiedEvent(e)) return;

      const a = getAnchorTarget(e.target as HTMLElement);
      if (!a) return;

      if (a.target && a.target !== "_self") return;

      const href = a.getAttribute("href") || "";
      if (!isInternalHref(href)) return;
      if (href.startsWith("#") || isSamePageHashNav(href)) return;

      const nextUrl = new URL(href, window.location.href);
      const curUrl = new URL(window.location.href);
      if (nextUrl.toString() === curUrl.toString()) return;

      const label =
        nextUrl.pathname === "/booking"
          ? "Ouverture réservation…"
          : nextUrl.pathname === "/portfolio"
          ? "Ouverture portfolio…"
          : nextUrl.pathname === "/services"
          ? "Ouverture services…"
          : "Chargement…";

      start(label);
    };

    const onSubmitCapture = (e: Event) => {
      const form = e.target as HTMLFormElement | null;
      if (!form) return;

      const target = form.getAttribute("target");
      if (target && target !== "_self") return;

      const action = form.getAttribute("action") || "";
      if (action.startsWith("http")) {
        try {
          const u = new URL(action);
          if (u.origin !== window.location.origin) return;
        } catch {
          return;
        }
      }

      const label =
        window.location.pathname.includes("booking")
          ? "Envoi de la réservation…"
          : window.location.pathname.includes("contact")
          ? "Envoi du message…"
          : "Envoi…";

      start(label);
    };

    const onPopState = () => {
      start("Chargement…");
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setHint("");
        timeoutRef.current = null;
      }, 2200);
    };

    document.addEventListener("click", onClickCapture, true);
    document.addEventListener("submit", onSubmitCapture, true);
    window.addEventListener("popstate", onPopState);

    return () => {
      document.removeEventListener("click", onClickCapture, true);
      document.removeEventListener("submit", onSubmitCapture, true);
      window.removeEventListener("popstate", onPopState);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[80] pointer-events-none">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            {/* progress bar */}
            <div className="relative h-[3px] w-full overflow-hidden">
              <div className="absolute inset-0 bg-white/10" />

              <motion.div
                className="absolute top-0 h-full w-[34%] bg-primary"
                initial={{ x: "-40%" }}
                animate={{ x: "220%" }}
                transition={{
                  duration: 0.95,
                  repeat: Infinity,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ willChange: "transform" }}
              />

              <motion.div
                className="absolute top-0 h-full w-[16%] bg-primary/60"
                initial={{ x: "-25%" }}
                animate={{ x: "240%" }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.12,
                }}
                style={{ willChange: "transform" }}
              />
            </div>

            {/* hint (desktop only) */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-4 top-3 hidden sm:flex items-center gap-2 text-[11px] text-white/70"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {hint || "Chargement…"}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
