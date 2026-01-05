"use client";

import React, { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Status = null | "loading" | "success" | "error";

const fade = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const CALL_URL = process.env.NEXT_PUBLIC_CALL_URL || "tel:+15818496669";
const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/contact-blackjesusrecords/30min";

function cn(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function DebuterUnProjet() {
  const reduce = useReducedMotion();

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

      if (!res.ok) throw new Error();
      setStatus("success");
      setMsg("Envoyé. On te répond dès que possible.");
      e.currentTarget.reset();
    } catch (err: unknown) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Erreur serveur. Réessaie plus tard.");
    }
  }, []);

  const fieldBase =
    "w-full rounded-2xl bg-white/[0.07] border border-white/14 px-4 py-3.5 text-white/95 placeholder:text-white/40 outline-none " +
    "focus:border-white/28 focus:ring-2 focus:ring-[#F5C542]/20 focus:ring-offset-0 " +
    "transition shadow-[0_0_0_1px_rgba(255,255,255,0.02)]";

  return (
    <main className="readable min-h-screen px-6 py-24 text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/55" />
      </div>

      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-3xl"
        style={{ willChange: reduce ? undefined : ("transform, opacity, filter" as any) }}
      >
        <div className="rounded-[28px] border border-white/12 bg-black/40 backdrop-blur-md shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
          <div className="p-8 md:p-12">
            <header className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-white/14 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold tracking-[0.22em] uppercase text-white/70">
                Brief
              </div>

              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                Débuter un projet
              </h1>

              <p className="text-white/90 leading-[1.75]">
                Dépose ici un brief clair et complet. Plus c’est précis, plus notre réponse est rapide.
              </p>
            </header>

            <form
              ref={formRef}
              onSubmit={onSubmit}
              className="mt-12 space-y-9"
              noValidate
            >
              <input
                type="text"
                name="company"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="space-y-2.5">
                <label className="block text-sm text-white/85">Nom complet</label>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className={fieldBase}
                />
              </div>

              <div className="space-y-2.5">
                <label className="block text-sm text-white/85">Adresse courriel</label>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className={fieldBase}
                />
              </div>

              <div className="space-y-2.5">
                <label className="block text-sm text-white/85">Brief du projet</label>
                <textarea
                  name="message"
                  rows={9}
                  required
                  className={cn(fieldBase, "resize-y")}
                />
              </div>

              {status && (
                <div
                  role="status"
                  aria-live="polite"
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-sm",
                    status === "error"
                      ? "border-red-300/30 bg-red-500/10 text-red-200"
                      : "border-white/12 bg-white/[0.04] text-white/85"
                  )}
                >
                  {msg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-2xl px-5 py-3 border bg-white/[0.07] border-white/14 text-white"
              >
                {status === "loading" ? "Envoi…" : "Envoyer la demande"}
              </button>

              <p className="text-xs text-white/55">
                Tu préfères un échange rapide ?{" "}
                <a href={CALL_URL} className="underline">
                  Appeler maintenant
                </a>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

/* ===== Calendly typing (TS-safe) ===== */
declare global {
  interface Window {
    Calendly?: { initPopupWidget?: (opts: { url: string }) => void };
  }
}
