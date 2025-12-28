/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F5C542",      // JAUNE SIGNATURE (cinéma / luxe)
        primarySoft: "#E6B93C",  // hover / accents
        dark: "#0B0B0B",         // noir profond
        grayText: "#D1D1D1",     // texte secondaire
      },
    },
  },
  plugins: [],
};
