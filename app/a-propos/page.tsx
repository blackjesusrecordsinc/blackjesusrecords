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
    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20",
  card:
    "rounded-2xl border border-white/10 bg-white/5 p-6 " +
    "shadow-[0_18px_50px_rgba(0,0,0,0.25)] hover:border-yellow-400/35 transition",
  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",
  btnPrimary:
    "group relative px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg overflow-hidden transition-all " +
    "hover:scale-[1.02] active:scale-95 shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
  btnPrimaryGlow:
    "absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity",
  btnSecondary:
    "px-8 py-4 border border-white/20 text-white font-medium rounded-lg hover:border-yellow-400 hover:text-yellow-400 transition-all",
};

const proof = [
  { value: "Label + studio", label: "Une seule équipe : image, son, stratégie" },
  { value: "Rendu ciné", label: "Direction artistique + exécution propre" },
  { value: "Formats prêts", label: "Exports optimisés YouTube / Reels / TikTok" },
];

const cards = [
  {
    title: "Studio",
    tag: "Image · Son · Post-prod",
    desc: "Tournage, lumière, montage, étalonnage, sound polish : un workflow rapide, stable et pro.",
  },
  {
    title: "Label",
    tag: "Développement",
    desc: "Identité visuelle, contenus, stratégie de sortie : on construit un univers crédible et durable.",
  },
  {
    title: "Delivery",
    tag: "Ready-to-post",
    desc: "Formats (16:9 / 9:16), titres safe, exports propres : livré prêt à publier, sans friction.",
  },
];

const approach = [
  { t: "Cadre clair", d: "On clarifie le scope, les livrables, les délais. Pas de zone grise." },
  { t: "Direction", d: "Références, intention, rythme, style : une cohérence visuelle du début à la fin." },
  { t: "Exécution", d: "Production + post-production propres, optimisées pour la plateforme finale." },
  { t: "Livraison", d: "Exports propres + versions utiles (YouTube + vertical) + rendu publiable." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* HERO (comme Home) */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden scroll-mt-28">
        {/* ✅ background identique (public/work) */}
        <HeroCineSlider count={11} ext=".jpg" intervalMs={8000} />

        {/* glows */}
        <motion.div
          aria-hidden
          variants={glowPulse}
          initial="hidden"
          animate="show"
          className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-yellow-400/10 blur-3xl"
        />
        <motion.div
          aria-hidden
          variants={glowPulse}
          initial="hidden"
          animate="show"
          className="pointer-events-none absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"
        />

        <div className="relative max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={item} className={UI.pill}>
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-yellow-400">À propos</span>
            </motion.div>

            <motion.h1 variants={item} className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              Une équipe{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                  créative
                </span>
                <span className="pointer-events-none absolute -inset-x-2 -inset-y-1 bg-yellow-400/10 blur-xl opacity-70" />
              </span>{" "}
              pensée pour livrer.
            </motion.h1>

            <motion.p variants={item} className="text-base md:text-lg text-white/70 leading-relaxed max-w-3xl">
              Black Jesus Records est un <strong>studio créatif</strong> & <strong>label</strong> basé à Lévis (Québec).
              Notre focus : une image forte, une exécution propre et des livrables optimisés pour YouTube et les réseaux.
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

      {/* PREUVE (comme Home) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 scroll-mt-28">
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
              <p className="mt-2 text-white/70 text-sm leading-relaxed">{p.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="mt-8 rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-6 md:p-8"
        >
          <p className="text-white/90 italic text-base md:text-lg leading-relaxed">
            “On veut du solide : une direction claire, un rendu propre, et une livraison dans les délais.”
          </p>
          <p className="mt-3 text-sm text-white/60">— Black Jesus Records</p>
        </motion.div>
      </section>

      {/* CARDS (Studio / Label / Delivery) */}
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
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{c.desc}</p>

              <div className="mt-5 h-24 rounded-xl border border-white/10 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/14 via-purple-500/10 to-pink-500/10" />
                <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:22px_22px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
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
          className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
        >
          <motion.div variants={item} className={UI.pill}>
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-yellow-400">Direction</span>
          </motion.div>

          <motion.h2 variants={item} className="mt-4 text-2xl md:text-3xl font-bold text-white">
            Emmanuel Ramazani Kibanda
          </motion.h2>

          <motion.p variants={item} className="mt-2 text-white/70 max-w-3xl leading-relaxed">
            Fondateur de Black Jesus Records. Réalisation, direction artistique et production.
            Objectif : livrer une qualité premium, sans blabla, avec une identité qui marque.
          </motion.p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {approach.map((a) => (
              <motion.div key={a.t} variants={item} className="rounded-2xl border border-white/10 bg-black/20 p-6">
                <p className="text-white font-semibold">{a.t}</p>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{a.d}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={item} className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className={UI.btnSecondary}>
              Contact
            </Link>
            <Link href="/services" className={UI.btnSecondary}>
              Services
            </Link>
            <Link href="/booking" className={UI.btnPrimary}>
              <span className={UI.btnPrimaryGlow} />
              <span className="relative z-10">Réserver une date</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA FINAL (comme Home) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 scroll-mt-28">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
        >
          <motion.div variants={item} className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">
                Prêt à faire passer ton image au niveau supérieur ?
              </p>
              <p className="mt-2 text-white/70 leading-relaxed">
                Dis-nous ton objectif. On te répond avec une approche claire, un plan, et un rendu ciné.
              </p>
              <p className="mt-3 text-sm text-white/55">Réponse rapide · Plan clair · Livraison propre</p>
            </div>

            <div className="flex gap-3">
              <Link href="/booking" className={UI.btnPrimary}>
                <span className={UI.btnPrimaryGlow} />
                <span className="relative z-10">Réserver</span>
              </Link>
              <Link href="/contact" className={UI.btnSecondary}>
                Contact
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
