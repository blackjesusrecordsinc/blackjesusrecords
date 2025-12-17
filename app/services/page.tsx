// app/services/page.tsx
import React from "react";
import Link from "next/link";

type ServiceId = "video" | "photo" | "social" | "web" | "strategy";

type Service = {
  id: ServiceId;
  title: string;
  tag: string;
  subtitle: string;
  points: string[];
};

type Pack = {
  serviceId: ServiceId;
  title: string;
  hint: string;
  desc: string;
  bullets: string[];
  highlight?: boolean;
};

type FAQ = { q: string; a: string };

const services: Service[] = [
  {
    id: "video",
    title: "Production vidéo",
    tag: "Video",
    subtitle:
      "Clips musicaux, publicités, vidéos corporatives et couverture d’événements — tournage propre, image stable, rendu premium.",
    points: [
      "Direction artistique + accompagnement créatif",
      "Tournage intérieur/extérieur (lumière maîtrisée)",
      "Montage, habillage graphique & sous-titrage (si nécessaire)",
      "Étalonnage (color grading) pour un rendu cinématographique",
    ],
  },
  {
    id: "photo",
    title: "Shooting photo",
    tag: "Photo",
    subtitle:
      "Séances photos pro pour artistes, familles, entreprises et marques. Image cohérente, retouches clean, livraison web & print.",
    points: [
      "Portraits individuels & shooting d’artistes",
      "Séances famille / couple (émotion + direction)",
      "Corporate : équipe, services, locaux, branding",
      "Retouches pro prêtes pour web & impression",
    ],
  },
  {
    id: "social",
    title: "Réseaux sociaux",
    tag: "Social",
    subtitle:
      "Contenu qui attire l’attention et renforce l’image : formats courts, hooks efficaces, cohérence visuelle et stratégie.",
    points: [
      "Plan de contenu mensuel sur mesure",
      "Vidéos courtes (Reels, TikTok, Shorts) : tournage & montage",
      "Optimisation (structure, format, rythme, call-to-action)",
      "Accompagnement stratégie de croissance",
    ],
  },
  {
    id: "web",
    title: "Création de site web",
    tag: "Web",
    subtitle:
      "Sites modernes, rapides, mobile-first, pensés pour convertir. Design cohérent avec ton image + SEO de base.",
    points: [
      "Site vitrine pro (one-page ou multi-pages)",
      "Formulaire contact + prise de rendez-vous",
      "SEO de base + structure propre (titres, pages, vitesse)",
      "Design cohérent + sections orientées conversion",
    ],
  },
  {
    id: "strategy",
    title: "Croissance & stratégie d’entreprise",
    tag: "Strategy",
    subtitle:
      "On structure ton image, tes offres et ta com. Objectif : plus clair, plus crédible, plus rentable.",
    points: [
      "Analyse positionnement + identité visuelle",
      "Conseils offres/prix/presentation (clarité + valeur)",
      "Stratégie contenu alignée objectifs (KPI)",
      "Suivi + ajustements en fonction des résultats",
    ],
  },
];

