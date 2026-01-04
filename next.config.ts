// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },

  images: {
    // Images externes autorisées (Unsplash)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],

    // ℹ️ Les images locales (/public/**) ne passent PAS ici
    // Elles fonctionnent automatiquement via /public
  },
};

export default nextConfig;
