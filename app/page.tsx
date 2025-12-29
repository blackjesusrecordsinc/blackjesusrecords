"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import Reveal from "@/components/Reveal";

const services = [
  "Clips rap / street / drill — rendu ciné",
  "Direction artistique & performance",
  "Captation d'événements & montage émotion",
  "Photo professionnelle — portrait, food, corporate",
  "Stratégie de contenu & réseaux sociaux",
];

const proof = [
  { value: "20+", label: "Projets livrés" },
  { value: "72h", label: "Délai moyen preview" },
  { value: "4K", label: "Exports optimisés" },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// TODO: remplace par ton vrai base64 (généré via sharp)
const HERO_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* HERO SIMPLIFIÉ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Fond statique */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0" />

        {/* Overlay lisibilité unique */}
        <div className="absolute inset-0 z-0 bg-black/35" />

        {/* Texture subtile */}
        <div
          className="absolute inset-0 z-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 3 1.343 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-left">
            {/* Badge */}
            <motion.div variants={item} className="mb-8">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Studio créatif & label — Lévis, Québec
              </span>
            </motion.div>

            {/* Titre */}
            <motion.h1 variants={item} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="block text-white">Black Jesus</span>
              <span className="block text-primary">Records</span>
            </motion.h1>

            {/* ✅ Contraste texte */}
            <motion.p
              variants={item}
              className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Studio spécialisé dans la production audiovisuelle à haute énergie. De l'idée à la réalisation, nous créons des
              contenus qui marquent.
            </motion.p>

            {/* Services */}
            <motion.div variants={item} className="mb-12">
              <ul className="space-y-2 text-white/75">
                {services.slice(0, 3).map((service, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA */}
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/booking"
                className="px-10 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-colors"
                aria-label="Discuter d'un projet (réservation)"
              >
                Discuter d'un projet
              </Link>
              <Link
                href="/portfolio"
                className="px-10 py-4 border-2 border-white/20 text-white rounded-lg hover:border-primary hover:text-primary transition-colors"
                aria-label="Voir notre travail (portfolio)"
              >
                Voir notre travail
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION PREUVE */}
      <section className="py-20 bg-gradient-to-b from-transparent to-black/30">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
              Une approche <span className="text-primary">résultats</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {proof.map((stat, index) => (
              <Reveal key={stat.value} delay={index * 0.1}>
                <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-4">{stat.value}</div>
                  <p className="text-white/80">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE DE PRODUCTION */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
            <motion.div
              // ✅ hover subtil (optionnel, très léger)
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/black-jesus-records-hero.jpg"
                alt="Production Black Jesus Records"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover object-center"
                quality={90}
                placeholder="blur"
                blurDataURL={HERO_BLUR_DATA_URL}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-2xl font-bold mb-2 text-white">
                  Direction artistique, réalisation, post-production
                </p>
                <p className="text-white/80">Une seule équipe pour un résultat cohérent et professionnel</p>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal>
            <div className="text-center p-12 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 to-primary/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Prêt à donner vie à votre projet ?</h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Contactez-nous pour une consultation gratuite et un devis sur mesure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-10 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-colors"
                  aria-label="Nous contacter"
                >
                  Nous contacter
                </Link>
                <Link
                  href="/services"
                  className="px-10 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors"
                  aria-label="Voir nos services"
                >
                  Nos services
                </Link>
              </div>

              {/* ✅ Accessibilité exemple lien secondaire */}
              <div className="mt-6">
                <Link
                  href="/services"
                  className="text-sm text-white/75 hover:text-primary transition"
                  aria-label="Voir tous nos services"
                >
                  Voir tous les services →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
