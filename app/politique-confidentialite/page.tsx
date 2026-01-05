export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative border-b border-white/15">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_0%,rgba(245,197,66,0.15),rgba(0,0,0,0)_60%)]" />
        <div className="relative mx-auto max-w-4xl px-6 pt-28 pb-12">
          <p className="text-xs tracking-widest uppercase text-white/70">
            Document légal
          </p>

          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
            Politique de confidentialité
          </h1>

          <p className="mt-4 max-w-3xl text-base text-white/90 leading-relaxed">
            Black Jesus Records accorde une importance particulière à la protection des
            renseignements personnels et au respect de la vie privée des utilisateurs de ce site.
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <article className="space-y-10 text-[15px] leading-relaxed text-white/90">
          <p>
            Cette politique de confidentialité vise à expliquer de manière transparente
            quelles informations peuvent être collectées lors de l’utilisation du site
            Black Jesus Records, ainsi que la façon dont ces informations sont utilisées,
            conservées et protégées.
          </p>

          <p>
            Les renseignements transmis volontairement par les utilisateurs, notamment
            par l’entremise de formulaires ou de communications directes, sont utilisés
            exclusivement dans un cadre professionnel, afin de répondre aux demandes,
            d’évaluer des projets ou d’assurer un suivi administratif.
          </p>

          <p>
            Aucune information personnelle n’est vendue, louée ou échangée à des tiers.
            Certaines données peuvent toutefois être traitées par des services techniques
            nécessaires au fonctionnement du site (hébergement, messagerie, statistiques),
            dans la mesure où ces services respectent des standards raisonnables de
            confidentialité et de sécurité.
          </p>

          <p>
            Black Jesus Records met en œuvre des mesures organisationnelles et techniques
            afin de protéger les informations contre tout accès non autorisé, perte,
            divulgation ou utilisation abusive. Malgré ces précautions, aucun système
            informatique ne peut garantir une sécurité absolue.
          </p>

          <p>
            Les renseignements sont conservés uniquement pour la durée nécessaire à la
            réalisation des objectifs pour lesquels ils ont été collectés, puis supprimés
            ou anonymisés lorsque leur conservation n’est plus justifiée.
          </p>

          <p className="text-white/70 text-sm">
            En naviguant sur ce site, vous reconnaissez avoir pris connaissance de la
            présente politique de confidentialité et en accepter les principes.
          </p>
        </article>
      </section>
    </main>
  );
}
