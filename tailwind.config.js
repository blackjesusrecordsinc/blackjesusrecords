/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        /* =========================
           BRAND — BLACK JESUS
        ========================= */
        primary: "#F5C542",      // jaune signature (cinéma / luxe)
        primarySoft: "#E6B93C",  // hover / accents doux
        primaryText: "#0B0B0B",

        /* =========================
           NEUTRES
        ========================= */
        dark: "#0B0B0B",
        foreground: "#F5F5F5",

        /* =========================
           TEXT TOKENS
        ========================= */
        mutedStrong: "rgba(255,255,255,0.90)",
        muted: "rgba(255,255,255,0.78)",
        mutedSoft: "rgba(255,255,255,0.55)",
      },

      boxShadow: {
        glow: "0 0 22px rgba(245,197,66,0.25)",
        title: "0 10px 30px rgba(0,0,0,0.55)",
      },
    },
  },

  plugins: [],
};