const packs: Pack[] = [
  // VIDEO
  {
    serviceId: "video",
    title: "Essentiel",
    hint: "Réseaux / promo",
    desc: "Tournage léger + montage propre, parfait pour publier rapidement.",
    bullets: ["Tournage court", "Montage + export optimisé", "1 format (vertical ou 16:9)", "1 révision incluse"],
  },
  {
    serviceId: "video",
    title: "Premium",
    hint: "Le plus demandé",
    desc: "Direction plus poussée, rendu plus “ciné”, meilleure cohérence globale.",
    bullets: ["DA + tournage plus complet", "Montage + color grading", "2 formats (YouTube + vertical)", "2 révisions incluses"],
    highlight: true,
  },
  {
    serviceId: "video",
    title: "Signature",
    hint: "Clip / pub / corporate",
    desc: "Pour un rendu haut niveau : image, lumière, rythme, finitions, cohérence totale.",
    bullets: ["DA avancée + setup lumière", "Montage narratif + finitions", "Color + audio amélioré", "3 révisions (selon brief)"],
  },

  // PHOTO
  {
    serviceId: "photo",
    title: "Mini session",
    hint: "Portrait rapide",
    desc: "Idéal pour une photo pro/branding sans se compliquer.",
    bullets: ["Direction simple", "Sélection + retouches clean", "Exports web prêts", "Livraison rapide"],
  },
  {
    serviceId: "photo",
    title: "Branding",
    hint: "Artistes / business",
    desc: "Une série cohérente pour site, réseaux, presse, Google Business.",
    bullets: ["Direction + cohérence visuelle", "Sélection + retouches avancées", "Variantes cadrage (web/print)", "Galerie livrée propre"],
    highlight: true,
  },
  {
    serviceId: "photo",
    title: "Editorial",
    hint: "Signature visuelle",
    desc: "Identité forte : style, intention, rendu signature.",
    bullets: ["Moodboard + direction", "Retouches avancées", "Cohérence artistique", "Livraison premium"],
  },

  // SOCIAL
  {
    serviceId: "social",
    title: "Starter",
    hint: "Consistance",
    desc: "On lance une routine de contenu propre et régulière.",
    bullets: ["Plan simple", "Production formats courts", "Optimisation exports", "Suivi léger"],
  },
  {
    serviceId: "social",
    title: "Growth",
    hint: "Stratégie + production",
    desc: "Format sérieux : on améliore la régularité, la qualité et les résultats.",
    bullets: ["Plan mensuel structuré", "Production + montage + hooks", "Optimisation (timing/format)", "Suivi KPI"],
    highlight: true,
  },
  {
    serviceId: "social",
    title: "Full",
    hint: "Présence complète",
    desc: "Gestion plus complète + cohérence visuelle + cadences plus fortes.",
    bullets: ["Calendrier éditorial", "Production récurrente", "Optimisation + tests", "Reporting KPI"],
  },

  // WEB
  {
    serviceId: "web",
    title: "One-page",
    hint: "Simple & efficace",
    desc: "Une page propre qui convertit, rapide et mobile-first.",
    bullets: ["Structure claire", "Sections conversion", "Formulaire contact", "SEO de base"],
  },
  {
    serviceId: "web",
    title: "Site pro",
    hint: "Multi-pages",
    desc: "Plus complet : services, portfolio, contact, SEO de base et structure solide.",
    bullets: ["Pages clés", "Portfolio intégré", "Optimisation vitesse", "SEO de base + structure"],
    highlight: true,
  },
  {
    serviceId: "web",
    title: "Sur-mesure",
    hint: "Brand premium",
    desc: "Design + structure adaptés exactement à ton image et ton besoin.",
    bullets: ["Design sur-mesure", "Sections avancées", "Optimisation", "Évolutif"],
  },

  // STRATEGY
  {
    serviceId: "strategy",
    title: "Audit",
    hint: "Clarté",
    desc: "On identifie ce qui bloque : image, offre, message, cohérence.",
    bullets: ["Analyse positionnement", "Points à corriger", "Plan d’action", "Priorités"],
  },
  {
    serviceId: "strategy",
    title: "Plan de croissance",
    hint: "Le plus demandé",
    desc: "On structure ton offre + ton contenu + ton message pour un vrai impact.",
    bullets: ["Offre/prix/pitch", "Stratégie contenu", "Identité visuelle cohérente", "KPI & suivi"],
    highlight: true,
  },
  {
    serviceId: "strategy",
    title: "Accompagnement",
    hint: "Suivi",
    desc: "On avance ensemble : ajustements, décisions, optimisation au fil des résultats.",
    bullets: ["Suivi régulier", "Optimisation continue", "Ajustements KPI", "Support décisionnel"],
  },
];

