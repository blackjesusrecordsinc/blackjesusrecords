// app/portfolio/page.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import HeroCineSlider from "@/components/HeroCineSlider";
import PhotoCategorySection from "@/components/portfolio/PhotoCategorySection";
import Lightbox from "@/components/portfolio/Lightbox";

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

const PHOTO_KEYS = ["portrait", "food", "couple", "corporate", "editorial", "family"] as const;
export type PhotoCategoryKey = (typeof PHOTO_KEYS)[number];

export type GalleryImage = { src: string; alt: string };

export type PhotoCategory = {
  id: PhotoCategoryKey;
  title: string;
  desc: string;
  count: number;
};

export type LightboxState =
  | {
      list: GalleryImage[];
      index: number;
      title: string;
    }
  | null;

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

/* ───────────────────────── CONST ───────────────────────── */
export const BLUR_1PX =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='rgba(0,0,0,0.45)'/%3E%3C/svg%3E";

/* ───────────────────────── DATA ───────────────────────── */
const portfolioSections: PortfolioSection[] = [
  {
    id: "clips",
    title: "Clips & artistes",
    subtitle:
      "Image, rythme, présence. Un rendu ciné propre, décliné pour YouTube et les formats courts.",
    items: [
      {
        title: "Shégué — clip / univers street",
        desc:
          "Direction visuelle, tournage stabilisé, contraste maîtrisé, montage serré. Une identité claire, pensée pour tenir l’écran et se décliner en extraits.",
        tag: "Clip",
        link: {
          href: "https://youtube.com/@shegue242?si=xPnxWCIG98q8bohh",
          label: "Voir Shégué sur YouTube",
        },
      },
      {
        title: "Session studio filmée",
        desc:
          "Performance captée en studio : lumière contrôlée, multi-angles, son propre. Idéal pour présenter un artiste sans artifice, avec un rendu sérieux.",
        tag: "Studio",
      },
    ],
  },
  {
    id: "events",
    title: "Événements",
    subtitle:
      "Captation discrète, montage vivant, livraison prête à partager — sans perdre l’émotion ni l’énergie.",
    items: [
      {
        title: "Mariage / événement privé",
        desc:
          "Les moments forts, les détails, les regards. Un film final propre, plus une version courte pour le partage, et une archive complète.",
        tag: "Événement",
      },
      {
        title: "Aftermovie (show / soirée)",
        desc:
          "Résumé dynamique : public, scène, ambiance, sound design léger. Un rendu qui raconte la soirée et donne envie d’y retourner.",
        tag: "Aftermovie",
      },
    ],
  },
  {
    id: "brands",
    title: "Marques & entreprises",
    subtitle:
      "Du contenu qui se comprend vite. Une esthétique premium, une exécution nette, une cohérence de marque solide.",
    items: [
      {
        title: "Reels / TikTok / Shorts",
        desc:
          "Hook rapide, rythme propre, texte à l’écran quand il faut, transitions nettes. Conçu pour garder l’attention et amener à l’action.",
        tag: "Social",
      },
      {
        title: "Vidéo corporate",
        desc:
          "Présentation d’entreprise : équipe, service, savoir-faire, valeurs. Parfait pour site web, LinkedIn, campagnes et pitch.",
        tag: "Corporate",
      },
    ],
  },
];

const photoCategories: PhotoCategory[] = [
  {
    id: "portrait",
    title: "Portrait",
    desc: "Branding, presse, réseaux : lumière maîtrisée, peau propre, rendu net. Une image qui inspire confiance.",
    count: 19,
  },
  {
    id: "editorial",
    title: "Editorial",
    desc: "Direction artistique, intention, image signature. Pour un univers fort et cohérent.",
    count: 18,
  },
  {
    id: "corporate",
    title: "Corporate",
    desc: "Équipe, locaux, services, produits : des visuels propres pour site web, Google Business et communication.",
    count: 4,
  },
  {
    id: "food",
    title: "Food",
    desc: "Texture, couleur, appétence. Menus, pubs, réseaux : rendu premium, sans sur-traitement.",
    count: 9,
  },
  {
    id: "family",
    title: "Family",
    desc: "Moments vrais, naturel, émotion. Une galerie qui grandit au fil des séances.",
    count: 10,
  },
  {
    id: "couple",
    title: "Couple",
    desc: "Complicité, émotion, direction légère. Retouches propres, rendu doux et élégant.",
    count: 2,
  },
];

