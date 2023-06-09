import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffff00",
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
