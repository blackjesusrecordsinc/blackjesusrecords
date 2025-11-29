// app/services/page.tsx

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
      "Étalonnage (color grading) pour un rendu cinématographique"
    ]
  },
  {
    title: "Shooting photo",
    subtitle:
      "Séances photos professionnelles pour artistes, familles, entreprises et marques.",
    points: [
      "Portraits individuels et shooting d’artist(e)s",
      "Séances photo en famille ou en couple",
      "Photos corporatives pour votre équipe et vos réseaux",
      "Retouches professionnelles prêtes pour le web et l’impression"
    ]
  },
  {
    title: "Réseaux sociaux",
    subtitle:
      "Nous créons et gérons du contenu qui attire l’attention et renforce votre image.",
    points: [
      "Plan de contenu mensuel sur mesure",
      "Tournage et montage de vidéos courtes (Reels, TikTok, Shorts)",
      "Optimisation des publications pour l’algorithme",
      "Accompagnement sur la stratégie de croissance"
    ]
  },
  {
    title: "Création de site web",
    subtitle:
      "Sites modernes, rapides et adaptés au mobile pour artistes et entreprises.",
    points: [
      "Site vitrine professionnel (one page ou multi-pages)",
      "Intégration de formulaire de contact et prise de rendez-vous",
      "Optimisation pour le référencement (SEO de base)",
      "Design cohérent avec votre image de marque"
    ]
  },
  {
    title: "Croissance & stratégie d’entreprise",
    subtitle:
      "Accompagnement pour structurer votre image, votre communication et vos offres.",
    points: [
      "Analyse de votre positionnement et de votre identité visuelle",
      "Conseils sur les offres, les prix et la présentation",
      "Stratégie de contenu alignée sur vos objectifs",
      "Suivi et ajustements en fonction des résultats"
    ]
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* En-tête */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <p className="text-xs font-semibold tracking-[0.25em] text-yellow-400 uppercase">
          Services
        </p>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold">
          Image, son & stratégie pour les marques exigeantes.
        </h1>
        <p className="mt-4 max-w-2xl text-sm md:text-base text-white/70">
          Black Jesus Records accompagne les artistes, créateurs et entreprises
          qui veulent une image professionnelle, cohérente et orientée
          résultats. Vidéo, photo, réseaux sociaux, site web et stratégie :
          tout est centralisé au même endroit.
        </p>
      </section>

      {/* Cartes de services */}
      <section className="max-w-6xl mx-auto px-4 pb-20 grid gap-8 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          >
            <h2 className="text-xl font-semibold">{service.title}</h2>
            <p className="mt-2 text-sm text-white/70">{service.subtitle}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-white/80 list-disc list-inside">
              {service.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-medium text-yellow-400">
              Prix : sur demande
            </p>
          </div>
        ))}
      </section>

      {/* Call to action */}
      <section className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              Prêt à faire passer votre image au niveau supérieur ?
            </h2>
            <p className="mt-2 max-w-xl text-sm md:text-base text-white/70">
              Parlez-nous de votre projet : clip, shooting, lancement de
              produit, site web ou stratégie complète. Nous revenons vers vous
              avec une proposition adaptée à vos objectifs et à votre budget.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/booking"
              className="px-5 py-2.5 rounded-full bg-yellow-400 text-sm font-semibold text-black"
            >
              Réserver une date
            </a>
            <a
              href="/contact"
              className="px-5 py-2.5 rounded-full border border-white/40 text-sm font-semibold text-white"
            >
              Parler de votre projet
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
