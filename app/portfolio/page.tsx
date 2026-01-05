"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

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

type LightboxState =
  | {
      list: GalleryImage[];
      index: number;
      title: string;
    }
  | null;

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

/* ========= BRAND ========= */
const ACCENT = "#F5C542"; // gold accent only (controlled)

/* ========= OPTIONAL LINKS (NO NEW CTA BLOCKS) ========= */
const EMAIL = "contact@blackjesusrecords.ca";
const BRIEF_URL = "/debuter-un-projet";

// ✅ Snappr featured link (obligatoire)
const SNAPPR_FEATURED_URL = "https://www.snappr.com/best-photographers/quebec-city-qc";

/* ========= DATA ========= */
const sections: PortfolioSection[] = [
  {
    id: "clips",
    title: "Clips & artistes",
    subtitle: "Rythme, identité, performance — optimisé YouTube + formats courts.",
    items: [
      {
        title: "Shégué — Clip / univers street",
        desc: "Direction visuelle, tournage stabilisé, image contrastée, montage serré. Pensé pour performer sur YouTube et en formats courts.",
        link: {
          href: "https://youtube.com/@shegue242?si=xPnxWCIG98q8bohh",
          label: "Voir sur YouTube",
        },
        tag: "Clip",
      },
      {
        title: "Session studio filmée",
        desc: "Performance captée en studio : éclairage contrôlé, multi-angles, rendu propre. Idéal pour présenter un artiste sans filtre.",
        tag: "Studio",
      },
    ],
  },
  {
    id: "events",
    title: "Événements",
    subtitle: "Captation discrète, montage émotionnel ou dynamique, livrables prêts à partager.",
    items: [
      {
        title: "Mariage / événement privé",
        desc: "Moments forts, détails, émotion. Film final livré en formats partage + archive.",
        tag: "Événement",
      },
      {
        title: "Aftermovie (show / soirée)",
        desc: "Résumé énergique : public, scène, ambiance, sound design. Un rendu qui donne envie de revivre l’événement.",
        tag: "Aftermovie",
      },
    ],
  },
  {
    id: "brands",
    title: "Marques & entreprises",
    subtitle: "Message clair, esthétique premium, cohérence de marque — conçu pour convertir.",
    items: [
      {
        title: "Reels / TikTok / Shorts",
        desc: "Hook rapide, rythme maîtrisé, texte à l’écran, transitions propres. Conçu pour convertir.",
        tag: "Social",
      },
      {
        title: "Vidéo corporate",
        desc: "Présentation d’entreprise : activité, équipe, service, valeurs. Parfait pour site web, LinkedIn et pitch.",
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
    desc: "Équipe, locaux, services : des images pro pour site web & Google Business.",
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
    return { src: `/photo/${cat}/${cat}-${n}.jpg`, alt: `${title} — ${n}` };
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

/* ========= UI TOKENS (dark premium) ========= */
const UI = {
  page: "min-h-screen bg-black text-white",
  wrap: "max-w-6xl mx-auto px-6 lg:px-8",
  subtle: "text-white/70 leading-relaxed",
  fine: "text-white/50",
  card: "rounded-2xl border border-white/12 bg-white/[0.03] backdrop-blur",
  cardHover:
    "transition duration-200 hover:border-white/22 hover:bg-white/[0.045]",
  pill:
    "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs text-white/70",
  tag:
    "inline-flex items-center rounded-full border border-white/14 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold text-white/60",
  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",
  link:
    "inline-flex items-center gap-2 text-sm font-semibold text-white/85 underline underline-offset-8 decoration-white/15 hover:text-white hover:decoration-white/30 transition",
  btnGhost:
    "inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.07] hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
  btnSoft:
    "inline-flex items-center justify-center rounded-full border border-white/15 bg-transparent px-6 py-3 text-sm font-semibold text-white/80 transition hover:text-white hover:border-white/25 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
  kbd: "rounded-md border border-white/15 bg-white/[0.04] px-2 py-1 text-[11px] text-white/70",
};

export default function PortfolioPage() {
  const reduce = useReducedMotion();

  /* ===== motion (sobre, guide de lecture) ===== */
  const container: Variants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: reduce ? 0 : 0.08,
          delayChildren: reduce ? 0 : 0.05,
        },
      },
    }),
    [reduce]
  );

  const item: Variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: reduce ? 0 : 14,
        filter: reduce ? "blur(0px)" : "blur(6px)",
      },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: reduce ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] },
      },
    }),
    [reduce]
  );

  /* ===== Galleries ===== */
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

  /* ===== Lightbox ===== */
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

  /* ===== Keyboard + scroll lock + focus trap ===== */
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

  /* ===== Swipe mobile ===== */
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

  /* ===== Active photo anchor ===== */
  const [active, setActive] = useState<PhotoCategoryKey>("portrait");
  const observerRef = useRef<IntersectionObserver | null>(null);

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
        setActive(id.replace("photo-", "") as PhotoCategoryKey);
      },
      { root: null, threshold: [0.2, 0.4, 0.65], rootMargin: "-20% 0px -60% 0px" }
    );

    targets.forEach((t) => observerRef.current?.observe(t));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <main className={UI.page}>
      {/* ===== HERO (respire) ===== */}
      <section className={cn(UI.wrap, "pt-20 md:pt-24 pb-20 md:pb-28")}>
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
          <motion.div variants={item} className={UI.pill}>
            <span className="tracking-[0.28em] uppercase text-[11px] font-semibold text-white/70">
              PORTFOLIO
            </span>
          </motion.div>

          {/* gold contrôlé : uniquement un segment */}
          <motion.h1
            variants={item}
            className="text-4xl md:text-6xl font-extrabold leading-[1.03] tracking-tight max-w-4xl"
          >
            Projets visuels{" "}
            <span style={{ color: ACCENT }}>ciné</span>{" "}
            & contenus qui performent.
          </motion.h1>

          <motion.p variants={item} className={cn("max-w-3xl text-base md:text-lg", UI.subtle)}>
            Clips, événements, marques, photo — une exécution propre, un rendu premium, des livrables prêts à publier.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3">
            <Link href={BRIEF_URL} className={UI.btnGhost}>
              Brief / devis
            </Link>
            <a
              href={`mailto:${EMAIL}?subject=Projet%20—%20Black%20Jesus%20Records`}
              className={UI.btnSoft}
            >
              {EMAIL}
            </a>
            <a
              href={SNAPPR_FEATURED_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(UI.btnSoft, "text-white/75")}
            >
              Snappr — Featured
            </a>
          </motion.div>

          <motion.div variants={item} className={cn(UI.sep, "my-10 md:my-14")} />

          {/* preuve discrète */}
          <motion.p variants={item} className="max-w-3xl text-sm text-white/60">
            Featured as one of Quebec City’s highest-rated photographers (Snappr).
          </motion.p>
        </motion.div>
      </section>

      {/* ===== VIDEO SECTIONS (espacées) ===== */}
      <section className={cn(UI.wrap, "pb-24 md:pb-32")}>
        <div className="space-y-20 md:space-y-28">
          {sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="scroll-mt-28">
              <div className="max-w-3xl space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {sec.title}
                </h2>
                {sec.subtitle && (
                  <p className={cn("text-sm md:text-base", UI.subtle)}>{sec.subtitle}</p>
                )}
              </div>

              <div className="mt-10 grid gap-8 md:gap-10 md:grid-cols-2">
                {sec.items.map((it) => (
                  <article
                    key={it.title}
                    className={cn(UI.card, UI.cardHover, "p-8 md:p-10")}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl md:text-2xl font-semibold leading-snug">
                        {it.title}
                      </h3>
                      {it.tag && <span className={UI.tag}>{it.tag}</span>}
                    </div>

                    <p className={cn("mt-4 text-sm md:text-base max-w-2xl", UI.subtle)}>
                      {it.desc}
                    </p>

                    {/* preuve > promesse : lien seulement si dispo */}
                    <div className="mt-8">
                      {it.link ? (
                        <a
                          href={it.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={UI.link}
                        >
                          {it.link.label}
                        </a>
                      ) : (
                        <span className="text-sm font-semibold text-white/55">
                          Exemple — sur demande
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              <div className={cn(UI.sep, "mt-14 md:mt-16")} />
            </section>
          ))}
        </div>
      </section>

      {/* ===== PHOTO (respire) ===== */}
      <section className={cn(UI.wrap, "pb-24 md:pb-32")}>
        <div className="space-y-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Photo — séances premium
          </h2>
          <p className={cn("text-sm md:text-base", UI.subtle)}>
            Galeries par style. Clique une photo pour ouvrir la visionneuse.{" "}
            <span className={UI.fine}>
              (<span className={UI.kbd}>ESC</span> • <span className={UI.kbd}>←</span>{" "}
              <span className={UI.kbd}>→</span> • swipe)
            </span>
          </p>
        </div>

        {/* sticky nav (gold uniquement sur l’actif) */}
        <div className="mt-10 sticky top-[68px] z-20 -mx-6 lg:-mx-8 px-6 lg:px-8 py-2 backdrop-blur bg-black/55 border-y border-white/10">
          <div className="flex flex-wrap gap-2">
            {photoCategories.map((c) => {
              const isActive = active === c.id;
              return (
                <a
                  key={c.id}
                  href={`#photo-${c.id}`}
                  aria-current={isActive ? "true" : "false"}
                  className={cn(
                    "inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                    isActive
                      ? "bg-white/[0.05] text-white border-white/30"
                      : "bg-white/[0.03] text-white/80 border-white/15 hover:bg-white/[0.055] hover:border-white/25"
                  )}
                >
                  <span className="relative">
                    {c.title}
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full"
                        style={{ background: ACCENT }}
                      />
                    )}
                  </span>
                  <span className="ml-2 text-white/45">({c.count})</span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-16 md:mt-20 space-y-16 md:space-y-20">
          {photoCategories.map((cat) => {
            const list = galleries[cat.id];
            return (
              <section key={cat.id} id={`photo-${cat.id}`} className="scroll-mt-44">
                <div className={cn(UI.card, "p-8 md:p-10")}>
                  <div className="max-w-3xl">
                    <div className={UI.pill}>
                      <span className="text-white/70">
                        {cat.title} · {cat.count} photos
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl md:text-2xl font-semibold tracking-tight">
                      {cat.title}
                    </h3>
                    <p className={cn("mt-3 text-sm md:text-base max-w-2xl", UI.subtle)}>
                      {cat.desc}
                    </p>
                  </div>

                  {/* grid plus aérée => scroll */}
                  <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 md:gap-5">
                    {list.map((img, idx) => (
                      <button
                        key={img.src}
                        type="button"
                        onClick={() => openLightbox(list, idx, cat.title)}
                        className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/12 bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                        aria-label={`Ouvrir ${cat.title} — photo ${idx + 1}`}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="absolute bottom-2 left-2 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[11px] text-white/80 opacity-0 group-hover:opacity-100 transition">
                          {idx + 1}/{list.length}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}

          <p className="text-xs text-white/50 text-center">
            Galeries en croissance — ajout régulier de contenu. Images optimisées web pour un affichage rapide.
          </p>
        </div>
      </section>

      {/* ===== LIGHTBOX (sobre, perf, accessible) ===== */}
      <AnimatePresence>
        {lightbox && lightboxImage && (
          <motion.div
            key="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: reduce ? 0 : 0.2 } }}
            exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.18 } }}
            className="fixed inset-0 z-50 bg-black/90 p-3 sm:p-4 flex items-center justify-center"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Visionneuse d’images"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
          >
            <motion.div
              key="lightbox-dialog"
              initial={{ y: reduce ? 0 : 10, scale: reduce ? 1 : 0.99, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1, transition: { duration: reduce ? 0 : 0.22 } }}
              exit={{ y: reduce ? 0 : 8, scale: reduce ? 1 : 0.99, opacity: 0, transition: { duration: reduce ? 0 : 0.18 } }}
              ref={dialogRef}
              className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/12 bg-black"
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

                <button
                  type="button"
                  onClick={closeLightbox}
                  ref={closeBtnRef}
                  className={cn(UI.btnSoft, "px-4 py-2 text-sm")}
                  aria-label="Fermer la visionneuse"
                >
                  Fermer
                </button>
              </div>

              {/* Image */}
              <div className="relative bg-black">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={lightboxImage.src}
                    alt={lightboxImage.alt}
                    fill
                    className="object-contain select-none"
                    sizes="100vw"
                    draggable={false}
                  />
                </div>

                {/* Prev/Next zones */}
                <button
                  type="button"
                  onClick={prev}
                  className="absolute inset-y-0 left-0 w-[18%] sm:w-[16%] flex items-center justify-start p-3 text-white/70 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
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
                  className="absolute inset-y-0 right-0 w-[18%] sm:w-[16%] flex items-center justify-end p-3 text-white/70 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                  aria-label="Image suivante"
                  title="Suivant (→)"
                >
                  <span className="rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur">
                    →
                  </span>
                </button>
              </div>

              {/* Filmstrip */}
              <div className="border-t border-white/10 bg-black/60 backdrop-blur px-3 sm:px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-white/45 hidden md:block">
                    <span className={UI.kbd}>ESC</span> fermer • <span className={UI.kbd}>←</span>{" "}
                    <span className={UI.kbd}>→</span> naviguer • swipe mobile
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
                            "relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                            isActive
                              ? "border-white/35"
                              : "border-white/10 hover:border-white/25"
                          )}
                          style={
                            isActive
                              ? { boxShadow: `0 0 0 2px rgba(245,197,66,0.12)` }
                              : undefined
                          }
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
