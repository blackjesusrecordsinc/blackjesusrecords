// app/studio-label/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import Reveal from "@/components/Reveal";
import HeroCineSlider from "@/components/HeroCineSlider";
import CalendlyCTA, { useCalendly } from "@/components/CalendlyCTA";

/* ================= HELPERS ================= */
const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

function OutlineFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-white/12 bg-white/[0.04]",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:border before:border-white/10",
        "after:pointer-events-none after:absolute after:-inset-px after:rounded-[18px] after:shadow-[0_0_42px_rgba(245,197,66,0.10)]",
        className
      )}
    >
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

function Scene({
  children,
  className,
  depth = 10,
}: {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}) {
  // “Scroll 3D” léger : perspective + rotation/translate au scroll
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.15"] });

  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [14, -14]);
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [depth, -depth]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 1], reduce ? [1, 1, 1] : [0, 1, 1]);

  return (
    <section ref={ref} className={cn("relative", className)}>
      <motion.div
        style={{
          opacity,
          y,
          rotateX,
          transformPerspective: 1200,
        }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ================= MOTION ================= */
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const softFade: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function StudioLabelPage() {
  const { CALENDLY_URL } = useCalendly();
  const reduce = useReducedMotion();

  /* ===== HERO PARALLAX ===== */
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroProgress, [0, 1], reduce ? [0, 0] : [0, 26]);
  const heroGlow = useTransform(heroProgress, [0, 1], reduce ? [0.16, 0.16] : [0.24, 0.08]);

  /* ===== STRIP (marquee) ===== */
  const stripA = useMemo(
    () => ["Direction claire", "Cohérence visuelle", "Livrables prêts à diffuser", "Tests multi-supports", "Feedback structuré"],
    []
  );
  const stripB = useMemo(
    () => ["Direction artistique validée", "Grille de cohérence", "Exports optimisés", "Déclinaisons maîtrisées", "Validation fluide"],
    []
  );

  /* ===== “texte vivant” (disparaît / réapparaît) sur un gros bloc ===== */
  const microLines = useMemo(
    () => [
      "On clarifie l’objectif, puis on produit.",
      "On verrouille la direction, puis on exécute.",
      "On teste les supports, puis on livre.",
      "Moins de versions. Plus de justesse.",
    ],
    []
  );
  const [lineIdx, setLineIdx] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setLineIdx((v) => (v + 1) % microLines.length), 3800);
    return () => window.clearInterval(id);
  }, [microLines.length, reduce]);

  return (
    <main className="min-h-screen">
      {/* ================= HERO (scène forte) ================= */}
      <section ref={heroRef} className="relative min-h-[72vh] flex items-center overflow-hidden">
        <HeroCineSlider count={10} ext=".jpg" intervalMs={9000} />

        {/* overlays + glow gold léger */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/80 backdrop-blur-[2px]" />
        <motion.div aria-hidden className="pointer-events-none absolute -inset-24" style={{ opacity: heroGlow }}>
          <div className="absolute left-1/2 top-1/3 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute left-[20%] top-[62%] h-[320px] w-[320px] rounded-full bg-yellow-400/6 blur-3xl" />
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
          <motion.div style={{ y: heroY }} variants={container} initial="hidden" animate="show" className="space-y-8">
            <motion.p variants={fadeUp} className="text-xs tracking-widest text-yellow-300 uppercase">
              Studio & Label
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl font-extrabold leading-tight text-white max-w-4xl"
            >
              Studio créatif & label indépendant.
              <br />
              <span className="text-white/90">Une vision, un cadre, une exécution propre.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-white/80 max-w-2xl leading-relaxed">
              Nous concevons et produisons des contenus visuels pensés pour être diffusés :{" "}
              <span className="text-white">clips, photographie, post-production et écosystèmes visuels</span>. Chaque projet est cadré,
              exécuté proprement, livré prêt à publier.
            </motion.p>

            {/* CTA HERO — uniquement 2 CTA globaux */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-1">
              <Link
                href="/debuter-un-projet"
                className={cn(
                  "inline-flex items-center justify-center rounded-xl px-6 py-4 font-semibold",
                  "border border-white/15 bg-white/5 text-white hover:border-yellow-400/40 hover:bg-white/7 transition",
                  "focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
                )}
              >
                Débuter un projet
              </Link>

              <CalendlyCTA
                className={cn(
                  "inline-flex items-center justify-center rounded-xl px-6 py-4 font-semibold",
                  "bg-yellow-400 text-black hover:brightness-95 transition",
                  "focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                )}
              >
                Planifier un appel
              </CalendlyCTA>
            </motion.div>

            {/* Texte vivant (disparaît / réapparaît) — discret, ciné */}
            <motion.div variants={softFade} className="max-w-2xl">
              <div className="mt-2 rounded-2xl border border-white/12 bg-white/[0.03] px-5 py-4">
                <p className="text-xs tracking-widest text-white/55 uppercase">Cadre de travail</p>
                <div className="mt-2 min-h-[28px]">
                  {reduce ? (
                    <p className="text-sm text-white/70">Cadre clair, direction validée, livrables testés avant livraison — on va droit au résultat.</p>
                  ) : (
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={lineIdx}
                        initial={{ opacity: 0, y: 6, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -6, filter: "blur(10px)" }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="text-sm text-white/70"
                      >
                        {microLines[lineIdx]}
                      </motion.p>
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= STRIP DÉFILANT (rythme vivant) ================= */}
      <section className="relative overflow-hidden border-y border-white/10 bg-black">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-10 whitespace-nowrap"
              animate={reduce ? {} : { x: ["0%", "-50%"] }}
              transition={reduce ? undefined : { duration: 22, ease: "linear", repeat: Infinity }}
            >
              <div className="flex gap-10">
                {stripA.map((t) => (
                  <span key={`a-${t}`} className="text-sm tracking-wide text-white/70">
                    <span className="text-yellow-300/90">✦</span> {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-10" aria-hidden>
                {stripB.map((t) => (
                  <span key={`b-${t}`} className="text-sm tracking-wide text-white/70">
                    <span className="text-yellow-300/90">✦</span> {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= APPROCHE (philosophie) ================= */}
      <Reveal className="mx-auto max-w-6xl px-6 py-20">
        <Scene depth={9}>
          <OutlineFrame className="p-10 md:p-12">
            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              <div className="md:col-span-5">
                <p className="text-xs tracking-widest text-yellow-300 uppercase">Approche</p>
                <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  Du contenu intentionnel.
                </h2>
                <p className="mt-4 text-white/70 leading-relaxed">
                  On ne commence jamais par « faire beau ». On commence par clarifier ce que le contenu doit déclencher.
                </p>
              </div>

              <div className="md:col-span-7 space-y-5">
                <p className="text-white/75 leading-relaxed">
                  Chaque projet démarre par un cadre défini :{" "}
                  <span className="text-white">objectif, public cible, plateformes de diffusion</span>.
                </p>
                <p className="text-white/75 leading-relaxed">
                  Ce cadre simplifie chaque décision : cohérence, impact, constance. Résultat : un rendu premium qui tient dans le temps,
                  pas une série de pièces isolées.
                </p>
                <p className="text-white/75 leading-relaxed">
                  On privilégie la clarté : un angle fort, une direction nette,{" "}
                  <span className="text-white">une exécution propre</span> — plutôt qu’un empilement d’effets.
                </p>
              </div>
            </div>
          </OutlineFrame>
        </Scene>
      </Reveal>

      {/* ================= MÉTHODE / TIMELINE (comment) ================= */}
      <Reveal className="mx-auto max-w-6xl px-6 py-20">
        <Scene depth={10}>
          <OutlineFrame className="p-10 md:p-12">
            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              <div className="md:col-span-5">
                <p className="text-xs tracking-widest text-yellow-300 uppercase">Méthode</p>
                <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  Une méthode conçue pour la cohérence.
                </h2>
                <p className="mt-4 text-white/70 leading-relaxed">
                  L’objectif : arriver vite à un rendu juste — sans fatigue, sans versions infinies.
                </p>
              </div>

              <div className="md:col-span-7">
                <div className="grid gap-4">
                  {[
                    {
                      title: "Grille de cohérence visuelle (pré-établie)",
                      desc: "Une base claire avant la production : style, rythme, typographies, contrastes, références. On évite les choix au hasard.",
                    },
                    {
                      title: "Direction artistique validée avant production",
                      desc: "On verrouille l’intention, le ton et le format avant d’allumer une caméra (ou de lancer la post-prod).",
                    },
                    {
                      title: "Livrables testés sur leurs supports cibles",
                      desc: "Avant livraison, on teste l’export et la lecture sur les supports attendus (mobile, Reels, YouTube, etc.).",
                    },
                    {
                      title: "Feedback en 3 étapes structurées",
                      desc: "1) Retours essentiels, 2) Ajustements précis, 3) Validation finale. Ça protège le temps, la qualité et la cohérence.",
                    },
                  ].map((b) => (
                    <motion.div
                      key={b.title}
                      initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                    >
                      <p className="text-white font-semibold">{b.title}</p>
                      <p className="mt-2 text-white/70 leading-relaxed">{b.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <p className="mt-6 text-sm text-white/60 leading-relaxed">
                  Ce système est volontairement simple : il augmente la qualité, réduit les hésitations et accélère la livraison.
                </p>
              </div>
            </div>
          </OutlineFrame>
        </Scene>
      </Reveal>

      {/* ================= SERVICES / PREUVES (quoi) ================= */}
      <Reveal className="mx-auto max-w-6xl px-6 py-20">
        <Scene depth={9}>
          <OutlineFrame className="p-10 md:p-12">
            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              <div className="md:col-span-5">
                <p className="text-xs tracking-widest text-yellow-300 uppercase">Preuves</p>
                <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  Voir des exemples concrets.
                </h2>
                <p className="mt-4 text-white/70 leading-relaxed">
                  On renvoie toujours vers la preuve la plus directe — pas vers une promesse.
                </p>

                {/* Quick links — propre, discret */}
                <div className="mt-6 text-sm text-white/75">
                  <span className="text-white/60">Explorer :</span>{" "}
                  <a
                    href="https://www.youtube.com/@shegue242"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-8 hover:text-white transition"
                  >
                    Vidéo
                  </a>{" "}
                  <span className="text-white/30">|</span>{" "}
                  <a
                    href="https://open.spotify.com/intl-fr/artist/2uxnQEzqw94AWew2E7nEHc"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-8 hover:text-white transition"
                  >
                    Audio
                  </a>{" "}
                  <span className="text-white/30">|</span>{" "}
                  <Link href="/portfolio#photo" className="underline underline-offset-8 hover:text-white transition">
                    Photo
                  </Link>{" "}
                  <span className="text-white/30">|</span>{" "}
                  <Link href="/portfolio#digital" className="underline underline-offset-8 hover:text-white transition">
                    Digital
                  </Link>
                </div>
              </div>

              <div className="md:col-span-7">
                {/* Pas de “boutons CTA” ici : juste des cartes + liens discrets */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <p className="text-white font-semibold">Clips & contenus vidéo</p>
                    <p className="mt-2 text-white/70 leading-relaxed">Extraits, clips et rendus finaux en conditions réelles de diffusion.</p>
                    <div className="mt-4">
                      <a
                        href="https://www.youtube.com/@shegue242"
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-white/75 underline underline-offset-8 hover:text-white transition"
                      >
                        Voir le portfolio
                      </a>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <p className="text-white font-semibold">Projets musicaux</p>
                    <p className="mt-2 text-white/70 leading-relaxed">L’univers se vérifie aussi sur les plateformes : continuité, image, cohérence.</p>
                    <div className="mt-4">
                      <a
                        href="https://open.spotify.com/intl-fr/artist/2uxnQEzqw94AWew2E7nEHc"
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-white/75 underline underline-offset-8 hover:text-white transition"
                      >
                        Voir le portfolio
                      </a>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <p className="text-white font-semibold">Photographie</p>
                    <p className="mt-2 text-white/70 leading-relaxed">Portrait, éditorial, corporate, couple, famille — esthétique propre, prête à publier.</p>
                    <div className="mt-4">
                      <Link
                        href="/portfolio#photo"
                        className="text-sm text-white/75 underline underline-offset-8 hover:text-white transition"
                      >
                        Voir le portfolio
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <p className="text-white font-semibold">Digital & formats de diffusion</p>
                    <p className="mt-2 text-white/70 leading-relaxed">Déclinaisons, exports optimisés, formats adaptés — en attendant les études de cas.</p>
                    <div className="mt-4">
                      <Link
                        href="/portfolio#digital"
                        className="text-sm text-white/75 underline underline-offset-8 hover:text-white transition"
                      >
                        Voir le portfolio
                      </Link>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-sm text-white/60 leading-relaxed">
                  Si tu veux, on te montre des exemples ciblés selon ton secteur et ta plateforme principale.
                </p>
              </div>
            </div>
          </OutlineFrame>
        </Scene>
      </Reveal>

      {/* ================= LABEL (valeur ajoutée) ================= */}
      <Reveal className="mx-auto max-w-6xl px-6 py-20">
        <Scene depth={10}>
          <OutlineFrame className="p-10 md:p-12">
            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              <div className="md:col-span-5">
                <p className="text-xs tracking-widest text-yellow-300 uppercase">Le label</p>
                <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  Quand la cohérence doit vivre dans le temps.
                </h2>
                <p className="mt-4 text-white/70 leading-relaxed">
                  Même méthode, même exigence — sur plusieurs sorties, avec une vision long terme.
                </p>
              </div>

              <div className="md:col-span-7 space-y-6">
                <p className="text-white/75 leading-relaxed">
                  Après la production, certains projets demandent plus qu’un rendu : ils demandent une continuité.
                  Le label intervient lorsque l’univers doit rester cohérent d’une sortie à l’autre.
                </p>

                <ul className="space-y-3 text-white/75">
                  <li className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-300/90" />
                    <span>pour des artistes cherchant un développement à long terme</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-300/90" />
                    <span>pour des marques voulant une identité cohérente sur plusieurs sorties</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-300/90" />
                    <span>pour des projets nécessitant une stratégie de diffusion planifiée</span>
                  </li>
                </ul>

                {/* SHÉGUÉ — vignette réelle (chemin corrigé) */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                  <div className="grid md:grid-cols-12">
                    <div className="relative md:col-span-5 min-h-[220px]">
                      <Image
                        src="/photo/portrait/portrait-12.jpg"
                        alt="SHÉGUÉ — portrait"
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover"
                        quality={75}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
                      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
                    </div>

                    <div className="md:col-span-7 p-6 md:p-7">
                      <p className="text-white font-semibold">SHÉGUÉ</p>
                      <p className="mt-2 text-white/70 leading-relaxed">
                        Premier artiste signé. Une collaboration qui illustre notre approche : cohérence visuelle, direction et présence construite sur la durée.
                      </p>

                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                        <a
                          href="https://www.youtube.com/@shegue242"
                          target="_blank"
                          rel="noreferrer"
                          className="text-white/75 underline underline-offset-8 hover:text-white transition"
                        >
                          Voir les clips
                        </a>
                        <a
                          href="https://open.spotify.com/intl-fr/artist/2uxnQEzqw94AWew2E7nEHc"
                          target="_blank"
                          rel="noreferrer"
                          className="text-white/75 underline underline-offset-8 hover:text-white transition"
                        >
                          Écouter sur Spotify
                        </a>
                        <a
                          href="https://linktr.ee/shegue"
                          target="_blank"
                          rel="noreferrer"
                          className="text-white/60 underline underline-offset-8 hover:text-white/80 transition"
                        >
                          Linktree
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-white/60 leading-relaxed">
                  On sélectionne les projets label : alignement artistique, vision commune et ambition réaliste.
                </p>
              </div>
            </div>
          </OutlineFrame>
        </Scene>
      </Reveal>

      {/* ================= CTA FINAL (2 CTA globaux seulement) ================= */}
      <Reveal className="mx-auto max-w-6xl px-6 pb-28 pt-2">
        <Scene depth={8}>
          <OutlineFrame className="p-10 md:p-12 text-center">
            <p className="text-2xl md:text-3xl font-extrabold text-white">Un projet à structurer ?</p>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto leading-relaxed">
              Si tu veux un cadre clair, une production maîtrisée et un rendu cohérent avec ton image, on peut en discuter.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/debuter-un-projet"
                className={cn(
                  "inline-flex items-center justify-center rounded-xl px-7 py-4 font-semibold",
                  "border border-white/15 bg-white/5 text-white hover:border-yellow-400/40 hover:bg-white/7 transition",
                  "focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
                )}
              >
                Débuter un projet
              </Link>

              <CalendlyCTA
                className={cn(
                  "inline-flex items-center justify-center rounded-xl px-7 py-4 font-semibold",
                  "bg-yellow-400 text-black hover:brightness-95 transition",
                  "focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                )}
              >
                Planifier un appel
              </CalendlyCTA>
            </div>

            <div className="pt-4">
              <a
                href={CALENDLY_URL}
                className="text-xs text-white/60 underline underline-offset-8 hover:text-white transition"
              >
                Ouvrir le lien Calendly si la fenêtre ne s’affiche pas
              </a>
            </div>
          </OutlineFrame>
        </Scene>
      </Reveal>
    </main>
  );
}
