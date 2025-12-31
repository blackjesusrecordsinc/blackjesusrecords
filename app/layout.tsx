// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkBackground from "@/components/WorkBackground";

import { Analytics } from "@vercel/analytics/react";

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

/* =========================
   VIEWPORT
========================= */
export const viewport: Viewport = {
  themeColor: SITE.brandColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/* =========================
   METADATA (sobre, non marketing)
========================= */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,

  title: {
    default: SITE.defaultTitle,
    template: `%s | ${SITE.name}`,
  },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
