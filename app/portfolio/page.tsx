// app/portfolio/page.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type PortfolioItem = {
  title: string;
  desc: string;
  tag?: string;
  link?: { href: string; label: string };
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

/** ─────────────────────────────────────────────
 *  DATA
 *  ───────────────────────────────────────────── */
const sections: PortfolioSection[] = [
  {
    id: "clips",
    title: "Clips & artistes",
    subtitle:
      "Rythme, identité, performance — optimisé YouTube + réseaux. Du contenu qui a un impact.",
    items: [
      {
        title: "Shégué — Clip / univers street",
        desc:
          "Direction visuelle, tournage stabilisé, image contrastée, montage serré. Pensé pour performer sur YouTube et en formats courts.",
        tag: "Clip",
        link: {
          href: "https://youtube.com/@shegue242?si=xPnxWCIG98q8bohh",
          label: "Voir Shégué sur YouTube",
        },
      },
      {
        title: "Session studio filmée",
        desc:
          "Performance captée en studio : éclairage contrôlé, multi-angles, rendu propre. Idéal pour présenter un artiste sans filtre.",
        tag: "Studio",
      },
    ],
  },
  {
    id: "events",
    title: "Événements",
    subtitle:
      "Captation discrète, montage émotionnel ou dynamique, livraison prête à partager.",
    items: [
      {
        title: "Mariage / événement privé",
        desc:
          "Les moments forts, les détails, l’émotion. Film final livré en formats partage + archive.",
        tag: "Événement",
      },
      {
        title: "Aftermovie (show / soirée)",
        desc:
          "Résumé énergique : public, scène, ambiance, sound design. Un rendu qui donne envie de revivre l’événement.",
        tag: "Aftermovie",
      },
    ],
  },
  {
    id: "brands",
    title: "Marques & entreprises",
    subtitle:
      "Formats courts qui captent l’attention : message clair, esthétique premium, cohérence de marque.",
    items: [
      {
        title: "Reels / TikTok / Shorts",
        desc:
          "Hook rapide, rythme maîtrisé, texte à l’écran, transitions propres. Conçu pour convertir.",
        tag: "Social",
      },
      {
        title: "Vidéo corporate",
        desc:
          "Présentation d’entreprise : activité, équipe, service, valeurs. Parfait pour site web, LinkedIn et pitch.",
        tag: "Corporate",
      },
    ],
  },
];

