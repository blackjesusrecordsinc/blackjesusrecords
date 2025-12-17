// app/post-production/page.tsx
import React from "react";
import Link from "next/link";

type PostProdService = {
  id: "montage" | "color" | "audio";
  title: string;
  desc: string;
  tag: string;
  bullets: string[];
};

type Pack = {
  title: string;
  priceHint: string;
  desc: string;
  bullets: string[];
  highlight?: boolean;
};

type FAQ = { q: string; a: string };

const services: PostProdService[] = [
  {
    id: "montage",
    title: "Montage vidéo",
    tag: "Edit",
    desc:
      "On structure, on rythme, on nettoie. Un montage propre, narratif et pensé pour la plateforme.",
    bullets: [
      "Structure narrative, rythme, transitions propres",
      "Versions courtes verticales (Reels, TikTok, Shorts)",
      "Sous-titres & habillage graphique si nécessaire",
      "Exports optimisés pour YouTube, Instagram et TikTok",
    ],
  },
  {
    id: "color",
    title: "Color grading",
    tag: "Look",
    desc:
      "On donne une signature : cohérence entre les plans, rendu cinéma ou street, peau propre et noirs profonds.",
    bullets: [
      "Correction colorimétrique complète",
      "Match entre les plans (cohérence globale)",
      "Look cinéma / clip rap-street (selon l’intention)",
      "Gestion des hautes lumières & noirs profonds",
    ],
  },
  {
    id: "audio",
    title: "Audio & Sound Design",
    tag: "Audio",
    desc:
      "Un rendu pro se joue aussi au son : nettoyage, ambiances, impacts, finitions.",
    bullets: [
      "Nettoyage des prises son & réduction de bruit",
      "Synchronisation si nécessaire",
      "Ajout d’ambiances & FX sonores",
      "Équilibrage et finitions pour un rendu professionnel",
    ],
  },
];

const packs: Pack[] = [
  {
    title: "Essentiel",
    priceHint: "Idéal pour réseaux",
    desc: "Montage propre, rapide, efficace. Parfait pour Reels / TikTok / Shorts.",
    bullets: [
      "Montage + rythme + export optimisé",
      "1 format principal (vertical OU horizontal)",
      "1 révision incluse",
      "Livraison prête à publier",
    ],
  },
  {
    title: "Premium",
    priceHint: "Le plus demandé",
    desc:
      "Un rendu complet : montage + look + audio, avec une finition premium et cohérente.",
    bullets: [
      "Montage complet + sound design léger",
      "Color grading cohérent (look défini)",
      "2 formats (ex. YouTube + vertical)",
      "2 révisions incluses",
    ],
    highlight: true,
  },
  {
    title: "Signature",
    priceHint: "Clips / pub / corporate",
    desc:
      "Pour un rendu “ciné” ou brandé : étalonnage avancé, audio soigné, et cohérence totale.",
    bullets: [
      "Montage narratif + finitions avancées",
      "Color grading avancé + matching précis",
      "Audio nettoyé + design sonore renforcé",
      "3 révisions (selon brief)",
    ],
  },
];

