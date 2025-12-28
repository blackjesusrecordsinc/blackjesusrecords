// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import TopProgress from "@/components/TopProgress";
import RouteLoader from "@/components/RouteLoader";
import CursorGlow from "@/components/CursorGlow";
import PageTransition from "@/components/PageTransition";

import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";

const SITE_NAME = "Black Jesus Records";
const SITE_URL = "https://www.blackjesusrecords.ca";
const DEFAULT_TITLE = "Black Jesus Records";
const DEFAULT_DESCRIPTION =
  "Studio créatif & label à Lévis (Québec). Vidéo, photo, post-production, contenus réseaux sociaux et stratégie.";

export const viewport: Viewport = {
  themeColor: "#0B0B0E",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,

  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: DEFAULT_DESCRIPTION,

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="bg-[#0B0B0E]">
      <body className="min-h-screen bg-[#0B0B0E] text-white antialiased">
        {/* UX layers */}
        <TopProgress />

        {/* Obligatoire pour RouteLoader (useSearchParams) */}
        <Suspense fallback={null}>
          <RouteLoader />
        </Suspense>

        <CursorGlow />
        <Navbar />

        {/* ⬇️ ALIGNÉ AVEC LA HAUTEUR DU NAVBAR */}
        <main className="pt-16">
          <PageTransition>{children}</PageTransition>
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
