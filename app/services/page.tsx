// app/services/page.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type ServiceId = "video" | "photo" | "social" | "web" | "strategy";

type Service = {
  id: ServiceId;
  title: string;
  tag: string;
  subtitle: string;
  points: string[];
};

type Pack = {
  serviceId: ServiceId;
  title: string;
  hint: string;
  desc: string;
  bullets: string[];
  highlight?: boolean;
};

type FAQ = { q: string; a: string };

const services: Service[] = [
  {
    id: "video",
    title: "Production vidéo",
    tag: "Video",
    subtitle:
      "Clips musicaux, publicités, vidéos corporatives et couverture d’événements — tournage propre, image stable, rendu premium.",
    points: [
      "Direction artistique + accompagnement créatif",
      "Tournage intérieur/extérieur (lumière maîtrisée)",
      "Montage, habillage graphique & sous-titrage (si nécessaire)",
      "Étalonnage (color grading) pour un rendu cinématographique",
    ],
  },
  {
    id: "photo",
    title: "Shooting photo",
    tag: "Photo",
    subtitle:
      "Séances photos pro pour artistes, familles, entreprises et marques. Image cohérente, retouches clean, livraison web & print.",
    points: [
      "Portraits individuels & shooting d’artistes",
      "Séances famille / couple (émotion + direction)",
      "Corporate : équipe, services, locaux, branding",
      "Retouches pro prêtes pour web & impression",
    ],
  },
  {
    id: "social",
    title: "Réseaux sociaux",
    tag: "Social",
    subtitle:
      "Contenu qui attire l’attention et renforce l’image : formats courts, hooks efficaces, cohérence visuelle et stratégie.",
    points: [
      "Plan de contenu mensuel sur mesure",
      "Vidéos courtes (Reels, TikTok, Shorts) : tournage & montage",
      "Optimisation (structure, format, rythme, call-to-action)",
      "Accompagnement stratégie de croissance",
    ],
  },
  {
    id: "web",
    title: "Création de site web",
    tag: "Web",
    subtitle:
      "Sites modernes, rapides, mobile-first, pensés pour convertir. Design cohérent avec ton image + SEO de base.",
    points: [
      "Site vitrine pro (one-page ou multi-pages)",
      "Formulaire contact + prise de rendez-vous",
      "SEO de base + structure propre (titres, pages, vitesse)",
      "Design cohérent + sections orientées conversion",
    ],
  },
  {
    id: "strategy",
    title: "Croissance & stratégie d’entreprise",
    tag: "Strategy",
    subtitle:
      "On structure ton image, tes offres et ta com. Objectif : plus clair, plus crédible, plus rentable.",
    points: [
      "Analyse positionnement + identité visuelle",
      "Conseils offres/prix/presentation (clarité + valeur)",
      "Stratégie contenu alignée objectifs (KPI)",
      "Suivi + ajustements en fonction des résultats",
    ],
  },
];