const buildGallery = (cat: PhotoCategoryKey, count: number, title: string): GalleryImage[] =>
  Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    return { src: `/photo/${cat}/${cat}-${n}.jpg`, alt: `${title} — ${n}` };
  });

function scrollToIdWithOffset(id: string, offsetPx: number) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offsetPx;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ───────────────────────── UI TOKENS ───────────────────────── */
const UI = {
  wrap: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
  pill:
    "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20",
  card:
    "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.35)]",
  cardHover:
    "transition duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:-translate-y-[1px]",
  subtle: "text-white/75 leading-relaxed",
  h2: "text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]",
  btnPrimary:
    "group relative inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-black transition hover:opacity-95 shadow-[0_14px_44px_rgba(0,0,0,0.45)] overflow-hidden",
  btnShine:
    "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent group-hover:translate-x-full transition duration-700",
  btnSecondary:
    "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:border-yellow-400/40 hover:text-yellow-200",
  btnOutline:
    "inline-flex items-center justify-center rounded-full border border-yellow-400/70 bg-transparent px-6 py-3 text-sm font-semibold text-yellow-200 transition hover:bg-yellow-400 hover:text-black",
  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",
};

export default function PortfolioPage() {
  const cats = useMemo(() => photoCategories, []);

  const galleries = useMemo(() => {
    const record: Record<PhotoCategoryKey, GalleryImage[]> = {
      portrait: [],
      food: [],
      couple: [],
      corporate: [],
      editorial: [],
      family: [],
    };
    for (const c of cats) record[c.id] = buildGallery(c.id, c.count, c.title);
    return record;
  }, [cats]);

  // Lightbox state
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const openLightbox = useCallback((list: GalleryImage[], index: number, title: string) => {
    lastTriggerRef.current = (document.activeElement as HTMLElement | null) ?? null;
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

  // Smooth scroll (optional)
  useEffect(() => {
    const el = document.documentElement;
    const prevSB = el.style.scrollBehavior;
    el.style.scrollBehavior = "smooth";
    return () => {
      el.style.scrollBehavior = prevSB;
    };
  }, []);

  // Sticky offset auto (no magic 140)
  const stickyWrapRef = useRef<HTMLDivElement | null>(null);
  const [stickyOffset, setStickyOffset] = useState<number>(0);

  useEffect(() => {
    const compute = () => {
      const stickyH = stickyWrapRef.current?.getBoundingClientRect().height ?? 0;
      setStickyOffset(Math.ceil(stickyH + 16));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Scrollspy + sticky nav center (mobile-friendly)
  const [active, setActive] = useState<PhotoCategoryKey>("portrait");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const photoNavRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const targets = cats
      .map((c) => document.getElementById(`photo-${c.id}`))
      .filter((x): x is HTMLElement => Boolean(x));

    if (!targets.length) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        const id = visible?.target?.id;
        if (!id) return;

        setActive(id.replace("photo-", "") as PhotoCategoryKey);
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: `-${Math.max(0, stickyOffset)}px 0px -70% 0px`,
      }
    );

    targets.forEach((t) => observerRef.current?.observe(t));
    return () => observerRef.current?.disconnect();
  }, [cats, stickyOffset]);

  useEffect(() => {
    const root = photoNavRef.current;
    if (!root) return;

    const activeBtn = root.querySelector<HTMLElement>(`[aria-current="true"]`);
    if (!activeBtn) return;

    const left = activeBtn.offsetLeft - root.clientWidth / 2 + activeBtn.clientWidth / 2;
    root.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  // Anchor/hash support with offset
  useEffect(() => {
    if (!stickyOffset) return;
    const hash = window.location.hash?.replace("#", "");
    if (!hash) return;
    setTimeout(() => scrollToIdWithOffset(hash, stickyOffset), 0);
  }, [stickyOffset]);

  return (
    <main className="min-h-screen text-white relative">
      {/* HERO */}
      <section className="relative min-h-[58vh] flex items-center overflow-hidden">
        <HeroCineSlider count={10} ext=".jpg" intervalMs={8000} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75 backdrop-blur-[2px]" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-yellow-400/12 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-purple-500/12 blur-3xl"
        />

        <div className="relative z-10 w-full">
          <div className={cn(UI.wrap, "pt-24 pb-14")}>
            <div className="space-y-6">
              <div className={UI.pill}>
                <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-yellow-300">Portfolio</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
                Une sélection{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-yellow-200 bg-clip-text text-transparent">
                  précise
                </span>{" "}
                de nos rendus.
              </h1>

              <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
                Clips, événements, contenus pour marques — et séances photo. Même exigence : une image nette,
                une direction claire, des livrables prêts à publier.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/booking" className={UI.btnPrimary}>
                  <span className={UI.btnShine} />
                  <span className="relative">Réserver</span>
                </Link>
                <Link href="/contact" className={UI.btnSecondary}>
                  Brief / devis
                </Link>
              </div>

              <div className={UI.sep} />
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO SECTIONS */}
      <section className={cn(UI.wrap, "pb-14 -mt-8")}>
        <div className="space-y-12">
          {portfolioSections.map((sec) => (
            <div key={sec.id} id={sec.id} className="space-y-5 scroll-mt-28">
              <div className="space-y-2">
                <h2 className={UI.h2}>{sec.title}</h2>
                {sec.subtitle && (
                  <p className={cn("text-sm md:text-base max-w-3xl", UI.subtle)}>{sec.subtitle}</p>
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {sec.items.map((it) => (
                  <div key={it.title} className={cn(UI.card, UI.cardHover, "p-7")}>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl md:text-2xl font-semibold leading-snug">{it.title}</h3>
                      {it.tag && (
                        <span className={cn(UI.pill, "shrink-0")}>
                          <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                          <span className="text-xs text-yellow-200/90">{it.tag}</span>
                        </span>
                      )}
                    </div>

                    <p className={cn("mt-3 text-sm md:text-base", UI.subtle)}>{it.desc}</p>

                    {it.link && (
                      <div className="mt-5">
                        <a
                          href={it.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-200 hover:opacity-90 transition"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                          {it.link.label}
                        </a>
                      </div>
                    )}

                    <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                    <div className="mt-5 flex flex-col sm:flex-row gap-3">
                      <Link href="/booking" className={UI.btnOutline}>
                        Réserver
                      </Link>
                      <Link href="/contact" className={UI.btnSecondary}>
                        Brief / devis
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PHOTO */}
      <section className={cn(UI.wrap, "pb-16 space-y-6")}>
        <div className="space-y-2">
          <h2 className={UI.h2}>Photo — séances premium</h2>
          <p className={cn("text-sm md:text-base max-w-3xl", UI.subtle)}>
            Galeries par style. Clique une photo pour ouvrir la visionneuse.
            <span className="text-white/55"> (ESC • ← → • swipe)</span>
          </p>
        </div>

        {/* Sticky nav */}
        <div
          ref={stickyWrapRef}
          className="sticky top-[64px] z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 backdrop-blur-xl bg-black/35 border-y border-white/10"
        >
          <div ref={photoNavRef} className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
            {cats.map((c) => {
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-current={isActive ? "true" : "false"}
                  onClick={() => scrollToIdWithOffset(`photo-${c.id}`, stickyOffset)}
                  className={cn(
                    "inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold border transition whitespace-nowrap shrink-0",
                    isActive
                      ? "bg-yellow-400 text-black border-yellow-400 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                      : "bg-white/5 text-white/80 border-white/15 hover:bg-white/10 hover:border-yellow-400/40 hover:text-yellow-200"
                  )}
                >
                  {c.title}
                  <span className={cn("ml-2", isActive ? "text-black/70" : "text-white/40")}>
                    ({c.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-10 pt-2">
          {cats.map((cat) => (
            <PhotoCategorySection
              key={cat.id}
              id={`photo-${cat.id}`}
              cat={cat}
              list={galleries[cat.id]}
              blurDataURL={BLUR_1PX}
              onOpen={(idx) => openLightbox(galleries[cat.id], idx, cat.title)}
              style={{ scrollMarginTop: stickyOffset }}
            />
          ))}

          <p className="text-xs text-white/60 text-center">
            Galeries en croissance — ajout régulier de contenu.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-white/5 backdrop-blur-xl">
        <div className={cn(UI.wrap, "py-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between")}>
          <div className="max-w-2xl">
            <h2 className={UI.h2}>
              On tourne quand ?{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-200 bg-clip-text text-transparent">
                On cadre.
              </span>
            </h2>
            <p className={cn("mt-3 text-sm md:text-base", UI.subtle)}>
              Envoie ton brief ou réserve une date. On répond avec un scope clair, des délais réalistes, et des livrables précis.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/booking" className={UI.btnPrimary}>
              <span className={UI.btnShine} />
              <span className="relative">Réserver</span>
            </Link>
            <Link href="/contact" className={UI.btnOutline}>
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <Lightbox state={lightbox} onClose={closeLightbox} onPrev={prev} onNext={next} onJump={jumpTo} />
    </main>
  );
}
