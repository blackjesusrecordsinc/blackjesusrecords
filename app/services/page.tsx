"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useCallback, useMemo } from "react";

import Reveal from "@/components/Reveal";
import HeroCineSlider from "@/components/HeroCineSlider";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/contact-blackjesusrecords/30min";

/* ================= MOTION (ciné, sobre) ================= */
const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeOut },
  },
};

/* ================= UI (cohérence stricte) ================= */
const pillBase =
  "px-3 py-1.5 rounded-full border border-white/12 bg-white/[0.03] text-xs text-white/80 hover:text-white hover:border-white/22 transition-colors";
const pillGold =
  "px-3 py-1.5 rounded-full border border-[#F5C542]/25 bg-[#F5C542]/[0.06] text-xs text-white/90 hover:border-[#F5C542]/45 hover:bg-[#F5C542]/[0.10] transition-colors";

const btnBase =
  "inline-flex items-center justify-center rounded-xl px-8 py-4 font-semibold transition-colors";
const btnOutline =
  `${btnBase} border border-white/14 bg-white/[0.03] text-white/92 hover:text-white hover:border-white/22 hover:bg-white/[0.06]`;
const btnGoldOutline =
  `${btnBase} border border-[#F5C542]/30 bg-transparent text-white hover:border-[#F5C542]/55 hover:bg-[#F5C542]/[0.06]`;

function PillLink({
  href,
  children,
  tone = "base",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "base" | "gold";
}) {
  return (
    <Link href={href} className={tone === "gold" ? pillGold : pillBase}>
      {children}
    </Link>
  );
}

