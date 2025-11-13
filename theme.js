import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2F2E2E",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#EDFCFF",
      contrastText: "#2F2E2E",
    },
    text: {
      primary: "#2F2E2E",
      secondary: "#565656",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
      mint: "#C1FCFF",
      footer: "#EDFCFF",
    },
  },

  typography: {
    fontFamily: "var(--font-quicksand), Arial, sans-serif",

    h1: {
      fontFamily:
        "var(--font-stack-sans-notch), var(--font-quicksand), sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily:
        "var(--font-stack-sans-notch), var(--font-quicksand), sans-serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily:
        "var(--font-stack-sans-notch), var(--font-quicksand), sans-serif",
      fontWeight: 500,
    },

    body1: {
      fontSize: "16px",
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

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "0px 4px 4px rgba(0,0,0,0.15)",
          "&:hover": {
            boxShadow: "0px 6px 6px rgba(0,0,0,0.2)",
          },
        },
      },
    },
  },
});

export default theme;
