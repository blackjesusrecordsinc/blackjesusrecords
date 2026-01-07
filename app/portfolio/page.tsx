"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { Variants } from "framer-motion";

import HeroCineSlider from "@/components/HeroCineSlider";
import Reveal from "@/components/Reveal";


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

const ACCENT = "#F5C542";
const BRIEF_URL = "/debuter-un-projet";
const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/contact-blackjesusrecords/30min";

const easeCine: [number, number, number, number] = [0.22, 1, 0.36, 1];

const UI = {
  page: "min-h-screen bg-black text-white isolate",
  wrap: "max-w-6xl mx-auto px-6 lg:px-8",
  subtle: "text-white/75 leading-relaxed",
  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",
  tag:
    "inline-flex items-center rounded-full border border-white/14 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold text-white/65",
  link:
    "inline-flex items-center gap-2 text-sm font-semibold text-white/85 underline underline-offset-8 decoration-white/15 hover:text-white hover:decoration-white/30 transition",
  btnOutline:
    "inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.03] px-8 py-4 font-semibold text-white/90 transition hover:bg-white/[0.06] hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
  btnGold:
    "inline-flex items-center justify-center rounded-xl border px-8 py-4 font-semibold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
  pill:
    "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs text-white/70",
  kbd: "rounded-md border border-white/15 bg-white/[0.04] px-2 py-1 text-[11px] text-white/70",
};

const sections: PortfolioSection[] = [
  {
    id: "clips",
    title: "Clips & artistes",
    subtitle: "Rythme, identité, performance — optimisé YouTube + formats courts.",
    items: [
      {
        title: "Shégué — clip / univers street",
        desc: "Direction visuelle, tournage stabilisé, image contrastée, montage serré. Pensé pour performer sur YouTube et en formats courts.",
        link: { href: "https://www.youtube.com/@shegue242", label: "Voir sur YouTube" },
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
    subtitle:
      "Captation discrète, montage émotionnel ou dynamique, livrables prêts à partager.",
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
    subtitle:
      "Message clair, esthétique premium, cohérence de marque — conçu pour convertir.",
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
    title: "Éditorial",
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
  { id: "family", title: "Family", desc: "Moments sincères, naturel, émotion. Galerie en croissance.", count: 10 },
  { id: "couple", title: "Couple", desc: "Complicité, émotion, direction légère. Retouches propres.", count: 2 },
];

const buildGallery = (cat: PhotoCategoryKey, count: number, title: string): GalleryImage[] =>
  Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    const src = `/photo/${cat}/${cat}-${n}.jpg`;
    return { src, alt: `${title} — ${n}` };
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

/* ===================== ART FRAMES (click-safe) ===================== */
function OutlineFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-0.5 rounded-[28px] opacity-60 [background:radial-gradient(120%_100%_at_12%_8%,rgba(245,197,66,0.14)_0%,rgba(245,197,66,0.00)_48%),radial-gradient(120%_100%_at_86%_92%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.00)_52%),linear-gradient(to_bottom,rgba(255,255,255,0.10),rgba(255,255,255,0.02))]" />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/12" />
      <div className="pointer-events-none absolute inset-[10px] rounded-[20px] border border-white/8" />
      <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-[2px]">
        {children}
      </div>
    </div>
  );
}

/* ===================== MARQUEE (LEFT -> RIGHT) ===================== */
function Marquee({
  text,
  speed = 26,
  dense = false,
}: {
  text: string;
  speed?: number;
  dense?: boolean;
}) {
  return (
    <section className="relative overflow-hidden border-y border-white/10">
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(55%_60%_at_50%_50%,rgba(245,197,66,0.08)_0%,rgba(0,0,0,0)_60%)]" />
      <div className={cn("py-10", dense && "py-8")}>
        <motion.div
          initial={{ x: "-50%" }}
          animate={{ x: "0%" }}
          transition={{ duration: speed, ease: "linear", repeat: Infinity }}
          className={cn(
            "flex w-[200%] whitespace-nowrap uppercase will-change-transform",
            dense
              ? "text-xs md:text-sm tracking-[0.34em] text-white/60"
              : "text-sm md:text-base tracking-[0.40em] text-white/65"
          )}
          style={{ filter: "blur(0.2px)" }}
        >
          <span className="w-1/2">{text}</span>
          <span className="w-1/2">{text}</span>
        </motion.div>
      </div>
    </section>
  );
}

