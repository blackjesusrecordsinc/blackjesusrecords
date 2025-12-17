// app/booking/page.tsx
"use client";

import React, { useMemo, useState } from "react";

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

function toStr(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function BookingPage() {
  const [status, setStatus] = useState<Status>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const services = useMemo(
    () => [
      "Clip musical",
      "Événement",
      "Contenu réseaux sociaux",
      "Post-production",
      "Shooting photo",
      "Site web",
      "Stratégie / croissance",
      "Autre",
    ],
    []
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

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

    // ✅ Validations pro
    if (!payload.name || payload.name.length < 2) {
      setStatus("error");
      setErrorMsg("Entre un nom valide.");
      return;
    }
    if (!payload.email || !isEmail(payload.email)) {
      setStatus("error");
      setErrorMsg("Entre un email valide.");
      return;
    }
    if (!payload.message || payload.message.length < 10) {
      setStatus("error");
      setErrorMsg("Ajoute un peu plus de détails (min. 10 caractères).");
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
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Erreur de connexion. Réessaie plus tard.");
    }
  }

  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white font-sans">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
          <p className="text-[11px] font-semibold tracking-[0.25em] text-white/70 uppercase">
            Réservation
          </p>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight">
          Réserver une <span className="text-[#F5C518]">date</span>
        </h1>

        <p className="mt-5 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Donne-nous quelques infos sur ton projet. On te revient avec une proposition claire :
          disponibilité, logistique, approche créative et délais.
        </p>
      </section>

      {/* Form */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: form card */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-white/10 bg-[#1A1A1F] p-7">
              <h2 className="text-2xl font-semibold">Informations du projet</h2>
              <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">
                Plus c’est précis, plus on peut répondre vite.
              </p>

              <form className="mt-6 space-y-6" onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div>
                  <label className="block text-sm text-white/80 mb-2">Nom complet *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                    placeholder="Ex. Emmanuel Kibanda"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/80 mb-2">Email *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                      placeholder="ex. contact@..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/80 mb-2">Téléphone</label>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                      placeholder="(optionnel)"
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm text-white/80 mb-2">Type de service</label>
                  <select
                    name="service"
                    className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
                    defaultValue=""
                  >
                    <option value="">Sélectionner…</option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date + Location */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/80 mb-2">Date souhaitée</label>
                    <input
                      name="date"
                      type="date"
                      className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/80 mb-2">Lieu</label>
                    <input
                      name="location"
                      type="text"
                      className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                      placeholder="Ex. Lévis, Québec, Montréal..."
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm text-white/80 mb-2">Budget approximatif</label>
                  <input
                    name="budget"
                    type="text"
                    className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                    placeholder="Ex. 800$, 1500$, à discuter..."
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-white/80 mb-2">Détails du projet *</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full rounded-xl bg-[#0F0F12] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                    placeholder="Objectif, style, références, plateformes, délais..."
                  />
                  <p className="mt-2 text-xs text-white/50">
                    Astuce : ajoute une référence (YouTube/IG) + la plateforme finale (YouTube, TikTok, etc.).
                  </p>
                </div>

                {/* Status */}
                {status === "error" && (
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-sm text-white">❌ {errorMsg || "Une erreur est survenue."}</p>
                  </div>
                )}

                {status === "success" && (
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-sm text-white">
                      ✅ Demande envoyée. Merci — on te revient rapidement pour confirmer.
                    </p>
                  </div>
                )}

                {/* Submit */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-7 py-3 text-sm font-semibold text-black transition transform hover:scale-105 duration-200 disabled:opacity-50"
                  >
                    {status === "loading" ? "Envoi en cours..." : "Envoyer la demande"}
                  </button>

                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-7 py-3 text-sm font-semibold text-[#F5C518] transition transform hover:scale-105 duration-200 hover:bg-[#F5C518] hover:text-black"
                  >
                    Passer par Contact
                  </a>
                </div>
              </form>
            </div>
          </div>

          {/* Right: info card */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-[#1A1A1F] p-7">
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
                Tu as déjà un brief ou des liens (Drive / Dropbox / YouTube) ? Mets-les dans “Détails du projet”.
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
              Besoin d’une réponse <span className="text-[#F5C518]">rapide</span> ?
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
              Si c’est urgent, passe par la page Contact. On priorise les projets avec une date proche.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition transform hover:scale-105 duration-200 hover:opacity-90"
            >
              Contact
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-6 py-3 text-sm font-semibold text-[#F5C518] transition transform hover:scale-105 duration-200 hover:bg-[#F5C518] hover:text-black"
            >
              Voir les services
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
