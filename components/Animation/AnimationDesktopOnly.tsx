import React, { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";

// Animations
import houseAnimation from "public/Web_assets/Initial_Web.json";
import mobileMain from "public/Web_assets/Main_Mobile.json";
import mobileInit from "public/Web_assets/Initial_animation_Mobile.json";
import mobileLoop from "public/Web_assets/Mobile_loop.json";

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
};

const AnimationDesktopOnly: React.FC<AnimationProps> = ({
  isLoaded,
  setLoaded,
  isTestPage,
}) => {
  const { canvasState, setCanvasState } = useLoaded();
  const { isMobile } = useDeviceDetect();

  // Lottie refs
  const lottieRef = useRef<any>(null);
  const lottieRef2 = useRef<any>(null);
  const lottieRef3 = useRef<any>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [showMobileLoop, setShowMobileLoop] = useState(false);

  // --------------------------------------------------
  // DESKTOP COMPLETE
  // --------------------------------------------------
  const onDesktopComplete = () => {
    setLoaded(true);
    setCanvasState(false);
    sessionStorage.setItem("canvas", "true");
  };

  // --------------------------------------------------
  // MOBILE INIT COMPLETE
  // --------------------------------------------------
  const onMobileInitComplete = () => {
    setShowMobileLoop(true);
    setLoaded(true);
    setCanvasState(false);
    sessionStorage.setItem("canvas", "true");
  };

  // --------------------------------------------------
  // PLAYBACK CONTROL
  // --------------------------------------------------
  useEffect(() => {
    if (!wrapperRef.current) return;

    // ---------- MOBILE ----------
    if (isMobile) {
      wrapperRef.current.style.opacity = "1";

      if (!isLoaded && !canvasState) {
        lottieRef.current?.playSegments?.([0, 120], true);
        lottieRef2.current?.playSegments?.([0, 625], true);
      }

      return;
    }

    // ---------- DESKTOP ----------
    if (!isLoaded && !canvasState) {
      wrapperRef.current.style.opacity = "1";
      lottieRef.current?.playSegments?.([0, 120], true);
    } else {
      wrapperRef.current.style.opacity = "0";
    }
  }, [isLoaded, canvasState, isMobile]);

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------
  return (
    <>
      <SvgContainer ref={wrapperRef}>
        {/* =========================
            DESKTOP
        ========================= */}
        {!isMobile && (
          <Lottie
            lottieRef={lottieRef}
            animationData={houseAnimation}
            loop={false}
            autoplay={false}
            onComplete={onDesktopComplete}
          />
        )}

        {/* =========================
            MOBILE STACK (SVG FILTER WRAPPED)
        ========================= */}
        {isMobile && (
          <svg
            viewBox="0 0 3840 2160"
            style={{ width: "100%", height: "100%" }}
          >
            <defs>
              {/* Safari-safe grayscale filter */}
              <filter id="bw">
                <feColorMatrix
                  type="saturate"
                  values="0"
                />
              </filter>
            </defs>

            <g filter="url(#bw)">
              <foreignObject
                x="0"
                y="0"
                width="100%"
                height="100%"
              >
                <div style={{ width: "100%", height: "100%" }}>
                  
                  {/* Base mobile illustration */}
                  <Lottie
                    lottieRef={lottieRef}
                    animationData={mobileMain}
                    loop={false}
                    autoplay={false}
                  />

                  {/* Init animation overlay */}
                  {!showMobileLoop && (
                    <Lottie
                      lottieRef={lottieRef2}
                      animationData={mobileInit}
                      loop={false}
                      autoplay={false}
                      onComplete={onMobileInitComplete}
                    />
                  )}

                  {/* Loop layer */}
                  {showMobileLoop && (
                    <Lottie
                      lottieRef={lottieRef3}
                      animationData={mobileLoop}
                      loop
                      autoplay
                    />
                  )}

                </div>
              </foreignObject>
            </g>
          </svg>
        )}
      </SvgContainer>

      {/* Desktop hover layer only */}
      {isLoaded && !isMobile && (
        <AnimationLayer isTestPage={isTestPage} />
      )}
    </>
  );
};

export default AnimationDesktopOnly;
