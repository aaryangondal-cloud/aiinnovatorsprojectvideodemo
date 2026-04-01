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
          50: "#eef1f7",
          100: "#d5dcea",
          200: "#adbad5",
          300: "#7d96be",
          400: "#5375a9",
          500: "#3a5a92",
          600: "#2c3b5b",
          700: "#243150",
          800: "#1b2540",
          900: "#111830",
        },
        gold: {
          50: "#fffde7",
          100: "#fff9c4",
          200: "#fff176",
          300: "#ffee58",
          400: "#ffeb3b",
          500: "#fed700",
          600: "#f9c800",
          700: "#f0b800",
          800: "#e6a800",
          900: "#cc8800",
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
