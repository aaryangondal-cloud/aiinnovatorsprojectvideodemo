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
          50:  "#eef0f5",
          100: "#c9d0e0",
          200: "#99a8c4",
          300: "#6680a8",
          400: "#3f5a8e",
          500: "#2c3b5b",
          600: "#2c3b5b",
          700: "#22304a",
          800: "#182339",
          900: "#0e1628",
        },
        gold: {
          50:  "#fffde0",
          100: "#fff9ab",
          200: "#fff176",
          300: "#ffe83f",
          400: "#fed700",
          500: "#fed700",
          600: "#d4b300",
          700: "#aa8f00",
          800: "#806c00",
          900: "#554800",
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
