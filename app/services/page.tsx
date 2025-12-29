"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import HeroCineSlider from "@/components/HeroCineSlider";
import ServiceCard from "@/components/ServiceCard";
import SectionTitle from "@/components/SectionTitle";
import { services } from "@/lib/services";

/* =========================
   Animations (propres)
========================= */
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* =========================
   UI tokens alignés design system
========================= */
const UI = {
  pill:
    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full " +
    "bg-primary/10 border border-primary/25 shadow-glow",

  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",

  btnPrimary:
    "group relative px-8 py-4 bg-primary text-black font-semibold rounded-lg overflow-hidden " +
    "transition-transform hover:scale-[1.02] active:scale-95 shadow-glow",

  btnSecondary:
    "px-8 py-4 border border-white/20 text-white font-medium rounded-lg " +
    "hover:border-primary transition",
};

export default function ServicesPage() {
  return (
    <main className="min-h-[calc(100vh-var(--nav-h))]">
      {/* HERO */}
      <section className="relative min-h-[68vh] flex items-center overflow-hidden">
        <HeroCineSlider
          count={10}
          intervalMs={9000}
          darkness={0.6}
          vignette={0.5}
          glow={0.06}
          grain={0.05}
        />

        <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={item} className={UI.pill}>
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-primary">
                Services
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight"
            >
              Ce qu’on produit,{" "}
              <span className="text-primary">proprement</span>.
            </motion.h1>

            <motion.p
              variants={item}
              className="text-base md:text-lg text-grayText leading-relaxed max-w-3xl"
            >
              Vidéo, photo, post-production, contenu réseaux et web : un rendu
              premium, pensé pour publier vite et bien.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link href="/booking" className={UI.btnPrimary}>
                Réserver
              </Link>
              <Link href="/contact" className={UI.btnSecondary}>
                Demander un devis
              </Link>
            </motion.div>

            <motion.div variants={item} className={UI.sep} />
          </motion.div>
        </div>
      </section>

      {/* LIST */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle
          eyebrow="Offre"
          title="Une liste claire"
          subtitle="Tu choisis la direction. On gère la production, la post-prod, et la livraison."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.slug} variants={item}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
          <p className="text-2xl md:text-3xl font-bold text-white">
            Tu veux qu’on te cadre le scope ?
          </p>
          <p className="mt-2 text-grayText leading-relaxed">
            Envoie ton brief : on répond avec un plan clair (livrables, délais,
            budget).
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className={UI.btnSecondary}>
              Contact
            </Link>
            <Link href="/booking" className={UI.btnPrimary}>
              Réserver
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
