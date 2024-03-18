/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      // add fonts that would look great for this app
      sans: ["Inter", "Helvetica", "sans-serif"],
      serif: ["Merriweather", "serif"],
      tahoma: ["Tahoma", "sans-serif"],
      verdana: ["Verdana", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