const packs: Pack[] = [
  // VIDEO
  {
    serviceId: "video",
    title: "Essentiel",
    hint: "Réseaux / promo",
    desc: "Tournage léger + montage propre, parfait pour publier rapidement.",
    bullets: ["Tournage court", "Montage + export optimisé", "1 format (vertical ou 16:9)", "1 révision incluse"],
  },
  {
    serviceId: "video",
    title: "Premium",
    hint: "Le plus demandé",
    desc: "Direction plus poussée, rendu plus “ciné”, meilleure cohérence globale.",
    bullets: ["DA + tournage plus complet", "Montage + color grading", "2 formats (YouTube + vertical)", "2 révisions incluses"],
    highlight: true,
  },
  {
    serviceId: "video",
    title: "Signature",
    hint: "Clip / pub / corporate",
    desc: "Pour un rendu haut niveau : image, lumière, rythme, finitions, cohérence totale.",
    bullets: ["DA avancée + setup lumière", "Montage narratif + finitions", "Color + audio amélioré", "3 révisions (selon brief)"],
  },

  // PHOTO
  {
    serviceId: "photo",
    title: "Mini session",
    hint: "Portrait rapide",
    desc: "Idéal pour une photo pro/branding sans se compliquer.",
    bullets: ["Direction simple", "Sélection + retouches clean", "Exports web prêts", "Livraison rapide"],
  },
  {
    serviceId: "photo",
    title: "Branding",
    hint: "Artistes / business",
    desc: "Une série cohérente pour site, réseaux, presse, Google Business.",
    bullets: ["Direction + cohérence visuelle", "Sélection + retouches avancées", "Variantes cadrage (web/print)", "Galerie livrée propre"],
    highlight: true,
  },
  {
    serviceId: "photo",
    title: "Editorial",
    hint: "Signature visuelle",
    desc: "Identité forte : style, intention, rendu signature.",
    bullets: ["Moodboard + direction", "Retouches avancées", "Cohérence artistique", "Livraison premium"],
  },

  // SOCIAL
  {
    serviceId: "social",
    title: "Starter",
    hint: "Consistance",
    desc: "On lance une routine de contenu propre et régulière.",
    bullets: ["Plan simple", "Production formats courts", "Optimisation exports", "Suivi léger"],
  },
  {
    serviceId: "social",
    title: "Growth",
    hint: "Stratégie + production",
    desc: "Format sérieux : on améliore la régularité, la qualité et les résultats.",
    bullets: ["Plan mensuel structuré", "Production + montage + hooks", "Optimisation (timing/format)", "Suivi KPI"],
    highlight: true,
  },
  {
    serviceId: "social",
    title: "Full",
    hint: "Présence complète",
    desc: "Gestion plus complète + cohérence visuelle + cadences plus fortes.",
    bullets: ["Calendrier éditorial", "Production récurrente", "Optimisation + tests", "Reporting KPI"],
  },

  // WEB
  {
    serviceId: "web",
    title: "One-page",
    hint: "Simple & efficace",
    desc: "Une page propre qui convertit, rapide et mobile-first.",
    bullets: ["Structure claire", "Sections conversion", "Formulaire contact", "SEO de base"],
  },
  {
    serviceId: "web",
    title: "Site pro",
    hint: "Multi-pages",
    desc: "Plus complet : services, portfolio, contact, SEO de base et structure solide.",
    bullets: ["Pages clés", "Portfolio intégré", "Optimisation vitesse", "SEO de base + structure"],
    highlight: true,
  },
  {
    serviceId: "web",
    title: "Sur-mesure",
    hint: "Brand premium",
    desc: "Design + structure adaptés exactement à ton image et ton besoin.",
    bullets: ["Design sur-mesure", "Sections avancées", "Optimisation", "Évolutif"],
  },

  // STRATEGY
  {
    serviceId: "strategy",
    title: "Audit",
    hint: "Clarté",
    desc: "On identifie ce qui bloque : image, offre, message, cohérence.",
    bullets: ["Analyse positionnement", "Points à corriger", "Plan d’action", "Priorités"],
  },
  {
    serviceId: "strategy",
    title: "Plan de croissance",
    hint: "Le plus demandé",
    desc: "On structure ton offre + ton contenu + ton message pour un vrai impact.",
    bullets: ["Offre/prix/pitch", "Stratégie contenu", "Identité visuelle cohérente", "KPI & suivi"],
    highlight: true,
  },
  {
    serviceId: "strategy",
    title: "Accompagnement",
    hint: "Suivi",
    desc: "On avance ensemble : ajustements, décisions, optimisation au fil des résultats.",
    bullets: ["Suivi régulier", "Optimisation continue", "Ajustements KPI", "Support décisionnel"],
  },
];

