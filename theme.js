import { createTheme } from "@mui/material/styles";

// Custom font variables from layout.js
const headingFont = "var(--font-stack-sans-notch), sans-serif";
const bodyFont = "var(--font-outfit), sans-serif";

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
      lightMint: "#EDFCFF", 
      darkMint: "#C1FCFF",
    },
  },

  typography: {
    fontFamily: bodyFont,

    // Hero & main heading
    h1: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: "54px", // per style guide
      lineHeight: 1.1,
    },

    // Section titles
    h2: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: "38px",
      lineHeight: 1.15,
    },

    // Small section headers
    h3: {
      fontFamily: bodyFont,
      fontWeight: 700,
      fontSize: "20px",
      lineHeight: 1.2,
    },

    // H4 = medium text (16 pt medium)
    h4: {
      fontFamily: bodyFont,
      fontWeight: 600,
      fontSize: "16px",
    },

    // Body text 16pt
    body1: {
      fontFamily: bodyFont,
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: 1.3,
    },

    // Smaller body text 14pt
    body2: {
      fontFamily: bodyFont,
      fontSize: "14px",
      fontWeight: 500,
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
