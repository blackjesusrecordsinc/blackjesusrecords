/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      /* =========================
         COULEURS — BLACK JESUS
      ========================= */
      colors: {
        primary: "#F5C542",       // jaune signature (cinéma / luxe)
        primarySoft: "#E6B93C",   // hover / accents doux
        dark: "#0B0B0B",          // noir profond
        grayText: "#D1D1D1",      // texte secondaire clair
      },

      /* =========================
         OMBRES CINÉ
      ========================= */
      boxShadow: {
        glow: "0 0 22px rgba(245, 197, 66, 0.25)",
        glowSoft: "0 0 14px rgba(245, 197, 66, 0.18)",
      },

      /* =========================
         BACKDROP BLUR (cohérent Navbar)
      ========================= */
      backdropBlur: {
        xs: "2px",
        sm: "6px",
        md: "12px",
        lg: "20px",
      },

      /* =========================
         BORDER RADIUS (ciné / premium)
      ========================= */
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },

  plugins: [],
};
