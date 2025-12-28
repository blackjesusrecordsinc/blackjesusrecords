"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import HeroCineSlider from "@/components/HeroCineSlider";

const proof = [
  { value: "+20", label: "Projets livrés (clips, événements, contenus)" },
  { value: "48–72h", label: "Délai moyen pour un premier preview montage" },
  { value: "4K", label: "Exports optimisés YouTube, TikTok, Reels" },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
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

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -28]);
  const heroImgY = useTransform(scrollYProgress, [0, 0.25], [0, 18]);

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section id="top" className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* background slideshow */}
        <HeroCineSlider count={10} ext=".jpg" intervalMs={8000} />

        {/* overlay premium lisibilité */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/65 backdrop-blur-[2px]" />

        {/* light blooms */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-yellow-400/12 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-purple-500/12 blur-3xl"
        />

        <motion.div style={{ y: heroY }} className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* TEXTE */}
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
              <motion.div
                variants={item}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/25"
              >
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-yellow-300">
                  Studio créatif & label — Lévis
                </span>
              </motion.div>

              <motion.div variants={item} className="space-y-3">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-white">
                  Image, son <br />
                  <span className="text-yellow-300"> & stratégie</span>
                </h1>

                <p className="text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">
                  <Typewriter
                    phrases={[
                      "Clips rap / street / drill — rendu ciné, énergie brute.",
                      "Brand content & pubs — direction artistique + performance.",
                      "Événements — captation clean, montage émotion.",
                      "Photo pro — portrait, food, corporate.",
                    ]}
                    typingMs={20}
                    holdMs={1100}
                    className="text-white/85"
                    accentClassName="text-yellow-300 font-semibold"
                    accentWords={["rap", "street", "drill", "ciné", "performance", "Photo"]}
                  />
                </p>
              </motion.div>

              <motion.p variants={item} className="text-sm md:text-base text-white/75 max-w-2xl">
                Direction artistique, tournage stabilisé, drone, montage, étalonnage et exports optimisés — une seule équipe,
                un rendu ciné.
              </motion.p>

              {/* CTA */}
              <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/booking"
                  className="group relative px-8 py-4 bg-yellow-400 text-black font-semibold rounded-xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                >
                  <span className="relative z-10">Réserver une date</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <Link
                  href="/services"
                  className="px-8 py-4 rounded-xl border border-white/25 bg-black/25 text-white font-medium hover:border-yellow-400 hover:text-yellow-300 transition backdrop-blur-md"
                >
                  Services
                </Link>

                <Link
                  href="/portfolio"
                  className="px-8 py-4 rounded-xl border border-white/15 bg-black/20 text-white/90 font-medium hover:border-white/25 transition backdrop-blur-md"
                >
                  Portfolio
                </Link>
              </motion.div>

              {/* quick routes */}
              <motion.div variants={item} className="flex flex-wrap gap-2 pt-2">
                {[
                  { href: "/services", label: "Services" },
                  { href: "/portfolio", label: "Portfolio" },
                  { href: "/portfolio#photo", label: "Photo" },
                  { href: "/label", label: "Label" },
                ].map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    className="px-3 py-1.5 rounded-full border border-white/20 bg-black/25 text-xs text-white/85 hover:border-yellow-400/40 hover:text-yellow-300 transition backdrop-blur-md"
                  >
                    {x.label}
                  </Link>
                ))}
              </motion.div>

              {/* trust */}
              <motion.div variants={item} className="flex flex-wrap gap-6 pt-8 text-sm text-white/80">
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full" />Disponibilités limitées</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-400 rounded-full" />Québec & International</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-purple-400 rounded-full" />Livraison garantie</div>
              </motion.div>
            </motion.div>

            {/* VISUEL */}
            <motion.div style={{ y: heroImgY }} className="relative z-10">
              <div className="absolute -inset-6 bg-gradient-to-br from-yellow-400/18 via-purple-500/12 to-pink-500/12 blur-2xl opacity-70" />

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
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                Direction artistique · Réalisation · Post-production
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* PREUVE */}
      <Reveal className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {proof.map((p) => (
            <motion.div
              key={p.value}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-yellow-400/35 transition shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
            >
              <p className="text-3xl font-extrabold text-white">{p.value}</p>
              <p className="mt-2 text-white/70 text-sm leading-relaxed">{p.label}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* CTA FINAL */}
      <Reveal className="max-w-6xl mx-auto px-4 pb-24">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
        >
          <div>
            <p className="text-2xl md:text-3xl font-extrabold text-white">Prêt à tourner quelque chose de fort ?</p>
            <p className="mt-2 text-white/70 leading-relaxed">
              Dis-nous ton idée. On te répond avec une approche claire, un plan, et un rendu ciné.
            </p>
            <p className="mt-3 text-sm text-white/55">Réponse rapide · Plan clair · Livraison propre</p>
          </div>
          <div className="flex gap-3">
            <Link href="/booking" className="px-7 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:scale-[1.02] transition">
              Réserver
            </Link>
            <Link href="/contact" className="px-7 py-3 rounded-xl border border-white/20 text-white hover:border-yellow-400 hover:text-yellow-300 transition">
              Contact
            </Link>
          </div>
        </motion.div>
      </Reveal>
    </main>
  );
}
