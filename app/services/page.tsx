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
    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full " +
    "bg-cyan-300/10 border border-cyan-300/20 " +
    "shadow-[0_0_40px_rgba(0,180,255,0.12)]",
  card:
    "rounded-2xl border border-white/10 bg-white/6 p-6 " +
    "shadow-[0_18px_55px_rgba(0,8,22,0.35)] " +
    "hover:border-cyan-300/35 hover:bg-white/8 transition",
  btnPrimary:
    "group relative px-8 py-4 bg-cyan-300 text-[#001019] font-semibold rounded-lg overflow-hidden transition-all " +
    "hover:scale-[1.02] active:scale-95 shadow-[0_14px_50px_rgba(0,8,22,0.45)]",
  btnPrimaryGlow:
    "absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity",
  btnSecondary:
    "px-8 py-4 border border-white/20 text-white font-medium rounded-lg " +
    "hover:border-cyan-300 hover:text-cyan-200 transition-all",
  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",
  titleGlow:
    "drop-shadow-[0_10px_40px_rgba(0,180,255,0.25)]",
};

export default function ServicesPage() {
  return (
    <div className="min-h-[calc(100vh-var(--nav-h))]">
      {/* HEADER */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* light blobs (aquarium) */}
        <div className="pointer-events-none absolute -top-12 left-[-10%] h-[360px] w-[360px] rounded-full blur-3xl opacity-25 bg-cyan-300/40" />
        <div className="pointer-events-none absolute top-28 right-[-12%] h-[420px] w-[420px] rounded-full blur-3xl opacity-20 bg-blue-400/40" />

        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={item} className={UI.pill}>
            <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-cyan-200">
              Services — Black Jesus Records
            </span>
          </motion.div>

          <motion.div variants={item}>
            <h1 className={`text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight ${UI.titleGlow}`}>
              Une offre claire.{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-cyan-200 via-cyan-300 to-blue-200 bg-clip-text text-transparent">
                  Une exécution propre.
                </span>
                <span className="pointer-events-none absolute -inset-x-2 -inset-y-1 bg-cyan-300/12 blur-xl opacity-70" />
              </span>
            </h1>
          </motion.div>

          <motion.p variants={item} className="text-base md:text-lg text-white/75 leading-relaxed max-w-3xl">
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
                    <span className="text-white/55 group-hover:text-cyan-200 transition">→</span>
                  </div>

                  <p className="mt-2 text-sm text-white/65">{s.tag}</p>
                  <p className="mt-3 text-sm text-white/75 leading-relaxed">{s.desc}</p>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="mt-5 h-24 rounded-xl border border-white/10 overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/14 via-blue-400/10 to-purple-400/10" />
                    <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:22px_22px]" />
                    {/* fade bas -> haut sans noir */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000f1f]/45 to-transparent" />
                  </motion.div>

                  <p className="mt-5 text-xs text-white/60">
                    Détails, livrables et process →{" "}
                    <span className="text-cyan-200 font-medium">voir la page</span>
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA FINAL */}
        <div className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/6 p-8 md:p-10 shadow-[0_18px_55px_rgba(0,8,22,0.35)]">
            <p className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_10px_40px_rgba(0,180,255,0.18)]">
              On te cadre un plan clair.
            </p>
            <p className="mt-2 text-white/75 leading-relaxed max-w-3xl">
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
    </div>
  );
}
