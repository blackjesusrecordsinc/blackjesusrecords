// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import TopProgress from "@/components/TopProgress";
import RouteLoader from "@/components/RouteLoader";
import CursorGlow from "@/components/CursorGlow";
import PageTransition from "@/components/PageTransition";
import WorkBackground from "@/components/WorkBackground";

import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";

const SITE_NAME = "Black Jesus Records";
const SITE_URL = "https://www.blackjesusrecords.ca";
const DEFAULT_TITLE = "Black Jesus Records";
const DEFAULT_DESCRIPTION =
  "Studio créatif & label à Lévis (Québec). Vidéo, photo, post-production, contenus réseaux sociaux et stratégie.";

export const viewport: Viewport = {
  // ✅ Jaune signature (plus de bleu visible sur mobile/SEO)
  themeColor: "#F5C542",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: { default: DEFAULT_TITLE, template: `%s | ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="bg-transparent">
      {/* ✅ readable = overlay global lisible sur toutes les pages */}
      <body className="readable min-h-screen bg-transparent text-white antialiased overflow-x-hidden [accent-color:#F5C542]">
        {/* ✅ BACKGROUND GLOBAL (derrière tout) */}
        <div className="fixed inset-0 -z-10">
          <WorkBackground count={11} intervalMs={7000} />
        </div>

        {/* UX */}
        <TopProgress />

        {/* ✅ Obligatoire (RouteLoader utilise useSearchParams) */}
        <Suspense fallback={null}>
          <RouteLoader />
        </Suspense>

        <CursorGlow />
        <Navbar />

        {/* contenu */}
        <main className="pt-[var(--nav-h)] relative z-0 bg-transparent">
          <PageTransition>{children}</PageTransition>
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
