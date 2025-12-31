"use client";

import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export default function SavoirFairePage() {
  return (
    <main className="readable min-h-screen text-white">
      {/* INTRO */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <motion.h1
          variants={fade}
          initial="hidden"
          animate="show"
          className="text-3xl md:text-4xl font-semibold"
        >
          Savoir-faire
        </motion.h1>

        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-2xl text-white/65 leading-relaxed"
        >
          Un ensemble de pratiques centrées sur la précision, la cohérence
          et une narration calme.
        </motion.p>
      </section>

      {/* SECTIONS */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <div className="space-y-14">
          <Section
            title="Réalisation & production vidéo"
            text="Direction, tournage et montage avec une approche cinématographique maîtrisée."
          />

          <Section
            title="Audio & son"
            text="Prise de son, traitement et cohérence sonore sur l’ensemble des contenus."
          />

          <Section
            title="Web & stratégie digitale"
            text="Présence numérique claire, durable et alignée avec l’identité du projet."
          />
        </div>
      </section>

      {/* SILENCE */}
      <section className="h-[18vh]" />
    </main>
  );
}

function Section({ title, text }: { title: string; text: string }) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-sm uppercase tracking-[0.3em] text-white/70">
        {title}
      </h2>

      <p className="mt-5 text-white/65 leading-relaxed max-w-2xl">
        {text}
      </p>

      <div className="mt-10 h-px w-full bg-white/12" />
    </div>
  );
}
