/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter"],
      },
      colors: {
        primary: "#9BFF00",
        secondary: "#DBFD51",
        text: "#FFFFFF",
        lightGray: "#696966",
      },
    },
  },
  plugins: [],
};
