"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import HeroCineSlider from "@/components/HeroCineSlider";
import ServiceCard from "@/components/ServiceCard";
import SectionTitle from "@/components/SectionTitle";
import { services } from "@/lib/services";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const UI = {
  pill:
    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full " +
    "bg-cyan-300/10 border border-cyan-300/25 shadow-[0_0_40px_rgba(0,180,255,0.12)]",
  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",
  btnPrimary:
    "group relative px-8 py-4 bg-cyan-300 text-[#001019] font-semibold rounded-lg overflow-hidden transition-all " +
    "hover:scale-[1.02] active:scale-95 shadow-[0_14px_52px_rgba(0,8,22,0.45)]",
  btnPrimaryGlow:
    "absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity",
  btnSecondary:
    "px-8 py-4 border border-white/20 text-white font-medium rounded-lg " +
    "hover:border-cyan-300 hover:text-cyan-100 transition-all",
};

export default function ServicesPage() {
  return (
    <main className="min-h-[calc(100vh-var(--nav-h))]">
      {/* HERO */}
      <section className="relative min-h-[68vh] flex items-center overflow-hidden">
        <HeroCineSlider count={10} ext=".jpg" intervalMs={8000} darkness={0.58} vignette={0.52} glow={0.10} grain={0.10} />

        <div className="relative max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={item} className={UI.pill}>
              <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-cyan-100">Services</span>
            </motion.div>

            <motion.h1 variants={item} className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              Ce qu’on produit,{" "}
              <span className="bg-gradient-to-r from-cyan-200 via-cyan-300 to-blue-200 bg-clip-text text-transparent">
                proprement
              </span>
              .
            </motion.h1>

            <motion.p variants={item} className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
              Vidéo, photo, post-production, contenu réseaux et web : un rendu premium, pensé pour publier vite et bien.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/booking" className={UI.btnPrimary}>
                <span className={UI.btnPrimaryGlow} />
                <span className="relative z-10">Réserver</span>
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

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/6 p-8 md:p-10 shadow-[0_18px_60px_rgba(0,8,22,0.35)] backdrop-blur-xl">
          <p className="text-2xl md:text-3xl font-bold text-white">Tu veux qu’on te cadre le scope ?</p>
          <p className="mt-2 text-white/80 leading-relaxed">
            Envoie ton brief : on répond avec un plan clair (livrables, délais, budget).
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className={UI.btnSecondary}>Contact</Link>
            <Link href="/booking" className={UI.btnPrimary}>
              <span className={UI.btnPrimaryGlow} />
              <span className="relative z-10">Réserver</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
