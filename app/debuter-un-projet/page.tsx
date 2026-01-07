"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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

const CALL_URL = process.env.NEXT_PUBLIC_CALL_URL || "tel:+15818496669";
const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/contact-blackjesusrecords/30min";
function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function DebuterUnProjet() {
  const [status, setStatus] = useState<Status>(null);
  const [msg, setMsg] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  // ✅ charge Calendly script (1 fois)
  useEffect(() => {
    const id = "calendly-widget-js";
    if (document.getElementById(id)) return;

    const s = document.createElement("script");
    s.id = id;
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const openCalendly = useCallback(() => {
    if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.location.href = CALENDLY_URL; // fallback
    }
  }, []);

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

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    // ✅ mini validation client (évite 400 inutiles)
    if (!name) {
      setStatus("error");
      setMsg("Ajoute ton nom complet.");
      return;
    }
    if (!email || !isEmail(email)) {
      setStatus("error");
      setMsg("Adresse courriel invalide.");
      return;
    }
    if (!message || message.length < 10) {
      setStatus("error");
      setMsg("Brief trop court. Donne au moins quelques détails (10+ caractères).");
      return;
    }

    const payload = {
      name,
      email,
      message,
      service: "Débuter un projet",
      company: "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const serverMsg =
          (data && typeof data.error === "string" && data.error) ||
          "Erreur d’envoi. Réessaie plus tard.";
        throw new Error(serverMsg);
      }

      setStatus("success");
      setMsg("Demande envoyée. Réponse sous 24–48h ouvrables.");
      e.currentTarget.reset();
    } catch (err: any) {
      setStatus("error");
      setMsg(String(err?.message || "Erreur d’envoi. Réessaie plus tard."));
    }
  }, []);

  return (
    <main className="readable min-h-screen px-6 py-24 text-white">
      <motion.div variants={fade} initial="hidden" animate="show" className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold">Débuter un projet</h1>

        <p className="mt-6 text-white/70 leading-relaxed">
          Cet espace sert à déposer un brief complet. Plus c’est précis, plus notre réponse est rapide,
          réaliste et alignée sur ton objectif.
        </p>

        <p className="mt-3 text-white/60 leading-relaxed">
          Après l’envoi, on revient avec une lecture structurée et la prochaine étape (appel, devis, date de prod).
        </p>

        <p className="mt-6 text-white/60 leading-relaxed">
          Tu préfères cadrer en 10–15 min ?{" "}
          <button
            type="button"
            onClick={openCalendly}
            className="underline underline-offset-8 text-white/80 hover:text-white transition"
          >
            Planifier un appel de cadrage
          </button>
          <span className="text-white/50">{" "}ou{" "}</span>
          <a
            href={CALL_URL}
            className="underline underline-offset-8 text-white/70 hover:text-white transition"
          >
            appeler maintenant
          </a>
          .
        </p>

        <form ref={formRef} onSubmit={onSubmit} className="mt-14 space-y-8" noValidate>
          <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

          <div>
            <label className="block text-sm mb-2">Nom complet</label>
            <input
              name="name"
              required
              autoComplete="name"
              placeholder="Nom et prénom"
              className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white outline-none focus:border-white/40"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Adresse courriel</label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="email@domaine.com"
              className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white outline-none focus:border-white/40"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Brief du projet</label>
            <textarea
              name="message"
              rows={8}
              required
              placeholder="Objectif, public, style / références, livrables attendus, budget estimé, délais, lieu, contraintes…"
              className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white outline-none focus:border-white/40"
            />
            <p className="mt-2 text-xs text-white/50">
              Conseil : ajoute 1–2 références (artistes / marques / liens) et ton délai idéal.
            </p>
          </div>

          {status && (
            <p className={`text-sm ${status === "error" ? "text-red-300" : "text-white/70"}`}>
              {msg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            aria-busy={status === "loading"}
            className={`mt-10 underline underline-offset-8 transition ${
              status === "loading"
                ? "text-white/40 cursor-not-allowed"
                : "text-white/80 hover:text-white"
            }`}
          >
            {status === "loading" ? "Envoi…" : "Envoyer la demande"}
          </button>

          <p className="text-xs text-white/50">
            Aucune prospection. Tes informations servent uniquement à répondre à cette demande.
          </p>
        </form>
      </motion.div>
    </main>
  );
}
