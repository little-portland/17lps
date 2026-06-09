import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lottie must be client-side only to avoid "document is not defined"
const Lottie = dynamic<any>(() => import("lottie-react"), {
  ssr: false,
});

// Desktop animations
import houseAnimation from "public/Web_assets/Initial_Web.json";
import houseAnimationBW from "public/Web_assets/Initial_Web_BW.json";

// Mobile animations
import mobileMain from "public/Web_assets/Main_Mobile.json";
import mobileMainBW from "public/Web_assets/Main_Mobile_BW.json";

import mobileInit from "public/Web_assets/Initial_animation_Mobile.json";
import mobileInitBW from "public/Web_assets/Initial_animation_Mobile_BW.json";

import mobileLoop from "public/Web_assets/Mobile_loop.json";
import mobileLoopBW from "public/Web_assets/Mobile_loop_BW.json";

// Components
import AnimationLayer from "./components/AnimationLayer";

// Hooks
import useDeviceDetect from "@utils/useDeviceDetect";
import { useLoaded } from "store/context";

// Styles
import { SvgContainer } from "./styles";

type AnimationProps = {
  isLoaded: boolean;
  setLoaded: (value: boolean) => void;
  isTestPage?: boolean;
  variant?: "default" | "bw";
};

const MOBILE_BREAKPOINT = 768;

