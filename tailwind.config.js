/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    fontSize: {
      xs: '.8rem',
      sm: '1.1rem',
      base: '1.3rem',
      xl: '1.6rem',
      '2xl': '1.8rem',
      '3xl': '2rem',
      '4xl': '3rem',
      '5xl': '4rem',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
