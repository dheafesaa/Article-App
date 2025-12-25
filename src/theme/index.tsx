import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    allVariants: {
      letterSpacing: "0.03em",
    },
  },
});

export default theme;
