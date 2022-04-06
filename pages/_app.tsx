import App from "next/app";
import Head from "next/head";
import { AppProps } from "next/app";
import Layout from "@components/Layout";

import { AnimatePresence } from "framer-motion";

import { ContextProvider } from "../store/context";
import { ManagedUIContext } from "../components/UX/context";

//styles
import { GlobalStyle } from "../styles/styles";

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    // <Component/> returns the component it self
    // pageProps returns the props you use to in that component. It can be any data
    // router.route returns the route your component lives on. So in our case it will be '/' or '/products/[id]'
    // exitBeforeEnter: AnimatePresence will only render one component at a time. The exiting component will finished its exit animation before the entering component is rendered
    return (
      <ContextProvider>
        <ManagedUIContext>
          <Head>
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
            <title>HOME</title>
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
}

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <ContextProvider>
//       <Head>
//         <title>Food Finder</title>
//       </Head>{" "}
//       <AnimatePresence exitBeforeEnter>
//         <Layout main={<Component {...pageProps} key={router.route}/>} />
//       </AnimatePresence>
//     </ContextProvider>
//   );
// }

export default MyApp;
