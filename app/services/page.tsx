"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import HeroCineSlider from "@/components/HeroCineSlider";
import Reveal from "@/components/Reveal";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/contact-blackjesusrecords/30min";

/* ✅ Preuves externes (directes) */
const SHEGUE_YOUTUBE_URL = "https://www.youtube.com/@shegue242";
const SHEGUE_SPOTIFY_URL = "https://open.spotify.com/intl-fr/artist/2uxnQEzqw94AWew2E7nEHc";
const SHEGUE_LINKTREE_URL = "https://linktr.ee/shegue";

/* ================= MOTION (ciné, sobre) ================= */
const easeCine: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: easeCine },
  },
};

function OutlineFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* cadre “artistique” : double ligne + léger glow */}
      <div className="pointer-events-none absolute -inset-0.5 rounded-[28px] opacity-70 [background:radial-gradient(120%_100%_at_12%_8%,rgba(245,197,66,0.20)_0%,rgba(245,197,66,0.00)_42%),linear-gradient(to_bottom,rgba(255,255,255,0.10),rgba(255,255,255,0.02))]" />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/12" />
      <div className="pointer-events-none absolute inset-[10px] rounded-[20px] border border-white/8" />
      <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-[2px]">{children}</div>
    </div>
  );
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
      <p className="text-xs tracking-[0.22em] uppercase text-white/55">{label}</p>
      <p className="mt-2 text-base font-semibold text-white/92">{value}</p>
    </div>
  );
}

type ProofLink = { href: string; label: string; external?: boolean };

