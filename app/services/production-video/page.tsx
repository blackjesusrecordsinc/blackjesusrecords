"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const cn = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

const UI = {
  wrap: "min-h-screen bg-[#0B0B0E] text-white relative overflow-hidden",
  max: "max-w-6xl mx-auto px-6 lg:px-8",
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
  shine:
    "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent " +
    "group-hover:translate-x-full transition duration-700",
  btnGhost:
    "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 " +
    "text-sm font-semibold text-white transition hover:bg-white/10",
  btnOutlineGold:
    "inline-flex items-center justify-center rounded-full border border-[#F5C518] px-7 py-3.5 " +
    "text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518] hover:text-black",
  h1: "mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-[-0.02em]",
  h2: "text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]",
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

export default function ProductionVideoPage() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <main className={UI.wrap}>
      {/* progress */}
      <motion.div aria-hidden className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-[#F5C518]/25">
        <motion.div className="h-full bg-[#F5C518]" style={{ scaleX: bar, transformOrigin: "0% 50%" }} />
      </motion.div>

      {/* bg */}
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
        {/* top nav */}
        <div className={cn(UI.max, "pt-10")}>
          <div className="flex items-center justify-between gap-3">
            <Link href="/services" className="text-sm text-white/70 hover:text-white transition">
              ← Retour aux services
            </Link>
            <div className={UI.pill}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
              Production vidéo
            </div>
          </div>
        </div>

        {/* hero */}
        <section className={cn(UI.max, "pt-12 pb-10")}>
          <Reveal>
            <h1 className={UI.h1}>
              Production vidéo{" "}
              <span className="text-[#F5C518] drop-shadow-[0_0_22px_rgba(245,197,24,0.25)]">
                ciné
              </span>
              , pensée pour performer.
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className={cn("mt-5 max-w-3xl text-base md:text-lg", UI.subtle)}>
              Clips, pubs, corporate, événements : on cadre le scope, on tourne propre, on finit avec une post-prod
              nette et des exports optimisés (YouTube, Reels, TikTok).
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/booking" className={UI.btnGold}>
                <span className={UI.shine} />
                <span className="relative">Réserver un créneau</span>
              </Link>
              <Link href="/contact" className={UI.btnGhost}>
                Décrire mon projet
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { k: "Rendu", v: "Look ciné + stabilité" },
                { k: "Son", v: "Audio clean / sound design" },
                { k: "Format", v: "YouTube + Vertical" },
                { k: "Workflow", v: "Brief → prod → livraison" },
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

        {/* what you get */}
        <section className={cn(UI.max, "pb-10")}>
          <Reveal>
            <div className={cn(UI.card, "p-7")}>
              <h2 className={UI.h2}>
                Ce que tu obtiens{" "}
                <span className="text-[#F5C518]">vraiment</span>
              </h2>
              <p className={cn("mt-2 max-w-3xl text-sm md:text-base", UI.subtle)}>
                Pas de flou. On met tout au clair : intention, livrables, délais, formats, révisions.
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {[
                  "Direction artistique + cadrage (références & intention)",
                  "Tournage stabilisé (gimbal) + lumière maîtrisée",
                  "Montage narratif + rythme + hooks (short-form & long-form)",
                  "Color grading (look ciné) + exports optimisés",
                  "Sous-titres / habillage (si nécessaire)",
                  "Livraison propre + conseils publication",
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

        {/* packs */}
        <section className={cn(UI.max, "pb-10")}>
          <Reveal>
            <div className="flex items-end justify-between flex-col md:flex-row gap-4">
              <div>
                <h2 className={UI.h2}>
                  Packs vidéo{" "}
                  <span className="text-[#F5C518]">clairs</span>
                </h2>
                <p className={cn("mt-2 text-sm md:text-base max-w-3xl", UI.subtle)}>
                  Trois niveaux. On confirme le scope exact après ton brief.
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/contact" className={UI.btnGhost}>Obtenir un devis</Link>
                <Link href="/booking" className={UI.btnOutlineGold}>Réserver</Link>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Essentiel",
                hint: "Réseaux / promo",
                rec: false,
                d: "Tournage léger + montage propre. Parfait pour publier vite.",
                b: ["Tournage court", "Montage + export optimisé", "1 format (vertical ou 16:9)", "1 révision"],
              },
              {
                t: "Premium",
                hint: "Le plus demandé",
                rec: true,
                d: "DA plus poussée + rendu ciné plus cohérent.",
                b: ["DA + tournage plus complet", "Montage + color grading", "2 formats (YouTube + vertical)", "2 révisions"],
              },
              {
                t: "Signature",
                hint: "Clip / pub / corporate",
                rec: false,
                d: "Pour un rendu haut niveau : lumière, rythme, finitions.",
                b: ["DA avancée + setup lumière", "Montage narratif + finitions", "Color + audio amélioré", "3 révisions (selon brief)"],
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
                    <p className={cn("mt-1 text-xs", p.rec ? "text-[#F5C518]" : "text-white/50")}>
                      {p.hint}
                    </p>
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

                <Link href="/contact" className={cn(UI.btnGold, "w-full")}>
                  <span className={UI.shine} />
                  <span className="relative">Choisir {p.t}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="mt-4 text-xs text-white/50">
            * Tarif final = durée + complexité + livrables + délais. Tout est cadré avant de commencer.
          </p>
        </section>

        {/* process */}
        <section className={cn(UI.max, "pb-12")}>
          <Reveal>
            <div className={cn(UI.card, "p-7 bg-white/[0.03]")}>
              <h2 className={UI.h2}>
                Process{" "}
                <span className="text-[#F5C518]">pro</span>
              </h2>
              <p className={cn("mt-2 text-sm md:text-base max-w-3xl", UI.subtle)}>
                On évite la confusion : brief clair, validation, production, livraison prête à publier.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-4">
                {[
                  { t: "1. Brief", d: "Références, objectif, plateforme, contraintes. On aligne la vision." },
                  { t: "2. Tournage", d: "Stabilité, lumière, direction. On capture ce qui compte." },
                  { t: "3. Post-prod", d: "Montage, look, sous-titres, exports. Finition propre." },
                  { t: "4. Livraison", d: "Fichiers finaux + formats + conseils publication." },
                ].map((x) => (
                  <div key={x.t} className={cn(UI.card, "p-5")}>
                    <div className={UI.pill}>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                      Étape
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">{x.t}</h3>
                    <p className={cn("mt-2 text-sm", UI.subtle)}>{x.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 bg-[#0D0D10]">
          <div className={cn(UI.max, "py-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between")}>
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]">
                  On tourne un{" "}
                  <span className="text-[#F5C518] drop-shadow-[0_0_18px_rgba(245,197,24,0.18)]">
                    rendu sérieux
                  </span>{" "}
                  ?
                </h2>
                <p className={cn("mt-3 text-sm md:text-base", UI.subtle)}>
                  Envoie 1–2 références + ta deadline. On te répond avec un scope clair.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/booking" className={UI.btnGold}>
                  <span className={UI.shine} />
                  <span className="relative">Réserver</span>
                </Link>
                <Link href="/contact" className={UI.btnOutlineGold}>
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
