// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/label", label: "Label" },
  { href: "/post-production", label: "Post-production" },
  { href: "/booking", label: "Réservation" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-sm">BJ</span>
          </div>
          <span className="font-bold tracking-wider uppercase text-sm group-hover:text-yellow-400 transition-colors">
            Black Jesus Records
          </span>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative py-2 transition-colors ${
                  pathname === item.href
                    ? "text-yellow-400 font-medium"
                    : "text-white/80 hover:text-yellow-400"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Menu mobile */}
        <button
          className="md:hidden flex flex-col gap-1 w-6 h-6 relative z-50"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span
            className={`w-full h-0.5 bg-white transition-all ${
              open ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`w-full h-0.5 bg-white transition-all ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`w-full h-0.5 bg-white transition-all ${
              open ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>

        {/* Overlay mobile */}
        {open && (
          <>
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setOpen(false)}
            />
            <div className="fixed top-0 right-0 h-full w-80 bg-black/95 backdrop-blur-lg border-l border-white/10 z-40 md:hidden transform transition-transform duration-300">
              <div className="p-6 pt-20 h-full overflow-y-auto">
                <ul className="space-y-4">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block py-3 px-4 rounded-lg transition-all ${
                          pathname === item.href
                            ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                            : "text-white/80 hover:text-yellow-400 hover:bg-white/5"
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-4 border border-yellow-400/20 rounded-lg bg-yellow-400/5">
                  <Link
                    href="/booking"
                    className="block w-full text-center py-3 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-300 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Réserver une date
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
<Link href="/a-propos" className="...">
  À propos
</Link>
