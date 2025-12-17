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
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

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

const QUICK_TEMPLATES = [
  {
    id: "clip",
    title: "Clip musical",
    hint: "YouTube + vertical",
    message:
      "Objectif:\n- \n\nStyle / références (liens):\n- \n\nLieu + date:\n- \n\nDurée finale:\n- \n\nLivrables:\n- 16:9 (YouTube)\n- 9:16 (Reels/TikTok)\n\nBudget:\n- \n\nNotes:\n- ",
  },
  {
    id: "event",
    title: "Événement",
    hint: "Afternoon / soirée",
    message:
      "Type d’événement:\n- \n\nLieu + date + horaires:\n- \n\nMoments clés à capter:\n- \n\nLivrables:\n- Aftermovie\n- Highlights (vertical)\n\nRéférences (liens):\n- \n\nBudget:\n- \n\nNotes:\n- ",
  },
  {
    id: "post",
    title: "Post-production",
    hint: "Montage + look",
    message:
      "Type:\n- (montage / color / audio)\n\nDurée finale:\n- \n\nFootage:\n- Caméra / drone / audio séparé ?\n\nFormats:\n- 16:9 / 9:16 / 1:1\n\nDeadline:\n- \n\nRéférences (liens):\n- \n\nNotes:\n- ",
  },
] as const;

export default function BookingPage() {
  const [status, setStatus] = useState<Status>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement | null>(null);
  const feedbackRef = useRef<HTMLDivElement | null>(null);

  const services = useMemo(() => [...SERVICES], []);

  const validate = useCallback((p: BookingPayload) => {
    const e: Record<string, string> = {};

    if (!p.name || p.name.length < 2) e.name = "Entre un nom valide.";
    if (!p.email || !isEmail(p.email)) e.email = "Entre un email valide.";
    if (p.message && p.message.trim().length < 20)
      e.message = "Ajoute un peu de contexte (min. 20 caractères).";
    if (!p.message) e.message = "Décris ton projet (champ requis).";

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
      msgEl.value = msgEl.value.trim().length ? msgEl.value : message;
      msgEl.focus();
    }
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    setFieldErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload: BookingPayload = {
      name: toStr(formData.get("name")),
      email: toStr(formData.get("email")),
      phone: toStr(formData.get("phone")),
      service: toStr(formData.get("service")),
      date: toStr(formData.get("date")),
      location: toStr(formData.get("location")),
      budget: toStr(formData.get("budget")),
      message: toStr(formData.get("message")),
    };

    const errs = validate(payload);
    if (Object.keys(errs).length) {
      setStatus("error");
      setFieldErrors(errs);
      setErrorMsg("Corrige les champs requis (en jaune) et renvoie.");
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
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Erreur de connexion. Réessaie plus tard.");
      setTimeout(() => feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
    }
  }, [validate]);

  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white font-sans">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-44 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#F5C518]/10 blur-3xl" />
          <div className="absolute -bottom-56 right-8 h-[460px] w-[460px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,197,24,0.08),transparent_55%)]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-10 relative">
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
            Donne-nous le minimum utile. On revient avec une proposition claire : disponibilité, logistique,
            approche créative et délais.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Tu veux un devis complet ?
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Voir les services
            </Link>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-white/10 bg-[#14141A] p-7 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    Infos projet
                  </div>
                  <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
                    Réservation rapide
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">
                    Astuce : clique un modèle “brief” pour aller vite (ça remplit le champ détails).
                  </p>
                </div>

                <span className="shrink-0 hidden sm:inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Priorité aux dates proches
                </span>
              </div>

              {/* Quick templates */}
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {QUICK_TEMPLATES.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    onClick={() => applyTemplate(x.title, x.message)}
                    className="group rounded-2xl border border-white/10 bg-[#0F0F12] px-4 py-4 text-left transition hover:border-white/20 hover:bg-[#111116]"
                  >
                    <p className="text-sm font-semibold">
                      {x.title} <span className="text-[#F5C518]">→</span>
                    </p>
                    <p className="mt-1 text-xs text-white/55 leading-relaxed">{x.hint}</p>
                  </button>
                ))}
              </div>

              <form ref={formRef} className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field
                    label="Nom complet *"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Ex. Emmanuel Kibanda"
                    error={fieldErrors.name}
                  />
                  <Field
                    label="Email *"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Ex. contact@..."
                    error={fieldErrors.email}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field
                    label="Téléphone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Optionnel"
                  />

                  <Select
                    label="Type de service"
                    name="service"
                    defaultValue=""
                    options={services}
                    hint="Si tu hésites, laisse vide."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Date souhaitée" name="date" type="date" />
                  <Field
                    label="Lieu"
                    name="location"
                    type="text"
                    placeholder="Ex. Lévis, Québec, Montréal..."
                  />
                </div>

                <Field
                  label="Budget approximatif"
                  name="budget"
                  type="text"
                  placeholder="Ex. 800 $, 1500 $, à discuter…"
                  hint="Même approximatif → ça accélère la proposition."
                />

                <Textarea
                  label="Détails du projet *"
                  name="message"
                  rows={6}
                  required
                  placeholder="Objectif, style, références, plateformes, délais…"
                  error={fieldErrors.message}
                  hint="Ajoute 1 lien de référence (YouTube/IG) + la plateforme finale (YouTube, TikTok, etc.)."
                />

                <div ref={feedbackRef}>
                  {status === "error" && (
                    <Feedback type="error" text={`❌ ${errorMsg || "Une erreur est survenue."}`} />
                  )}
                  {status === "success" && (
                    <Feedback
                      type="success"
                      text="✅ Demande envoyée. Merci — on te revient rapidement pour confirmer."
                    />
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
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

          {/* Right */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#14141A] p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <h3 className="text-xl font-semibold tracking-tight">Ce qu’on vérifie</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                On te répond avec une proposition claire et réaliste selon tes objectifs.
              </p>

              <div className="mt-5 space-y-3 text-sm text-white/80">
                {[
                  "Disponibilité & logistique (date / lieu)",
                  "Type de contenu & durée",
                  "Plateforme cible (YouTube, TikTok, etc.)",
                  "Style / références visuelles",
                  "Délais de livraison",
                ].map((t) => (
                  <div key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    <span className="leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 h-px w-full bg-white/10" />

              <p className="mt-5 text-sm text-white/70 leading-relaxed">
                Liens Drive/Dropbox/YouTube ? Mets-les dans “Détails du projet”.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#121216] p-7">
              <h3 className="text-lg font-semibold">Petit rappel</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Réservation = cadrage rapide + confirmation de créneau.
              </p>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                Si tu veux un chiffrage détaillé (scope, livrables, options), passe par{" "}
                <Link href="/contact" className="text-[#F5C518] font-semibold hover:opacity-90 transition">
                  Contact
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-white/10 bg-[#121216]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-tight">
              Besoin d’une réponse <span className="text-[#F5C518]">rapide</span> ?
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
              Si c’est urgent, Contact est le plus efficace. On priorise les dates proches.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Contact
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-6 py-3 text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518] hover:text-black"
            >
              Voir les services
            </Link>
          </div>
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