/* ===================== SUBTLE 3D block ===================== */
function LivingBlock({
  eyebrow,
  title,
  accentWord,
  desc,
}: {
  eyebrow: string;
  title: string;
  accentWord: string;
  desc: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 88%", "end 22%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [6, -6]);
  const rot = useTransform(scrollYProgress, [0, 1], [1.8, -1.8]);
  const op = useTransform(scrollYProgress, [0, 0.16, 0.85, 1], [0, 1, 1, 0]);

  const parts = title.split(accentWord);

  return (
    <div ref={ref} className="relative">
      <motion.div
        style={
          reduce
            ? undefined
            : {
                y,
                rotateX: rot,
                opacity: op,
                transformPerspective: 1200,
              }
        }
        className="space-y-5"
      >
        <div className="flex items-center gap-3">
          <p className="text-xs tracking-[0.35em] uppercase text-white/60">• {eyebrow}</p>
          <motion.div
            aria-hidden
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 120, opacity: 1 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 0.9, ease: easeCine }}
            className="h-px bg-white/12"
          />
          <span className="text-[11px] text-white/45 tracking-[0.22em] uppercase">
            cadre • exécution • livraison
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          {parts[0]}
          <span style={{ color: ACCENT }}>{accentWord}</span>
          {parts[1] ?? ""}
        </h2>

        <p className={cn("max-w-3xl", UI.subtle)}>{desc}</p>
        <div className="h-px w-full bg-white/10" />
      </motion.div>
    </div>
  );
}

/* ===================== Cards (subtle 3D) ===================== */
function TiltCard({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 12%"],
  });

  const rotX = useTransform(scrollYProgress, [0, 1], [6, -2]);
  const rotY = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const y = useTransform(scrollYProgress, [0, 1], [8, -4]);
  const op = useTransform(scrollYProgress, [0, 0.22, 1], [0, 1, 1]);

  return (
    <motion.div
      ref={ref}
      style={
        reduce
          ? undefined
          : {
              rotateX: rotX,
              rotateY: rotY,
              y,
              opacity: op,
              transformPerspective: 1400,
            }
      }
      initial={reduce ? undefined : { opacity: 0, y: 14, filter: "blur(10px)" }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-14%" }}
      transition={{ duration: reduce ? 0 : 0.85, ease: easeCine }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

function ScrollPhrases() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const phrases = [
    "Plans utiles. Rythme maîtrisé.",
    "Image lisible. Son stable.",
    "Livrables propres. Prêts à publier.",
  ];

  return (
    <div className="mt-10 space-y-3">
      {phrases.map((t, i) => (
        <motion.p
          key={t}
          initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, margin: "-18%" }}
          transition={{ duration: 0.8, ease: easeCine, delay: i * 0.05 }}
          className="text-sm md:text-base tracking-[0.18em] uppercase text-white/55"
        >
          {t}
        </motion.p>
      ))}
    </div>
  );
}

