"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  location: string;
  budget: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  location: "",
  budget: "",
  message: "",
};

const SERVICES = [
  "Production vidéo",
  "Shooting photo",
  "Post-production",
  "Réseaux sociaux",
  "Site web",
  "Stratégie / accompagnement",
  "Autre",
] as const;

const QUICK_PACKS = [
  { t: "Clip / vidéo", d: "Style, références, durée, plateforme, lieu + date." },
  { t: "Shooting photo", d: "Type, rendu voulu, nombre d’images, lieu." },
  { t: "Post-production", d: "Durée finale, footage dispo, objectifs, deadline." },
] as const;

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

const UI = {
  pill:
    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full " +
    "bg-cyan-300/10 border border-cyan-300/25 shadow-[0_0_40px_rgba(0,180,255,0.12)]",
  card:
    "rounded-2xl border border-white/10 bg-white/6 p-6 " +
    "shadow-[0_18px_60px_rgba(0,8,22,0.35)] backdrop-blur-xl",
  btnPrimary:
    "group relative px-7 py-3 rounded-lg bg-cyan-300 text-[#001019] font-semibold overflow-hidden transition " +
    "hover:scale-[1.02] active:scale-95 shadow-[0_14px_52px_rgba(0,8,22,0.45)]",
  btnPrimaryGlow:
    "absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity",
  btnSecondary:
    "px-7 py-3 rounded-lg border border-white/20 text-white font-medium " +
    "hover:border-cyan-300 hover:text-cyan-100 transition",
  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function buildPrefill(service: string) {
  const base =
    "Objectif:\n- \n\nRéférences (liens):\n- \n\nPlateforme cible:\n- (YouTube / Reels / TikTok / Shorts / Site)\n\nLivrables:\n- \n\nDélais:\n- \n\nNotes:\n- ";

  if (!service) return base;

  const s = service.toLowerCase();
  if (s.includes("post")) {
    return (
      "Objectif:\n- \n\nFootage:\n- Caméra / drone / audio séparé ?\n\nDurée finale:\n- \n\nFormats:\n- 16:9 / 9:16 / 1:1\n\nRéférences (liens):\n- \n\nDeadline:\n- \n\nNotes:\n- "
    );
  }
  if (s.includes("photo")) {
    return (
      "Type de séance:\n- (portrait / corporate / food / couple)\n\nRendu voulu:\n- (clean / editorial / ciné)\n\nNombre d’images:\n- \n\nLieu:\n- \n\nRéférences (liens):\n- \n\nDeadline:\n- \n\nNotes:\n- "
    );
  }
  if (s.includes("vidéo") || s.includes("video")) {
    return (
      "Type:\n- (clip / corporate / événement / pub)\n\nDurée:\n- \n\nPlateforme:\n- \n\nLieu + date:\n- \n\nRéférences (liens):\n- \n\nLivrables:\n- (YouTube + vertical, etc.)\n\nNotes:\n- "
    );
  }
  return base;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const firstErrorRef = useRef<HTMLDivElement | null>(null);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name) e.name = "Ton nom est requis.";
    if (!email) e.email = "Ton email est requis.";
    else if (!isEmail(email)) e.email = "Email invalide (ex: nom@domaine.com).";
    if (!message) e.message = "Ton message est requis.";
    if (message && message.length < 20) e.message = "Ajoute un peu de contexte (min. 20 caractères).";
    return e;
  }, [form]);

  const hasErrors = Object.keys(errors).length > 0;

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((p) => ({ ...p, [name]: value }));
    },
    []
  );

  const onQuickFill = useCallback((serviceLabel: string) => {
    setSuccess(null);
    setError(null);
    setForm((p) => ({
      ...p,
      service: serviceLabel,
      message: p.message.trim().length ? p.message : buildPrefill(serviceLabel),
    }));
    setTimeout(() => document.getElementById("message")?.focus?.(), 0);
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSuccess(null);
      setError(null);

      if (hasErrors) {
        setError("Vérifie les champs requis et renvoie.");
        setTimeout(() => firstErrorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            location: form.location.trim(),
            budget: form.budget.trim(),
            message: form.message.trim(),
          }),
        });

        const data = await res.json().catch(() => null);
        if (!res.ok) {
          setError(data?.error || "Une erreur est survenue. Réessaie.");
          return;
        }

        setSuccess("Message bien reçu. On analyse ton projet et on te répond rapidement.");
        setForm(initialForm);
      } catch {
        setError("Erreur de connexion. Réessaie plus tard.");
      } finally {
        setLoading(false);
      }
    },
    [form, hasErrors]
  );

  return (
    <div className="min-h-[calc(100vh-var(--nav-h))]">
      {/* HEADER */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="pointer-events-none absolute -top-10 left-[-10%] h-[340px] w-[340px] rounded-full blur-3xl opacity-25 bg-cyan-300/40" />
        <div className="pointer-events-none absolute top-28 right-[-12%] h-[420px] w-[420px] rounded-full blur-3xl opacity-20 bg-blue-400/40" />

        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={item} className={UI.pill}>
            <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-cyan-100">Contact</span>
          </motion.div>

          <motion.div variants={item}>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight drop-shadow-[0_12px_40px_rgba(0,180,255,0.18)]">
              Parle-nous de ton{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-cyan-200 via-cyan-300 to-blue-200 bg-clip-text text-transparent">
                  projet
                </span>
                <span className="pointer-events-none absolute -inset-x-2 -inset-y-1 bg-cyan-300/12 blur-xl opacity-70" />
              </span>
              .
            </h1>
          </motion.div>

          <motion.p variants={item} className="text-base md:text-lg text-white/75 leading-relaxed max-w-3xl">
            Un brief clair = une réponse claire. Clip, photo, post-prod, web ou stratégie :
            on te cadre le scope, les délais et les livrables.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
            <Link href="/booking" className={UI.btnPrimary}>
              <span className={UI.btnPrimaryGlow} />
              <span className="relative z-10">Réserver un appel</span>
            </Link>
            <Link href="/services" className={UI.btnSecondary}>
              Voir les services
            </Link>
          </motion.div>

          <motion.div variants={item} className={UI.sep} />
        </motion.div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* FORM */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            className="lg:col-span-8"
          >
            <motion.div variants={item} className={UI.card}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Formulaire</h2>
                  <p className="mt-2 text-sm md:text-base text-white/75 leading-relaxed">
                    Va droit au but. Si tu veux, utilise un modèle “brief” en 1 clic.
                  </p>
                </div>
                <span className="shrink-0 hidden sm:inline-flex items-center rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-white/70">
                  Réponse rapide
                </span>
              </div>

              {/* QUICK FILL */}
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {QUICK_PACKS.map((x) => (
                  <button
                    key={x.t}
                    type="button"
                    onClick={() => onQuickFill(x.t === "Clip / vidéo" ? "Production vidéo" : x.t)}
                    className="group rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-left transition hover:border-cyan-300/35 hover:bg-white/8"
                  >
                    <p className="text-sm font-semibold">
                      {x.t} <span className="text-cyan-200">→</span>
                    </p>
                    <p className="mt-1 text-xs text-white/60 leading-relaxed">{x.d}</p>
                  </button>
                ))}
              </div>

              <form onSubmit={onSubmit} className="mt-8 space-y-6" noValidate>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field
                    label="Nom complet *"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                    error={errors.name}
                    autoComplete="name"
                    placeholder="Ex. Emmanuel Kibanda"
                  />
                  <Field
                    label="Email *"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    error={errors.email}
                    autoComplete="email"
                    placeholder="Ex. nom@domaine.com"
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
                  />
                  <Select
                    label="Type de service"
                    name="service"
                    value={form.service}
                    onChange={onChange}
                    options={SERVICES as unknown as string[]}
                    hint="Choisis si tu sais déjà."
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <Field label="Date souhaitée" type="date" name="date" value={form.date} onChange={onChange} />
                  <div className="md:col-span-2">
                    <Field
                      label="Lieu"
                      name="location"
                      value={form.location}
                      onChange={onChange}
                      placeholder="Ville, studio, extérieur…"
                    />
                  </div>
                </div>

                <Field
                  label="Budget approximatif"
                  name="budget"
                  value={form.budget}
                  onChange={onChange}
                  placeholder="Ex. 800 $, 1500 $, à discuter…"
                />

                <Textarea
                  label="Message *"
                  name="message"
                  id="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  error={errors.message}
                  placeholder="Objectif, références, plateforme cible, délais…"
                />

                <div ref={firstErrorRef}>
                  {error && <Feedback type="error" text={error} />}
                  {success && <Feedback type="success" text={success} />}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <button type="submit" disabled={loading} className={UI.btnPrimary}>
                    <span className={UI.btnPrimaryGlow} />
                    <span className="relative z-10">{loading ? "Envoi…" : "Envoyer le message"}</span>
                  </button>

                  <p className="text-xs text-white/55 leading-relaxed">
                    En envoyant, tu acceptes qu’on te recontacte pour clarifier le scope.
                  </p>
                </div>
              </form>
            </motion.div>
          </motion.div>

          {/* SIDE */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            className="lg:col-span-4 space-y-6"
          >
            <motion.div variants={item} className={UI.card}>
              <h3 className="text-xl font-semibold tracking-tight">Notre approche</h3>
              <p className="mt-2 text-sm text-white/75 leading-relaxed">
                On ne “prend pas” un projet. On le cadre, on le produit, on le livre propre.
              </p>

              <ul className="mt-5 space-y-3 text-sm text-white/85">
                {[
                  "Analyse du besoin & des objectifs",
                  "Validation faisabilité & disponibilités",
                  "Proposition claire (scope, livrables, délais)",
                  "Production + livraison prête à publier",
                ].map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 h-px bg-white/10" />

              <p className="mt-5 text-sm text-white/75">
                Pour un créneau direct :{" "}
                <Link href="/booking" className="text-cyan-200 font-semibold hover:opacity-90 transition">
                  Réservation
                </Link>
                .
              </p>
            </motion.div>

            <motion.div variants={item} className="rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold">Info utile</h3>
              <p className="mt-2 text-sm text-white/75 leading-relaxed">
                Plus ton message est précis, plus vite on peut te répondre.
              </p>
              <div className="mt-4 space-y-2">
                {[
                  "1–2 liens de référence (YouTube / Instagram / TikTok)",
                  "Plateforme cible (YouTube, Reels, TikTok…)",
                  "Deadline réelle + budget (même approximatif)",
                  "Livrables attendus (formats + durée)",
                ].map((i) => (
                  <div key={i} className="flex gap-3 text-sm text-white/85">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span className="leading-relaxed">{i}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA FINAL */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/6 p-8 md:p-10 shadow-[0_18px_60px_rgba(0,8,22,0.35)] backdrop-blur-xl">
          <p className="text-2xl md:text-3xl font-bold text-white">Réponse rapide, cadre clair.</p>
          <p className="mt-2 text-white/75 leading-relaxed">Les projets structurés sont traités en priorité.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/services" className={UI.btnSecondary}>
              Voir les services
            </Link>
            <Link href="/booking" className={UI.btnPrimary}>
              <span className={UI.btnPrimaryGlow} />
              <span className="relative z-10">Réserver</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ========= UI ATOMS ========= */

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function Field({
  label,
  hint,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
}) {
  const id = (props.id || props.name || label).toString();
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm text-white/85 mb-2">
        {label}
      </label>
      {hint ? <p className="mb-2 text-xs text-white/50">{hint}</p> : null}
      <input
        {...props}
        id={id}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full rounded-2xl bg-white/6 border px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition backdrop-blur-xl",
          error
            ? "border-cyan-300/60 ring-1 ring-cyan-300/20"
            : "border-white/10 hover:border-white/15 focus:border-cyan-300/35 focus:ring-1 focus:ring-cyan-300/15"
        )}
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
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  hint?: string;
  options: string[];
}) {
  const id = (props.id || props.name || label).toString();
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm text-white/85 mb-2">
        {label}
      </label>
      {hint ? <p className="mb-2 text-xs text-white/50">{hint}</p> : null}
      <select
        {...props}
        id={id}
        className="w-full rounded-2xl bg-white/6 border border-white/10 px-4 py-3 text-sm text-white outline-none transition backdrop-blur-xl hover:border-white/15 focus:border-cyan-300/35 focus:ring-1 focus:ring-cyan-300/15"
      >
        <option value="">Sélectionner…</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#041224]">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Textarea({
  label,
  hint,
  error,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
  error?: string;
}) {
  const id = (props.id || props.name || label).toString();
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm text-white/85 mb-2">
        {label}
      </label>
      {hint ? <p className="mb-2 text-xs text-white/50">{hint}</p> : null}
      <textarea
        {...props}
        id={id}
        rows={6}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full rounded-2xl bg-white/6 border px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition backdrop-blur-xl",
          error
            ? "border-cyan-300/60 ring-1 ring-cyan-300/20"
            : "border-white/10 hover:border-white/15 focus:border-cyan-300/35 focus:ring-1 focus:ring-cyan-300/15"
        )}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-cyan-200">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Feedback({ type, text }: { type: "error" | "success"; text: string }) {
  return (
    <div
      className={[
        "rounded-2xl border px-4 py-3 backdrop-blur-xl",
        type === "error"
          ? "border-cyan-300/35 bg-cyan-300/10"
          : "border-white/10 bg-white/6",
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      <p className="text-sm text-white/90">{text}</p>
    </div>
  );
}
