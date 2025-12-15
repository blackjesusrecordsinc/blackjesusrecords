import React from "react";

type Service = {
  title: string;
  subtitle: string;
  points: string[];
};

const services: Service[] = [
  {
    title: "Production vidéo",
    subtitle:
      "Clips musicaux, publicités, vidéos corporatives et couverture d’événements.",
    points: [
      "Direction artistique et accompagnement créatif",
      "Tournage en intérieur et extérieur",
      "Montage, habillage graphique et sous-titrage",
      "Étalonnage (color grading) pour un rendu cinématographique",
    ],
  },
  {
    title: "Shooting photo",
    subtitle:
      "Séances photos professionnelles pour artistes, familles, entreprises et marques.",
    points: [
      "Portraits individuels et shooting d’artist(e)s",
      "Séances photo en famille ou en couple",
      "Photos corporatives pour votre équipe et vos réseaux",
      "Retouches professionnelles prêtes pour le web et l’impression",
    ],
  },
  {
    title: "Réseaux sociaux",
    subtitle:
      "Nous créons et gérons du contenu qui attire l’attention et renforce votre image.",
    points: [
      "Plan de contenu mensuel sur mesure",
      "Tournage et montage de vidéos courtes (Reels, TikTok, Shorts)",
      "Optimisation des publications pour l’algorithme",
      "Accompagnement sur la stratégie de croissance",
    ],
  },
  {
    title: "Création de site web",
    subtitle: "Sites modernes, rapides et adaptés au mobile pour artistes et entreprises.",
    points: [
      "Site vitrine professionnel (one page ou multi-pages)",
      "Intégration de formulaire de contact et prise de rendez-vous",
      "Optimisation pour le référencement (SEO de base)",
      "Design cohérent avec votre image de marque",
    ],
  },
  {
    title: "Croissance & stratégie d’entreprise",
    subtitle: "Accompagnement pour structurer votre image, votre communication et vos offres.",
    points: [
      "Analyse de votre positionnement et de votre identité visuelle",
      "Conseils sur les offres, les prix et la présentation",
      "Stratégie de contenu alignée sur vos objectifs",
      "Suivi et ajustements en fonction des résultats",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white antialiased">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
            Services
          </p>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Image, son{" "}
          <span className="text-[#F5C518]">& stratégie</span>{" "}
          pour les marques exigeantes.
        </h1>

        <p className="mt-5 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Black Jesus Records accompagne les artistes, créateurs et entreprises
          qui veulent une image professionnelle, cohérente et orientée résultats.
          Vidéo, photo, réseaux sociaux, site web et stratégie : tout est centralisé
          au même endroit.
        </p>
      </section>

      {/* Services grid */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-3xl border border-white/10 bg-[#1A1A1F] p-7 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl md:text-2xl font-semibold tracking-wide">{service.title}</h2>
                <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase text-white/70">
                  Sur demande
                </span>
              </div>

              <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
                {service.subtitle}
              </p>

              <ul className="mt-5 space-y-2 text-sm text-white/80">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#F5C518]">Prix : sur demande</p>
                <div className="h-px flex-1 bg-white/10 ml-4 group-hover:bg-white/15 transition" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-[#121216]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
              Prêt à faire passer votre image au niveau supérieur ?
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
              Parlez-nous de votre projet : clip, shooting, lancement de produit,
              site web ou stratégie complète. On revient vers vous avec une proposition
              claire, adaptée à vos objectifs et à votre budget.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/booking"
              className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transform transition-transform hover:scale-105"
            >
              Réserver une date
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-6 py-3 text-sm font-semibold text-[#F5C518] transition-colors hover:bg-[#F5C518] hover:text-black transform transition-transform hover:scale-105"
            >
              Parler de votre projet
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
