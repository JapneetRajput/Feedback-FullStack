/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bluePrimary: "#36416A",
        greyPrimary: "#737373",
        greyLight: "#36416A26",
        greyLighter: "#36416A15",
        medium: "#00aeef",
      },
    },
  },
  plugins: [],
};
