import Link from "next/link";

export default function NotFound() {
  return (
    <main className="readable min-h-screen flex flex-col items-center justify-center text-white px-6 text-center">
      <h1 className="text-6xl font-semibold tracking-tight">404</h1>

      <p className="mt-4 text-white/65 max-w-md">
        Cette page n’existe pas ou n’est plus accessible.
      </p>

      <Link
        href="/"
        className="mt-10 underline underline-offset-8 text-white/80 hover:text-white transition"
      >
        Retour à l’accueil
      </Link>
    </main>
  );
}
