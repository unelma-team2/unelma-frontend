"use client"

import { createTheme } from "@mui/material/styles"

// Custom font variables
const headingFont = "var(--font-stack-sans-notch), sans-serif"
const bodyFont = "var(--font-outfit), sans-serif"

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
    },

    section: {
      home: {
        main: "#d0478bff",
        vibrant: "#FF0080",
        pastel: "#FF88CC",
        soft: "#FFBBDD",
        muted: "#AA5577",
      },

      about: {
        main: "#8E24AA",
        vibrant: "#FF00FF",
        pastel: "#FF88FF",
        soft: "#FFBBFF",
        muted: "#AA55AA",
      },

      services: {
        main: "#5E35B1",
        vibrant: "#8000FF",
        pastel: "#CC88FF",
        soft: "#DDBBFF",
        muted: "#7755AA",
      },

      products: {
        main: "#3949AB",
        vibrant: "#0000FF",
        pastel: "#8888FF",
        soft: "#BBBBFF",
        muted: "#5555AA",
      },

      shopOrder: {
        main: "#1E88E5",
        vibrant: "#0080FF",
        pastel: "#88CCFF",
        soft: "#BBDDFF",
        muted: "#5577AA",
      },

      caseStudies: {
        main: "#26C6DA",
        vibrant: "#00FFFF",
        pastel: "#88FFFF",
        soft: "#BBFFFF",
        muted: "#55AAAA",
      },

      feedback: {
        main: "#43A047",
        vibrant: "#00FF00",
        pastel: "#88FF88",
        soft: "#BBFFBB",
        muted: "#55AA55",
      },

      blog: {
        main: "#FFEB3B",
        vibrant: "#FFFF00",
        pastel: "#FFFF88",
        soft: "#FFFFBB",
        muted: "#AAAA55",
      },

      careers: {
        main: "#FB8C00",
        vibrant: "#FF8000",
        pastel: "#FFCC88",
        soft: "#FFDDBB",
        muted: "#AA7755",
      },

      contact: {
        main: "#E53935",
        vibrant: "#FF0000",
        pastel: "#FF8888",
        soft: "#FFBBBB",
        muted: "#AA5555",
      },
    },

    text: {
      primary: "#1D2340",
      secondary: "#64687E",
      tertiary: "#a0a3b8ff",
      contrast: "#FFFFFF",
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

  custom: {
    section: {
      home: {
        main: "#d0478bff",
        vibrant: "#FF0080",
        pastel: "#FF88CC",
        soft: "#FFBBDD",
        muted: "#AA5577",
      }, // MAGENTA

      about: {
        main: "#8E24AA",
        vibrant: "#FF00FF",
        pastel: "#FF88FF",
        soft: "#FFBBFF",
        muted: "#AA55AA",
      }, // VIOLET

      services: {
        main: "#5E35B1",
        vibrant: "#8000FF",
        pastel: "#CC88FF",
        soft: "#DDBBFF",
        muted: "#7755AA",
      }, // PURPLE

      products: {
        main: "#3949AB",
        vibrant: "#0000FF",
        pastel: "#8888FF",
        soft: "#BBBBFF",
        muted: "#5555AA",
      }, // BLUE

      shopOrder: {
        main: "#1E88E5",
        vibrant: "#0080FF",
        pastel: "#88CCFF",
        soft: "#BBDDFF",
        muted: "#5577AA",
      }, // LIGHT BLUE

      caseStudies: {
        main: "#26C6DA",
        vibrant: "#00FFFF",
        pastel: "#88FFFF",
        soft: "#BBFFFF",
        muted: "#55AAAA",
      }, // CYAN

      feedback: {
        main: "#43A047",
        vibrant: "#00FF00",
        pastel: "#88FF88",
        soft: "#BBFFBB",
        muted: "#55AA55",
      }, // GREEN

      blog: {
        main: "#FFEB3B",
        vibrant: "#FFFF00",
        pastel: "#FFFF88",
        soft: "#FFFFBB",
        muted: "#AAAA55",
      }, // YELLOW

      careers: {
        main: "#FB8C00",
        vibrant: "#FF8000",
        pastel: "#FFCC88",
        soft: "#FFDDBB",
        muted: "#AA7755",
      }, // ORANGE

      contact: {
        main: "#E53935",
        vibrant: "#FF0000",
        pastel: "#FF8888",
        soft: "#FFBBBB",
        muted: "#AA5555",
      }, // RED
    },
  },

  typography: {
    fontFamily: bodyFont,

  /*  h2: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: {
        xs: "2rem", // 32px
        sm: "2.25rem", // 36px
        md: "2.67rem", // ~43px (32pt target)
      },
      lineHeight: 1.2,
      letterSpacing: "-0.005em",
    },

    h4: {
      fontFamily: bodyFont,
      fontWeight: 600,
      fontSize: {
        xs: "1.25rem", // 20px
        sm: "1.5rem", // 24px
        md: "1.67rem", // ~27px (20pt target)
      },
      lineHeight: 1.3,
    },

    body14reg: {
      fontFamily: bodyFont,
      fontWeight: 400,
      fontSize: {
        xs: "0.875rem", // 14px
        sm: "1rem", // 16px
        md: "1.17rem", // ~19px (14pt target)
      },
      lineHeight: 1.5,
    },

    bodyreg12: {
      fontFamily: bodyFont,
      fontWeight: 400,
      fontSize: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        md: "1rem", // 16px (12pt target)
      },
      lineHeight: 1.5,
    }, */

    headingFont_XL_Hero: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: {
        xs: "3.5rem", // ~56px
        sm: "4.5rem", // ~72px
        md: "6rem", // 96px (72pt target)
      },
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
    },

    headingFont_L: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: {
        xs: "3rem", // ~48px
        sm: "4rem", // ~64px
        md: "5.33rem", // ~85px (64pt target)
      },
      lineHeight: 1.12,
      letterSpacing: "-0.015em",
    },

    headingFont_M: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: {
        xs: "2.25rem", // ~36px
        sm: "3rem", // ~48px
        md: "4rem", // 64px (48pt target)
      },
      lineHeight: 1.15,
      letterSpacing: "-0.01em",
    },

    headingFont_S: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: {
        xs: "1.75rem", // ~28px
        sm: "2rem", // ~32px
        md: "2.67rem", // ~43px (32pt target)
      },
      lineHeight: 1.2,
      letterSpacing: "-0.005em",
    },

    bodyFontTitle_XL: {
      fontFamily: bodyFont,
      fontWeight: 700,
      fontSize: {
       fontSize: {
        xs: "2.25rem", // 36px
        sm: "2.5rem",  // 40px
        md: "2.75rem", // 44px
      },
      },
      lineHeight: 1.3,
    },

     bodyFontTitle_L: {
      fontFamily: bodyFont,
      fontWeight: 600,
      fontSize: {
        xs: "1.5rem", // ~24px
        sm: "1.75rem", // ~28px
        md: "2rem", // 32px (24pt target)
      },
      lineHeight: 1.3,
    },

    bodyFontTitle_M_Card: {
      fontFamily: bodyFont,
      fontWeight: 700,
      fontSize: {
        xs: "1.25rem", // ~20px
        sm: "1.5rem", // ~24px
        md: "1.67rem", // ~27px (20pt target)
      },
      lineHeight: 1.3,
    },

    bodyFontTitle_S: {
      fontFamily: bodyFont,
      fontWeight: 600,
      fontSize: {
        xs: "1rem", // 16px
        sm: "1.125rem", // ~18px
        md: "1.33rem", // ~21px (16pt target)
      },
      lineHeight: 1.3,
    },

    bodyFont_XL: {
      fontFamily: bodyFont,
      fontWeight: 400,
      fontSize: {
        xs: "1.125rem", // ~18px
        sm: "1.25rem", // ~20px
        md: "1.5rem", // 24px (18pt target)
      },
      lineHeight: 1.3,
    },

    bodyFont_L: {
      fontFamily: bodyFont,
      fontWeight: 500,
      fontSize: {
        xs: "1rem", // 16px
        sm: "1.125rem", // ~18px
        md: "1.33rem", // ~21px (16pt target)
      },
      lineHeight: 1.2,
    },

    bodyFont_M: {
      fontFamily: bodyFont,
      fontWeight: 500,
      fontSize: {
        xs: "0.875rem", // ~14px
        sm: "1rem", // 16px
        md: "1.17rem", // ~19px (14pt target)
      },
      lineHeight: 1.2,
    },

    bodyFont_S: {
      fontFamily: bodyFont,
      fontWeight: 500,
      fontSize: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // ~14px
        md: "1rem", // 16px (12pt target)
      },
      lineHeight: 1.3,
    },

    bodyFont_XS_Label: {
      fontFamily: bodyFont,
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      fontSize: {
        xs: "0.625rem", // 10px
        sm: "0.75rem", // 12px
        md: "0.83rem", // ~13px (10pt target)
      },
      lineHeight: 1.1,
    },

    button: {
      fontFamily: bodyFont,
      fontWeight: 600,
      fontSize: {
        xs: "0.875rem", // ~14px
        sm: "1rem", // 16px
        md: "1.17rem", // ~19px (14pt)
      },
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      lineHeight: 1.2,
    },
  },

  mixins: {
    sectionSpacing: {
      mt: { xs: 12, sm: 14, md: 20 },
      mb: { xs: 8, sm: 10, md: 20 },
    },

    sectionContentSpacing: {
      py: { xs: 2, md: 0 },
      px: { xs: 2, md: 4 },
      maxWidth: "1200px",
      mx: "auto",
      mt: { xs: 12, sm: 15, md: 20},
      mb: { xs: 8, sm: 10, md: 20},
    },

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
      pb: { xs: 3, md: 4 },
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
      alignItems: "center",
      justifyContent: { xs: "center", md: "flex-start" },
      px: { xs: 2, md: 6 },
      zIndex: 3,
    },
    // homeTitleLeft: {
    //   position: "absolute",
    //   left: 0,
    //   top: 0,
    //   width: { xs: "100vw", md: "50%" },
    //   height: "100%",
    //   backgroundColor: "#FFFFFF",
    //   borderTop: "2px solid #1D2340",
    //   borderRight: "2px solid #1D2340",
    //   borderTopRightRadius: 120,
    //   display: "flex",
    //   alignItems: "flex-end",
    //   justifyContent: { xs: "center", md: "flex-start" },
    //   px: { xs: 2, md: 6 },
    //   pb: { xs: 3, md: 4 },
    //   zIndex: 3,
    // },
    bottomLineLeft: {
      position: "absolute",
      left: 0,
      bottom: 0,
      height: "2px",
      width: "100%",
      background: "#1D2340",
      opacity: { xs: 0, md: 1 },
      zIndex: 2,
    },
    bottomLineRight: {
      position: "absolute",
      right: 0,
      bottom: 0,
      height: "2px",
      width: "100%",
      background: "#1D2340",
      opacity: { xs: 0, md: 1 },
      zIndex: 2,
    },
    borderStyle: {
      border: "2px solid #1D2340",
    },
    shapeStyle: {
      borderRadius: 10,
      border: "2px solid #1D2340",
      boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
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
          border: "2px solid #1D2340",
          borderRadius: 8,
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.07)",
            color: "#0000FF",
            backgroundColor: "#BBBBFF",
            border: "2px solid #0000FF",
            cursor: "pointer",
            boxShadow: "-2px -1px 0px #0000FF, -4px -2px 0px #8888FF",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "2px solid #1D2340",
          borderRadius: 2,
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "1.125rem",
          fontWeight: 700,
          textTransform: "none",
          transition: "transform 0.25s ease",
          "&:hover": {
            color:"#FF8000",

            transform: "scale(1.05)",
          },
          "&.Mui-selected": {
            color: "#FF8000",

          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 6,
          backgroundColor: theme.palette.background.paper,
          border: "2px solid #1D2340",
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #0000FF",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "2px solidd #0000FF",
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
          color: "#8E24AA",
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
            transform: "scale(1.05)",
            textDecoration: "none",
            color: "#0000FF",
          },
        }),
      },
    },


     MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.25s ease",
        },
      },
      variants: [
        {
          props: { color: "arrowButton" },
          style: {
            color: "#1D2340",
            border: "2px solid #1D2340",
            backgroundColor: "#FFFFFF",
            borderRadius: "50%",
            width: 60,
            height: 60,
            boxShadow: "0px 4px 4px rgba(0,0,0,0.15)",
            "&:hover": {
              boxShadow: "0px 6px 6px rgba(0,0,0,0.2)",
              backgroundColor:"#BBBBFF",
              border: "2px solid #1D2340",
              color: "#0000FF",
              transform: "scale(1.1)",
            },
          },
        },


    {
      props: { color: "socialButton" },
       style: ({ theme }) => ({
            color: "#1D2340",
            backgroundColor: "#BBBBFF",
            borderRadius: "50%",
            border: "2px solid #1D2340",
            width: 70,
            height: 70,
            overflow: "hidden",
            padding: 0,
            transition: "all 0.25s ease",
            boxShadow:  "-2px -2px 0px #0000FF",
            cursor: "pointer",

            "&:hover": {
              boxShadow:
                "-4px -4px 0px  #0000FF",
              backgroundColor: "#8888FF",
              transform: "scale(1.1)",
              border: "2px solid #1D2340",
              cursor: "pointer",
            },
          }),
          },
      ],
    },
  }
})

export default theme
