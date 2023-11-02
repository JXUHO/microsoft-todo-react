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
        "ms-bg-border": "#e1dfdd",
        "ms-scrollbar": "#8a8886",
        "ms-light-text": "#605E5C",
        "ms-input-hover": "#edebe9",
        "ms-active-tertiary": "#f3f2f1",
        "ms-warning": "#a80000",
      },
      height: {
        18: "4.5rem",
        2.1: "2.1rem",
      },
      minWidth: {
        100: "100px",
      },
      minHeight: {
        52: "52px",
      },
      animation: {
        rotate90: "clock90 1s",
        expand: "expand 0.25s forwards",
        slideFadeDown100: "slideFadeDown100 250ms forwards",
        slideFadeDown5: "slideFadeDown5 200ms forwards",
        checkAnimationBase: "checkAnimationBase 100ms",
        fillAnimation: "fillAnimation 100ms",
        fadeFill: "fadeFill 180ms"
      },
      keyframes: {
        clock90: {
          "0%": {
            transform: "rotate(0deg)" /* Start with no rotation */,
          },
          "100%": {
            transform:
              "rotate(90deg)" /* Rotate 360 degrees (one full rotation) */,
          },
        },
        expand: {
          "0%": {
            height: "0%",
          },
          "100%": {
            height: "100%",
          },
        },
        slideFadeDown100: {
          "0%": {
            transform: "translate3d(0, -100%, 0)",
            opacity: "0",
          },
          "100%": {
            transform: "translate3d(0, 0, 0)",
            opacity: "1",
          },
        },
        slideFadeDown5: {
          "0%": {
            transform: "translate3d(0, -5%, 0)",
            opacity: "0",
          },
          "50%": {
            transform: "translate3d(0, -1%, 0)",
            opacity: "0.8",
          },
          "100%": {
            transform: "translate3d(0, 0, 0)",
            opacity: "1",
          },
        },
        checkAnimationBase: {
          "0%": {
            transform: "scale(0.4)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        fillAnimation: {
          "0%": {
            opacity: "0",
            transform: "scale(0.4)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        fadeFill: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "0.4"
          },
        },
      },
      width: {
        divider: "calc(100% - 25px)",
        100: "25rem",
        100.1: "25.1rem",
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
};
