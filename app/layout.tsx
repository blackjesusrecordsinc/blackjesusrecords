// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata = {
  title: "Black Jesus Records – Studio créatif & label professionnel",
  description:
    "Services audiovisuels premium, production vidéo, label musical et post-production pour artistes, entreprises et événements au Québec et international.",
  keywords:
    "production vidéo, label musique, studio créatif, post-production, Québec, clips, mariages",
  authors: [{ name: "Black Jesus Records" }],
  openGraph: {
    title: "Black Jesus Records – Studio créatif & label",
    description:
      "Image, son & stratégie pour artistes, marques et événements.",
    type: "website",
    locale: "fr_CA",
    url: "https://www.blackjesusrecords.ca",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />

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
            gtag('config', 'G-XV45MXD6MP', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        {/* ---- Fin GA4 ---- */}
      </head>
      <body className="bg-black text-white min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
