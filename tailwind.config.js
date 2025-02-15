/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js}", "!./node_modules/**/*"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Stardos Stencil", "sans-serif"],
        paragraph: ["Rokkitt", "sans-serif"],
      },
      colors: {
        brand: {
          banner: "#335C67",
          main: "#E09F3E",
          cta: "#9E2A2B",
          mainhover: "#c98f37",
        },
      },
    },
  },
  plugins: [],
}
