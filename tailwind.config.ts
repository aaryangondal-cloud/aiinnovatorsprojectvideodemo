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
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        gold: {
          50: "#fdf9ed",
          100: "#faf0cc",
          200: "#f5de95",
          300: "#f0c95a",
          400: "#ecb72e",
          500: "#d49a18",
          600: "#a87612",
          700: "#7d5512",
          800: "#674615",
          900: "#583b16",
        },
      },
    },
  },
  plugins: [],
};

export default config;
