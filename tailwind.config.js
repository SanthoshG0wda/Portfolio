/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: "#1A2332",
          darker: "#141B27",
          accent: "#3D6B8C",
          secondary: "#7A8A94",
          warm: "#724F3E",
          highlight: "#B1D2C8",
          card: "rgba(26, 35, 50, 0.65)",
          "card-hover": "rgba(32, 42, 60, 0.85)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "SF Mono", "monospace"],
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-left": "slide-in-left 0.7s ease-out forwards",
        "slide-right": "slide-in-right 0.7s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        float: "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        shimmer: "shimmer 2s infinite",
        "border-glow": "border-glow 3s ease-in-out infinite",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "border-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(61, 107, 140, 0.15)" },
          "50%": { boxShadow: "0 0 30px rgba(61, 107, 140, 0.25), 0 0 60px rgba(61, 107, 140, 0.1)" },
        },
      },
    },
  },
  plugins: [],
};
