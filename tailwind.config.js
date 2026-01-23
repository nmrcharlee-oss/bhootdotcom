/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'],
      },
      animation: {
        'blob': 'blob 7s infinite', // Faster animation
        'shine': 'shine 1.5s ease-out forwards', // Runs once, then stops
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        shine: {
          '0%': { transform: 'skewX(-15deg) translateX(-150%)' },
          '100%': { transform: 'skewX(-15deg) translateX(150%)' },
        }
      },
    },
  },
  plugins: [],
};
