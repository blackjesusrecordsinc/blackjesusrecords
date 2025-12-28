// app/post-production/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Service = {
  id: "montage" | "color" | "audio";
  title: string;
  tag: string;
  desc: string;
  bullets: string[];
};

type Pack = {
  title: string;
  label: string;
  desc: string;
  bullets: string[];
  highlight?: boolean;
};

const services: Service[] = [
  {
    id: "montage",
    title: "Montage vidéo",
    tag: "EDIT",
    desc: "Structure claire, rythme maîtrisé, montage pensé pour la plateforme. Rien d’inutile.",
    bullets: [
      "Montage narratif propre et fluide",
      "Versions verticales (Reels / TikTok / Shorts)",
      "Sous-titres & habillage si nécessaire",
      "Exports optimisés prêts à publier",
    ],
  },
  {
    id: "color",
    title: "Color grading",
    tag: "LOOK",
    desc: "Cohérence, peau propre, contrastes maîtrisés. Look cinéma ou street selon l’intention.",
    bullets: [
      "Correction colorimétrique complète",
      "Matching précis entre les plans",
      "Look cinéma / clip rap-street",
      "Gestion fine des contrastes",
    ],
  },
  {
    id: "audio",
    title: "Audio & sound design",
    tag: "AUDIO",
    desc: "Un rendu pro passe aussi par le son. Clair, équilibré, impactant.",
    bullets: [
      "Nettoyage & réduction de bruit",
      "Synchronisation audio",
      "Ambiances & FX si nécessaire",
      "Équilibrage final prêt diffusion",
    ],
  },
];

const packs: Pack[] = [
  {
    title: "Essentiel",
    label: "Réseaux sociaux",
    desc: "Rapide, propre, efficace. Idéal pour formats courts.",
    bullets: ["Montage + export optimisé", "1 format (vertical ou horizontal)", "1 révision incluse"],
  },
  {
    title: "Premium",
    label: "Le plus demandé",
    desc: "Montage + look + audio pour un rendu cohérent et solide.",
    bullets: ["Montage complet", "Color grading cohérent", "2 formats livrés", "2 révisions incluses"],
    highlight: true,
  },
  {
    title: "Signature",
    label: "Clips / corporate",
    desc: "Rendu haut de gamme, direction claire, finitions avancées.",
    bullets: ["Montage narratif avancé", "Étalonnage précis", "Audio travaillé", "3 révisions"],
  },
];

const cn = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(" ");

const UI = {
  wrap: "max-w-6xl mx-auto px-6 lg:px-8",
  card:
    "rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl " +
    "shadow-[0_18px_60px_rgba(0,8,22,0.45)]",
  hover:
    "transition duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:-translate-y-[1px]",
  pill:
    "inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100/80 " +
    "shadow-[0_0_38px_rgba(0,180,255,0.12)]",
  subtle: "text-white/75 leading-relaxed",
  h1:
    "text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-[-0.02em] " +
    "drop-shadow-[0_12px_40px_rgba(0,180,255,0.18)]",
  h2: "text-2xl md:text-3xl font-semibold tracking-[-0.01em]",
  btnPrimary:
    "group relative inline-flex items-center justify-center rounded-full bg-cyan-300 " +
    "px-6 py-3 text-sm font-semibold text-[#001019] hover:opacity-95 transition overflow-hidden " +
    "shadow-[0_14px_44px_rgba(0,8,22,0.45)]",
  btnShine:
    "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r " +
    "from-transparent via-white/35 to-transparent group-hover:translate-x-full transition duration-700",
  btnSecondary:
    "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 " +
    "px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 hover:border-cyan-300/35 hover:text-cyan-100 transition",
  btnAquaOutline:
    "inline-flex items-center justify-center rounded-full border border-cyan-300 " +
    "px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-300 hover:text-[#001019]",
};

