import { createTheme } from "@mui/material/styles";

// Custom font variables from layout.js
const headingFont = "var(--font-stack-sans-notch), sans-serif";
const bodyFont = "var(--font-outfit), sans-serif";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1100, // Increased from default 900px to 1100px so iPad Pro (1024px) falls under sm
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      //main: "#2F2E2E", 
      //mint: "#90F0FF",
      //  blue: "#6756E3",
      // blue: "#5662e3ff",
      // violet: "#7E3398",
      // pink: "#C55FCB",
      // redOrange: "#ED608A"
      // main: "#1D2340",
      // yellow: "#FFC100",
      // orange: "#FF700B",
      // red: "#FF1F4B",
      // pink: "#FF3DA4",
      // violet: "#8D45B4",
      // purple: "#4940CE",
      // blue1: "#0061D2",
      // blue2: "#0089D2",
      // green1: "#77C64B",
      // green2: "#038B61",
      main: "#1D2340",
      yellow: "#ffde7dff",
      orange: "#ffb34fff",
      red: "#ff5678ff",
      pink: "#FF3DA4",
      violet: "#a454cfff",
      darkViolet: "#7012a2ff",
      purple: "#4940CE",
      blue1: "#0462d5ff",
      blue2: "#00b6d6ff",
      green1: "#77C64B",
      green2: "#16bb86ff",



    },
    text: {
      primary: "#1D2340",
      secondary: "#64687E",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
      //lightMint: "#DDFAFF", 
      //lightBlue: "#E0E7FF",
      // lightBlue: "#C9DCFF",
      // lightViolet: "#E5DDF8",
      // //lightOrange: "#FEE7C1",
      // lightOrange: "#fad69bff",
      // lightYellow: "#fffbbfff",
      // lightGreen: "#caecc9ff",
      // lightRed: "#FFBCC9",
       lightBlue: "#C9DCFF",
      lightBlue2: "#adf3ffff",
      lightViolet: "#dbcef7ff",
      lightOrange: "#ffd48eff",
      lightYellow: "#ffefb4ff",
      lightGreen: "#caecc9ff",
      lightRed: "#FFBCC9",
    },
  },

  typography: {
    fontFamily: bodyFont,
    hero: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: "72pt",
      lineHeight: 1.2,
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
      fontSize: "24pt",
      lineHeight: 1.2,
    },
    h4: {
      fontFamily: bodyFont,
      fontWeight: 700,
      fontSize: "20pt",
    },
    h5: {
      fontFamily: bodyFont,
      fontWeight: 700,
      fontSize: "16pt",
    },
      body18bold: {
      fontFamily: bodyFont,
      fontSize: "18pt",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    body18med: {
      fontFamily: bodyFont,
      fontSize: "18pt",
      fontWeight: 500,
      lineHeight: 1.3,
    },
    body18reg: {
      fontFamily: bodyFont,
      fontSize: "18pt",
      fontWeight: 400,
      lineHeight: 1.3,
    },
      body16bold: {
      fontFamily: bodyFont,
      fontSize: "16pt",
      fontWeight: 700,
      lineHeight: 1.3,
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
    body14bold: {
      fontFamily: bodyFont,
      fontSize: "14pt",
      fontWeight: 700,
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
      lineHeight: 1.1,
    },
     body12reg: {
      fontFamily: bodyFont,
      fontSize: "14pt",
      fontWeight: 400,
      lineHeight: 1.1,
    },

    button: {
      textTransform: "uppercase",
      fontWeight: 600,
      fontFamily: bodyFont,
    },
  },

  mixins: {
    // sectionBox: {
    //   border:"2px solid #1D2340",
    //   borderRadius: "10px",
    //   boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    // },
    // homeBoxLeft: {
    //   borderBottom: "2px solid #1D2340",
    //   position: "absolute",
    //   top: 0,
    //   left: 0,
    //   width: "50vw",   
    //   height: "180px",   
    //   zIndex: 3,
    // },
    // homeTitleRight: {
    //   borderTop: "2px solid #1D2340",
    //   borderLeft: "2px solid #1D2340",
    //   borderTopLeftRadius: "120px",
    //   position: "absolute",
    //   top: 0,
    //   right: 0,
    //   width: "50vw",   
    //   height: "180px",   
    //   zIndex: 3,
    // },
    // homeBoxRight: {
    //   borderBottom: "2px solid #1D2340",
    //   position: "absolute",
    //   top: 0,
    //   right: 0,
    //   width: "50vw",   
    //   height: "180px",   
    //   zIndex: 3,
    // },
    // homeTitleLeft: {
    //   borderTop: "2px solid #1D2340",
    //   borderRight: "2px solid #1D2340",
    //   borderTopRightRadius: "120px",
    //   position: "absolute",
    //   top: 0,
    //   left: 0,
    //   width: "50vw",      
    //   height: "200px",
    //   zIndex: 3,
    // },
    homeBoxLeft: {
      position: "absolute",
            left: 0,
            top: 0,
            width: { xs: "100vw", md: "50%" },
            height: "100%",
            bgcolor: "transparent",
            zIndex: 1,
    },
    homeTitleRight: {
      position: "absolute",
            right: 0,
            top: 0,
            width: { xs: "100vw", md: "50%" },
            height: "100%",
            backgroundColor: "#FFFFFF",
            borderTop: "2px solid #1D2340",
            borderLeft: "2px solid #1D2340",
            borderTopLeftRadius: 120,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: { xs: "center", md: "flex-end" },
            px: { xs: 2, md: 6 },
            zIndex: 3,
    },
    homeBoxRight: {
      position: "absolute",
      right: 0,
      top: 0,
      width: { xs: "100vw", md: "50%" },
      height: "100%",
      bgcolor: "transparent",
      zIndex: 1,
    },
    homeTitleLeft: {
      position: "absolute",
            left: 0,
            top: 0,
            width: { xs: "100vw", md: "50%" },
            height: "100%",
            backgroundColor: "#FFFFFF",
            borderTop: "2px solid #1D2340",
            borderRight: "2px solid #1D2340",
            borderTopRightRadius: 120,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: { xs: "center", md: "flex-start" },
            px: { xs: 2, md: 6 },
            zIndex: 3,
    },
    bottomLineLeft: {
       position: "absolute",
          left: 0,
          bottom: 0,
          height: "2px",
          width: "100%",
          background: "#1D2340",
          opacity: { xs: 0, md: 1 }, 
          zIndex: 2
    },
    bottomLineRight: {
      position: "absolute",
          right: 0,
          bottom: 0,
          height: "2px",
          width: "100%",
          background: "#1D2340",
          opacity: { xs: 0, md: 1 }, 
          zIndex: 2
    },
  },

  shape: {
    borderRadius: 10,
    border: "2px solid #1D2340",

  },

  components: {

    MuiButton: {
      styleOverrides: {
        root: {
          px: 4,
          py: 1,
          color: "#FFFFFF",
          backgroundColor: "#1D2340",
          borderRadius: "8px",
          boxShadow: "0px 4px 4px rgba(0,0,0,0.15)",
          transition: "box-shadow 0.3s ease",
          transition: "0.25s ease",

          "&:hover": {
            boxShadow: "0px 6px 6px rgba(0,0,0,0.20)",
            backgroundColor: "##0061D2",
            transform: "scale(1.1)",
             cursor: "pointer",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          border:"2px solid #1D2340",
          borderRadius: 4,
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        },
      },
    },

    // MuiInput: {
    //   styleOverrides: {
    //     root: {
    //       border: "2px solid #2F2E2E",
    //       borderRadius: "6px",
    //       boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    //     },
    //   },
    // },
    
// MuiInputBase: {
//       styleOverrides: {
//         root: {
//           border: "2px solid #2F2E2E",
//           borderRadius: "6px",
//           boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
//         },
//       },
//     },
  },
});

export default theme;
