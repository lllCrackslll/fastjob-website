import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bleu extrait du logo FAST JOB (#0F202A)
        night: {
          DEFAULT: "#0F202A",
          light: "#152834",
          card: "#132530",
          muted: "#1A3848",
          border: "#254556",
          deep: "#0A1820",
        },
        electric: {
          DEFAULT: "#FACC15",
          dark: "#EAB308",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(250, 204, 21, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(250, 204, 21, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
