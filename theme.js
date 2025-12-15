import { createTheme } from "@mui/material/styles";
import { color } from "framer-motion";

// Custom font variables
const headingFont = "var(--font-stack-sans-notch), sans-serif";
const bodyFont = "var(--font-outfit), sans-serif";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1100,
      lg: 1200,
      xl: 1536,
    },
  },

  palette: {
    primary: { 
      main: "#1D2340",
      magenta: { main: "#d0478bff" },   // HOME
      violet: { main: "#8E24AA" },      // ABOUT
      purple: { main: "#5E35B1" },  // SERVICES
      blue: { main: "#3949AB" },        // PRODUCTS
      lightBlue: { main: "#1E88E5" },   // ORDERING/SHOP
      cyan: { main: "#26C6DA" },        // CASE STUDIES
      green: { main: "#43A047" },       // FEEDBACK
      yellow: { main: "#FFEB3B" },      // BLOG
      orange: { main: "#FB8C00" },      // CAREER/INQUIRY
      red: { main: "#E53935" },          // CONTACT/FOOTER


      //violet: { main: "#AB47BC" },
      //deepViolet: { main: "#6A1B9A" },
      //greenCyan: { main: "#00ACC1" },
      //yellowGreen: { main: "#C0CA33" },
      //yellowOrange: { main: "#FDD835" },
      //redOrange: { main: "#F4511E" },
      magenta: "#FF0080",   // HOME
      violet: "#FF00FF",    // ABOUT
      purple: "#8000FF",    // SERVICES
      blue: "#0000FF",      // PRODUCTS
      dodgeBlue: "#0080FF", // ORDERING/SHOP
      cyan: "#00FFFF",      // CASE STUDIES
      green: "#00FF00",     // FEEDBACK
      yellow: "#FFFF00",    // BLOG
      orange: "#FF8000",    // CAREER/INQUIRY
      red: "#FF0000",       // CONTACT/FOOTER
      //limeGreen: "#80FF00",
      //springGreen: "#00FF80",
    },

    text: {
      primary: "#1D2340",
      secondary: "#64687E",
      tertiary: "#a0a3b8ff",
      contrastText: "#FFFFFF",
    },

    vibrant: {
      red: "#FF0000",
      orange: "#FF8000",
      yellow: "#FFFF00",
      limeGreen: "#80FF00",
      green: "#00FF00",
      springGreen: "#00FF80",
      cyan: "#00FFFF",
      dodgeBlue: "#0080FF",
      blue: "#0000FF",
      purple: "#8000FF",
      violet: "#FF00FF",
      magenta: "#FF0080",
    },

    pastel: {
      coral: "#FF8888",
      lightSalmon: "#FFCC88",
      paleYellow: "#FFFF88",
      paleGreen: "#CCFF88",
      paleTurquoise: "#88FF88",
      aquamarine: "#88FFCC",
      lightCyan: "#88FFFF",
      skyBlue: "#88CCFF",
      slateBlue: "#8888FF",
      mediumPurple: "#CC88FF",
      orchid: "#FF88FF",
      lightPink: "#FF88CC",
    },

    soft: {
      lightSalmonPink: "#FFBBBB",
      peach: "#FFDDBB",
      paleYellowSoft: "#FFFFBB",
      paleGreenSoft: "#DDFFBB",
      paleTurquoiseSoft: "#BBFFBB",
      lightSeaGreen: "#BBFFDD",
      lightCyanSoft: "#BBFFFF",
      lightSkyBlue: "#BBDDFF",
      lightSteelBlue: "#BBBBFF",
      lavender: "#DDBBFF",
      lightPinkSoft: "#FFBBFF",
      mistyRose: "#FFBBDD",
    },

    muted: {
      indianRed: "#AA5555",
      copper: "#AA7755",
      oliveDrab: "#AAAA55",
      darkOliveGreen: "#77AA55",
      forestGreen: "#55AA55",
      cadetBlue: "#55AA77",
      mediumAquamarine: "#55AAAA",
      lightSlateGray: "#5577AA",
      mediumSlateBlue: "#5555AA",
      slateBlueMuted: "#7755AA",
      mediumOrchid: "#AA55AA",
      rose: "#AA5577",
    },

    rainbowText: {
      red: { main: "#E53935" },
      redOrange: { main: "#F4511E" },
      orange: { main: "#FB8C00" },
      yellowOrange: { main: "#FDD835" },
      yellow: { main: "#FFEB3B" },
      yellowGreen: { main: "#C0CA33" },
      green: { main: "#43A047" },
      greenCyan: { main: "#00ACC1" },
      cyan: { main: "#26C6DA" },
      lightBlue: { main: "#1E88E5" },
      blue: { main: "#3949AB" },
      bluePurple: { main: "#5E35B1" },
      purple: { main: "#8E24AA" },
      violet: { main: "#AB47BC" },
      deepViolet: { main: "#6A1B9A" },
    },

    cloud: {
      yellowLight: "#ffde7dff",
      yellowBright: "#FFC100",
      orangeLight: "#ffb34fff",
      orangeBright: "#FF700B",
      redLight: "#ff5678ff",
      redBright: "#FF1F4B",
      redOrange: "#ED608A",
      pinkBright: "#FF3DA4",
      pinkViolet: "#C55FCB",
      darkViolet: "#7012a2ff",
      violetDark: "#7E3398",
      violet: "#a454cfff",
      violetMedium: "#8D45B4",
      purple: "#4940CE",
      blueSoft: "#6756E3",
      blue: "#5662e3ff",
      blueDark: "#0061D2",
      blueLight: "#0462d5ff",
      blueBright: "#0089D2",
      blueCyan: "#00b6d6ff",
      greenBright: "#77C64B",
      greenSoft: "#16bb86ff",
      greenDark: "#038B61",
      mint: "#90F0FF",
    },

    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
      lightBlue: "#C9DCFF",
      lightBlue2: "#adf3ffff",
      lightViolet: "#dbcef7ff",
      lightOrange: "#ffd48eff",
      lightYellow: "#ffefb4ff",
      lightGreen: "#caecc9ff",
      lightRed: "#FFBCC9",
      lightMint: "#DDFAFF",
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
    h1: { fontFamily: headingFont, fontWeight: 700, fontSize: "54pt", lineHeight: 1.1 },
    h2: { fontFamily: headingFont, fontWeight: 700, fontSize: "38pt", lineHeight: 1.15 },
    h3: { fontFamily: bodyFont, fontWeight: 700, fontSize: "24pt", lineHeight: 1.2 },
    h4: { fontFamily: bodyFont, fontWeight: 700, fontSize: "20pt" },
    h5: { fontFamily: bodyFont, fontWeight: 700, fontSize: "16pt" },
    body18bold: { fontFamily: bodyFont, fontSize: "18pt", fontWeight: 700, lineHeight: 1.3 },
    body18med: { fontFamily: bodyFont, fontSize: "18pt", fontWeight: 500, lineHeight: 1.3 },
    body18reg: { fontFamily: bodyFont, fontSize: "18pt", fontWeight: 400, lineHeight: 1.3 },
    body16bold: { fontFamily: bodyFont, fontSize: "16pt", fontWeight: 700, lineHeight: 1.3 },
    body16med: { fontFamily: bodyFont, fontSize: "16pt", fontWeight: 500, lineHeight: 1.3 },
    body16reg: { fontFamily: bodyFont, fontSize: "16pt", fontWeight: 400, lineHeight: 1.3 },
    body14bold: { fontFamily: bodyFont, fontSize: "14pt", fontWeight: 700, lineHeight: 1.3 },
    body14med: { fontFamily: bodyFont, fontSize: "14pt", fontWeight: 500, lineHeight: 1.3 },
    body14reg: { fontFamily: bodyFont, fontSize: "14pt", fontWeight: 400, lineHeight: 1.1 },
    body12reg: { fontFamily: bodyFont, fontSize: "14pt", fontWeight: 400, lineHeight: 1.1 },
    button: { textTransform: "uppercase", fontWeight: 600, fontFamily: bodyFont },
  },

  mixins: {
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
      zIndex: 1 
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
    borderStyle: {
      border: "2px solid #1D2340",
    },
    shapeStyle: { 
    borderRadius: 10, 
    border: "2px solid #1D2340",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
    },
  },



  

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          px: 4,
          py: 1,
          color: "#FFFFFF",
          backgroundColor: "#1D2340",
          borderRadius: 8,
          boxShadow: "0px 4px 4px rgba(0,0,0,0.15)",
          transition: "0.25s ease",
          "&:hover": {
            boxShadow: "0px 6px 6px rgba(0,0,0,0.2)",
            backgroundColor: "#0061D2",
            transform: "scale(1.1)",
            cursor: "pointer",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "2px solid #1D2340",
          borderRadius: 4,
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 6,
          backgroundColor: theme.palette.background.paper,
          border: "2px solid " + theme.palette.primary.main,
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "2px solid " + theme.palette.primary.blue || "#3949AB",
            borderRadius: 4,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "2px solid " + theme.palette.primary.blue || "#3949AB",
            borderRadius: 4,
          },
        }),
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          marginTop: theme.spacing(1),
          color: theme.palette.cloud.blueDark || theme.palette.primary.main,
          fontSize: "18px",
          fontWeight: 700,
          display: "inline-flex",
          alignItems: "center",
          gap: theme.spacing(0.5),
          transition: "transform 0.25s ease",
          cursor: "pointer",

          [theme.breakpoints.down("sm")]: {
            fontSize: "16px",
            alignItems: "flex-start",
            textAlign: "left",
          },

          [theme.breakpoints.up("md")]: {
            fontSize: "20px",
            textAlign: "center",
          },

          "&:hover": {
            transform: "scale(1.1)",
            textDecoration: "none",
          },
        }),
      },
    },

   
