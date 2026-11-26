import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F2EBDD",
          light: "#FAF6EF",
          pure: "#FBF7EE",
          dark: "#E4DCcb",
          muted: "#D9D1C3",
        },
        charcoal: {
          DEFAULT: "#252522",
          light: "#33332E",
          dark: "#1A1A18",
          deep: "#121211",
          card: "#2C2C28",
        },
        portfolio: {
          orange: "#E99B3D",
          "orange-hover": "#D88B2D",
          "orange-glow": "rgba(233, 155, 61, 0.25)",
          gray: "#88847B",
          "gray-light": "#A8A49C",
          "border-soft": "#D9D1C3",
          "border-dark": "#3D3D38",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
