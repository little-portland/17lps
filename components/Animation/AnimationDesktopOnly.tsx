import React, { useRef, useEffect, useState } from "react";

// Libs
import Lottie from "lottie-react";

// Main animation
import houseAnimation from "public/Web_assets/Initial_Web.json";
import mobileMain from "public/Web_assets/Main_Mobile.json";
import mobileInit from "public/Web_assets/Initial_animation_Mobile.json";
import mobileLoop from "public/Web_assets/Mobile_loop.json";
import AnimationLayer from "./components/AnimationLayer";

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

const AnimationDesktopOnly: React.FC<AnimationProps> = ({
  isLoaded,
  setLoaded,
  isTestPage,
}) => {
  const { setCanvasState } = useLoaded();
  const { isMobile } = useDeviceDetect();

  const lottieRef = useRef<any>(null);
  const lottieRef2 = useRef<any>(null);
  const lottieRef3 = useRef<any>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const opacityMobileRef = useRef<HTMLDivElement>(null);

  const [showMobileLoop, setShowMobileLoop] = useState(false);

  const onAnimationCompleteHandler = () => {
    setLoaded(true);
    setCanvasState(false);
    sessionStorage.setItem("canvas", "true");
  };

  const onMobileAnimationCompleteHandler = () => {
    setShowMobileLoop(true);
    setLoaded(true);
    setCanvasState(false);
    sessionStorage.setItem("canvas", "true");

    if (opacityMobileRef.current) {
      opacityMobileRef.current.style.opacity = "0";
    }
  };

  /**
   * IMPORTANT FIX:
   * We only allow "exit / fade out" logic on DESKTOP.
   * Mobile has no hover — exit logic must NEVER run there.
   */
  useEffect(() => {
    if (!wrapperRef.current) return;

    // Initial animation play
    if (!isLoaded) {
      lottieRef.current?.playSegments?.([0, 120], true);
      lottieRef2.current?.playSegments?.([0, 625], true);
      wrapperRef.current.style.opacity = "1";
      return;
    }

    // Exit / fade logic — DESKTOP ONLY
    if (!isMobile) {
      wrapperRef.current.style.opacity = "0";
    }
  }, [isLoaded, isMobile]);

  return (
    <>
      <SvgContainer ref={wrapperRef}>
        {/* SAME animation for mobile & desktop */}
        <Lottie
          lottieRef={lottieRef}
          animationData={houseAnimation}
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
            loop
            autoplay
          />
        )}
      </SvgContainer>

      {isLoaded && (
        <AnimationLayer isTestPage={isTestPage} />
      )}
    </>
  );
};

export default AnimationDesktopOnly;