const faqs: FAQ[] = [
  {
    q: "Comment vous fixez le prix ?",
    a: "Selon le scope : durée, complexité, déplacement, besoins (vidéo/photo), nombre de livrables, délais. On propose toujours un cadre clair.",
  },
  {
    q: "Est-ce que je peux prendre seulement une partie (ex : montage) ?",
    a: "Oui. On peut faire service par service, ou un package complet selon ton objectif.",
  },
  {
    q: "Vous livrez quels formats ?",
    a: "On livre selon la plateforme : vertical (9:16), YouTube (16:9), carré (1:1) si demandé, avec exports optimisés.",
  },
  {
    q: "Combien de temps pour livrer ?",
    a: "Selon la charge et la complexité. Si tu as une urgence, on peut proposer un délai express.",
  },
];

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const serviceLabel = (id: ServiceId) => {
  switch (id) {
    case "video":
      return "Production vidéo";
    case "photo":
      return "Shooting photo";
    case "social":
      return "Réseaux sociaux";
    case "web":
      return "Création de site web";
    case "strategy":
      return "Croissance & stratégie";
  }
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white font-sans">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
          <p className="text-[11px] font-semibold tracking-[0.25em] text-white/70 uppercase">
            Services
          </p>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight">
          Image, son <span className="text-[#F5C518]">& stratégie</span> pour les marques exigeantes.
        </h1>

        <p className="mt-5 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Black Jesus Records accompagne artistes, créateurs et entreprises qui veulent une image
          professionnelle, cohérente et orientée résultats. Vidéo, photo, réseaux, site web et stratégie :
          tout est centralisé au même endroit.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link
            href="/booking"
            className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
          >
            Réserver une date
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Parler de votre projet
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
              href="#process"
              className="inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold border border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:border-[#F5C518]/40 hover:text-[#F5C518] transition"
            >
              Process
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

      {/* Services (sections propres) */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-12 pt-8 space-y-10">
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
                    {s.subtitle}
                  </p>
                </div>

                <div className="shrink-0">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    Sur demande
                  </span>
                </div>
              </div>

              <div className="mt-6 grid gap-2 md:grid-cols-2">
                {s.points.map((p) => (
                  <div key={p} className="flex gap-3 text-sm text-white/80">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    <span className="leading-relaxed">{p}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 h-px w-full bg-white/10" />

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Décrire mon besoin
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

      {/* Packs (offres) */}
      <section id="packs" className="max-w-6xl mx-auto px-6 lg:px-8 pb-12 scroll-mt-44">
        <div className="flex items-end justify-between gap-4 flex-col md:flex-row">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
              Offres <span className="text-[#F5C518]">claires</span>, scope propre
            </h2>
            <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">
              Choisis un niveau selon ton objectif. On ajuste ensuite selon la durée, la complexité, et les livrables.
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

        <div className="mt-6 space-y-10">
          {services.map((s) => {
            const group = packs.filter((p) => p.serviceId === s.id);
            return (
              <div key={s.id} className="rounded-2xl border border-white/10 bg-[#121216] p-7">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                      {serviceLabel(s.id)}
                    </div>
                    <h3 className="mt-3 text-xl md:text-2xl font-semibold">
                      Packs — {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
                      Trois niveaux : rapide / premium / signature. On confirme le scope après ton brief.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={`#${s.id}`}
                      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Voir détails
                    </a>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full border border-[#F5C518]/60 bg-[#F5C518]/10 px-6 py-3 text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518]/15"
                    >
                      Demander prix
                    </Link>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  {group.map((p) => (
                    <div
                      key={`${p.serviceId}-${p.title}`}
                      className={cn(
                        "rounded-2xl border p-7 transition",
                        p.highlight
                          ? "border-[#F5C518]/60 bg-[#14141A] shadow-[0_0_0_1px_rgba(245,197,24,0.15)]"
                          : "border-white/10 bg-[#14141A] hover:border-white/20"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-lg font-semibold">{p.title}</h4>
                          <p className={cn("mt-1 text-xs", p.highlight ? "text-[#F5C518]" : "text-white/50")}>
                            {p.hint}
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
                  * Tarif final = durée + complexité + livrables + délais. On pose tout au clair avant de commencer.
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="max-w-6xl mx-auto px-6 lg:px-8 pb-12 scroll-mt-44">
        <div className="rounded-2xl border border-white/10 bg-[#121216] p-7">
          <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
            Process <span className="text-[#F5C518]">pro</span>, livraison clean
          </h2>
          <p className="mt-2 text-sm md:text-base text-white/70 max-w-3xl leading-relaxed">
            On évite la confusion : brief clair, validation, production, livraison prête à publier.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              { t: "1. Brief", d: "Objectif, plateforme, style, contraintes. On aligne la vision." },
              { t: "2. Production", d: "Tournage / shooting / création selon le service, avec structure." },
              { t: "3. Post-prod", d: "Montage, retouches, look, exports. Cohérence + finition." },
              { t: "4. Livraison", d: "Fichiers finaux + formats demandés + conseils publication." },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-white/10 bg-[#14141A] p-5">
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

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-6 lg:px-8 pb-20 scroll-mt-44">
        <div className="rounded-2xl border border-white/10 bg-[#121216] p-7">
          <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
            FAQ <span className="text-[#F5C518]">services</span>
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
              Prêt à faire passer votre image au{" "}
              <span className="text-[#F5C518]">niveau supérieur</span> ?
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
              Parle-nous de ton projet. On revient avec une proposition claire : scope, délais, livrables.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Réserver une date
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
