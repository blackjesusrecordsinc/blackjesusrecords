// app/label/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

type AnchorId = "vision" | "founder" | "artists" | "offer" | "process" | "submit";

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const UI = {
  card:
    "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur " +
    "shadow-[0_10px_40px_rgba(0,0,0,0.45)]",
  cardHover:
    "transition duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:-translate-y-[1px]",
  pill:
    "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70",
  subtleText: "text-white/70 leading-relaxed",
  buttonPrimary:
    "group relative inline-flex items-center justify-center rounded-full bg-[#F5C518] " +
    "px-6 py-3 text-sm font-semibold text-black transition hover:opacity-95 " +
    "shadow-[0_14px_40px_rgba(245,197,24,0.18)] overflow-hidden",
  buttonPrimaryShine:
    "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r " +
    "from-transparent via-white/25 to-transparent group-hover:translate-x-full transition duration-700",
  buttonSecondary:
    "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 " +
    "px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10",
  buttonOutlineGold:
    "inline-flex items-center justify-center rounded-full border border-[#F5C518] " +
    "px-6 py-3 text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518] hover:text-black",
};

export default function LabelPage() {
  const anchors: Array<{ id: AnchorId; label: string; hint: string }> = [
    { id: "vision", label: "Vision", hint: "Mission & valeurs" },
    { id: "founder", label: "Direction", hint: "Fondateur" },
    { id: "artists", label: "Artistes", hint: "Développement" },
    { id: "offer", label: "Offre", hint: "Accompagnement" },
    { id: "process", label: "Process", hint: "Méthode" },
    { id: "submit", label: "Soumettre", hint: "A&R" },
  ];

  const [active, setActive] = useState<string>("vision");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Smooth scroll (propre)
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = "smooth";
    return () => {
      el.style.scrollBehavior = prev;
    };
  }, []);

  // Scrollspy
  useEffect(() => {
    const ids: string[] = anchors.map((a) => a.id);
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((x): x is HTMLElement => Boolean(x));

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        const id = best?.target?.id;
        if (!id) return;
        setActive(id);
      },
      { root: null, threshold: [0.2, 0.4, 0.65], rootMargin: "-20% 0px -60% 0px" }
    );

    targets.forEach((t) => observerRef.current?.observe(t));
    return () => observerRef.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen text-white font-sans bg-[#0B0B0E] relative overflow-hidden">
      {/* halo + texture (label-grade) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-44 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#F5C518]/10 blur-[120px]" />
        <div className="absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35" />
      </div>

      <div className="relative">
        {/* HEADER */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-12">
          <div className={cn(UI.pill, "px-4 py-1.5")}>
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] text-white/70 uppercase">
              Label
            </span>
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-[-0.02em]">
            Black Jesus{" "}
            <span className="text-[#F5C518] drop-shadow-[0_0_22px_rgba(245,197,24,0.25)]">
              Records
            </span>
          </h1>

          <p className={cn("mt-5 max-w-3xl text-base md:text-lg", UI.subtleText)}>
            Label indépendant basé au Québec. On développe des projets avec une identité forte : image, son,
            stratégie et accompagnement humain — projet après projet.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className={UI.buttonSecondary}>
              Soumettre un projet
            </Link>

            <Link href="/booking" className={UI.buttonPrimary}>
              <span className={UI.buttonPrimaryShine} />
              <span className="relative">Réserver un appel</span>
            </Link>
          </div>

          <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        </section>

        {/* STICKY NAV (ancres) */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="sticky top-[68px] z-20 -mx-6 lg:-mx-8 px-6 lg:px-8 py-3 backdrop-blur bg-[#0B0B0E]/70 border-y border-white/10">
            <div className="flex flex-wrap gap-2">
              {anchors.map((a) => {
                const isActive = active === a.id;
                return (
                  <a
                    key={a.id}
                    href={`#${a.id}`}
                    aria-current={isActive ? "true" : "false"}
                    className={cn(
                      "inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold border transition",
                      isActive
                        ? "bg-[#F5C518] text-black border-[#F5C518] shadow-[0_10px_30px_rgba(245,197,24,0.15)]"
                        : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:border-[#F5C518]/40 hover:text-[#F5C518]"
                    )}
                  >
                    {a.label}
                    <span className={cn("ml-2", isActive ? "text-black/60" : "text-white/40")}>
                      · {a.hint}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20 pt-8 space-y-10">
          {/* VISION */}
          <div id="vision" className="scroll-mt-44">
            <Card
              badge="Vision"
              kicker="Mission"
              title="Une identité forte, une stratégie claire, une exécution propre."
              desc="Black Jesus Records est pensé pour les artistes qui veulent construire un projet cohérent (image + son + direction). On ne fait pas “juste du contenu” : on structure un univers et on le rend crédible."
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
              kicker="Fondateur"
              title="Emmanuel Ramazani Kibanda"
              desc="Le label est fondé par Emmanuel Ramazani Kibanda — créateur visuel, réalisateur et producteur. Objectif : aider artistes et marques à raconter leur histoire avec des images fortes, un son propre et une stratégie solide."
              bullets={[
                "Direction artistique & réalisation",
                "Workflow pro (tournage → post-prod → livraison)",
                "Vision business + branding",
                "Rendu premium, sans blabla",
              ]}
              rightTag="Direction"
            />
          </div>

          {/* ARTISTS */}
          <div id="artists" className="scroll-mt-44">
            <div className={cn(UI.card, UI.cardHover, "p-7")}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge>Développement</Badge>

                  <h2 className="mt-3 text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]">
                    Nos artistes
                  </h2>

                  <p className={cn("mt-2 text-sm md:text-base max-w-3xl", UI.subtleText)}>
                    Black Jesus Records développe actuellement l’artiste{" "}
                    <span className="font-semibold text-white">Shégué</span> : univers brut, énergie
                    de rue, identité visuelle cohérente. Le travail se fait sur le long terme.
                  </p>

                  <p className="mt-3 text-sm text-white/50">
                    D’autres signatures et collaborations verront le jour au fur et à mesure.
                  </p>
                </div>

                <span className={cn(UI.pill, "shrink-0")}>A&amp;R</span>
              </div>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link href="/portfolio" className={UI.buttonSecondary}>
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
            <div className={cn(UI.card, UI.cardHover, "p-7")}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge>Accompagnement</Badge>

                  <h2 className="mt-3 text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]">
                    Ce qu’on offre
                  </h2>

                  <p className={cn("mt-2 text-sm md:text-base max-w-3xl", UI.subtleText)}>
                    On accompagne les artistes qui veulent structurer leur projet et construire une identité cohérente.
                    Image, contenus, stratégie — et exécution.
                  </p>
                </div>

                <span className={cn(UI.pill, "shrink-0")}>Label</span>
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

              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

              <p className="mt-6 text-xs text-white/50">
                * Chaque collaboration est évaluée : direction, timing, cohérence et potentiel.
              </p>
            </div>
          </div>

          {/* PROCESS */}
          <div id="process" className="scroll-mt-44">
            <div className={cn(UI.card, "p-7 bg-white/[0.03]")}>
              <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]">
                Process <span className="text-[#F5C518]">pro</span>, pas de confusion
              </h2>

              <p className={cn("mt-2 text-sm md:text-base max-w-3xl", UI.subtleText)}>
                On avance par étapes : vision, plan, production, release. Tout est cadré.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-4">
                {[
                  { t: "1. Diagnostic", d: "Univers, objectifs, cohérence, besoins réels." },
                  { t: "2. Plan", d: "Direction artistique + calendrier + livrables." },
                  { t: "3. Production", d: "Contenus (photo/vidéo) + post-prod premium." },
                  { t: "4. Release", d: "Formats, plateforme, stratégie de sortie, suivi." },
                ].map((x) => (
                  <div key={x.t} className={cn(UI.card, "p-5")}>
                    <div className={UI.pill}>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                      Étape
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">{x.t}</h3>
                    <p className={cn("mt-2 text-sm", UI.subtleText)}>{x.d}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className={cn(UI.card, "p-6")}>
                  <h3 className="text-base font-semibold">Ce qu’on cherche</h3>
                  <p className={cn("mt-2 text-sm", UI.subtleText)}>
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

                <div className={cn(UI.card, "p-6")}>
                  <h3 className="text-base font-semibold">Ce qu’on n’accepte pas</h3>
                  <p className={cn("mt-2 text-sm", UI.subtleText)}>
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
            <div className={cn(UI.card, UI.cardHover, "p-7")}>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                <div className="max-w-3xl">
                  <Badge>A&amp;R</Badge>

                  <h2 className="mt-3 text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]">
                    Soumettre un projet
                  </h2>

                  <p className={cn("mt-2 text-sm md:text-base", UI.subtleText)}>
                    Tu veux présenter un projet au label ? Envoie ton univers, ton objectif, et un lien vers une démo
                    (clip, audio, live). On revient avec une réponse claire.
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
                  <Link href="/contact" className={UI.buttonOutlineGold}>
                    Envoyer une démo (Contact)
                  </Link>

                  <Link href="/booking" className={UI.buttonPrimary}>
                    <span className={UI.buttonPrimaryShine} />
                    <span className="relative">Réserver un appel</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 bg-[#0D0D10]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]">
                Tu as une vision et tu veux la rendre{" "}
                <span className="text-[#F5C518] drop-shadow-[0_0_18px_rgba(245,197,24,0.18)]">
                  réelle
                </span>{" "}
                ?
              </h2>
              <p className={cn("mt-3 text-sm md:text-base", UI.subtleText)}>
                Envoie une démo ou réserve un appel. On te propose une direction claire, un rendu premium et une stratégie adaptée à ton public.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/booking" className={UI.buttonPrimary}>
                <span className={UI.buttonPrimaryShine} />
                <span className="relative">Réserver un appel</span>
              </Link>

              <Link href="/contact" className={UI.buttonOutlineGold}>
                Contact
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ========= UI helpers ========= */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className={UI.pill}>
      <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
      {children}
    </div>
  );
}

function Card({
  badge,
  kicker,
  title,
  desc,
  bullets,
  rightTag = "Label",
}: {
  badge: string;
  kicker?: string;
  title: string;
  desc: string;
  bullets?: string[];
  rightTag?: string;
}) {
  return (
    <div className={cn(UI.card, UI.cardHover, "p-7")}>
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-3xl">
          <Badge>{badge}</Badge>

          {kicker && (
            <p className="mt-3 text-[11px] tracking-[0.25em] uppercase text-white/45">
              {kicker}
            </p>
          )}

          <h2 className="mt-2 text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]">
            {title}
          </h2>

          <p className={cn("mt-2 text-sm md:text-base", UI.subtleText)}>{desc}</p>
        </div>

        <span className={cn(UI.pill, "shrink-0")}>{rightTag}</span>
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
          <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        </>
      ) : (
        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      )}
    </div>
  );
}
