/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "Open Sans", "Inter"],
        openSans: ["Open Sans", "Inter"],
        nunito: ["Nunito", "Open Sans", "Inter"],
      },
      animation: {
        appear: "appear .2s ease-in-out 1",
        appear2: "appear2 .2s ease-in-out 1",
      },
      colors: {
        grayBg: "#F6F6F6",
        purpleBg: "#6055EE",
        purpleBg: "#6055EE",
        greenish: "rgb(0, 255, 166)"
      },
    },
  },
  plugins: [],
};
