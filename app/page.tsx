"use client";

<<<<<<< HEAD
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroCineSlider from "@/components/HeroCineSlider";

/* ================= ANIMATION ================= */
const fade = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};
=======
import Link from "next/link";
import { motion } from "framer-motion";

import HeroBackground from "@/components/HeroBackground";
import { fadeContainer, fadeUpItem } from "@/lib/motion";

/* ================= CONST ================= */
const GRAIN_BG =
  "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22 viewBox=%220 0 100 100%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.18%22/%3E%3C/svg%3E";

/* ================= DATA ================= */
const services = [
  {
    text: "Clips rap / street / drill — esthétique cinéma, montage nerveux",
    featured: true,
  },
  {
    text: "Direction artistique & mise en scène (image + performance)",
    featured: true,
  },
  {
    text: "Événements — captation propre, montage émotionnel",
    featured: true,
  },
  { text: "Photo pro — portraits, food, corporate", featured: true },
  {
    text: "Contenu & réseaux — formats courts, cohérence, cadence",
    featured: false,
  },
];

const proof = [
  { value: "20+", label: "Projets livrés", hint: "Rendu premium, livraisons propres." },
  { value: "72h", label: "Première preview", hint: "Tu vois vite la direction." },
  { value: "4K", label: "Exports optimisés", hint: "YouTube + Reels + TikTok." },
];

const featuredServices = services.filter((s) => s.featured);

const container = fadeContainer(0.07);
const item = fadeUpItem;
>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013

