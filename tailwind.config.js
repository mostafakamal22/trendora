/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        kumbh: ["Kumbh Sans", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      colors: {
        primary: {
          default: "#ff7d1a",
          deep: "#FF6B00",
          vibrant: "#FF8800",
          sunset: "#FFA947",
          peach: "#FFD6A5",
        },
        secondary: {
          charcoal: "#222222",
          white: "#F8F8F8",
          gray: "#A6A6A6",
        },
        accent: {
          blue: "#007AFF",
          gold: "#FFC107",
        },
        custom: {
          orange: "hsl(26.1, 100%, 54.5%)",
          fadeOrange: "hsl(25deg,100%,94%)",
        },
      },
      keyframes: {
        overlayShow: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        contentShow: {
          "0%": { opacity: 0, transform: "translate(-50%, -45%)" },
          "100%": { opacity: 1, transform: "translate(-50%, -50%)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    flowbite.plugin(),
  ],
};
