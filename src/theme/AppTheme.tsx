import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { purpleTheme } from "./";

type AppThemeProps = {
  children: JSX.Element | JSX.Element[];
};

export const AppTheme = ({ children }: AppThemeProps): JSX.Element => (
  <ThemeProvider theme={purpleTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);