MuiIconButton: {
  styleOverrides: {
    root: ({ theme }) => ({
      //width: 100,
      //height: 100,
      //borderRadius: "50%",
      //border: `2px solid ${theme.palette.primary.main}`,
          // border: "2px solid #1D2340",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      cursor: "pointer",
      //transition: "transform 0.25s ease, box-shadow 0.25s ease",
      //margin: "0 auto 16px",
     // backgroundColor: theme.palette.background.lightYellow, // default
     // "&:hover": {
       // transform: "scale(1.08)",
      //  boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
    //  },
    }),
  },
  variants: [
    {
      props: { color: "arrowButton" },
      style: ({ theme }) => ({
        color: "#1D2340",
        backgroundColor: "#ffffff",
        borderRadius: "50%",
        width: 60,
        height: 60,
        boxShadow: "0px 4px 4px rgba(0,0,0,0.15)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      "&:hover": {
        transform: "scale(1.1)",
        boxShadow: "0px 6px 6px rgba(0,0,0,0.2)",
        color: "#26C6DA",
        backgroundColor: "#1D2340",
        border: "2px solid #1D2340",
      },
      }),
    },
    {
      props: { color: "blogIcon1" },
      style: ({ theme }) => ({
        backgroundColor: theme.palette.cloud.redBright,
        border: `2px solid ${theme.palette.primary.main}`,
        "&:hover": {
          transform: "scale(1.08)",
          boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
        },
      }),
    },
    {
      props: { color: "blogIcon2" },
      style: ({ theme }) => ({
        color: "#43A047",
        backgroundColor: "none",
        boxShadow: "none",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      "&:hover": {
        transform: "scale(1.1)",
        boxShadow: "0px 6px 6px rgba(0,0,0,0.2)",
        color: "#1D2340",
        backgroundColor: "#26C6DA",
        border: "2px solid #1D2340",
        borderRadius: "50%",
      },
      }),
    },
    {
      props: { color: "topButton" },
      style: ({ theme }) => ({
        color: "#1D2340",
        backgroundColor: "#ffffff",
        borderRadius: "50%",
        width: 60,
        height: 60,
        boxShadow: "0px 4px 4px rgba(0,0,0,0.15)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      "&:hover": {
        transform: "scale(1.1)",
        boxShadow: "0px 6px 6px rgba(0,0,0,0.2)",
        color: "#26C6DA",
        backgroundColor: "#1D2340",
        border: "2px solid #1D2340",
      },
      }),
    },
  ],
},
}});

export default theme;
