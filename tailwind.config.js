const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true,
      maxWidth: {
        xl: '1440px'
      },
      padding: '1rem'
    },
    fontFamily: {
      sans: [...defaultTheme.fontFamily.sans],
      script: ['La Luxes Script', ...defaultTheme.fontFamily.serif]
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
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
    require('@tailwindcss/forms'),
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '640px'
          },
          '@screen md': {
            maxWidth: '768px'
          },
          '@screen lg': {
            maxWidth: '1024px'
          },
          '@screen xl': {
            maxWidth: '1440px'
          }
        }
      })
    }
  ],
  safelist: [
    {
      pattern: /bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(700|900)/
    }
  ]
}
