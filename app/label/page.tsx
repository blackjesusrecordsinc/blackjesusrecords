"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import HeroCineSlider from "@/components/HeroCineSlider";

/* =========================
   Motion (ciné, discret)
========================= */
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const glowPulse: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

/* =========================
   UI (cohérent + maintenable)
========================= */
const styles = {
  pill:
    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full " +
    "bg-cyan-300/10 border border-cyan-300/25 backdrop-blur-md " +
    "shadow-[0_0_40px_rgba(0,180,255,0.12)]",

  card:
    "group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl " +
    "shadow-[0_18px_60px_rgba(0,8,22,0.35)] " +
    "transition-all duration-500 " +
    "hover:border-cyan-300/30 hover:bg-white/10 hover:scale-[1.02] " +
    "hover:shadow-[0_22px_72px_rgba(0,180,255,0.15)] " +
    "hover:[will-change:transform]",

  btnPrimary:
    "group relative inline-flex items-center justify-center px-8 py-4 " +
    "bg-cyan-300 text-[#001019] font-bold rounded-lg overflow-hidden " +
    "transition-all duration-300 " +
    "hover:scale-[1.03] active:scale-95 " +
    "shadow-[0_14px_52px_rgba(0,180,255,0.25)] " +
    "hover:[will-change:transform] " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 " +
    "focus-visible:ring-offset-4 focus-visible:ring-offset-[#020b1a]",

  btnPrimaryGlow:
    "absolute inset-0 bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 " +
    "opacity-0 group-hover:opacity-100 transition-opacity duration-300",

  btnSecondary:
    "inline-flex items-center justify-center px-8 py-4 border border-white/20 " +
    "text-white font-medium rounded-lg backdrop-blur-sm " +
    "transition-all duration-300 " +
    "hover:border-cyan-300/50 hover:bg-white/5 hover:text-cyan-50 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 " +
    "focus-visible:ring-offset-4 focus-visible:ring-offset-[#020b1a]",

  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent",
} as const;

/* =========================
   Content
========================= */
type Pillar = { title: string; tag: string; desc: string };
type Step = { t: string; d: string };

const PILLARS: Pillar[] = [
  {
    title: "Direction artistique",
    tag: "Identité · Cohérence",
    desc: "On définit un univers clair : références, ton, esthétique. L’objectif : une signature reconnaissable.",
  },
  {
    title: "Image & contenu",
    tag: "Ciné · Street",
    desc: "Clips, photos, formats réseaux : une ligne visuelle solide, pensée pour durer et se répéter sans s’user.",
  },
  {
    title: "Stratégie de sortie",
    tag: "Planning · Exécution",
    desc: "Calendrier, formats, objectifs. On avance avec méthode : publier propre, mesurer, ajuster, progresser.",
  },
];

const PROCESS_STEPS: Step[] = [
  { t: "1) Diagnostic", d: "Positionnement, références, plateformes. On clarifie le cap et le public." },
  { t: "2) Plan & livrables", d: "Scope verrouillé : formats, délais, budget, versions (YouTube + vertical)." },
  { t: "3) Production", d: "Tournage, montage, étalonnage, sound polish. Rendu propre, cohérence avant tout." },
  { t: "4) Delivery", d: "Exports optimisés, déclinaisons prêtes à publier, et une version master." },
];

