const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        highlight: "highlight 1s ease-in-out",
      },
      fontFamily: {
        headline: ["var(--font-roboto)", ...fontFamily.mono],
        ui: ["var(--font-inter)", ...fontFamily.sans],
      },
      keyframes: {
        highlight: {
          "0%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(-10deg)",
          },
          "75%": {
            transform: "rotate(10deg)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-debug-screens")],
};
