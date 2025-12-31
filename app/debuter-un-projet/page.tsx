"use client";

import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function DebuterUnProjet() {
  return (
    <main className="readable min-h-screen px-6 py-24 text-white">
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        className="max-w-2xl mx-auto"
      >
        {/* TITRE */}
        <h1 className="text-3xl md:text-4xl font-semibold">
          Débuter un projet
        </h1>

        <p className="mt-6 text-white/70 leading-relaxed">
          Cet espace est destiné aux personnes qui souhaitent présenter
          leur projet par écrit, avec plus de contexte et de précision.
        </p>

        <p className="mt-3 text-white/60 leading-relaxed">
          Prenez le temps d’expliquer.  
          Nous vous répondrons avec une lecture claire et structurée.
        </p>

        {/* FORMULAIRE */}
        <form
          action="/api/contact"
          method="POST"
          className="mt-14 space-y-8"
        >
          {/* Honeypot */}
          <input type="text" name="company" className="hidden" />

          <div>
            <label className="block text-sm mb-2">Nom</label>
            <input
              name="name"
              required
              className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white outline-none focus:border-white/40"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white outline-none focus:border-white/40"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">
              Présentation du projet
            </label>
            <textarea
              name="message"
              rows={8}
              required
              placeholder="Contexte, intentions, contraintes, échéancier, attentes…"
              className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white outline-none focus:border-white/40"
            />
          </div>

          {/* TYPE POUR L’API */}
          <input
            type="hidden"
            name="service"
            value="Débuter un projet"
          />

          <button
            type="submit"
            className="mt-10 underline underline-offset-8 text-white/80 hover:text-white transition"
          >
            Envoyer
          </button>
        </form>
      </motion.div>
    </main>
  );
}
