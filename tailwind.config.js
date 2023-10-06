/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{html,js,vue}',
    './src/**/*.{html,js,vue}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        temper: {
          800: '#6357b0',
        },
      },
    },
  },
  plugins: [],
}

