/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ec5b13",
        "primary-hover": "#d44d0e",
        accent: "#E8590C",
        navy: {
          DEFAULT: "#0B1D51",
          900: "#0B1D51",
        },
        "navy-dark": "#0B1D51",
        "navy-custom": "#0B1D51",
        "nav-bg": "#0B1D51",
        brand: {
          navy: "#0B1D51",
          orange: "#E8590C",
          bg: "#F1F5F9",
          text: "#334155",
        },
        "background-light": "#F1F5F9",
        "background-dark": "#0B0F1E",
        "teal-accent": "#0D9488",
        "slate-custom": "#334155",
        "muted-custom": "#64748B",
        "border-custom": "#E2E8F0",
        "teal-custom": "#0D9488",
        "blue-custom": "#2563EB",
        "red-custom": "#DC2626",
      },
      fontFamily: {
        display: ["Public Sans", "sans-serif"],
        sans: ["Public Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