const AnimationDesktopOnly: React.FC<AnimationProps> = ({
  isLoaded,
  setLoaded,
  isTestPage,
  variant = "default",
}) => {
  const { canvasState, setCanvasState } = useLoaded();
  const { isMobile } = useDeviceDetect();

  const lottieRef = useRef<any>(null);
  const lottieRef2 = useRef<any>(null);
  const lottieRef3 = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [viewportReady, setViewportReady] = useState(false);
  const [isNarrowViewport, setIsNarrowViewport] = useState(false);
  const [showMobileLoop, setShowMobileLoop] = useState(false);

  // --------------------------------------------------
  // Viewport-based mobile detection
  // --------------------------------------------------
  useEffect(() => {
    const updateViewport = () => {
      setIsNarrowViewport(window.innerWidth <= MOBILE_BREAKPOINT);
      setViewportReady(true);
    };

    updateViewport();

    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  const effectiveIsMobile = isMobile || isNarrowViewport;

  // --------------------------------------------------
  // On /test, always replay the venue animation on page load
  // --------------------------------------------------
  useEffect(() => {
    if (!isTestPage || !viewportReady) return;

    if (typeof window !== "undefined") {
      sessionStorage.removeItem("canvas");
    }

    setLoaded(false);
    setCanvasState(false);
    setShowMobileLoop(false);
  }, [isTestPage, viewportReady, effectiveIsMobile, setLoaded, setCanvasState]);

  // --------------------------------------------------
  // Animation variants
  // --------------------------------------------------
  const desktopAnimation =
    variant === "bw" ? houseAnimationBW : houseAnimation;

  const mobileMainAnimation =
    variant === "bw" ? mobileMainBW : mobileMain;

  const mobileInitAnimation =
    variant === "bw" ? mobileInitBW : mobileInit;

  const mobileLoopAnimation =
    variant === "bw" ? mobileLoopBW : mobileLoop;

  // --------------------------------------------------
  // Complete handlers
  // --------------------------------------------------
  const onDesktopComplete = () => {
    setLoaded(true);
    setCanvasState(false);

    // Do not save canvas session on /test.
    // /test should animate every page load while we are testing the new homepage.
    if (!isTestPage && typeof window !== "undefined") {
      sessionStorage.setItem("canvas", "true");
    }
  };

  const onMobileInitComplete = () => {
    setShowMobileLoop(true);
    setLoaded(true);
    setCanvasState(false);

    // Do not save canvas session on /test.
    if (!isTestPage && typeof window !== "undefined") {
      sessionStorage.setItem("canvas", "true");
    }
  };

  // --------------------------------------------------
  // Playback helpers
  // --------------------------------------------------
  const playDesktopIntro = () => {
    if (effectiveIsMobile || isLoaded || canvasState) return;

    if (wrapperRef.current) {
      wrapperRef.current.style.opacity = "1";
    }

    lottieRef.current?.playSegments?.([0, 120], true);
  };

  const playMobileIntro = () => {
    if (!effectiveIsMobile || isLoaded || canvasState) return;

    if (wrapperRef.current) {
      wrapperRef.current.style.opacity = "1";
    }

    lottieRef.current?.playSegments?.([0, 120], true);
    lottieRef2.current?.playSegments?.([0, 625], true);
  };

  // --------------------------------------------------
  // Playback control
  // --------------------------------------------------
  useEffect(() => {
    if (!viewportReady || !wrapperRef.current) return;

    const shouldIgnoreSession = Boolean(isTestPage);

    const hasCanvasSession =
      !shouldIgnoreSession &&
      typeof window !== "undefined" &&
      sessionStorage.getItem("canvas") === "true";

    // ---------- MOBILE ----------
    if (effectiveIsMobile) {
      wrapperRef.current.style.opacity = "1";

      // On non-test pages, preserve previous skip behaviour.
      if (hasCanvasSession && !isLoaded) {
        setLoaded(true);
        setCanvasState(false);
        setShowMobileLoop(true);
        return;
      }

      // If mobile is already loaded, keep the base mobile scene and loop layer visible.
      if (isLoaded && !showMobileLoop) {
        setShowMobileLoop(true);
        return;
      }

      // On /test, or first visit, play the original mobile intro sequence.
      if (!isLoaded && !canvasState && !hasCanvasSession) {
        setShowMobileLoop(false);

        const mobileTimer = window.setTimeout(() => {
          playMobileIntro();
        }, 140);

        return () => window.clearTimeout(mobileTimer);
      }

      return;
    }

    // ---------- DESKTOP ----------
    if (hasCanvasSession && !isLoaded) {
      setLoaded(true);
      setCanvasState(false);
      return;
    }

    if (!isLoaded && !canvasState) {
      wrapperRef.current.style.opacity = "1";

      const desktopTimer = window.setTimeout(() => {
        playDesktopIntro();
      }, 140);

      return () => window.clearTimeout(desktopTimer);
    }

    wrapperRef.current.style.opacity = "0";
  }, [
    viewportReady,
    effectiveIsMobile,
    isLoaded,
    canvasState,
    showMobileLoop,
    isTestPage,
    setLoaded,
    setCanvasState,
  ]);

  // Prevent the wrong desktop asset flashing before viewport detection finishes
  if (!viewportReady) {
    return null;
  }

  return (
    <>
      <SvgContainer ref={wrapperRef}>
        {/* =========================
            DESKTOP INTRO
        ========================= */}
        {!effectiveIsMobile && (
          <Lottie
            lottieRef={lottieRef}
            animationData={desktopAnimation}
            loop={false}
            autoplay={false}
            onDOMLoaded={playDesktopIntro}
            onComplete={onDesktopComplete}
          />
        )}

        {/* =========================
            MOBILE STACK
            Important:
            mobileMain stays visible as the base.
            mobileInit plays once.
            mobileLoop sits on top after intro completes.
        ========================= */}
        {effectiveIsMobile && (
          <>
            <Lottie
              lottieRef={lottieRef}
              animationData={mobileMainAnimation}
              loop={false}
              autoplay={false}
              onDOMLoaded={playMobileIntro}
            />

            {!showMobileLoop && (
              <Lottie
                lottieRef={lottieRef2}
                animationData={mobileInitAnimation}
                loop={false}
                autoplay={false}
                onDOMLoaded={playMobileIntro}
                onComplete={onMobileInitComplete}
              />
            )}

            {showMobileLoop && (
              <Lottie
                lottieRef={lottieRef3}
                animationData={mobileLoopAnimation}
                loop
                autoplay
              />
            )}
          </>
        )}
      </SvgContainer>

      {/* Desktop final/static hover layer only */}
      {isLoaded && !effectiveIsMobile && (
        <AnimationLayer isTestPage={isTestPage} variant={variant} />
      )}
    </>
  );
};

export default AnimationDesktopOnly;