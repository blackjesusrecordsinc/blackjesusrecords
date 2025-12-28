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
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
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
    "rounded-2xl border border-white/10 bg-white/6 p-6 " +
    "shadow-[0_18px_60px_rgba(0,8,22,0.35)] backdrop-blur-xl hover:border-cyan-300/25 transition",
  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",
  btnPrimary:
    "group relative px-8 py-4 bg-cyan-300 text-[#001019] font-semibold rounded-lg overflow-hidden transition-all " +
    "hover:scale-[1.02] active:scale-95 shadow-[0_14px_52px_rgba(0,8,22,0.45)]",
  btnPrimaryGlow:
    "absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity",
  btnSecondary:
    "px-8 py-4 border border-white/20 text-white font-medium rounded-lg " +
    "hover:border-cyan-300 hover:text-cyan-100 transition-all",
};

const proof = [
  { value: "Label + studio", label: "Une seule équipe : image, son, stratégie" },
  { value: "Rendu ciné", label: "Direction artistique + exécution propre" },
  { value: "Formats prêts", label: "Exports optimisés YouTube / Reels / TikTok" },
];

const cards = [
  { title: "Studio", tag: "Image · Son · Post-prod", desc: "Tournage, lumière, montage, étalonnage, sound polish : un workflow rapide, stable et pro." },
  { title: "Label", tag: "Développement", desc: "Identité visuelle, contenus, stratégie de sortie : on construit un univers crédible et durable." },
  { title: "Delivery", tag: "Ready-to-post", desc: "Formats (16:9 / 9:16), exports propres : livré prêt à publier, sans friction." },
];

const approach = [
  { t: "Cadre clair", d: "On clarifie le scope, les livrables, les délais. Pas de zone grise." },
  { t: "Direction", d: "Références, intention, rythme, style : cohérence visuelle du début à la fin." },
  { t: "Exécution", d: "Production + post-production propres, optimisées pour la plateforme finale." },
  { t: "Livraison", d: "Exports propres + versions utiles (YouTube + vertical) + rendu publiable." },
];

export default function AboutPage() {
  return (
    <main className="min-h-[calc(100vh-var(--nav-h))]">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <HeroCineSlider
          count={11}
          ext=".jpg"
          intervalMs={8000}
          darkness={0.56}
          vignette={0.52}
          glow={0.10}
          grain={0.10}
        />

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

        {/* voile léger (pas trop) */}
        <div className="pointer-events-none absolute inset-0 backdrop-blur-[1.5px]" />

        <div className="relative max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={item} className={UI.pill}>
              <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-cyan-100">À propos</span>
            </motion.div>

            <motion.h1 variants={item} className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              Une équipe{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-cyan-200 via-cyan-300 to-blue-200 bg-clip-text text-transparent">
                  créative
                </span>
                <span className="pointer-events-none absolute -inset-x-2 -inset-y-1 bg-cyan-300/12 blur-xl opacity-70" />
              </span>{" "}
              pensée pour livrer.
            </motion.h1>

            <motion.p variants={item} className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
              Black Jesus Records est un <strong>studio créatif</strong> & <strong>label</strong> basé à Lévis (Québec).
              Notre focus : image forte, exécution propre, livrables optimisés YouTube & réseaux.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/booking" className={UI.btnPrimary}>
                <span className={UI.btnPrimaryGlow} />
                <span className="relative z-10">Réserver</span>
              </Link>
              <Link href="/portfolio" className={UI.btnSecondary}>
                Voir le portfolio
              </Link>
            </motion.div>

            <motion.div variants={item} className={UI.sep} />
          </motion.div>
        </div>
      </section>

      {/* PREUVE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {proof.map((p) => (
            <motion.div key={p.value} variants={item} className={UI.card}>
              <p className="text-3xl font-bold text-white">{p.value}</p>
              <p className="mt-2 text-white/75 text-sm leading-relaxed">{p.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="mt-8 rounded-2xl border border-cyan-300/25 bg-cyan-300/10 p-6 md:p-8 backdrop-blur-xl"
        >
          <p className="text-white/90 italic text-base md:text-lg leading-relaxed">
            “Direction claire. Rendu propre. Livraison dans les délais.”
          </p>
          <p className="mt-3 text-sm text-white/60">— Black Jesus Records</p>
        </motion.div>
      </section>

      {/* CARDS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {cards.map((c) => (
            <motion.div key={c.title} variants={item} className={UI.card}>
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold text-lg">{c.title}</p>
                <span className="text-white/50">→</span>
              </div>
              <p className="mt-2 text-sm text-white/60">{c.tag}</p>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">{c.desc}</p>

              <div className="mt-5 h-24 rounded-xl border border-white/10 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/14 via-blue-400/10 to-purple-500/10" />
                <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:22px_22px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b1a]/40 to-transparent" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FOUNDER + APPROCHE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="rounded-2xl border border-white/10 bg-white/6 p-8 md:p-10 shadow-[0_18px_60px_rgba(0,8,22,0.35)] backdrop-blur-xl"
        >
          <motion.div variants={item} className={UI.pill}>
            <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-cyan-100">Direction</span>
          </motion.div>

          <motion.h2 variants={item} className="mt-4 text-2xl md:text-3xl font-bold text-white">
            Emmanuel Ramazani Kibanda
          </motion.h2>

          <motion.p variants={item} className="mt-2 text-white/80 max-w-3xl leading-relaxed">
            Fondateur de Black Jesus Records. Réalisation, direction artistique et production.
            Objectif : qualité premium, identité forte, livraison propre.
          </motion.p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {approach.map((a) => (
              <motion.div key={a.t} variants={item} className="rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
                <p className="text-white font-semibold">{a.t}</p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">{a.d}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={item} className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className={UI.btnSecondary}>Contact</Link>
            <Link href="/services" className={UI.btnSecondary}>Services</Link>
            <Link href="/booking" className={UI.btnPrimary}>
              <span className={UI.btnPrimaryGlow} />
              <span className="relative z-10">Réserver une date</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }}>
          <motion.div
            variants={item}
            className="rounded-2xl border border-white/10 bg-white/6 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_18px_60px_rgba(0,8,22,0.35)] backdrop-blur-xl"
          >
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">Prêt à faire passer ton image au niveau supérieur ?</p>
              <p className="mt-2 text-white/80 leading-relaxed">Dis-nous ton objectif. On répond avec un cadre clair et un rendu ciné.</p>
              <p className="mt-3 text-sm text-white/55">Réponse rapide · Plan clair · Livraison propre</p>
            </div>

            <div className="flex gap-3">
              <Link href="/booking" className={UI.btnPrimary}>
                <span className={UI.btnPrimaryGlow} />
                <span className="relative z-10">Réserver</span>
              </Link>
              <Link href="/contact" className={UI.btnSecondary}>Contact</Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
