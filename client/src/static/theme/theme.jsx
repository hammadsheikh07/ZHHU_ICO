import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffff00",
    },
    success: {
      main: "#39FF14",
    },
    text: {
      primary: "#FFF",
    },
  },
  typography: {
    allVariants: {
      color: "white",
    },
    fontFamily: "Nunito",
  },
});

export default theme;
