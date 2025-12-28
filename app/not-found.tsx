import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-6 px-6 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-white/70">Page introuvable.</p>
      <Link
        href="/"
        className="rounded-full bg-[#F5C518] px-6 py-3 font-semibold text-black"
      >
        Retour à l’accueil
      </Link>
    </main>
  );
}
