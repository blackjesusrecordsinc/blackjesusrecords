"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import HeroCineSlider from "@/components/HeroCineSlider";

/* =========================
   Animations (unchanged behavior)
========================= */
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

/* =========================
   UI tokens (same look)
========================= */
const styles = {
  pill:
    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full " +
    "bg-cyan-300/10 border border-cyan-300/25 shadow-[0_0_40px_rgba(0,180,255,0.12)]",

  // ✅ micro-interactions premium
  card:
    "rounded-2xl border border-white/10 bg-white/6 p-6 " +
    "shadow-[0_18px_60px_rgba(0,8,22,0.35)] backdrop-blur-xl " +
    "hover:border-cyan-300/25 hover:scale-[1.01] hover:shadow-[0_24px_80px_rgba(0,180,255,0.10)] " +
    "transition-all duration-500",

  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",

  btnPrimary:
    "group relative px-8 py-4 bg-cyan-300 text-[#001019] font-semibold rounded-lg overflow-hidden transition-all " +
    "hover:scale-[1.02] active:scale-95 shadow-[0_14px_52px_rgba(0,8,22,0.45)]",

  btnPrimaryGlowOverlay:
    "absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity",

  btnSecondary:
    "px-8 py-4 border border-white/20 text-white font-medium rounded-lg " +
    "hover:border-cyan-300 hover:text-cyan-100 transition-all",
};

/* =========================
   Types (explicit)
========================= */
type ProofPoint = {
  value: string;
  label: string;
};

type FeatureCard = {
  title: string;
  tag: string;
  description: string;
};

type ApproachStep = {
  title: string;
  description: string;
};

/* =========================
   Content
========================= */
const proofPoints: ProofPoint[] = [
  { value: "Label + studio", label: "Une seule équipe : image, son, stratégie" },
  { value: "Rendu ciné", label: "Direction artistique + exécution propre" },
  { value: "Formats prêts", label: "Exports optimisés YouTube / Reels / TikTok" },
];

const featureCards: FeatureCard[] = [
  {
    title: "Studio",
    tag: "Image · Son · Post-prod",
    description:
      "Tournage, lumière, montage, étalonnage, sound polish : un workflow rapide, stable et pro.",
  },
  {
    title: "Label",
    tag: "Développement",
    description:
      "Identité visuelle, contenus, stratégie de sortie : on construit un univers crédible et durable.",
  },
  {
    title: "Delivery",
    tag: "Ready-to-post",
    description:
      "Formats (16:9 / 9:16), exports propres : livré prêt à publier, sans friction.",
  },
];

const approachSteps: ApproachStep[] = [
  { title: "Cadre clair", description: "On clarifie le scope, les livrables, les délais. Pas de zone grise." },
  { title: "Direction", description: "Références, intention, rythme, style : cohérence visuelle du début à la fin." },
  { title: "Exécution", description: "Production + post-production propres, optimisées pour la plateforme finale." },
  { title: "Livraison", description: "Exports propres + versions utiles (YouTube + vertical) + rendu publiable." },
];

/* =========================
   Small UI pieces
========================= */
function Pill({ label }: { label: string }) {
  return (
    <motion.div variants={item} className={styles.pill}>
      <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
      <span className="text-xs uppercase tracking-widest text-cyan-100">{label}</span>
    </motion.div>
  );
}

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={styles.btnPrimary}>
      <span className={styles.btnPrimaryGlowOverlay} />
      <span className="relative z-10">{children}</span>
    </Link>
  );
}

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={styles.btnSecondary}>
      {children}
    </Link>
  );
}

/* =========================
   Sections
========================= */
function HeroSection() {
  return (
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

      {/* ✅ gradient sombre bas (contraste garanti sur toutes les images) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]
                   bg-gradient-to-t from-[#020814]/85 via-[#020814]/35 to-transparent"
      />

      <div className="relative max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
        {/* ✅ scrim derrière le contenu (option ultra-safe) */}
        <div className="inline-block rounded-3xl border border-white/10 bg-[#020814]/35 p-6 md:p-8 backdrop-blur-xl">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <Pill label="À propos" />

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
              <PrimaryButton href="/booking">Réserver</PrimaryButton>
              <SecondaryButton href="/portfolio">Voir le portfolio</SecondaryButton>
            </motion.div>

            <motion.div variants={item} className={styles.sep} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProofSection({ points }: { points: ProofPoint[] }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* ✅ SEO / a11y */}
      <h2 className="sr-only">Points forts</h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }} // ✅ responsive
        className="grid gap-6 md:grid-cols-3"
      >
        {points.map((p) => (
          <motion.div key={p.value} variants={item} className={styles.card}>
            <p className="text-3xl font-bold text-white">{p.value}</p>
            <p className="mt-2 text-white/75 text-sm leading-relaxed">{p.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }} // ✅ responsive
        className="mt-8 rounded-2xl border border-cyan-300/25 bg-cyan-300/10 p-6 md:p-8 backdrop-blur-xl"
      >
        <p className="text-white/90 italic text-base md:text-lg leading-relaxed">
          “Direction claire. Rendu propre. Livraison dans les délais.”
        </p>
        <p className="mt-3 text-sm text-white/60">— Black Jesus Records</p>
      </motion.div>
    </section>
  );
}

