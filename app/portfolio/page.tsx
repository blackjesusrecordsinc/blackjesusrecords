// app/portfolio/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

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

type GalleryImage = { src: string; alt: string };

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
  // ✅ Galerie photo (public/photo-portrait/web/portrait-1.jpg → portrait-11.jpg)
  const photoPortraitGallery: GalleryImage[] = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => ({
        src: `/photo-portrait/web/portrait-${i + 1}.jpg`,
        alt: `Séance photo — Portrait ${i + 1}`,
      })),
    []
  );

  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white font-sans">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
          <p className="text-[11px] font-semibold tracking-[0.25em] text-white/70 uppercase">
            Portfolio
          </p>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight">
          Projets & formats{" "}
          <span className="text-[#F5C518]">cinématographiques</span>.
        </h1>

        <p className="mt-5 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Une sélection de formats que Black Jesus Records peut réaliser : clips rap / street,
          contenus pour marques, mariages et événements — et maintenant{" "}
          <span className="text-white">séances photo professionnelles</span>.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <a
            href="/booking"
            className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
          >
            Réserver une date
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Demander un devis
          </a>
        </div>
      </section>

      {/* Sections */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-16 space-y-12">
        {sections.map((sec) => (
          <div key={sec.title} className="space-y-5">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">{sec.title}</h2>
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
                  className="group rounded-2xl border border-white/10 bg-[#14141A] p-7 transition duration-200 hover:border-white/20 hover:bg-[#171720]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl md:text-2xl font-semibold leading-snug">
                      {item.title}
                    </h3>
                    {item.tag && (
                      <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
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
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5C518] hover:opacity-90 transition"
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

        {/* ✅ Nouvelle section: Séance photo professionnelle */}
        <div className="space-y-5 pt-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Séance photo professionnelle
            </h2>
            <p className="mt-2 text-sm md:text-base text-white/70 max-w-3xl leading-relaxed">
              Portraits premium & branding visuel : direction artistique, lumière maîtrisée et
              retouches propres. Idéal pour artistes, cover, presse, réseaux et site web.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#14141A] p-7">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                  Galerie
                </div>
                <h3 className="mt-3 text-xl md:text-2xl font-semibold">
                  Extraits — Portrait / Lifestyle
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Clique sur une photo pour l’ouvrir en plein écran.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/booking"
                  className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Réserver une séance
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-6 py-3 text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518] hover:text-black"
                >
                  Tarifs / Devis
                </a>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {photoPortraitGallery.map((img) => (
                <button
                  key={img.src}
                  onClick={() => setLightbox(img)}
                  className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-black/30"
                  aria-label={`Ouvrir ${img.alt}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>

            <p className="mt-4 text-xs text-white/55">
              Fichiers optimisés web (JPEG) pour un affichage rapide sur mobile et desktop.
            </p>
          </div>
        </div>
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
              className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Réserver une date
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-6 py-3 text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518] hover:text-black"
            >
              Parler de votre projet
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10]">
              <Image src={lightbox.src} alt={lightbox.alt} fill className="object-contain" />
            </div>
            <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
              <p className="text-sm text-white/75">{lightbox.alt}</p>
              <button
                onClick={() => setLightbox(null)}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
