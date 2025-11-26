"use client";

import { useState } from "react";

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
        // on enverra tout vers la même API de contact
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
    <main className="min-h-screen text-white px-6 py-20 max-w-3xl mx-auto">
      <h1 className="text-5xl font-bold text-primary mb-8">Réserver une date</h1>
      <p className="text-gray-300 mb-8">
        Donne-nous quelques informations sur ton projet (clip, événement, contenu social, etc.).
        On te contactera pour confirmer les détails, la dispo et les tarifs.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm mb-1">Nom complet</label>
          <input
            name="name"
            type="text"
            required
            className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Téléphone</label>
            <input
              name="phone"
              type="text"
              className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Type de service</label>
          <input
            name="service"
            type="text"
            placeholder="Clip, événement, réseau sociaux, etc."
            className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Date souhaitée</label>
            <input
              name="date"
              type="date"
              className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Lieu (ville, salle, etc.)</label>
            <input
              name="location"
              type="text"
              className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Budget approximatif</label>
          <input
            name="budget"
            type="text"
            placeholder="Ex. 800$, 1500$, à discuter..."
            className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Détails du projet</label>
          <textarea
            name="message"
            rows={4}
            required
            className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-4 px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Envoi en cours..." : "Envoyer la demande"}
        </button>

        {status === "success" && (
          <p className="text-sm text-green-400 mt-2">
            Demande envoyée. Merci, on te revient pour confirmer la date.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400 mt-2">
            Une erreur est survenue. Réessaie plus tard ou écris directement par email.
          </p>
        )}
      </form>
    </main>
  );
}
