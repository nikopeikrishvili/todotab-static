/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        'default-in-dark': 'rgb(125 211 252)'
      }
    },
  },
  plugins: [],
  darkMode:'selector'
}

