"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaLightbulb, FaVideo, FaCut, FaMagic } from "react-icons/fa";
import HeroCineSlider from "@/components/HeroCineSlider";
import ServiceCard from "@/components/ServiceCard";
import SectionTitle from "@/components/SectionTitle";

// Variantes d’animation
const fadeInContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeInItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Boutons
const btnPrimary =
  "px-8 py-4 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition";
const btnSecondary =
  "px-8 py-4 border border-white/30 text-white rounded-lg hover:border-primary hover:text-primary transition";

export default function ServicesPage() {
  return (
    <main className="min-h-[calc(100vh-var(--nav-h))] bg-black text-white">
      {/* HERO */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        <HeroCineSlider
          count={10}
          intervalMs={8500}
          darkness={0.6}
          vignette={0.45}
          glow={0.05}
          grain={0.03}
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Production. Image. Impact.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg md:text-2xl text-white/80 max-w-2xl"
          >
            Une équipe créative pour donner du poids à tes idées. Clips, marques, réseaux : on tourne net, on livre fort.
          </motion.p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Nos services"
            subtitle="Création, exécution, livraison. On prend tout en charge, tu restes focus sur l’essentiel."
          />
          <motion.div
            variants={fadeInContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div variants={fadeInItem}>
              <ServiceCard
                icon={<FaLightbulb />}
                title="Pré-prod & concept"
                description="On pose les bases : direction artistique, moodboard, repérage, script. Tout est calé avant tournage."
              />
            </motion.div>
            <motion.div variants={fadeInItem}>
              <ServiceCard
                icon={<FaVideo />}
                title="Tournage"
                description="Matériel pro, setup lumière, plans cinéma. On tourne propre et on gère la performance avec toi."
              />
            </motion.div>
            <motion.div variants={fadeInItem}>
              <ServiceCard
                icon={<FaCut />}
                title="Montage & étalonnage"
                description="Montage dynamique, color grading précis, cuts efficaces. Un rendu cohérent et impactant."
              />
            </motion.div>
            <motion.div variants={fadeInItem}>
              <ServiceCard
                icon={<FaMagic />}
                title="Livraison multi-format"
                description="Export pour YouTube, TikTok, Insta, reels. Qualité max, ratio adapté, prêt à publier."
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tu veux un rendu carré ?
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-8">
            Parle-nous de ton projet. On répond vite, on cadre clair, on t’envoie une démo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className={btnSecondary}>
              Discuter du projet
            </Link>
            <Link href="/booking" className={btnPrimary}>
              Réserver une date
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
