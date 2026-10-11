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
        serif: ["var(--font-serif)", "Cormorant Garamond", "Playfair Display", "Didot", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        'editorial': '0.18em',
        'widest-plus': '0.28em',
        'condensed': '-0.02em',
      },
      colors: {
        obsidian: {
          DEFAULT: "#0C0C0D",
          pure: "#080809",
          soft: "#111113",
        },
        charcoal: {
          950: "#101012",
          900: "#141416",
          850: "#18181B",
          800: "#1E1E22",
          700: "#2B2B31",
          600: "#3D3D45",
        },
        bone: {
          50: "#FFFFFF",
          100: "#FAF8F5",
          200: "#F3EFE8",
          300: "#E6E0D4",
          400: "#C9C2B4",
          500: "#9C9586",
          600: "#706B5F",
        },
        brass: {
          300: "#E5CCA6",
          400: "#D4B688",
          500: "#C5A880",
          600: "#AA8D62",
          700: "#866D46",
        },
        luxury: {
          border: "#242321",
          divider: "#1A1918",
          card: "#131315",
          hover: "#1A1A1E",
          gold: "#C5A880",
          badge: "#222120",
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
