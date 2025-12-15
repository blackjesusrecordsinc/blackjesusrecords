import React from "react";

type PortfolioItem = {
  title: string;
  desc: string;
  link?: { href: string; label: string };
  tag?: string;
};

type PortfolioSection = {
  title: string;
  subtitle?: string;
  items: PortfolioItem[];
};

const sections: PortfolioSection[] = [
  {
    title: "Clips & projets d'artistes",
    subtitle:
      "Formats pensés pour YouTube et les réseaux : identité visuelle, rythme, narration et performance.",
    items: [
      {
        title: "Clip – Shégué (rap / street)",
        desc:
          "Clip rap / street tourné en extérieur, ambiance nocturne, plans stabilisés et images serrées sur l’artiste. Pensé pour YouTube et les réseaux.",
        link: {
          href: "https://youtube.com/@shegue242?si=xPnxWCIG98q8bohh",
          label: "Voir la chaîne YouTube de Shégué",
        },
        tag: "Clip",
      },
      {
        title: "Session studio filmée",
        desc:
          "Performance filmée en studio avec éclairage contrôlé, plusieurs angles caméra et audio propre. Idéal pour montrer le talent brut d’un artiste.",
        tag: "Studio",
      },
    ],
  },
  {
    title: "Événements & aftermovies",
    subtitle:
      "Captation discrète, émotion, montage dynamique et sound design pour revivre l’événement.",
    items: [
      {
        title: "Mariage / événement privé",
        desc:
          "Captation des moments forts, discours et détails, montée ensuite en film émotionnel. Livraison optimisée pour le partage et l’archivage.",
        tag: "Événement",
      },
      {
        title: "Aftermovie de soirée / show",
        desc:
          "Résumé dynamique d’une soirée, d’un concert ou d’un festival : énergie du public, moments clés sur scène, détails visuels et sound design.",
        tag: "Aftermovie",
      },
    ],
  },
  {
    title: "Contenus pour marques & entreprises",
    subtitle:
      "Formats qui convertissent : attention immédiate, message clair, rendu premium et cohérence avec la marque.",
    items: [
      {
        title: "Vidéo réseaux sociaux",
        desc:
          "Formats verticaux courts (TikTok, Reels, Shorts) : hook fort, texte à l’écran, montage rapide et transitions propres pour capter l’attention.",
        tag: "Social",
      },
      {
        title: "Présentation d’entreprise",
        desc:
          "Vidéo qui présente l’activité, l’histoire et l’équipe. Utilisable sur le site web, LinkedIn et en pitch commercial.",
        tag: "Corporate",
      },
    ],
  },
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white antialiased">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
            Portfolio
          </p>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Projets & formats{" "}
          <span className="text-[#F5C518]">cinématographiques</span>.
        </h1>

        <p className="mt-5 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Une sélection de formats que Black Jesus Records peut réaliser : clips rap / street,
          contenus pour marques, mariages et événements. Tu pourras ensuite remplacer chaque bloc
          par de vrais projets, liens et visuels.
        </p>
      </section>

      {/* Sections */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20 space-y-10">
        {sections.map((sec) => (
          <div key={sec.title} className="space-y-5">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-wide">{sec.title}</h2>
              {sec.subtitle && (
                <p className="mt-2 text-sm md:text-base text-white/70 max-w-3xl leading-relaxed">
                  {sec.subtitle}
                </p>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {sec.items.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-white/10 bg-[#1A1A1F] p-7 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl md:text-2xl font-semibold tracking-wide leading-snug">
                      {item.title}
                    </h3>
                    {item.tag && (
                      <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase text-white/70">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
                    {item.desc}
                  </p>

                  {item.link && (
                    <div className="mt-5">
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5C518] hover:underline transform transition-transform hover:scale-105"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                        {item.link.label}
                      </a>
                    </div>
                  )}

                  <div className="mt-6 h-px w-full bg-white/10 group-hover:bg-white/15 transition" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-[#121216]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
              Tu veux qu’on transforme ton idée en{" "}
              <span className="text-[#F5C518]">contenu fort</span> ?
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
              Réserve une date ou décris ton projet. On te propose une approche claire,
              un rendu premium et une livraison adaptée à tes plateformes.
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
