const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      primary: colors.black,
      secondary: '#75756A',
      accent: '#F4F4E8',
      white: '#ffffff'
    },
    fontFamily: {
      script: ['La Luxes Script', ...defaultTheme.fontFamily.serif]
    },
    fontSize: {
      lg: '1.125rem',
      '2xl': '1.75rem',
      '6xl': '3.5rem',
      '8xl': '6.25rem',
      '9xl': '8rem'
    },
    extend: {
      fontFamily: {
        serif: ['La Luxes Serif', ...defaultTheme.fontFamily.serif]
      }
    }
  },
  plugins: []
}
