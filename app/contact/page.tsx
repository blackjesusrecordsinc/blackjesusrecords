"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import HeroCineSlider from "@/components/HeroCineSlider";

/* =========================
   Types
========================= */
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

type FieldErrors = Partial<Record<keyof FormState, string>>;

/* =========================
   Constants
========================= */
const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  location: "",
  budget: "",
  message: "",
};

const SERVICE_OPTIONS = [
  "Production vidéo",
  "Shooting photo",
  "Post-production",
  "Réseaux sociaux",
  "Site web",
  "Stratégie / accompagnement",
  "Autre",
] as const;

const QUICK_BRIEFS = [
  { title: "Clip / vidéo", desc: "Style, références, durée, plateforme, lieu + date." },
  { title: "Shooting photo", desc: "Type, rendu souhaité, nombre d’images, lieu." },
  { title: "Post-production", desc: "Durée finale, rushs dispo, objectifs, deadline." },
] as const;

/* =========================
   Motion
========================= */
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* =========================
   UI tokens (tu gardes ton design)
========================= */
const UI = {
  pill:
    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full " +
    "bg-primary/10 border border-primary/25 shadow-[0_0_40px_rgba(245,197,66,0.12)]",

  card:
    "rounded-2xl border border-white/10 bg-white/6 p-6 " +
    "shadow-[0_18px_60px_rgba(0,8,22,0.35)] backdrop-blur-sm md:backdrop-blur-xl",

  btnPrimary:
    "group relative px-7 py-3 rounded-lg bg-primary text-black font-semibold overflow-hidden transition " +
    "hover:scale-[1.02] active:scale-95 shadow-[0_14px_52px_rgba(0,8,22,0.45)]",

  btnPrimaryGlow:
    "absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity",

  btnSecondary:
    "px-7 py-3 rounded-lg border border-white/20 text-white font-medium " +
    "hover:border-primary hover:text-white transition",

  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",
} as const;

/* =========================
   Helpers
========================= */
function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function isValidEmail(v: string) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v.trim());
}

function buildBriefTemplate(serviceLabel: string) {
  const base =
    "Objectif :\n- \n\nRéférences (liens) :\n- \n\nPlateforme cible :\n- (YouTube / Reels / TikTok / Shorts / Site)\n\nLivrables :\n- \n\nDélais :\n- \n\nNotes :\n- ";

  if (!serviceLabel) return base;

  const s = serviceLabel.toLowerCase();

  if (s.includes("post")) {
    return (
      "Objectif :\n- \n\nRushs :\n- (caméra / drone / audio séparé ?)\n\nDurée finale :\n- \n\nFormats :\n- (16:9 / 9:16 / 1:1)\n\nRéférences (liens) :\n- \n\nDeadline :\n- \n\nNotes :\n- "
    );
  }

  if (s.includes("photo")) {
    return (
      "Type de séance :\n- (portrait / corporate / food / couple)\n\nRendu souhaité :\n- (clean / editorial / ciné)\n\nNombre d’images :\n- \n\nLieu :\n- \n\nRéférences (liens) :\n- \n\nDeadline :\n- \n\nNotes :\n- "
    );
  }

  if (s.includes("vidéo") || s.includes("video")) {
    return (
      "Type :\n- (clip / corporate / événement / pub)\n\nDurée :\n- \n\nPlateforme :\n- \n\nLieu + date :\n- \n\nRéférences (liens) :\n- \n\nLivrables :\n- (YouTube + vertical, etc.)\n\nNotes :\n- "
    );
  }

  return base;
}

function computeErrors(form: FormState): FieldErrors {
  const e: FieldErrors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  if (!name) e.name = "Ton nom est requis.";
  if (!email) e.email = "Ton email est requis.";
  else if (!isValidEmail(email)) e.email = "Entre un email valide (ex. nom@domaine.com).";

  if (!message) e.message = "Écris un message pour qu’on comprenne ton besoin.";
  else if (message.length < 20) e.message = "Ajoute un peu de contexte (minimum 20 caractères).";

  return e;
}

