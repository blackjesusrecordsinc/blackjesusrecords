"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
      window.location.href = CALENDLY_URL;
    }
  }, []);

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    const fd = new FormData(e.currentTarget);

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
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        className="max-w-2xl mx-auto drop-shadow-[0_10px_35px_rgba(0,0,0,0.75)]"
      >
        <h1 className="text-3xl md:text-4xl font-semibold text-white">
          Débuter un projet
        </h1>

        <p className="mt-6 text-white/90 leading-relaxed">
          Cet espace sert à déposer un brief complet. Plus c’est précis, plus notre réponse est rapide,
          réaliste et alignée sur ton objectif.
        </p>

        <p className="mt-3 text-white/85 leading-relaxed">
          Après l’envoi, on revient avec une lecture structurée et la prochaine étape (appel, devis, date de prod).
        </p>

        <p className="mt-6 text-white/85 leading-relaxed">
          Tu préfères cadrer en 10–15 min ?{" "}
          <button
            type="button"
            onClick={openCalendly}
            className="underline underline-offset-8 text-white hover:text-white transition"
          >
            Planifier un appel de cadrage
          </button>
          <span className="text-white/80">{" "}ou{" "}</span>
          <a
            href={CALL_URL}
            className="underline underline-offset-8 text-white/95 hover:text-white transition"
          >
            appeler maintenant
          </a>
          .
        </p>

        <form ref={formRef} onSubmit={onSubmit} className="mt-14 space-y-8" noValidate>
          <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

          <div>
            <label className="block text-sm mb-2 text-white/90">Nom complet</label>
            <input
              name="name"
              required
              autoComplete="name"
              placeholder="Nom et prénom"
              className="w-full rounded-xl bg-white/8 border border-white/20 px-4 py-3 text-white placeholder:text-white/70 outline-none focus:border-white/45"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-white/90">Adresse courriel</label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="email@domaine.com"
              className="w-full rounded-xl bg-white/8 border border-white/20 px-4 py-3 text-white placeholder:text-white/70 outline-none focus:border-white/45"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-white/90">Brief du projet</label>
            <textarea
              name="message"
              rows={8}
              required
              placeholder="Objectif, public, style / références, livrables attendus, budget estimé, délais, lieu, contraintes…"
              className="w-full rounded-xl bg-white/8 border border-white/20 px-4 py-3 text-white placeholder:text-white/70 outline-none focus:border-white/45"
            />
            <p className="mt-2 text-xs text-white/80">
              Conseil : ajoute 1–2 références (artistes / marques / liens) et ton délai idéal.
            </p>
          </div>

          <AnimatePresence mode="popLayout">
            {status && (
              <motion.div
                key={status + msg}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className={`rounded-xl border px-4 py-3 text-sm ${
                  status === "error"
                    ? "border-red-400/30 bg-red-500/10 text-red-100"
                    : "border-[#F5C542]/30 bg-[#F5C542]/10 text-white"
                }`}
                role={status === "error" ? "alert" : "status"}
                aria-live="polite"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-black/30">
                    {status === "error" ? "!" : "✓"}
                  </span>
                  <div className="leading-relaxed">
                    <span className="font-semibold">
                      {status === "error" ? "Envoi impossible" : "Message envoyé"}
                    </span>
                    <div className="mt-1 text-white/90">{msg}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={status === "loading"}
            aria-busy={status === "loading"}
            className={`mt-10 inline-flex items-center gap-3 underline underline-offset-8 transition ${
              status === "loading"
                ? "text-white cursor-wait"
                : "text-white hover:text-white"
            }`}
          >
            {status === "loading" ? (
              <>
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#F5C542] animate-pulse" />
                <span>Envoi…</span>
              </>
            ) : (
              "Envoyer la demande"
            )}
          </button>

          <p className="text-xs text-white/80">
            Aucune prospection. Tes informations servent uniquement à répondre à cette demande.
          </p>
        </form>
      </motion.div>
    </main>
  );
}
