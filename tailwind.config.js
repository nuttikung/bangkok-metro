/** @type {import('tailwindcss').Config} */
export default {
  // corePlugins: {
  //   preflight: false
  // },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'SUBWAY-ARL': '#761f21',
        'SUBWAY-BLUE': '#1964b7',
        'SUBWAY-DARK-GREEN': '#02817d',
        'SUBWAY-LIGHT-GREEN': '#76b729',
        'SUBWAY-GOLD': '#A58704',
        'SUBWAY-PURPLE': '#660066',
        'SUBWAY-RED-NORTH': '#E10506',
        'SUBWAY-RED-WEST': '#FD5353',
        'primary': '#3f48c1',
        'secondary': '#fdc500',
        'icon': '#202a3a'
      }
    },
  },
  plugins: [],
}