export default function PostProductionPage() {
  const [active, setActive] = useState<string>("montage");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const ids = ["montage", "color", "audio", "packs"];
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((x): x is HTMLElement => Boolean(x));

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const best = entries.find((e) => e.isIntersecting);
        if (best?.target?.id) setActive(best.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    targets.forEach((t) => observerRef.current?.observe(t));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-[calc(100vh-var(--nav-h))] text-white relative">
      {/* HERO */}
      <section className={cn(UI.wrap, "pt-16 pb-12 relative")}>
        <div className="pointer-events-none absolute -top-10 left-[-12%] h-[360px] w-[360px] rounded-full blur-3xl opacity-25 bg-cyan-300/40" />
        <div className="pointer-events-none absolute top-28 right-[-14%] h-[420px] w-[420px] rounded-full blur-3xl opacity-20 bg-blue-400/40" />

        <div className={UI.pill}>
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
          Post-production
        </div>

        <h1 className={cn(UI.h1, "mt-6")}>
          Post-production{" "}
          <span className="bg-gradient-to-r from-cyan-200 via-cyan-300 to-blue-200 bg-clip-text text-transparent">
            premium
          </span>
          , sans perte de temps.
        </h1>

        <p className={cn("mt-5 max-w-3xl text-base md:text-lg", UI.subtle)}>
          Tu envoies tes images. On livre un rendu propre, cohérent et prêt à publier.
        </p>

        <div className="mt-8 flex gap-3 flex-col sm:flex-row">
          <Link href="/booking" className={UI.btnPrimary}>
            <span className={UI.btnShine} />
            <span className="relative">Réserver</span>
          </Link>
          <Link href="/contact" className={UI.btnSecondary}>
            Demander un devis
          </Link>
        </div>

        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </section>

      {/* SERVICES */}
      <section className={cn(UI.wrap, "space-y-10 pb-12")}>
        {services.map((s) => (
          <div key={s.id} id={s.id} className="scroll-mt-40">
            <div className={cn(UI.card, UI.hover, "p-7")}>
              <div className="flex items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <div className={UI.pill}>
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    {s.tag}
                    <span className="ml-2 text-[11px] text-white/50">
                      {active === s.id ? "· section active" : ""}
                    </span>
                  </div>
                  <h2 className={cn(UI.h2, "mt-3")}>{s.title}</h2>
                  <p className={cn("mt-2", UI.subtle)}>{s.desc}</p>
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-2">
                {s.bullets.map((b) => (
                  <div key={b} className="flex gap-3 text-sm text-white/85">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* PACKS */}
      <section id="packs" className={cn(UI.wrap, "pb-16 scroll-mt-40")}>
        <h2 className={UI.h2}>
          Offres{" "}
          <span className="bg-gradient-to-r from-cyan-200 via-cyan-300 to-blue-200 bg-clip-text text-transparent">
            claires
          </span>
        </h2>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {packs.map((p) => (
            <div
              key={p.title}
              className={cn(
                UI.card,
                "p-7",
                p.highlight && "border-cyan-300/70 bg-cyan-300/[0.08]"
              )}
            >
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className={cn("text-xs", p.highlight ? "text-cyan-200/80" : "text-white/55")}>
                {p.label}
              </p>

              <p className={cn("mt-3 text-sm", UI.subtle)}>{p.desc}</p>

              <div className="mt-4 space-y-2">
                {p.bullets.map((b) => (
                  <div key={b} className="flex gap-3 text-sm text-white/85">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/contact"
                  className={cn(UI.btnSecondary, p.highlight && "bg-cyan-300 text-[#001019] border-none")}
                >
                  Choisir {p.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA (no black) */}
      <section className="border-t border-white/10 bg-[#041224]/30 backdrop-blur-xl">
        <div className={cn(UI.wrap, "py-14 flex flex-col md:flex-row gap-6 justify-between")}>
          <div className="max-w-2xl">
            <h2 className={UI.h2}>
              Besoin d’un rendu{" "}
              <span className="bg-gradient-to-r from-cyan-200 via-cyan-300 to-blue-200 bg-clip-text text-transparent">
                pro
              </span>{" "}
              rapidement ?
            </h2>
            <p className={cn("mt-3", UI.subtle)}>Envoie ton projet. On répond avec une direction claire.</p>
          </div>

          <div className="flex gap-3 flex-col sm:flex-row">
            <Link href="/booking" className={UI.btnPrimary}>
              <span className={UI.btnShine} />
              <span className="relative">Réserver</span>
            </Link>
            <Link href="/contact" className={UI.btnAquaOutline}>
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
