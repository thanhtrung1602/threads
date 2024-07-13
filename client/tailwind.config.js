/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderColor: {
        "b-outline": "rgba(243, 245, 247, 0.15)",
        "bg-primary": "rgb(16, 16, 16);",
      },
      backgroundColor: {
        "bg-primary": "rgb(16, 16, 16);",
        "second-color": "rgb(24, 24, 24);",
        "custom-bgC": "rgba(255, 255, 255, .05)",
      },
      colors: {
        "custom-blue": "rgb(0, 149, 246)",
        "custom-red": "display-p3 1 0.18 0.25 / 1",
      },
      boxShadow: {
        boxCl:
          "0 0 12px 0 var(--barcelona-box-shadow-04), 0 0 0 48px var(--barcelona-secondary-background);",
      },
      width: {
        "calc-full-minus-46": "calc(100% - 46px)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "::-webkit-scrollbar": {
            width: "0px",
          },
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    },
  ],
};
