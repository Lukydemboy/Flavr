/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#009966",
        background: "#F6F7FB",
        pastel: {
          green: "#D6FFD3",
          purple: "#D0C4FF",
          yellow: "#FFF8BA",
          blue: "#C5E6FF",
        },
      },
      fontFamily: {
        "nunito-thin": ["Nunito_200ExtraLight"],
        "nunito-light": ["Nunito_300Light"],
        "nunito-regular": ["Nunito_400Regular"],
        "nunito-medium": ["Nunito_500Medium"],
        "nunito-semiBold": ["Nunito_600SemiBold"],
        "nunito-bold": ["Nunito_700Bold"],
        "nunito-extraBold": ["Nunito_800ExtraBold"],
        "nunito-black": ["Nunito_900Black"],
      },
    },
  },
  plugins: [],
};
