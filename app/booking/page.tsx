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

export default function BookingPage() {
  const [status, setStatus] = useState<Status>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement | null>(null);

  const validate = useCallback((p: BookingPayload) => {
    const e: Record<string, string> = {};
    if (!p.name || p.name.length < 2) e.name = "Entre un nom valide.";
    if (!p.email || !isEmail(p.email)) e.email = "Entre un email valide.";
    if (!p.message) e.message = "Décris ton projet.";
    if (p.message && p.message.length < 20)
      e.message = "Ajoute un peu plus de détails (min. 20 caractères).";
    return e;
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
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
      setErrorMsg("Corrige les champs requis.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Erreur serveur. Réessaie plus tard.");
    }
  }, [validate]);

  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white font-sans">
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-6">
          Réserver une <span className="text-[#F5C518]">date</span>
        </h1>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            placeholder="Nom *"
            className="w-full p-3 rounded bg-black/40 border border-white/10"
          />
          <input
            name="email"
            placeholder="Email *"
            className="w-full p-3 rounded bg-black/40 border border-white/10"
          />
          <textarea
            name="message"
            placeholder="Détails du projet *"
            rows={6}
            className="w-full p-3 rounded bg-black/40 border border-white/10"
          />

          {status === "error" && <p className="text-[#F5C518]">{errorMsg}</p>}
          {status === "success" && <p className="text-green-400">Demande envoyée.</p>}

          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 rounded-full bg-[#F5C518] text-black font-semibold"
          >
            {status === "loading" ? "Envoi…" : "Envoyer"}
          </button>
        </form>
      </section>
    </main>
  );
}
