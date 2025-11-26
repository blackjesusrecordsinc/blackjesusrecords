export default function PostProductionPage() {
  return (
    <main className="min-h-screen text-white px-6 py-20 max-w-4xl mx-auto space-y-10">
      <h1 className="text-5xl font-bold text-primary">Post-production</h1>

      <p className="text-lg text-gray-300">
        Nous pouvons monter, corriger et sublimer des images tournées par nous ou par d’autres équipes.
      </p>

      <div className="space-y-4">
        <div className="bg-zinc-900 p-5 rounded-xl">
          <h2 className="text-2xl font-semibold mb-2">Montage vidéo</h2>
          <p className="text-gray-300">
            Narration, rythme, transitions, sous-titres, versions courtes pour réseaux sociaux.
          </p>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl">
          <h2 className="text-2xl font-semibold mb-2">Color grading</h2>
          <p className="text-gray-300">
            Correction colorimétrique, looks ciné, cohérence entre les plans.
          </p>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl">
          <h2 className="text-2xl font-semibold mb-2">Audio & mix</h2>
          <p className="text-gray-300">
            Nettoyage du son, équilibrage, ajout de sound design et musique.
          </p>
        </div>
      </div>
    </main>
  );
}
