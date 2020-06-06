import React, { FunctionComponent } from "react";
import baseStyled, {
  createGlobalStyle,
  ThemedStyledInterface,
  ThemeProvider,
} from "styled-components";

enum EpisodeColors {
  BG = "#000000",
  EP_ONE = "#ffffff",
  EP_TWO = "#00fdfd",
  EP_THREE = "#646464",
  EP_FOUR = "#f4892c",
  EP_FIVE = "#a436f4",
  EP_SIX = "#28d927",
  EP_SEVEN = "#ffea1b",
  EP_EIGHT = "#fe261f",
  EP_NINE = "#4467cc",
}

enum Palette {
  PRIMARY = EpisodeColors.EP_SEVEN,
  SECONDARY = EpisodeColors.EP_TWO,
  DISABLED = EpisodeColors.EP_THREE,
  SUCCESS = EpisodeColors.EP_SIX,
  ERROR = EpisodeColors.EP_EIGHT,
  TEXT = EpisodeColors.EP_ONE,
  BG = EpisodeColors.BG,
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
  colors: EpisodeColors,
  palette: Palette,
  shape: Shape,
  font: Font,
};

export type Theme = typeof theme;

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
