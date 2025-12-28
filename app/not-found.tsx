import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="text-sm text-white/60">404</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white">
          Page introuvable
        </h1>
        <p className="mt-3 text-white/70">
          Le lien est invalide ou la page a été déplacée.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold"
          >
            Retour à l’accueil
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-lg border border-white/15 text-white/85 hover:border-white/30 transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
