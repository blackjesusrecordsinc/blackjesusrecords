// app/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import HeroCineSlider from "@/components/HeroCineSlider";

/* ================= CONFIG ================= */
const CALL_URL = process.env.NEXT_PUBLIC_CALL_URL || "tel:+15818496669";

const PROJECT_URL = "/debuter-un-projet";
const SHEGUE_YT =
  process.env.NEXT_PUBLIC_SHEGUE_YOUTUBE_URL ||
  "https://youtube.com/@shegue242?si=0t9OUsU9xXfpkWdu";
const SHEGUE_IG = process.env.NEXT_PUBLIC_SHEGUE_INSTAGRAM_URL || "";
const SHEGUE_TT = process.env.NEXT_PUBLIC_SHEGUE_TIKTOK_URL || "";

/* ================= MOTION ================= */
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ================= SOCIAL CARD ================= */
function SocialCard({
  badge,
  title,
  desc,
  href,
}: {
  badge: string;
  title: string;
  desc: string;
  href: string;
}) {
  const disabled = !href;

  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-left transition",
        disabled ? "opacity-60 cursor-not-allowed" : "hover:border-[#F5C542]/35 hover:bg-white/7",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-white font-extrabold tracking-wide">{title}</p>
        <span className="text-[11px] px-2 py-1 rounded-full border border-white/15 text-white/75">
          {badge}
        </span>
      </div>

      <p className="mt-2 text-white/70 text-sm leading-relaxed">{desc}</p>

      {disabled ? (
        <p className="mt-4 text-xs text-white/45">Lien à ajouter</p>
      ) : (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-sm font-semibold text-[#F5C542]/90 hover:text-[#F5C542] transition"
        >
          Ouvrir →
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section id="top" className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* background slideshow (discret) */}
        <HeroCineSlider count={10} ext=".jpg" intervalMs={9000} />

        {/* overlay lisibilité (constante) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />

        {/* light blooms (subtil, premium) */}
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#F5C542]/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-white/6 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* TEXTE */}
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
              <motion.div
                variants={item}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C542]/10 border border-[#F5C542]/25"
              >
                <span className="w-2 h-2 bg-[#F5C542] rounded-full" />
                <span className="text-xs uppercase tracking-widest text-[#F5C542]/90">
                  Studio créatif & label — Lévis
                </span>
              </motion.div>

              <motion.div variants={item} className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-white">
                  On élève <br />
                  <span className="text-[#F5C542]">ce qui vient d’ici.</span>
                </h1>

                <p className="text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">
                  Studio créatif & label indépendant —{" "}
                  <span className="text-[#F5C542] font-semibold">image</span>,{" "}
                  <span className="text-[#F5C542] font-semibold">son</span> et{" "}
                  <span className="text-[#F5C542] font-semibold">stratégie</span>.
                </p>
              </motion.div>

              <motion.p variants={item} className="text-sm md:text-base text-white/75 max-w-2xl leading-relaxed">
                <Typewriter
                  phrases={[
                    "Clips — direction artistique + rendu ciné.",
                    "Brand content — cohérence visuelle + impact.",
                    "Événements — captation propre, montage émotion.",
                  ]}
                  typingMs={18}
                  holdMs={1200}
                  className="text-white/75"
                  accentClassName="text-[#F5C542] font-semibold"
                  accentWords={["Clips", "Brand", "Événements", "ciné", "impact"]}
                />
              </motion.p>

              {/* CTA PREMIUM (HERO) — main character uniquement ici */}
              <motion.div variants={item} className="pt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={PROJECT_URL}
                    className="group inline-flex items-center justify-center rounded-full
                               border border-[#F5C542]/50 bg-black/40 px-8 py-4
                               text-white font-extrabold tracking-wide
                               shadow-[0_0_0_1px_rgba(245,197,66,0.08),0_20px_60px_rgba(0,0,0,0.45)]
                               hover:-translate-y-[2px] hover:scale-[1.01]
                               hover:border-[#F5C542]/80 hover:shadow-[0_0_24px_rgba(245,197,66,0.22)]
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/80
                               transition"
                  >
                    Débuter un projet →
                  </Link>

                  <a
                    href={CALL_URL}
                    className="inline-flex items-center justify-center rounded-full
                               border border-white/20 bg-black/25 px-8 py-4
                               text-white/90 font-semibold
                               hover:-translate-y-[2px] hover:scale-[1.01]
                               hover:border-[#F5C542]/50 hover:text-white
                               hover:shadow-[0_0_20px_rgba(245,197,66,0.16)]
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black/80
                               transition"
                  >
                    Planifier un appel
                  </a>
                </div>
              </motion.div>

              <motion.div variants={item} className="flex flex-wrap gap-6 pt-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  Disponibilités limitées
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  Québec & International
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  Livraison garantie
                </div>
              </motion.div>
            </motion.div>

            {/* VISUEL DROITE */}
            <div className="relative z-10">
              <div className="absolute -inset-6 bg-gradient-to-br from-[#F5C542]/12 via-white/6 to-black/0 blur-2xl opacity-70" />

              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative h-[420px] sm:h-[520px] lg:h-[620px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
              >
                <Image
                  src="/black-jesus-records-hero.jpg"
                  alt="Black Jesus Records – Réalisation"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover object-[50%_14%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15" />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 to-transparent" />
                <div className="absolute inset-x-0 bottom-8 text-center px-8">
                  <p className="text-white/95 text-[15px] italic tracking-wide drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                    “De l’idée à la réalisation.”
                  </p>
                  <p className="mt-2 text-white/75 text-sm tracking-wide">— Black Jesus Records</p>
                </div>
              </motion.div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/70">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F5C542]/80" />
                Direction artistique · Réalisation · Post-production
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISES */}
      <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/services#video"
            className="rounded-2xl border border-white/10 bg-white/5 p-8 hover:border-[#F5C542]/35 transition shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
          >
            <p className="text-lg font-extrabold text-white">Réalisation & production vidéo</p>
            <p className="mt-2 text-white/70 text-sm leading-relaxed">
              Clips, contenus, événements — direction artistique et exécution propre.
            </p>
          </Link>

          <Link
            href="/services#audio"
            className="rounded-2xl border border-white/15 bg-white/8 p-8 hover:border-[#F5C542]/40 transition shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
          >
            <p className="text-lg font-extrabold text-white">Audio & son</p>
            <p className="mt-2 text-white/70 text-sm leading-relaxed">
              Création, direction et livrables prêts à publier.
            </p>
          </Link>

          <Link
            href="/services#strategie"
            className="rounded-2xl border border-white/10 bg-white/5 p-8 hover:border-[#F5C542]/35 transition shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
          >
            <p className="text-lg font-extrabold text-white">Web & stratégie digitale</p>
            <p className="mt-2 text-white/70 text-sm leading-relaxed">
              Cohérence, diffusion, présence numérique — sans blabla.
            </p>
          </Link>
        </div>
      </Reveal>

      {/* PROJETS */}
      <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">Projets</h2>
        <p className="mt-3 text-white/70 max-w-2xl">
          SHÉGUÉ — accès direct à ses plateformes. En dessous : aperçu clients + portfolio complet.
        </p>
      </Reveal>

      <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* 3 colonnes SHÉGUÉ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SocialCard badge="YouTube" title="SHÉGUÉ" desc="Chaîne officielle (clips + sorties)." href={SHEGUE_YT} />
          <SocialCard badge="Instagram" title="SHÉGUÉ" desc="Actus, stories & coulisses." href={SHEGUE_IG} />
          <SocialCard badge="TikTok" title="SHÉGUÉ" desc="Teasers & formats courts." href={SHEGUE_TT} />
        </div>

        {/* 3 photos clients + lien portfolio */}
        <div className="mt-10">
          <p className="text-white/80 font-extrabold tracking-wide">Clients</p>
          <p className="mt-2 text-white/65 text-sm">Aperçu. Le reste est dans le portfolio.</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {["/projects/04.jpg", "/projects/05.jpg", "/projects/06.jpg"].map((src, i) => (
              <div
                key={src}
                className="relative h-56 rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
              >
                <Image
                  src={src}
                  alt={`Client ${i + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/0" />
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/portfolio"
              className="px-7 py-3 rounded-xl border border-white/20 text-white hover:border-[#F5C542]/70 hover:text-[#F5C542] transition backdrop-blur-md"
            >
              Voir portfolio complet
            </Link>
          </div>
        </div>
      </Reveal>

      {/* CTA FINAL — main character uniquement ici */}
      <Reveal className="max-w-6xl mx-auto px-4 pb-24">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
        >
          <div>
            <p className="text-2xl md:text-3xl font-extrabold text-white">Prêt à tourner quelque chose de fort ?</p>
            <p className="mt-2 text-white/70 leading-relaxed">
              Dis-nous l’objectif. On te répond avec une direction claire et un plan simple.
            </p>
            <p className="mt-3 text-sm text-white/55">Réponse rapide · Plan clair · Livraison propre</p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <Link
              href={PROJECT_URL}
              className="group inline-flex items-center justify-center rounded-full
                         border border-[#F5C542]/50 bg-black/40 px-8 py-4
                         text-white font-extrabold tracking-wide
                         shadow-[0_0_0_1px_rgba(245,197,66,0.08),0_20px_60px_rgba(0,0,0,0.45)]
                         hover:-translate-y-[2px] hover:scale-[1.01]
                         hover:border-[#F5C542]/80 hover:shadow-[0_0_24px_rgba(245,197,66,0.22)]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/80
                         transition"
            >
              Débuter un projet →
            </Link>

            <a
              href={CALL_URL}
              className="inline-flex items-center justify-center rounded-full
                         border border-white/20 bg-black/25 px-8 py-4
                         text-white/90 font-semibold
                         hover:-translate-y-[2px] hover:scale-[1.01]
                         hover:border-[#F5C542]/50 hover:text-white
                         hover:shadow-[0_0_20px_rgba(245,197,66,0.16)]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black/80
                         transition"
            >
              Planifier un appel
            </a>
          </div>
        </motion.div>
      </Reveal>
    </main>
  );
}
