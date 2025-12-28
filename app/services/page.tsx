"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type Service = {
  slug: string;
  title: string;
  tag: string;
  desc: string;
};

const SERVICES: Service[] = [
  {
    slug: "production-video",
    title: "Production vidéo",
    tag: "Réalisation · Ciné",
    desc: "Clips, pubs, corporate, événements. Image stable, lumière maîtrisée, rendu premium.",
  },
  {
    slug: "shooting-photo",
    title: "Shooting photo",
    tag: "Portrait · Editorial",
    desc: "Portrait, corporate, food, lifestyle. Direction claire, retouches propres, livraison web & print.",
  },
  {
    slug: "post-production",
    title: "Post-production",
    tag: "Montage · Color",
    desc: "Montage, étalonnage, sound polish. Un workflow propre, des exports prêts à publier.",
  },
  {
    slug: "reseaux-sociaux",
    title: "Réseaux sociaux",
    tag: "Reels · TikTok",
    desc: "Formats courts qui performent : rythme, hooks, cohérence visuelle, production régulière.",
  },
  {
    slug: "site-web",
    title: "Site web",
    tag: "Design · Tech",
    desc: "Pages, optimisations, corrections et évolutions. Un site solide, rapide, et cohérent avec ton image.",
  },
  {
    slug: "strategie",
    title: "Stratégie / croissance",
    tag: "Offres · Branding",
    desc: "Positionnement, offres, contenus, planning. Objectif : image claire + résultats concrets.",
  },
];

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

const UI = {
  pill:
    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20",
  card:
    "rounded-2xl border border-white/10 bg-white/5 p-6 " +
    "shadow-[0_18px_50px_rgba(0,0,0,0.25)] hover:border-yellow-400/35 transition",
  btnPrimary:
    "group relative px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg overflow-hidden transition-all " +
    "hover:scale-[1.02] active:scale-95 shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
  btnPrimaryGlow:
    "absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity",
  btnSecondary:
    "px-8 py-4 border border-white/20 text-white font-medium rounded-lg hover:border-yellow-400 hover:text-yellow-400 transition-all",
  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* HEADER (style Home) */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={item} className={UI.pill}>
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-yellow-400">
              Services — Black Jesus Records
            </span>
          </motion.div>

          <motion.div variants={item}>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              Une offre claire.{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                  Une exécution propre.
                </span>
                <span className="pointer-events-none absolute -inset-x-2 -inset-y-1 bg-yellow-400/10 blur-xl opacity-70" />
              </span>
            </h1>
          </motion.div>

          <motion.p variants={item} className="text-base md:text-lg text-white/70 leading-relaxed max-w-3xl">
            Du tournage à la livraison : on cadre le scope, on produit, on livre des formats prêts à publier
            (YouTube / Reels / TikTok). Même direction artistique, même standard premium.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link href="/booking" className={UI.btnPrimary}>
              <span className={UI.btnPrimaryGlow} />
              <span className="relative z-10">Réserver une date</span>
            </Link>
            <Link href="/contact" className={UI.btnSecondary}>
              Parler de votre projet
            </Link>
          </motion.div>

          <motion.div variants={item} className={UI.sep} />
        </motion.div>
      </section>

      {/* GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="grid gap-6 md:grid-cols-2"
        >
          {SERVICES.map((s) => (
            <motion.div key={s.slug} variants={item}>
              <Link href={`/services/${s.slug}`} className="block group">
                <div className={UI.card}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-white font-semibold text-lg">{s.title}</p>
                    <span className="text-white/50 group-hover:text-yellow-400 transition">→</span>
                  </div>

                  <p className="mt-2 text-sm text-white/60">{s.tag}</p>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">{s.desc}</p>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="mt-5 h-24 rounded-xl border border-white/10 overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/14 via-purple-500/10 to-pink-500/10" />
                    <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:22px_22px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  </motion.div>

                  <p className="mt-5 text-xs text-white/55">
                    Détails, livrables et process →{" "}
                    <span className="text-yellow-400/90 font-medium">voir la page</span>
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA FINAL */}
        <div className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
            <p className="text-2xl md:text-3xl font-bold text-white">On te cadre un plan clair.</p>
            <p className="mt-2 text-white/70 leading-relaxed max-w-3xl">
              Tu nous dis l’objectif + la plateforme finale. On revient avec un scope, des livrables, un délai.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/booking" className={UI.btnPrimary}>
                <span className={UI.btnPrimaryGlow} />
                <span className="relative z-10">Réserver</span>
              </Link>
              <Link href="/contact" className={UI.btnSecondary}>
                Envoyer un message
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
