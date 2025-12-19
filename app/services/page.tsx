"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    id: "video",
    title: "Production vidéo",
    tag: "Video",
    desc: "Clips musicaux, publicités, vidéos corporatives et événements. Image stable, lumière maîtrisée, rendu ciné.",
  },
  {
    id: "photo",
    title: "Shooting photo",
    tag: "Photo",
    desc: "Portrait, corporate, food et éditorial. Direction claire, retouches propres, livraison web & print.",
  },
  {
    id: "social",
    title: "Réseaux sociaux",
    tag: "Social",
    desc: "Formats courts performants, cohérence visuelle et stratégie pour une présence régulière.",
  },
  {
    id: "web",
    title: "Création de site web",
    tag: "Web",
    desc: "Sites rapides, mobile-first, pensés pour convertir. Design cohérent + SEO de base.",
  },
  {
    id: "strategy",
    title: "Croissance & stratégie",
    tag: "Strategy",
    desc: "Positionnement, offres, image et contenu alignés pour des résultats concrets.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white relative overflow-hidden">
      {/* BACKGROUND */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-[#F5C518]/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
      </div>

      <div className="relative">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-24 pb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.35em] uppercase text-white/50"
          >
            Services
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-[-0.02em]"
          >
            Image, son{" "}
            <span className="text-[#F5C518] drop-shadow-[0_0_22px_rgba(245,197,24,0.25)]">
              & stratégie
            </span>
            <br />
            pour les marques exigeantes.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-6 max-w-3xl text-base md:text-lg text-white/70"
          >
            Black Jesus Records accompagne artistes, créateurs et entreprises qui veulent une image
            professionnelle, cohérente et orientée résultats. Un seul studio. Une vision claire.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/booking"
              className="rounded-full bg-[#F5C518] px-8 py-4 text-sm font-semibold text-black hover:opacity-95 transition"
            >
              Réserver une date
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Parler de votre projet
            </Link>
          </motion.div>
        </section>

        {/* SERVICES GRID */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-28">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur hover:border-white/20 transition"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                  {s.tag}
                </p>

                <h2 className="mt-4 text-2xl font-semibold">
                  {s.title}
                </h2>

                <p className="mt-3 text-sm text-white/70 leading-relaxed">
                  {s.desc}
                </p>

                <div className="mt-6">
                  <Link
                    href={`/services/${s.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5C518] hover:underline"
                  >
                    Voir le service
                    <span>→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="border-t border-white/10 bg-[#0D0D10]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
                Prêt à faire passer votre image au{" "}
                <span className="text-[#F5C518]">niveau supérieur</span> ?
              </h2>
              <p className="mt-4 text-white/70">
                Parle-nous de ton projet. On te répond avec un cadre clair : scope,
                délais et livrables.
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href="/booking"
                className="rounded-full bg-[#F5C518] px-8 py-4 text-sm font-semibold text-black hover:opacity-95 transition"
              >
                Réserver
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-[#F5C518] px-8 py-4 text-sm font-semibold text-[#F5C518] hover:bg-[#F5C518] hover:text-black transition"
              >
                Contact
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
