/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10b981', // green for farming theme
        secondary: '#059669',
      }
    },
  },
  // 🟢 ADD THE PLUGIN HERE
  plugins: [
    require('@tailwindcss/typography'),
  ],
}