export default function ServicesPage() {
  return (
    <main className="min-h-screen text-white px-6 py-20 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold text-primary mb-6">
        Services Black Jesus Records
      </h1>

      <p className="text-lg text-gray-300 mb-10">
        Black Jesus Records, c’est un studio créatif, un label et une équipe image
        qui comprend la réalité des artistes, des indépendants et des entreprises.
        Tu viens avec une idée, on t’aide à en faire un projet clair et professionnel.
      </p>

      <div className="space-y-6">
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-primary mb-2">Pour les artistes</h2>
          <p className="text-gray-300">
            Clips rap / street / drill, sessions studio filmées, visuels pour singles,
            reels pour promo, aftermovies de shows, teasers d’albums.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-primary mb-2">Pour le grand public</h2>
          <p className="text-gray-300">
            Mariages, anniversaires, baptêmes, événements familiaux : on capture les
            moments importants avec une esthétique ciné, pas juste une vidéo téléphone.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-primary mb-2">Pour les entreprises</h2>
          <p className="text-gray-300">
            Contenu réseaux sociaux, vidéos de présentation, interviews, recap d’événements.
            On t’aide à avoir une image solide sans agence hors de prix.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-primary mb-2">Post-production & stratégie</h2>
          <p className="text-gray-300">
            Montage, color grading, mixage, optimisation pour les plateformes, conseils de
            diffusion et calendrier de contenu pour que tes vidéos servent vraiment à quelque chose.
          </p>
        </div>
      </div>
    </main>
  );
}
