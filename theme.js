import { createTheme } from "@mui/material/styles";

// Custom font variables from layout.js
const headingFont = "var(--font-stack-sans-notch), sans-serif";
const bodyFont = "var(--font-quicksand), sans-serif";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2F2E2E", // dark grey — main brand color
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#2F2E2E", // same tone (you can change later if needed)
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#2F2E2E",
      secondary: "#6A6A6A",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",

      // Section backgrounds per style guide
      mint: "#C1FCFF", // light mint (used in hero/sections)
      footer: "#EDFCFF", // footer background
    },
  },

  typography: {
    fontFamily: bodyFont,

    // Hero & main heading
    h1: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: "64px", // per style guide
      lineHeight: 1.1,
    },

    // Section titles
    h2: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: "48px",
      lineHeight: 1.15,
    },

    // Small section headers
    h3: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: "20px",
      lineHeight: 1.2,
    },

    // H4 = medium text (16 pt medium)
    h4: {
      fontFamily: headingFont,
      fontWeight: 500,
      fontSize: "16px",
    },

    // Body text 16pt
    body1: {
      fontFamily: bodyFont,
      fontSize: "16px",
      fontWeight: 400,
    },

    // Smaller body text 14pt
    body2: {
      fontFamily: bodyFont,
      fontSize: "14px",
      fontWeight: 400,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
      fontFamily: bodyFont,
    },
  },

  shape: {
    borderRadius: 10, // matches your cards & buttons style
  },

  components: {
    // Buttons per wireframe
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "0px 4px 4px rgba(0,0,0,0.15)",
          transition: "box-shadow 0.3s ease",

          "&:hover": {
            boxShadow: "0px 6px 6px rgba(0,0,0,0.20)",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

export default theme;
