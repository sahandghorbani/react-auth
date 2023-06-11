import { FC } from "react";
import { AppProviderProps } from "../types/ITypes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Create your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1d4764", // Your custom primary color for dark mode
    },
  },
});


// AppProvider component
const AppProvider:FC<AppProviderProps> = ({ children} ) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppProvider;
