// app/booking/page.tsx
"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";

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

function toStr(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}
function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

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
      "Objectif:\n- \n\nStyle / références (liens):\n- \n\nLieu + date:\n- \n\nLivrables:\n- 16:9 (YouTube)\n- 9:16 (Reels/TikTok)\n\nBudget:\n- \n\nNotes:\n- ",
  },
  {
    id: "event",
    title: "Événement",
    hint: "Highlights + aftermovie",
    message:
      "Type d’événement:\n- \n\nLieu + date + horaires:\n- \n\nMoments clés:\n- \n\nLivrables:\n- Aftermovie\n- Highlights (vertical)\n\nRéférences (liens):\n- \n\nBudget:\n- \n\nNotes:\n- ",
  },
  {
    id: "post",
    title: "Post-production",
    hint: "Montage / look / audio",
    message:
      "Type:\n- montage / color / audio\n\nDurée finale:\n- \n\nFormats:\n- 16:9 / 9:16 / 1:1\n\nDeadline:\n- \n\nRéférences (liens):\n- \n\nNotes:\n- ",
  },
] as const;

export default function BookingPage() {
  const [status, setStatus] = useState<Status>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement | null>(null);
  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const services = useMemo(() => [...SERVICES], []);

  const validate = useCallback((p: BookingPayload) => {
    const e: Record<string, string> = {};
    if (!p.name || p.name.length < 2) e.name = "Nom requis.";
    if (!p.email || !isEmail(p.email)) e.email = "Email invalide.";
    if (!p.message || p.message.trim().length < 20) e.message = "Détails requis (min. 20 caractères).";
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
    if (msgEl) {
      msgEl.value = msgEl.value.trim() ? msgEl.value : message;
      msgEl.focus();
    }
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    setFieldErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);

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
      setErrorMsg("Corrige les champs requis et renvoie.");
      setTimeout(() => feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
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
        return;
      }

      setStatus("success");
      form.reset();
      setTimeout(() => feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
    } catch {
      setStatus("error");
      setErrorMsg("Erreur de connexion. Réessaie plus tard.");
      setTimeout(() => feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
    }
  }, [validate]);

  return (
    <main className="min-h-screen px-6 pt-10 pb-20">
      <section className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
          <p className="text-[11px] font-semibold tracking-[0.25em] text-white/70 uppercase">
            Réservation
          </p>
        </div>

        <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
          Réserver une <span className="text-[#F5C518]">date</span>.
        </h1>

        <p className="mt-5 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Envoie l’essentiel. On revient avec une proposition claire : disponibilité, logistique, livrables et délais.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    Réservation rapide
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">
                    Clique un modèle pour remplir le brief en 10 secondes.
                  </p>
                </div>
                <span className="shrink-0 hidden sm:inline-flex items-center rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70">
                  Réponse 24–48h
                </span>
              </div>

              {/* Templates */}
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {QUICK.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    onClick={() => applyTemplate(x.title, x.message)}
                    className="group rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-left transition hover:border-white/20 hover:bg-white/5"
                  >
                    <p className="text-sm font-semibold">
                      {x.title} <span className="text-[#F5C518]">→</span>
                    </p>
                    <p className="mt-1 text-xs text-white/55 leading-relaxed">{x.hint}</p>
                  </button>
                ))}
              </div>

              <form ref={formRef} className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
                {/* Honeypot hidden */}
                <input
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Nom complet *" name="name" placeholder="Ex. Emmanuel Kibanda" error={fieldErrors.name} />
                  <Field label="Email *" name="email" type="email" placeholder="Ex. contact@..." error={fieldErrors.email} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Téléphone" name="phone" placeholder="Optionnel" />
                  <Select label="Type de service" name="service" options={services} hint="Si tu hésites, laisse vide." />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Date souhaitée" name="date" type="date" />
                  <Field label="Lieu" name="location" placeholder="Ex. Lévis, Québec, Montréal..." />
                </div>

                <Field label="Budget (approx.)" name="budget" placeholder="Ex. 800 $, 1500 $, à discuter…" />

                <Textarea
                  label="Détails du projet *"
                  name="message"
                  rows={6}
                  placeholder="Objectif, style, références, plateforme finale, délais…"
                  error={fieldErrors.message}
                  hint="Ajoute 1 lien (YouTube/IG) + la plateforme finale (YouTube, TikTok, etc.)."
                />

                <div ref={feedbackRef}>
                  {status === "error" && (
                    <Feedback type="error" text={`❌ ${errorMsg || "Erreur. Réessaie."}`} />
                  )}
                  {status === "success" && (
                    <Feedback type="success" text="✅ Demande envoyée. On te revient rapidement." />
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-7 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
                  >
                    {status === "loading" ? "Envoi…" : "Envoyer la demande"}
                  </button>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-7 py-3 text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518] hover:text-black"
                  >
                    Passer par Contact
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Side */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <h3 className="text-xl font-semibold tracking-tight">Ce qu’on confirme</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Une proposition réaliste selon ton objectif et la plateforme finale.
              </p>

              <div className="mt-5 space-y-3 text-sm text-white/80">
                {[
                  "Disponibilité & logistique (date / lieu)",
                  "Style & références visuelles",
                  "Livrables (YouTube / Reels / TikTok)",
                  "Délais de livraison",
                ].map((t) => (
                  <div key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    <span className="leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-7">
              <h3 className="text-lg font-semibold">Devis détaillé</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Pour un chiffrage complet (options, scope, versions), utilise Contact.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ===== atoms ===== */
function Field({
  label,
  hint,
  error,
  className,
  type = "text",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
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
        type={type}
        aria-invalid={Boolean(error) || undefined}
        className={[
          "w-full rounded-2xl bg-black/20 border px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition",
          error ? "border-[#F5C518]/60 ring-1 ring-[#F5C518]/20" : "border-white/10 hover:border-white/15 focus:border-white/20 focus:ring-1 focus:ring-white/10",
        ].join(" ")}
      />
      {error ? <p className="mt-2 text-xs text-[#F5C518]">{error}</p> : null}
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
  className?: string;
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
        className="w-full rounded-2xl bg-black/20 border border-white/10 px-4 py-3 text-sm text-white outline-none transition hover:border-white/15 focus:border-white/20 focus:ring-1 focus:ring-white/10"
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
  className?: string;
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
        aria-invalid={Boolean(error) || undefined}
        className={[
          "w-full rounded-2xl bg-black/20 border px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition",
          error ? "border-[#F5C518]/60 ring-1 ring-[#F5C518]/20" : "border-white/10 hover:border-white/15 focus:border-white/20 focus:ring-1 focus:ring-white/10",
        ].join(" ")}
      />
      {error ? <p className="mt-2 text-xs text-[#F5C518]">{error}</p> : null}
    </div>
  );
}

function Feedback({ type, text }: { type: "error" | "success"; text: string }) {
  return (
    <div
      className={[
        "rounded-2xl border px-4 py-3",
        type === "error" ? "border-[#F5C518]/35 bg-[#F5C518]/10" : "border-white/10 bg-white/5",
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      <p className="text-sm text-white/90">{text}</p>
    </div>
  );
}
