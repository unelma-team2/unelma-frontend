// theme.js
import { createTheme } from "@mui/material/styles";

const headingFont = "var(--font-stack-sans-notch), sans-serif";
const bodyFont = "var(--font-quicksand), sans-serif";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2F2E2E",
    },
    text: {
      primary: "#2F2E2E",
      secondary: "#6A6A6A",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
      mint: "#C1FCFF",
      footer: "#EDFCFF",
    },
  },

  typography: {
    fontFamily: bodyFont,

    h1: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: "64px", // Hero / Slogan
      lineHeight: 1.1,
    },
    h2: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: "48px",
      lineHeight: 1.15,
    },
    h3: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: "20px",
      lineHeight: 1.2,
    },
    h4: {
      fontFamily: headingFont,
      fontWeight: 500,
      fontSize: "16px",
    },
    body1: {
      fontFamily: bodyFont,
      fontSize: "16px",
      fontWeight: 400,
    },
    body2: {
      fontFamily: bodyFont,
      fontSize: "14px",
      fontWeight: 400,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },
});

export default theme;
