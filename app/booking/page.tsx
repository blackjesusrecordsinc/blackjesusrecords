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
  company?: string; // honeypot
};

type BaseFieldProps = {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
};

/* ================= UTILS ================= */
function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v.trim());
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
    service: "Clip musical",
    message:
      "Objectif:\n-\n\nStyle / références (liens):\n-\n\nLieu + date:\n-\n\nLivrables:\n- 16:9 (YouTube)\n- 9:16 (Reels/TikTok)\n\nBudget:\n-\n\nNotes:\n-",
  },
  {
    id: "event",
    title: "Événement",
    hint: "Highlights + aftermovie",
    service: "Événement",
    message:
      "Type d’événement:\n-\n\nLieu + date:\n-\n\nMoments clés:\n-\n\nLivrables:\n- Aftermovie\n- Version verticale\n\nBudget:\n-\n\nNotes:\n-",
  },
  {
    id: "post",
    title: "Post-production",
    hint: "Montage / look / audio",
    service: "Post-production",
    message:
      "Type:\n- Montage / Color / Audio\n\nDurée finale:\n-\n\nFormats:\n- 16:9 / 9:16\n\nDeadline:\n-\n\nFootage dispo:\n-\n\nNotes:\n-",
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
    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-300/10 border border-cyan-300/25 " +
    "shadow-[0_0_40px_rgba(0,180,255,0.12)]",

  card:
    "rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl " +
    "shadow-[0_18px_60px_rgba(0,8,22,0.35)]",

  quickCard:
    "group rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-left transition " +
    "hover:border-cyan-300/30 hover:bg-white/8",

  btnPrimary:
    "group relative px-7 py-3 rounded-lg bg-cyan-300 text-[#001019] font-semibold overflow-hidden transition " +
    "hover:scale-[1.02] active:scale-95 shadow-[0_14px_52px_rgba(0,8,22,0.45)]",

  btnPrimaryGlow:
    "absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity",

  btnSecondary:
    "px-7 py-3 rounded-lg border border-white/20 text-white font-medium " +
    "hover:border-cyan-300 transition",

  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",

  inputBase:
    "w-full rounded-xl bg-white/6 border px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition " +
    "border-white/10 hover:border-white/15 focus:border-cyan-300/35 focus:ring-1 focus:ring-cyan-300/15",
} as const;

/* ================= PAGE ================= */
const initialForm: BookingPayload = {
  name: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  location: "",
  budget: "",
  message: "",
  company: "",
};

