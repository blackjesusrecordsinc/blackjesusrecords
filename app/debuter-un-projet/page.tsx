"use client";

<<<<<<< HEAD
import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
=======
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
>>>>>>> 10e061a (Rebuild: premium layout + motion + readability)

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

<<<<<<< HEAD
=======
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

>>>>>>> 10e061a (Rebuild: premium layout + motion + readability)
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

<<<<<<< HEAD
=======
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

>>>>>>> 10e061a (Rebuild: premium layout + motion + readability)
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
<<<<<<< HEAD
    } catch {
      setStatus("error");
      setMsg("Erreur serveur. Réessaie plus tard.");
=======
    } catch (err: unknown) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Erreur d’envoi. Réessaie plus tard.");
>>>>>>> 10e061a (Rebuild: premium layout + motion + readability)
    }
  }, []);

  const fieldBase =
    "w-full rounded-2xl bg-white/[0.07] border border-white/14 px-4 py-3.5 text-white/95 placeholder:text-white/40 outline-none " +
    "focus:border-white/28 focus:ring-2 focus:ring-[#F5C542]/20 focus:ring-offset-0 " +
    "transition shadow-[0_0_0_1px_rgba(255,255,255,0.02)]";

  return (
    <main className="readable min-h-screen px-6 py-24 text-white">
      {/* ✅ couche de lisibilité globale (pas un tableau, juste une lecture layer) */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/55" />
      </div>

<<<<<<< HEAD
        <p className="mt-6 text-white/70 leading-relaxed">
          Cet espace est destiné aux personnes qui souhaitent présenter leur projet par écrit,
          avec plus de contexte et de précision.
        </p>

        <p className="mt-3 text-white/60 leading-relaxed">
          Prenez le temps d’expliquer. Nous vous répondrons avec une lecture claire et structurée.
        </p>
=======
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-3xl"
        style={{ willChange: reduce ? undefined : ("transform, opacity, filter" as any) }}
      >
        {/* ✅ panel éditorial subtil : augmente la lisibilité sans “tableau” */}
        <div className="rounded-[28px] border border-white/12 bg-black/40 backdrop-blur-md shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
          <div className="p-8 md:p-12">
            <header className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-white/14 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold tracking-[0.22em] uppercase text-white/70">
                Brief
              </div>

              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]">
                Débuter un projet
              </h1>

              <p className="text-white/90 leading-[1.75] max-w-[68ch]">
                Dépose ici un brief clair et complet. Plus c’est précis, plus notre réponse est rapide,
                réaliste et alignée sur ton objectif (style, livrables, délais).
              </p>
>>>>>>> 10e061a (Rebuild: premium layout + motion + readability)

              <p className="text-white/75 leading-[1.75] max-w-[68ch]">
                Après l’envoi, on te renvoie une lecture structurée :{" "}
                <span className="text-white/90">périmètre</span>,{" "}
                <span className="text-white/90">timeline</span>,{" "}
                <span className="text-white/90">proposition</span>, et la prochaine étape.
              </p>

<<<<<<< HEAD
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
=======
              <div className="pt-1 text-white/75 leading-[1.75] max-w-[68ch]">
                <span className="text-white/70">Tu préfères cadrer en 10–15 min ? </span>
                <button
                  type="button"
                  onClick={openCalendly}
                  className="inline-flex items-center gap-2 text-white/95 hover:text-white transition underline underline-offset-8 decoration-white/25 hover:decoration-[#F5C542]/55"
                >
                  Planifier un appel de cadrage
                </button>
                <span className="text-white/55">{" "}ou{" "}</span>
                <a
                  href={CALL_URL}
                  className="text-white/90 hover:text-white transition underline underline-offset-8 decoration-white/25 hover:decoration-[#F5C542]/55"
                >
                  appeler maintenant
                </a>
                .
              </div>

              <div className="h-px bg-white/10 mt-2" />
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
                  placeholder="Nom et prénom"
                  className={fieldBase}
                />
                <p className="text-xs text-white/55">
                  Utilisé pour le suivi et la signature du devis si nécessaire.
                </p>
              </div>

              <div className="space-y-2.5">
                <label className="block text-sm text-white/85">Adresse courriel</label>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="email@domaine.com"
                  className={fieldBase}
                />
                <p className="text-xs text-white/55">
                  Réponse sous 24–48h ouvrables (selon charge).
                </p>
              </div>

              <div className="space-y-2.5">
                <label className="block text-sm text-white/85">Brief du projet</label>
                <textarea
                  name="message"
                  rows={9}
                  required
                  placeholder="Objectif, public, style / références, livrables attendus, budget estimé, délais, lieu, contraintes…"
                  className={cn(fieldBase, "resize-y")}
                />
                <p className="text-xs text-white/60">
                  Conseil : ajoute 1–2 références (liens) + ton délai idéal + le livrable final attendu.
                </p>
              </div>

              {status && (
                <div
                  role="status"
                  aria-live="polite"
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-sm leading-relaxed",
                    status === "error"
                      ? "border-red-300/30 bg-red-500/10 text-red-200"
                      : "border-white/12 bg-white/[0.04] text-white/85"
                  )}
                >
                  {msg}
                </div>
              )}

              <div className="pt-1 space-y-4">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-busy={status === "loading"}
                  className={cn(
                    "inline-flex items-center gap-2 text-sm font-medium tracking-tight",
                    "rounded-2xl px-5 py-3 border transition",
                    "bg-white/[0.07] border-white/14 text-white/95",
                    "hover:bg-white/[0.09] hover:border-white/22",
                    "focus:outline-none focus:ring-2 focus:ring-[#F5C542]/20",
                    status === "loading" && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span className="text-white/95">
                    {status === "loading" ? "Envoi…" : "Envoyer la demande"}
                  </span>
                  {/* gold micro, unique */}
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "rgba(245,197,66,0.7)" }}
                    aria-hidden="true"
                  />
                </button>

                <p className="text-xs text-white/55 max-w-[68ch]">
                  Aucune prospection. Tes informations servent uniquement à répondre à cette demande.
                </p>
              </div>
            </form>
          </div>
        </div>
>>>>>>> 10e061a (Rebuild: premium layout + motion + readability)
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
