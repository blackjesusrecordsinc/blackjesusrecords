export default function PortfolioPage() {
  return (
    <main className="min-h-screen text-white px-6 py-20 max-w-5xl mx-auto space-y-12">
      {/* Titre + intro */}
      <section className="space-y-4">
        <h1 className="text-5xl font-extrabold text-yellow-400">Portfolio</h1>
        <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
          Une sélection de formats que Black Jesus Records peut réaliser : clips rap / street,
          contenus pour marques, mariages et événements. Tu pourras ensuite remplacer chaque bloc
          par de vrais projets, liens et visuels.
        </p>
      </section>

      {/* Clips d'artistes */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          Clips &amp; projets d&apos;artistes
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Clip Shégué */}
          <div className="bg-zinc-900/80 p-6 rounded-2xl border border-white/5 backdrop-blur">
            <h3 className="text-xl font-semibold mb-2">Clip – Shégué (rap / street)</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              Clip rap / street tourné en extérieur, ambiance nocturne, plans stabilisés
              et images serrées sur l&apos;artiste. Pensé pour YouTube et les réseaux.
            </p>

            <a
              href="https://youtube.com/@shegue242?si=xPnxWCIG98q8bohh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 underline text-sm font-medium inline-flex items-center gap-1"
            >
              🔗 Voir la chaîne YouTube de Shégué
            </a>
          </div>

          {/* Session studio filmée */}
          <div className="bg-zinc-900/80 p-6 rounded-2xl border border-white/5 backdrop-blur">
            <h3 className="text-xl font-semibold mb-2">Session studio filmée</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Performance filmée en studio avec éclairage contrôlé, plusieurs angles de
              caméra et mixage audio propre. Idéal pour montrer le talent brut d&apos;un artiste.
            </p>
          </div>
        </div>
      </section>

      {/* Événements & aftermovies */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          Événements &amp; aftermovies
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Mariage / événement privé */}
          <div className="bg-zinc-900/80 p-6 rounded-2xl border border-white/5 backdrop-blur">
            <h3 className="text-xl font-semibold mb-2">Mariage / événement privé</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Captation discrète des moments forts, discours et détails, montée ensuite en
              film émotionnel pour la famille. Livraison optimisée pour la TV et le partage en ligne.
            </p>
          </div>

          {/* Aftermovie */}
          <div className="bg-zinc-900/80 p-6 rounded-2xl border border-white/5 backdrop-blur">
            <h3 className="text-xl font-semibold mb-2">Aftermovie de soirée / show</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Résumé dynamique d&apos;une soirée, d&apos;un concert ou d&apos;un festival :
              énergie du public, moments clés sur scène, détails visuels et sound design
              pour revivre l&apos;événement.
            </p>
          </div>
        </div>
      </section>

      {/* Marques & entreprises */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          Contenus pour marques &amp; entreprises
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Vidéo réseaux sociaux */}
          <div className="bg-zinc-900/80 p-6 rounded-2xl border border-white/5 backdrop-blur">
            <h3 className="text-xl font-semibold mb-2">Vidéo réseaux sociaux</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Formats courts verticaux (TikTok, Reels, Shorts) pensés pour attirer
              l&apos;attention en quelques secondes : hooks forts, textes à l&apos;écran,
              montage rapide et transitions propres.
            </p>
          </div>

          {/* Présentation d’entreprise */}
          <div className="bg-zinc-900/80 p-6 rounded-2xl border border-white/5 backdrop-blur">
            <h3 className="text-xl font-semibold mb-2">Présentation d&apos;entreprise</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Vidéo qui présente l&apos;activité, l&apos;histoire et l&apos;équipe d&apos;une
              entreprise. Utilisable sur le site web, LinkedIn et en pitch commercial.
            </p>
          </div>
        </div>
      </section>

      {/* CTA bas de page */}
      <section className="pt-4">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-full inline-flex items-center px-8 py-3 text-sm font-semibold hover:brightness-110 transition">
          <a href="/booking">Réserver un tournage ou une post-production</a>
        </div>
      </section>
    </main>
  );
}
