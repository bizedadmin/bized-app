/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
    "../../packages/app/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          1000: '#2a8af6',
        },
        purple: {
          1000: '#a853ba',
        },
        red: {
          1000: '#e92a67',
        },
        whatsapp: {
          primary: '#25D366',
          dark: '#075E54',
          bgLight: '#FFFFFF',
          bgDark: '#111B21',
          bubbleLight: '#DCF8C6',
          bubbleDark: '#005C4B'
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
