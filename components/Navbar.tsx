"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "/", label: "Accueil" },

  // Sections home (scroll exact)
  { href: "/#services", label: "Services" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#photo", label: "Photo" },
  { href: "/#label", label: "Label" },

  // Pages dédiées
  { href: "/post-production", label: "Post-production" },
  { href: "/booking", label: "Réservation" },
  { href: "/contact", label: "Contact" },
  { href: "/a-propos", label: "À propos" },
];

function getHash(href: string) {
  try {
    const u = new URL(href, "http://local");
    return u.hash?.replace("#", "") ?? "";
  } catch {
    const idx = href.indexOf("#");
    return idx >= 0 ? href.slice(idx + 1) : "";
  }
}

function getPath(href: string) {
  const idx = href.indexOf("#");
  return idx >= 0 ? href.slice(0, idx) : href;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const reduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ reactive: true = hero visible (navbar transparent sur home)
  const [heroMode, setHeroMode] = useState(false);

  const [activeHash, setActiveHash] = useState<string>("");
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const items = useMemo(() => NAV, []);

  // Scroll style (simple)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Hero reactive (home only)
  useEffect(() => {
    if (pathname !== "/") {
      setHeroMode(false);
      return;
    }

    const hero = document.getElementById("top");
    if (!hero) {
      setHeroMode(false);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        // hero visible => heroMode true (navbar transparent)
        setHeroMode(entry.isIntersecting);
      },
      {
        root: null,
        // si tu veux que la navbar devienne solide un peu avant la fin du hero
        rootMargin: "-10% 0px -72% 0px",
        threshold: [0, 0.15, 0.35],
      }
    );

    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  // Ferme menu si desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus close button when opened
  useEffect(() => {
    if (open) setTimeout(() => closeBtnRef.current?.focus(), 20);
  }, [open]);

  // Active hash in url
  useEffect(() => {
    const update = () => setActiveHash(window.location.hash.replace("#", ""));
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  // Active section highlight (home only)
  useEffect(() => {
    if (pathname !== "/") return;

    const ids = ["services", "portfolio", "photo", "label"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        const id = visible?.target?.id;
        if (id) setActiveHash(id);
      },
      {
        root: null,
        threshold: [0.25, 0.45, 0.6],
        rootMargin: "-18% 0px -55% 0px",
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // Click handler
  const onNavClick = async (href: string) => {
    const hash = getHash(href);
    const path = getPath(href) || "/";

    if (hash && pathname === path) {
      setOpen(false);
      window.history.pushState(null, "", `#${hash}`);
      scrollToId(hash);
      return;
    }

    if (hash && path === "/" && pathname !== "/") {
      setOpen(false);
      router.push(`/#${hash}`);

      const tries = 18;
      let t = 0;
      const interval = window.setInterval(() => {
        t += 1;
        if (scrollToId(hash) || t >= tries) window.clearInterval(interval);
      }, 90);
      return;
    }

    setOpen(false);
    router.push(href);
  };

  const isActive = (href: string) => {
    const path = getPath(href) || "/";
    const hash = getHash(href);

    if (hash) {
      if (path === "/" && pathname === "/") return activeHash === hash;
      return pathname === "/" && activeHash === hash;
    }
    return pathname === path;
  };

  // ✅ Navbar style rules
  const onHome = pathname === "/";
  const transparent = onHome && heroMode && !scrolled; // hero visible + pas scroll -> transparent
  const headerClass = [
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    transparent
      ? "bg-transparent"
      : "bg-black/80 backdrop-blur-xl border-b border-white/10",
  ].join(" ");

  return (
    <header className={headerClass}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          className="flex items-center gap-3 group text-left"
          aria-label="Accueil — Black Jesus Records"
          onClick={() => onNavClick("/")}
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-white/5">
            <Image
              src="/logo_bjr.png"
              alt="Black Jesus Records"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="leading-tight">
            <div className="font-bold tracking-wider uppercase text-sm md:text-base group-hover:text-yellow-400 transition-colors">
              Black Jesus Records
            </div>
            <div className="text-[11px] md:text-xs text-white/60">
              Studio créatif & label
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7 text-sm">
          {items.map((it) => {
            const active = isActive(it.href);
            return (
              <li key={it.href}>
                <button
                  type="button"
                  onClick={() => onNavClick(it.href)}
                  className={[
                    "relative py-2 transition-colors",
                    active ? "text-yellow-400 font-medium" : "text-white/80 hover:text-yellow-400",
                  ].join(" ")}
                >
                  {it.label}
                  <span
                    className={[
                      "absolute -bottom-1 left-0 h-0.5 w-full bg-yellow-400 transition-transform origin-left",
                      active ? "scale-x-100" : "scale-x-0",
                    ].join(" ")}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavClick("/booking")}
            className="relative inline-flex items-center justify-center px-4 py-2 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-colors"
          >
            Réserver
          </button>

          <button
            type="button"
            onClick={() => onNavClick("/contact")}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-white/15 text-white/85 hover:border-white/30 hover:text-white transition"
          >
            Contact
          </button>
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <div className="flex flex-col gap-1.5 w-5">
            <span className={["h-0.5 bg-white transition-all", open ? "rotate-45 translate-y-2" : ""].join(" ")} />
            <span className={["h-0.5 bg-white transition-all", open ? "opacity-0" : "opacity-100"].join(" ")} />
            <span className={["h-0.5 bg-white transition-all", open ? "-rotate-45 -translate-y-2" : ""].join(" ")} />
          </div>
        </button>
      </nav>

      {/* Mobile overlay + drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Fermer"
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            />

            <motion.aside
              className="fixed top-0 right-0 h-full w-[86vw] max-w-sm bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 26 }}
            >
              <div className="pt-6 px-6 pb-6 h-full overflow-y-auto">
                <div className="flex items-center justify-between">
                  <div className="text-white/75 text-sm">Navigation</div>
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
                  {items.map((it) => {
                    const active = isActive(it.href);
                    return (
                      <button
                        key={it.href}
                        type="button"
                        onClick={() => onNavClick(it.href)}
                        className={[
                          "w-full text-left py-3 px-4 rounded-xl transition border",
                          active
                            ? "bg-yellow-400/10 text-yellow-400 border-yellow-400/20"
                            : "text-white/85 border-white/10 hover:text-yellow-400 hover:bg-white/5 hover:border-white/15",
                        ].join(" ")}
                      >
                        {it.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 p-4 rounded-2xl border border-yellow-400/20 bg-yellow-400/5">
                  <button
                    type="button"
                    onClick={() => onNavClick("/booking")}
                    className="block w-full text-center py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-colors"
                  >
                    Réserver une date
                  </button>
                  <p className="mt-3 text-xs text-white/60 text-center">
                    Disponibilités limitées — réponse rapide
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
