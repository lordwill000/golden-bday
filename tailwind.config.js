const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {

    fontFamily: {
      sans: [...defaultTheme.fontFamily.sans],
      script: ['La Luxes Script', ...defaultTheme.fontFamily.serif]
    },
    fontSize: {
      d5: '1.125rem',
      d4: '1.75rem',
      d3: '3.5rem',
      d2: '6.25rem',
      d1: '8rem'
    },
    extend: {
      colors: {
        primary: colors.black,
        secondary: '#75756A',
        accent: '#F4F4E8',
        white: '#ffffff'
      },
      fontFamily: {
        serif: ['La Luxes Serif', ...defaultTheme.fontFamily.serif]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