function ServiceBlock(props: {
  title: string;
  text: string;
  deliverables: string[];
  examples: string[];
  proofLinks: ProofLink[];
}) {
  const { title, text, deliverables, examples, proofLinks } = props;

  return (
    <Reveal className="max-w-6xl mx-auto px-6 py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-25%" }}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        className="space-y-10"
      >
        <motion.div variants={fadeUp} className="space-y-4">
          <p className="text-xs tracking-[0.35em] uppercase text-white/60">• Service</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">{title}</h2>
          <div className="h-px w-full bg-white/10" />
          <p className="max-w-3xl text-white/75 leading-relaxed">{text}</p>
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <OutlineFrame>
              <div className="p-8 md:p-10">
                <p className="text-sm font-semibold tracking-[0.18em] uppercase text-white/70">
                  <span className="text-[#F5C542]/90">•</span> Livrables
                </p>

                <ul className="mt-6 space-y-3">
                  {deliverables.map((t) => (
                    <li key={t} className="flex gap-3 text-sm text-white/72 leading-relaxed">
                      <span className="mt-[0.55em] h-1.5 w-1.5 rounded-full bg-[#F5C542]/70 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 h-px w-full bg-white/10" />

                <p className="mt-8 text-sm font-semibold tracking-[0.18em] uppercase text-white/70">
                  <span className="text-[#F5C542]/90">•</span> Exemples de prestations
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {examples.map((t) => (
                    <li
                      key={t}
                      className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/70"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                {/* liens preuve (pas CTA) */}
                <div className="mt-8 flex flex-wrap gap-4">
                  {proofLinks.map((l) =>
                    l.external ? (
                      <a
                        key={l.href + l.label}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-[#F5C542]/85 hover:text-[#F5C542]"
                      >
                        {l.label} <span aria-hidden>→</span>
                      </a>
                    ) : (
                      <Link
                        key={l.href + l.label}
                        href={l.href}
                        className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-[#F5C542]/85 hover:text-[#F5C542]"
                      >
                        {l.label} <span aria-hidden>→</span>
                      </Link>
                    )
                  )}
                </div>
              </div>
            </OutlineFrame>
          </div>

          <div className="md:col-span-5 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-sm font-semibold tracking-[0.18em] uppercase text-white/70">
                <span className="text-[#F5C542]/90">•</span> Standard
              </p>
              <p className="mt-4 text-white/75 leading-relaxed">
                Clarté du besoin, exécution propre, livraison exploitable. Pas d’improvisation, pas de flou,
                pas de “surprise” à la fin.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-sm font-semibold tracking-[0.18em] uppercase text-white/70">
                <span className="text-[#F5C542]/90">•</span> Résultat
              </p>
              <p className="mt-4 text-white/75 leading-relaxed">
                Un rendu lisible et crédible — prêt à être utilisé immédiatement, sur les bons formats.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Reveal>
  );
}

export default function ServicesPage() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // profondeur lente (illusion 3D) — fond inchangé
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.35]);

  const openCalendly = () => {
    if (window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.location.href = CALENDLY_URL;
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ================= HERO (CTA #1) ================= */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* fond conservé */}
        <HeroCineSlider count={10} ext=".jpg" intervalMs={9000} />

        {/* overlays premium */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/85" />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_55%_at_20%_30%,rgba(245,197,66,0.08)_0%,rgba(0,0,0,0)_60%)]" />

        <motion.div
          style={prefersReducedMotion ? undefined : { y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28"
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.15 } } }}
            className="space-y-10"
          >
            <motion.p variants={fadeUp} className="text-xs tracking-[0.35em] uppercase text-white/60">
              • Services
            </motion.p>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold leading-[1.02]">
              Services<span className="text-[#F5C542]">.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="max-w-2xl text-lg md:text-xl text-white/75 leading-relaxed">
              <span className="text-white/90 font-semibold">De l’idée au livrable final.</span>{" "}
              Production photo, vidéo, audio et digitale pour ceux qui exigent la clarté.
              <br />
              Tu sais exactement ce que tu obtiens, quand tu l’obtiens, et comment ça sera livré.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/debuter-un-projet"
                className="rounded-xl border border-[#F5C542]/40 px-8 py-4 font-semibold hover:bg-[#F5C542]/10 transition"
              >
                Débuter un projet
              </Link>
              <button
                type="button"
                onClick={openCalendly}
                className="rounded-xl border border-white/20 px-8 py-4 text-white/90 hover:bg-white/5 transition"
              >
                Planifier un appel
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="grid gap-3 pt-6 md:grid-cols-3">
              <MetaPill label="Rendu" value="Propre, lisible, adapté à l’usage" />
              <MetaPill label="Méthode" value="Process clair, sans improvisation" />
              <MetaPill label="Livraison" value="Fichiers organisés, délais respectés" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= STRIP VIVANT ================= */}
      <section className="relative py-16 overflow-hidden border-y border-white/10">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
          className="whitespace-nowrap text-sm md:text-base tracking-[0.35em] uppercase text-white/55"
        >
          Cadrage · Direction artistique · Production · Post-production · Livraison · Image · Son · Digital ·
          Cadrage · Direction artistique · Production · Post-production · Livraison · Image · Son · Digital ·
        </motion.div>
      </section>

      {/* ================= APPROCHE + MÉTHODE (timeline) ================= */}
      <Reveal className="max-w-6xl mx-auto px-6 py-32">
        <div className="grid gap-14 md:grid-cols-12 md:items-start">
          <div className="md:col-span-7 space-y-8">
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, margin: "-20%" }}
              variants={fadeUp}
              className="text-3xl md:text-4xl font-extrabold"
            >
              Une approche claire et structurée.
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, margin: "-20%" }}
              variants={fadeUp}
              className="text-white/75 leading-relaxed"
            >
              On commence par cadrer pour éviter les allers-retours inutiles : objectif, message, public,
              contraintes, supports. Ensuite on produit avec une direction claire, puis on finalise et on
              livre des fichiers propres, organisés, prêts à être utilisés.
            </motion.p>
          </div>

          <div className="md:col-span-5">
            <OutlineFrame>
              <div className="p-8 md:p-10">
                <p className="text-sm font-semibold tracking-[0.18em] uppercase text-white/70">
                  <span className="text-[#F5C542]/90">•</span> Notre méthode
                </p>

                <div className="mt-7 space-y-6">
                  {[
                    { n: "01", t: "Cadrage", d: "Brief, intention, format, budget, délais." },
                    { n: "02", t: "Production", d: "Tournage / captation / création, propre et efficace." },
                    { n: "03", t: "Post-production", d: "Montage, son, étalonnage, finitions." },
                    { n: "04", t: "Livraison", d: "Exports + fichiers organisés + délais respectés." },
                  ].map((x) => (
                    <motion.div
                      key={x.n}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: false, margin: "-25%" }}
                      variants={fadeUp}
                      className="flex gap-4"
                    >
                      <div className="min-w-[56px]">
                        <p className="text-xs tracking-[0.28em] uppercase text-white/55">{x.n}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-base font-semibold text-white/90">{x.t}</p>
                        <p className="text-sm text-white/65 leading-relaxed">{x.d}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </OutlineFrame>
          </div>
        </div>
      </Reveal>

      {/* ================= SERVICES (preuves directes) ================= */}
      <ServiceBlock
        title="Production vidéo"
        text="Pour clips, contenus réseaux, promos et événements. On tourne pour le montage : plans utiles, rythme, cohérence visuelle et rendu ciné lisible."
        deliverables={[
          "Versions vertical / horizontal (Reels/TikTok + YouTube)",
          "Exports optimisés (web + archive)",
          "Dossier livré organisé (projet + masters + exports)",
        ]}
        examples={["Clips musicaux", "Vidéos promotionnelles", "Captation d’événements", "Contenus réseaux & web"]}
        proofLinks={[
          { href: SHEGUE_YOUTUBE_URL, label: "Voir les clips (YouTube)", external: true },
          { href: SHEGUE_LINKTREE_URL, label: "Plus de liens (Linktree)", external: true },
        ]}
      />

      <ServiceBlock
        title="Photographie"
        text="Portraits, événements et image de marque. L’objectif : une image nette, flatteuse, cohérente, utilisable partout (web, réseaux, print)."
        deliverables={[
          "Sélection + retouche cohérente",
          "Formats web + haute résolution",
          "Galerie / dossier structuré",
        ]}
        examples={["Portraits", "Événements privés", "Événements professionnels", "Image de marque / entreprise"]}
        proofLinks={[{ href: "/portfolio#photo", label: "Voir des projets photo", external: false }]}
      />

      <ServiceBlock
        title="Audio & son"
        text="Enregistrement, direction, mixage et traitement sonore. Le rendu doit rester propre sur casque, voiture, enceintes et téléphone — sans surprise."
        deliverables={[
          "Fichiers WAV + MP3",
          "Versions clean / explicit si nécessaire",
          "Stems / exports si demandés",
        ]}
        examples={["Enregistrement voix", "Mixage", "Mastering", "Traitement sonore pour vidéo"]}
        proofLinks={[
          { href: SHEGUE_SPOTIFY_URL, label: "Écouter (Spotify)", external: true },
          { href: SHEGUE_LINKTREE_URL, label: "Plus de liens (Linktree)", external: true },
        ]}
      />

      <ServiceBlock
        title="Digital & structure de contenu"
        text="On structure ton image en ligne pour que tout soit cohérent : site, réseaux, contenus. L’idée : un écosystème où la photo, la vidéo et l’audio travaillent ensemble."
        deliverables={[
          "Structure de page / sections / parcours",
          "Organisation des contenus (quoi poster, où, comment)",
          "Recommandations claires pour la diffusion",
        ]}
        examples={[
          "Structure de site ou de page",
          "Présentation d’artiste / entreprise",
          "Écosystème de contenu",
          "Conseils de diffusion",
        ]}
        proofLinks={[{ href: "/portfolio#digital", label: "Voir des études de cas", external: false }]}
      />

      {/* ================= FAQ ================= */}
      <Reveal className="max-w-5xl mx-auto px-6 py-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-15%" }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold">
            Questions fréquentes
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-10 space-y-10">
            {[
              {
                q: "Travaillez-vous avec tous types de clients ?",
                a: "Oui. Artistes, particuliers, marques et entreprises. Le format change, pas les standards.",
              },
              {
                q: "Comment se déroule un projet ?",
                a: "Cadrage, production, post-production, livraison. Chaque étape est définie à l’avance.",
              },
              { q: "Quels sont vos délais ?", a: "Les délais sont annoncés dès le départ et respectés." },
              {
                q: "Comment sont définis les tarifs ?",
                a: "Selon le projet, le volume et les délais. Un devis clair est proposé après brief ou appel.",
              },
            ].map((f) => (
              <OutlineFrame key={f.q}>
                <div className="p-8 md:p-10">
                  <p className="font-semibold text-white/90">{f.q}</p>
                  <p className="mt-3 text-white/70 leading-relaxed">{f.a}</p>
                </div>
              </OutlineFrame>
            ))}
          </motion.div>
        </motion.div>
      </Reveal>

      {/* ================= CTA FINAL (CTA #2) ================= */}
      <Reveal className="max-w-4xl mx-auto px-6 pb-40 text-center">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-15%" }}
          variants={fadeUp}
          className="text-3xl md:text-4xl font-extrabold"
        >
          On avance uniquement lorsque le projet est clair et aligné.
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-15%" }}
          variants={fadeUp}
          className="mt-6 text-white/70 leading-relaxed"
        >
          Soumets un brief ou prends un appel court pour cadrer. Ensuite, on décide.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-15%" }}
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/debuter-un-projet"
            className="rounded-xl border border-[#F5C542]/40 px-8 py-4 font-semibold hover:bg-[#F5C542]/10 transition"
          >
            Débuter un projet
          </Link>
          <button
            type="button"
            onClick={openCalendly}
            className="rounded-xl border border-white/20 px-8 py-4 hover:bg-white/5 transition"
          >
            Planifier un appel
          </button>
        </motion.div>
      </Reveal>
    </main>
  );
}
