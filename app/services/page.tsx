// app/services/page.tsx
"use client";

import React, { useMemo, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useMotionTemplate,
} from "framer-motion";

type Service = {
  id: string; // slug dossier (ASCII)
  title: string;
  tag: string;
  desc: string;
};

const services: Service[] = [
  {
    id: "production-video",
    title: "Production vidéo",
    tag: "Video",
    desc: "Clips musicaux, publicités, vidéos corporatives et événements. Image stable, lumière maîtrisée, rendu ciné.",
  },
  {
    id: "shooting-photo",
    title: "Shooting photo",
    tag: "Photo",
    desc: "Portrait, corporate, food et éditorial. Direction claire, retouches propres, livraison web & print.",
  },
  {
    id: "reseaux-sociaux",
    title: "Réseaux sociaux",
    tag: "Social",
    desc: "Formats courts performants, cohérence visuelle et stratégie pour une présence régulière.",
  },
  {
    id: "production-audio-numerique",
    title: "Production audio numérique",
    tag: "Audio",
    desc: "Enregistrement, mix, mastering et accompagnement audio. Workflow propre, rendu pro, livraison claire.",
  },
  {
    id: "support-web",
    title: "Support web",
    tag: "Web",
    desc: "Correctifs, mises à jour, ajout de pages, accompagnement et support pour ton site web.",
  },
  {
    id: "croissance-strategique",
    title: "Croissance & stratégie",
    tag: "Strategy",
    desc: "Positionnement, offres, image et contenu alignés pour des résultats concrets.",
  },
];

const cn = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

const UI = {
  card:
    "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur " +
    "shadow-[0_10px_40px_rgba(0,0,0,0.45)]",
  subtle: "text-white/70 leading-relaxed",
  pill:
    "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70",
  btnGold:
    "group relative inline-flex items-center justify-center rounded-full bg-[#F5C518] " +
    "px-7 py-3.5 text-sm font-semibold text-black transition hover:opacity-95 overflow-hidden " +
    "shadow-[0_14px_40px_rgba(245,197,24,0.18)]",
  btnShine:
    "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent " +
    "group-hover:translate-x-full transition duration-700",
  btnGhost:
    "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 " +
    "text-sm font-semibold text-white transition hover:bg-white/10",
  linkGold:
    "inline-flex items-center gap-2 text-sm font-semibold text-[#F5C518] hover:underline",
};

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.75, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function TiltCard({ s, index }: { s: Service; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  // 3D tilt (subtil)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rX = useTransform(my, [-0.5, 0.5], [8, -8]);
  const rY = useTransform(mx, [-0.5, 0.5], [-10, 10]);

  const rXS = useSpring(rX, { stiffness: 180, damping: 20, mass: 0.5 });
  const rYS = useSpring(rY, { stiffness: 180, damping: 20, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    mx.set(px - 0.5);
    my.set(py - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // glow vivant (avec MotionTemplate)
  const glowX = useTransform(mx, [-0.5, 0.5], ["20%", "80%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["20%", "80%"]);
  const glow = useMotionTemplate`radial-gradient(520px circle at ${glowX} ${glowY}, rgba(245,197,24,0.22), transparent 60%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.06 }}
      style={{ transformStyle: "preserve-3d" as const }}
      className={cn("group relative overflow-hidden p-8", UI.card)}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ borderColor: "rgba(255,255,255,0.18)" }}
    >
      {/* glow (hover) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ backgroundImage: glow as any }}
      />

      {/* profondeur */}
      <motion.div
        style={{
          rotateX: rXS,
          rotateY: rYS,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        <div className={UI.pill}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
          {s.tag}
        </div>

        <h2 className="mt-4 text-2xl font-semibold" style={{ transform: "translateZ(14px)" }}>
          {s.title}
        </h2>

        <p className={cn("mt-3 text-sm", UI.subtle)} style={{ transform: "translateZ(10px)" }}>
          {s.desc}
        </p>

        <div className="mt-6" style={{ transform: "translateZ(18px)" }}>
          <Link href={`/services/${s.id}`} className={UI.linkGold}>
            Voir le service{" "}
            <motion.span
              aria-hidden
              className="inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              →
            </motion.span>
          </Link>
        </div>

        <div
          aria-hidden
          className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent"
          style={{ transform: "translateZ(6px)" }}
        />
      </motion.div>

      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        }}
      />
    </motion.div>
  );
}

export default function ServicesPage() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // parallax halo subtil
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const stats = useMemo(
    () => [
      { k: "Qualité", v: "Label-grade" },
      { k: "Livraison", v: "Formats optimisés" },
      { k: "Créatif", v: "DA + cohérence" },
      { k: "Objectif", v: "Image + résultats" },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white relative overflow-hidden">
      {/* scroll progress */}
      <motion.div aria-hidden className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-[#F5C518]/25">
        <motion.div className="h-full bg-[#F5C518]" style={{ scaleX: bar, transformOrigin: "0% 50%" }} />
      </motion.div>

      {/* BACKGROUND vivant */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-44 left-1/2 -translate-x-1/2 h-[560px] w-[560px] rounded-full bg-[#F5C518]/10 blur-[120px]"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute top-10 right-0 h-[420px] w-[420px] rounded-full bg-white/5 blur-[120px]"
          style={{ y: y2 }}
        />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/45" />
      </div>

      <div className="relative">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-10">
          <Reveal>
            <div className={UI.pill}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
              Services · Black Jesus Records
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-[-0.02em]">
              Image, son{" "}
              <span className="text-[#F5C518] drop-shadow-[0_0_22px_rgba(245,197,24,0.25)]">
                & stratégie
              </span>
              <br />
              pour les marques exigeantes.
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className={cn("mt-5 max-w-3xl text-base md:text-lg", UI.subtle)}>
              Black Jesus Records accompagne artistes, créateurs et entreprises qui veulent une image professionnelle,
              cohérente et orientée résultats. Un seul studio. Une vision claire.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/booking" className={UI.btnGold}>
                <span className={UI.btnShine} />
                <span className="relative">Réserver une date</span>
              </Link>
              <Link href="/contact" className={UI.btnGhost}>
                Parler de votre projet
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.k} className={cn(UI.card, "px-5 py-4")}>
                  <p className="text-[11px] tracking-[0.25em] uppercase text-white/45">{s.k}</p>
                  <p className="mt-1 text-sm font-semibold text-white/85">{s.v}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        </section>

        {/* GRID */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-24">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((s, i) => (
              <TiltCard key={s.id} s={s} index={i} />
            ))}
          </div>

          <Reveal delay={0.08}>
            <p className="mt-10 text-xs text-white/45">
              Détails, packs, process et livrables : présentés service par service pour garder un scope clair.
            </p>
          </Reveal>
        </section>

        {/* CTA FINAL */}
        <section className="border-t border-white/10 bg-[#0D0D10]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]">
                  Prêt à faire passer votre image au{" "}
                  <span className="text-[#F5C518] drop-shadow-[0_0_18px_rgba(245,197,24,0.18)]">
                    niveau supérieur
                  </span>{" "}
                  ?
                </h2>
                <p className={cn("mt-3 text-sm md:text-base", UI.subtle)}>
                  Parle-nous de ton projet. On te répond avec un cadre clair : scope, délais et livrables.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/booking" className={UI.btnGold}>
                  <span className={UI.btnShine} />
                  <span className="relative">Réserver</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-[#F5C518] px-7 py-3.5 text-sm font-semibold text-[#F5C518] hover:bg-[#F5C518] hover:text-black transition"
                >
                  Contact
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </main>
  );
}
