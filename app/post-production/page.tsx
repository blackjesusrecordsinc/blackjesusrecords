export default function PostProductionPage() {
  return (
    <main className="min-h-screen text-white px-6 py-20 max-w-4xl mx-auto space-y-12">

      {/* Titre principal */}
      <section className="space-y-4">
        <h1 className="text-5xl font-extrabold text-yellow-400">
          Post-production
        </h1>

        <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
          On prend vos images brutes et on les transforme en contenu puissant,
          rythmé et professionnel. Clips musicaux, vidéos corporatives,
          événements ou réseaux sociaux : on sublime, on corrige, on raconte.
        </p>
      </section>

      {/* Bloc services */}
      <div className="space-y-6">

        {/* Montage vidéo */}
        <div className="bg-zinc-900/60 p-6 rounded-2xl border border-white/10 backdrop-blur">
          <h2 className="text-2xl font-bold mb-2">Montage vidéo</h2>
          <p className="text-gray-300 leading-relaxed">
            Structure narrative, rythme, transitions propres, versions courtes verticales,
            sous-titres, formats optimisés pour YouTube, Instagram et TikTok.
          </p>
        </div>

        {/* Color grading */}
        <div className="bg-zinc-900/60 p-6 rounded-2xl border border-white/10 backdrop-blur">
          <h2 className="text-2xl font-bold mb-2">Color grading</h2>
          <p className="text-gray-300 leading-relaxed">
            Correction colorimétrique complète, match entre les plans, look cinéma ou clip rap/street,
            gestion des hautes lumières et noirs profonds.
          </p>
        </div>

        {/* Audio & mix */}
        <div className="bg-zinc-900/60 p-6 rounded-2xl border border-white/10 backdrop-blur">
          <h2 className="text-2xl font-bold mb-2">Audio & Sound Design</h2>
          <p className="text-gray-300 leading-relaxed">
            Nettoyage des prises son, synchronisation, ajout d’ambiances, FX sonores,
            équilibrage et finitions pour un rendu professionnel.
          </p>
        </div>
      </div>

      {/* Appel à l’action */}
      <section className="pt-4">
        <a
          href="/booking"
          className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
        >
          Réserver une session de post-production
        </a>
      </section>

    </main>
  );
}
