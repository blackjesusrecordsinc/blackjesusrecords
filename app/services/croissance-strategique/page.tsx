// app/services/croissance-strategique/page.tsx
"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";

const cn = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

const UI = {
  wrap: "min-h-screen bg-[#0B0B0E] text-white relative overflow-hidden",
  max: "max-w-6xl mx-auto px-6 lg:px-8",
  card:
    "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur " +
    "shadow-[0_10px_40px_rgba(0,0,0,0.45)]",
  subtle: "text-white/70 leading-relaxed",
  subtle2: "text-white/60 leading-relaxed",
  pill:
    "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70",
  btnGold:
    "group relative inline-flex items-center justify-center rounded-full bg-[#F5C518] px-7 py-3.5 text-sm font-semibold text-black transition hover:opacity-95 overflow-hidden " +
    "shadow-[0_14px_40px_rgba(245,197,24,0.18)]",
  shine:
    "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent " +
    "group-hover:translate-x-full transition duration-700",
  btnGhost:
    "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10",
  btnOutlineGold:
    "inline-flex items-center justify-center rounded-full border border-[#F5C518] px-7 py-3.5 text-sm font-semibold text-[#F5C518] transition hover:bg-[#F5C518] hover:text-black",
  h1: "mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-[-0.02em]",
  h2: "text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]",
  h3: "text-lg md:text-xl font-semibold leading-tight",
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

function GlowCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const gx = useTransform(mx, [-0.5, 0.5], ["20%", "80%"]);
  const gy = useTransform(my, [-0.5, 0.5], ["20%", "80%"]);
  const glow = useMotionTemplate`radial-gradient(520px circle at ${gx} ${gy}, rgba(245,197,24,0.22), transparent 60%)`;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mx.set(px - 0.5);
    my.set(py - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("group relative overflow-hidden", UI.card, className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ backgroundImage: glow as any }}
      />
      {children}

      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-sm text-white/80">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
      <span className="leading-relaxed">{children}</span>
    </div>
  );
}

