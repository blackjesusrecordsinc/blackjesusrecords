"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import Reveal from "@/components/Reveal";
import HeroBackground from "@/components/HeroBackground"; // ✅ ton background slider (déjà séparé)

const services = [
  "Clips rap / street / drill — esthétique cinéma, montage nerveux",
  "Direction artistique & mise en scène (image + performance)",
  "Événements — captation propre, montage émotionnel",
  "Photo pro — portraits, food, corporate",
  "Contenu & réseaux — formats courts, cohérence, cadence",
];

const proof = [
  { value: "20+", label: "Projets livrés" },
  { value: "72h", label: "Première preview" },
  { value: "4K", label: "Exports optimisés" },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// TODO: remplace par ton vrai base64 (généré via sharp)
const HERO_BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden">
        {/* ✅ Ton background slider séparé */}
        <div className="absolute inset-0 z-0">
          <HeroBackground />
        </div>

        {/* ✅ Overlay lisibilité (garde les photos visibles) */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/35 via-black/50 to-black/75" />

        {/* Texture ultra subtile */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] opacity-[0.012]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-[3] mx-auto flex min-h-[92vh] w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full py-16 lg:py-20"
          >
            <div className="grid items-center gap-12 lg:grid-cols-12">
              {/* Colonne texte */}
              <div className="lg:col-span-7">
                {/* Badge (signature légère, rotation propre) */}
                <motion.div variants={item} className="mb-7">
                  <span className="inline-flex -rotate-[2deg] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Studio créatif & label — Lévis, Québec
                  </span>
                </motion.div>

                {/* Titre (impact, pas de phrase inutile) */}
                <motion.h1
                  variants={item}
                  className="text-balance text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
                >
                  <span className="block text-white">Black Jesus</span>
                  <span className="block text-primary">Records</span>
                </motion.h1>

                {/* Pitch (humain, net, pro) */}
                <motion.p
                  variants={item}
                  className="mt-6 max-w-[42rem] text-pretty text-lg leading-relaxed text-white/80 sm:text-xl"
                >
                  On réalise des images qui portent : rythme, intention, et finition propre.
                  De la préparation au rendu final, tout est pensé pour être publié — sans compromis.
                </motion.p>

                {/* Liste services (respire + lisible sur fond animé) */}
                <motion.div variants={item} className="mt-10">
                  <ul className="max-w-[44rem] space-y-2.5 text-white/78">
                    {services.slice(0, 3).map((service, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span className="leading-relaxed">{service}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* CTA (pro, clean) */}
                <motion.div
                  variants={item}
                  className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center"
                >
                  <Link
                    href="/booking"
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-4 text-sm font-bold text-black transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Discuter d'un projet (réservation)"
                  >
                    Discuter d’un projet
                  </Link>

                  <Link
                    href="/portfolio"
                    className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/0 px-7 py-4 text-sm font-semibold text-white/90 transition hover:border-primary/50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Voir notre travail (portfolio)"
                  >
                    Voir le portfolio
                  </Link>

                  <span className="hidden text-sm text-white/55 sm:inline">
                    Réponse rapide • Devis clair
                  </span>
                </motion.div>
              </div>

              {/* Colonne preuve (cards) */}
              <div className="lg:col-span-5">
                <motion.div variants={item} className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  {proof.map((stat) => (
                    <div
                      key={stat.value}
                      className="rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-6 backdrop-blur"
                    >
                      <div className="text-3xl font-extrabold text-primary sm:text-4xl">
                        {stat.value}
                      </div>
                      <p className="mt-1 text-sm font-medium text-white/80">{stat.label}</p>
                      <p className="mt-3 text-sm text-white/55">
                        Cadence tenue, rendu propre, livraison prête à publier.
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fade bas pour transition premium vers la section suivante */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-24 bg-gradient-to-b from-transparent to-black" />
      </section>

      {/* SECTION PREUVE */}
      <section className="bg-black py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Une méthode <span className="text-primary">simple</span>, un rendu <span className="text-primary">fort</span>
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-white/75">
                Brief clair, plan solide, exécution propre. Vous voyez rapidement la direction, puis on finit au niveau.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Pré-production",
                text: "Objectif, direction, repérage, plan de tournage. On évite l’impro, on gagne en impact.",
              },
              {
                title: "Production",
                text: "Stabilisation, lumière, cadre, rythme. Une image propre, pensée pour votre public.",
              },
              {
                title: "Post-production",
                text: "Montage, étalonnage, exports multi-formats. Tout est prêt pour YouTube et les réseaux.",
              },
            ].map((card, index) => (
              <Reveal key={card.title} delay={index * 0.1}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur">
                  <h3 className="text-lg font-bold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{card.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE DE PRODUCTION */}
      <section className="bg-black py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
                >
                  <Image
                    src="/black-jesus-records-hero.jpg"
                    alt="Production Black Jesus Records"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 620px"
                    className="object-cover object-center"
                    quality={92}
                    placeholder="blur"
                    blurDataURL={HERO_BLUR_DATA_URL}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-xl font-bold text-white sm:text-2xl">
                      Direction artistique • Réalisation • Post-production
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      Une seule équipe. Une seule vision. Un résultat cohérent, du début à la livraison.
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-6">
                <Reveal>
                  <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                    Une image <span className="text-primary">qui reste</span> — pas un contenu jetable
                  </h2>
                  <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/75">
                    On ne cherche pas l’effet “vite fait”. On construit une esthétique, un rythme, une identité.
                    Et on livre des versions prêtes pour chaque plateforme.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/portfolio"
                      className="inline-flex items-center justify-center rounded-xl border border-white/15 px-7 py-4 text-sm font-semibold text-white/90 transition hover:border-primary/50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black"
                      aria-label="Voir le portfolio"
                    >
                      Voir le portfolio
                    </Link>
                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center rounded-xl bg-white/5 px-7 py-4 text-sm font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-black"
                      aria-label="Voir nos services"
                    >
                      Nos services
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-black pb-24 pt-6">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/15 via-white/[0.03] to-transparent p-10 sm:p-12">
              <div className="absolute inset-0 opacity-[0.12] [background:radial-gradient(650px_circle_at_20%_0%,rgba(255,255,255,0.22),transparent_60%)]" />

              <div className="relative text-center">
                <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Prêt à lancer un projet qui <span className="text-primary">fait parler</span> ?
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-white/75">
                  Dites-nous ce que vous visez, la date, et le format. On vous répond avec une direction claire et un devis net.
                </p>

                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-sm font-bold text-black transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Nous contacter"
                  >
                    Nous contacter
                  </Link>

                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 px-8 py-4 text-sm font-semibold text-white/90 transition hover:border-primary/50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Voir nos services"
                  >
                    Voir les services
                  </Link>
                </div>

                <div className="mt-6">
                  <Link
                    href="/services"
                    className="text-sm text-white/65 transition hover:text-primary"
                    aria-label="Voir tous nos services"
                  >
                    Voir tous les services →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
