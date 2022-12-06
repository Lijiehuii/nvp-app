/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      padding: {
        "con": "10px",
        "bar": " 0 0 50px 0 ",
        "middle-card-text": "10px",
        "con-bar": "10px 10px 50px 10px",
        "list-item": "5px 10px"
      },
      margin: {
        "list-item": "0 12px 12px 0"
      },
      width: {
        "cate": "45vmin",
        "middle-card": "46vmin",
        "avatar": "30px",
      },
      height: {
        "cate": "35vmin",
        "middle-card-img": "25vmin",
        "avatar": "30px"
      },
      borderRadius: {
        "ten": "10px",
      },
      flex: {
        "middle-card": "0 0 46vmin",
        "user-pic": "0 0 32px"
      },
      backgroundColor: {
        "follow": "rgb(229, 76, 58)"
      }
    },
  },
  plugins: [],
}
