import App from "next/app";
import Head from "next/head";
import { AppProps } from "next/app";

import { ContextProvider } from "../store/context";
import { ManagedUIContext } from "../components/UX/context";

import useFetchContent from "@utils/useFetchContent";

//styles
import { GlobalStyle } from "../styles/styles";

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const { global } = pageProps;

  return (
    <ContextProvider>
      <ManagedUIContext>
        <Head>
          <link
            rel="shortcut icon"
            type="image/png"
            href={global?.favicon?.url || "/favicon.ico"}
          />
          <title>{global?.title || "17 Little Portland Street"}</title>
        </Head>

        <GlobalStyle />

        <div className="page-fade" key={router.asPath}>
          <Component {...pageProps} />
        </div>

        <style jsx global>{`
          #__next,
          .page-fade {
            min-height: 100%;
          }

          .page-fade {
            opacity: 0;
            animation: pageFadeIn 380ms ease forwards;
            will-change: opacity;
          }

          @keyframes pageFadeIn {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .page-fade {
              opacity: 1;
              animation: none;
              will-change: auto;
            }
          }
        `}</style>
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

  const global = globalData?.globalCollection?.items?.[0] || null;

  // Pass the data to our page via props
  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      global,
    },
  };
};