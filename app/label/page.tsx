export default function LabelPage() {
  return (
    <main className="min-h-screen text-white px-6 py-20 max-w-4xl mx-auto space-y-10">
      <h1 className="text-5xl font-bold text-primary mb-6">
        Black Jesus Records
      </h1>

      {/* Mission */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Notre mission</h2>
        <p className="text-gray-300">
          Black Jesus Records est un label indépendant basé au Québec, pensé pour les artistes
          qui veulent une image forte, une stratégie claire et un accompagnement humain.
          On ne fait pas juste des vidéos : on construit un projet autour de ta vision.
        </p>
      </section>

      {/* Fondateur */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Le fondateur</h2>
        <p className="text-gray-300">
          Le label est fondé par Emmanuel Ramazani Kibanda, créateur visuel, réalisateur
          et producteur. Son objectif : aider les artistes et les marques à raconter leur
          histoire avec des images fortes, un son propre et une stratégie réaliste.
        </p>
      </section>

      {/* Artistes */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Nos artistes</h2>
        <p className="text-gray-300">
          Black Jesus Records développe actuellement l&apos;artiste <strong>Shégué</strong> :
          univers brut, énergie de rue, clips forts et identité visuelle cohérente.
          Le travail se fait sur le long terme, projet après projet.
        </p>
        <p className="text-gray-500 text-sm">
          D&apos;autres signatures et collaborations verront le jour au fur et à mesure.
        </p>
      </section>

      {/* Ce qu'on offre */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Ce qu&apos;on offre aux artistes</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>Clips musicaux et contenus réseaux sociaux professionnels</li>
          <li>Direction artistique et conseil sur l&apos;image</li>
          <li>Stratégie de sortie (singles, EP, albums)</li>
          <li>Accompagnement pour la diffusion et la visibilité</li>
          <li>Support sur la structuration de carrière</li>
        </ul>
      </section>

      {/* Soumettre un projet */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Soumettre un projet</h2>
        <p className="text-gray-300">
          Tu veux présenter un projet au label ? Envoie ton univers, ton objectif,
          et un lien vers une démo (clip, audio, live) via la page{" "}
          <span className="text-primary font-semibold">Contact</span> ou{" "}
          <span className="text-primary font-semibold">Réservation</span>.
        </p>
      </section>
    </main>
  );
}
