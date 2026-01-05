"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

/* ================= MOTION (sobres, lisibles) ================= */
const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fade: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type BlockProps = {
  title: string;
  text: string[];
};

function Block({ title, text }: BlockProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="space-y-2">
        {text.map((t, i) => (
          <p key={i} className="text-white/65 leading-relaxed">
            {t}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function StudioEtLabelPage() {
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
          Studio & Label
        </motion.h1>

        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-2xl text-white/65 leading-relaxed"
        >
          Black Jesus Records est un studio créatif et un label indépendant basé à Lévis, Québec.
          Nous produisons des images et du son avec exigence, intention et cohérence.
        </motion.p>

        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-4 max-w-2xl text-white/65 leading-relaxed"
        >
          Image · Son · Stratégie.
        </motion.p>
      </section>

      {/* CORPS (CALME, INSTITUTIONNEL) */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <div className="space-y-16">
          <Block
            title="Position"
            text={[
              "Studio créatif & label indépendant.",
              "Pour les artistes, marques et entreprises qui veulent une présence numérique forte.",
              "Un langage visuel et sonore cohérent, sans bruit inutile.",
            ]}
          />

          <Block
            title="Vision"
            text={[
              "On élève ce qui vient d’ici.",
              "Créer avec précision. Livrer proprement. Assumer chaque image.",
            ]}
          />

          <Block
            title="Méthode"
            text={[
              "Rigueur.",
              "Clarté.",
              "Décisions simples.",
              "Une narration calme, du tournage à la livraison.",
            ]}
          />

          <div className="h-px w-full bg-white/15" />

          {/* CTA DISCRET */}
          <div className="flex flex-col gap-6">
            <p className="text-white/60 leading-relaxed max-w-xl">
              Si tu veux parler rapidement : planifier un appel. Si tu préfères écrire : débuter un
              projet.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href="/planifier-un-appel"
                className="underline underline-offset-8 text-white/80 hover:text-white transition"
              >
                Planifier un appel
              </Link>

              <Link
                href="/debuter-un-projet"
                className="underline underline-offset-8 text-white/80 hover:text-white transition"
              >
                Débuter un projet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SILENCE */}
      <section className="h-[18vh]" />
    </main>
  );
}
