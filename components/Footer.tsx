// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-white/75">
              À propos
            </p>
            <p className="text-sm font-semibold text-white">
              Studio créatif & label indépendant
            </p>
            <p className="text-sm text-white/90 leading-relaxed">
              On élève ce qui vient d’ici.
              <br />
              Exécution ciné, rigueur totale.
              <br />
              Projets pensés pour durer.
            </p>
          </div>

          <div className="text-center space-y-2">
            <p className="text-xs uppercase tracking-widest text-white/75">
              Identité
            </p>
            <p className="text-sm font-semibold tracking-wide text-[#F5C542]">
              Black Jesus Records
            </p>
            <p className="text-xs text-white/85">
              © 2026 — Tous droits réservés
            </p>
            <p className="text-xs text-white/80">
              Lévis, Québec
              <br />
              Québec & International
            </p>
          </div>

          <div className="space-y-3 md:text-right">
            <p className="text-xs uppercase tracking-widest text-white/75">
              Navigation
            </p>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/services" className="text-white/90 hover:text-white transition">
                Services
              </Link>
              <Link href="/portfolio" className="text-white/90 hover:text-white transition">
                Portfolio
              </Link>
              <Link href="/studio-label" className="text-white/90 hover:text-white transition">
                Studio & Label
              </Link>
              <Link
                href="/politique-confidentialite"
                className="text-white/85 hover:text-white transition"
              >
                Politique de confidentialité
              </Link>
              <Link href="/conditions" className="text-white/85 hover:text-white transition">
                Conditions
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-16 text-center text-xs text-white/70 tracking-widest">
          BLACK JESUS RECORDS
        </div>
      </div>
    </footer>
  );
}
