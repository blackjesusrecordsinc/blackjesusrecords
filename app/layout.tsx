// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkBackground from "@/components/WorkBackground";

import { Analytics } from "@vercel/analytics/react";
<<<<<<< HEAD

/* =========================
   SITE CONFIG (LOCKED)
========================= */
const SITE = {
  name: "Black Jesus Records",
  url: "https://www.blackjesusrecords.ca",
  defaultTitle: "Black Jesus Records",
  description:
    "Studio créatif & label indépendant basé à Lévis, Québec. Image · Son · Stratégie.",
  locale: "fr_CA",
  brandColor: "#F5C542",
} as const;
=======
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
>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013

/* =========================
   VIEWPORT
========================= */
export const viewport: Viewport = {
<<<<<<< HEAD
  themeColor: SITE.brandColor,
=======
  themeColor: "#F5C542",
>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/* =========================
   METADATA (sobre, non marketing)
========================= */
export const metadata: Metadata = {
<<<<<<< HEAD
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,

  title: {
    default: SITE.defaultTitle,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: SITE.url },
=======
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: SITE_URL },
>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013
  robots: { index: true, follow: true },

  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.defaultTitle,
    description: SITE.description,
    locale: SITE.locale,
  },

  twitter: {
    card: "summary_large_image",
    title: SITE.defaultTitle,
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<<<<<<< HEAD
    <html lang="fr" className="bg-transparent">
      <body className="min-h-screen bg-transparent text-white antialiased overflow-x-hidden">
        {/* =========================
           BACKGROUND GLOBAL
           vivant, lent, imperceptible
        ========================= */}
        <div className="fixed inset-0 -z-10">
          <WorkBackground count={14} intervalMs={9000} />
        </div>

        {/* =========================
           SHELL
        ========================= */}
        <Navbar />

        <main className="pt-[var(--nav-h)] relative">
          {children}
=======
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
          relative
        "
      >
        {/* ✅ FILM GRAIN (global) */}
        <div className="film-grain is-animated" aria-hidden="true" />

        {/* ✅ 1) WorkBackground responsive + fallback statique mobile */}
        <div className="fixed inset-0 -z-10">
          <div className="hidden sm:block">
            <WorkBackground count={7} intervalMs={10000} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black sm:hidden" />
        </div>

        {/* UX */}
        <TopProgress />

        {/* ✅ Suspense fallback premium jaune */}
        <Suspense
          fallback={
            <div className="fixed left-0 top-0 z-[100] h-1 w-full bg-[#F5C542]/20">
              <div className="h-full w-1/3 bg-[#F5C542] animate-pulse" />
            </div>
          }
        >
          <RouteLoader />
        </Suspense>

        {/* ✅ CursorGlow: laisse le composant gérer le touch/no-hover en interne */}
        <CursorGlow />

        <Navbar />

        <main
          id="main-content"
          role="main"
          aria-label="Contenu principal"
          className="pt-[var(--nav-h)] relative z-10 bg-transparent"
        >
          <PageTransition>{children}</PageTransition>
>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013
        </main>

        <Footer />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
