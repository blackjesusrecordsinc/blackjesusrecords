// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/90 py-10 text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h2 className="text-white font-semibold text-lg">
          Black Jesus Records
        </h2>

        <p className="text-sm">
          Image • Son • Stratégie — Pour artistes, marques et événements.
        </p>

        <div className="flex items-center justify-center gap-6 text-sm">
          <Link
            href="/contact"
            className="hover:text-yellow-400 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/services"
            className="hover:text-yellow-400 transition-colors"
          >
            Services
          </Link>
          <Link
            href="/portfolio"
            className="hover:text-yellow-400 transition-colors"
          >
            Portfolio
          </Link>
        </div>

        <p className="text-xs text-white/50 pt-4">
          © {new Date().getFullYear()} Black Jesus Records. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
