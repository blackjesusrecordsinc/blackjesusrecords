export default function ConditionsPage() {
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
            Conditions d’utilisation
          </h1>

          <p className="mt-4 max-w-3xl text-base text-white/90 leading-relaxed">
            Les présentes conditions encadrent l’accès et l’utilisation du site
            Black Jesus Records.
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <article className="space-y-10 text-[15px] leading-relaxed text-white/90">
          <p>
            En accédant à ce site, l’utilisateur reconnaît avoir pris connaissance
            des présentes conditions d’utilisation et accepter d’y être lié.
            Si ces conditions ne sont pas acceptées, l’utilisation du site doit cesser.
          </p>

          <p>
            L’ensemble des contenus présents sur ce site, incluant notamment les textes,
            images, vidéos, éléments graphiques, marques et identités visuelles,
            est protégé par les lois relatives à la propriété intellectuelle.
            Ces contenus demeurent la propriété exclusive de Black Jesus Records
            ou de ses ayants droit.
          </p>

          <p>
            Toute reproduction, diffusion, modification ou exploitation, totale ou partielle,
            du contenu sans autorisation écrite préalable est strictement interdite,
            quel que soit le support ou le procédé utilisé.
          </p>

          <p>
            Le site est fourni à titre informatif. Black Jesus Records ne garantit
            ni l’exactitude, ni l’exhaustivité, ni l’actualité des informations diffusées,
            et décline toute responsabilité quant à l’utilisation qui pourrait en être faite.
          </p>

          <p>
            Black Jesus Records se réserve le droit de modifier, suspendre ou interrompre
            l’accès au site, ainsi que de mettre à jour les présentes conditions,
            à tout moment et sans préavis.
          </p>

          <p className="text-white/70 text-sm">
            Les présentes conditions sont régies par les lois applicables au Québec et au Canada.
          </p>
        </article>
      </section>
    </main>
  );
}
