import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        surface: "var(--color-surface)",
        raised: "var(--color-raised)",
        line: "var(--color-line)",
        indigo: "var(--color-indigo)",
        glow: "var(--color-glow)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
        registered: "var(--color-registered)",
        "not-found": "var(--color-not-found)",
        expired: "var(--color-expired)",
        report: "var(--color-report)",
      },
      borderRadius: {
        sm: "12px",   // buttons, inputs, search bar
        md: "16px",   // cards, list rows, result banner
        lg: "24px",   // bottom bar, bottom sheets
        xl: "14px",   // scan-frame corners
        pill: "999px",
      },
      fontSize: {
        display: ["32px", { lineHeight: "40px", fontWeight: "800" }],
        title: ["22px", { lineHeight: "28px", fontWeight: "700" }],
        section: ["18px", { lineHeight: "24px", fontWeight: "800" }],
        body: ["16px", { lineHeight: "24px", fontWeight: "500" }],
        label: ["14px", { lineHeight: "20px", fontWeight: "700" }],
        caption: ["13px", { lineHeight: "18px", fontWeight: "500" }],
        "micro": ["11px", { lineHeight: "16px", fontWeight: "500", letterSpacing: "0.06em" }],
        "reg-no": ["18px", { lineHeight: "22px", fontWeight: "500", fontFamily: "var(--font-mono)" }],
      },
      spacing: {
        // base 4px scale: 4, 8, 12, 16, 24, 32, 48 (tailwind defaults cover these)
      },
      minHeight: {
        touch: "48px",
      },
      animation: {
        "sweep": "sweep 1.6s linear infinite",
        "shimmer": "shimmer 2s infinite",
        "fade-up": "fadeUp 250ms ease-out forwards",
      },
      keyframes: {
        sweep: {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(120%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
