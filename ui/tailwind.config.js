/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {

      },
      colors: {
        grayBg: "#F6F6F6",
        purpleBg: "#6055EE"
      }
    },
  },
  plugins: [],
}