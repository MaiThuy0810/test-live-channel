import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemePalette, getDesignTokens } from "assets/themes/theme";
import { useEffect, useMemo } from "react";
import Routes from "routes";

declare module "@mui/material/styles" {
  interface Palette extends ThemePalette {}
  // allow configuration using `createTheme`
  interface PaletteOptions extends ThemePalette {}
}

function App() {
  //CONFIG FOR LAZY
  useEffect(() => {
    window.addEventListener("vite:preloadError", (_) => {
      window.location.reload();
    });
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        ...getDesignTokens("light"),
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      {/* <LoadingCustom /> */}
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
