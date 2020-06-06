import React, { FunctionComponent } from "react";

import ThemeProvider from "./theme";
import RoomProvider from "./room";

const MyProviders: FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider>
      <RoomProvider>{children}</RoomProvider>
    </ThemeProvider>
  );
};

export default MyProviders;
