import { createTheme } from "@mui/material";

const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#2B2B2B",
    },
    secondary: {
      main: "#2B2B2B",
    },
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

export const Theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1780,
    },
  },
});
