import { createTheme } from "@mui/material/styles";

// Custom font variables from layout.js
const headingFont = "var(--font-stack-sans-notch), sans-serif";
const bodyFont = "var(--font-outfit), sans-serif";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2F2E2E", 
      mint: "#90F0FF",
    //  blue: "#6756E3",
      blue: "#5662e3ff",
      violet: "#7E3398",
      pink: "#C55FCB",
      redOrange: "#ED608A"
    },
    text: {
      primary: "#2F2E2E",
      secondary: "#6A6A6A",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
      lightMint: "#DDFAFF", 
      lightBlue: "#E0E7FF",
    },
  },

  typography: {
    fontFamily: bodyFont,
    hero: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: "92pt",
      lineHeight: 1.1,
    },
    h1: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: "54pt",
      lineHeight: 1.1,
    },
    h2: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: "38pt",
      lineHeight: 1.15,
    },
    h3: {
      fontFamily: bodyFont,
      fontWeight: 700,
      fontSize: "20pt",
      lineHeight: 1.2,
    },
    h4: {
      fontFamily: bodyFont,
      fontWeight: 700,
      fontSize: "18pt",
    },
    h5: {
      fontFamily: bodyFont,
      fontWeight: 700,
      fontSize: "16pt",
    },
    body16med: {
      fontFamily: bodyFont,
      fontSize: "16pt",
      fontWeight: 500,
      lineHeight: 1.3,
    },
    body16reg: {
      fontFamily: bodyFont,
      fontSize: "16pt",
      fontWeight: 400,
      lineHeight: 1.3,
    },
    body14med: {
      fontFamily: bodyFont,
      fontSize: "14pt",
      fontWeight: 500,
      lineHeight: 1.3,
    },
    body14reg: {
      fontFamily: bodyFont,
      fontSize: "14pt",
      fontWeight: 400,
      lineHeight: 1.3,
    },

    button: {
      textTransform: "uppercase",
      fontWeight: 600,
      fontFamily: bodyFont,
    },
  },

  mixins: {
    homeBoxLeft: {
      borderBottom: "2px solid #2F2E2E",
      position: "absolute",
      top: 0,
      left: 0,
      width: "50vw",   
      height: "180px",   
      zIndex: 3,
    },
    homeTitleRight: {
      borderTop: "2px solid #2F2E2E",
      borderLeft: "2px solid #2F2E2E",
      borderTopLeftRadius: "120px",
      position: "absolute",
      top: 0,
      right: 0,
      width: "50vw",   
      height: "180px",   
      zIndex: 3,
    },
    homeBoxRight: {
      borderBottom: "2px solid #2F2E2E",
      position: "absolute",
      top: 0,
      right: 0,
      width: "50vw",   
      height: "180px",   
      zIndex: 3,
    },
    homeTitleLeft: {
      borderTop: "2px solid #2F2E2E",
      borderRight: "2px solid #2F2E2E",
      borderTopRightRadius: "120px",
      position: "absolute",
      top: 0,
      left: 0,
      width: "50vw",      
      height: "200px",
      zIndex: 3,
    },
  },


  shape: {
    borderRadius: 10,
    border: "2px solid #2F2E2E",

  },

  components: {

    MuiButton: {
      styleOverrides: {
        root: {
          px: 4,
          py: 1,
          borderRadius: "8px",
          boxShadow: "0px 4px 4px rgba(0,0,0,0.15)",
          transition: "box-shadow 0.3s ease",
          transition: "0.25s ease",

          "&:hover": {
            boxShadow: "0px 6px 6px rgba(0,0,0,0.20)",
            backgroundColor: "#9D00A0",
            transform: "scale(1.1)",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          border:"2px solid #2F2E2E",
          borderRadius: "10px",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        },
      },
    },

    MuiInput: {
      styleOverrides: {
        root: {
          border: "2px solid #2F2E2E",
          borderRadius: "6px",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        },
      },
    },
    
MuiInputBase: {
      styleOverrides: {
        root: {
          border: "2px solid #2F2E2E",
          borderRadius: "6px",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

export default theme;
