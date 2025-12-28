// app/a-propos/page.tsx
"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-[#0B0B0E] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#F5C518]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,197,24,0.08),transparent_55%)]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
            À propos
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Une vision <span className="text-[#F5C518]">créative</span>,  
            <br className="hidden sm:block" />
            ancrée dans le réel.
          </h1>

          <p className="mt-6 max-w-2xl text-base md:text-lg text-white/70 leading-relaxed">
            Black Jesus Records est un studio créatif et un label indépendant basé à
            Lévis (Québec). On crée des images, du son et des stratégies pour des
            projets qui veulent marquer.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              D’où on vient
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Black Jesus Records est né d’un besoin simple : créer sans compromis.
              Un espace où l’image, le son et l’identité avancent ensemble, sans
              recettes génériques ni solutions copiées-collées.
            </p>
            <p className="mt-4 text-white/70 leading-relaxed">
              Le projet a grandi sur le terrain : clips, shootings, événements,
              post-production, stratégie. Chaque mandat a forgé une méthode
              rigoureuse, orientée résultat et cohérence.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#14141A] p-8">
            <h3 className="text-xl font-semibold">Ce qui nous guide</h3>
            <ul className="mt-6 space-y-4 text-white/80 text-sm">
              <li>• Qualité visuelle et sonore niveau label</li>
              <li>• Direction artistique claire et assumée</li>
              <li>• Process simple, efficace, sans bullshit</li>
              <li>• Respect du temps, des délais et des budgets</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Le fondateur
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Emmanuel Ramazani Kibanda, réalisateur et entrepreneur créatif.
              Parcours autodidacte, vision internationale, approche terrain.
            </p>
            <p className="mt-4 text-white/70 leading-relaxed">
              Son objectif : bâtir des projets solides, crédibles et durables,
              capables de rivaliser avec des structures établies — sans perdre
              l’authenticité.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#121216] p-8">
            <h3 className="text-xl font-semibold">Notre positionnement</h3>
            <p className="mt-4 text-white/70 leading-relaxed">
              Studio + label + stratégie.  
              Un seul interlocuteur pour gérer l’image d’un projet de A à Z.
            </p>
            <p className="mt-4 text-white/70 leading-relaxed">
              On travaille avec des artistes, des marques et des structures qui
              prennent leur image au sérieux.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-[#121216]">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Travaillons ensemble
            </h2>
            <p className="mt-3 text-white/70">
              Un projet clair commence par une bonne discussion.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black hover:opacity-90 transition"
            >
              Réserver une date
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-6 py-3 text-sm font-semibold text-[#F5C518] hover:bg-[#F5C518] hover:text-black transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
