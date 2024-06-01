/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#001f3f",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".hide-scrollbar": {
          /* For Webkit browsers (Chrome, Safari) */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          /* For Internet Explorer and Edge */
          "-ms-overflow-style": "none",
          /* For Firefox */
          "scrollbar-width": "none",
        },
      });
    },
  ],
};
