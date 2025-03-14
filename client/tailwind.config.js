/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
      inter:['Inter'],
      space :['Space Grotesk']
      },
      colors:{
        'primary': '#6009ed'
      }
    },
  },
  plugins: [],
};
