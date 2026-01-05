export default function ConditionsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          Conditions d’utilisation
        </h1>

        <p className="mt-6 text-white/70 leading-relaxed">
          En accédant au site Black Jesus Records, vous acceptez les présentes
          conditions d’utilisation.
        </p>

        <section className="mt-10 space-y-6 text-sm text-white/70 leading-relaxed">
          <p>
            Tout le contenu présenté sur ce site (textes, images, vidéos, logos)
            est protégé par le droit d’auteur et demeure la propriété de Black Jesus Records
            ou de ses partenaires.
          </p>

          <p>
            Toute reproduction, diffusion ou utilisation non autorisée du contenu
            est strictement interdite.
          </p>

          <p>
            Black Jesus Records se réserve le droit de modifier le contenu du site
            ou ces conditions à tout moment, sans préavis.
          </p>

          <p>
            L’utilisation de ce site se fait sous votre entière responsabilité.
          </p>
        </section>
      </div>
    </main>
  );
}

