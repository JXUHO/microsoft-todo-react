/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        "ms-blue": "#2564cf",
        "ms-blue-hover": "#215aba",
        "ms-background": "#faf9f8",
        "ms-white-hover": "#f5f4f4",
        "ms-bg-shadow": "box-shadow: 0px 0.3px 0.9px rgba(0,0,0,0.1)",
        "ms-font-blue": "#2564cf",
        "ms-active-blue": "#eff6fc",
      },
      height: {
        18: "4.5rem",
      },
      minWidth: {
        100: "100px",
      },
      minHeight: {
        52: "52px"
      }
    },
  },
};
