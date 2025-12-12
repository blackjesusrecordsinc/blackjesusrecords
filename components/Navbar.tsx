// components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/label", label: "Label" },
  { href: "/post-production", label: "Post-production" },
  { href: "/booking", label: "Réservation" },
  { href: "/contact", label: "Contact" },
  { href: "/a-propos", label: "À propos" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ferme le menu mobile si on repasse en desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Bloque le scroll quand le menu est ouvert (mobile)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Accueil — Black Jesus Records"
          onClick={() => setOpen(false)}
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
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7 text-sm">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "relative py-2 transition-colors",
                    active
                      ? "text-yellow-400 font-medium"
                      : "text-white/80 hover:text-yellow-400",
                  ].join(" ")}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/booking"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-colors"
          >
            Réserver
          </Link>
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <div className="flex flex-col gap-1.5 w-5">
            <span
              className={[
                "h-0.5 bg-white transition-all",
                open ? "rotate-45 translate-y-2" : "",
              ].join(" ")}
            />
            <span
              className={[
                "h-0.5 bg-white transition-all",
                open ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "h-0.5 bg-white transition-all",
                open ? "-rotate-45 -translate-y-2" : "",
              ].join(" ")}
            />
          </div>
        </button>

        {/* Mobile overlay + drawer */}
        {open && (
          <>
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setOpen(false)}
            />

            <div className="fixed top-0 right-0 h-full w-[86vw] max-w-sm bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 md:hidden">
              <div className="pt-20 px-6 pb-6 h-full overflow-y-auto">
                <div className="mb-6 text-white/70 text-sm">
                  Navigation
                </div>

                <ul className="space-y-2">
                  {navItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={[
                            "block py-3 px-4 rounded-xl transition",
                            active
                              ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                              : "text-white/85 hover:text-yellow-400 hover:bg-white/5",
                          ].join(" ")}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-8 p-4 rounded-2xl border border-yellow-400/20 bg-yellow-400/5">
                  <Link
                    href="/booking"
                    onClick={() => setOpen(false)}
                    className="block w-full text-center py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-colors"
                  >
                    Réserver une date
                  </Link>
                  <p className="mt-3 text-xs text-white/60 text-center">
                    Disponibilités limitées — réponse rapide
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
