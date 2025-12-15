// app/contact/page.tsx
"use client";

import React, { useState } from "react";

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

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    location: "",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Une erreur est survenue.");
        return;
      }

      setSuccess("Merci. Ton message a bien été envoyé, on te répond rapidement.");
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        location: "",
        budget: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion. Réessaie plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white font-sans">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
          <p className="text-[11px] font-semibold tracking-[0.25em] text-white/70 uppercase">
            Contact
          </p>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight">
          Parlez-nous de votre{" "}
          <span className="text-[#F5C518]">projet</span>
        </h1>

        <p className="mt-5 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Décris ton idée, ton besoin ou ton objectif. Que ce soit un clip, un événement,
          de la post-production ou un projet artistique, on te répond avec une approche claire.
        </p>
      </section>

      {/* Form */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Form card */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-white/10 bg-[#1A1A1F] p-7">
              <h2 className="text-2xl font-semibold">Formulaire de contact</h2>
              <p className="mt-2 text-sm md:text-base text-white/70">
                Plus les infos sont claires, plus notre réponse sera précise.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                {/* Name + Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/80 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/80 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                    />
                  </div>
                </div>

                {/* Phone + Service */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/80 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/80 mb-2">
                      Type de service
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
                    >
                      <option value="">Sélectionner…</option>
                      <option value="Clip musical">Clip musical</option>
                      <option value="Événement">Événement</option>
                      <option value="Réseaux sociaux">Contenu réseaux sociaux</option>
                      <option value="Post-production">Post-production</option>
                      <option value="Label">Label / accompagnement artiste</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                </div>

                {/* Date + Location */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-white/80 mb-2">
                      Date souhaitée
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-white/80 mb-2">
                      Lieu
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="Ville, salle, studio, extérieur…"
                      className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm text-white/80 mb-2">
                    Budget approximatif
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    placeholder="Ex. 800$, 1500$, à discuter…"
                    className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-white/80 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Objectif, style, références, plateformes, délais…"
                    className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                  />
                </div>

                {/* Feedback */}
                {error && (
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-sm">{success}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-8 py-3 text-sm font-semibold text-black transition transform hover:scale-105 duration-200 disabled:opacity-50"
                >
                  {loading ? "Envoi en cours…" : "Envoyer le message"}
                </button>
              </form>
            </div>
          </div>

          {/* Info card */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-[#1A1A1F] p-7">
              <h3 className="text-xl font-semibold">Comment on travaille</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Chaque projet est analysé avant confirmation.
              </p>

              <div className="mt-5 space-y-3 text-sm text-white/80">
                {[
                  "Analyse du besoin & des objectifs",
                  "Disponibilité & faisabilité",
                  "Approche créative proposée",
                  "Délais & livraison",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 h-px w-full bg-white/10" />

              <p className="mt-5 text-sm text-white/70">
                Pour une réservation directe avec date précise, passe par la page{" "}
                <a href="/booking" className="text-[#F5C518] font-semibold">
                  Réservation
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-white/10 bg-[#121216]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
              On te répond{" "}
              <span className="text-[#F5C518]">rapidement</span>
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/70">
              Tous les messages sont lus. Les projets clairs et structurés sont prioritaires.
            </p>
          </div>

          <a
            href="/services"
            className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-6 py-3 text-sm font-semibold text-[#F5C518] transition transform hover:scale-105 duration-200 hover:bg-[#F5C518] hover:text-black"
          >
            Voir les services
          </a>
        </div>
      </section>
    </main>
  );
}
