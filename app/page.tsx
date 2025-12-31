"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroCineSlider from "@/components/HeroCineSlider";

/* ================= ANIMATION ================= */
const fade = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ================= PAGE ================= */
export default function HomePage() {
  return (
    <main className="readable relative min-h-screen text-white overflow-hidden">
      {/* ================= BACKGROUND GLOBAL =================
          Vivant, lent, imperceptible
      */}
      <div className="fixed inset-0 -z-10">
        <HeroCineSlider count={14} intervalMs={9000} />
      </div>

      {/* ================= HERO ================= */}
      <section
        id="top"
        className="relative min-h-[95vh] flex items-center"
      >
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

            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
            >
              <h1 className="text-4xl md:text-6xl font-semibold">
                Black Jesus Records
              </h1>

              <p className="mt-3 text-white/80">
                Studio créatif & label indépendant
              </p>

              <p className="mt-2 text-white/60">
                Image · Son · Stratégie
              </p>
            </motion.div>

            <motion.p
              variants={fade}
              initial="hidden"
              animate="show"
              className="max-w-xl text-white/75 leading-relaxed"
            >
              Pour les artistes, marques et entreprises qui veulent une présence numérique forte.
            </motion.p>
          </div>

          {/* ===== PHOTO DROITE (VISIBLE, NON VOILÉE) ===== */}
          <div className="relative h-[520px] rounded-xl overflow-hidden">
            <Image
              src="/black-jesus-records-hero.jpg"
              alt="Black Jesus Records"
              fill
              priority
              className="object-cover object-center"
            />

            <div className="absolute bottom-6 left-6 right-6 text-sm text-white/80 italic">
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
          className="relative px-10 py-5 rounded-full border border-white/40 text-white text-lg"
        >
          <motion.span
            animate={{ opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-white/10"
          />
          <span className="relative z-10">
            Planifier un appel
          </span>
        </Link>
      </section>

      {/* ================= PROJETS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-2xl mb-12">Projets</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-white/10 rounded-lg"
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
          className="underline underline-offset-8 text-white/80 hover:text-white"
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