function CardsSection({ cards }: { cards: FeatureCard[] }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* ✅ SEO / a11y */}
      <h2 className="sr-only">Studio, label et livraison</h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }} // ✅ responsive
        className="grid gap-6 md:grid-cols-3"
      >
        {cards.map((c) => (
          <motion.div key={c.title} variants={item} className={styles.card}>
            <div className="flex items-center justify-between">
              <p className="text-white font-semibold text-lg">{c.title}</p>
              <span className="text-white/50">→</span>
            </div>
            <p className="mt-2 text-sm text-white/60">{c.tag}</p>
            <p className="mt-3 text-sm text-white/75 leading-relaxed">{c.description}</p>

            <div className="mt-5 h-24 rounded-xl border border-white/10 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/14 via-blue-400/10 to-purple-500/10" />
              <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:22px_22px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020b1a]/40 to-transparent" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ✅ suggestion visuelle: synergie "image + son" sans assets */}
      <motion.div
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        className="mt-10 rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl"
      >
        <p className="text-white/80 text-sm uppercase tracking-widest">Workflow</p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/75">
          <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">Pré-prod</span>
          <span className="text-white/30">→</span>
          <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">Tournage</span>
          <span className="text-white/30">→</span>
          <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">Montage</span>
          <span className="text-white/30">→</span>
          <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">Étalonnage</span>
          <span className="text-white/30">→</span>
          <span className="px-3 py-1 rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
            Sound polish
          </span>
          <span className="text-white/30">→</span>
          <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">Exports</span>
        </div>
      </motion.div>
    </section>
  );
}

function FounderSection({ steps }: { steps: ApproachStep[] }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }} // ✅ responsive
        className="rounded-2xl border border-white/10 bg-white/6 p-8 md:p-10 shadow-[0_18px_60px_rgba(0,8,22,0.35)] backdrop-blur-xl"
      >
        <Pill label="Direction" />

        <motion.h2 variants={item} className="mt-4 text-2xl md:text-3xl font-bold text-white">
          Emmanuel Ramazani Kibanda
        </motion.h2>

        <motion.p variants={item} className="mt-2 text-white/80 max-w-3xl leading-relaxed">
          Fondateur de Black Jesus Records. Réalisation, direction artistique et production. Objectif : qualité premium,
          identité forte, livraison propre.
        </motion.p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {steps.map((s) => (
            <motion.div
              key={s.title}
              variants={item}
              className="rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl"
            >
              <p className="text-white font-semibold">{s.title}</p>
              <p className="mt-2 text-sm text-white/75 leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} className="mt-8 flex flex-col sm:flex-row gap-3">
          <SecondaryButton href="/contact">Contact</SecondaryButton>
          <SecondaryButton href="/services">Services</SecondaryButton>
          <PrimaryButton href="/booking">Réserver une date</PrimaryButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      {/* ✅ SEO / a11y */}
      <h2 className="sr-only">Appel à l’action</h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }} // ✅ responsive
      >
        <motion.div
          variants={item}
          className="rounded-2xl border border-white/10 bg-white/6 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_18px_60px_rgba(0,8,22,0.35)] backdrop-blur-xl"
        >
          <div>
            <p className="text-2xl md:text-3xl font-bold text-white">
              Prêt à faire passer ton image au niveau supérieur ?
            </p>
            <p className="mt-2 text-white/80 leading-relaxed">
              Dis-nous ton objectif. On répond avec un cadre clair et un rendu ciné.
            </p>
            <p className="mt-3 text-sm text-white/55">Réponse rapide · Plan clair · Livraison propre</p>
          </div>

          <div className="flex gap-3">
            <PrimaryButton href="/booking">Réserver</PrimaryButton>
            <SecondaryButton href="/contact">Contact</SecondaryButton>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* =========================
   Page
========================= */
export default function AboutPage() {
  return (
    <main className="min-h-[calc(100vh-var(--nav-h))]">
      <HeroSection />
      <ProofSection points={proofPoints} />
      <CardsSection cards={featureCards} />
      <FounderSection steps={approachSteps} />
      <FinalCTASection />
    </main>
  );
}
