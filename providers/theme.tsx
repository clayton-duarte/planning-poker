import React, { FunctionComponent } from "react";
import baseStyled, {
  createGlobalStyle,
  ThemedStyledInterface,
  ThemeProvider,
} from "styled-components";

enum Palette {
  PRIMARY = "#f6c90e",
  SECONDARY = "#f8f8f8",
  TEXT = "#f6c90e",
  BG = "#363636",
}

enum Font {
  FAMILY = "monospace",
  SIZE = "16px",
}

enum Shape {
  PADDING = ".5rem 1rem",
  MARGIN = "0 .5rem",
  RADIUS = ".5rem",
}

const theme = {
  palette: Palette,
  shape: Shape,
  font: Font,
};

type Theme = typeof theme;

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
html, 
body {
  font-family: ${(props) => props.theme.font.FAMILY};
  background: ${(props) => props.theme.palette.BG};
  font-size: ${(props) => props.theme.font.SIZE};
  color: ${(props) => props.theme.palette.TEXT};
  padding: 0;
  margin: 0;
}

* {
  box-sizing: border-box;
  font-weight: unset;
}

@font-face {
  font-family: AnakinMono;
  src: url(/fonts/AnakinMono.ttf);
}
@font-face {
  font-family: DistantGalaxy;
  src: url(/fonts/DistantGalaxy.ttf);
}
@font-face {
  font-family: Eposode1;
  src: url(/fonts/Eposode1.ttf);
}
`;

const MyThemeProvider: FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  );
};

const styled = baseStyled as ThemedStyledInterface<Theme>;
export default MyThemeProvider;
export { styled };