const faqs: FAQ[] = [
  {
    q: "Quels fichiers dois-je envoyer ?",
    a: "Idéalement : dossier footage complet (caméra + drone si besoin), audio séparé si disponible, et une référence (lien) du style visé. On peut aussi travailler à partir d’un export unique si nécessaire.",
  },
  {
    q: "Vous livrez quels formats ?",
    a: "On livre selon ta plateforme : 9:16 (Reels/TikTok/Shorts), 16:9 (YouTube), 1:1 si demandé, avec exports optimisés (poids/qualité).",
  },
  {
    q: "Combien de révisions ?",
    a: "Ça dépend du pack. On travaille toujours avec un brief clair + une logique de retours structurés pour éviter les allers-retours inutiles.",
  },
  {
    q: "Vous faites des délais rapides ?",
    a: "Oui. Si c’est urgent, on peut proposer une livraison express selon la charge et le type de projet.",
  },
];

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export default function PostProductionPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white font-sans">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
          <p className="text-[11px] font-semibold tracking-[0.25em] text-white/70 uppercase">
            Post-production
          </p>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight">
          On transforme vos images brutes en{" "}
          <span className="text-[#F5C518]">contenu puissant</span>.
        </h1>

        <p className="mt-5 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Clips, corporate, événements, réseaux sociaux : on sublime, on corrige, on raconte.
          Workflow propre, rendu premium, livraison prête à publier.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link
            href="/booking"
            className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
          >
            Réserver une session
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Demander un devis
          </Link>
        </div>
      </section>

      {/* Sticky nav (ancres) */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="sticky top-[68px] z-20 -mx-6 lg:-mx-8 px-6 lg:px-8 py-3 backdrop-blur bg-[#0B0B0E]/70 border-y border-white/10">
          <div className="flex flex-wrap gap-2">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold border border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:border-[#F5C518]/40 hover:text-[#F5C518] transition"
              >
                {s.title}
                <span className="ml-2 text-white/40">· {s.tag}</span>
              </a>
            ))}
            <a
              href="#packs"
              className="inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold border border-[#F5C518]/40 bg-[#F5C518]/10 text-[#F5C518] hover:bg-[#F5C518]/15 transition"
            >
              Offres
            </a>
            <a
              href="#faq"
              className="inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold border border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:border-[#F5C518]/40 hover:text-[#F5C518] transition"
            >
              FAQ
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-10 pt-8 space-y-10">
        {services.map((s) => (
          <div key={s.id} id={s.id} className="scroll-mt-44">
            <div className="rounded-2xl border border-white/10 bg-[#14141A] p-7">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    {s.tag}
                  </div>

                  <h2 className="mt-3 text-2xl md:text-3xl font-semibold leading-tight">
                    {s.title}
                  </h2>

                  <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="shrink-0">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    Service
                  </span>
                </div>
              </div>

              <div className="mt-6 grid gap-2 md:grid-cols-2">
                {s.bullets.map((b) => (
                  <div key={b} className="flex gap-3 text-sm text-white/80">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    <span className="leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 h-px w-full bg-white/10" />

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Décrire mon projet
                </Link>
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Réserver
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Workflow */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-12">
        <div className="rounded-2xl border border-white/10 bg-[#121216] p-7">
          <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
            Workflow <span className="text-[#F5C518]">clair</span>, livraison propre
          </h2>
          <p className="mt-2 text-sm md:text-base text-white/70 max-w-3xl leading-relaxed">
            On évite le chaos : tu sais exactement quoi envoyer, à quel moment on valide, et comment on livre.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              {
                t: "1. Brief",
                d: "Plateforme, durée, références, objectif. On aligne la vision.",
              },
              {
                t: "2. Montage",
                d: "Structure, rythme, narration. Première version cohérente.",
              },
              {
                t: "3. Look + Audio",
                d: "Color grading + finitions sonores pour un rendu premium.",
              },
              {
                t: "4. Livraison",
                d: "Exports optimisés + versions demandées + fichiers finaux.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-white/10 bg-[#14141A] p-5"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                  Étape
                </div>
                <h3 className="mt-3 text-lg font-semibold">{x.t}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packs */}
      <section id="packs" className="max-w-6xl mx-auto px-6 lg:px-8 pb-16 scroll-mt-44">
        <div className="flex items-end justify-between gap-4 flex-col md:flex-row">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
              Offres <span className="text-[#F5C518]">post-production</span>
            </h2>
            <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">
              Choisis un niveau clair. Le tarif exact dépend du footage, de la durée, et des objectifs.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Obtenir un devis
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Réserver
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {packs.map((p) => (
            <div
              key={p.title}
              className={cn(
                "rounded-2xl border p-7 transition",
                p.highlight
                  ? "border-[#F5C518]/60 bg-[#14141A] shadow-[0_0_0_1px_rgba(245,197,24,0.15)]"
                  : "border-white/10 bg-[#14141A] hover:border-white/20"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className={cn("mt-1 text-xs", p.highlight ? "text-[#F5C518]" : "text-white/50")}>
                    {p.priceHint}
                  </p>
                </div>

                {p.highlight && (
                  <span className="shrink-0 rounded-full border border-[#F5C518]/50 bg-[#F5C518]/10 px-3 py-1 text-xs text-[#F5C518]">
                    Recommandé
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm text-white/70 leading-relaxed">{p.desc}</p>

              <div className="mt-5 grid gap-2">
                {p.bullets.map((b) => (
                  <div key={b} className="flex gap-3 text-sm text-white/80">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    <span className="leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 h-px w-full bg-white/10" />

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition",
                    p.highlight
                      ? "bg-[#F5C518] text-black hover:opacity-90"
                      : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                  )}
                >
                  Choisir {p.title}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-white/50">
          * Les délais et le prix final dépendent de la durée, du volume de rushs, et des besoins (sous-titres, habillage, SFX, etc.).
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-6 lg:px-8 pb-20 scroll-mt-44">
        <div className="rounded-2xl border border-white/10 bg-[#121216] p-7">
          <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
            FAQ <span className="text-[#F5C518]">post-production</span>
          </h2>
          <p className="mt-2 text-sm md:text-base text-white/70 max-w-3xl leading-relaxed">
            Les réponses aux questions qu’on reçoit le plus.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-white/10 bg-[#14141A] p-6">
                <h3 className="text-base font-semibold">{f.q}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-[#121216]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
              Besoin d’un rendu <span className="text-[#F5C518]">pro</span> rapidement ?
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
              Envoie ton projet (footage, référence, plateforme cible). On te répond avec une approche claire :
              délais, rendu attendu et livraison.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Réserver une session
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-6 py-3 text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518] hover:text-black"
            >
              Parler de votre projet
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
