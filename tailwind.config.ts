import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core "Vault" palette — warm near-black ink with muted antique gold.
        ink: {
          DEFAULT: "#0B0B0A", // primary background, warm black
          raised: "#14140F", // elevated panels / cards
          surface: "#1B1A15", // glass surface base
        },
        gold: {
          DEFAULT: "#C6A15B", // antique gold — primary accent
          bright: "#E8C77A", // hover / active highlight
          dim: "#8C7440", // muted borders, disabled
        },
        parchment: {
          DEFAULT: "#EDE7D9", // primary text on dark
          dim: "#A79C87", // secondary text
        },
        vault: {
          emerald: "#24413A", // rare second accent — "verified source" tags
          rule: "rgba(198,161,91,0.22)", // hairline dividers
        },
        // Light mode ("Reading Room") variants
        paper: {
          DEFAULT: "#F7F3EA",
          raised: "#FFFFFF",
        },
        ink2: {
          DEFAULT: "#1C1A15",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        eyebrow: "0.22em",
      },
      backgroundImage: {
        "vault-radial":
          "radial-gradient(circle at 20% -10%, rgba(198,161,91,0.14), transparent 45%), radial-gradient(circle at 100% 0%, rgba(36,65,58,0.18), transparent 40%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.45)",
        goldGlow: "0 0 0 1px rgba(198,161,91,0.35), 0 8px 24px rgba(198,161,91,0.08)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
        shimmer: "shimmer 2.5s linear infinite",
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
  plugins: [require("@tailwindcss/typography")],
};

export default config;
