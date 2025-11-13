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
    fontFamily: "'Quicksand', 'Arial', sans-serif",

    h1: {
      fontFamily: "'Stack Sans Notch', 'Quicksand', sans-serif",
      fontSize: "64px",
      fontWeight: 700,
      color: "#2F2E2E",
    },
    h2: {
      fontFamily: "'Stack Sans Notch', 'Quicksand', sans-serif",
      fontSize: "48px",
      fontWeight: 700,
      color: "#2F2E2E",
    },
    h3: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: "20px",
      fontWeight: 600,
      color: "#2F2E2E",
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
