"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ITEMS = [
  { href: "/", label: "Accueil" },
  { href: "/projets", label: "Projets" },
  { href: "/savoir-faire", label: "Savoir-faire" },
  { href: "/studio-label", label: "Studio & Label" },
  { href: "/debuter-un-projet", label: "Débuter un projet" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false); // ferme le menu quand on change de page
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="text-sm font-semibold tracking-wide text-white hover:text-white/90"
          aria-label="Accueil — Black Jesus Records"
        >
          Black Jesus Records
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`transition ${
                  active ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/planifier-un-appel"
            className="ml-2 rounded-full border border-white/25 px-5 py-2 text-sm text-white/90 hover:text-white hover:border-white/40 transition"
          >
            Planifier un appel
          </Link>
        </div>

        {/* Mobile button */}
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden h-10 w-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center justify-center"
        >
          <span className="text-white/90">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2">
            {ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-xl px-4 py-3 text-sm border border-white/10 transition ${
                    active
                      ? "text-white bg-white/5"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/planifier-un-appel"
              className="mt-2 rounded-xl px-4 py-3 text-sm border border-white/25 text-white/90 hover:text-white hover:border-white/40 transition text-center"
            >
              Planifier un appel
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
