export default function PortfolioPage() {
  return (
    <main className="min-h-screen text-white px-6 py-20 max-w-5xl mx-auto space-y-10">
      <h1 className="text-5xl font-bold text-primary">Portfolio</h1>

      <p className="text-lg text-gray-300">
        Voici une base de portfolio pour présenter les projets Black Jesus Records.
        Tu pourras plus tard remplacer chaque bloc par de vrais clips, liens et visuels.
      </p>

      {/* Clips d'artistes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Clips & projets d&apos;artistes</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-zinc-900 p-5 rounded-xl">
            <h3 className="text-xl font-semibold mb-1">Clip – Shégué (exemple)</h3>
            <p className="text-gray-400 text-sm mb-3">
              Clip rap / street tourné en extérieur, ambiance nocturne, plans stabilisés
              et images serrées sur l&apos;artiste.
            </p>
            <p className="text-xs text-gray-500">
              Plus tard : intégrer ici un lien YouTube / Vimeo réel.
            </p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl">
            <h3 className="text-xl font-semibold mb-1">Session studio filmée</h3>
            <p className="text-gray-400 text-sm mb-3">
              Performance en studio avec mise en lumière, plusieurs angles de caméra
              et son retravaillé en post-production.
            </p>
          </div>
        </div>
      </section>

      {/* Événements */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Événements & aftermovies</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-zinc-900 p-5 rounded-xl">
            <h3 className="text-xl font-semibold mb-1">Mariage / événement privé</h3>
            <p className="text-gray-400 text-sm mb-3">
              Captation des moments forts, discours, détails, montés dans un film
              émotionnel pour la famille.
            </p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl">
            <h3 className="text-xl font-semibold mb-1">Aftermovie de soirée / show</h3>
            <p className="text-gray-400 text-sm mb-3">
              Résumé dynamique d&apos;une soirée ou d&apos;un concert, avec focus sur
              l&apos;énergie du public et l&apos;artiste.
            </p>
          </div>
        </div>
      </section>

      {/* Marques & entreprises */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Contenus pour marques & entreprises</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-zinc-900 p-5 rounded-xl">
            <h3 className="text-xl font-semibold mb-1">Vidéo réseaux sociaux</h3>
            <p className="text-gray-400 text-sm mb-3">
              Vidéos courtes verticales pour TikTok / Reels / Shorts, pensées pour
              attirer l&apos;attention rapidement.
            </p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl">
            <h3 className="text-xl font-semibold mb-1">Présentation d&apos;entreprise</h3>
            <p className="text-gray-400 text-sm mb-3">
              Vidéo présentant l&apos;activité, l&apos;équipe ou un produit, adaptée
              au site web et aux réseaux.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
