/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "../../packages/app/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        whatsapp: {
          primary: '#25D366',
          dark: '#075E54',
          bgLight: '#FFFFFF',
          bgDark: '#111B21',
          bubbleLight: '#DCF8C6',
          bubbleDark: '#005C4B'
        }
      }
    },
  },
  plugins: [],
};
