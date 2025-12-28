// app/post-production/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import HeroCineSlider from "@/components/HeroCineSlider";

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
    desc: "Rapide, propre, efficace.",
    bullets: ["Montage + export", "1 format", "1 révision"],
  },
  {
    title: "Premium",
    label: "Le plus demandé",
    desc: "Montage + look + audio.",
    bullets: ["Montage", "Color grading", "2 formats", "2 révisions"],
    highlight: true,
  },
  {
    title: "Signature",
    label: "Clips / corporate",
    desc: "Rendu haut de gamme.",
    bullets: ["Montage avancé", "Étalonnage précis", "Audio travaillé", "3 révisions"],
  },
];

const cn = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(" ");

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
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    targets.forEach((t) => observerRef.current?.observe(t));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen text-white">
      {/* ✅ BACKGROUND PHOTO SLIDER (COMME LES AUTRES PAGES) */}
      <div className="fixed inset-0 z-0">
        <HeroCineSlider count={11} ext=".jpg" intervalMs={8000} />
      </div>

      {/* ✅ OVERLAY POUR LISIBILITÉ */}
      <div className="fixed inset-0 z-[1] bg-black/65 backdrop-blur-[2px]" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-24 pb-20">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Post-production{" "}
          <span className="bg-gradient-to-r from-cyan-200 via-cyan-300 to-blue-200 bg-clip-text text-transparent">
            premium
          </span>
        </h1>

        <p className="mt-4 max-w-3xl text-white/75 text-lg">
          Tu envoies tes images. On livre un rendu propre, cohérent et prêt à publier.
        </p>

        <div className="mt-8 flex gap-3">
          <Link href="/booking" className="px-6 py-3 rounded-full bg-cyan-300 text-black font-semibold">
            Réserver
          </Link>
          <Link href="/contact" className="px-6 py-3 rounded-full border border-white/20">
            Devis
          </Link>
        </div>

        {/* SERVICES */}
        <section className="mt-20 space-y-10">
          {services.map((s) => (
            <div key={s.id} id={s.id} className="rounded-2xl bg-white/5 border border-white/10 p-8">
              <span className="text-cyan-300 text-xs font-semibold">{s.tag}</span>
              <h2 className="mt-2 text-2xl font-semibold">{s.title}</h2>
              <p className="mt-2 text-white/75">{s.desc}</p>

              <ul className="mt-4 grid md:grid-cols-2 gap-2 text-sm">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-cyan-300">•</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* PACKS */}
        <section id="packs" className="mt-24">
          <h2 className="text-3xl font-bold mb-8">Offres</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {packs.map((p) => (
              <div
                key={p.title}
                className={cn(
                  "rounded-2xl p-8 border",
                  p.highlight
                    ? "bg-cyan-300/15 border-cyan-300"
                    : "bg-white/5 border-white/10"
                )}
              >
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="text-sm text-white/60">{p.label}</p>

                <p className="mt-3 text-white/75">{p.desc}</p>

                <ul className="mt-4 space-y-2 text-sm">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-cyan-300">•</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-6 inline-block px-5 py-2 rounded-full bg-white/10 hover:bg-cyan-300 hover:text-black transition"
                >
                  Choisir
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