const faqs: FAQ[] = [
  {
    q: "Comment vous fixez le prix ?",
    a: "Selon le scope : durée, complexité, déplacement, besoins (vidéo/photo), nombre de livrables, délais. On propose toujours un cadre clair.",
  },
  {
    q: "Est-ce que je peux prendre seulement une partie (ex : montage) ?",
    a: "Oui. On peut faire service par service, ou un package complet selon ton objectif.",
  },
  {
    q: "Vous livrez quels formats ?",
    a: "On livre selon la plateforme : vertical (9:16), YouTube (16:9), carré (1:1) si demandé, avec exports optimisés.",
  },
  {
    q: "Combien de temps pour livrer ?",
    a: "Selon la charge et la complexité. Si tu as une urgence, on peut proposer un délai express.",
  },
];

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const serviceLabel = (id: ServiceId) => {
  switch (id) {
    case "video":
      return "Production vidéo";
    case "photo":
      return "Shooting photo";
    case "social":
      return "Réseaux sociaux";
    case "web":
      return "Création de site web";
    case "strategy":
      return "Croissance & stratégie";
  }
};

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

export default function ServicesPage() {
  const [active, setActive] = useState<string>("video");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const quickStats = useMemo(
    () => [
      { k: "Qualité", v: "Label-grade" },
      { k: "Livraison", v: "Formats optimisés" },
      { k: "Créatif", v: "DA + cohérence" },
      { k: "Objectif", v: "Image + résultats" },
    ],
    []
  );

  // Smooth scroll propre
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = "smooth";
    return () => {
      el.style.scrollBehavior = prev;
    };
  }, []);

  // Scrollspy (active pill)
  useEffect(() => {
    const ids = ["video", "photo", "social", "web", "strategy", "packs", "process", "faq"];
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
  }, []);

  return (
    <main className="min-h-screen text-white font-sans bg-[#0B0B0E] relative overflow-hidden">
      {/* halo + texture (label-grade) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#F5C518]/10 blur-[120px]" />
        <div className="absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35" />
      </div>

      <div className="relative">
        {/* Header */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
            <p className="text-[11px] font-semibold tracking-[0.25em] text-white/70 uppercase">
              Services
            </p>
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-[-0.02em]">
            Image, son{" "}
            <span className="text-[#F5C518] drop-shadow-[0_0_22px_rgba(245,197,24,0.25)]">
              & stratégie
            </span>{" "}
            pour les marques exigeantes.
          </h1>

          <p className={cn("mt-5 max-w-3xl text-base md:text-lg", UI.subtleText)}>
            Black Jesus Records accompagne artistes, créateurs et entreprises qui veulent une image professionnelle,
            cohérente et orientée résultats. Vidéo, photo, réseaux, site web et stratégie : tout est centralisé au même endroit.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickStats.map((s) => (
              <div key={s.k} className={cn(UI.card, "px-5 py-4")}>
                <p className="text-[11px] tracking-[0.25em] uppercase text-white/45">{s.k}</p>
                <p className="mt-1 text-sm font-semibold text-white/85">{s.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/booking" className={UI.buttonPrimary}>
              <span className={UI.buttonPrimaryShine} />
              <span className="relative">Réserver une date</span>
            </Link>

            <Link href="/contact" className={UI.buttonSecondary}>
              Parler de votre projet
            </Link>
          </div>

          <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        </section>

        {/* Sticky nav (ancres) */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="sticky top-[68px] z-20 -mx-6 lg:-mx-8 px-6 lg:px-8 py-3 backdrop-blur bg-[#0B0B0E]/70 border-y border-white/10">
            <div className="flex flex-wrap gap-2">
              {services.map((s) => {
                const isActive = active === s.id;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    aria-current={isActive ? "true" : "false"}
                    className={cn(
                      "inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold border transition",
                      isActive
                        ? "bg-[#F5C518] text-black border-[#F5C518] shadow-[0_10px_30px_rgba(245,197,24,0.15)]"
                        : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:border-[#F5C518]/40 hover:text-[#F5C518]"
                    )}
                  >
                    {s.title}
                    <span className={cn("ml-2", isActive ? "text-black/60" : "text-white/40")}>
                      · {s.tag}
                    </span>
                  </a>
                );
              })}

              {[
                { id: "packs", label: "Offres", gold: true },
                { id: "process", label: "Process", gold: false },
                { id: "faq", label: "FAQ", gold: false },
              ].map((x) => {
                const isActive = active === x.id;
                return (
                  <a
                    key={x.id}
                    href={`#${x.id}`}
                    aria-current={isActive ? "true" : "false"}
                    className={cn(
                      "inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold border transition",
                      isActive
                        ? "bg-[#F5C518] text-black border-[#F5C518] shadow-[0_10px_30px_rgba(245,197,24,0.15)]"
                        : x.gold
                        ? "border-[#F5C518]/40 bg-[#F5C518]/10 text-[#F5C518] hover:bg-[#F5C518]/15"
                        : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:border-[#F5C518]/40 hover:text-[#F5C518]"
                    )}
                  >
                    {x.label}
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services (sections propres) */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-12 pt-8 space-y-10">
          {services.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-44">
              <div className={cn(UI.card, UI.cardHover, "p-7")}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="max-w-3xl">
                    <div className={UI.pill}>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                      {s.tag}
                    </div>

                    <h2 className="mt-3 text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]">
                      {s.title}
                    </h2>

                    <p className={cn("mt-2 text-sm md:text-base", UI.subtleText)}>{s.subtitle}</p>
                  </div>

                  <div className="shrink-0">
                    <span className={UI.pill}>Sur demande</span>
                  </div>
                </div>

                <div className="mt-6 grid gap-2 md:grid-cols-2">
                  {s.points.map((p) => (
                    <div key={p} className="flex gap-3 text-sm text-white/80">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                      <span className="leading-relaxed">{p}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link href="/contact" className={UI.buttonSecondary}>
                    Décrire mon besoin
                  </Link>
                  <Link href="/booking" className={UI.buttonPrimary}>
                    <span className={UI.buttonPrimaryShine} />
                    <span className="relative">Réserver</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Packs */}
        <section id="packs" className="max-w-6xl mx-auto px-6 lg:px-8 pb-12 scroll-mt-44">
          <div className="flex items-end justify-between gap-4 flex-col md:flex-row">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]">
                Offres <span className="text-[#F5C518]">claires</span>, scope propre
              </h2>
              <p className={cn("mt-2 text-sm md:text-base", UI.subtleText)}>
                Choisis un niveau selon ton objectif. On ajuste ensuite selon la durée, la complexité, et les livrables.
              </p>
            </div>

            <div className="flex gap-3">
              <Link href="/contact" className={UI.buttonSecondary}>
                Obtenir un devis
              </Link>
              <Link href="/booking" className={UI.buttonPrimary}>
                <span className={UI.buttonPrimaryShine} />
                <span className="relative">Réserver</span>
              </Link>
            </div>
          </div>

          <div className="mt-6 space-y-10">
            {services.map((s) => {
              const group = packs.filter((p) => p.serviceId === s.id);
              return (
                <div key={s.id} className={cn(UI.card, "p-7 bg-white/[0.03]")}>
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                      <div className={UI.pill}>
                        <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                        {serviceLabel(s.id)}
                      </div>
                      <h3 className="mt-3 text-xl md:text-2xl font-semibold">
                        Packs — {s.title}
                      </h3>
                      <p className={cn("mt-2 text-sm max-w-3xl", UI.subtleText)}>
                        Trois niveaux : rapide / premium / signature. On confirme le scope après ton brief.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <a href={`#${s.id}`} className={UI.buttonSecondary}>
                        Voir détails
                      </a>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full border border-[#F5C518]/60 bg-[#F5C518]/10 px-6 py-3 text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518]/15"
                      >
                        Demander prix
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-3">
                    {group.map((p) => (
                      <div
                        key={`${p.serviceId}-${p.title}`}
                        className={cn(
                          UI.card,
                          "p-7 transition",
                          p.highlight
                            ? "border-[#F5C518]/60 shadow-[0_0_0_1px_rgba(245,197,24,0.15),0_30px_120px_rgba(0,0,0,0.55)]"
                            : "hover:border-white/20"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="text-lg font-semibold">{p.title}</h4>
                            <p className={cn("mt-1 text-xs", p.highlight ? "text-[#F5C518]" : "text-white/50")}>
                              {p.hint}
                            </p>
                          </div>

                          {p.highlight && (
                            <span className="shrink-0 rounded-full border border-[#F5C518]/50 bg-[#F5C518]/10 px-3 py-1 text-xs text-[#F5C518]">
                              Recommandé
                            </span>
                          )}
                        </div>

                        <p className={cn("mt-3 text-sm", UI.subtleText)}>{p.desc}</p>

                        <div className="mt-5 grid gap-2">
                          {p.bullets.map((b) => (
                            <div key={b} className="flex gap-3 text-sm text-white/80">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                              <span className="leading-relaxed">{b}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                        <div className="mt-6 flex flex-col gap-3">
                          <Link
                            href="/contact"
                            className={cn(
                              "group relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition overflow-hidden",
                              p.highlight
                                ? "bg-[#F5C518] text-black hover:opacity-95"
                                : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                            )}
                          >
                            {p.highlight && <span className={UI.buttonPrimaryShine} />}
                            <span className="relative">Choisir {p.title}</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-xs text-white/50">
                    * Tarif final = durée + complexité + livrables + délais. On pose tout au clair avant de commencer.
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Process */}
        <section id="process" className="max-w-6xl mx-auto px-6 lg:px-8 pb-12 scroll-mt-44">
          <div className={cn(UI.card, "p-7 bg-white/[0.03]")}>
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]">
              Process <span className="text-[#F5C518]">pro</span>, livraison clean
            </h2>
            <p className={cn("mt-2 text-sm md:text-base max-w-3xl", UI.subtleText)}>
              On évite la confusion : brief clair, validation, production, livraison prête à publier.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {[
                { t: "1. Brief", d: "Objectif, plateforme, style, contraintes. On aligne la vision." },
                { t: "2. Production", d: "Tournage / shooting / création selon le service, avec structure." },
                { t: "3. Post-prod", d: "Montage, retouches, look, exports. Cohérence + finition." },
                { t: "4. Livraison", d: "Fichiers finaux + formats demandés + conseils publication." },
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
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-6xl mx-auto px-6 lg:px-8 pb-20 scroll-mt-44">
          <div className={cn(UI.card, "p-7 bg-white/[0.03]")}>
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]">
              FAQ <span className="text-[#F5C518]">services</span>
            </h2>
            <p className={cn("mt-2 text-sm md:text-base max-w-3xl", UI.subtleText)}>
              Les réponses aux questions qu’on reçoit le plus.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {faqs.map((f) => (
                <div key={f.q} className={cn(UI.card, "p-6")}>
                  <h3 className="text-base font-semibold">{f.q}</h3>
                  <p className={cn("mt-2 text-sm", UI.subtleText)}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 bg-[#0D0D10]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]">
                Prêt à faire passer votre image au{" "}
                <span className="text-[#F5C518] drop-shadow-[0_0_18px_rgba(245,197,24,0.18)]">
                  niveau supérieur
                </span>{" "}
                ?
              </h2>
              <p className={cn("mt-3 text-sm md:text-base", UI.subtleText)}>
                Parle-nous de ton projet. On revient avec une proposition claire : scope, délais, livrables.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/booking" className={UI.buttonPrimary}>
                <span className={UI.buttonPrimaryShine} />
                <span className="relative">Réserver une date</span>
              </Link>

              <Link href="/contact" className={UI.buttonOutlineGold}>
                Parler de votre projet
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
