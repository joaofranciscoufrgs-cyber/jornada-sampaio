import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sampaio: {
          ink: "#0b0d10",
          ash: "#16191d",
          bronze: "#8a6a3b",
          gold: "#c9a25b",
          blood: "#7a1f1f",
          parchment: "#e9e1cf",
          olive: "#3a4131",
        },
      },
      fontFamily: {
        display: ["'Cinzel'", "'Trajan Pro'", "Georgia", "serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 1.2s ease-out forwards",
        "scroll-hint": "scrollHint 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scrollHint: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(10px)", opacity: "1" },
        },
      },
      backgroundImage: {
        "vignette": "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
