import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#33C0A4",
      contrastText: "#000000",
    },
    secondary: {
      main: "#FFBAF6",
      contrastText: "#000000",
    },
    text: {
      primary: "#000000",
      secondary: "#2F2E2E",
    },
    background: {
      default: "#FFFFFF",
      paper: "#EFEFEF",
    },
  },
  typography: {
    fontFamily: "'Quicksand', 'Roboto', 'Arial', sans-serif",
    h1: { fontSize: "3rem", fontWeight: 700 },
    h2: { fontSize: "2rem", fontWeight: 600 },
    h3: { fontSize: "1.5rem", fontWeight: 500 },
    body1: { fontSize: "1rem", fontWeight: 400 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          transition: "box-shadow 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default theme;
