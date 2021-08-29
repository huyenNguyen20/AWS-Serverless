import { createTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createTheme({
  typography: {
    h1: {
      fontFamily: "Montserrat",
      weight: 300,
    },
    h2: {
      fontFamily: "Montserrat",
      weight: 300,
    },
    h3: {
      fontFamily: "Montserrat",
      weight: 300,
    },
    h4: {
      fontFamily: "Montserrat",
      weight: 300,
    },
    h5: {
      fontFamily: "Montserrat",
      weight: 300,
    },
    h6: {
      fontFamily: "Montserrat",
      weight: 300,
    },
    body1: {
      fontFamily: "Open Sans",
    },
    body2: {
      fontFamily: "Open Sans",
    },
    subtitle1: {
      fontFamily: "Open Sans",
    },
    subtitle2: {
      fontFamily: "Open Sans",
    },
  },
  overrides: {
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: "none",
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: "none",
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: 0
      }
    }
  },
});

export default theme;
