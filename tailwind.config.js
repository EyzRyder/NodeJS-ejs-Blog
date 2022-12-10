/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{html,js,,ejs}",
    "./views/*.{html,js,ejs}",
    "./views/partials/**/*.{html,js,ejs}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
