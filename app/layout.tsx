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
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from "react";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const SITE_NAME = "Black Jesus Records";
const SITE_URL = "https://www.blackjesusrecords.ca";
const DEFAULT_DESCRIPTION =
  "Studio créatif & label à Lévis (Québec). Vidéo, photo, post-production, contenus réseaux sociaux et stratégie.";

export const viewport: Viewport = {
  themeColor: "#F5C542",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`bg-transparent ${inter.variable}`} suppressHydrationWarning>
      <body
        className="
          min-h-screen
          bg-black
          text-white
          antialiased
          overflow-x-hidden
          [accent-color:#F5C542]
          font-sans
        "
      >
        {/* ✅ 1) WorkBackground responsive + fallback statique mobile */}
        <div className="fixed inset-0 -z-10">
          <div className="hidden sm:block">
            <WorkBackground count={7} intervalMs={10000} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black sm:hidden" />
        </div>

        {/* UX */}
        <TopProgress />

        {/* ✅ 3) Suspense fallback plus “progressif” */}
        <Suspense
          fallback={
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse" />
          }
        >
          <RouteLoader />
        </Suspense>

        {/* ✅ 4) CursorGlow: laisse le composant gérer le touch/no-hover en interne */}
        <CursorGlow />

        <Navbar />

        <main
          id="main-content"
          role="main"
          aria-label="Contenu principal"
          className="pt-[var(--nav-h)] relative z-10 bg-transparent"
        >
          <PageTransition>{children}</PageTransition>
        </main>

        <Footer />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
