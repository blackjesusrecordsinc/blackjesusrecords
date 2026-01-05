"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

<<<<<<< HEAD
const fade: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1], // ✅ TS OK (easeOut)
    },
  },
};

export default function StudioEtLabelPage() {
  return (
    <main className="readable min-h-screen text-white">
      {/* INTRO */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <motion.h1
          variants={fade}
          initial="hidden"
          animate="show"
          className="text-3xl md:text-4xl font-semibold"
        >
          Studio & Label
        </motion.h1>

        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-2xl text-white/65 leading-relaxed"
        >
          Black Jesus Records est un studio créatif et un label indépendant basé
          à Lévis, Québec. Nous produisons des images et du son avec exigence,
          intention et cohérence.
        </motion.p>

        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-4 max-w-2xl text-white/65 leading-relaxed"
        >
          Image · Son · Stratégie.
        </motion.p>
      </section>

      {/* CORPS (CALME, INSTITUTIONNEL) */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <div className="space-y-16">
          <Block
            title="Position"
            text={[
              "Studio créatif & label indépendant.",
              "Pour les artistes, marques et entreprises qui veulent une présence numérique forte.",
              "Un langage visuel et sonore cohérent, sans bruit inutile.",
            ]}
          />

          <Block
            title="Vision"
            text={[
              "On élève ce qui vient d’ici.",
              "Créer avec précision. Livrer proprement. Assumer chaque image.",
            ]}
          />

          <Block
            title="Méthode"
            text={[
              "Rigueur.",
              "Clarté.",
              "Décisions simples.",
              "Une narration calme, du tournage à la livraison.",
            ]}
          />

          <div className="h-px w-full bg-white/15" />

          {/* CTA DISCRET */}
          <div className="flex flex-col gap-6">
            <p className="text-white/60 leading-relaxed max-w-xl">
              Si tu veux parler rapidement : planifier un appel. Si tu préfères
              écrire : débuter un projet.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href="/planifier-un-appel"
                className="underline underline-offset-8 text-white/80 hover:text-white transition"
              >
                Planifier un appel
              </Link>

              <Link
                href="/debuter-un-projet"
                className="underline underline-offset-8 text-white/80 hover:text-white transition"
              >
                Débuter un projet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SILENCE */}
      <section className="h-[18vh]" />
=======
import Reveal from "@/components/Reveal";
import HeroCineSlider from "@/components/HeroCineSlider";
import CalendlyCTA, { useCalendly } from "@/components/CalendlyCTA";

/* ================= MOTION (sobres, lisibles) ================= */
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
    transition: { duration: 0.65, ease: easeOut },
  },
};

export default function StudioLabelPage() {
  const prefersReducedMotion = useReducedMotion();
  const { CALENDLY_URL } = useCalendly();
  const hasCalendly = typeof CALENDLY_URL === "string" && CALENDLY_URL.trim().length > 0;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative min-h-[78vh] flex items-center overflow-hidden">
        <HeroCineSlider count={10} ext=".jpg" intervalMs={9000} />

        {/* Overlay premium: contraste + focus texte (pas de jaune) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-black/55 to-black/85" />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_55%_at_20%_30%,rgba(245,197,66,0.08)_0%,rgba(0,0,0,0)_55%)]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10"
          >
            <motion.p
              variants={prefersReducedMotion ? undefined : item}
              className="text-xs tracking-[0.32em] uppercase text-white/70"
            >
              <span className="text-[#F5C542]/90">•</span> Studio & Label
            </motion.p>

            <motion.h1
              variants={prefersReducedMotion ? undefined : item}
              className="text-4xl md:text-6xl font-extrabold leading-[1.05] text-white max-w-3xl"
            >
              Un studio créatif.
              <br />
              Un label indépendant.
            </motion.h1>

            <motion.p
              variants={prefersReducedMotion ? undefined : item}
              className="text-lg md:text-xl text-white/78 max-w-2xl leading-relaxed"
            >
              Black Jesus Records construit des images et des univers.
              Direction artistique, tournage, post-production et stratégie — une seule
              vision, un rendu maîtrisé.
            </motion.p>

            <motion.div
              variants={prefersReducedMotion ? undefined : item}
              className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2"
            >
              <div className="flex items-center gap-3 text-sm text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F5C542]/75" />
                <span>Premium · Ciné · Minimal</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F5C542]/75" />
                <span>Lévis (QC) · Québec & International</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1 */}
      <Reveal className="max-w-5xl mx-auto px-6 py-24">
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
              Pas un freelance.
              <br />
              Pas une usine à contenu.
            </p>
            <div className="h-px w-full bg-white/10" />
          </div>

          <div className="space-y-6 max-w-3xl">
            <p className="text-white/75 leading-relaxed">
              Chaque projet commence par une discussion cadrée : intention, contexte,
              objectif, contraintes. Ensuite seulement, on produit.
            </p>

            <p className="text-white/75 leading-relaxed">
              Le studio porte l’image, le son et la cohérence globale.
              Le label accompagne certains artistes sur la durée.
            </p>
          </div>
        </div>
      </Reveal>

      {/* SECTION 2 */}
      <Reveal className="max-w-5xl mx-auto px-6 py-24">
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl font-extrabold text-white">Comment on travaille</p>
            <div className="h-px w-full bg-white/10" />
          </div>

          {/* Éditorial + solide (pas de tirets scolaires) */}
          <div className="max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
            {[
              {
                t: "Vision avant production",
                d: "On valide l’intention et le message avant de toucher à la caméra ou au timeline.",
              },
              {
                t: "Direction artistique cohérente",
                d: "Références, mood, cadrage, couleur, rythme : une ligne claire du début à la fin.",
              },
              {
                t: "Choix simples, assumés",
                d: "Moins d’effets, plus d’impact. Le rendu doit rester propre et intemporel.",
              },
              {
                t: "Exports prêts à diffuser",
                d: "Formats optimisés, livraisons organisées, cohérence multi-plateformes.",
              },
            ].map((x) => (
              <div key={x.t} className="p-6 md:p-7">
                <div className="flex items-start gap-4">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#F5C542]/70 shrink-0" />
                  <div className="space-y-2">
                    <p className="font-semibold text-white">{x.t}</p>
                    <p className="text-sm leading-relaxed text-white/70">{x.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* SECTION 3 */}
      <Reveal className="max-w-5xl mx-auto px-6 py-24">
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl font-extrabold text-white">Le label</p>
            <div className="h-px w-full bg-white/10" />
          </div>

          <div className="space-y-6 max-w-3xl">
            <p className="text-white/75 leading-relaxed">
              Le label permet d’aller plus loin quand c’est justifié : développement artistique,
              stratégie, cohérence visuelle et présence sur la durée.
            </p>

            <p className="text-white/75 leading-relaxed">
              SHÉGUÉ est le premier artiste signé. D’autres projets viendront au bon moment.
            </p>
          </div>

          <Link
            href="https://youtube.com/@shegue242?si=0t9OUsU9xXfpkWdu"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-transparent px-6 py-3 text-white/85 hover:text-white hover:border-white/30 transition-colors"
          >
            Découvrir SHÉGUÉ <span className="text-[#F5C542]/90">↗</span>
          </Link>
        </div>
      </Reveal>

      {/* CTA FINAL (sobre, premium, pas agressif) */}
      <Reveal className="max-w-5xl mx-auto px-6 pb-28">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 md:p-12">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <p className="text-2xl md:text-3xl font-extrabold text-white">
              Tu as un projet à construire ?
            </p>

            <p className="text-white/70 leading-relaxed">
              On échange, on cadre, puis on décide.
              <br />
              Pas de promesses inutiles — une direction claire.
            </p>

            <div className="pt-2">
              <CalendlyCTA className="inline-flex items-center justify-center rounded-xl border border-[#F5C542]/30 bg-transparent px-8 py-4 font-semibold text-white hover:border-[#F5C542]/55 hover:bg-white/5 transition-colors">
                Planifier un appel
              </CalendlyCTA>

              {hasCalendly ? (
                <div className="pt-4">
                  <a
                    href={CALENDLY_URL}
                    className="text-xs text-white/55 underline underline-offset-8 hover:text-white transition-colors"
                  >
                    Si la fenêtre ne s’ouvre pas, clique ici.
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Reveal>
>>>>>>> 10e061a (Rebuild: premium layout + motion + readability)
    </main>
  );
}

function Block({ title, text }: { title: string; text: string[] }) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-sm uppercase tracking-[0.3em] text-white/70">
        {title}
      </h2>

      <div className="mt-6 space-y-4 text-white/70 leading-relaxed">
        {text.map((t, i) => (
          <p key={i}>{t}</p>
        ))}
      </div>
    </div>
  );
}
