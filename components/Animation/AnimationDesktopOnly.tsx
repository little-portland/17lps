import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";

// Libs
import Lottie from "lottie-react";
import { motion } from "framer-motion";

// Animations
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
  // UI
  const { displayLineup, closeLineup, closeMenu } = useUI();
  const { canvasState, setCanvasState } = useLoaded();

  // Lottie refs
  const lottieRef = useRef<any>(null);
  const lottieRef2 = useRef<any>(null);
  const lottieRef3 = useRef<any>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const opacityMobileRef = useRef<HTMLDivElement>(null);

  // Device
  const { isMobile } = useDeviceDetect();

  const [showMobileLoop, setShowMobileLoop] = useState(false);

  /**
   * Desktop animation complete
   */
  const onAnimationCompleteHandler = (): void => {
    setLoaded(true);
    setCanvasState(false);

    sessionStorage.setItem("canvas", "true");
  };

  /**
   * Mobile animation complete
   * IMPORTANT: never hide mobile layers via opacity
   */
  const onMobileAnimationCompleteHandler = (): void => {
    setShowMobileLoop(true);
    setLoaded(true);
    setCanvasState(false);

    sessionStorage.setItem("canvas", "true");
  };

  /**
   * Handle animation playback + visibility
   * This replaces all imperative "hide forever" logic
   */
  useEffect(() => {
    if (!wrapperRef.current) return;

    // ✅ MOBILE: always visible, no hover exit state
    if (isMobile) {
      wrapperRef.current.style.opacity = "1";

      if (!isLoaded && !canvasState) {
        lottieRef.current?.playSegments?.([0, 120], true);
        lottieRef2.current?.playSegments?.([0, 625], true);
      }

      return;
    }

    // ✅ DESKTOP behaviour (unchanged)
    if (!isLoaded && !canvasState) {
      lottieRef.current?.playSegments?.([0, 120], true);
      lottieRef2.current?.playSegments?.([0, 625], true);
      wrapperRef.current.style.opacity = "1";
    } else {
      wrapperRef.current.style.opacity = "0";
    }
  }, [isLoaded, canvasState, isMobile]);

  return (
    <>
      <SvgContainer ref={wrapperRef}>
        {/* DESKTOP */}
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
            {/* MOBILE MAIN */}
            <Lottie
              lottieRef={lottieRef}
              animationData={mobileMain}
              loop={false}
              autoplay={false}
              onComplete={onAnimationCompleteHandler}
            />

            {/* MOBILE INIT */}
            <div ref={opacityMobileRef}>
              <Lottie
                lottieRef={lottieRef2}
                animationData={mobileInit}
                loop={false}
                autoplay={false}
                onComplete={onMobileAnimationCompleteHandler}
              />
            </div>

            {/* MOBILE LOOP */}
            {showMobileLoop && (
              <Lottie
                lottieRef={lottieRef3}
                animationData={mobileLoop}
                loop
                autoplay
              />
            )}
          </>
        )}
      </SvgContainer>

      {/* Desktop hover layer only */}
      {isLoaded && !isMobile && (
        <AnimationLayer isTestPage={isTestPage} />
      )}
    </>
  );
};

export default Animation;
