// app/about/page.tsx
"use client";

import React, { useMemo } from "react";
import Link from "next/link";

type AnchorId = "intro" | "story" | "founder" | "identity" | "mission" | "values" | "difference" | "vision";

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export default function AboutPage() {
  const anchors = useMemo<Array<{ id: AnchorId; label: string; hint: string }>>(
    () => [
      { id: "intro", label: "À propos", hint: "Résumé" },
      { id: "story", label: "Histoire", hint: "Origine" },
      { id: "founder", label: "Fondateur", hint: "Emmanuel" },
      { id: "identity", label: "Identité", hint: "Label & studio" },
      { id: "mission", label: "Mission", hint: "Objectif" },
      { id: "values", label: "Valeurs", hint: "Standards" },
      { id: "difference", label: "Différence", hint: "Pourquoi nous" },
      { id: "vision", label: "Vision", hint: "Long terme" },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white font-sans">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-44 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#F5C518]/10 blur-3xl" />
          <div className="absolute -bottom-56 right-8 h-[460px] w-[460px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,197,24,0.08),transparent_55%)]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-10 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] text-white/70 uppercase">
              À propos
            </span>
          </div>

          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Un studio créatif & un label{" "}
            <span className="text-[#F5C518]">construits pour durer</span>.
          </h1>

          <p className="mt-5 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
            Black Jesus Records est basé à Lévis (QC). On combine image, son et stratégie pour produire
            des contenus qui tapent l’œil — et qui servent un objectif réel : crédibilité, conversion,
            visibilité, identité.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Voir le portfolio
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Parler de ton projet
            </Link>
          </div>
        </div>
      </section>

      {/* STICKY NAV */}
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
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20 pt-10">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left column: narrative */}
          <div className="lg:col-span-8 space-y-8">
            <div id="intro" className="scroll-mt-44">
              <Card
                badge="À propos"
                title="Black Jesus Records"
                desc={
                  <>
                    <strong className="text-white">Black Jesus Records</strong> est un{" "}
                    <strong className="text-white">studio créatif</strong> et un{" "}
                    <strong className="text-white">label</strong> basé à Lévis (QC), spécialisé dans
                    l’audiovisuel, la musique, la photographie et la stratégie digitale. On accompagne
                    les artistes, indépendants et entreprises qui veulent projeter une image{" "}
                    <span className="text-white">forte</span>, <span className="text-white">pro</span> et{" "}
                    <span className="text-white">moderne</span>.
                  </>
                }
                bullets={[
                  "Image premium : tournage, lumière, cadrage, post-prod",
                  "Contenus orientés plateformes : YouTube, Reels, TikTok, Shorts",
                  "Cohérence de marque : identité visuelle + message",
                  "Approche directe : brief clair → production → livraison",
                ]}
              />
            </div>

            <div id="story" className="scroll-mt-44">
              <Card
                badge="Notre histoire"
                title="Bâti morceau par morceau"
                desc={
                  <>
                    Black Jesus Records est né d’un besoin simple : créer un endroit où les idées des
                    artistes et des entrepreneurs sont prises au sérieux — même quand le budget est
                    limité, mais l’ambition très élevée.
                    <br />
                    <br />
                    Au départ, le studio a été construit étape par étape : traitement acoustique,
                    matériel vidéo, lumière, montage, musique. Chaque élément a été pensé pour offrir une
                    expérience professionnelle dans un environnement humain, accessible et créatif.
                  </>
                }
              />
            </div>

            <div id="founder" className="scroll-mt-44">
              <Card
                badge="Le fondateur"
                title="Emmanuel Ramazani Kibanda"
                desc={
                  <>
                    Le studio a été fondé par{" "}
                    <strong className="text-white">Emmanuel Ramazani Kibanda</strong>, créateur
                    multidisciplinaire passionné par l’image, le son et les histoires vraies.
                    <br />
                    <br />
                    Son objectif : offrir aux artistes et aux entreprises un partenaire fiable, capable
                    de transformer une idée en contenu concret, prêt à être montré au public.
                  </>
                }
                bullets={[
                  "Réalisation & direction artistique",
                  "Production / post-production (montage, color, sound design)",
                  "Branding visuel + formats plateforme",
                  "Cadre pro, communication claire, livrables propres",
                ]}
              />
            </div>

            <div id="identity" className="scroll-mt-44">
              <Card
                badge="Identité"
                title="Label + studio créatif"
                desc={
                  <>
                    Black Jesus Records est à la fois un{" "}
                    <strong className="text-white">label</strong> et un{" "}
                    <strong className="text-white">studio créatif</strong>. On travaille sur : clips,
                    campagnes visuelles, shooting photo, enregistrement, post-production, branding visuel
                    et optimisation pour les réseaux sociaux.
                  </>
                }
              />
            </div>

            <div id="mission" className="scroll-mt-44">
              <Card
                badge="Mission"
                title="Créer du contenu qui compte"
                desc={
                  <>
                    Apporter aux artistes et aux entreprises les outils visuels et sonores nécessaires
                    pour faire grandir leur image, toucher leur public et se démarquer. Que ce soit un
                    clip, un site web, un shooting photo ou une stratégie de contenu, le but reste le
                    même : <strong className="text-white">produire du contenu utile</strong>, pas juste
                    “beau”.
                  </>
                }
              />
            </div>

            <div id="values" className="scroll-mt-44">
              <ListCard
                badge="Valeurs"
                title="Nos standards"
                items={[
                  {
                    t: "Authenticité",
                    d: "Le contenu doit refléter la vraie identité du client, pas une façade.",
                  },
                  {
                    t: "Qualité",
                    d: "Soigner autant les détails techniques que l’émotion transmise.",
                  },
                  { t: "Créativité", d: "Proposer des idées qui sortent du simple “déjà vu”." },
                  {
                    t: "Respect & discrétion",
                    d: "Confidentialité, professionnalisme et attitude propre.",
                  },
                  {
                    t: "Accompagnement",
                    d: "Guider du premier message jusqu’à la livraison finale.",
                  },
                ]}
              />
            </div>

            <div id="difference" className="scroll-mt-44">
              <ListCard
                badge="Différence"
                title="Ce qui nous distingue"
                items={[
                  { t: "Un seul studio", d: "Image, son et stratégie au même endroit." },
                  {
                    t: "Approche flexible",
                    d: "Basé à Lévis / Québec, projets possibles à l’international.",
                  },
                  {
                    t: "Relation directe",
                    d: "Tu parles à la direction — pas à une chaîne d’intermédiaires.",
                  },
                  {
                    t: "Livrables plateforme",
                    d: "Exports optimisés YouTube / Reels / TikTok, prêts à publier.",
                  },
                  {
                    t: "Suivi post-projet",
                    d: "On t’aide à bien utiliser le contenu (publication, formats, cohérence).",
                  },
                ]}
              />
            </div>

            <div id="vision" className="scroll-mt-44">
              <Card
                badge="Vision"
                title="Être une référence depuis Lévis"
                desc={
                  <>
                    Construire, depuis Lévis, un label et un studio créatif reconnus pour leur sérieux,
                    leur exigence et leur capacité à faire émerger des projets solides.
                    <br />
                    <br />
                    Black Jesus Records s’adresse à celles et ceux qui ne cherchent pas seulement “une
                    vidéo” ou “des photos”, mais un partenaire pour développer leur image.
                  </>
                }
              />
            </div>
          </div>

          {/* Right column: credibility / CTAs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#14141A] p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <h3 className="text-xl font-semibold tracking-tight">Pourquoi ça tape “label”</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                On vise une esthétique premium : hiérarchie claire, contrastes propres, rythme, et
                cohérence sur toutes les pages.
              </p>

              <div className="mt-5 space-y-3 text-sm text-white/80">
                {[
                  "Design sombre + gold (signature) maîtrisé",
                  "Cartes premium (bordures soft, profondeur subtile)",
                  "Sections courtes, lisibles, orientées conversion",
                  "CTA toujours visibles pour convertir",
                ].map((t) => (
                  <div key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    <span className="leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 h-px w-full bg-white/10" />

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Voir les services
                </Link>
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Réserver une date
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#121216] p-7">
              <h3 className="text-lg font-semibold">Conseil “pro max”</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Mets 2–3 photos fortes sur le portfolio (même peu) plutôt que 20 moyennes. Ça change
                instantanément la perception premium.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-[#121216]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-tight">
              Tu veux une image{" "}
              <span className="text-[#F5C518]">crédible</span> dès l’arrivée ?
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
              Envoie ton brief. On te répond avec une direction claire, un rendu premium et un cadre de
              livraison propre.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-6 py-3 text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518] hover:text-black"
            >
              Contact
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Voir le portfolio
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
  desc: React.ReactNode;
  bullets?: string[];
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#14141A] p-7 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-3xl">
          <Badge>{badge}</Badge>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold leading-tight tracking-tight">
            {title}
          </h2>
          <div className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">{desc}</div>
        </div>
        <span className="shrink-0 hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          Black Jesus Records
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

function ListCard({
  badge,
  title,
  items,
}: {
  badge: string;
  title: string;
  items: Array<{ t: string; d: string }>;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#14141A] p-7 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
      <Badge>{badge}</Badge>
      <h2 className="mt-3 text-2xl md:text-3xl font-semibold leading-tight tracking-tight">
        {title}
      </h2>

      <div className="mt-6 grid gap-4">
        {items.map((x) => (
          <div
            key={x.t}
            className="rounded-2xl border border-white/10 bg-[#0F0F12] p-5 hover:border-white/15 transition"
          >
            <p className="text-sm font-semibold text-white">{x.t}</p>
            <p className="mt-1 text-sm text-white/70 leading-relaxed">{x.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 h-px w-full bg-white/10" />
    </div>
  );
}
