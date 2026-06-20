/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          display: ['Sora', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        },
        colors: {
          careersense: {
            ink: '#2F4156',
            navy: '#2F4156',
            teal: '#567C8D',
            gold: '#567C8D',
            paper: '#F5EFEB',
            line: '#C8D9E6',
          },
        },
        animation: {
          'spin-slow': 'spin 3s linear infinite',
          'blob': 'blob 7s infinite',
        },
        keyframes: {
          blob: {
            '0%': { transform: 'translate(0px, 0px) scale(1)' },
            '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
            '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
            '100%': { transform: 'translate(0px, 0px) scale(1)' },
          },
        },
      },
    },
    plugins: [],
  }
