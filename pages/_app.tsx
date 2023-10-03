import App from "next/app";
import Head from "next/head";
import { AppProps } from "next/app";

import { AnimatePresence } from "framer-motion";

import { ContextProvider } from "../store/context";
import { ManagedUIContext } from "../components/UX/context";

import useFetchContent from "@utils/useFetchContent";

//styles
import { GlobalStyle } from "../styles/styles";

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const { global } = pageProps;

  // console.log(global);

  return (
    <ContextProvider>
      <ManagedUIContext>
        <Head>
          <link
            rel="shortcut icon"
            type="image/png"
            href={global.favicon.url}
          />
          <title>{global.title}</title>
          <meta name="description" content="{global.description}">
        </Head>
        <GlobalStyle />
        <Component {...pageProps} key={router.route} />
      </ManagedUIContext>
    </ContextProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  // Fetch global site settings from Contentful
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
  const global = globalData.globalCollection.items[0];
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global } };
};
