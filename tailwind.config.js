/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--primary))',
          600: 'rgb(var(--primary-600))',
          700: 'rgb(var(--primary-700))',
        },
        accent: 'rgb(var(--accent))',
        warning: 'rgb(var(--warning))',
        danger: 'rgb(var(--danger))',
        surface: 'rgb(var(--surface))',
        bg: 'rgb(var(--bg))',
      },
    },
  },
  plugins: [],
};
