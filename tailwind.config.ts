import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "system-ui", "sans-serif"],
        display: ["Lato", "system-ui", "sans-serif"],
      },
      colors: {
        navy: {
          50: "#eef0f5",
          100: "#d0d6e8",
          200: "#a1aed1",
          300: "#6d84b8",
          400: "#435e9e",
          500: "#243980",
          600: "#1a2844",
          700: "#141f36",
          800: "#0e1628",
          900: "#080d18",
        },
        gold: {
          50: "#fffde0",
          100: "#fffaab",
          200: "#fff176",
          300: "#ffec42",
          400: "#f7d61a",
          500: "#f7d61a",
          600: "#e0bf00",
          700: "#c9a800",
          800: "#b09200",
          900: "#8a7000",
        },
        cream: {
          50: "#fdfcf8",
          100: "#faf8f2",
          200: "#f5f0e4",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out",
        shimmer: "shimmer 2s infinite linear",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
