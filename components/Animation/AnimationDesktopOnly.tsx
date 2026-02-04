import React, { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";
import AnimationLayer from "./components/AnimationLayer";

import houseAnimation from "public/Web_assets/Initial_Web.json";

import useDeviceDetect from "@utils/useDeviceDetect";
import { useUI } from "@components/UX/context";
import { useLoaded } from "store/context";

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
  const { displayLineup, closeLineup, closeMenu } = useUI();
  const { canvasState, setCanvasState } = useLoaded();
  const { isMobile } = useDeviceDetect(); // ✅ REAL device detection

  const lottieRef = useRef<any>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onAnimationCompleteHandler = () => {
    setLoaded(true);
    setCanvasState(false);
    sessionStorage.setItem("canvas", "true");
  };

  useEffect(() => {
    if (!wrapperRef.current) return;

    // Show animation while loading
    if (!isLoaded && !canvasState) {
      wrapperRef.current.style.opacity = "1";

      if (lottieRef.current?.playSegments) {
        lottieRef.current.playSegments([0, 120], true);
      }
      return;
    }

    /**
     * 🔑 CRITICAL FIX:
     * - NEVER hide SVG on mobile
     * - NEVER hide SVG on test page
     */
    if (!isMobile && !isTestPage) {
      wrapperRef.current.style.opacity = "0";
    } else {
      wrapperRef.current.style.opacity = "1";
    }
  }, [isLoaded, canvasState, isMobile, isTestPage]);

  return (
    <>
      <SvgContainer ref={wrapperRef}>
        {!canvasState && (
          <Lottie
            lottieRef={lottieRef}
            animationData={houseAnimation}
            loop={false}
            autoplay={false}
            onComplete={onAnimationCompleteHandler}
          />
        )}
      </SvgContainer>

      {/* Hover / interactive layer */}
      {isLoaded && !isMobile && (
        <AnimationLayer isTestPage={isTestPage} />
      )}
    </>
  );
};

export default Animation;
