module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'green-primary': '#347378',
        'green-light': '#EEF6F6',
        'sandy': '#FFF9F3',
        'sand': '#F9EBDD',
        'orange': '#FCD8C9',
        'orange-dark': '#f3936d',
        'dark': '#444444',
        'grey': '#3C484B',
      },
    },
    transitionProperty: {
      horizontal: 'left, right',
      vertical: 'top, bottom',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      merienda: ['Merienda', 'cursive'],
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
