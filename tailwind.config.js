// tailwind.config.js

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"], // Make sure paths are correct
  theme: {
    extend: {
      colors: {
        hmi: {
          background: "#1f2937", // gray-900
          block: "#2d3748",      // gray-800
          hover: {
            main: "#2563eb",     // blue-600
            settings: "#16a34a", // green-600
          },
        },
      },
    },
  },
  plugins: [],
};
