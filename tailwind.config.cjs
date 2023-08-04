const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'project-base': '#1E4490',
        'text-base': '#999999',
        'background-page': '#F8FAFB',
        'table-gray': '#F5F5F5',
        // 'text-gray': '#CCCCCC',
      },
      fontFamily: {
        sans: ['Sarabun', ...defaultTheme.fontFamily.sans],
        // sans: ['Noto Sans Thai', ...defaultTheme.fontFamily.sans],
        // thai: ['"Noto Sans Thai"'],
      },
      backgroundImage: {
        ttm: "url('../src/assets/background_ttm.png')",
        ttm_login: "url('../src/assets/s.png')",
        logo: "url('../src/assets/logo.png')",
      },
      backgroundSize: {
        auto: 'auto',
        cover: 'cover',
        contain: 'contain',
        '50%': '50%',
        16: '4rem',
      },
      screens: {
        'xs': '375px',
        'sm': '540px',
        'md': '960px',
        'lg': '1140px',
        'xl': '1240px',
        '2xl': '1340px',
        '3xl': '1440px',
        '4xl': '1540px',
      },
      boxShadow: {
        'basic-green': '0px 0px 20px 5px rgba(52,199,89,0.3)',
        'basic-gray': '0px 5px 5px 5px #BDBDBD',
        'basic-red': '0px 0px 20px 5px rgba(248,158,152,0.5)',
        'basic': '0px 0px 12px 3px #0000000D',
        'small-blue': '0px 0px 12px 2px #63E5F0',
        'small-light-green': '0px 0px 12px 2px #6EF063',
        'small-red': '0px 0px 12px 2px #F06363',
        'select-box': '0px 0px 12px 3px #0000001A',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}
