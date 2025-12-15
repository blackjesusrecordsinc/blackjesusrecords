import React from "react";

type PostProdService = {
  title: string;
  desc: string;
  tag: string;
  bullets: string[];
};

const items: PostProdService[] = [
  {
    title: "Montage vidéo",
    tag: "Edit",
    desc:
      "On structure, on rythme, on nettoie. Un montage propre, narratif et pensé pour la plateforme.",
    bullets: [
      "Structure narrative, rythme, transitions propres",
      "Versions courtes verticales (Reels, TikTok, Shorts)",
      "Sous-titres & habillage graphique si nécessaire",
      "Exports optimisés pour YouTube, Instagram et TikTok",
    ],
  },
  {
    title: "Color grading",
    tag: "Look",
    desc:
      "On donne une signature : cohérence entre les plans, rendu cinéma ou street, peau propre et noirs profonds.",
    bullets: [
      "Correction colorimétrique complète",
      "Match entre les plans (cohérence globale)",
      "Look cinéma / clip rap-street (selon l’intention)",
      "Gestion des hautes lumières & noirs profonds",
    ],
  },
  {
    title: "Audio & Sound Design",
    tag: "Audio",
    desc:
      "Un rendu pro se joue aussi au son : nettoyage, ambiances, impacts, finitions.",
    bullets: [
      "Nettoyage des prises son & réduction de bruit",
      "Synchronisation si nécessaire",
      "Ajout d’ambiances & FX sonores",
      "Équilibrage et finitions pour un rendu professionnel",
    ],
  },
];

export default function PostProductionPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white antialiased">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
            Post-production
          </p>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          On transforme vos images brutes en{" "}
          <span className="text-[#F5C518]">contenu puissant</span>.
        </h1>

        <p className="mt-5 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Clips musicaux, vidéos corporatives, événements ou réseaux sociaux : on sublime,
          on corrige, on raconte. Un workflow propre, un rendu premium, une livraison prête à publier.
        </p>
      </section>

      {/* Cards */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid gap-6">
          {items.map((s) => (
            <div
              key={s.title}
              className="group rounded-3xl border border-white/10 bg-[#1A1A1F] p-7 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-wide leading-tight">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase text-white/70">
                  {s.tag}
                </span>
              </div>

              <div className="mt-5 grid gap-2 md:grid-cols-2">
                {s.bullets.map((b) => (
                  <div key={b} className="flex gap-3 text-sm text-white/80">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    <span className="leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 h-px w-full bg-white/10 group-hover:bg-white/15 transition" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-[#121216]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
              Besoin d’un rendu{" "}
              <span className="text-[#F5C518]">pro</span> rapidement ?
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
              Envoie-nous ton projet (footage, référence, plateforme cible) et on te propose
              une approche claire : délais, rendu attendu et livraison.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/booking"
              className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transform transition-transform hover:scale-105"
            >
              Réserver une session
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-6 py-3 text-sm font-semibold text-[#F5C518] transition-colors hover:bg-[#F5C518] hover:text-black transform transition-transform hover:scale-105"
            >
              Parler de votre projet
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
