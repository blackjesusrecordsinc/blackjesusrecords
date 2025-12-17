// app/portfolio/page.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type PortfolioItem = {
  title: string;
  desc: string;
  link?: { href: string; label: string };
  tag?: string;
};

type PortfolioSection = {
  id: string;
  title: string;
  subtitle?: string;
  items: PortfolioItem[];
};

type PhotoCategoryKey =
  | "portrait"
  | "food"
  | "couple"
  | "corporate"
  | "editorial"
  | "family";

type GalleryImage = { src: string; alt: string };

type PhotoCategory = {
  id: PhotoCategoryKey;
  title: string;
  desc: string;
  count: number;
};

type LightboxState = {
  list: GalleryImage[];
  index: number;
  title: string;
} | null;

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

// ✅ Snappr featured link (obligatoire)
const SNAPPR_FEATURED_URL = "https://www.snappr.com/best-photographers/quebec-city-qc";

const sections: PortfolioSection[] = [
  {
    id: "clips",
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
    id: "events-video",
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
    id: "brand-video",
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

const photoCategories: PhotoCategory[] = [
  {
    id: "portrait",
    title: "Portrait",
    desc:
      "Portraits studio & lifestyle pensés pour le branding, la presse et les réseaux. Lumière maîtrisée, rendu premium.",
    count: 19,
  },
  {
    id: "food",
    title: "Food",
    desc:
      "Photographie culinaire qui met en valeur texture, couleur et appétence. Idéal pour menus, réseaux et publicité.",
    count: 9,
  },
  {
    id: "couple",
    title: "Couple",
    desc:
      "Séances couple naturelles, centrées sur la complicité et l’émotion. Direction & retouches propres.",
    count: 2,
  },
  {
    id: "corporate",
    title: "Entreprises / Corporate",
    desc:
      "Images pro pour commerces & entreprises (salon, équipe, locaux, services). Parfait pour site web & Google Business.",
    count: 4,
  },
  {
    id: "editorial",
    title: "Editorial",
    desc:
      "Direction artistique, style, intention. Pour une identité visuelle forte et des images signature.",
    count: 18,
  },
  {
    id: "family",
    title: "Family",
    desc: "Moments sincères, famille & enfants. Galerie en cours d’enrichissement.",
    count: 10,
  },
];

const buildGallery = (cat: PhotoCategoryKey, count: number, title: string): GalleryImage[] =>
  Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    return {
      src: `/photo/${cat}/${cat}-${n}.jpg`,
      alt: `${title} — ${n}`,
    };
  });

function getFocusable(container: HTMLElement) {
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ];
  return Array.from(container.querySelectorAll<HTMLElement>(selectors.join(","))).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}

