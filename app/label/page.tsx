"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import HeroCineSlider from "@/components/HeroCineSlider";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const glowPulse: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const UI = {
  pill:
    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full " +
    "bg-cyan-300/10 border border-cyan-300/25 shadow-[0_0_40px_rgba(0,180,255,0.12)]",
  card:
    "rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl " +
    "shadow-[0_18px_60px_rgba(0,8,22,0.35)] " +
    "hover:border-cyan-300/25 hover:bg-white/8 transition",
  btnPrimary:
    "group relative px-8 py-4 bg-cyan-300 text-[#001019] font-semibold rounded-lg overflow-hidden transition-all " +
    "hover:scale-[1.02] active:scale-95 shadow-[0_14px_52px_rgba(0,8,22,0.45)]",
  btnPrimaryGlow:
    "absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity",
  btnSecondary:
    "px-8 py-4 border border-white/20 text-white font-medium rounded-lg " +
    "hover:border-cyan-300 hover:text-cyan-100 transition-all",
  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",
};

const pillars = [
  {
    title: "Direction artistique",
    tag: "Identité · Cohérence",
    desc: "On construit un univers : visuels, ton, références, style. Tout doit sonner crédible.",
  },
  {
    title: "Contenu & image",
    tag: "Ciné · Street",
    desc: "Clips, photos, contenu réseaux : une ligne visuelle claire et répétable.",
  },
  {
    title: "Stratégie de sortie",
    tag: "Planning · Exécution",
    desc: "Calendrier, formats, objectifs. On garde le focus : sortir propre et progresser.",
  },
];

const steps = [
  { t: "1) Diagnostic", d: "Positionnement, plateformes, références. On cadre le vrai problème." },
  { t: "2) Plan & livrables", d: "Scope clair : formats, délais, budget, versions (YouTube + vertical)." },
  { t: "3) Production", d: "Tournage, montage, color, sound polish. Work propre, pas d’impro au hasard." },
  { t: "4) Delivery", d: "Exports optimisés + formats prêts à publier." },
];

export default function LabelPage() {
  return (
    <main className="min-h-[calc(100vh-var(--nav-h))]">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* background slideshow premium (public/work) */}
        <HeroCineSlider
          count={11}
          ext=".jpg"
          intervalMs={8000}
          darkness={0.56}
          vignette={0.52}
          glow={0.10}
          grain={0.10}
        />

        {/* aquarium overlays (pas noir sec) */}
        <div className="pointer-events-none absolute inset-0 backdrop-blur-[1.5px]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#061428]/35 via-[#020b1a]/22 to-[#020b1a]/45" />

        {/* floating glow */}
        <motion.div
          aria-hidden
          variants={glowPulse}
          initial="hidden"
          animate="show"
          className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/16 blur-3xl"
        />
        <motion.div
          aria-hidden
          variants={glowPulse}
          initial="hidden"
          animate="show"
          className="pointer-events-none absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-blue-400/14 blur-3xl"
        />

        <div className="relative max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={item} className={UI.pill}>
              <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-cyan-100">Label</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight drop-shadow-[0_12px_40px_rgba(0,180,255,0.18)]"
            >
              Un label qui{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-cyan-200 via-cyan-300 to-blue-200 bg-clip-text text-transparent">
                  comprend la rue
                </span>
                <span className="pointer-events-none absolute -inset-x-2 -inset-y-1 bg-cyan-300/12 blur-xl opacity-70" />
              </span>{" "}
              et livre du propre.
            </motion.h1>

            <motion.p variants={item} className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
              Black Jesus Records : développement d’artistes, image, contenu, direction artistique et stratégie.
              Pas de blabla — du rendu, du cadre, et une identité qui marque.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/contact" className={UI.btnPrimary}>
                <span className={UI.btnPrimaryGlow} />
                <span className="relative z-10">Proposer un artiste</span>
              </Link>
              <Link href="/portfolio" className={UI.btnSecondary}>
                Voir le portfolio
              </Link>
            </motion.div>

            <motion.div variants={item} className={UI.sep} />
          </motion.div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {pillars.map((p) => (
            <motion.div key={p.title} variants={item} className={UI.card}>
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold text-lg">{p.title}</p>
                <span className="text-white/55">→</span>
              </div>
              <p className="mt-2 text-sm text-white/65">{p.tag}</p>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">{p.desc}</p>

              <div className="mt-5 h-24 rounded-xl border border-white/10 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/14 via-blue-400/10 to-purple-400/10" />
                <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:22px_22px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000f1f]/45 to-transparent" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PROCESS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="rounded-2xl border border-white/10 bg-white/6 p-8 md:p-10 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,8,22,0.35)]"
        >
          <motion.div variants={item} className={UI.pill}>
            <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-cyan-100">Process</span>
          </motion.div>

          <motion.h2 variants={item} className="mt-4 text-2xl md:text-3xl font-bold text-white">
            Comment on travaille
          </motion.h2>
          <motion.p variants={item} className="mt-2 text-white/80 max-w-3xl leading-relaxed">
            On garde tout simple : cadre → production → livraison. Objectif : un rendu cohérent et publiable.
          </motion.p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {steps.map((s) => (
              <motion.div
                key={s.t}
                variants={item}
                className="rounded-2xl border border-white/10 bg-[#041224]/30 p-6 backdrop-blur-xl"
              >
                <p className="text-white font-semibold">{s.t}</p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={item} className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/booking" className={UI.btnPrimary}>
              <span className={UI.btnPrimaryGlow} />
              <span className="relative z-10">Réserver</span>
            </Link>
            <Link href="/services" className={UI.btnSecondary}>
              Voir les services
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
