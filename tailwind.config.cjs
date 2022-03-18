module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./admin-panel/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
