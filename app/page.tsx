// app/page.tsx
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/services";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* HERO PRO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/10 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400/10 via-black to-black" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texte */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-yellow-400">
                    Studio créatif & label
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
                    Image, son
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                    & stratégie
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
                  Pour les{" "}
                  <span className="text-yellow-400 font-medium">artistes</span>, les{" "}
                  <span className="text-yellow-400 font-medium">marques</span> et les{" "}
                  <span className="text-yellow-400 font-medium">événements</span> qui veulent
                  marquer les esprits.
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/booking"
                  className="group relative px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10">Réserver une date</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <Link
                  href="/portfolio"
                  className="px-8 py-4 border border-white/20 text-white font-medium rounded-lg hover:border-yellow-400 hover:text-yellow-400 transition-all"
                >
                  Voir notre travail
                </Link>
              </div>

              {/* Confiance */}
              <div className="flex flex-wrap gap-6 pt-8 text-sm text-white/60">
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
              </div>
            </div>

            {/* Visuel simple (sans image perso) */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-yellow-400/20 via-purple-500/10 to-pink-500/20 border border-white/10 backdrop-blur-sm p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🎬</span>
                  </div>
                  <p className="text-white/80 italic">
                    "De l&apos;idée à la réalisation, nous transformons votre vision en contenu
                    mémorable."
                  </p>
                  <p className="text-xs text-white/60">Équipe Black Jesus Records</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION SERVICES */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Services"
          title="Ce que nous faisons"
          subtitle="Audiovisuel, label, post-production : une seule équipe pour gérer votre image du début à la fin."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* LABEL HIGHLIGHT */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="border border-yellow-400/40 rounded-2xl p-6 md:p-8 bg-yellow-400/5">
          <SectionTitle
            eyebrow="Label"
            title="Black Jesus Records"
            subtitle="Plus qu’un prestataire : un label qui comprend les réalités des artistes, des indépendants aux professionnels."
          />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-sm text-white/75 max-w-xl">
              Direction artistique, production musicale, accompagnement d’image, coaching carrière :
              nous travaillons avec des artistes qui veulent structurer leur projet, construire un
              univers fort et préparer le long terme.
            </p>
            <Link
              href="/label"
              className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-yellow-400 transition-colors"
            >
              Découvrir le label
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
