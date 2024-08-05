/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        sunny: [
          "0 0 0.75rem LightGoldenRodYellow",
        ],
        blazing: [
          "0 0 0.75rem gold",
          "0 0 0.75rem orange"
        ]
      }
    }
  },
  plugins: [],
}