/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#1AB3E6', // Lighter shade of primary
          DEFAULT: '#00A6D8', // Primary color
          dark: '#0089B3', // Darker shade of primary
        },
        secondary: {
          light: '#A5E3FB', // Lighter shade of secondary
          DEFAULT: '#8ED8F8', // Secondary color
          dark: '#6CCEEF', // Darker shade of secondary
        },
        accent: {
          DEFAULT: '#FF6B35', // Vibrant orange as accent
          dark: '#E85A2C', // Darker shade of accent
        }
      }
    },
  },
  plugins: [],
}