export default function LabelPage() {
  return (
    <main className="min-h-screen bg-[#020b1a] overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <HeroCineSlider
          count={11}
          ext=".jpg"
          intervalMs={8000}
          darkness={0.6}
          vignette={0.55}
          glow={0.12}
          grain={0.12}
        />

        {/* Overlays atmosphériques (contraste stable + lisibilité texte) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 backdrop-blur-[1.5px]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#061428]/45 via-[#020b1a]/15 to-[#020b1a]/70"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#000a16]/55 via-transparent to-transparent"
        />

        {/* Glows dynamiques */}
        <motion.div
          aria-hidden
          variants={glowPulse}
          initial="hidden"
          animate="show"
          className="pointer-events-none absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[120px]"
        />
        <motion.div
          aria-hidden
          variants={glowPulse}
          initial="hidden"
          animate="show"
          className="pointer-events-none absolute -bottom-48 -right-24 h-[620px] w-[620px] rounded-full bg-blue-600/10 blur-[130px]"
        />

        <div className="relative max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
            <motion.div variants={fadeUp} className={styles.pill}>
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-cyan-50">
                Label Division
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-white"
            >
              Un label qui{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-cyan-100 via-cyan-300 to-blue-200 bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(0,180,255,0.25)]">
                  connaît le terrain
                </span>
                <span aria-hidden className="absolute -inset-x-4 -inset-y-2 bg-cyan-400/12 blur-2xl" />
              </span>{" "}
              — et qui livre.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-white/80 md:text-white/70 leading-relaxed max-w-2xl font-light"
            >
              Black Jesus Records accompagne des artistes qui veulent une identité forte et une exécution millimétrée.
              Développement, DA, production : tout est cadré pour la performance.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link href="/contact" className={styles.btnPrimary} aria-label="Proposer un artiste">
                <span aria-hidden className={styles.btnPrimaryGlow} />
                <span className="relative z-10">Proposer un artiste</span>
              </Link>

              <Link href="/portfolio" className={styles.btnSecondary} aria-label="Voir le portfolio">
                Voir le portfolio
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className={`${styles.sep} mt-12`} />
          </motion.div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {PILLARS.map((p) => (
            <motion.div key={p.title} variants={fadeUp} className={styles.card}>
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold text-lg">{p.title}</p>
                <span className="text-white/55">→</span>
              </div>

              <p className="mt-2 text-sm text-white/65">{p.tag}</p>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">{p.desc}</p>

              <div className="mt-5 h-24 rounded-xl border border-white/10 overflow-hidden relative">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-br from-cyan-300/14 via-blue-400/10 to-purple-400/10"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:22px_22px]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#000f1f]/45 to-transparent" />
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
          viewport={{ once: true, margin: "-10%" }}
          className="rounded-2xl border border-white/10 bg-white/6 p-8 md:p-10 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,8,22,0.35)]"
        >
          <motion.div variants={fadeUp} className={styles.pill}>
            <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-cyan-100">Process</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="mt-4 text-2xl md:text-3xl font-bold text-white">
            Comment on travaille
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-2 text-white/80 max-w-3xl leading-relaxed">
            On avance avec une méthode simple : cadrer, produire, livrer. L’objectif est toujours le même : une image
            cohérente, prête à publier, sans perte de temps.
          </motion.p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {PROCESS_STEPS.map((s) => (
              <motion.div
                key={s.t}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-[#041224]/30 p-6 backdrop-blur-xl transition-all duration-500 hover:border-cyan-300/20"
              >
                <p className="text-white font-semibold">{s.t}</p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/booking" className={styles.btnPrimary} aria-label="Réserver">
              <span aria-hidden className={styles.btnPrimaryGlow} />
              <span className="relative z-10">Réserver</span>
            </Link>

            <Link href="/services" className={styles.btnSecondary} aria-label="Voir les services">
              Voir les services
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* FINAL VISION / CTA AREA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="text-center space-y-6"
        >
          <motion.div variants={fadeUp} className={styles.sep} />

          <motion.h3 variants={fadeUp} className="text-2xl md:text-4xl font-bold text-white pt-12">
            On ne cherche pas le buzz. <br />
            <span className="text-white/45 italic">On construit des carrières.</span>
          </motion.h3>

          <motion.p
            variants={fadeUp}
            className="text-white/55 max-w-xl mx-auto text-sm md:text-base leading-relaxed"
          >
            Black Jesus Records est un collectif de passionnés au service de la vision. Si vous avez le talent et la
            rigueur, nous avons les outils.
          </motion.p>

          <motion.div variants={fadeUp} className="pt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-cyan-300 font-bold tracking-widest uppercase text-xs hover:text-cyan-200 transition-colors"
              aria-label="Démarrer un projet maintenant"
            >
              Démarrer un projet maintenant <span aria-hidden>—</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
