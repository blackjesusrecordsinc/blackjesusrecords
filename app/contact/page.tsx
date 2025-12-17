// app/contact/page.tsx
"use client";

import React, { useState } from "react";
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

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Une erreur est survenue. Réessaie.");
        return;
      }

      setSuccess(
        "Message bien reçu. On analyse ton projet et on te répond rapidement."
      );
      setForm(initialForm);
    } catch {
      setError("Erreur de connexion. Réessaie plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white font-sans">
      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
          <span className="text-[11px] font-semibold tracking-[0.25em] text-white/70 uppercase">
            Contact
          </span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight">
          Parle-nous de ton{" "}
          <span className="text-[#F5C518]">projet</span>
        </h1>

        <p className="mt-5 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Plus ton brief est clair, plus notre réponse sera précise.
          Clip, photo, post-production, site web ou stratégie globale — on t’oriente
          avec une approche professionnelle.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* FORM */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-white/10 bg-[#14141A] p-7">
              <h2 className="text-2xl font-semibold">Formulaire de contact</h2>
              <p className="mt-2 text-sm md:text-base text-white/70">
                Les champs essentiels suffisent. Tu peux aller droit au but.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                {/* NAME / EMAIL */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Field
                    label="Nom complet *"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <Field
                    label="Email *"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* PHONE / SERVICE */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Field
                    label="Téléphone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />

                  <Select
                    label="Type de service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    options={[
                      "Production vidéo",
                      "Shooting photo",
                      "Post-production",
                      "Réseaux sociaux",
                      "Site web",
                      "Stratégie / accompagnement",
                      "Autre",
                    ]}
                  />
                </div>

                {/* DATE / LOCATION */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Field
                    label="Date souhaitée"
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                  />
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

                {/* BUDGET */}
                <Field
                  label="Budget approximatif"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="Ex. 800 $, 1500 $, à discuter…"
                />

                {/* MESSAGE */}
                <Textarea
                  label="Message *"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Objectif, références, plateforme cible, délais…"
                />

                {/* FEEDBACK */}
                {error && (
                  <Feedback type="error" text={error} />
                )}
                {success && (
                  <Feedback type="success" text={success} />
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-8 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "Envoi…" : "Envoyer le message"}
                </button>
              </form>
            </div>
          </div>

          {/* SIDE INFO */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-[#14141A] p-7 space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Notre approche</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  Chaque demande est analysée avant validation.
                </p>
              </div>

              <ul className="space-y-3 text-sm text-white/80">
                {[
                  "Analyse du besoin & des objectifs",
                  "Faisabilité & disponibilité",
                  "Proposition claire (scope, délais)",
                  "Production & livraison propre",
                ].map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>

              <div className="h-px bg-white/10" />

              <p className="text-sm text-white/70">
                Pour une date précise et un créneau direct, passe par{" "}
                <Link href="/booking" className="text-[#F5C518] font-semibold">
                  Réservation
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t border-white/10 bg-[#121216]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
              Réponse <span className="text-[#F5C518]">rapide</span>, cadre clair
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/70">
              Les projets bien structurés sont traités en priorité.
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

/* ====== UI ATOMS ====== */

function Field(props: any) {
  return (
    <div>
      <label className="block text-sm text-white/80 mb-2">
        {props.label}
      </label>
      <input
        {...props}
        className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
      />
    </div>
  );
}

function Select({ label, options, ...props }: any) {
  return (
    <div>
      <label className="block text-sm text-white/80 mb-2">
        {label}
      </label>
      <select
        {...props}
        className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
      >
        <option value="">Sélectionner…</option>
        {options.map((o: string) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Textarea(props: any) {
  return (
    <div>
      <label className="block text-sm text-white/80 mb-2">
        {props.label}
      </label>
      <textarea
        {...props}
        rows={5}
        className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
      />
    </div>
  );
}

function Feedback({ type, text }: { type: "error" | "success"; text: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-sm">{text}</p>
    </div>
  );
}
