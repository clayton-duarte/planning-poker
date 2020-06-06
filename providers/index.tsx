import React, { FunctionComponent } from "react";

import ThemeProvider from "./theme";

const MyProviders: FunctionComponent = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default MyProviders;
