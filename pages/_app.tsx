import React, { FunctionComponent } from "react";
import { AppProps } from "next/app";

import Providers from "../providers";

const MyApp: FunctionComponent<AppProps> = ({ Component: Page, pageProps }) => {
  return (
    <Providers>
      <Page {...pageProps} />
    </Providers>
  );
};

export default MyApp;
