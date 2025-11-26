// app/contact/page.tsx
"use client";

import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";

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
        setError(data.error || "Une erreur est survenue.");
        return;
      }

      setSuccess("Merci ! Votre message a bien été envoyé.");
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
      setError("Erreur de connexion. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <SectionTitle
        eyebrow="Contact"
        title="Parlez-nous de votre projet"
        subtitle="Remplissez ce formulaire et nous vous répondons rapidement pour discuter de vos besoins."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">Nom complet *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-black border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-black border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg bg-black border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">Type de service</label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full rounded-lg bg-black border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
            >
              <option value="">Sélectionner…</option>
              <option value="Clip musical">Clip musical</option>
              <option value="Événement">Événement (mariage, gala, etc.)</option>
              <option value="Contenu réseaux sociaux">Contenu réseaux sociaux</option>
              <option value="Post-production">Post-production</option>
              <option value="Label / accompagnement artiste">
                Label / accompagnement artiste
              </option>
              <option value="Autre">Autre</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">Date souhaitée</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-lg bg-black border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-white/70 mb-1">Lieu</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Ville, salle, type de lieu..."
              className="w-full rounded-lg bg-black border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Budget (approx.)</label>
          <input
            type="text"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            placeholder="Ex: 800$, 1500$..."
            className="w-full rounded-lg bg-black border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Message *</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full rounded-lg bg-black border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
            placeholder="Parlez-nous de votre projet, du style, des besoins techniques, etc."
          />
        </div>

        {error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-400">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 rounded-lg bg-yellow-400 text-black font-semibold text-sm hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Envoi en cours..." : "Envoyer le message"}
        </button>
      </form>
    </div>
  );
}
