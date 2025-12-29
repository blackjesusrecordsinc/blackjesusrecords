"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type NavItem = { href: string; label: string };

const PRIMARY: NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

const MORE: NavItem[] = [
  { href: "/a-propos", label: "À propos" },
  { href: "/post-production", label: "Post-production" },
  { href: "/label", label: "Label" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const reduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroMode, setHeroMode] = useState(false);

  // ✅ touch detection (pour bloquer dropdown "Plus")
  const [isTouch, setIsTouch] = useState(false);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);

  const primary = useMemo(() => PRIMARY, []);
  const more = useMemo(() => MORE, []);

  /* Touch / hover detection */
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  /* Scroll state */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Hero transparency */
  useEffect(() => {
    if (pathname !== "/") {
      setHeroMode(false);
      return;
    }
    const hero = document.getElementById("top");
    if (!hero) return;

    const io = new IntersectionObserver(([entry]) => setHeroMode(entry.isIntersecting), {
      rootMargin: "-10% 0px -70% 0px",
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  /* Close mobile on resize */
  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Lock scroll when drawer open */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* Escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMoreOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Focus close button */
  useEffect(() => {
    if (open) setTimeout(() => closeBtnRef.current?.focus(), 20);
  }, [open]);

  /* Click outside "More" */
  useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [moreOpen]);

  useEffect(() => setMoreOpen(false), [pathname]);

  const onNavClick = (href: string) => {
    setMoreOpen(false);
    setOpen(false);
    router.push(href);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const transparent = pathname === "/" && heroMode && !scrolled;
  const headerClass =
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 " +
    (transparent
      ? "bg-transparent"
      : "bg-black/55 border-b border-white/10 backdrop-blur-sm md:backdrop-blur-xl");

  // ✅ dropdown seulement si pas touch
  const shouldShowMoreDropdown = moreOpen && !isTouch;

  return (
    <header className={headerClass} style={{ height: "var(--nav-h)" }}>
      {/* ✅ hauteur nav cohérente */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[var(--nav-h)] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Accueil — Black Jesus Records"
          className="flex items-center gap-3 group"
          onClick={() => {
            setOpen(false);
            setMoreOpen(false);
          }}
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-white/5">
            <Image
              src="/logo_bjr.png"
              alt="Black Jesus Records"
              fill
              className="object-cover"
              priority
              sizes="40px"
              quality={85}
            />
          </div>
          <div className="leading-tight">
            <div className="font-bold uppercase tracking-wider text-sm group-hover:text-primary transition">
              Black Jesus Records
            </div>
            <div className="text-[11px] text-white/60">Studio créatif & label</div>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {primary.map((it) => {
            const active = isActive(it.href);
            return (
              <Link
                key={it.href}
                href={it.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-2 transition ${
                  active ? "text-primary" : "text-white/80 hover:text-primary"
                }`}
              >
                {it.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 w-full bg-primary transition-transform origin-left duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}

          {/* More */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={shouldShowMoreDropdown}
              className={`inline-flex items-center gap-2 transition ${
                more.some((x) => isActive(x.href)) ? "text-primary" : "text-white/80 hover:text-primary"
              }`}
            >
              Plus <span className="text-white/50">▾</span>
            </button>

            <AnimatePresence>
              {shouldShowMoreDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.14 }}
                  className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-black/70 overflow-hidden shadow-xl backdrop-blur-sm md:backdrop-blur-xl"
                >
                  {more.map((it) => {
                    const active = isActive(it.href);
                    return (
                      <Link
                        key={it.href}
                        href={it.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMoreOpen(false)}
                        className={`block w-full text-left px-4 py-3 text-sm transition ${
                          active ? "text-primary bg-white/5" : "text-white/80 hover:text-primary hover:bg-white/5"
                        }`}
                      >
                        {it.label}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/booking"
            className="ml-2 px-4 py-2 rounded-xl bg-primary text-black font-semibold hover:opacity-95 transition shadow-[0_0_22px_rgba(245,197,66,0.25)]"
            aria-label="Réserver"
          >
            Réserver
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="md:hidden w-11 h-11 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
        >
          <div className="flex flex-col gap-1 w-5 mx-auto">
            <span
              className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
                open ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="fixed top-0 right-0 h-full w-[86vw] max-w-sm bg-black/78 border-l border-white/10 z-[70] md:hidden backdrop-blur-sm md:backdrop-blur-xl"
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
                    onClick={() => setOpen(false)}
                    aria-label="Fermer le menu"
                    className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-6 space-y-2">
                  {[...primary, ...more].map((it) => {
                    const active = isActive(it.href);
                    return (
                      <Link
                        key={it.href}
                        href={it.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={`block w-full text-left py-3 px-4 rounded-xl border border-white/10 transition ${
                          active ? "text-primary bg-white/5" : "text-white/85 hover:text-primary hover:bg-white/5"
                        }`}
                      >
                        {it.label}
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-8 p-4 rounded-2xl border border-primary/25 bg-primary/10">
                  <Link
                    href="/booking"
                    onClick={() => setOpen(false)}
                    className="block w-full text-center py-3 rounded-xl bg-primary text-black font-semibold shadow-[0_0_22px_rgba(245,197,66,0.25)]"
                    aria-label="Réserver une date"
                  >
                    Réserver une date
                  </Link>
                  <p className="mt-3 text-xs text-white/60 text-center">Réponse 24–48h (jours ouvrables)</p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
