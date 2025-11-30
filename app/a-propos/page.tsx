// app/a-propos/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos | Black Jesus Records",
  description:
    "Black Jesus Records est un label et studio créatif basé à Lévis, Québec. Fondé par Emmanuel Ramazani Kibanda, le label accompagne artistes, marques et événements avec une approche professionnelle et stratégique.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-4xl mx-auto px-4 py-16 space-y-10">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-widest text-yellow-400">
            À propos
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">
            Qui sommes-nous ?
          </h1>
          <p className="text-base md:text-lg text-white/75 leading-relaxed">
            Black Jesus Records est un{" "}
            <strong>label et studio créatif basé à Lévis, Québec</strong>.
            Nous accompagnons les artistes, les marques et les événements qui
            veulent une image cohérente, professionnelle et prête pour le
            monde numérique.
          </p>
        </header>

        {/* FONDATEUR */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Le fondateur
          </h2>
          <p className="text-white/80 leading-relaxed">
            Black Jesus Records a été fondé par{" "}
            <strong>Emmanuel Ramazani Kibanda</strong>, réalisateur,
            producteur et entrepreneur installé à Lévis. Après des années
            passées à développer la musique, l’image et les histoires d’artistes
            émergents, il crée Black Jesus Records pour offrir un service
            complet :{" "}
            <span className="italic">
              de l’idée jusqu’au contenu final prêt à être publié
            </span>
            .
          </p>
        </section>

        {/* LABEL + STUDIO CRÉATIF */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3">
            <h3 className="text-xl font-semibold">Un label</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Black Jesus Records développe des artistes rap, hip-hop, afro
              et alternatifs. Nous accompagnons :
            </p>
            <ul className="text-sm text-white/75 space-y-1.5 list-disc list-inside">
              <li>Direction artistique et positionnement de l’artiste</li>
              <li>Stratégie de sortie de singles, EP, albums</li>
              <li>Accompagnement pour clips, visuels et réseaux sociaux</li>
              <li>Suivi professionnel et vision long terme</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3">
            <h3 className="text-xl font-semibold">Un studio créatif</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Au-delà du label, Black Jesus Records est un{" "}
              <strong>studio créatif complet</strong> :
            </p>
            <ul className="text-sm text-white/75 space-y-1.5 list-disc list-inside">
              <li>Clips musicaux, captations live, aftermovies</li>
              <li>Shooting photo pour artistes, familles et entreprises</li>
              <li>Montage, étalonnage, sound design et mixage</li>
              <li>Création de sites web et optimisation pour les réseaux</li>
            </ul>
          </div>
        </section>

        {/* INFORMATIONS LÉGALES / LOCALISATION */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Informations officielles
          </h2>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-2 text-sm text-white/80">
            <p>
              <span className="font-semibold">Nom :</span>{" "}
              Black Jesus Records
            </p>
            <p>
              <span className="font-semibold">Statut :</span>{" "}
              Label & studio créatif enregistré au Canada
            </p>
            <p>
              <span className="font-semibold">Localisation :</span>{" "}
              Lévis, QC, Canada
            </p>
            <p>
              <span className="font-semibold">Enregistrement :</span>{" "}
              Black Jesus Records figure dans les registres d’entreprises
              canadiens (voir les informations publiques sur{" "}
              <a
                href="https://canadacompanyregistry.com/"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 text-yellow-300"
              >
                canadacompanyregistry.com
              </a>
              ).
            </p>
          </div>
        </section>

        {/* POURQUOI NOUS CHOISIR */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Pourquoi travailler avec Black Jesus Records ?
          </h2>
          <ul className="space-y-2 text-sm text-white/80 list-disc list-inside">
            <li>
              <strong>Une vision d’artiste</strong> : on comprend la réalité du
              terrain, des budgets limités et de la nécessité d’avoir du
              contenu solide pour se démarquer.
            </li>
            <li>
              <strong>Une approche stratégique</strong> : chaque clip, photo ou
              campagne est pensé pour servir ta carrière ou ton entreprise, pas
              seulement pour “faire une vidéo”.
            </li>
            <li>
              <strong>Un cadre professionnel</strong> : label déclaré, contrats
              propres, suivi sérieux et respect des délais.
            </li>
            <li>
              <strong>Basé à Lévis, ouvert au monde</strong> : nous travaillons
              au Québec et à l’international, en présentiel ou à distance.
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="pt-4">
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold text-sm hover:bg-yellow-300 transition"
          >
            Discuter d&apos;un projet
          </a>
        </section>
      </section>
    </main>
  );
}
