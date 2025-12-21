// app/services/support-web/page.tsx
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

export default function SupportWebPage() {
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
              Support web
            </div>
          </div>
        </div>

        <section className={cn(UI.max, "pt-12 pb-10")}>
          <Reveal>
            <h1 className={UI.h1}>
              Support web{" "}
              <span className="text-[#F5C518] drop-shadow-[0_0_22px_rgba(245,197,24,0.25)]">
                rapide
              </span>{" "}
              et cadré.
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className={cn("mt-5 max-w-3xl text-base md:text-lg", UI.subtle)}>
              Correctifs, ajout de pages, optimisation, migration, accompagnement. Tu fais une demande claire → on te répond
              avec un plan et un délai. Pas de flou.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className={UI.btnGold}>
                <span className={UI.shine} />
                <span className="relative">Faire une demande</span>
              </Link>
              <Link href="/booking" className={UI.btnGhost}>
                Réserver un appel
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { k: "Délai", v: "Réponse en 24-48h" },
                { k: "Scope", v: "Clair avant de commencer" },
                { k: "Livraison", v: "Branche propre + déploiement" },
                { k: "Suivi", v: "Accès à un Slack partagé" },
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
                Ce qu&apos;on fait{" "}
                <span className="text-[#F5C518]">vraiment</span>
              </h2>
              <p className={cn("mt-2 max-w-3xl text-sm md:text-base", UI.subtle)}>
                Des tâches concrètes. Pas d&apos;engagement long terme, pas de forfait flou.
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {[
                  "Correctifs et debug (fonctionnalités cassées, erreurs en prod)",
                  "Ajout de pages / sections (en suivant ton design)",
                  "Optimisation web (Core Web Vitals, performance, accessibilité)",
                  "Migration de stack (CMS, framework, hosting)",
                  "Améliorations UX/UI (dans le scope qu&apos;on définit)",
                  "Accompagnement technique (formation, transfert de connaissances)",
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
            <div className="flex items-end justify-between flex-col md:flex-row gap-4">
              <div>
                <h2 className={UI.h2}>
                  Tarifs à la{" "}
                  <span className="text-[#F5C518]">demande</span>
                </h2>
                <p className={cn("mt-2 text-sm md:text-base max-w-3xl", UI.subtle)}>
                  Chaque projet est unique. On évalue le scope et te propose un prix fixe ou des tarifs horaires.
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/contact" className={UI.btnGhost}>Faire une demande</Link>
                <Link href="/booking" className={UI.btnOutlineGold}>Appel gratuit</Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                {
                  t: "Petit projet",
                  d: "Quelques heures de travail",
                  examples: ["Un correctif", "Ajout de section", "Optimisation légère"],
                },
                {
                  t: "Projet moyen",
                  d: "Quelques jours de travail",
                  examples: ["Migration partielle", "Plusieurs pages", "Refactor modéré"],
                },
                {
                  t: "Grand projet",
                  d: "Plusieurs semaines",
                  examples: ["Migration complète", "Refonte majeure", "Accompagnement long terme"],
                },
              ].map((p) => (
                <motion.div
                  key={p.t}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className={cn(UI.card, "p-7 hover:border-white/20 transition")}
                >
                  <h3 className="text-lg font-semibold text-white">{p.t}</h3>
                  <p className={cn("mt-2 text-sm", UI.subtle)}>{p.d}</p>
                  <ul className="mt-4 space-y-2">
                    {p.examples.map((ex) => (
                      <li key={ex} className="flex gap-2 text-sm text-white/70">
                        <span className="text-[#F5C518]">•</span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className={cn(UI.max, "pb-20")}>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent mb-10" />
          <Reveal>
            <div className="text-center">
              <h2 className={UI.h2}>
                Prêt à{" "}
                <span className="text-[#F5C518]">commencer</span>?
              </h2>
              <p className={cn("mt-4 text-base md:text-lg max-w-2xl mx-auto", UI.subtle)}>
                Envoie-nous les détails de ton besoin. On te répond rapidement avec un plan et un prix.
              </p>
              <div className="mt-8 flex gap-3 justify-center">
                <Link href="/contact" className={UI.btnGold}>
                  <span className={UI.shine} />
                  <span className="relative">Faire une demande</span>
                </Link>
                <Link href="/booking" className={UI.btnGhost}>
                  Réserver un appel
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
