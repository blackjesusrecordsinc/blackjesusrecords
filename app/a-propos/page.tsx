// app/a-propos/page.tsx
"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 pt-10 pb-20">
      <section className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
          <p className="text-[11px] font-semibold tracking-[0.25em] text-white/70 uppercase">
            À propos
          </p>
        </div>

        <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
          Une équipe <span className="text-[#F5C518]">studio</span>. Un standard{" "}
          <span className="text-[#F5C518]">label</span>.
        </h1>

        <p className="mt-5 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Black Jesus Records est un studio créatif & label basé à Lévis (Québec). Notre job : produire des
          images et des livrables propres, cohérents et efficaces — pour les artistes, les marques et les événements.
        </p>

        {/* Cards */}
        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 md:p-8">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Notre approche
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    t: "Direction créative",
                    d: "Mood, références, plan de tournage. On fixe un style net avant de filmer.",
                  },
                  {
                    t: "Production propre",
                    d: "Stabilisation, lumière, son, cadence. Rien n’est “au hasard”.",
                  },
                  {
                    t: "Post-production premium",
                    d: "Montage rythmé, look cohérent, exports optimisés YouTube / Reels / TikTok.",
                  },
                  {
                    t: "Livraison & standards",
                    d: "Délais clairs, versions finales propres, formats réseaux prêts à poster.",
                  },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5"
                  >
                    <p className="text-sm font-semibold text-white">{x.t}</p>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">{x.d}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-7 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Réserver une date
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Voir les services
                </Link>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <h3 className="text-xl font-semibold tracking-tight">Fondateur</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Emmanuel Ramazani Kibanda — vision créative, production terrain, focus sur des livrables
                qui font pro partout (site, réseaux, YouTube).
              </p>

              <div className="mt-5 space-y-3 text-sm text-white/80">
                {[
                  "Basé à Lévis — Québec & International",
                  "Workflow orienté performance (réseaux + YouTube)",
                  "Qualité d’image, cohérence, livraison propre",
                ].map((t) => (
                  <div key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    <span className="leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-7">
              <h3 className="text-lg font-semibold">Besoin d’un devis précis ?</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Si tu veux un scope complet (options, livrables, délais), passe par Contact.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-[#F5C518] px-6 py-3 text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518] hover:text-black"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-black/20 p-7 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Ce qu’on livre, concrètement
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed max-w-3xl">
            Un rendu propre et cohérent, pensé pour la plateforme finale — pas juste “une vidéo”.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              "16:9 YouTube (master propre)",
              "9:16 Reels/TikTok (versions cut)",
              "Thumbnails / exports optimisés",
            ].map((t) => (
              <div
                key={t}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/80"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
