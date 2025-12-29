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
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
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
   UI (cohérent + maintenable)
========================= */
const styles = {
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
} as const;

/* =========================
   Content (éditorial premium)
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

        {/* overlays (aquarium, pas noir sec) */}
        <div className="pointer-events-none absolute inset-0 backdrop-blur-[1.5px]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#061428]/35 via-[#020b1a]/22 to-[#020b1a]/45" />

        {/* glows */}
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
            <motion.div variants={fadeUp} className={styles.pill}>
              <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-cyan-100">Label</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight drop-shadow-[0_12px_40px_rgba(0,180,255,0.18)]"
            >
              Un label qui{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-cyan-200 via-cyan-300 to-blue-200 bg-clip-text text-transparent">
                  connaît le terrain
                </span>
                <span className="pointer-events-none absolute -inset-x-2 -inset-y-1 bg-cyan-300/12 blur-xl opacity-70" />
              </span>{" "}
              — et qui livre.
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
              Black Jesus Records accompagne des artistes qui veulent une identité forte et une exécution propre :
              développement, direction artistique, production et stratégie de sortie. Ici, tout est cadré — du concept à la
              livraison.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/contact" className={styles.btnPrimary} aria-label="Proposer un artiste">
                <span className={styles.btnPrimaryGlow} />
                <span className="relative z-10">Proposer un artiste</span>
              </Link>
              <Link href="/portfolio" className={styles.btnSecondary} aria-label="Voir le portfolio">
                Voir le portfolio
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className={styles.sep} />
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
          {PILLARS.map((p) => (
            <motion.div key={p.title} variants={fadeUp} className={styles.card}>
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
                className="rounded-2xl border border-white/10 bg-[#041224]/30 p-6 backdrop-blur-xl"
              >
                <p className="text-white font-semibold">{s.t}</p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/booking" className={styles.btnPrimary} aria-label="Réserver">
              <span className={styles.btnPrimaryGlow} />
              <span className="relative z-10">Réserver</span>
            </Link>
            <Link href="/services" className={styles.btnSecondary} aria-label="Voir les services">
              Voir les services
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
