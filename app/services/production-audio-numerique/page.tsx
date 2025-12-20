// app/services/production-audio-numérique/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const cn = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

const UI = {
  wrap: "min-h-screen bg-[#0B0B0E] text-white relative overflow-hidden",
  max: "max-w-6xl mx-auto px-6 lg:px-8",
  card:
    "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.45)]",
  subtle: "text-white/70 leading-relaxed",
  pill:
    "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70",
  btnGold:
    "group relative inline-flex items-center justify-center rounded-full bg-[#F5C518] px-7 py-3.5 text-sm font-semibold text-black transition hover:opacity-95 overflow-hidden shadow-[0_14px_40px_rgba(245,197,24,0.18)]",
  shine:
    "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition duration-700",
  btnGhost:
    "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10",
  btnOutlineGold:
    "inline-flex items-center justify-center rounded-full border border-[#F5C518] px-7 py-3.5 text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518] hover:text-black",
  h1: "mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-[-0.02em]",
  h2: "text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]",
};

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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

export default function ProductionAudioNumeriquePage() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <main className={UI.wrap}>
      <motion.div aria-hidden className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-[#F5C518]/25">
        <motion.div className="h-full bg-[#F5C518]" style={{ scaleX: bar, transformOrigin: "0% 50%" }} />
      </motion.div>

      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-44 left-1/2 -translate-x-1/2 h-[560px] w-[560px] rounded-full bg-[#F5C518]/10 blur-[120px]"
          style={{ y: y1 }}
        />
        <motion.div className="absolute top-10 right-0 h-[420px] w-[420px] rounded-full bg-white/5 blur-[120px]" style={{ y: y2 }} />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/45" />
      </div>

      <div className="relative">
        <div className={cn(UI.max, "pt-10")}>
          <div className="flex items-center justify-between gap-3">
            <Link href="/services" className="text-sm text-white/70 hover:text-white transition">
              ← Retour aux services
            </Link>
            <div className={UI.pill}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
              Production audio numérique
            </div>
          </div>
        </div>

        <section className={cn(UI.max, "pt-12 pb-10")}>
          <Reveal>
            <h1 className={UI.h1}>
              Production audio{" "}
              <span className="text-[#F5C518] drop-shadow-[0_0_22px_rgba(245,197,24,0.25)]">
                numérique
              </span>{" "}
              — propre, fort, prêt à sortir.
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className={cn("mt-5 max-w-3xl text-base md:text-lg", UI.subtle)}>
              Enregistrement, mix, mastering : on vise un son clair, impactant et cohérent. Workflow carré, livrables propres,
              et versions prêtes plateformes.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/booking" className={UI.btnGold}>
                <span className={UI.shine} />
                <span className="relative">Réserver une session</span>
              </Link>
              <Link href="/contact" className={UI.btnGhost}>
                Décrire mon besoin audio
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { k: "Son", v: "Clarté + impact" },
                { k: "Mix", v: "Balance + punch" },
                { k: "Master", v: "Niveau + pro" },
                { k: "Livraison", v: "Stems + versions" },
              ].map((x) => (
                <div key={x.k} className={cn(UI.card, "px-5 py-4")}>
                  <p className="text-[11px] tracking-[0.25em] uppercase text-white/45">{x.k}</p>
                  <p className="mt-1 text-sm font-semibold text-white/85">{x.v}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        </section>

        <section className={cn(UI.max, "pb-10")}>
          <Reveal>
            <div className={cn(UI.card, "p-7")}>
              <h2 className={UI.h2}>
                Ce qui est{" "}
                <span className="text-[#F5C518]">inclus</span>
              </h2>
              <p className={cn("mt-2 max-w-3xl text-sm md:text-base", UI.subtle)}>
                On cadre le rendu voulu : clean / agressif / autotune / chanté. Tu sais ce que tu reçois.
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {[
                  "Pré-brief (références, direction sonore, objectif)",
                  "Enregistrement (si applicable) + nettoyage",
                  "Mix (équilibre, dynamique, FX, correction)",
                  "Master (niveau cohérent, écoute multi-systèmes)",
                  "Exports : WAV + MP3 + versions (radio/clean si besoin)",
                  "Option : stems / instrumental / acapella",
                ].map((p) => (
                  <div key={p} className="flex gap-3 text-sm text-white/80">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    <span className="leading-relaxed">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section className={cn(UI.max, "pb-10")}>
          <Reveal>
            <h2 className={UI.h2}>
              Packs audio{" "}
              <span className="text-[#F5C518]">clairs</span>
            </h2>
            <p className={cn("mt-2 text-sm md:text-base max-w-3xl", UI.subtle)}>
              Selon le nombre de pistes, la complexité, et la deadline.
            </p>
          </Reveal>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Mix",
                hint: "Clean + punch",
                rec: false,
                d: "Mix complet : balance, dynamique, FX, rendu cohérent.",
                b: ["Nettoyage + EQ", "Compression + FX", "Automation", "1–2 révisions"],
              },
              {
                t: "Mix + Master",
                hint: "Recommandé",
                rec: true,
                d: "Le rendu prêt plateformes : mix + mastering final.",
                b: ["Mix complet", "Master final", "Exports WAV/MP3", "2 révisions"],
              },
              {
                t: "Master only",
                hint: "Finalisation",
                rec: false,
                d: "Tu as déjà un bon mix : on finalise niveau + cohérence.",
                b: ["EQ fin + dynamique", "Niveau final", "Contrôle clipping", "Exports"],
              },
            ].map((p, i) => (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.06 }}
                className={cn(
                  UI.card,
                  "p-7 transition",
                  p.rec ? "border-[#F5C518]/60 shadow-[0_0_0_1px_rgba(245,197,24,0.15),0_30px_120px_rgba(0,0,0,0.55)]" : "hover:border-white/20"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{p.t}</h3>
                    <p className={cn("mt-1 text-xs", p.rec ? "text-[#F5C518]" : "text-white/50")}>{p.hint}</p>
                  </div>
                  {p.rec && (
                    <span className="rounded-full border border-[#F5C518]/50 bg-[#F5C518]/10 px-3 py-1 text-xs text-[#F5C518]">
                      Recommandé
                    </span>
                  )}
                </div>

                <p className={cn("mt-3 text-sm", UI.subtle)}>{p.d}</p>

                <div className="mt-5 grid gap-2">
                  {p.b.map((x) => (
                    <div key={x} className="flex gap-3 text-sm text-white/80">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                      <span className="leading-relaxed">{x}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                <Link href="/contact" className={UI.btnOutlineGold}>Choisir {p.t}</Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0D0D10]">
          <div className={cn(UI.max, "py-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between")}>
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]">
                  On sort un{" "}
                  <span className="text-[#F5C518] drop-shadow-[0_0_18px_rgba(245,197,24,0.18)]">
                    son pro
                  </span>{" "}
                  ?
                </h2>
                <p className={cn("mt-3 text-sm md:text-base", UI.subtle)}>
                  Envoie une référence (track) + ton deadline. On te cadre tout.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/booking" className={UI.btnGold}>
                  <span className={UI.shine} />
                  <span className="relative">Réserver</span>
                </Link>
                <Link href="/contact" className={UI.btnOutlineGold}>Contact</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </main>
  );
}