/* =========================
   Page
========================= */
export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [isSending, setIsSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const firstErrorRef = useRef<HTMLDivElement | null>(null);

  const errors = useMemo(() => computeErrors(form), [form]);
  const hasErrors = Object.keys(errors).length > 0;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const applyQuickBrief = useCallback((briefTitle: string) => {
    setSuccessMsg(null);
    setErrorMsg(null);

    // mapping : le 1er bouton "Clip / vidéo" = service "Production vidéo"
    const serviceLabel = briefTitle === "Clip / vidéo" ? "Production vidéo" : briefTitle;

    setForm((prev) => ({
      ...prev,
      service: serviceLabel,
      message: prev.message.trim().length ? prev.message : buildBriefTemplate(serviceLabel),
    }));

    setTimeout(() => document.getElementById("message")?.focus?.(), 0);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSuccessMsg(null);
      setErrorMsg(null);

      if (hasErrors) {
        setErrorMsg("Corrige les champs requis, puis renvoie.");
        setTimeout(
          () => firstErrorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
          0
        );
        return;
      }

      setIsSending(true);
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
          setErrorMsg(data?.error || "Une erreur est survenue. Réessaie.");
          return;
        }

        setSuccessMsg("Message reçu. On analyse ton brief et on te répond rapidement.");
        setForm(INITIAL_FORM);
      } catch {
        setErrorMsg("Connexion impossible. Réessaie un peu plus tard.");
      } finally {
        setIsSending(false);
      }
    },
    [form, hasErrors]
  );

  return (
    <main className="min-h-[calc(100vh-var(--nav-h))]">
      {/* HERO */}
      <section className="relative min-h-[62vh] flex items-center overflow-hidden">
        {/* Desktop slider */}
        <div className="hidden md:block absolute inset-0">
          <HeroCineSlider
            count={5}
            ext=".jpg"
            intervalMs={10000}
            darkness={0.62}
            vignette={0.4}
            glow={0.06}
            grain={0.03}
          />
        </div>

        {/* Mobile fallback */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "url('/work/01.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        {/* Overlay lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/70" />

        <div className="relative max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={item} className={UI.pill}>
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-white/85">Contact</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight"
            >
              Parle-nous de ton{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                projet
              </span>
              .
            </motion.h1>

            <motion.p variants={item} className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
              Plus ton brief est clair, plus notre réponse l’est. Clip, photo, post-prod, web ou stratégie : on cadre le
              scope, les délais et les livrables.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
              <Link href="/booking" className={UI.btnPrimary} aria-label="Réserver un appel">
                <span className={UI.btnPrimaryGlow} />
                <span className="relative z-10">Réserver un appel</span>
              </Link>
              <Link href="/services" className={UI.btnSecondary} aria-label="Voir les services">
                Voir les services
              </Link>
            </motion.div>

            <motion.div variants={item} className={UI.sep} />
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-10">
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
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Formulaire</h2>
                  <p className="mt-2 text-sm md:text-base text-white/75 leading-relaxed">
                    Va à l’essentiel. Si tu veux gagner du temps, utilise un modèle de brief en un clic.
                  </p>
                </div>
                <span className="shrink-0 hidden sm:inline-flex items-center rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-white/70">
                  Réponse rapide
                </span>
              </div>

              {/* QUICK BRIEFS */}
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {QUICK_BRIEFS.map((x) => (
                  <button
                    key={x.title}
                    type="button"
                    onClick={() => applyQuickBrief(x.title)}
                    className="group rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-left transition hover:border-primary/35 hover:bg-white/8"
                  >
                    <p className="text-sm font-semibold text-white">
                      {x.title} <span className="text-primary">→</span>
                    </p>
                    <p className="mt-1 text-xs text-white/60 leading-relaxed">{x.desc}</p>
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field
                    label="Nom complet *"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    autoComplete="tel"
                    placeholder="Optionnel"
                  />
                  <Select
                    label="Type de service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    options={[...SERVICE_OPTIONS]}
                    hint="Si tu sais déjà ce que tu veux."
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <Field label="Date souhaitée" type="date" name="date" value={form.date} onChange={handleChange} />
                  <div className="md:col-span-2">
                    <Field
                      label="Lieu"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="Ville, studio, extérieur…"
                    />
                  </div>
                </div>

                <Field
                  label="Budget approximatif"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="Ex. 800 $, 1500 $, à discuter…"
                />

                <Textarea
                  label="Message *"
                  name="message"
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  error={errors.message}
                  placeholder="Objectif, références, plateforme cible, délais…"
                />

                <div ref={firstErrorRef}>
                  {errorMsg && <Feedback type="error" text={errorMsg} />}
                  {successMsg && <Feedback type="success" text={successMsg} />}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <button
                    type="submit"
                    disabled={isSending || hasErrors}
                    className={cn(UI.btnPrimary, (isSending || hasErrors) && "opacity-70 cursor-not-allowed")}
                  >
                    <span className={UI.btnPrimaryGlow} />
                    <span className="relative z-10">{isSending ? "Envoi…" : "Envoyer le message"}</span>
                  </button>

                  <p className="text-xs text-white/55 leading-relaxed">
                    En envoyant, tu acceptes qu’on te recontacte pour clarifier le scope et les livrables.
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
              <h3 className="text-xl font-semibold tracking-tight text-white">Notre méthode</h3>
              <p className="mt-2 text-sm text-white/75 leading-relaxed">
                On cadre, on produit, on livre — avec une direction artistique cohérente.
              </p>

              <ul className="mt-5 space-y-3 text-sm text-white/85">
                {[
                  "Lecture du besoin & des objectifs",
                  "Validation faisabilité & disponibilités",
                  "Proposition claire (scope, livrables, délais)",
                  "Production + livraison prête à publier",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 h-px bg-white/10" />

              <p className="mt-5 text-sm text-white/75">
                Pour un créneau direct :{" "}
                <Link href="/booking" className="text-primary font-semibold hover:opacity-90 transition">
                  Réservation
                </Link>
                .
              </p>
            </motion.div>

            <motion.div
              variants={item}
              className="rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-sm md:backdrop-blur-xl"
            >
              <h3 className="text-lg font-semibold text-white">Pour aller plus vite</h3>
              <p className="mt-2 text-sm text-white/75 leading-relaxed">
                Mets 2–3 infos concrètes : on pourra te répondre proprement, sans aller-retour.
              </p>
              <div className="mt-4 space-y-2">
                {[
                  "1–2 liens de référence (YouTube / Instagram / TikTok)",
                  "Plateforme cible (YouTube, Reels, TikTok…)",
                  "Deadline + budget (même approximatif)",
                  "Livrables attendus (formats + durée)",
                ].map((line) => (
                  <div key={line} className="flex gap-3 text-sm text-white/85">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="leading-relaxed">{line}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA FINAL */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/6 p-8 md:p-10 shadow-[0_18px_60px_rgba(0,8,22,0.35)] backdrop-blur-sm md:backdrop-blur-xl">
          <p className="text-2xl md:text-3xl font-bold text-white">Réponse rapide, cadre propre.</p>
          <p className="mt-2 text-white/75 leading-relaxed">Les projets bien briefés sont traités en priorité.</p>
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
    </main>
  );
}

/* =========================
   UI atoms (inchangés, juste clean)
========================= */
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
          "w-full rounded-2xl bg-white/6 border px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition backdrop-blur-sm md:backdrop-blur-xl",
          error
            ? "border-primary/60 ring-1 ring-primary/20"
            : "border-white/10 hover:border-white/15 focus:border-primary/35 focus:ring-1 focus:ring-primary/15"
        )}
      />

      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-primary">
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
        className="w-full rounded-2xl bg-white/6 border border-white/10 px-4 py-3 text-sm text-white outline-none transition backdrop-blur-sm md:backdrop-blur-xl hover:border-white/15 focus:border-primary/35 focus:ring-1 focus:ring-primary/15"
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
          "w-full rounded-2xl bg-white/6 border px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition backdrop-blur-sm md:backdrop-blur-xl",
          error
            ? "border-primary/60 ring-1 ring-primary/20"
            : "border-white/10 hover:border-white/15 focus:border-primary/35 focus:ring-1 focus:ring-primary/15"
        )}
      />

      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-primary">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Feedback({ type, text }: { type: "error" | "success"; text: string }) {
  const isError = type === "error";

  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3 backdrop-blur-sm md:backdrop-blur-xl",
        isError ? "border-primary/35 bg-primary/10" : "border-white/10 bg-white/6"
      )}
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
    >
      <p className="text-sm text-white/90">{text}</p>
    </div>
  );
}
