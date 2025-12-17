// app/contact/page.tsx
"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";

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
  {
    t: "Clip / vidéo",
    d: "Style, références, durée, plateforme (YouTube / Reels), lieu + date.",
  },
  {
    t: "Shooting photo",
    d: "Type (portrait / corporate / food), rendu voulu, nombre d’images, lieu.",
  },
  {
    t: "Post-production",
    d: "Durée finale, footage dispo, objectifs, deadline, formats à livrer.",
  },
] as const;

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function buildPrefill(service: string) {
  const base =
    "Objectif:\n- \n\nRéférences (liens):\n- \n\nPlateforme cible:\n- (YouTube / Reels / TikTok / Shorts / Site)\n\nLivrables:\n- \n\nDélais:\n- \n\nNotes:\n- ";
  if (!service) return base;

  if (service.toLowerCase().includes("post")) {
    return (
      "Objectif:\n- \n\nFootage:\n- Caméra / drone / audio séparé ?\n\nDurée finale:\n- \n\nFormats:\n- 16:9 / 9:16 / 1:1\n\nRéférences (liens):\n- \n\nDeadline:\n- \n\nNotes:\n- "
    );
  }
  if (service.toLowerCase().includes("photo")) {
    return (
      "Type de séance:\n- (portrait / corporate / food / couple)\n\nRendu voulu:\n- (clean / editorial / ciné)\n\nNombre d’images:\n- \n\nLieu:\n- \n\nRéférences (liens):\n- \n\nDeadline:\n- \n\nNotes:\n- "
    );
  }
  if (service.toLowerCase().includes("vidéo") || service.toLowerCase().includes("video")) {
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
    // focus message after quickfill
    setTimeout(() => {
      document.getElementById("message")?.focus?.();
    }, 0);
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSuccess(null);
      setError(null);

      if (hasErrors) {
        setError("Vérifie les champs requis (en rouge) et renvoie.");
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
    <main className="min-h-screen bg-[#0B0B0E] text-white font-sans">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#F5C518]/10 blur-3xl" />
          <div className="absolute -bottom-48 left-12 h-[420px] w-[420px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,197,24,0.08),transparent_55%)]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-10 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] text-white/70 uppercase">
              Contact
            </span>
          </div>

          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Parle-nous de ton <span className="text-[#F5C518]">projet</span>.
          </h1>

          <p className="mt-5 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
            Un brief clair = une réponse claire. Clip, photo, post-production, site web ou stratégie :
            on te cadre le scope, les délais et les livrables.
          </p>

          {/* Quick actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Réserver un appel
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Voir les services
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* FORM */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-white/10 bg-[#14141A] p-7 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    Brief
                  </div>
                  <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
                    Formulaire de contact
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-white/70">
                    Va droit au but. Si tu manques d’idées, utilise un modèle “brief” en 1 clic.
                  </p>
                </div>

                <span className="shrink-0 hidden sm:inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Réponse rapide
                </span>
              </div>

              {/* quick fill */}
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {QUICK_PACKS.map((x) => (
                  <button
                    key={x.t}
                    type="button"
                    onClick={() => onQuickFill(x.t === "Clip / vidéo" ? "Production vidéo" : x.t)}
                    className="group rounded-2xl border border-white/10 bg-[#0F0F12] px-4 py-4 text-left transition hover:border-white/20 hover:bg-[#111116]"
                  >
                    <p className="text-sm font-semibold">
                      {x.t} <span className="text-[#F5C518] group-hover:opacity-90">→</span>
                    </p>
                    <p className="mt-1 text-xs text-white/55 leading-relaxed">{x.d}</p>
                  </button>
                ))}
              </div>

              <form onSubmit={onSubmit} className="mt-8 space-y-6" noValidate>
                {/* NAME / EMAIL */}
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

                {/* PHONE / SERVICE */}
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

                {/* DATE / LOCATION */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Field
                    label="Date souhaitée"
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={onChange}
                  />
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

                {/* BUDGET */}
                <Field
                  label="Budget approximatif"
                  name="budget"
                  value={form.budget}
                  onChange={onChange}
                  placeholder="Ex. 800 $, 1500 $, à discuter…"
                />

                {/* MESSAGE */}
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

                {/* FEEDBACK */}
                <div ref={firstErrorRef}>
                  {error && <Feedback type="error" text={error} />}
                  {success && <Feedback type="success" text={success} />}
                </div>

                {/* SUBMIT */}
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative inline-flex items-center justify-center rounded-full bg-[#F5C518] px-8 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
                  >
                    {loading ? "Envoi…" : "Envoyer le message"}
                  </button>

                  <p className="text-xs text-white/50 leading-relaxed">
                    En envoyant, tu acceptes qu’on te recontacte par email/téléphone pour clarifier le scope.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* SIDE */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#14141A] p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <h3 className="text-xl font-semibold tracking-tight">Notre approche</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                On ne “prend pas” un projet. On le cadre, on le produit, on le livre propre.
              </p>

              <ul className="mt-5 space-y-3 text-sm text-white/80">
                {[
                  "Analyse du besoin & des objectifs",
                  "Validation faisabilité & disponibilités",
                  "Proposition claire (scope, livrables, délais)",
                  "Production + livraison prête à publier",
                ].map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 h-px bg-white/10" />

              <p className="mt-5 text-sm text-white/70">
                Pour un créneau direct :{" "}
                <Link href="/booking" className="text-[#F5C518] font-semibold hover:opacity-90 transition">
                  Réservation
                </Link>
                .
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#121216] p-7">
              <h3 className="text-lg font-semibold">Info utile</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Plus ton message est précis, plus vite on peut te répondre.
              </p>
              <div className="mt-4 space-y-2">
                {[
                  "1–2 liens de référence (YouTube / Instagram / TikTok)",
                  "Plateforme cible (YouTube, Reels, TikTok…)",
                  "Deadline réelle + budget (même approximatif)",
                  "Livrables attendus (formats + durée)",
                ].map((i) => (
                  <div key={i} className="flex gap-3 text-sm text-white/80">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    <span className="leading-relaxed">{i}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t border-white/10 bg-[#121216]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-tight">
              Réponse <span className="text-[#F5C518]">rapide</span>, cadre clair
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/70">
              Les projets structurés sont traités en priorité.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-6 py-3 text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518] hover:text-black"
          >
            Voir les services
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ========= UI ATOMS ========= */

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
      <label htmlFor={id} className="block text-sm text-white/80 mb-2">
        {label}
      </label>
      {hint ? <p className="mb-2 text-xs text-white/45">{hint}</p> : null}
      <input
        {...props}
        id={id}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full rounded-2xl bg-[#0F0F12] border px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition",
          error
            ? "border-[#F5C518]/70 ring-1 ring-[#F5C518]/25"
            : "border-white/10 hover:border-white/15 focus:border-white/20 focus:ring-1 focus:ring-white/10"
        )}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-[#F5C518]">
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
      <label htmlFor={id} className="block text-sm text-white/80 mb-2">
        {label}
      </label>
      {hint ? <p className="mb-2 text-xs text-white/45">{hint}</p> : null}
      <select
        {...props}
        id={id}
        className="w-full rounded-2xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white outline-none transition hover:border-white/15 focus:border-white/20 focus:ring-1 focus:ring-white/10"
      >
        <option value="">Sélectionner…</option>
        {options.map((o) => (
          <option key={o} value={o}>
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
      <label htmlFor={id} className="block text-sm text-white/80 mb-2">
        {label}
      </label>
      {hint ? <p className="mb-2 text-xs text-white/45">{hint}</p> : null}
      <textarea
        {...props}
        id={id}
        rows={6}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full rounded-2xl bg-[#0F0F12] border px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition",
          error
            ? "border-[#F5C518]/70 ring-1 ring-[#F5C518]/25"
            : "border-white/10 hover:border-white/15 focus:border-white/20 focus:ring-1 focus:ring-white/10"
        )}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-[#F5C518]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Feedback({ type, text }: { type: "error" | "success"; text: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3",
        type === "error"
          ? "border-[#F5C518]/40 bg-[#F5C518]/10"
          : "border-white/10 bg-white/5"
      )}
      role="status"
      aria-live="polite"
    >
      <p className="text-sm text-white/90">{text}</p>
    </div>
  );
}
