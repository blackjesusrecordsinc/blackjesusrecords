"use client";

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

const cn = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

export default function PostProductionPage() {
  return (
    <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-24 pb-24 text-white">
      {/* HERO */}
      <header className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Post-production{" "}
          <span className="text-primary">premium</span>
        </h1>

        <p className="mt-4 text-lg text-grayText">
          Tu envoies tes images. On livre un rendu propre, cohérent et prêt à publier.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/booking"
            className="px-6 py-3 rounded-full bg-primary text-black font-semibold shadow-glow"
          >
            Réserver
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full border border-white/20 hover:border-primary transition"
          >
            Devis
          </Link>
        </div>
      </header>

      {/* SERVICES */}
      <section className="mt-24 space-y-10">
        {services.map((s) => (
          <div
            key={s.id}
            id={s.id}
            className="rounded-2xl bg-white/5 border border-white/10 p-8"
          >
            <span className="text-primary text-xs font-semibold">{s.tag}</span>
            <h2 className="mt-2 text-2xl font-semibold">{s.title}</h2>
            <p className="mt-2 text-grayText">{s.desc}</p>

            <ul className="mt-4 grid md:grid-cols-2 gap-2 text-sm text-grayText">
              {s.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-primary">•</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* PACKS */}
      <section id="packs" className="mt-28">
        <h2 className="text-3xl font-bold mb-10">Offres</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {packs.map((p) => (
            <div
              key={p.title}
              className={cn(
                "rounded-2xl p-8 border transition",
                p.highlight
                  ? "bg-primary/10 border-primary shadow-glow"
                  : "bg-white/5 border-white/10"
              )}
            >
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="text-sm text-white/60">{p.label}</p>

              <p className="mt-3 text-grayText">{p.desc}</p>

              <ul className="mt-4 space-y-2 text-sm text-grayText">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-primary">•</span>
                    {b}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-6 inline-block px-5 py-2 rounded-full
                           bg-white/10 hover:bg-primary hover:text-black transition"
              >
                Choisir
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
