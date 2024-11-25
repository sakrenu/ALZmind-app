// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ultraviolet: '#5F599A',   // A rich purple
        africanviolet: '#877BB0', // A lighter violet shade
        periwinkle: '#B7B1D5',    // A soft, pastel purple
        lavender: '#E6E6FA',      // A delicate lavender tone
        deepviolet: '#373784',    // A darker violet tone
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