export default function CroissanceStrategiquePage() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const packs = useMemo(
    () => [
      {
        title: "Audit",
        tag: "Clarté",
        recommended: false,
        desc: "On identifie ce qui bloque : positionnement, message, offre, image et parcours client.",
        bullets: [
          "Analyse rapide (site + IG + offres)",
          "Points à corriger (priorités)",
          "Plan d’action (1–2 semaines)",
          "Recommandations concrètes",
        ],
        cta: "Réserver un audit",
      },
      {
        title: "Plan de croissance",
        tag: "Le plus demandé",
        recommended: true,
        desc: "On restructure ton système : offre + contenu + preuve + process. Objectif : convertir plus.",
        bullets: [
          "Offre/prix/pitch (message clair)",
          "Stratégie contenu + hooks",
          "Structure pages (SEO de base)",
          "KPI + cadence + routine",
        ],
        cta: "Lancer le plan",
      },
      {
        title: "Accompagnement",
        tag: "Suivi",
        recommended: false,
        desc: "On avance ensemble. Ajustements, décisions, optimisation continue, reporting.",
        bullets: [
          "Suivi régulier (cadence)",
          "Optimisation conversions",
          "Tests (formats, CTA, pages)",
          "Support décisionnel",
        ],
        cta: "Parler de l’accompagnement",
      },
    ],
    []
  );

  const steps = useMemo(
    () => [
      {
        t: "1. Diagnostic",
        d: "On capte la réalité : objectifs, ressources, délais, contraintes. Pas de suppositions.",
      },
      {
        t: "2. Message & offre",
        d: "On écrit un pitch qui frappe. Offre lisible, valeur évidente, preuve visible.",
      },
      {
        t: "3. Système",
        d: "On installe une structure : pages, process, contenus, cadence. Rien au hasard.",
      },
      {
        t: "4. Optimisation",
        d: "On mesure, on ajuste, on répète. KPI simples, actions concrètes.",
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "C’est pour qui ?",
        a: "Artistes, marques et business qui veulent une image cohérente + une stratégie simple qui convertit (clients, bookings, ventes).",
      },
      {
        q: "Est-ce que vous faites “juste” du conseil ?",
        a: "Non. On peut conseiller ET exécuter : structure des pages, contenu, direction artistique, process, optimisation.",
      },
      {
        q: "Combien de temps pour voir un effet ?",
        a: "On vise des gains rapides (clarité + conversion) en 1–2 semaines, puis on consolide sur 4–8 semaines selon cadence.",
      },
      {
        q: "Vous garantissez des résultats ?",
        a: "On garantit un système clair, une exécution propre et des actions mesurables. Les résultats dépendent aussi du marché, du budget et de la régularité.",
      },
    ],
    []
  );

  const [open, setOpen] = useState<string | null>("C’est pour qui ?");

  return (
    <main className={UI.wrap}>
      {/* progress */}
      <motion.div aria-hidden className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-[#F5C518]/25">
        <motion.div className="h-full bg-[#F5C518]" style={{ scaleX: bar, transformOrigin: "0% 50%" }} />
      </motion.div>

      {/* BG */}
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
        {/* Top bar */}
        <div className={cn(UI.max, "pt-10")}>
          <div className="flex items-center justify-between gap-3">
            <Link href="/services" className="text-sm text-white/70 hover:text-white transition">
              ← Retour aux services
            </Link>
            <div className={UI.pill}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
              Croissance & stratégie
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className={cn(UI.max, "pt-12 pb-10")}>
          <Reveal>
            <h1 className={UI.h1}>
              Croissance{" "}
              <span className="text-[#F5C518] drop-shadow-[0_0_22px_rgba(245,197,24,0.25)]">
                structurée
              </span>{" "}
              — pas de blabla.
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className={cn("mt-5 max-w-3xl text-base md:text-lg", UI.subtle)}>
              On clarifie ton positionnement, tes offres et ton message. On aligne contenu + image + process pour
              construire un système qui convertit (clients, bookings, ventes).
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/booking" className={UI.btnGold}>
                <span className={UI.shine} />
                <span className="relative">Réserver un audit</span>
              </Link>
              <Link href="/contact" className={UI.btnGhost}>
                Décrire mon objectif
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { k: "Clarté", v: "Offre + message" },
                { k: "Crédibilité", v: "Image + preuves" },
                { k: "Système", v: "Process + cadence" },
                { k: "KPI", v: "Mesure + amélioration" },
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

        {/* Proof + Brief */}
        <section className={cn(UI.max, "pb-10")}>
          <div className="grid gap-6 lg:grid-cols-3">
            <Reveal>
              <GlowCard className="p-7">
                <div className={UI.pill}>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                  Ce que tu vas gagner
                </div>
                <h2 className={cn("mt-4", UI.h3)}>Un système clair qui vend.</h2>
                <p className={cn("mt-2 text-sm", UI.subtle)}>
                  Pas juste “des idées”. Un cadre concret : pages + messages + contenus + cadence + KPI.
                </p>
                <div className="mt-5 grid gap-2">
                  <Check>Pitch simple (qui frappe)</Check>
                  <Check>Offre lisible (prix / packs)</Check>
                  <Check>Pages qui convertissent</Check>
                  <Check>Routine contenu sans burnout</Check>
                </div>
              </GlowCard>
            </Reveal>

            <Reveal delay={0.06}>
              <GlowCard className="p-7 lg:col-span-2">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="max-w-2xl">
                    <div className={UI.pill}>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                      Brief rapide (1 min)
                    </div>
                    <h2 className={cn("mt-4", UI.h3)}>Envoie un message qui cadre ton scope.</h2>
                    <p className={cn("mt-2 text-sm", UI.subtle)}>
                      Plus tu es précis, plus la réponse est rapide. Copie/colle ce modèle dans le formulaire contact.
                    </p>
                  </div>

                  <Link href="/contact" className={UI.btnOutlineGold}>
                    Ouvrir le contact
                  </Link>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {[
                    { t: "Objectif", d: "Plus de bookings / ventes / leads, ou mieux convertir." },
                    { t: "Offre actuelle", d: "Ce que tu vends, à qui, à quel prix." },
                    { t: "Preuves", d: "Portfolio, chiffres, témoignages, avant/après." },
                    { t: "Délais", d: "Deadline réaliste + fréquence contenu (ex: 3/sem)." },
                  ].map((x) => (
                    <div key={x.t} className={cn(UI.card, "p-5 bg-white/[0.03]")}>
                      <p className="text-[11px] tracking-[0.25em] uppercase text-white/45">{x.t}</p>
                      <p className={cn("mt-2 text-sm", UI.subtle)}>{x.d}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs text-white/50">Modèle (copie-colle)</p>
                  <p className={cn("mt-2 text-sm", UI.subtle)}>
                    Objectif : … <br />
                    Offre actuelle : … <br />
                    Plateformes : IG / TikTok / YouTube / Site <br />
                    Preuves : lien(s) … <br />
                    Deadline : … <br />
                    Budget (même approx) : …
                  </p>
                </div>
              </GlowCard>
            </Reveal>
          </div>
        </section>

        {/* Process */}
        <section className={cn(UI.max, "pb-10")}>
          <Reveal>
            <h2 className={UI.h2}>
              Process <span className="text-[#F5C518]">simple</span> — exécution propre
            </h2>
            <p className={cn("mt-2 max-w-3xl text-sm md:text-base", UI.subtle)}>
              Le but : arrêter d’improviser. Tu sais quoi faire, quand le faire, et comment mesurer l’impact.
            </p>
          </Reveal>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {steps.map((x, i) => (
              <Reveal key={x.t} delay={0.06 + i * 0.04}>
                <GlowCard className="p-5">
                  <div className={UI.pill}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                    Étape
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{x.t}</h3>
                  <p className={cn("mt-2 text-sm", UI.subtle)}>{x.d}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Packs */}
        <section className={cn(UI.max, "pb-12")}>
          <Reveal>
            <h2 className={UI.h2}>
              Packs <span className="text-[#F5C518]">croissance</span>
            </h2>
            <p className={cn("mt-2 max-w-3xl text-sm md:text-base", UI.subtle)}>
              Choisis un niveau selon ton besoin. On confirme toujours le scope avant de démarrer.
            </p>
          </Reveal>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {packs.map((p, i) => (
              <Reveal key={p.title} delay={0.06 + i * 0.04}>
                <GlowCard
                  className={cn(
                    "p-7",
                    p.recommended
                      ? "border-[#F5C518]/60 shadow-[0_0_0_1px_rgba(245,197,24,0.15),0_30px_120px_rgba(0,0,0,0.55)]"
                      : ""
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">{p.title}</h3>
                      <p className={cn("mt-1 text-xs", p.recommended ? "text-[#F5C518]" : "text-white/50")}>
                        {p.tag}
                      </p>
                    </div>

                    {p.recommended && (
                      <span className="shrink-0 rounded-full border border-[#F5C518]/50 bg-[#F5C518]/10 px-3 py-1 text-xs text-[#F5C518]">
                        Recommandé
                      </span>
                    )}
                  </div>

                  <p className={cn("mt-3 text-sm", UI.subtle)}>{p.desc}</p>

                  <div className="mt-5 grid gap-2">
                    {p.bullets.map((b) => (
                      <Check key={b}>{b}</Check>
                    ))}
                  </div>

                  <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                  <div className="mt-6 flex flex-col gap-3">
                    <Link href="/contact" className={p.recommended ? UI.btnGold : UI.btnGhost}>
                      {p.recommended && <span className={UI.shine} />}
                      <span className="relative">{p.cta}</span>
                    </Link>
                    <Link href="/booking" className={UI.btnOutlineGold}>
                      Réserver un créneau
                    </Link>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>

          <p className="mt-4 text-xs text-white/45">
            * Tarif final selon le scope : complexité, livrables, cadence, délais, besoin d’exécution (contenu / web / DA).
          </p>
        </section>

        {/* FAQ */}
        <section className={cn(UI.max, "pb-16")}>
          <Reveal>
            <h2 className={UI.h2}>
              FAQ <span className="text-[#F5C518]">croissance</span>
            </h2>
            <p className={cn("mt-2 max-w-3xl text-sm md:text-base", UI.subtle)}>
              Les questions qu’on reçoit le plus.
            </p>
          </Reveal>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map((f, i) => {
              const isOpen = open === f.q;
              return (
                <Reveal key={f.q} delay={0.04 + i * 0.03}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : f.q)}
                    className={cn(UI.card, "p-6 text-left transition hover:border-white/20")}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base font-semibold">{f.q}</h3>
                      <span className={cn("text-white/60 transition", isOpen ? "rotate-45" : "")}>+</span>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className={cn("mt-3 text-sm", UI.subtle)}>{f.a}</p>
                    </motion.div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 bg-[#0D0D10]">
          <div className={cn(UI.max, "py-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between")}>
            <Reveal>
              <div className="max-w-2xl">
                <h2 className={UI.h2}>
                  On pose un cadre, on exécute,{" "}
                  <span className="text-[#F5C518] drop-shadow-[0_0_18px_rgba(245,197,24,0.18)]">
                    on livre propre
                  </span>
                  .
                </h2>
                <p className={cn("mt-3 text-sm md:text-base", UI.subtle)}>
                  Un message clair = une réponse claire. Donne ton objectif + ta deadline, on te propose un plan.
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
                  Envoyer un brief
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </main>
  );
}
