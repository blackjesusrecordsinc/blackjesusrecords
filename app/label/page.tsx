// app/label/page.tsx
import React from "react";
import Link from "next/link";

type AnchorId = "vision" | "founder" | "artists" | "offer" | "process" | "submit";

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export default function LabelPage() {
  const anchors: Array<{ id: AnchorId; label: string; hint: string }> = [
    { id: "vision", label: "Vision", hint: "Mission & valeurs" },
    { id: "founder", label: "Direction", hint: "Fondateur" },
    { id: "artists", label: "Artistes", hint: "Développement" },
    { id: "offer", label: "Offre", hint: "Accompagnement" },
    { id: "process", label: "Process", hint: "Méthode" },
    { id: "submit", label: "Soumettre", hint: "A&R" },
  ];

  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white font-sans">
      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
          <span className="text-[11px] font-semibold tracking-[0.25em] text-white/70 uppercase">
            Label
          </span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight">
          Black Jesus <span className="text-[#F5C518]">Records</span>
        </h1>

        <p className="mt-5 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Label indépendant basé au Québec. On développe des projets avec une identité forte :
          image, son, stratégie et accompagnement humain — projet après projet.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Soumettre un projet
          </Link>
          <Link
            href="/booking"
            className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
          >
            Réserver un appel
          </Link>
        </div>
      </section>

      {/* STICKY NAV (ancres) */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="sticky top-[68px] z-20 -mx-6 lg:-mx-8 px-6 lg:px-8 py-3 backdrop-blur bg-[#0B0B0E]/70 border-y border-white/10">
          <div className="flex flex-wrap gap-2">
            {anchors.map((a) => (
              <a
                key={a.id}
                href={`#${a.id}`}
                className="inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold border border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:border-[#F5C518]/40 hover:text-[#F5C518] transition"
              >
                {a.label}
                <span className="ml-2 text-white/40">· {a.hint}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20 pt-8 space-y-10">
        {/* VISION */}
        <div id="vision" className="scroll-mt-44">
          <Card
            badge="Vision"
            title="Notre mission"
            desc="Black Jesus Records est pensé pour les artistes qui veulent une image forte, une stratégie claire et un accompagnement humain. On ne fait pas juste des vidéos : on construit un projet autour de ta vision."
            bullets={[
              "Identité forte (image + cohérence)",
              "Stratégie réaliste, orientée résultats",
              "Accompagnement humain et structuré",
              "Développement long terme, projet après projet",
            ]}
          />
        </div>

        {/* FOUNDER */}
        <div id="founder" className="scroll-mt-44">
          <Card
            badge="Direction"
            title="Le fondateur"
            desc="Le label est fondé par Emmanuel Ramazani Kibanda — créateur visuel, réalisateur et producteur. Objectif : aider artistes et marques à raconter leur histoire avec des images fortes, un son propre et une stratégie solide."
            bullets={[
              "Direction artistique & réalisation",
              "Workflow pro (tournage → post-prod → livraison)",
              "Vision business + branding",
              "Rendu premium, sans blabla",
            ]}
          />
        </div>

        {/* ARTISTS */}
        <div id="artists" className="scroll-mt-44">
          <div className="rounded-2xl border border-white/10 bg-[#14141A] p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge>Développement</Badge>
                <h2 className="mt-3 text-2xl md:text-3xl font-semibold leading-tight">
                  Nos artistes
                </h2>
                <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed max-w-3xl">
                  Black Jesus Records développe actuellement l’artiste{" "}
                  <span className="font-semibold text-white">Shégué</span> : univers brut, énergie
                  de rue, identité visuelle cohérente. Le travail se fait sur le long terme.
                </p>
                <p className="mt-3 text-sm text-white/50">
                  D’autres signatures et collaborations verront le jour au fur et à mesure.
                </p>
              </div>

              <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                A&R
              </span>
            </div>

            <div className="mt-6 h-px w-full bg-white/10" />

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Voir le portfolio
              </Link>
              <a
                href="https://youtube.com/@shegue242?si=xPnxWCIG98q8bohh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#F5C518]/60 bg-[#F5C518]/10 px-6 py-3 text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518]/15"
              >
                Chaîne YouTube Shégué
              </a>
            </div>
          </div>
        </div>

        {/* OFFER */}
        <div id="offer" className="scroll-mt-44">
          <div className="rounded-2xl border border-white/10 bg-[#14141A] p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge>Accompagnement</Badge>
                <h2 className="mt-3 text-2xl md:text-3xl font-semibold leading-tight">
                  Ce qu’on offre
                </h2>
                <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed max-w-3xl">
                  On accompagne les artistes qui veulent structurer leur projet et construire
                  une identité cohérente. Image, contenus, stratégie — et exécution.
                </p>
              </div>

              <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                Label
              </span>
            </div>

            <div className="mt-6 grid gap-2 md:grid-cols-2">
              {[
                "Clips musicaux et contenus réseaux sociaux professionnels",
                "Direction artistique & branding visuel",
                "Stratégie de sortie (singles, EP, albums)",
                "Accompagnement visibilité (planning, formats, cohérence)",
                "Support structuration de carrière (cadre, objectifs, priorités)",
              ].map((item) => (
                <div key={item} className="flex gap-3 text-sm text-white/80">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 h-px w-full bg-white/10" />

            <p className="mt-6 text-xs text-white/50">
              * Chaque collaboration est évaluée : direction, timing, cohérence et potentiel.
            </p>
          </div>
        </div>

        {/* PROCESS */}
        <div id="process" className="scroll-mt-44">
          <div className="rounded-2xl border border-white/10 bg-[#121216] p-7">
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
              Process <span className="text-[#F5C518]">pro</span>, pas de confusion
            </h2>
            <p className="mt-2 text-sm md:text-base text-white/70 max-w-3xl leading-relaxed">
              On avance par étapes : vision, plan, production, release. Tout est cadré.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {[
                { t: "1. Diagnostic", d: "Univers, objectifs, cohérence, besoins réels." },
                { t: "2. Plan", d: "Direction artistique + calendrier + livrables." },
                { t: "3. Production", d: "Contenus (photo/vidéo) + post-prod premium." },
                { t: "4. Release", d: "Formats, plateforme, stratégie de sortie, suivi." },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl border border-white/10 bg-[#14141A] p-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    Étape
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{x.t}</h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{x.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 h-px w-full bg-white/10" />

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#14141A] p-6">
                <h3 className="text-base font-semibold">Ce qu’on cherche</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  Un artiste qui veut construire, pas juste “poster”.
                </p>
                <div className="mt-4 space-y-2">
                  {[
                    "Vision claire (ou volonté de la clarifier)",
                    "Sérieux & discipline (cadence, délais)",
                    "Ouverture à la direction artistique",
                    "Ambition réaliste + exécution",
                  ].map((i) => (
                    <div key={i} className="flex gap-3 text-sm text-white/80">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                      <span className="leading-relaxed">{i}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#14141A] p-6">
                <h3 className="text-base font-semibold">Ce qu’on n’accepte pas</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  Pour rester solides et cohérents.
                </p>
                <div className="mt-4 space-y-2">
                  {[
                    "Projets flous sans objectifs",
                    "Délais impossibles sans budget/plan",
                    "Manque de sérieux ou communication instable",
                    "Attentes “magiques” sans exécution",
                  ].map((i) => (
                    <div key={i} className="flex gap-3 text-sm text-white/80">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                      <span className="leading-relaxed">{i}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SUBMIT */}
        <div id="submit" className="scroll-mt-44">
          <div className="rounded-2xl border border-white/10 bg-[#14141A] p-7">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
              <div className="max-w-3xl">
                <Badge>A&R</Badge>
                <h2 className="mt-3 text-2xl md:text-3xl font-semibold leading-tight">
                  Soumettre un projet
                </h2>
                <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">
                  Tu veux présenter un projet au label ? Envoie ton univers, ton objectif, et un lien vers
                  une démo (clip, audio, live). On revient avec une réponse claire.
                </p>

                <div className="mt-5 grid gap-2 md:grid-cols-2">
                  {[
                    "1 lien (YouTube / SoundCloud / Drive) + bio courte",
                    "Ton style + référence visuelle (si tu en as)",
                    "Objectif (clip, EP, branding, stratégie)",
                    "Timeline réaliste (dates) + budget (si possible)",
                  ].map((i) => (
                    <div key={i} className="flex gap-3 text-sm text-white/80">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                      <span className="leading-relaxed">{i}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-6 py-3 text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518] hover:text-black"
                >
                  Envoyer une démo (Contact)
                </Link>
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Réserver un appel
                </Link>
              </div>
            </div>
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
              Envoie une démo ou réserve un appel. On te propose une direction claire,
              un rendu premium et une stratégie adaptée à ton public.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Réserver un appel
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-6 py-3 text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518] hover:text-black"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ========= UI helpers ========= */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
      <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
      {children}
    </div>
  );
}

function Card({
  badge,
  title,
  desc,
  bullets,
}: {
  badge: string;
  title: string;
  desc: string;
  bullets?: string[];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#14141A] p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-3xl">
          <Badge>{badge}</Badge>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold leading-tight">{title}</h2>
          <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">{desc}</p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          Label
        </span>
      </div>

      {bullets?.length ? (
        <>
          <div className="mt-6 grid gap-2 md:grid-cols-2">
            {bullets.map((b) => (
              <div key={b} className="flex gap-3 text-sm text-white/80">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                <span className="leading-relaxed">{b}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 h-px w-full bg-white/10" />
        </>
      ) : (
        <div className="mt-6 h-px w-full bg-white/10" />
      )}
    </div>
  );
}
