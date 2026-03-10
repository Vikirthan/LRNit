/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryTechBlue: '#1E63FF',
        deepCircuitBlue: '#0B3D91',
        innovationPurple: '#A020F0',
        gradientPurple: '#7B2CBF',
        lightTechBackground: '#F5F7FF',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
