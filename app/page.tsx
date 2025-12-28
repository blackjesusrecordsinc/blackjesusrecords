"use client";

// app/page.tsx
import Link from "next/link";
import Image from "next/image";

import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/services";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import HeroCineSlider from "@/components/HeroCineSlider";

const proof = [
  { value: "+20", label: "Projets livrés (clips, événements, contenus)" },
  { value: "48–72h", label: "Délai moyen pour un premier preview montage" },
  { value: "4K", label: "Exports optimisés YouTube, TikTok, Reels" },
];

const portfolioPreview = [
  { title: "Clip rap / street", tag: "Réalisation · Montage", href: "/portfolio" },
  { title: "Aftermovie événement", tag: "Captation · Étalonnage", href: "/portfolio" },
  { title: "Contenu réseaux", tag: "Reels · TikTok · Shorts", href: "/portfolio" },
  { title: "Séance photo pro", tag: "Portrait · Food · Corporate", href: "/portfolio#photo" },
];

const photoQuickLinks = [
  { title: "Portrait", desc: "Studio & lifestyle, branding visuel.", href: "/portfolio#portrait" },
  { title: "Food", desc: "Photos culinaires pour restaurants & menus.", href: "/portfolio#food" },
  { title: "Couple", desc: "Séances naturelles, complicité & émotion.", href: "/portfolio#couple" },
  { title: "Corporate", desc: "Commerces, équipe, locaux, image de marque.", href: "/portfolio#corporate" },
  { title: "Editorial", desc: "Direction artistique, style, contenu signature.", href: "/portfolio#editorial" },
  { title: "Family", desc: "Moments sincères, famille & enfants.", href: "/portfolio#family" },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
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

const glowPulse: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -28]);
  const heroImgY = useTransform(scrollYProgress, [0, 0.25], [0, 18]);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section id="top" className="relative min-h-[92vh] flex items-center overflow-hidden scroll-mt-28">
        {/* background slideshow premium (10 photos) */}
        <HeroCineSlider count={10} ext=".jpg" intervalMs={8000} />

        {/* floating “ciné dust” */}
        <motion.div
          aria-hidden
          variants={glowPulse}
          initial="hidden"
          animate="show"
          className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-yellow-400/10 blur-3xl"
        />
        <motion.div
          aria-hidden
          variants={glowPulse}
          initial="hidden"
          animate="show"
          className="pointer-events-none absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"
        />

        <motion.div style={{ y: heroY }} className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* TEXTE */}
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
              <motion.div
                variants={item}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20"
              >
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-yellow-400">
                  Studio créatif & label — Lévis
                </span>
              </motion.div>

              <motion.div variants={item} className="space-y-3">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
                  <span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent">Image, son</span>
                  <br />
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                      & stratégie
                    </span>
                    <span className="pointer-events-none absolute -inset-x-2 -inset-y-1 bg-yellow-400/10 blur-xl opacity-70" />
                  </span>
                </h1>

                {/* typewriter */}
                <p className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
                  <Typewriter
                    phrases={[
                      "Clips rap / street / drill — rendu ciné, énergie brute.",
                      "Brand content & pubs — direction artistique + performance.",
                      "Événements — captation clean, montage émotion.",
                      "Photo pro — portrait, food, corporate.",
                    ]}
                    typingMs={20}
                    holdMs={1100}
                    className="text-white/70"
                    accentClassName="text-yellow-400 font-medium"
                    accentWords={["rap", "street", "drill", "ciné", "performance", "Photo"]}
                  />
                </p>
              </motion.div>

              <motion.p variants={item} className="text-sm md:text-base text-white/55 max-w-2xl">
                Direction artistique, tournage stabilisé, drone, montage, étalonnage et exports optimisés — une seule
                équipe, un rendu ciné.
                <span className="text-white/70"> Séances photo pro disponibles.</span>
              </motion.p>

              {/* CTA */}
              <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/booking"
                  className="group relative px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                >
                  <span className="relative z-10">Réserver une date</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <Link
                  href="#portfolio"
                  className="px-8 py-4 border border-white/20 text-white font-medium rounded-lg hover:border-yellow-400 hover:text-yellow-400 transition-all"
                >
                  Voir un aperçu
                </Link>

                <Link
                  href="/portfolio"
                  className="px-8 py-4 border border-white/10 text-white/80 font-medium rounded-lg hover:border-white/25 transition-all"
                >
                  Tout le portfolio
                </Link>
              </motion.div>

              {/* QUICK NAV */}
              <motion.div variants={item} className="flex flex-wrap gap-2 pt-2">
                {[
                  { href: "#services", label: "Services ↓" },
                  { href: "#portfolio", label: "Portfolio ↓" },
                  { href: "#photo", label: "Photo ↓" },
                  { href: "#label", label: "Label ↓" },
                ].map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    className="px-3 py-1.5 rounded-full border border-white/15 text-xs text-white/70 hover:border-yellow-400/40 hover:text-yellow-300 transition"
                  >
                    {x.label}
                  </Link>
                ))}
              </motion.div>

              {/* trust */}
              <motion.div variants={item} className="flex flex-wrap gap-6 pt-8 text-sm text-white/60">
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

            {/* VISUEL */}
            <motion.div style={{ y: heroImgY }} className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-yellow-400/16 via-purple-500/10 to-pink-500/10 blur-2xl opacity-70" />

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

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.07),_rgba(0,0,0,0.65))]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.20)_1px,transparent_1px)] [background-size:100%_6px]" />

                <div className="absolute inset-x-0 bottom-8 text-center px-8">
                  <p className="text-white/95 text-[15px] italic tracking-wide drop-shadow">
                    “De l’idée à la réalisation.”
                  </p>
                  <p className="mt-2 text-white/70 text-sm tracking-wide">— Black Jesus Records</p>
                </div>
              </motion.div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/50">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-400/70" />
                Direction artistique · Réalisation · Post-production
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* PREUVE */}
      <Reveal id="preuve" className="max-w-6xl mx-auto px-4 py-14 scroll-mt-28">
        <div className="grid gap-6 md:grid-cols-3">
          {proof.map((p) => (
            <motion.div
              key={p.value}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-yellow-400/35 transition shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
            >
              <p className="text-3xl font-bold text-white">{p.value}</p>
              <p className="mt-2 text-white/70 text-sm leading-relaxed">{p.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="mt-8 rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-6 md:p-8"
        >
          <p className="text-white/90 italic text-base md:text-lg leading-relaxed">
            “Qualité cinéma, communication simple, et livraison dans les délais. On a enfin un rendu qui fait pro.”
          </p>
          <p className="mt-3 text-sm text-white/60">— Client / artiste</p>
        </motion.div>
      </Reveal>

      {/* SERVICES */}
      <Reveal id="services" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-28">
        <SectionTitle
          eyebrow="Services"
          title="Ce que nous faisons"
          subtitle="Audiovisuel, label, post-production : une seule équipe pour gérer votre image du début à la fin."
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
      </Reveal>

      {/* APERÇU PORTFOLIO */}
      <Reveal id="portfolio" className="max-w-6xl mx-auto px-4 pb-16 scroll-mt-28">
        <SectionTitle
          eyebrow="Portfolio"
          title="Aperçu de nos réalisations"
          subtitle="Un style ciné, une énergie street, et des formats pensés pour performer sur les plateformes."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {portfolioPreview.map((itemCard, idx) => (
            <motion.div key={itemCard.title} variants={item}>
              <Link
                href={itemCard.href}
                className="group block rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-yellow-400/40 transition shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-white font-semibold">{itemCard.title}</p>
                  <span className="text-white/50 group-hover:text-yellow-400 transition">→</span>
                </div>
                <p className="mt-2 text-sm text-white/60">{itemCard.tag}</p>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="mt-4 h-28 rounded-xl border border-white/10 overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/18 via-purple-500/10 to-pink-500/10" />
                  <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:22px_22px]" />
                  <div
                    className={`absolute inset-0 ${
                      idx === 0
                        ? "bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.10),transparent_55%)]"
                        : idx === 1
                        ? "bg-[radial-gradient(circle_at_70%_35%,rgba(255,255,255,0.10),transparent_55%)]"
                        : "bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.10),transparent_55%)]"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/portfolio"
            className="px-6 py-3 rounded-full border border-white/20 text-white hover:border-yellow-400 hover:text-yellow-400 transition"
          >
            Voir tout le portfolio
          </Link>
        </div>
      </Reveal>

      {/* QUICK ACCESS PHOTO */}
      <Reveal id="photo" className="max-w-6xl mx-auto px-4 pb-16 scroll-mt-28">
        <SectionTitle eyebrow="Photo" title="Séance photo professionnelle" subtitle="Sous-catégories claires, accès rapide aux galeries." />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {photoQuickLinks.map((c) => (
            <motion.div key={c.title} variants={item}>
              <Link
                href={c.href}
                className="group block rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-yellow-400/40 transition shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-white font-semibold">{c.title}</p>
                  <span className="text-white/50 group-hover:text-yellow-400 transition">→</span>
                </div>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{c.desc}</p>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="mt-4 h-24 rounded-xl border border-white/10 overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/14 via-purple-500/10 to-pink-500/10" />
                  <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:22px_22px]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-sm text-white/55 text-center mt-8">
          <strong>Galeries en cours d’enrichissement.</strong>
          <br />
          De nouvelles photos et projets seront ajoutés progressivement.
        </p>
      </Reveal>

      {/* LABEL */}
      <Reveal id="label" className="max-w-6xl mx-auto px-4 pb-16 scroll-mt-28">
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="border border-yellow-400/40 rounded-2xl p-6 md:p-8 bg-yellow-400/5"
        >
          <SectionTitle
            eyebrow="Label"
            title="Black Jesus Records"
            subtitle="Plus qu’un prestataire : un label qui comprend les réalités des artistes, des indépendants aux professionnels."
          />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-sm text-white/75 max-w-xl leading-relaxed">
              Direction artistique, production musicale, accompagnement d’image, coaching carrière : nous travaillons
              avec des artistes qui veulent structurer leur projet, construire un univers fort et préparer le long terme.
            </p>
            <Link
              href="/label"
              className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-yellow-400 transition-colors"
            >
              Découvrir le label
            </Link>
          </div>
        </motion.div>
      </Reveal>

      {/* CTA FINAL */}
      <Reveal id="cta" className="max-w-6xl mx-auto px-4 pb-24 scroll-mt-28">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
        >
          <div>
            <p className="text-2xl md:text-3xl font-bold text-white">Prêt à tourner quelque chose de fort ?</p>
            <p className="mt-2 text-white/70 leading-relaxed">
              Dis-nous ton idée. On te répond avec une approche claire, un plan, et un rendu ciné.
            </p>
            <p className="mt-3 text-sm text-white/55">Réponse rapide · Plan clair · Livraison propre</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/booking"
              className="px-7 py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:scale-[1.02] transition"
            >
              Réserver
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3 rounded-lg border border-white/20 text-white hover:border-yellow-400 hover:text-yellow-400 transition"
            >
              Contact
            </Link>
          </div>
        </motion.div>
      </Reveal>
    </div>
  );
}