const photoCategories: PhotoCategory[] = [
  {
    id: "portrait",
    title: "Portrait",
    desc: "Branding, presse, réseaux : lumière maîtrisée, rendu clean, image qui inspire confiance.",
    count: 19,
  },
  {
    id: "editorial",
    title: "Editorial",
    desc: "Direction artistique, intention, image signature. Pour un univers fort.",
    count: 18,
  },
  {
    id: "corporate",
    title: "Corporate",
    desc: "Équipe, locaux, services, produits : des images pro pour site web & Google Business.",
    count: 4,
  },
  {
    id: "food",
    title: "Food",
    desc: "Texture, couleur, appétence. Menus, réseaux, pubs — rendu premium.",
    count: 9,
  },
  {
    id: "family",
    title: "Family",
    desc: "Moments sincères, naturel, émotion. Galerie en croissance.",
    count: 10,
  },
  {
    id: "couple",
    title: "Couple",
    desc: "Complicité, émotion, direction légère. Retouches propres.",
    count: 2,
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

/** ─────────────────────────────────────────────
 *  UI
 *  ───────────────────────────────────────────── */
const UI = {
  wrap: "max-w-6xl mx-auto px-6 lg:px-8",
  card:
    "rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl " +
    "shadow-[0_18px_60px_rgba(0,0,0,0.45)]",
  cardHover:
    "transition duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:-translate-y-[1px]",
  pill:
    "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70",
  subtle: "text-white/70 leading-relaxed",
  h1: "mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-[-0.02em]",
  h2: "text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]",
  btnPrimary:
    "group relative inline-flex items-center justify-center rounded-full bg-[#F5C518] " +
    "px-6 py-3 text-sm font-semibold text-black transition hover:opacity-95 " +
    "shadow-[0_14px_40px_rgba(245,197,24,0.18)] overflow-hidden",
  btnShine:
    "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r " +
    "from-transparent via-white/25 to-transparent group-hover:translate-x-full transition duration-700",
  btnSecondary:
    "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 " +
    "px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10",
  btnGoldOutline:
    "inline-flex items-center justify-center rounded-full border border-[#F5C518] " +
    "px-6 py-3 text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518] hover:text-black",
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className={UI.pill}>
      <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
      {children}
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-sm text-white/80">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
      <span className="leading-relaxed">{children}</span>
    </div>
  );
}

/** ─────────────────────────────────────────────
 *  PAGE
 *  ───────────────────────────────────────────── */
export default function PortfolioPage() {
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
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const openLightbox = useCallback((list: GalleryImage[], index: number, title: string) => {
    lastTriggerRef.current = document.activeElement as HTMLElement | null;
    setLightbox({ list, index, title });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    setTimeout(() => lastTriggerRef.current?.focus?.(), 0);
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

  // Smooth scroll
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = "smooth";
    return () => {
      el.style.scrollBehavior = prev;
    };
  }, []);

  // Photo scrollspy
  const [active, setActive] = useState<PhotoCategoryKey>("portrait");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const targets = photoCategories
      .map((c) => document.getElementById(`photo-${c.id}`))
      .filter((x): x is HTMLElement => Boolean(x));

    if (!targets.length) return;

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
      { root: null, threshold: [0.2, 0.45, 0.65], rootMargin: "-20% 0px -60% 0px" }
    );

    targets.forEach((t) => observerRef.current?.observe(t));
    return () => observerRef.current?.disconnect();
  }, []);

  // Lightbox keyboard + focus trap + scroll lock
  useEffect(() => {
    if (!lightbox) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => closeBtnRef.current?.focus?.(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();

      if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusables = getFocusable(dialog);
        if (!focusables.length) return;

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

  // Mobile swipe
  const touchRef = useRef<{ x: number; y: number; t: number } | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  }, []);

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchRef.current) return;
      const t = e.touches[0];
      const dx = t.clientX - touchRef.current.x;
      const dy = t.clientY - touchRef.current.y;

      if (Math.abs(dx) > 70 && Math.abs(dy) < 60) {
        const elapsed = Date.now() - touchRef.current.t;
        if (elapsed < 900) {
          touchRef.current = null;
          if (dx > 0) prev();
          else next();
        }
      }
    },
    [prev, next]
  );

  return (
    <main className="min-h-screen text-white relative">
      <div className="relative">
        {/* HERO */}
        <section className={cn(UI.wrap, "pt-16 pb-10")}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
            <p className="text-[11px] font-semibold tracking-[0.25em] text-white/70 uppercase">
              Portfolio
            </p>
          </div>

          <h1 className={UI.h1}>
            Projets{" "}
            <span className="text-[#F5C518] drop-shadow-[0_0_22px_rgba(245,197,24,0.25)]">
              visuels
            </span>{" "}
            & contenus qui performnent.
          </h1>

          <p className={cn("mt-5 max-w-3xl text-base md:text-lg", UI.subtle)}>
            Clips, événements, contenus marques — et séances photo premium. Tout est pensé pour être
            beau, cohérent, et prêt pour tes plateformes.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/booking" className={UI.btnPrimary}>
              <span className={UI.btnShine} />
              <span className="relative">Réserver</span>
            </Link>

            <Link href="/contact" className={UI.btnSecondary}>
              Demander un devis
            </Link>
          </div>

          <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        </section>

        {/* VIDEO SECTIONS */}
        <section className={cn(UI.wrap, "pb-12 space-y-12")}>
          {sections.map((sec) => (
            <div key={sec.id} id={sec.id} className="space-y-5 scroll-mt-28">
              <div className="space-y-2">
                <h2 className={UI.h2}>{sec.title}</h2>
                {sec.subtitle && (
                  <p className={cn("text-sm md:text-base max-w-3xl", UI.subtle)}>{sec.subtitle}</p>
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {sec.items.map((item) => (
                  <div key={item.title} className={cn(UI.card, UI.cardHover, "p-7")}>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl md:text-2xl font-semibold leading-snug">
                        {item.title}
                      </h3>
                      {item.tag && <span className={cn(UI.pill, "shrink-0")}>{item.tag}</span>}
                    </div>

                    <p className={cn("mt-3 text-sm md:text-base", UI.subtle)}>{item.desc}</p>

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

                    <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                    <div className="mt-5 flex gap-3">
                      <Link href="/booking" className={UI.btnGoldOutline}>
                        Réserver
                      </Link>
                      <Link href="/contact" className={UI.btnSecondary}>
                        Brief / Devis
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* PHOTO */}
        <section className={cn(UI.wrap, "pb-16 space-y-6")}>
          <div className="space-y-2">
            <h2 className={UI.h2}>Photo — séances premium</h2>
            <p className={cn("text-sm md:text-base max-w-3xl", UI.subtle)}>
              Galeries par style. Clique une photo pour ouvrir la visionneuse.
              <span className="text-white/50"> (ESC • ← → • swipe mobile)</span>
            </p>
          </div>

          {/* Sticky photo nav */}
          <div className="sticky top-[64px] z-20 -mx-6 lg:-mx-8 px-6 lg:px-8 py-3 backdrop-blur-xl bg-black/30 border-y border-white/10">
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
                        ? "bg-[#F5C518] text-black border-[#F5C518] shadow-[0_10px_30px_rgba(245,197,24,0.15)]"
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

          {/* Categories */}
          <div className="space-y-10 pt-2">
            {photoCategories.map((cat) => {
              const list = galleries[cat.id];

              return (
                <div key={cat.id} id={`photo-${cat.id}`} className="scroll-mt-44">
                  <div className={cn(UI.card, "p-7")}>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                      <div className="max-w-3xl">
                        <Badge>
                          {cat.title} · {cat.count} photos
                        </Badge>
                        <h3 className="mt-3 text-xl md:text-2xl font-semibold">{cat.title}</h3>
                        <p className={cn("mt-2 text-sm md:text-base", UI.subtle)}>{cat.desc}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/booking" className={UI.btnPrimary}>
                          <span className={UI.btnShine} />
                          <span className="relative">Réserver une séance</span>
                        </Link>
                        <Link href="/contact" className={UI.btnGoldOutline}>
                          Tarifs / Devis
                        </Link>
                      </div>
                    </div>

                    <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                      {list.map((img, idx) => (
                        <button
                          key={img.src}
                          type="button"
                          onClick={() => openLightbox(list, idx, cat.title)}
                          className={cn(
                            "group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-black/25",
                            "transition hover:border-white/20 hover:-translate-y-[1px]"
                          )}
                          aria-label={`Ouvrir ${cat.title} — photo ${idx + 1}`}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
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
              Galeries en croissance — on ajoute du contenu régulièrement.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 bg-black/25 backdrop-blur-xl">
          <div className={cn(UI.wrap, "py-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between")}>
            <div className="max-w-2xl">
              <h2 className={UI.h2}>
                Un projet à tourner ? On livre un rendu{" "}
                <span className="text-[#F5C518] drop-shadow-[0_0_18px_rgba(245,197,24,0.18)]">
                  premium
                </span>
                .
              </h2>
              <p className={cn("mt-3 text-sm md:text-base", UI.subtle)}>
                Réserve une date ou envoie ton brief. Réponse claire : scope, délais, livrables.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/booking" className={UI.btnPrimary}>
                <span className={UI.btnShine} />
                <span className="relative">Réserver</span>
              </Link>

              <Link href="/contact" className={UI.btnGoldOutline}>
                Contact
              </Link>
            </div>
          </div>
        </section>

        {/* LIGHTBOX */}
        {lightbox && lightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 p-3 sm:p-4 flex items-center justify-center"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Visionneuse d’images"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={() => {}}
          >
            <div
              ref={dialogRef}
              className={cn(
                "relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black",
                "shadow-[0_30px_120px_rgba(0,0,0,0.7)]"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Topbar */}
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

              {/* Image */}
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

              {/* Thumbs */}
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
                    ESC • ← → • swipe
                  </div>
                </div>

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
      </div>
    </main>
  );
}
