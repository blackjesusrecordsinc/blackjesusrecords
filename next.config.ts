// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    domains: ["images.unsplash.com"], // Ajoute d'autres domaines si besoin
  },
};

export default nextConfig;
