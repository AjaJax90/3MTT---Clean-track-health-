/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#2e7d32', // simpler solid green
          light: '#e8f5e9',
          dark: '#1b5e20',
          warning: '#f57c00',
          danger: '#c62828',
        }
      }
    },
  },
  plugins: [],
}
