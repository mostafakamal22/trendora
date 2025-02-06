/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kumbh: ["Kumbh Sans", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      colors: {
        primary: {
          default: "#ff7d1a",
          deep: "#FF6B00", // Deep Orange
          vibrant: "#FF8800", // Vibrant Orange
          sunset: "#FFA947", // Warm Sunset Orange
          peach: "#FFD6A5", // Soft Peach Orange
        },
        secondary: {
          charcoal: "#222222", // Dark Charcoal
          white: "#F8F8F8", // Soft White
          gray: "#A6A6A6", // Muted Gray
        },
        accent: {
          blue: "#007AFF", // Electric Blue
          gold: "#FFC107", // Gold Yellow
        },
        custom: {
          orange: "hsl(26.1, 100%, 54.5%)",
          fadeOrange: "hsl(25deg,100%,94%)",
        },
      },
    },
  },
  plugins: [],
};
