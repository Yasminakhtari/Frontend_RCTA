/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maskImage: {
        'gradient': 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
      },
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
      'blueRibbon': {
          '50': '#eef8ff',
          '100': '#d8eeff',
          '200': '#b9e0ff',
          '300': '#89cfff',
          '400': '#52b4ff',
          '500': '#2a91ff',
          '600': '#0d6efd',
          '700': '#0c5ae9',
          '800': '#1149bc',
          '900': '#144194',
          '950': '#11295a',
        },
    
      },
      animation: {
        scrollUp: 'scrollUp 23s linear infinite',
        scrollDown: 'scrollDown 50s linear infinite',
      },
      keyframes: {
        scrollUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        scrollDown: {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' },
        },

      },
      screens: {
        sm: '64px', // Mobile
        md: '768px', // Tablet
        lg: '1024px', // Desktop
      },

      
      
    },
  },
  plugins: [
    function({ addUtilities }) { const newUtilities = { '.mask-gradient-to-bottom': { 'mask-image': 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)', }, }; addUtilities(newUtilities, ['responsive', 'hover']); }
  ],
}

