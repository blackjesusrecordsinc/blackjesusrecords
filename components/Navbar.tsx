"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Accueil" },
  { href: "/projets", label: "Projets" },
  { href: "/savoir-faire", label: "Savoir-faire" },
  { href: "/studio-label", label: "Studio & Label" },
  { href: "/debuter-un-projet", label: "Débuter un projet" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-wide text-white">
          Black Jesus Records
        </Link>

        <div className="flex items-center gap-8 text-sm">
          {ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition ${active ? "text-white" : "text-white/60 hover:text-white"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
