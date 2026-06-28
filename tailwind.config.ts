import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1280px" } },
    extend: {
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body:    ["DM Sans", "system-ui", "sans-serif"],
        sans:    ["DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        /* Raw palette */
        charcoal: "hsl(var(--color-charcoal))",
        teal:     "hsl(var(--color-teal))",
        mustard:  "hsl(var(--color-mustard))",
        cream:    "hsl(var(--color-cream))",

        /* Semantic tokens  -  use these in components */
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        none:    "0",
        sm:      "2px",
        DEFAULT: "2px",
        md:      "4px",
        lg:      "4px",
        xl:      "4px",
        "2xl":   "4px",
        full:    "9999px",
      },
      boxShadow: {
        sm:           "var(--shadow-sm)",
        md:           "var(--shadow-md)",
        lg:           "var(--shadow-lg)",
        card:         "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-expo":  "cubic-bezier(0.64, 0, 0.78, 0)",
      },
      transitionDuration: {
        micro:    "100ms",
        quick:    "200ms",
        standard: "300ms",
        medium:   "450ms",
        slow:     "650ms",
      },
      maxWidth: {
        "prose-narrow": "620px",
        "prose":        "680px",
        "prose-wide":   "720px",
        "container":    "1280px",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "marquee":        { from: { transform: "translateX(0)" }, to: { transform: "translateX(-100%)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "marquee":        "marquee 50s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