export default function PortfolioPage() {
  // Galeries auto (basées sur photoCategories)
  const galleries = useMemo(() => {
    const record: Record<PhotoCategoryKey, GalleryImage[]> = {
      portrait: [],
      food: [],
      couple: [],
      corporate: [],
      editorial: [],
      family: [],
    };
    for (const c of photoCategories) record[c.id] = buildGallery(c.id, c.count, c.title);
    return record;
  }, []);

  // Lightbox
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  // Active anchor (highlight)
  const [active, setActive] = useState<PhotoCategoryKey>("portrait");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Smooth scroll (propre)
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = "smooth";
    return () => {
      el.style.scrollBehavior = prev;
    };
  }, []);

  useEffect(() => {
    const targets = photoCategories
      .map((c) => document.getElementById(`photo-${c.id}`))
      .filter((x): x is HTMLElement => Boolean(x));

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        const id = best?.target?.id;
        if (!id) return;

        const key = id.replace("photo-", "") as PhotoCategoryKey;
        setActive(key);
      },
      { root: null, threshold: [0.2, 0.4, 0.65], rootMargin: "-20% 0px -60% 0px" }
    );

    targets.forEach((t) => observerRef.current?.observe(t));
    return () => observerRef.current?.disconnect();
  }, []);

  const openLightbox = useCallback((list: GalleryImage[], index: number, title: string) => {
    lastTriggerRef.current = document.activeElement as HTMLElement | null;
    setLightbox({ list, index, title });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    // Retour focus (pro)
    setTimeout(() => {
      lastTriggerRef.current?.focus?.();
    }, 0);
  }, []);

  const prev = useCallback(() => {
    setLightbox((lb) => {
      if (!lb) return lb;
      return { ...lb, index: (lb.index - 1 + lb.list.length) % lb.list.length };
    });
  }, []);

  const next = useCallback(() => {
    setLightbox((lb) => {
      if (!lb) return lb;
      return { ...lb, index: (lb.index + 1) % lb.list.length };
    });
  }, []);

  const jumpTo = useCallback((idx: number) => {
    setLightbox((lb) => {
      if (!lb) return lb;
      const safe = Math.max(0, Math.min(lb.list.length - 1, idx));
      return { ...lb, index: safe };
    });
  }, []);

  const lightboxImage = lightbox ? lightbox.list[lightbox.index] : null;

  // Clavier + scroll lock + focus trap
  useEffect(() => {
    if (!lightbox) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus initial
    setTimeout(() => closeBtnRef.current?.focus?.(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();

      // Focus trap
      if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusables = getFocusable(dialog);
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        const activeEl = document.activeElement as HTMLElement | null;

        if (!e.shiftKey && activeEl === last) {
          e.preventDefault();
          first.focus();
        }
        if (e.shiftKey && activeEl === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [lightbox, closeLightbox, prev, next]);

  // Swipe mobile (left/right)
  const touchRef = useRef<{ x: number; y: number; t: number } | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  }, []);

  const onTouchEnd = useCallback(() => {
    // no-op
  }, []);

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchRef.current) return;
      const t = e.touches[0];
      const dx = t.clientX - touchRef.current.x;
      const dy = t.clientY - touchRef.current.y;

      // swipe horizontal only
      if (Math.abs(dx) > 70 && Math.abs(dy) < 60) {
        const elapsed = Date.now() - touchRef.current.t;
        if (elapsed < 900) {
          // reset to avoid multiple triggers
          touchRef.current = null;
          if (dx > 0) prev();
          else next();
        }
      }
    },
    [prev, next]
  );

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
          Projets & formats <span className="text-[#F5C518]">cinématographiques</span>.
        </h1>

        <p className="mt-5 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Une sélection de formats que Black Jesus Records peut réaliser : clips rap / street,
          contenus pour marques, mariages et événements — et maintenant{" "}
          <span className="text-white">séances photo professionnelles</span>.
        </p>

        {/* ✅ Snappr featured badge (visible, conforme) */}
        <div className="mt-5">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-[#F5C518]" />
            <p className="text-sm text-white/80">
              Featured as one of{" "}
              <a
                href={SNAPPR_FEATURED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#F5C518] hover:opacity-90 transition"
              >
                Quebec City’s highest-rated photographers
              </a>
              .
            </p>
          </div>
        </div>

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
            Demander un devis
          </Link>
        </div>
      </section>

      {/* Sections vidéo */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-12 space-y-12">
        {sections.map((sec) => (
          <div key={sec.id} id={sec.id} className="space-y-5 scroll-mt-28">
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
                    <h3 className="text-xl md:text-2xl font-semibold leading-snug">{item.title}</h3>
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
      </section>

      {/* PHOTO */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-16 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold">Séance photo professionnelle</h2>
          <p className="text-sm md:text-base text-white/70 max-w-3xl leading-relaxed">
            Sous-catégories claires, galerie par style, rendu uniforme.
            <span className="text-white/50"> Clique une photo (ESC • ← → • swipe mobile).</span>
          </p>
        </div>

        {/* Nav sticky (ancres) */}
        <div className="sticky top-[68px] z-20 -mx-6 lg:-mx-8 px-6 lg:px-8 py-3 backdrop-blur bg-[#0B0B0E]/70 border-y border-white/10">
          <div className="flex flex-wrap gap-2">
            {photoCategories.map((c) => {
              const isActive = active === c.id;
              return (
                <a
                  key={c.id}
                  href={`#photo-${c.id}`}
                  aria-current={isActive ? "true" : "false"}
                  className={cn(
                    "inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold border transition",
                    isActive
                      ? "bg-[#F5C518] text-black border-[#F5C518]"
                      : "bg-white/5 text-white/80 border-white/15 hover:bg-white/10 hover:border-[#F5C518]/40 hover:text-[#F5C518]"
                  )}
                >
                  {c.title}
                  <span className={cn("ml-2", isActive ? "text-black/60" : "text-white/40")}>
                    ({c.count})
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Cards catégories */}
        <div className="space-y-10 pt-2">
          {photoCategories.map((cat) => {
            const list = galleries[cat.id];

            return (
              <div key={cat.id} id={`photo-${cat.id}`} className="scroll-mt-44">
                <div className="rounded-2xl border border-white/10 bg-[#14141A] p-7">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                        {cat.title} · {cat.count} photos
                      </div>

                      <h3 className="mt-3 text-xl md:text-2xl font-semibold">{cat.title}</h3>

                      <p className="mt-2 text-sm md:text-base text-white/70 max-w-3xl leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/booking"
                        className="inline-flex items-center justify-center rounded-full bg-[#F5C518] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                      >
                        Réserver une séance
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-6 py-3 text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518] hover:text-black"
                      >
                        Tarifs / Devis
                      </Link>
                    </div>
                  </div>

                  {/* Grid */}
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {list.map((img, idx) => (
                      <button
                        key={img.src}
                        type="button"
                        onClick={() => openLightbox(list, idx, cat.title)}
                        className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-black/30"
                        aria-label={`Ouvrir ${cat.title} — photo ${idx + 1}`}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="absolute bottom-2 left-2 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[11px] text-white/80 opacity-0 group-hover:opacity-100 transition">
                          {idx + 1}/{list.length}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <p className="text-xs text-white/55 text-center">
            <strong>Galeries en cours d’enrichissement.</strong> D’autres photos seront ajoutées progressivement.
            <br />
            Fichiers optimisés web (JPEG) pour un affichage rapide sur mobile et desktop.
          </p>
        </div>
      </section>

      {/* CTA bas */}
      <section className="border-t border-white/10 bg-[#121216]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
              Tu veux qu’on transforme ton idée en <span className="text-[#F5C518]">contenu fort</span> ?
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
              Réserve une date ou décris ton projet. On te propose une approche claire,
              un rendu premium et une livraison adaptée à tes plateformes.
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

      {/* LIGHTBOX ULTRA PRO */}
      {lightbox && lightboxImage && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 bg-black/90 p-3 sm:p-4 flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse d’images"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={dialogRef}
            className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 sm:px-4 py-3 bg-black/60 backdrop-blur">
              <div className="min-w-0">
                <p className="text-sm text-white/80 truncate">
                  <span className="text-white/95 font-semibold">{lightbox.title}</span>{" "}
                  <span className="text-white/40">
                    — {lightbox.index + 1}/{lightbox.list.length}
                  </span>
                </p>
                <p className="text-[12px] text-white/45 truncate">{lightboxImage.alt}</p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={lightboxImage.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Ouvrir
                </a>

                <button
                  type="button"
                  onClick={closeLightbox}
                  ref={closeBtnRef}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                  aria-label="Fermer la visionneuse"
                >
                  Fermer
                </button>
              </div>
            </div>

            {/* Image area */}
            <div className="relative bg-black">
              <div className="relative aspect-[16/10]">
                <Image
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  fill
                  className="object-contain select-none"
                  priority
                  sizes="100vw"
                  draggable={false}
                />
              </div>

              {/* Click zones (prev/next) */}
              <button
                type="button"
                onClick={prev}
                className="absolute inset-y-0 left-0 w-[18%] sm:w-[16%] flex items-center justify-start p-3 text-white/70 hover:text-white transition"
                aria-label="Image précédente"
                title="Précédent (←)"
              >
                <span className="rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur">
                  ←
                </span>
              </button>

              <button
                type="button"
                onClick={next}
                className="absolute inset-y-0 right-0 w-[18%] sm:w-[16%] flex items-center justify-end p-3 text-white/70 hover:text-white transition"
                aria-label="Image suivante"
                title="Suivant (→)"
              >
                <span className="rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur">
                  →
                </span>
              </button>
            </div>

            {/* Bottom controls + filmstrip */}
            <div className="border-t border-white/10 bg-black/60 backdrop-blur px-3 sm:px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                    aria-label="Précédent"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                    aria-label="Suivant"
                  >
                    →
                  </button>

                  <a
                    href={lightboxImage.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Ouvrir
                  </a>
                </div>

                <div className="text-xs text-white/45 hidden md:block">
                  ESC pour fermer • ← → pour naviguer • swipe mobile
                </div>
              </div>

              {/* Filmstrip thumbnails */}
              <div className="mt-3 overflow-x-auto">
                <div className="flex gap-2 pb-1">
                  {lightbox.list.map((img, idx) => {
                    const isActive = idx === lightbox.index;
                    return (
                      <button
                        key={img.src}
                        type="button"
                        onClick={() => jumpTo(idx)}
                        className={cn(
                          "relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl border transition",
                          isActive
                            ? "border-[#F5C518] ring-2 ring-[#F5C518]/30"
                            : "border-white/10 hover:border-white/25"
                        )}
                        aria-label={`Aller à la photo ${idx + 1}`}
                        aria-current={isActive ? "true" : "false"}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className={cn(
                            "object-cover",
                            isActive ? "opacity-100" : "opacity-75 hover:opacity-95"
                          )}
                          sizes="80px"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
