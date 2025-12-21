// app/services/support-web/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const cn = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

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

export default function SupportWebPage() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <main className={UI.wrap}>
      {/* progress bar */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-[#F5C518]/25"
      >
        <motion.div
          className="h-full bg-[#F5C518]"
          style={{ scaleX: bar, transformOrigin: "0% 50%" }}
        />
      </motion.div>
      {/* background effects */}
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
        {/* header */}
        <div className={cn(UI.max, "pt-10")}>
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/services"
              className="text-sm text-white/70 hover:text-white transition"
            >
              ← Retour aux services
            </Link>
            <div className={UI.pill}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
              Support web
            </div>
          </div>
        </div>

        {/* hero */}
        <section className={cn(UI.max, "pt-12 pb-20")}>
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
            <p
              className={cn(
                "mt-5 max-w-3xl text-base md:text-lg",
                UI.subtle
              )}
            >
              Correctifs, ajout de pages, optimisation, migration,
              accompagnement. Tu fais une demande claire → on te répond avec un
              plan et un délai. Pas de flou.
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

          {/* SERVICES */}
          <Reveal delay={0.16}>
            <div className={cn(UI.card, "mt-14 p-6 md:p-8")}>
              <h2 className={UI.h2}>Ce qu’on prend en charge</h2>

              <ul className="mt-6 grid gap-3 md:grid-cols-2 text-sm text-white/80">
                <li className="rounded-xl border border-white/10 bg-white/5 p-4">
                  Bugs & correctifs UI / UX
                </li>
                <li className="rounded-xl border border-white/10 bg-white/5 p-4">
                  Ajout de pages & sections
                </li>
                <li className="rounded-xl border border-white/10 bg-white/5 p-4">
                  Optimisation performance & SEO
                </li>
                <li className="rounded-xl border border-white/10 bg-white/5 p-4">
                  Migration, déploiement, Vercel
                </li>
              </ul>
            </div>
          </Reveal>

          {/* CTA FINAL */}
          <Reveal delay={0.22}>
            <div className="mt-16 text-center">
              <Link href="/contact" className={UI.btnOutlineGold}>
                Lancer une demande maintenant
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
