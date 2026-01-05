export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          Politique de confidentialité
        </h1>

        <p className="mt-6 text-white/70 leading-relaxed">
          Black Jesus Records respecte la confidentialité des renseignements personnels
          collectés sur ce site.
        </p>

        <section className="mt-10 space-y-6 text-sm text-white/70 leading-relaxed">
          <p>
            Les informations transmises via nos formulaires (nom, courriel, message)
            sont utilisées uniquement pour répondre aux demandes, planifier des projets
            ou assurer le suivi professionnel.
          </p>

          <p>
            Aucune information personnelle n’est vendue, échangée ou partagée à des tiers,
            sauf si requis par la loi.
          </p>

          <p>
            Ce site peut utiliser des outils analytiques à des fins statistiques afin
            d’améliorer l’expérience utilisateur.
          </p>

          <p>
            En utilisant ce site, vous consentez à cette politique de confidentialité.
          </p>
        </section>
      </div>
    </main>
  );
}

