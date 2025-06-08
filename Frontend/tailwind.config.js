/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins-thin': ['Poppins', 'sans-serif'],
        'poppins-light': ['Poppins', 'sans-serif'],
        'poppins-regular': ['Poppins', 'sans-serif'],
        'poppins-black': ['Poppins', 'sans-serif'],
        'belleza-regular': ['Belleza', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'], // Corrected
        'raleway': ['Raleway', 'sans-serif'], // Corrected
        'playball-regular': ['Playball', 'cursive'],
      },
      colors: {
        customBlue: "#073763",
        customGreen:"#368505",
        customOrange:"#E3902F",
        customRed:"#D11A2A",
        customColor:'#1c7e80'
      },
    },
  },
  plugins: [],
}