/* ================= PAGE ================= */
export default function HomePage() {
  return (
<<<<<<< HEAD
    <main className="readable relative min-h-screen text-white overflow-hidden">
      {/* ================= BACKGROUND GLOBAL =================
          Vivant, lent, imperceptible
      */}
      <div className="fixed inset-0 -z-10">
        <HeroCineSlider count={14} intervalMs={9000} />
      </div>

      {/* ================= HERO ================= */}
      <section
        id="top"
        className="relative min-h-[95vh] flex items-center"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* ===== TEXTE ===== */}
          <div className="space-y-8">
            {/* SLOGAN — début seulement */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 6, times: [0, 0.2, 0.7, 1] }}
              className="text-sm uppercase tracking-[0.35em] text-white/70"
            >
              On élève ce qui vient d’ici.
            </motion.p>

            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
            >
              <h1 className="text-4xl md:text-6xl font-semibold">
                Black Jesus Records
              </h1>

              <p className="mt-3 text-white/80">
                Studio créatif & label indépendant
              </p>

              <p className="mt-2 text-white/60">
                Image · Son · Stratégie
              </p>
            </motion.div>

            <motion.p
              variants={fade}
              initial="hidden"
              animate="show"
              className="max-w-xl text-white/75 leading-relaxed"
            >
              Pour les artistes, marques et entreprises qui veulent une présence numérique forte.
            </motion.p>
          </div>

          {/* ===== PHOTO DROITE (VISIBLE, NON VOILÉE) ===== */}
          <div className="relative h-[520px] rounded-xl overflow-hidden">
            <Image
              src="/black-jesus-records-hero.jpg"
              alt="Black Jesus Records"
              fill
              priority
              className="object-cover object-center"
            />

            <div className="absolute bottom-6 left-6 right-6 text-sm text-white/80 italic">
              “De l’idée à la réalisation.”
            </div>
          </div>
        </div>
      </section>

      {/* ================= RESPIRATION ================= */}
      <section className="h-[18vh]" />

      {/* ================= CTA CENTRAL UNIQUE ================= */}
      <section className="flex justify-center py-24">
        <Link
          href="/planifier-un-appel"
          className="relative px-10 py-5 rounded-full border border-white/40 text-white text-lg"
        >
          <motion.span
            animate={{ opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-white/10"
          />
          <span className="relative z-10">
            Planifier un appel
          </span>
        </Link>
      </section>

      {/* ================= PROJETS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-2xl mb-12">Projets</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-white/10 rounded-lg"
            />
          ))}
        </div>
      </section>

      {/* ================= SAVOIR-FAIRE ================= */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-2xl mb-16">Savoir-faire</h2>

        <div className="space-y-10">
          <Card title="Réalisation & production vidéo" />
          <Card title="Audio & son" />
          <Card title="Web & stratégie digitale" />
        </div>
      </section>

      {/* ================= TEXTE ÉDITORIAL ================= */}
      <section className="max-w-3xl mx-auto px-6 py-32 text-white/75 leading-relaxed">
        Black Jesus Records conçoit des images et des sons avec exigence,
        intention et cohérence. Pas de bruit inutile. Pas de promesse vide.
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="flex justify-center py-32">
        <Link
          href="/debuter-un-projet"
          className="underline underline-offset-8 text-white/80 hover:text-white"
        >
          Débuter un projet
        </Link>
=======
    <main className="min-h-screen bg-black text-white">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[92vh] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <HeroBackground />
        </div>

        {/* Overlay PRO (lisibilité stable sur toutes les photos) */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-black/65 to-black/95" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(900px_circle_at_20%_25%,rgba(245,197,66,0.10),transparent_60%)]" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(900px_circle_at_70%_20%,rgba(255,255,255,0.06),transparent_55%)]" />

        {/* Grain / texture (via constante) */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] opacity-[0.10] mix-blend-overlay"
          style={{ backgroundImage: `url('${GRAIN_BG}')` }}
        />

        <div className="relative z-[3] mx-auto flex min-h-[92vh] w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full py-14 lg:py-20"
          >
            <div className="grid items-center gap-10 lg:grid-cols-12">
              {/* ================= TEXTE ================= */}
              <div className="lg:col-span-7">
                {/* Spotlight panel (lisibilité + premium, sans cacher le background) */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-xl sm:p-8 lg:bg-black/25">
                  {/* glow interne */}
                  <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(520px_circle_at_18%_18%,rgba(245,197,66,0.12),transparent_55%)]" />
                  <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(520px_circle_at_80%_10%,rgba(255,255,255,0.08),transparent_60%)]" />

                  {/* Badge */}
                  <motion.div variants={item} className="relative mb-7">
                    <span className="inline-flex -rotate-[1.5deg] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[rgba(255,255,255,0.92)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Studio créatif & label — Lévis, Québec
                    </span>
                  </motion.div>

                  {/* Titre (logo vibe) */}
                  <motion.h1
                    variants={item}
                    className="relative text-balance text-5xl font-extrabold leading-[0.92] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
                    style={{ textShadow: "0 18px 45px rgba(0,0,0,0.70)" }}
                  >
                    <span className="block text-white">Black Jesus</span>
                    <span className="block text-primary">Records</span>
                  </motion.h1>

                  {/* Sous-titre (plus “impact label”) */}
                  <motion.p
                    variants={item}
                    className="relative mt-6 max-w-xl text-pretty text-lg leading-relaxed text-[rgba(255,255,255,0.78)] sm:text-xl"
                    style={{ textShadow: "0 10px 28px rgba(0,0,0,0.55)" }}
                  >
                    Image, rythme, finition.
                    <br />
                    On transforme ta vision en contenu qui marque — prêt à publier partout.
                  </motion.p>

                  {/* Services (featured) */}
                  <motion.div variants={item} className="relative mt-10">
                    <ul className="space-y-3 text-[rgba(255,255,255,0.78)]">
                      {featuredServices.map((s) => (
                        <li key={s.text} className="flex items-start gap-3">
                          <span className="mt-[0.55rem] h-2.5 w-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_18px_rgba(245,197,66,0.35)]" />
                          <span className="leading-relaxed text-pretty">{s.text}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* CTA (glow sweep) */}
                  <motion.div
                    variants={item}
                    className="relative mt-12 flex flex-col gap-3 sm:flex-row sm:items-center"
                  >
                    <Link
                      href="/booking"
                      className="relative overflow-hidden group inline-flex items-center justify-center rounded-xl bg-primary px-7 py-4 text-sm font-extrabold text-black shadow-glow transition hover:scale-[1.02] hover:bg-primarySoft focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-black"
                      aria-label="Discuter d'un projet (réservation)"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
                      />
                      <span className="relative">
                        Discuter d’un projet
                        <span className="ml-2 transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </span>
                    </Link>

                    <Link
                      href="/portfolio"
                      className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white/90 transition hover:border-primary/60 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black"
                      aria-label="Voir notre travail (portfolio)"
                    >
                      Voir le portfolio
                    </Link>

                    <span className="hidden text-sm text-[rgba(255,255,255,0.55)] sm:inline">
                      Réponse rapide • Devis clair
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* ================= PREUVES ================= */}
              <div className="lg:col-span-5">
                {/* Mobile: carousel | sm+: grid | lg: 1 colonne */}
                <motion.div variants={item} className="sm:grid sm:grid-cols-3 lg:grid-cols-1 sm:gap-4">
                  <div className="flex gap-4 overflow-x-auto pb-4 sm:contents">
                    {proof.map((p) => (
                      <motion.div
                        key={p.value}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className="relative h-full min-w-[280px] sm:min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-6 backdrop-blur-xl transition-colors hover:border-primary/40"
                      >
                        <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(520px_circle_at_20%_10%,rgba(245,197,66,0.10),transparent_55%)]" />
                        <div className="relative h-full flex flex-col">
                          <div className="text-4xl font-extrabold text-primary">{p.value}</div>
                          <p className="mt-1 text-sm font-semibold text-[rgba(255,255,255,0.90)]">
                            {p.label}
                          </p>
                          <p className="mt-auto pt-3 text-sm leading-relaxed text-[rgba(255,255,255,0.55)]">
                            {p.hint}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fade bas */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-28 bg-gradient-to-b from-transparent to-black" />
>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013
      </section>
    </main>
  );
}

/* ================= CARD ================= */
function Card({ title }: { title: string }) {
  return (
    <div className="border-b border-white/20 pb-6">
      <h3 className="text-lg">{title}</h3>
    </div>
  );
}
