import React from "react";

export default function LabelPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white antialiased">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
            Label
          </p>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Black Jesus <span className="text-[#F5C518]">Records</span>
        </h1>

        <p className="mt-5 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Label indépendant basé au Québec. On développe des projets avec une identité forte :
          image, son, stratégie et accompagnement humain — projet après projet.
        </p>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Mission */}
          <div className="rounded-3xl border border-white/10 bg-[#1A1A1F] p-7 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-wide">Notre mission</h2>
              <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase text-white/70">
                Vision
              </span>
            </div>
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
              Black Jesus Records est pensé pour les artistes qui veulent une image forte,
              une stratégie claire et un accompagnement humain. On ne fait pas juste des vidéos :
              on construit un projet autour de ta vision.
            </p>
            <div className="mt-6 h-px w-full bg-white/10" />
          </div>

          {/* Founder */}
          <div className="rounded-3xl border border-white/10 bg-[#1A1A1F] p-7 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-wide">Le fondateur</h2>
              <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase text-white/70">
                Direction
              </span>
            </div>
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
              Le label est fondé par Emmanuel Ramazani Kibanda, créateur visuel, réalisateur
              et producteur. Objectif : aider les artistes et les marques à raconter leur histoire
              avec des images fortes, un son propre et une stratégie réaliste.
            </p>
            <div className="mt-6 h-px w-full bg-white/10" />
          </div>

          {/* Artists */}
          <div className="rounded-3xl border border-white/10 bg-[#1A1A1F] p-7 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-wide">Nos artistes</h2>
              <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase text-white/70">
                Développement
              </span>
            </div>
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
              Black Jesus Records développe actuellement l’artiste{" "}
              <span className="font-semibold text-white">Shégué</span> : univers brut,
              énergie de rue, clips forts et identité visuelle cohérente. Le travail se fait
              sur le long terme, projet après projet.
            </p>
            <p className="mt-3 text-sm text-white/50">
              D’autres signatures et collaborations verront le jour au fur et à mesure.
            </p>
            <div className="mt-6 h-px w-full bg-white/10" />
          </div>

          {/* Offer */}
          <div className="rounded-3xl border border-white/10 bg-[#1A1A1F] p-7 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-wide">Ce qu’on offre</h2>
              <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase text-white/70">
                Accompagnement
              </span>
            </div>

            <ul className="mt-4 space-y-2 text-sm md:text-base text-white/80">
              {[
                "Clips musicaux et contenus réseaux sociaux professionnels",
                "Direction artistique et conseil sur l’image",
                "Stratégie de sortie (singles, EP, albums)",
                "Accompagnement pour la diffusion et la visibilité",
                "Support sur la structuration de carrière",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 h-px w-full bg-white/10" />
          </div>
        </div>

        {/* Submit project block */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#1A1A1F] p-7 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-wide">Soumettre un projet</h2>
            <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase text-white/70">
              A&amp;R
            </span>
          </div>

          <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
            Tu veux présenter un projet au label ? Envoie ton univers, ton objectif, et un lien vers
            une démo (clip, audio, live). On te répond rapidement pour discuter direction artistique,
            planning et prochaines étapes.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-6 py-3 text-sm font-semibold text-[#F5C518] transition-colors hover:bg-[#F5C518] hover:text-black transform transition-transform hover:scale-105"
            >
              Envoyer une démo (Contact)
            </a>
            <a
              href="/booking"
              className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transform transition-transform hover:scale-105"
            >
              Réserver un appel
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-[#121216]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
              Tu as une vision et tu veux la rendre{" "}
              <span className="text-[#F5C518]">réelle</span> ?
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
              Envoie une démo ou réserve une date. On te propose une direction claire, un rendu solide
              et une stratégie adaptée à ton public.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/booking"
              className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transform transition-transform hover:scale-105"
            >
              Réserver une date
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-6 py-3 text-sm font-semibold text-[#F5C518] transition-colors hover:bg-[#F5C518] hover:text-black transform transition-transform hover:scale-105"
            >
              Contact
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
