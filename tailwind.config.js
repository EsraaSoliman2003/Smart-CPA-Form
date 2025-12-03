/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2a1b17",
        secondary: "#5e4a42",
        accent: "#7b3b2e",
        accentDark: "#5b231a",
        white: "#ffffff",
        bgLight: "#f2e9e4",
        bgDark: "#300301",
      },
      boxShadow: {
        soft: "0_10px_20px_rgba(0,0,0,0.18)",
        hard: "0_14px_24px_rgba(91,35,26,0.25)",
        deep: "0_18px_28px_rgba(58,11,9,0.35)",
      },
      transitionProperty: {
        colors:
          "color, background-color, border-color, text-decoration-color, fill, stroke",
        width: "width",
      },
      transitionDuration: {
        fast: "200ms",
        normal: "300ms",
        slow: "500ms",
      },
    },
  },
  plugins: [],
};
