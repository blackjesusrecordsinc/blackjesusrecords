// app/a-propos/page.tsx

import React from "react";
import Link from "next/link";

type AnchorId =
  | "intro"
  | "story"
  | "founder"
  | "identity"
  | "mission"
  | "values"
  | "difference"
  | "vision";

const anchors: Array<{ id: AnchorId; label: string; hint: string }> = [
  { id: "intro", label: "À propos", hint: "Résumé" },
  { id: "story", label: "Histoire", hint: "Origines" },
  { id: "founder", label: "Fondateur", hint: "Vision" },
  { id: "identity", label: "Identité", hint: "Positionnement" },
  { id: "mission", label: "Mission", hint: "Objectif" },
  { id: "values", label: "Valeurs", hint: "ADN" },
  { id: "difference", label: "Différence", hint: "Pourquoi nous" },
  { id: "vision", label: "Vision", hint: "Futur" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <h1 className="text-4xl font-bold mb-6">À propos</h1>

      <ul className="space-y-2 mb-10">
        {anchors.map((a) => (
          <li key={a.id} className="text-white/70">
            {a.label} — <span className="text-white/40">{a.hint}</span>
          </li>
        ))}
      </ul>

      <Link href="/" className="text-[#F5C518] font-semibold">
        ← Retour à l’accueil
      </Link>
    </main>
  );
}
