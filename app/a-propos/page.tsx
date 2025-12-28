"use client";

import Link from "next/link";

const UI = {
  card:
    "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur " +
    "shadow-[0_10px_40px_rgba(0,0,0,0.45)]",
  cardHover:
    "transition duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:-translate-y-[1px]",
  pill:
    "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70",
  subtle: "text-white/70 leading-relaxed",
  h2: "text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]",
  btnPrimary:
    "group relative inline-flex items-center justify-center rounded-full bg-[#F5C518] " +
    "px-6 py-3 text-sm font-semibold text-black transition hover:opacity-95 " +
    "shadow-[0_14px_40px_rgba(245,197,24,0.18)] overflow-hidden",
  btnShine:
    "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r " +
    "from-transparent via-white/25 to-transparent group-hover:translate-x-full transition duration-700",
  btnSecondary:
    "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 " +
    "px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10",
};

const cn = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

export default function AboutPage() {
  return (
    <main className="min-h-screen text-white relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-20">
        {/* header */}
        <div className={cn(UI.pill, "px-4 py-1.5")}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
          <span className="text-[11px] font-semibold tracking-[0.25em] text-white/70 uppercase">
            À propos
          </span>
        </div>

        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-[-0.02em]">
          Une équipe{" "}
          <span className="text-[#F5C518] drop-shadow-[0_0_22px_rgba(245,197,24,0.25)]">
            créative
          </span>{" "}
          pensée pour livrer.
        </h1>

        <p className={cn("mt-5 max-w-3xl text-base md:text-lg", UI.subtle)}>
          Black Jesus Records est un studio créatif & label basé à Lévis (Québec).
          Notre focus : une image forte, une exécution propre et des livrables optimisés pour YouTube et les réseaux.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link href="/booking" className={UI.btnPrimary}>
            <span className={UI.btnShine} />
            <span className="relative">Réserver</span>
          </Link>
          <Link href="/portfolio" className={UI.btnSecondary}>
            Voir le portfolio
          </Link>
        </div>

        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

        {/* grid cards */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className={cn(UI.card, UI.cardHover, "p-6")}>
            <div className={UI.pill}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
              Studio
            </div>
            <h2 className={cn(UI.h2, "mt-3")}>Image, son, post-prod</h2>
            <p className={cn(UI.subtle, "mt-2 text-sm")}>
              Tournage, lumière, montage, étalonnage, sound polish. Un workflow rapide et pro.
            </p>
          </div>

          <div className={cn(UI.card, UI.cardHover, "p-6")}>
            <div className={UI.pill}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
              Label
            </div>
            <h2 className={cn(UI.h2, "mt-3")}>Développement d’artistes</h2>
            <p className={cn(UI.subtle, "mt-2 text-sm")}>
              Identité visuelle, contenus, stratégie de sortie. On construit un univers crédible.
            </p>
          </div>

          <div className={cn(UI.card, UI.cardHover, "p-6")}>
            <div className={UI.pill}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
              Delivery
            </div>
            <h2 className={cn(UI.h2, "mt-3")}>Livrables optimisés</h2>
            <p className={cn(UI.subtle, "mt-2 text-sm")}>
              Exports propres (16:9 / 9:16), titres safe, formats réseaux, ready-to-post.
            </p>
          </div>
        </div>

        {/* founder */}
        <div className={cn(UI.card, UI.cardHover, "mt-6 p-7")}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="max-w-3xl">
              <div className={UI.pill}>
                <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                Direction
              </div>

              <h2 className={cn(UI.h2, "mt-3")}>Emmanuel Ramazani Kibanda</h2>
              <p className={cn(UI.subtle, "mt-2 text-sm md:text-base")}>
                Fondateur de Black Jesus Records. Réalisation, direction artistique et production.
                Objectif : livrer une qualité premium, sans blabla, avec une identité qui marque.
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Link href="/contact" className={UI.btnSecondary}>
                Contact
              </Link>
              <Link href="/services" className={UI.btnSecondary}>
                Services
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={cn(UI.card, "mt-8 p-7 bg-white/[0.03]")}>
          <h2 className={UI.h2}>
            On veut du{" "}
            <span className="text-[#F5C518] drop-shadow-[0_0_18px_rgba(245,197,24,0.18)]">
              solide
            </span>
            , du propre, du crédible.
          </h2>
          <p className={cn(UI.subtle, "mt-2 text-sm md:text-base max-w-3xl")}>
            Si ton projet est sérieux, on te répond avec une direction claire : scope, délais, livrables.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/booking" className={UI.btnPrimary}>
              <span className={UI.btnShine} />
              <span className="relative">Réserver une date</span>
            </Link>
            <Link href="/contact" className={UI.btnSecondary}>
              Envoyer un message
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
