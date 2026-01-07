// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/55">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* BRAND */}
          <div className="space-y-2">
            <p className="text-sm font-semibold tracking-wide text-[#F5C542]">
              Black Jesus Records
            </p>
            <p className="text-sm text-white/70 leading-relaxed">
              Image · Son · Stratégie — Pour artistes, marques et événements.
            </p>
          </div>

          {/* LINKS */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link className="text-white/70 hover:text-white transition" href="/services">
              Services
            </Link>
            <Link className="text-white/70 hover:text-white transition" href="/portfolio">
              Portfolio
            </Link>
            <Link className="text-white/70 hover:text-white transition" href="/studio-label">
              Studio & Label
            </Link>
            <Link className="text-white/70 hover:text-white transition" href="/a-propos">
              À propos
            </Link>
            <Link className="text-white/70 hover:text-white transition" href="/contact">
              Contact
            </Link>
          </nav>
        </div>

        {/* LEGAL */}
        <div className="mt-10 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/55">
            © 2026 Black Jesus Records. Tous droits réservés.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
            <Link className="text-white/55 hover:text-white transition" href="/politique-confidentialite">
              Confidentialité
            </Link>
            <Link className="text-white/55 hover:text-white transition" href="/conditions">
              Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
