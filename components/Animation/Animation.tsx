import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";

// Libs
import Lottie from "lottie-react";
import { motion } from "framer-motion";

// Main animation
import houseAnimation from "public/Web_assets/Initial_Web.json";
import mobileMain from "public/Web_assets/Main_Mobile.json";
import mobileInit from "public/Web_assets/Initial_animation_Mobile.json";
import mobileLoop from "public/Web_assets/Mobile_loop.json";
import AnimationLayer from "./components/AnimationLayer";

import eatDance from "public/Web_assets/still.json";

// Hooks
import useDeviceDetect from "@utils/useDeviceDetect";
import { useUI } from "@components/UX/context";
import { useLoaded } from "store/context";

// Styles
import { SvgContainer } from "./styles";

type AnimationProps = {
  isLoaded: boolean;
  setLoaded: (value: boolean) => void;
  isTestPage?: boolean;
};

const Animation: React.FC<AnimationProps> = ({
  isLoaded,
  setLoaded,
  isTestPage,
}) => {
  // UI handlers
  const { displayLineup, closeLineup, closeMenu } = useUI();
  const { canvasState, setCanvasState } = useLoaded();

  // Animation refs
  const lottieRef = useRef<any>(null);
  const lottieRef2 = useRef<any>(null);
  const lottieRef3 = useRef<any>(null);
  const lottieRefMobile = useRef<any>(null);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const opacityMobileRef = useRef<HTMLDivElement | null>(null);
  const hideIntroTimerRef = useRef<number | null>(null);

  // Check device
  const { isMobile } = useDeviceDetect();

  const [showMobileLoop, setShowMobileLoop] = useState(false);

  const clearHideIntroTimer = () => {
    if (hideIntroTimerRef.current) {
      window.clearTimeout(hideIntroTimerRef.current);
      hideIntroTimerRef.current = null;
    }
  };

  const onAnimationCompleteHandler = (): void => {
    setLoaded(true);
    setCanvasState(false);

    if (typeof window !== "undefined") {
      sessionStorage.setItem("canvas", "true");
    }
  };

  const onMobileAnimationCompleteHandler = (): void => {
    setShowMobileLoop(true);
    setLoaded(true);
    setCanvasState(false);

    if (typeof window !== "undefined") {
      sessionStorage.setItem("canvas", "true");
    }

    if (isMobile && opacityMobileRef.current) {
      opacityMobileRef.current.style.opacity = "0";
    }
  };

  useEffect(() => {
    if (!isLoaded && !canvasState) {
      clearHideIntroTimer();

      if (
        lottieRef.current &&
        typeof lottieRef.current.playSegments === "function"
      ) {
        lottieRef.current.playSegments([0, 120], true);
      }

      if (
        lottieRef2.current &&
        typeof lottieRef2.current.playSegments === "function"
      ) {
        lottieRef2.current.playSegments([0, 625], true);
      }

      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = "1";
      }

      return;
    }

    /*
      Desktop handover fix:
      Keep the intro Lottie visible briefly after isLoaded becomes true.
      This gives AnimationLayer time to mount/paint, avoiding the blink where
      the venue disappears for a split second.
    */
    if (!isMobile && wrapperRef.current) {
      clearHideIntroTimer();

      hideIntroTimerRef.current = window.setTimeout(() => {
        if (wrapperRef.current) {
          wrapperRef.current.style.opacity = "0";
        }

        hideIntroTimerRef.current = null;
      }, 450);
    }

    return () => {
      clearHideIntroTimer();
    };
  }, [isLoaded, canvasState, isMobile]);

  return (
    <>
      <SvgContainer ref={wrapperRef}>
        {!canvasState && !isMobile ? (
          <Lottie
            lottieRef={lottieRef}
            animationData={houseAnimation}
            loop={false}
            autoplay={false}
            onComplete={onAnimationCompleteHandler}
          />
        ) : (
          <>
            <Lottie
              lottieRef={lottieRef}
              animationData={mobileMain}
              loop={false}
              autoplay={false}
              onComplete={onAnimationCompleteHandler}
            />

            <div ref={opacityMobileRef}>
              <Lottie
                lottieRef={lottieRef2}
                animationData={mobileInit}
                loop={false}
                autoplay={false}
                onComplete={onMobileAnimationCompleteHandler}
              />
            </div>

            {showMobileLoop && (
              <Lottie
                lottieRef={lottieRef3}
                animationData={mobileLoop}
                loop={true}
                autoplay={true}
              />
            )}
          </>
        )}
      </SvgContainer>

      {isLoaded && !isMobile && (
        <AnimationLayer isTestPage={isTestPage} />
      )}
    </>
  );
};

export default Animation;