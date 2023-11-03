const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./**/*.js"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        body: "#f9f9fa",
      },
      fontSize: {
        sm: "0.8125rem",
        'xxs': '10px',
      },
      opacity: {
        "80": "0.80",
      },
      borderRadius: {
        xl: "2rem",
      },
      boxShadow: {
        xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
        outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      }
    },
  },
  variants: {
    float: ["responsive", "direction"],
    margin: ["responsive", "direction"],
    padding: ["responsive", "direction"],
    textAlign: ["responsive", "direction"],
    inset: ["responsive", "direction"],
    transformOrigin: ["responsive", "direction"],
    borderRadius: ["responsive", "direction"],
    translate: ["responsive", "direction"],
    backgroundColor: ["dark"],
    borderColor: ["dark"],
    textColor: ["dark"],
    boxShadow: ["dark"],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-dir")(),
  ],
};
