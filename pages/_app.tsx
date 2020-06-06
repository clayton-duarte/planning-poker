import React, { FunctionComponent } from "react";
import { AppProps } from "next/app";

import Header from "../components/Header";
import Providers from "../providers";

const MyApp: FunctionComponent<AppProps> = ({ Component: Page, pageProps }) => {
  return (
    <Providers>
      <>
        <Header />
        <Page {...pageProps} />
      </>
    </Providers>
  );
};

export default MyApp;
