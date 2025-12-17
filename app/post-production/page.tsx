// app/post-production/page.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type PostProdService = {
  id: "montage" | "color" | "audio";
  title: string;
  desc: string;
  tag: string;
  bullets: string[];
};

type Pack = {
  title: string;
  priceHint: string;
  desc: string;
  bullets: string[];
  highlight?: boolean;
};

type FAQ = { q: string; a: string };

const services: PostProdService[] = [
  {
    id: "montage",
    title: "Montage vidéo",
    tag: "Edit",
    desc: "On structure, on rythme, on nettoie. Un montage propre, narratif et pensé pour la plateforme.",
    bullets: [
      "Structure narrative, rythme, transitions propres",
      "Versions courtes verticales (Reels, TikTok, Shorts)",
      "Sous-titres & habillage graphique si nécessaire",
      "Exports optimisés pour YouTube, Instagram et TikTok",
    ],
  },
  {
    id: "color",
    title: "Color grading",
    tag: "Look",
    desc: "On donne une signature : cohérence entre les plans, rendu cinéma ou street, peau propre et noirs profonds.",
    bullets: [
      "Correction colorimétrique complète",
      "Match entre les plans (cohérence globale)",
      "Look cinéma / clip rap-street (selon l’intention)",
      "Gestion des hautes lumières & noirs profonds",
    ],
  },
  {
    id: "audio",
    title: "Audio & Sound Design",
    tag: "Audio",
    desc: "Un rendu pro se joue aussi au son : nettoyage, ambiances, impacts, finitions.",
    bullets: [
      "Nettoyage des prises son & réduction de bruit",
      "Synchronisation si nécessaire",
      "Ajout d’ambiances & FX sonores",
      "Équilibrage et finitions pour un rendu professionnel",
    ],
  },
];

const packs: Pack[] = [
  {
    title: "Essentiel",
    priceHint: "Idéal pour réseaux",
    desc: "Montage propre, rapide, efficace. Parfait pour Reels / TikTok / Shorts.",
    bullets: [
      "Montage + rythme + export optimisé",
      "1 format principal (vertical OU horizontal)",
      "1 révision incluse",
      "Livraison prête à publier",
    ],
  },
  {
    title: "Premium",
    priceHint: "Le plus demandé",
    desc: "Un rendu complet : montage + look + audio, avec une finition premium et cohérente.",
    bullets: [
      "Montage complet + sound design léger",
      "Color grading cohérent (look défini)",
      "2 formats (ex. YouTube + vertical)",
      "2 révisions incluses",
    ],
    highlight: true,
  },
  {
    title: "Signature",
    priceHint: "Clips / pub / corporate",
    desc: "Pour un rendu “ciné” ou brandé : étalonnage avancé, audio soigné, et cohérence totale.",
    bullets: [
      "Montage narratif + finitions avancées",
      "Color grading avancé + matching précis",
      "Audio nettoyé + design sonore renforcé",
      "3 révisions (selon brief)",
    ],
  },
];

const faqs: FAQ[] = [
  {
    q: "Quels fichiers dois-je envoyer ?",
    a: "Idéalement : dossier footage complet (caméra + drone si besoin), audio séparé si disponible, et une référence (lien) du style visé. On peut aussi travailler à partir d’un export unique si nécessaire.",
  },
  {
    q: "Vous livrez quels formats ?",
    a: "On livre selon ta plateforme : 9:16 (Reels/TikTok/Shorts), 16:9 (YouTube), 1:1 si demandé, avec exports optimisés (poids/qualité).",
  },
  {
    q: "Combien de révisions ?",
    a: "Ça dépend du pack. On travaille toujours avec un brief clair + une logique de retours structurés pour éviter les allers-retours inutiles.",
  },
  {
    q: "Vous faites des délais rapides ?",
    a: "Oui. Si c’est urgent, on peut proposer une livraison express selon la charge et le type de projet.",
  },
];

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

const workflowSteps = [
  { t: "1. Brief", d: "Plateforme, durée, références, objectif. On aligne la vision." },
  { t: "2. Montage", d: "Structure, rythme, narration. Première version cohérente." },
  { t: "3. Look + Audio", d: "Color grading + finitions sonores pour un rendu premium." },
  { t: "4. Livraison", d: "Exports optimisés + versions demandées + fichiers finaux." },
] as const;

