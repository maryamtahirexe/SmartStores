/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    colors: {
      primary: '#110626',
      highlight: '#e5a830',
      accent: '#317879',
    },
  },
  },
  plugins: [],
}

