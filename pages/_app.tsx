import App from "next/app";
import Head from "next/head";
import { AppProps } from "next/app";
import Layout from "@components/Layout";

import { AnimatePresence } from "framer-motion";

import { ContextProvider } from "../store/context";
import { ManagedUIContext } from "../components/UX/context";

import useFetchContent from "@utils/useFetchContent";

//styles
import { GlobalStyle } from "../styles/styles";

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const { global } = pageProps;

  console.log(global);

  return (
    <ContextProvider>
      <ManagedUIContext>
        <Head>
          {/* <link rel="shortcut icon" href={global.favicon.url} /> */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
          {/* <title>{global.title}</title> */}
        </Head>
        <GlobalStyle />
        <Layout
          main={
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          }
        />
      </ManagedUIContext>
    </ContextProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  // Fetch global site settings from Strapi
  const globalData = await useFetchContent(`
  {
    globalCollection {
      items {
        favicon {
          url
        }
        title
        description {
          json
        }
      }
    }
  }
`);
  const global = globalData;
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global } };
};
