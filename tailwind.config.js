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

        /* =========================
           NEUTRES
        ========================= */
        dark: "#0B0B0B",         // noir profond
        grayText: "#D1D1D1",     // texte secondaire

        /* =========================
           ALIASES UTILES (UX)
        ========================= */
        foreground: "#F5F5F5",   // texte principal
        muted: "rgba(255,255,255,0.78)",
      },

      boxShadow: {
        /* glow jaune premium */
        glow: "0 0 22px rgba(245,197,66,0.25)",
      },
    },
  },

  plugins: [],
};
