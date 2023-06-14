/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "75px": "4.688rem",
        "180px": "11.25rem",
        "168px": "10.5rem",
        "18px": "18px",
        "50px": "50px",
        "72px": "72px",
      },
      colors: {
        secondary: "#E6E8F6",
        keinBlue: "#0320F8",
        magenta: "#E53368",
        purple: "#5333AB",
        cimen: "#999999",
        silver: "#E6E6E6",
        separatorColor: "#BFBFBF",
        white: "#FFFFFF",
        black: "#000000",
        bannerColor: "#E6E8F6",
        alteredSilverColor: "#C2C2C2",
        orange: "#F24822",
        greenColor: "#84EC00",
        editDivBackgroundColor: "#c7d1f31a"
      },
      borderWidth: {
        "3px": "3px",
      },
      borderRadius: {
        "20px": "20px",
        "10px": "10px",
      },

      boxShadow: {
        boxShadowBlack: "0em .125em .25em rgba(0, 0, 0, 0.25)",
      },
    },
    fontFamily: {
      helveticaDisplay: ["var(--helvetica-font-family)"],
      helveticaText: ["var(--helvetica-regular-font-family)"],
      suisseIntl: ["var(--suisse-font-family)"],
    },
  },
  plugins: [],
};
