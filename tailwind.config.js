module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**.tsx',
    './src/components/**/*.tsx',
    './src/layouts/**.tsx',
  ],
  mode: 'jit',
  purge: ['./src/**/*.{ts,tsx,js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'page-bg': '#272728',
        'left-bar-choose': '#8A57E2',
        'card-bg':'#191B1C',
        'input-content':'#3B3B3D',
        'purple-button':'#6c5dc7',
        'primary-button':'#218dd1',
        'gray-button':'#30373F',
        
        primary: {
          DEFAULT: '#218dd1',
          dark: '',
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
