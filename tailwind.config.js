/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'mine-shaft': {
        '50': '#f6f6f6',
        '100': '#e7e7e7',
        '200': '#d1d1d1',
        '300': '#b0b0b0',
        '400': '#888888',
        '500': '#6d6d6d',
        '600': '#5d5d5d',
        '700': '#4f4f4f',
        '800': '#454545',
        '900': '#3d3d3d',
        '950': '#2d2d2d',
      },
        'cyanAqua': {
        '50': '#ebfffe',
        '100': '#ceffff',
        '200': '#a2fdff',
        '300': '#63f9fd',
        '400': '#1debf4',
        '500': '#00ceda',
        '600': '#03a4b7',
        '700': '#0a8294',
        '800': '#126878',
        '900': '#145665',
        '950': '#063a46',
    },
      }
    },
  },
  plugins: [],
}