export default function PostProductionPage() {
  const [active, setActive] = useState<string>("montage");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Smooth scroll propre (comme portfolio)
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = "smooth";
    return () => {
      el.style.scrollBehavior = prev;
    };
  }, []);

  // Scrollspy (pro): highlight la section active dans la nav sticky
  useEffect(() => {
    const ids = ["montage", "color", "audio", "packs", "faq"];
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

  const quickStats = useMemo(
    () => [
      { k: "Délais", v: "Express possible" },
      { k: "Formats", v: "9:16 • 16:9 • 1:1" },
      { k: "Rendu", v: "Look + Audio clean" },
      { k: "Livraison", v: "Prêt à publier" },
    ],
    []
  );

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
              Post-production
            </p>
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-[-0.02em]">
            On transforme vos images brutes en{" "}
            <span className="text-[#F5C518] drop-shadow-[0_0_22px_rgba(245,197,24,0.25)]">
              contenu puissant
            </span>
            .
          </h1>

          <p className={cn("mt-5 max-w-3xl text-base md:text-lg", UI.subtleText)}>
            Clips, corporate, événements, réseaux sociaux : on sublime, on corrige, on raconte.
            Workflow propre, rendu premium, livraison prête à publier.
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
              <span className="relative">Réserver une session</span>
            </Link>

            <Link href="/contact" className={UI.buttonSecondary}>
              Demander un devis
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

        {/* Services */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-10 pt-8 space-y-10">
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

                    <p className={cn("mt-2 text-sm md:text-base", UI.subtleText)}>{s.desc}</p>
                  </div>

                  <div className="shrink-0">
                    <span className={UI.pill}>Service</span>
                  </div>
                </div>

                <div className="mt-6 grid gap-2 md:grid-cols-2">
                  {s.bullets.map((b) => (
                    <div key={b} className="flex gap-3 text-sm text-white/80">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                      <span className="leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link href="/contact" className={UI.buttonSecondary}>
                    Décrire mon projet
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

        {/* Workflow */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-12">
          <div className={cn(UI.card, "p-7 bg-white/[0.03]")}>
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]">
              Workflow <span className="text-[#F5C518]">clair</span>, livraison propre
            </h2>
            <p className={cn("mt-2 text-sm md:text-base max-w-3xl", UI.subtleText)}>
              On évite le chaos : tu sais exactement quoi envoyer, à quel moment on valide, et comment on livre.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {workflowSteps.map((x) => (
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

        {/* Packs */}
        <section id="packs" className="max-w-6xl mx-auto px-6 lg:px-8 pb-16 scroll-mt-44">
          <div className="flex items-end justify-between gap-4 flex-col md:flex-row">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]">
                Offres <span className="text-[#F5C518]">post-production</span>
              </h2>
              <p className={cn("mt-2 text-sm md:text-base", UI.subtleText)}>
                Choisis un niveau clair. Le tarif exact dépend du footage, de la durée, et des objectifs.
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

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {packs.map((p) => (
              <div
                key={p.title}
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
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <p className={cn("mt-1 text-xs", p.highlight ? "text-[#F5C518]" : "text-white/50")}>
                      {p.priceHint}
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
                      p.highlight ? "bg-[#F5C518] text-black hover:opacity-95" : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
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
            * Les délais et le prix final dépendent de la durée, du volume de rushs, et des besoins (sous-titres, habillage, SFX, etc.).
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-6xl mx-auto px-6 lg:px-8 pb-20 scroll-mt-44">
          <div className={cn(UI.card, "p-7 bg-white/[0.03]")}>
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]">
              FAQ <span className="text-[#F5C518]">post-production</span>
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
                Besoin d’un rendu{" "}
                <span className="text-[#F5C518] drop-shadow-[0_0_18px_rgba(245,197,24,0.18)]">
                  pro
                </span>{" "}
                rapidement ?
              </h2>
              <p className={cn("mt-3 text-sm md:text-base", UI.subtleText)}>
                Envoie ton projet (footage, référence, plateforme cible). On te répond avec une approche claire :
                délais, rendu attendu et livraison.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/booking" className={UI.buttonPrimary}>
                <span className={UI.buttonPrimaryShine} />
                <span className="relative">Réserver une session</span>
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