export default function BookingPage() {
  const [form, setForm] = useState<BookingPayload>(initialForm);
  const [status, setStatus] = useState<Status>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const services = useMemo(() => SERVICES.slice() as unknown as string[], []);

  const disabled = status === "loading";

  const validate = useCallback((p: BookingPayload) => {
    const e: Record<string, string> = {};
    if (!p.name || p.name.trim().length < 2) e.name = "Indique ton nom.";
    if (!p.email) e.email = "Indique ton email.";
    else if (!isEmail(p.email)) e.email = "Email invalide (ex: nom@domaine.com).";
    if (!p.message) e.message = "Décris le projet.";
    else if (p.message.trim().length < 20) e.message = "Ajoute un minimum de contexte (20 caractères).";
    return e;
  }, []);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.currentTarget;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const applyTemplate = useCallback((service: string, message: string) => {
    setStatus(null);
    setErrorMsg("");
    setFieldErrors({});

    setForm((prev) => ({
      ...prev,
      service,
      message: prev.message.trim() ? prev.message : message,
    }));

    requestAnimationFrame(() => {
      messageRef.current?.focus();
    });
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setStatus("loading");
      setErrorMsg("");
      setFieldErrors({});

      const payload: BookingPayload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        service: form.service.trim(),
        date: form.date.trim(),
        location: form.location.trim(),
        budget: form.budget.trim(),
        message: form.message.trim(),
        company: form.company?.trim(),
      };

      const errs = validate(payload);
      if (Object.keys(errs).length) {
        setStatus("error");
        setFieldErrors(errs);
        setErrorMsg("Corrige les champs requis, puis renvoie.");
        feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => null);
        if (!res.ok) {
          setStatus("error");
          setErrorMsg(data?.error || "Erreur serveur. Réessaie plus tard.");
          feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }

        setStatus("success");
        setForm(initialForm);
        feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch {
        setStatus("error");
        setErrorMsg("Erreur de connexion. Réessaie plus tard.");
        feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
    [form, validate]
  );

  return (
    <main className="relative min-h-screen text-white">
      {/* ===== BACKGROUND GLOBAL ===== */}
      <div className="fixed inset-0 z-0">
        <HeroCineSlider count={11} ext=".jpg" intervalMs={8000} darkness={0.58} vignette={0.5} glow={0.08} grain={0.06} />
      </div>
      <div className="fixed inset-0 z-[1] bg-black/65 backdrop-blur-[2px]" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
            {/* Header */}
            <motion.div variants={item} className={UI.pill}>
              <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-cyan-100">Réservation</span>
            </motion.div>

            <motion.h1 variants={item} className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              Réserver une{" "}
              <span className="bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">date</span>
            </motion.h1>

            <motion.p variants={item} className="text-white/75 max-w-3xl leading-relaxed">
              Donne l’essentiel : on te répond avec un plan clair (scope, livrables, délais, budget). Pas de promesses floues.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
              <Link href="/services" className={UI.btnSecondary}>
                Voir les services
              </Link>
              <Link href="/portfolio" className={UI.btnSecondary}>
                Voir le portfolio
              </Link>
            </motion.div>

            <motion.div variants={item} className={UI.sep} />

            {/* ===== QUICK TEMPLATES ===== */}
            <motion.div variants={item} className="grid gap-3 sm:grid-cols-3">
              {QUICK.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => applyTemplate(q.service, q.message)}
                  className={UI.quickCard}
                >
                  <p className="text-sm font-semibold text-white">
                    {q.title} <span className="text-cyan-200">→</span>
                  </p>
                  <p className="mt-1 text-xs text-white/60 leading-relaxed">{q.hint}</p>
                </button>
              ))}
            </motion.div>

            {/* ===== FORM ===== */}
            <motion.div variants={item} className={UI.card}>
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Honeypot */}
                <input
                  name="company"
                  value={form.company || ""}
                  onChange={onChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <Field
                    label="Nom complet *"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    autoComplete="name"
                    placeholder="Ex. Emmanuel Kibanda"
                    error={fieldErrors.name}
                    disabled={disabled}
                  />
                  <Field
                    label="Email *"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    autoComplete="email"
                    placeholder="Ex. nom@domaine.com"
                    error={fieldErrors.email}
                    disabled={disabled}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field
                    label="Téléphone"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    autoComplete="tel"
                    placeholder="Optionnel"
                    disabled={disabled}
                  />
                  <Select
                    label="Service"
                    name="service"
                    value={form.service}
                    onChange={onChange}
                    options={services}
                    hint="Choisis si tu sais déjà."
                    disabled={disabled}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <Field label="Date souhaitée" name="date" type="date" value={form.date} onChange={onChange} disabled={disabled} />
                  <Field
                    label="Lieu"
                    name="location"
                    value={form.location}
                    onChange={onChange}
                    placeholder="Ville, studio, extérieur…"
                    className="md:col-span-2"
                    disabled={disabled}
                  />
                </div>

                <Field
                  label="Budget"
                  name="budget"
                  value={form.budget}
                  onChange={onChange}
                  placeholder="Ex. 800 $, 1500 $, à discuter…"
                  disabled={disabled}
                />

                <Textarea
                  ref={messageRef}
                  label="Détails *"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={7}
                  placeholder="Objectif, références (liens), plateforme, livrables, délais…"
                  error={fieldErrors.message}
                  disabled={disabled}
                />

                <div ref={feedbackRef}>
                  {status === "error" && <Feedback type="error" text={errorMsg || "Une erreur est survenue."} />}
                  {status === "success" && <Feedback type="success" text="Demande envoyée. On te revient rapidement." />}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <button
                    type="submit"
                    disabled={disabled}
                    className={cn(UI.btnPrimary, disabled && "opacity-75 cursor-not-allowed")}
                  >
                    <span className={UI.btnPrimaryGlow} />
                    <span className="relative z-10">{disabled ? "Envoi…" : "Envoyer"}</span>
                  </button>

                  <p className="text-xs text-white/55 leading-relaxed">
                    En envoyant, tu acceptes qu’on te recontacte pour verrouiller le scope.
                  </p>
                </div>
              </form>
            </motion.div>

            {/* footer micro */}
            <motion.div variants={item} className="text-sm text-white/65">
              Tu préfères parler direct ?{" "}
              <Link href="/booking" className="text-cyan-200 hover:text-cyan-100 transition">
                Réserver un appel
              </Link>
              .
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

/* ================= ATOMS ================= */
function Field({
  label,
  hint,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & BaseFieldProps) {
  const id = (props.id || props.name || label).toString();
  return (
    <div className={className}>
      <label htmlFor={id} className="block mb-2 text-sm text-white/85">
        {label}
      </label>
      {hint ? <p className="mb-2 text-xs text-white/50">{hint}</p> : null}
      <input
        {...props}
        id={id}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(UI.inputBase, error && "border-cyan-300/45 ring-1 ring-cyan-300/15")}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-cyan-200">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Select({
  label,
  hint,
  options,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & BaseFieldProps & { options: string[] }) {
  const id = (props.id || props.name || label).toString();
  return (
    <div className={cn("relative", className)}>
      <label htmlFor={id} className="block mb-2 text-sm text-white/85">
        {label}
      </label>
      {hint ? <p className="mb-2 text-xs text-white/50">{hint}</p> : null}

      <div className="relative">
        <select {...props} id={id} className={cn(UI.inputBase, "appearance-none pr-10 cursor-pointer")}>
          <option value="" className="bg-slate-900">
            Sélectionner…
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-slate-900">
              {o}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-cyan-300/50">
          <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & BaseFieldProps
>(function Textarea({ label, hint, error, className, ...props }, ref) {
  const id = (props.id || props.name || label).toString();
  return (
    <div className={className}>
      <label htmlFor={id} className="block mb-2 text-sm text-white/85">
        {label}
      </label>
      {hint ? <p className="mb-2 text-xs text-white/50">{hint}</p> : null}
      <textarea
        ref={ref}
        {...props}
        id={id}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(UI.inputBase, "min-h-[140px] resize-y", error && "border-cyan-300/45 ring-1 ring-cyan-300/15")}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-cyan-200">
          {error}
        </p>
      ) : null}
    </div>
  );
});
Textarea.displayName = "Textarea";

function Feedback({ type, text }: { type: "error" | "success"; text: string }) {
  const isError = type === "error";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "rounded-xl px-4 py-3 border text-sm backdrop-blur-sm",
        isError ? "bg-cyan-300/5 border-cyan-300/20 text-cyan-100" : "bg-emerald-500/5 border-emerald-500/20 text-emerald-100"
      )}
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
    >
      <div className="flex items-center gap-3">
        <span className={cn("w-1.5 h-1.5 rounded-full", isError ? "bg-cyan-300" : "bg-emerald-400")} />
        {text}
      </div>
    </motion.div>
  );
}
