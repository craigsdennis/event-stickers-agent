/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F38020',
          dark: '#DC7816',
          light: '#FFAC42'
        }
      }
    }
	},
	plugins: [],
	future: {
	  enableBackgroundOpacity: true,
}
