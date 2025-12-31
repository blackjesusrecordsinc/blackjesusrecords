"use client";

import { motion, type Variants } from "framer-motion";

const fade: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PlanifierUnAppel() {
  return (
    <main className="readable min-h-screen flex items-center justify-center px-6">
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        className="w-full max-w-xl text-white"
      >
        {/* TITRE */}
        <h1 className="text-3xl md:text-4xl font-semibold">
          Planifier un appel
        </h1>

        <p className="mt-4 text-white/70 leading-relaxed">
          Laisse-nous tes disponibilités.  
          Nous te rappellerons dès que possible.
        </p>

        {/* FORM */}
        <form
          action="/api/contact"
          method="POST"
          className="mt-10 space-y-6"
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
            <label className="block text-sm mb-2">Téléphone</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white outline-none focus:border-white/40"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">
              Disponibilités
            </label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Ex : Lundi–jeudi après 16h, vendredi matin…"
              className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white outline-none focus:border-white/40"
            />
          </div>

          {/* TYPE (pour l’API) */}
          <input type="hidden" name="service" value="Planifier un appel" />

          <button
            type="submit"
            className="mt-8 underline underline-offset-8 text-white/80 hover:text-white transition"
          >
            Envoyer
          </button>
        </form>
      </motion.div>
    </main>
  );
}
