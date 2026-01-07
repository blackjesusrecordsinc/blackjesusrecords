import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 gap-6 bg-transparent">
      <h1 className="text-6xl font-bold text-primary drop-shadow-[0_0_24px_rgba(245,197,66,0.35)]">
        404
      </h1>

      <p className="text-white/70 max-w-md">
        Cette page n’existe pas ou a été déplacée.
      </p>

      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 font-semibold text-black transition hover:opacity-95 shadow-glow"
      >
        Retour à l’accueil
      </Link>
    </main>
  );
}