function PillAction({
  children,
  onClick,
  tone = "base",
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  tone?: "base" | "gold";
  ariaLabel: string;
}) {
  return (
    <button type="button" onClick={onClick} className={tone === "gold" ? pillGold : pillBase} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

function Card({
  title,
  desc,
  points,
}: {
  title: string;
  desc: string;
  points: string[];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
      <div className="space-y-2">
        <p className="text-sm font-semibold tracking-[0.18em] uppercase text-white/70">
          <span className="text-[#F5C542]/90">•</span> {title}
        </p>
        <p className="text-white/85 leading-relaxed">{desc}</p>
      </div>
      <div className="mt-5 h-px w-full bg-white/10" />
      <ul className="mt-5 space-y-3">
        {points.map((t) => (
          <li key={t} className="flex gap-3 text-sm leading-relaxed text-white/72">
            <span className="mt-[0.55em] h-1.5 w-1.5 rounded-full bg-[#F5C542]/70 shrink-0" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServicesPage() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -14]);

  const openCalendly = useCallback(() => {
    if (window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
      return;
    }
    window.location.href = CALENDLY_URL;
  }, []);

  const proof = useMemo(
    () => [
      { k: "Rendu", v: "Ciné, propre, lisible", s: "direction & finition" },
      { k: "Workflow", v: "Rapide, cadré", s: "brief → prod → livraison" },
      { k: "Livrables", v: "Prêts à diffuser", s: "formats multi-plateformes" },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative min-h-[78vh] flex items-center overflow-hidden">
        <HeroCineSlider count={10} ext=".jpg" intervalMs={9000} />

        {/* Overlay premium : focus texte + micro gold */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-black/55 to-black/85" />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(62%_58%_at_18%_26%,rgba(245,197,66,0.09)_0%,rgba(0,0,0,0)_56%)]" />

        <motion.div
          style={prefersReducedMotion ? undefined : { y: heroY }}
          className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24"
        >
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">
            <motion.p
              variants={prefersReducedMotion ? undefined : item}
              className="text-xs tracking-[0.32em] uppercase text-white/70"
            >
              <span className="text-[#F5C542]/90">•</span> Services
            </motion.p>

            <motion.h1
              variants={prefersReducedMotion ? undefined : item}
              className="text-4xl md:text-6xl font-extrabold leading-[1.05] text-white max-w-4xl"
            >
              On construit un rendu.
              <br />
              Pas une “liste de prestations”.
            </motion.h1>

            <motion.p
              variants={prefersReducedMotion ? undefined : item}
              className="text-lg md:text-xl text-white/78 max-w-2xl leading-relaxed"
            >
              Direction, exécution, diffusion : tout est pensé pour être clair, crédible
              et prêt à performer — sans bruit, sans gimmicks.
            </motion.p>

            <motion.div
              variants={prefersReducedMotion ? undefined : item}
              className="flex flex-wrap gap-2 pt-1"
            >
              <PillLink href="#video">Production vidéo</PillLink>
              <PillLink href="#audio">Audio & son</PillLink>
              <PillLink href="#strategie">Web & stratégie</PillLink>
              <PillLink href="/debuter-un-projet" tone="gold">
                Débuter un projet
              </PillLink>
              <PillAction ariaLabel="Planifier un appel (Calendly)" onClick={openCalendly}>
                Planifier un appel
              </PillAction>
            </motion.div>

            <motion.div
              variants={prefersReducedMotion ? undefined : item}
              className="grid gap-3 pt-3 md:grid-cols-3"
            >
              {proof.map((p) => (
                <div key={p.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs tracking-[0.24em] uppercase text-white/55">{p.k}</p>
                  <p className="mt-2 text-base font-semibold text-white">{p.v}</p>
                  <p className="mt-1 text-sm text-white/60">{p.s}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* INTRO (vente + cadre) */}
      <Reveal className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-7 space-y-6">
            <p className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
              Le vrai travail commence avant la caméra.
            </p>
            <p className="text-white/75 leading-relaxed">
              On commence par cadrer : objectif, message, public, contraintes, diffusion.
              Ensuite seulement, on produit — avec une direction claire et une finition clean.
            </p>
            <p className="text-white/75 leading-relaxed">
              Si tu as déjà les infos : dépose un brief. Sinon : appel court, cadrage, décision.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link href="/debuter-un-projet" className={btnGoldOutline}>
                Débuter un projet
              </Link>
              <button type="button" onClick={openCalendly} className={btnOutline}>
                Planifier un appel
              </button>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-sm font-semibold tracking-[0.18em] uppercase text-white/70">
                <span className="text-[#F5C542]/90">•</span> Process (simple, solide)
              </p>
              <div className="mt-5 space-y-4">
                {[
                  { t: "1. Cadrage", d: "objectif, audience, message, contraintes, diffusion" },
                  { t: "2. Production", d: "tournage / création / exécution propre, cohérente" },
                  { t: "3. Post", d: "montage, sound, étalonnage, finition" },
                  { t: "4. Livraison", d: "exports optimisés + structure de fichiers nette" },
                ].map((x) => (
                  <div key={x.t} className="flex gap-3">
                    <span className="mt-[0.55em] h-1.5 w-1.5 rounded-full bg-[#F5C542]/70 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-white/90">{x.t}</p>
                      <p className="text-sm text-white/65 leading-relaxed">{x.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-px w-full bg-white/10" />
              <p className="mt-6 text-sm text-white/65 leading-relaxed">
                Résultat attendu : un rendu lisible, crédible, et prêt à être publié partout.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ================= VIDEO ================= */}
      <section id="video" className="scroll-mt-28">
        <Reveal className="max-w-6xl mx-auto px-6 py-24">
          <div className="space-y-10">
            <div className="space-y-4">
              <p className="text-2xl md:text-3xl font-extrabold text-white">Réalisation & production vidéo</p>
              <div className="h-px w-full bg-white/10" />
              <p className="text-white/75 max-w-3xl leading-relaxed">
                Clips, contenus, événements. Une direction artistique claire, une exécution propre,
                un rendu ciné — pensé pour la diffusion.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card
                title="Direction"
                desc="On verrouille la vision avant de produire."
                points={[
                  "références & intention",
                  "structure, rythme, plans",
                  "cohérence lumière / cadre / style",
                ]}
              />
              <Card
                title="Production"
                desc="Tournage stabilisé, propre, assumé."
                points={[
                  "plans utiles, pas de remplissage",
                  "exécution rapide et cadrée",
                  "captation pensée pour le montage",
                ]}
              />
              <Card
                title="Finition"
                desc="Le rendu final doit tenir partout."
                points={[
                  "montage + étalonnage clean",
                  "exports multi-plateformes",
                  "livraison structurée",
                ]}
              />
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link href="/portfolio" className={btnOutline}>
                Voir le portfolio
              </Link>
              <Link href="/debuter-un-projet" className={btnGoldOutline}>
                Débuter un projet
              </Link>
              <button type="button" onClick={openCalendly} className={btnOutline}>
                Planifier un appel
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= AUDIO ================= */}
      <section id="audio" className="scroll-mt-28">
        <Reveal className="max-w-6xl mx-auto px-6 py-24">
          <div className="space-y-10">
            <div className="space-y-4">
              <p className="text-2xl md:text-3xl font-extrabold text-white">Audio & son</p>
              <div className="h-px w-full bg-white/10" />
              <p className="text-white/75 max-w-3xl leading-relaxed">
                Création, direction et livrables prêts à publier. L’objectif : un rendu maîtrisé,
                cohérent, qui tient sur toutes les écoutes.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card
                title="Direction"
                desc="On cherche l’intention et on la sert."
                points={[
                  "cohérence artistique",
                  "choix simples et assumés",
                  "priorité à la lisibilité",
                ]}
              />
              <Card
                title="Production"
                desc="Captation propre, focus résultat."
                points={[
                  "prise utile, sans bruit",
                  "organisation de session",
                  "workflow efficace",
                ]}
              />
              <Card
                title="Finalisation"
                desc="Sortie prête à publier."
                points={[
                  "équilibre, contrôle, cohérence",
                  "exports & livrables clairs",
                  "structure de livraison nette",
                ]}
              />
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link href="/debuter-un-projet" className={btnGoldOutline}>
                Débuter un projet
              </Link>
              <button type="button" onClick={openCalendly} className={btnOutline}>
                Planifier un appel
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= STRATEGIE ================= */}
      <section id="strategie" className="scroll-mt-28">
        <Reveal className="max-w-6xl mx-auto px-6 py-24">
          <div className="space-y-10">
            <div className="space-y-4">
              <p className="text-2xl md:text-3xl font-extrabold text-white">Web & stratégie digitale</p>
              <div className="h-px w-full bg-white/10" />
              <p className="text-white/75 max-w-3xl leading-relaxed">
                Présence numérique, cohérence de marque, diffusion. On structure pour que ton contenu
                soit clair, crédible et aligné partout.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card
                title="Structure"
                desc="Une base claire, pas du bruit."
                points={[
                  "message & positionnement",
                  "arborescence simple",
                  "cohérence visuelle",
                ]}
              />
              <Card
                title="Système"
                desc="Le contenu doit travailler pour toi."
                points={[
                  "formats & routines",
                  "réutilisation intelligente",
                  "diffusion cadrée",
                ]}
              />
              <Card
                title="Crédibilité"
                desc="Premium, minimal, lisible."
                points={[
                  "hiérarchie forte",
                  "contraste maîtrisé",
                  "micro-accent gold",
                ]}
              />
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link href="/debuter-un-projet" className={btnGoldOutline}>
                Débuter un projet
              </Link>
              <button type="button" onClick={openCalendly} className={btnOutline}>
                Planifier un appel
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA FINAL (sans jaune plein, vente propre) */}
      <Reveal className="max-w-6xl mx-auto px-6 pb-28">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 md:p-12">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <p className="text-2xl md:text-3xl font-extrabold text-white">
              On cadre ton projet. Puis on décide.
            </p>

            <p className="text-white/70 leading-relaxed">
              Deux options : déposer un brief complet, ou faire un appel court pour cadrer.
              Ensuite, on avance seulement si c’est aligné.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/debuter-un-projet" className={btnGoldOutline}>
                Débuter un projet
              </Link>
              <button type="button" onClick={openCalendly} className={btnOutline}>
                Planifier un appel
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
