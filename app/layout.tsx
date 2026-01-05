// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import TopProgress from "@/components/TopProgress";
import RouteLoader from "@/components/RouteLoader";
import CursorGlow from "@/components/CursorGlow";
import PageTransition from "@/components/PageTransition";
import WorkBackground from "@/components/WorkBackground";
<<<<<<< HEAD
=======
import CalendlyScript from "@/components/CalendlyScript";
>>>>>>> 10e061a (Rebuild: premium layout + motion + readability)

import { Analytics } from "@vercel/analytics/react";

const SITE = {
  name: "Black Jesus Records",
  url: "https://www.blackjesusrecords.ca",
  defaultTitle: "Black Jesus Records",
  description:
    "Studio créatif & label à Lévis (Québec). Vidéo, photo, post-production, contenus réseaux sociaux et stratégie.",
  locale: "fr_CA",
  brandColor: "#F5C542",
} as const;

export const viewport: Viewport = {
  themeColor: SITE.brandColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  title: { default: SITE.defaultTitle, template: `%s | ${SITE.name}` },
  description: SITE.description,
  alternates: { canonical: SITE.url },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // ✅ ROOT LAYOUT = STRICT: html + body, aucun fragment, aucun return conditionnel
  return (
<<<<<<< HEAD
    <html lang="fr" className="bg-transparent">
      <body className="readable min-h-screen bg-transparent text-white antialiased overflow-x-hidden [accent-color:#F5C542]">
=======
    <html lang="fr" suppressHydrationWarning>
      <body className="readable min-h-screen bg-transparent text-white antialiased overflow-x-hidden [accent-color:#F5C542]">
        {/* ✅ Client scripts INSIDE body (jamais dans <head> du layout) */}
        <CalendlyScript />

        {/* ✅ Background global */}
>>>>>>> 10e061a (Rebuild: premium layout + motion + readability)
        <div className="fixed inset-0 -z-10">
          <WorkBackground count={11} intervalMs={7000} />
        </div>

<<<<<<< HEAD
=======
        {/* ✅ UX loaders */}
>>>>>>> 10e061a (Rebuild: premium layout + motion + readability)
        <TopProgress />
        <Suspense fallback={null}>
          <RouteLoader />
        </Suspense>

        <CursorGlow />

        <Navbar />

<<<<<<< HEAD
        <main className="pt-[var(--nav-h)] relative z-0 bg-transparent">
=======
        {/* ✅ PageTransition ne doit JAMAIS toucher html/body */}
        <div className="pt-[var(--nav-h)] relative z-0">
>>>>>>> 10e061a (Rebuild: premium layout + motion + readability)
          <PageTransition>{children}</PageTransition>
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
