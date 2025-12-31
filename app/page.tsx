"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import HeroCineSlider from "@/components/HeroCineSlider";

/* ================= ANIMATION ================= */
const fade: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function HomePage() {
  return (
    <main className="readable relative min-h-screen text-white overflow-hidden">
      {/* ================= BACKGROUND GLOBAL =================
          Vivant, lent, IMPERCEPTIBLE (crossfade interne du slider)
      */}
      <div className="fixed inset-0 -z-10">
        <HeroCineSlider
          count={14}
          intervalMs={9000}
          fadeSeconds={2.2}
          darkness={0.62}
          vignette={0.5}
          glow={0.06}
          grain={0.05}
          showDots={false}
        />
      </div>

      {/* ================= HERO ================= */}
      <section id="top" className="relative min-h-[95vh] flex items-center">
        {/* Overlay lisibilité globale (léger) */}
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* ===== TEXTE ===== */}
          <div className="space-y-8">
            {/* SLOGAN — début seulement */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 6, times: [0, 0.2, 0.7, 1] }}
              className="text-sm uppercase tracking-[0.35em] text-white/70"
            >
              On élève ce qui vient d’ici.
            </motion.p>

            <motion.div variants={fade} initial="hidden" animate="show">
              <h1 className="text-4xl md:text-6xl font-semibold">
                Black Jesus Records
              </h1>

              <p className="mt-3 text-white/80">
                Studio créatif & label indépendant
              </p>

              <p className="mt-2 text-white/60">Image · Son · Stratégie</p>
            </motion.div>

            <motion.p
              variants={fade}
              initial="hidden"
              animate="show"
              className="max-w-xl text-white/75 leading-relaxed"
            >
              Pour les artistes, marques et entreprises qui veulent une présence
              numérique forte.
            </motion.p>
          </div>

          {/* ===== PHOTO DROITE (VISIBLE + garde le background derrière) ===== */}
          <div className="relative h-[520px] rounded-2xl overflow-hidden border border-white/10 bg-black/10 backdrop-blur-[1px]">
            <Image
              src="/black-jesus-records-hero.jpg"
              alt="Black Jesus Records"
              fill
              priority
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover object-center"
            />

            {/* voile très léger pour lisibilité du texte, sans “cacher” la photo */}
            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute bottom-6 left-6 right-6 text-sm text-white/85 italic drop-shadow">
              “De l’idée à la réalisation.”
            </div>
          </div>
        </div>
      </section>

      {/* ================= RESPIRATION ================= */}
      <section className="h-[18vh]" />

      {/* ================= CTA CENTRAL UNIQUE ================= */}
      <section className="flex justify-center py-24">
        <Link
          href="/planifier-un-appel"
          className="relative px-10 py-5 rounded-full border border-white/35 text-white text-lg bg-white/5 backdrop-blur-md hover:bg-white/10 transition"
        >
          <motion.span
            aria-hidden
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-white/10"
          />
          <span className="relative z-10">Planifier un appel</span>
        </Link>
      </section>

      {/* ================= PROJETS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-2xl mb-12">Projets</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md"
            />
          ))}
        </div>
      </section>

      {/* ================= SAVOIR-FAIRE ================= */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-2xl mb-16">Savoir-faire</h2>

        <div className="space-y-10">
          <Card title="Réalisation & production vidéo" />
          <Card title="Audio & son" />
          <Card title="Web & stratégie digitale" />
        </div>
      </section>

      {/* ================= TEXTE ÉDITORIAL ================= */}
      <section className="max-w-3xl mx-auto px-6 py-32 text-white/75 leading-relaxed">
        Black Jesus Records conçoit des images et des sons avec exigence,
        intention et cohérence. Pas de bruit inutile. Pas de promesse vide.
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="flex justify-center py-32">
        <Link
          href="/debuter-un-projet"
          className="underline underline-offset-8 text-white/80 hover:text-white transition"
        >
          Débuter un projet
        </Link>
      </section>
    </main>
  );
}

/* ================= CARD ================= */
function Card({ title }: { title: string }) {
  return (
    <div className="border-b border-white/20 pb-6">
      <h3 className="text-lg">{title}</h3>
    </div>
  );
}
