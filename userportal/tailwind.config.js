// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('/assets/images/bg.jpg')", // Path relative to the `public` folder
      },
      colors: {
        primary: "#191343",
        highlight: "#efc55f",
        highlightHover: "#f5c145",
        accent: "#317879",
      },
    },
  },
  plugins: [],
};
