/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      neue: ['Bebas Neue', 'sans-serif'],
      kaushan: ['Kaushan Script', 'cursive', 'sans-serif'],
      title: ['Shadows Into Light', 'sans-serif'],
      body: ['Barlow Semi Condensed', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          100: '#cde8f4',
          300: '#449dd1',
          500: '#192bc2',
          700: '#150578',
          900: '#0e0e52',
        },
        second: {
          100: '#FFD657',
          300: '#FFC100',
          500: '#FFA200',
          700: '#FF9200',
          900: '#FF8200',
        },
        txt: {
          100: '#E8E5E3',
          300: '#D4D0CE',
          500: '#B6B2B1',
          700: '#7A7776',
          900: '#010101',
        },
        danger: '#f4425e',
        success: '#22c55e',
        warning: '#faff00',
      },
    },
  },
  plugins: [],
};
