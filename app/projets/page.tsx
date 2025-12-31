"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ProjetsPage() {
  return (
    <main className="readable min-h-screen text-white">
      {/* INTRO */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <motion.h1
          variants={fade}
          initial="hidden"
          animate="show"
          className="text-3xl md:text-4xl font-semibold"
        >
          Projets
        </motion.h1>

        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-xl text-white/65 leading-relaxed"
        >
          Une sélection de projets réalisés pour des artistes,
          marques et structures indépendantes.
        </motion.p>
      </section>

      {/* GRID VISUEL */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.id}
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="group relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-[2200ms] ease-out group-hover:scale-[1.04]"
                />
              </div>

              {/* TEXTE MINIMAL */}
              <div className="mt-4">
                <h3 className="text-sm tracking-wide text-white/85">
                  {p.title}
                </h3>
                <p className="mt-1 text-xs text-white/55">
                  {p.type}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* SILENCE */}
      <section className="h-[20vh]" />
    </main>
  );
}

/* ================= DATA ================= */

const PROJECTS = [
  {
    id: "p1",
    title: "Clip musical",
    type: "Réalisation · Montage",
    cover: "/projects/01.jpg",
  },
  {
    id: "p2",
    title: "Contenu artiste",
    type: "Direction artistique",
    cover: "/projects/02.jpg",
  },
  {
    id: "p3",
    title: "Événement",
    type: "Captation · Post-production",
    cover: "/projects/03.jpg",
  },
  {
    id: "p4",
    title: "Brand content",
    type: "Image · Stratégie",
    cover: "/projects/04.jpg",
  },
  {
    id: "p5",
    title: "Portrait",
    type: "Photo",
    cover: "/projects/05.jpg",
  },
  {
    id: "p6",
    title: "Aftermovie",
    type: "Réalisation",
    cover: "/projects/06.jpg",
  },
];
