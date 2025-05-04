/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'index.html',
    'src/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        'primary-dark': 'var(--color-primary-dark)',
      },
    },
  },
};