export default function PortfolioPage() {
  const reduce = useReducedMotion();

  const openCalendly = useCallback(() => {
    if (window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
      return;
    }
    window.location.href = CALENDLY_URL;
  }, []);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.58]);

  const fadeUp: Variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: reduce ? 0 : 18,
        filter: reduce ? "blur(0px)" : "blur(12px)",
      },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: reduce ? 0 : 0.95, ease: easeCine },
      },
    }),
    [reduce]
  );

  const heroStagger: Variants = useMemo(
    () => ({
      hidden: {},
      show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.05 } },
    }),
    [reduce]
  );

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

  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => setPortalReady(true), []);

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
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden">
        <HeroCineSlider count={10} ext=".jpg" intervalMs={9000} />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/88" />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(58%_54%_at_18%_28%,rgba(245,197,66,0.10)_0%,rgba(0,0,0,0)_60%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(38%_34%_at_78%_22%,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0)_62%)]" />

        <motion.div
          style={reduce ? undefined : { y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-8 py-28"
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-10%" }}
            variants={heroStagger}
            className="space-y-10"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.35em] uppercase text-white/60"
            >
              • PORTFOLIO
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-extrabold leading-[1.02]"
            >
              Projets <span style={{ color: ACCENT }}>ciné</span>.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-3xl text-lg md:text-xl text-white/75 leading-relaxed"
            >
              Vidéo, photo, contenus — une exécution propre et des livrables prêts à publier.
              Ici, tu vois le rendu. Pas des promesses.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <Link
                href={BRIEF_URL}
                className={cn(
                  UI.btnGold,
                  "hover:bg-[rgba(245,197,66,0.06)] hover:border-white/30"
                )}
                style={{ borderColor: "rgba(245,197,66,0.42)" }}
              >
                Débuter un projet
              </Link>

              <button type="button" onClick={openCalendly} className={UI.btnOutline}>
                Planifier un appel
              </button>
            </motion.div>

            <ScrollPhrases />
          </motion.div>
        </motion.div>
      </section>

      <Marquee
        text="· BRANDS · POST · DELIVERY · VIDÉO · PHOTO · ÉDITORIAL · EVENTS · BRANDS · POST · DELIVERY · VIDÉO · PHOTO · ÉDITORIAL · EVENTS · BRANDS · POST · DELIVERY ·"
        speed={22}
      />

      {/* VIDEO */}
      <section id="video" className="scroll-mt-28">
        <Reveal className={cn(UI.wrap, "py-32")}>
          <LivingBlock
            eyebrow="VIDÉO"
            title="Vidéo & contenus"
            accentWord="contenus"
            desc="Clips, événements, marques : une structure claire, une exécution propre, et des livrables prêts à diffuser."
          />

          <div className="mt-10">
            <Marquee
              text="· CLIPS · ÉVÉNEMENTS · MARQUES · LIVRABLES · RYTHME · COHÉRENCE ·"
              speed={30}
              dense
            />
          </div>

          <div className="mt-14 space-y-20 md:space-y-28">
            {sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="scroll-mt-28">
                <motion.div
                  initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, margin: "-14%" }}
                  transition={{ duration: reduce ? 0 : 0.85, ease: easeCine }}
                  className="max-w-3xl space-y-4"
                >
                  <p className="text-xs tracking-[0.35em] uppercase text-white/60">
                    • {sec.title.toUpperCase()}
                  </p>
                  {sec.subtitle ? (
                    <p className={cn("text-sm md:text-base", UI.subtle)}>{sec.subtitle}</p>
                  ) : null}
                </motion.div>

                <div className="mt-10 grid gap-10 md:grid-cols-2">
                  {sec.items.map((it) => (
                    <TiltCard key={it.title}>
                      <OutlineFrame>
                        <motion.div
                          whileHover={reduce ? undefined : { y: -2 }}
                          transition={{ duration: 0.25, ease: easeCine }}
                          className="p-8 md:p-10"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-xl md:text-2xl font-semibold leading-snug">
                              {it.title}
                            </h3>
                            {it.tag ? <span className={UI.tag}>{it.tag}</span> : null}
                          </div>

                          <p className={cn("mt-4 text-sm md:text-base max-w-2xl", UI.subtle)}>
                            {it.desc}
                          </p>

                          <div className="mt-8">
                            {it.link ? (
                              <a
                                href={it.link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={UI.link}
                              >
                                {it.link.label} <span aria-hidden>→</span>
                              </a>
                            ) : (
                              <span className="text-sm font-semibold text-white/55">
                                Exemple — sur demande
                              </span>
                            )}
                          </div>
                        </motion.div>
                      </OutlineFrame>
                    </TiltCard>
                  ))}
                </div>

                <div className={cn(UI.sep, "mt-14")} />
              </section>
            ))}
          </div>
        </Reveal>
      </section>

      {/* PHOTO */}
      <section id="photo" className="scroll-mt-28">
        <Reveal className={cn(UI.wrap, "py-32")}>
          <LivingBlock
            eyebrow="PHOTO"
            title="Photo — séances premium"
            accentWord="premium"
            desc="Galeries par style. Clique une photo pour ouvrir la visionneuse."
          />

          <div className="mt-8 text-sm text-white/55">
            <span className={UI.kbd}>ESC</span> fermer • <span className={UI.kbd}>←</span>{" "}
            <span className={UI.kbd}>→</span> naviguer • swipe mobile
          </div>

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
                      {isActive ? (
                        <span
                          aria-hidden
                          className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full"
                          style={{ background: ACCENT }}
                        />
                      ) : null}
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
                  <TiltCard>
                    <OutlineFrame>
                      <div className="p-8 md:p-10">
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

                        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 md:gap-5">
                          {list.map((img, idx) => (
                            <button
                              key={img.src}
                              type="button"
                              onClick={() => openLightbox(list, idx, cat.title)}
                              className="pointer-events-auto group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/12 bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                              aria-label={`Ouvrir ${cat.title} — photo ${idx + 1}`}
                            >
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100" />
                              <div className="absolute bottom-2 left-2 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[11px] text-white/80 opacity-0 group-hover:opacity-100 transition">
                                {idx + 1} / {list.length}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </OutlineFrame>
                  </TiltCard>
                </section>
              );
            })}

            <p className="text-xs text-white/50 text-center">
              Galeries en croissance — ajout régulier de contenu. Images optimisées web pour un affichage rapide.
            </p>
          </div>
        </Reveal>
      </section>

      {/* CTA FINAL */}
      <Reveal className={cn(UI.wrap, "pb-40")}>
        <div className="text-center">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-15%" }}
            variants={fadeUp}
            className="text-3xl md:text-4xl font-extrabold"
          >
            On avance uniquement lorsque le projet est clair et aligné.
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-15%" }}
            variants={fadeUp}
            className="mt-6 text-white/70 leading-relaxed"
          >
            Dépose un brief ou prends un appel court pour cadrer. Ensuite, on décide.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-15%" }}
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href={BRIEF_URL}
              className={cn(
                UI.btnGold,
                "hover:bg-[rgba(245,197,66,0.06)] hover:border-white/30"
              )}
              style={{ borderColor: "rgba(245,197,66,0.42)" }}
            >
              Débuter un projet
            </Link>
            <button type="button" onClick={openCalendly} className={UI.btnOutline}>
              Planifier un appel
            </button>
          </motion.div>
        </div>
      </Reveal>

      {/* LIGHTBOX (Portal => toujours au bon endroit) */}
      {portalReady && lightbox && lightboxImage
        ? createPortal(
            <AnimatePresence>
              <motion.div
                key="lightbox-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: reduce ? 0 : 0.2 } }}
                exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.18 } }}
                className="fixed inset-0 z-[9999] bg-black/90 p-3 sm:p-4 flex items-center justify-center"
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
                  animate={{
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    transition: { duration: reduce ? 0 : 0.22 },
                  }}
                  exit={{
                    y: reduce ? 0 : 8,
                    scale: reduce ? 1 : 0.99,
                    opacity: 0,
                    transition: { duration: reduce ? 0 : 0.18 },
                  }}
                  ref={dialogRef}
                  className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/12 bg-black"
                  onClick={(e) => e.stopPropagation()}
                >
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
                      className="rounded-xl border border-white/18 bg-white/[0.03] px-4 py-2 text-sm text-white/90 hover:bg-white/[0.06] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                      aria-label="Fermer la visionneuse"
                    >
                      Fermer
                    </button>
                  </div>

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

                  <div className="border-t border-white/10 bg-black/60 backdrop-blur px-3 sm:px-4 py-3">
                    <div className="mt-1 overflow-x-auto">
                      <div className="flex gap-2 pb-1">
                        {lightbox.list.map((img, idx) => {
                          const isActiveThumb = idx === lightbox.index;
                          return (
                            <button
                              key={img.src}
                              type="button"
                              onClick={() => jumpTo(idx)}
                              className={cn(
                                "relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                                isActiveThumb
                                  ? "border-white/35"
                                  : "border-white/10 hover:border-white/25"
                              )}
                              style={
                                isActiveThumb
                                  ? { boxShadow: "0 0 0 2px rgba(245,197,66,0.12)" }
                                  : undefined
                              }
                              aria-label={`Aller à la photo ${idx + 1}`}
                              aria-current={isActiveThumb ? "true" : "false"}
                            >
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className={cn(
                                  "object-cover",
                                  isActiveThumb ? "opacity-100" : "opacity-75 hover:opacity-95"
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
            </AnimatePresence>,
            document.body
          )
        : null}
    </main>
  );
}
