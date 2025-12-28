"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/label", label: "Label" },
  { href: "/post-production", label: "Post-production" },
  { href: "/a-propos", label: "À propos" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const reduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const items = useMemo(() => NAV, []);

  /* Scroll background */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll mobile */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) => pathname === href;

  const headerClass = [
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    scrolled
      ? "bg-black/85 backdrop-blur-xl border-b border-white/10"
      : "bg-transparent",
  ].join(" ");

  return (
    <header className={headerClass}>
      <nav className="max-w-7xl mx-auto h-16 md:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-3"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-white/5">
            <Image
              src="/logo_bjr.png"
              alt="Black Jesus Records"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="leading-tight text-left">
            <div className="uppercase tracking-wider font-bold text-sm">
              Black Jesus Records
            </div>
            <div className="text-xs text-white/60">
              Studio créatif & label
            </div>
          </div>
        </button>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-7 text-sm">
          {items.map((it) => {
            const active = isActive(it.href);
            return (
              <li key={it.href}>
                <button
                  onClick={() => router.push(it.href)}
                  className={[
                    "relative py-2 transition-colors",
                    active
                      ? "text-yellow-400 font-medium"
                      : "text-white/80 hover:text-yellow-400",
                  ].join(" ")}
                >
                  {it.label}
                  <span
                    className={[
                      "absolute left-0 -bottom-1 h-0.5 w-full bg-yellow-400 transition-transform origin-left",
                      active ? "scale-x-100" : "scale-x-0",
                    ].join(" ")}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* DESKTOP CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => router.push("/booking")}
            className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
          >
            Réserver
          </button>
          <button
            onClick={() => router.push("/contact")}
            className="px-4 py-2 rounded-xl border border-white/15 text-white/85 hover:border-white/30"
          >
            Contact
          </button>
        </div>

        {/* MOBILE BURGER */}
        <button
          className="md:hidden w-11 h-11 rounded-xl border border-white/10 bg-white/5"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="fixed top-0 right-0 w-[85vw] max-w-sm h-full bg-black border-l border-white/10 z-50"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={
                reduce ? { duration: 0 } : { type: "spring", damping: 26 }
              }
            >
              <div className="p-6 space-y-3">
                {items.map((it) => (
                  <button
                    key={it.href}
                    onClick={() => {
                      setOpen(false);
                      router.push(it.href);
                    }}
                    className="block w-full text-left py-3 px-4 rounded-xl border border-white/10 hover:text-yellow-400"
                  >
                    {it.label}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setOpen(false);
                    router.push("/booking");
                  }}
                  className="w-full mt-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold"
                >
                  Réserver une date
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
