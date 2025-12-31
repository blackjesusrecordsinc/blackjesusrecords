"use client";

import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";

type Status = null | "loading" | "success" | "error";

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" as const },
  },
};

export default function DebuterUnProjet() {
  const [status, setStatus] = useState<Status>(null);
  const [msg, setMsg] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    const fd = new FormData(e.currentTarget);

    // honeypot
    const company = String(fd.get("company") ?? "").trim();
    if (company) {
      setStatus("success");
      setMsg("Demande envoyée.");
      e.currentTarget.reset();
      return;
    }

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      service: "Débuter un projet",
      company: "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      setMsg("Envoyé. On te répond dès que possible.");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setMsg("Erreur serveur. Réessaie plus tard.");
    }
  }, []);

  return (
    <main className="readable min-h-screen px-6 py-24 text-white">
      <motion.div variants={fade} initial="hidden" animate="show" className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold">Débuter un projet</h1>

        <p className="mt-6 text-white/70 leading-relaxed">
          Cet espace est destiné aux personnes qui souhaitent présenter leur projet par écrit,
          avec plus de contexte et de précision.
        </p>

        <p className="mt-3 text-white/60 leading-relaxed">
          Prenez le temps d’expliquer. Nous vous répondrons avec une lecture claire et structurée.
        </p>

        <form ref={formRef} onSubmit={onSubmit} className="mt-14 space-y-8" noValidate>
          <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

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
            <label className="block text-sm mb-2">Présentation du projet</label>
            <textarea
              name="message"
              rows={8}
              required
              placeholder="Contexte, intentions, contraintes, échéancier, attentes…"
              className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white outline-none focus:border-white/40"
            />
          </div>

          {status && (
            <p className={`text-sm ${status === "error" ? "text-red-300" : "text-white/70"}`}>
              {msg}
            </p>
          )}

          <button
            type="submit"
            className="mt-10 underline underline-offset-8 text-white/80 hover:text-white transition"
          >
            {status === "loading" ? "Envoi…" : "Envoyer"}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
