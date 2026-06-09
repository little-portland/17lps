import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import { ContextProvider } from "../store/context";
import { ManagedUIContext } from "../components/UX/context";

import useFetchContent from "@utils/useFetchContent";

// styles
import { GlobalStyle } from "../styles/styles";

const getPreloaderBackground = (path: string) => {
  if (path.startsWith("/nocturn")) return "#0a186d";
  if (path.startsWith("/test")) return "#f3f3f3";
  if (path.startsWith("/dining")) return "#000000";
  if (path.startsWith("/food")) return "#000000";

  return "#e7b4c6";
};

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const { global } = pageProps;

  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [preloaderHiding, setPreloaderHiding] = useState(false);
  const [preloaderBg, setPreloaderBg] = useState(() =>
    getPreloaderBackground(router.asPath)
  );

  const removeTimerRef = useRef<number | null>(null);
  const routeSafetyTimerRef = useRef<number | null>(null);

  const clearTimer = (timerRef: React.MutableRefObject<number | null>) => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const showLoader = (path?: string) => {
    clearTimer(removeTimerRef);
    clearTimer(routeSafetyTimerRef);

    setPreloaderBg(getPreloaderBackground(path || router.asPath));
    setPreloaderHiding(false);
    setPreloaderVisible(true);
  };

  const hideLoader = () => {
    clearTimer(removeTimerRef);
    clearTimer(routeSafetyTimerRef);

    setPreloaderHiding(true);

    removeTimerRef.current = window.setTimeout(() => {
      setPreloaderVisible(false);
      setPreloaderHiding(false);
    }, 420);
  };

  useEffect(() => {
    let finished = false;
    let initialLoadTimer: number | null = null;
    let maxTimer: number | null = null;

    const finishInitialLoad = () => {
      if (finished) return;
      finished = true;
      hideLoader();
    };

    if (document.readyState === "complete") {
      initialLoadTimer = window.setTimeout(finishInitialLoad, 350);
    } else {
      window.addEventListener("load", finishInitialLoad);
    }

    maxTimer = window.setTimeout(finishInitialLoad, 1600);

    return () => {
      window.removeEventListener("load", finishInitialLoad);

      if (initialLoadTimer !== null) {
        window.clearTimeout(initialLoadTimer);
      }

      if (maxTimer !== null) {
        window.clearTimeout(maxTimer);
      }

      clearTimer(removeTimerRef);
      clearTimer(routeSafetyTimerRef);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleRouteStart = (url: string) => {
      showLoader(url);

      routeSafetyTimerRef.current = window.setTimeout(() => {
        hideLoader();
      }, 1600);
    };

    const handleRouteDone = () => {
      clearTimer(routeSafetyTimerRef);

      window.setTimeout(() => {
        hideLoader();
      }, 300);
    };

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events]);

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

        <Component {...pageProps} />

        {preloaderVisible && (
          <div
            className={`site-preloader ${
              preloaderHiding ? "site-preloader--hiding" : ""
            }`}
            style={{ backgroundColor: preloaderBg }}
          />
        )}

        <style jsx global>{`
          .site-preloader {
            position: fixed;
            inset: 0;
            z-index: 2147483647;
            pointer-events: none;
            opacity: 1;
            transition: opacity 420ms ease;
          }

          .site-preloader--hiding {
            opacity: 0;
          }

          @media (prefers-reduced-motion: reduce) {
            .site-preloader {
              display: none !important;
            }
          }
        `}</style>
      </ManagedUIContext>
    </ContextProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

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

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      global,
    },
  };
};