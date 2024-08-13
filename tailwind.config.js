/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "generic-white-bg": "#f6f6f6",
        "generic-white": "#fff",
        whitesmoke: "#efefef",
        "dark-300": "#727272",
        "dark-500": "#1c1c1c",
        "primary-500": "#0359e0",
        "primary-50": "#F2F6FD",
        "primary-100": "#c2d7f7",
        "dark-400": "#474747",
        "dark-100": "#c8c8c8",
        "dark-50": "#EFEFEF",
        "primary-50": "#f2f6fd",
        "status-danger-500": "#CB2E27",
        "status-warining-500": "#FFAD0D",
        "status-info-500": "#0C6FBF",
        "status-danger-50": "#FCF4F4",
        "status-warining-50": "#FFFAF2",
        "status-info-50": "#F2F7FB",
        "status-success-500": "#2A7E2E",
      },
      spacing: {},
      fontFamily: {
        "body-b1-regular": "Inter",
      },
    },
    fontSize: {
      base: "1rem",
      xl: "1.25rem",
      smi: "0.813rem",
      inherit: "inherit",
    },
  },
};
