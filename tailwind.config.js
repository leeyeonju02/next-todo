/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Next.js 기준 경로
  ],
  theme: {
    extend: {
      keyframes: {
        handwriting: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        handwriting: "handwriting 4s steps(40) infinite steps(40)",
      },
    },
  },
  plugins: [],
};
