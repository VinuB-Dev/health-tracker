module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'login-page': "url('/src/images/pexels-pixabay-40751.jpg')",
        'home-page': "url('/src/images/pexels-neosiam-683198.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
