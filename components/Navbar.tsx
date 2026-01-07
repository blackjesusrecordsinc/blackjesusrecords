"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/studio-label", label: "Studio & Label" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/debuter-un-projet", label: "Débuter un projet" },
];

const CTA_HREF = "/debuter-un-projet";
const GOLD = "#F5C542";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const reduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroMode, setHeroMode] = useState(false);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const nav = useMemo(() => NAV, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setTimeout(() => setHeroMode(false), 0);
      return;
    }
    const hero = document.getElementById("top");
    if (!hero) return;

    const io = new IntersectionObserver(
      ([entry]) => setHeroMode(entry.isIntersecting),
      { root: null, rootMargin: "-10% 0px -72% 0px", threshold: [0, 0.15, 0.35] }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => closeBtnRef.current?.focus(), 20);
  }, [open]);

  const onNavClick = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const transparent = pathname === "/" && heroMode && !scrolled;
  const headerClass = [
    "fixed top-0 left-0 right-0 z-[9990] transition-all duration-300",
    transparent ? "bg-transparent" : "bg-black/55 md:backdrop-blur-xl border-b border-white/10",
  ].join(" ");

  return (
    <header className={headerClass} style={{ height: "var(--nav-h)" }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-3 group text-left"
          aria-label="Accueil — Black Jesus Records"
          onClick={() => onNavClick("/")}
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-white/5">
            <Image src="/logo_bjr.png" alt="Black Jesus Records" fill className="object-cover" priority />
          </div>

          <div className="leading-tight">
            <div className="font-bold tracking-wider uppercase text-sm text-white transition-colors group-hover:text-white">
              Black Jesus Records
            </div>
            <div className="text-[11px] text-white/60">Studio créatif & label</div>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-7 text-sm">
          {nav.map((it) => {
            const active = isActive(it.href);
            const isCta = it.href === CTA_HREF;

            if (isCta) {
              return (
                <button
                  key={it.href}
                  type="button"
                  onClick={() => onNavClick(it.href)}
                  className={[
                    "group relative inline-flex items-center justify-center rounded-full px-4 py-2",
                    "border bg-black/20 backdrop-blur-md transition",
                    active
                      ? `border-[${GOLD}]/65 text-white shadow-[0_0_14px_rgba(245,197,66,0.14)]`
                      : "border-white/14 text-white/90 hover:text-white",
                    "hover:border-[rgba(245,197,66,0.55)] hover:shadow-[0_0_18px_rgba(245,197,66,0.14)]",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(245,197,66,0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/80",
                  ].join(" ")}
                  aria-label="Débuter un projet"
                >
                  <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                    <span
                      className="absolute -left-1/3 top-0 h-full w-1/3 rotate-12 opacity-0
                                 bg-[linear-gradient(90deg,rgba(245,197,66,0),rgba(245,197,66,0.10),rgba(255,255,255,0.10),rgba(245,197,66,0.10),rgba(245,197,66,0))]
                                 transition-opacity duration-200 group-hover:opacity-100"
                    />
                  </span>

                  <span className="relative z-[1] font-semibold tracking-wide">{it.label}</span>

                  <span
                    aria-hidden
                    className={[
                      "relative z-[1] ml-2 inline-flex h-1.5 w-1.5 rounded-full",
                      active ? "bg-[#F5C542]" : "bg-[#F5C542]/70",
                    ].join(" ")}
                  />
                </button>
              );
            }

            return (
              <button
                key={it.href}
                type="button"
                onClick={() => onNavClick(it.href)}
                className={[
                  "relative py-2 transition-colors",
                  active ? "text-white" : "text-white/80 hover:text-white",
                ].join(" ")}
              >
                {it.label}
                <span
                  className={[
                    "absolute -bottom-1 left-0 h-0.5 w-full bg-[#F5C542]/80",
                    "origin-left transition-transform duration-200",
                    active ? "scale-x-100" : "scale-x-0",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <div className="flex flex-col gap-1.5 w-5">
            <span className={`h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Fermer"
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/70 z-[9998] isolate md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="fixed top-0 right-0 h-full w-[86vw] max-w-sm bg-black/78 border-l border-white/10 z-[9999] isolate md:hidden"
              style={{ transform: "none" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 26 }}
            >
              <div className="pt-6 px-6 pb-6 h-full overflow-y-auto">
                <div className="flex items-center justify-between">
                  <div className="text-white/70 text-sm">Navigation</div>
                  <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={() => setOpen(false)}
                    className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-white"
                    aria-label="Fermer le menu"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-6 space-y-2">
                  {nav.map((it) => {
                    const active = isActive(it.href);
                    const isCta = it.href === CTA_HREF;

                    return (
                      <button
                        key={it.href}
                        type="button"
                        onClick={() => onNavClick(it.href)}
                        className={[
                          "w-full text-left py-3 px-4 rounded-xl transition border",
                          isCta
                            ? [
                                "bg-black/25 backdrop-blur-md md:backdrop-blur-md",
                                "border-[#F5C542]/35 text-white",
                                "hover:border-[#F5C542]/55 hover:shadow-[0_0_18px_rgba(245,197,66,0.12)]",
                                active ? "shadow-[0_0_18px_rgba(245,197,66,0.14)]" : "",
                              ].join(" ")
                            : [
                                "border-white/10",
                                active
                                  ? "text-white bg-white/5"
                                  : "text-white/85 hover:text-white hover:bg-white/5 hover:border-white/15",
                              ].join(" "),
                        ].join(" ")}
                      >
                        <span className="flex items-center justify-between">
                          <span>{it.label}</span>
                          {isCta && (
                            <span
                              aria-hidden
                              className={[
                                "ml-3 inline-block h-1.5 w-1.5 rounded-full",
                                active ? "bg-[#F5C542]" : "bg-[#F5C542]/70",
                              ].join(" ")}
                            />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
