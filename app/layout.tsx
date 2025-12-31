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
  return (
    <html lang="fr" className="bg-transparent">
      <body className="readable min-h-screen bg-transparent text-white antialiased overflow-x-hidden [accent-color:#F5C542]">
        <div className="fixed inset-0 -z-10">
          <WorkBackground count={11} intervalMs={7000} />
        </div>

        <TopProgress />

        <Suspense fallback={null}>
          <RouteLoader />
        </Suspense>

        <CursorGlow />

        <Navbar />

        <main className="pt-[var(--nav-h)] relative z-0 bg-transparent">
          <PageTransition>{children}</PageTransition>
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
