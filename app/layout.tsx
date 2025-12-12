// app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.blackjesusrecords.ca"),
  title: {
    default: "Black Jesus Records — Studio créatif & label",
    template: "%s — Black Jesus Records",
  },
  description:
    "Services audiovisuels premium, production vidéo, label musical et post-production pour artistes, entreprises et événements au Québec et à l’international.",
  keywords: [
    "Black Jesus Records",
    "production vidéo",
    "studio créatif",
    "post-production",
    "clips",
    "drone",
    "étalonnage",
    "montage vidéo",
    "label musical",
    "Québec",
    "Lévis",
  ],
  authors: [{ name: "Black Jesus Records" }],
  creator: "Black Jesus Records",
  publisher: "Black Jesus Records",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Black Jesus Records — Studio créatif & label",
    description: "Image, son & stratégie pour artistes, marques et événements.",
    url: "https://www.blackjesusrecords.ca",
    siteName: "Black Jesus Records",
    locale: "fr_CA",
    type: "website",
    images: [
      {
        // Tu peux remplacer plus tard par une vraie image OG (ex: /og.jpg)
        url: "/logo_bjr.png",
        width: 1200,
        height: 630,
        alt: "Black Jesus Records",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Black Jesus Records — Studio créatif & label",
    description: "Image, son & stratégie pour artistes, marques et événements.",
    images: ["/logo_bjr.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen bg-black text-white antialiased flex flex-col">
        {/* ---- Google Analytics 4 ---- */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XV45MXD6MP"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XV45MXD6MP');
          `}
        </Script>
        {/* ---- Fin GA4 ---- */}

        <Navbar />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
