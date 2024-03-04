/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily:{
      'sans':['JetBrains Mono', 'ui-sans-serif', 'system-ui'],
    },
    extend: {
      colors:{
        'default-in-dark': 'rgb(125 211 252)',
        'default-input-dark': '#454550',
      }
    },
  },
  plugins: [],
  darkMode:'selector'
}

