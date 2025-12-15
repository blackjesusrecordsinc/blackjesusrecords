"use client";

import React, { useState } from "react";

export default function BookingPage() {
  const [status, setStatus] = useState<null | "loading" | "success" | "error">(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      date: formData.get("date"),
      location: formData.get("location"),
      budget: formData.get("budget"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erreur serveur");

      setStatus("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white antialiased">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
            Réservation
          </p>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Réserver une <span className="text-[#F5C518]">date</span>
        </h1>

        <p className="mt-5 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Donne-nous quelques informations sur ton projet (clip, événement, contenu social, etc.).
          On te contacte ensuite pour confirmer les détails, la disponibilité et la meilleure approche.
        </p>
      </section>

      {/* Form */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: form card */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-white/10 bg-[#1A1A1F] p-7 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold tracking-wide">Informations du projet</h2>
              <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">
                Plus tu es précis, plus on peut te répondre vite avec une proposition claire.
              </p>

              <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                  <label className="block text-sm text-white/80 mb-2 uppercase">
                    Nom complet *
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#F5C518]"
                    placeholder="Ex. Emmanuel Kibanda"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/80 mb-2 uppercase">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#F5C518]"
                      placeholder="ex. contact@..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/80 mb-2 uppercase">
                      Téléphone
                    </label>
                    <input
                      name="phone"
                      type="text"
                      className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#F5C518]"
                      placeholder="(optionnel)"
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm text-white/80 mb-2 uppercase">
                    Type de service
                  </label>
                  <input
                    name="service"
                    type="text"
                    className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#F5C518]"
                    placeholder="Clip, événement, réseaux sociaux, site web..."
                  />
                </div>

                {/* Date + Location */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/80 mb-2 uppercase">
                      Date souhaitée
                    </label>
                    <input
                      name="date"
                      type="date"
                      className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-[#F5C518]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/80 mb-2 uppercase">
                      Lieu (ville, salle, etc.)
                    </label>
                    <input
                      name="location"
                      type="text"
                      className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#F5C518]"
                      placeholder="Ex. Lévis, Québec, Montréal..."
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm text-white/80 mb-2 uppercase">
                    Budget approximatif
                  </label>
                  <input
                    name="budget"
                    type="text"
                    className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#F5C518]"
                    placeholder="Ex. 800$, 1500$, à discuter..."
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-white/80 mb-2 uppercase">
                    Détails du projet *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#F5C518]"
                    placeholder="Objectif, style, références, plateformes, délais..."
                  />
                  <p className="mt-2 text-xs text-white/50">
                    Astuce : ajoute une référence (YouTube/IG) et la plateforme finale (YouTube, TikTok, etc.).
                  </p>
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-7 py-3 text-sm font-semibold text-black transform transition-transform hover:scale-105 disabled:opacity-50"
                  >
                    {status === "loading" ? "Envoi en cours..." : "Envoyer la demande"}
                  </button>

                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-7 py-3 text-sm font-semibold text-[#F5C518] transition-colors hover:bg-[#F5C518] hover:text-black"
                  >
                    Passer par Contact
                  </a>
                </div>

                {/* Status messages */}
                {status === "success" && (
                  <div className="mt-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 shadow-md">
                    <p className="text-sm text-white">
                      ✅ Demande envoyée. Merci — on te revient pour confirmer la date et les détails.
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div className="mt-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 shadow-md">
                    <p className="text-sm text-white">
                      ❌ Une erreur est survenue. Réessaie plus tard ou écris directement par email.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right: info card */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-white/10 bg-[#1A1A1F] p-7 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold">Ce qu’on vérifie</h3>
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
                Tu as déjà un brief ou des liens (Google Drive / Dropbox / YouTube) ?
                Mets-les dans “Détails du projet”.
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
              Besoin d’une réponse{" "}
              <span className="text-[#F5C518]">rapide</span> ?
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
              Si c’est urgent, passe par la page Contact. On priorise les projets avec une date proche.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transform transition-transform hover:scale-105"
            >
              Contact
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-6 py-3 text-sm font-semibold text-[#F5C518] transition-colors hover:bg-[#F5C518] hover:text-black"
            >
              Voir les services
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
