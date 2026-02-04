import React, { useRef, useEffect } from "react";
import Lottie from "lottie-react";
import AnimationLayer from "./components/AnimationLayer";

import houseAnimation from "public/Web_assets/Initial_Web.json";

import useDeviceDetect from "@utils/useDeviceDetect";
import { useLoaded } from "store/context";
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
  const lottieRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { isMobile } = useDeviceDetect();
  const { canvasState, setCanvasState } = useLoaded();

  useEffect(() => {
    if (!isLoaded && !canvasState && lottieRef.current) {
      lottieRef.current.playSegments([0, 120], true);
    }
  }, [isLoaded, canvasState]);

  const handleComplete = () => {
    setLoaded(true);
    setCanvasState(false);
    sessionStorage.setItem("canvas", "true");
  };

  return (
    <>
      <SvgContainer
        ref={wrapperRef}
        style={{
          // IMPORTANT: no opacity changes on mobile
          visibility: isLoaded ? "hidden" : "visible",
          pointerEvents: isLoaded ? "none" : "auto",
        }}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={houseAnimation}
          loop={false}
          autoplay={false}
          onComplete={handleComplete}
        />
      </SvgContainer>

      {/* Hover / interactive layer */}
      {isLoaded && !isMobile && (
        <AnimationLayer isTestPage={isTestPage} />
      )}
    </>
  );
};

export default AnimationDesktopOnly;
