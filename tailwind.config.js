/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      primary: ['OpenSans', 'sans-serif'],
      secondary: ['Lato', 'sans-serif']
    },
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
