/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F3F3F3',
        dark: '#1A1A1A',
        text: '#111111',
        victory: '#3DA35D',
        sin: '#C44536',
        spiritual: '#4979C8',
        wisdom: '#E0B142',
        neutral: '#CFCFCF'
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}