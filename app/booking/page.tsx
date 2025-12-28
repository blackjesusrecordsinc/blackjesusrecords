"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import HeroCineSlider from "@/components/HeroCineSlider";

/* ================= TYPES ================= */
type Status = null | "loading" | "success" | "error";

type BookingPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  location: string;
  budget: string;
  message: string;
  company?: string;
};

/* ================= UTILS ================= */
function toStr(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}
function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

/* ================= DATA ================= */
const SERVICES = [
  "Clip musical",
  "Événement",
  "Contenu réseaux sociaux",
  "Post-production",
  "Shooting photo",
  "Site web",
  "Stratégie / croissance",
  "Autre",
] as const;

const QUICK = [
  {
    id: "clip",
    title: "Clip musical",
    hint: "YouTube + versions verticales",
    message:
      "Objectif:\n-\n\nStyle / références:\n-\n\nLieu + date:\n-\n\nLivrables:\n- 16:9\n- 9:16\n\nBudget:\n-\n\nNotes:\n-",
  },
  {
    id: "event",
    title: "Événement",
    hint: "Highlights + aftermovie",
    message:
      "Type d’événement:\n-\n\nLieu + date:\n-\n\nMoments clés:\n-\n\nLivrables:\n- Aftermovie\n- Vertical\n\nBudget:\n-\n\nNotes:\n-",
  },
  {
    id: "post",
    title: "Post-production",
    hint: "Montage / look / audio",
    message:
      "Type:\n- Montage / Color / Audio\n\nDurée:\n-\n\nFormats:\n- 16:9 / 9:16\n\nDeadline:\n-\n\nNotes:\n-",
  },
] as const;

/* ================= ANIM ================= */
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ================= UI ================= */
const UI = {
  pill:
    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-300/10 border border-cyan-300/25",
  card:
    "rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,8,22,0.35)]",
  btnPrimary:
    "group relative px-7 py-3 rounded-lg bg-cyan-300 text-[#001019] font-semibold overflow-hidden transition hover:scale-[1.02] active:scale-95",
  btnPrimaryGlow:
    "absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-300 opacity-0 group-hover:opacity-100",
  btnSecondary:
    "px-7 py-3 rounded-lg border border-white/20 text-white hover:border-cyan-300 transition",
  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",
};

/* ================= PAGE ================= */
export default function BookingPage() {
  const [status, setStatus] = useState<Status>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement | null>(null);
  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const services = useMemo(() => [...SERVICES], []);

  const validate = useCallback((p: BookingPayload) => {
    const e: Record<string, string> = {};
    if (!p.name || p.name.length < 2) e.name = "Nom requis";
    if (!p.email || !isEmail(p.email)) e.email = "Email invalide";
    if (!p.message || p.message.length < 20) e.message = "Détails requis (min 20 caractères)";
    return e;
  }, []);

  const applyTemplate = useCallback((service: string, message: string) => {
    setStatus(null);
    setErrorMsg("");
    setFieldErrors({});
    const form = formRef.current;
    if (!form) return;

    const serviceEl = form.querySelector<HTMLSelectElement>('select[name="service"]');
    const msgEl = form.querySelector<HTMLTextAreaElement>('textarea[name="message"]');
    if (serviceEl) serviceEl.value = service;
    if (msgEl && !msgEl.value.trim()) {
      msgEl.value = message;
      msgEl.focus();
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatus("loading");
      setErrorMsg("");
      setFieldErrors({});

      const fd = new FormData(e.currentTarget);
      const payload: BookingPayload = {
        name: toStr(fd.get("name")),
        email: toStr(fd.get("email")),
        phone: toStr(fd.get("phone")),
        service: toStr(fd.get("service")),
        date: toStr(fd.get("date")),
        location: toStr(fd.get("location")),
        budget: toStr(fd.get("budget")),
        message: toStr(fd.get("message")),
        company: toStr(fd.get("company")),
      };

      const errs = validate(payload);
      if (Object.keys(errs).length) {
        setStatus("error");
        setFieldErrors(errs);
        setErrorMsg("Corrige les champs requis.");
        feedbackRef.current?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error();
        setStatus("success");
        e.currentTarget.reset();
      } catch {
        setStatus("error");
        setErrorMsg("Erreur serveur. Réessaie plus tard.");
      }
    },
    [validate]
  );

  return (
    <main className="relative min-h-screen text-white">
      {/* ===== BACKGROUND GLOBAL (IDENTIQUE AUX AUTRES PAGES) ===== */}
      <div className="fixed inset-0 z-0">
        <HeroCineSlider count={11} ext=".jpg" intervalMs={8000} />
      </div>
      <div className="fixed inset-0 z-[1] bg-black/65 backdrop-blur-[2px]" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
            <motion.div variants={item} className={UI.pill}>
              <span className="w-2 h-2 bg-cyan-300 rounded-full" />
              <span className="text-xs uppercase tracking-widest text-cyan-100">Réservation</span>
            </motion.div>

            <motion.h1 variants={item} className="text-4xl md:text-6xl font-bold">
              Réserver une{" "}
              <span className="bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
                date
              </span>
            </motion.h1>

            <motion.p variants={item} className="text-white/75 max-w-3xl">
              Envoie l’essentiel. On revient avec une proposition claire et réaliste.
            </motion.p>

            <motion.div variants={item} className={UI.sep} />

            {/* ===== FORM ===== */}
            <motion.div variants={item} className={UI.card}>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
                <input name="company" className="hidden" tabIndex={-1} />

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Nom *" name="name" error={fieldErrors.name} />
                  <Field label="Email *" name="email" type="email" error={fieldErrors.email} />
                </div>

                <Select label="Service" name="service" options={services} />

                <Textarea
                  label="Détails *"
                  name="message"
                  rows={6}
                  error={fieldErrors.message}
                />

                <div ref={feedbackRef}>
                  {status === "error" && <Feedback type="error" text={errorMsg} />}
                  {status === "success" && (
                    <Feedback type="success" text="Demande envoyée. On te revient rapidement." />
                  )}
                </div>

                <button type="submit" className={UI.btnPrimary}>
                  <span className={UI.btnPrimaryGlow} />
                  <span className="relative z-10">
                    {status === "loading" ? "Envoi…" : "Envoyer"}
                  </span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

/* ================= ATOMS ================= */
function Field({ label, error, ...props }: any) {
  return (
    <div>
      <label className="block mb-2 text-sm">{label}</label>
      <input
        {...props}
        className="w-full rounded-xl bg-white/6 border border-white/10 px-4 py-3 text-white"
      />
      {error && <p className="text-xs text-cyan-300 mt-1">{error}</p>}
    </div>
  );
}

function Select({ label, options, ...props }: any) {
  return (
    <div>
      <label className="block mb-2 text-sm">{label}</label>
      <select {...props} className="w-full rounded-xl bg-white/6 border border-white/10 px-4 py-3">
        <option value="">Sélectionner…</option>
        {options.map((o: string) => (
          <option key={o} value={o} className="bg-black">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Textarea({ label, error, ...props }: any) {
  return (
    <div>
      <label className="block mb-2 text-sm">{label}</label>
      <textarea
        {...props}
        className="w-full rounded-xl bg-white/6 border border-white/10 px-4 py-3 text-white"
      />
      {error && <p className="text-xs text-cyan-300 mt-1">{error}</p>}
    </div>
  );
}

function Feedback({ type, text }: { type: "error" | "success"; text: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/6 px-4 py-3">
      <p className="text-sm">{text}</p>
    </div>
  );
}
