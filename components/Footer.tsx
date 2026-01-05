export default function Footer() {
  const year = new Date().getFullYear();

  // ✅ Lisibilité : texte plus clair + ombre propre (sans noircir le fond)
  const kicker =
    "text-[11px] font-semibold tracking-[0.26em] uppercase text-white/90";
  const line =
    "text-[15px] leading-[1.85] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]";
  const linkLine =
    "block text-[15px] leading-[1.85] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] hover:text-white transition-colors underline underline-offset-8 decoration-white/25 hover:decoration-[#F5C542]/70";

  return (
<<<<<<< HEAD
    <footer className="border-t border-white/10 py-12 text-sm text-white/60">
      <div className="max-w-7xl mx-auto px-6 space-y-3 text-center">
        <p className="font-semibold text-white">Black Jesus Records</p>
        <p>Studio créatif & label indépendant</p>
        <p>Lévis, Québec</p>
        <p>© 2025 Black Jesus Records</p>
=======
    <footer className="mt-24 bg-black/0 border-t border-white/10">
      <div className="mx-auto w-full max-w-screen-2xl px-8 py-24">
        {/* 3 blocs identiques */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 items-start">
          {/* GAUCHE — À PROPOS */}
          <div className="space-y-5">
            <p className={kicker}>À propos</p>
            <div className="space-y-1">
              <p className={line}>Studio créatif & label indépendant</p>
              <p className={line}>On élève ce qui vient d’ici</p>
              <p className={line}>Exécution ciné, rigueur totale</p>
              <p className={line}>Projets pensés pour durer</p>
            </div>
          </div>

          {/* CENTRE — IDENTITÉ */}
          <div className="space-y-5 text-center">
            <p className={kicker}>Identité</p>
            <div className="space-y-1">
              <p
                className={[
                  "text-[15px] md:text-base font-semibold uppercase",
                  "tracking-[0.34em]",
                  "text-[#F5C542]",
                  // ✅ gold plus lisible sans bling
                  "drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]",
                  "drop-shadow-[0_0_18px_rgba(245,197,66,0.22)]",
                ].join(" ")}
              >
                Black Jesus Records
              </p>

              {/* ✅ secondaire plus clair */}
              <p className="text-[12px] leading-[1.85] text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                © {year} — Tous droits réservés
              </p>
              <p className="text-[12px] leading-[1.85] text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                Lévis, Québec
              </p>
              <p className="text-[12px] leading-[1.85] text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                Québec & international
              </p>
            </div>
          </div>

          {/* DROITE — NAVIGATION */}
          <div className="space-y-5 md:text-right">
            <p className={kicker}>Navigation</p>
            <div className="space-y-1">
              <Link href="/services" className={linkLine}>
                Services
              </Link>
              <Link href="/portfolio" className={linkLine}>
                Portfolio
              </Link>
              <Link href="/politique-confidentialite" className={linkLine}>
                Politique de confidentialité
              </Link>
              <Link href="/conditions" className={linkLine}>
                Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* micro-finish */}
        <div className="mt-16 text-center text-[11px] tracking-[0.22em] uppercase text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
          Black Jesus Records
        </div>
>>>>>>> 10e061a (Rebuild: premium layout + motion + readability)
      </div>
    </footer>
  );
}
