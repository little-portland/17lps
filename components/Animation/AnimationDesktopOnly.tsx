import React, { useRef, useEffect, useState } from "react";

// Libs
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

const Animation: React.FC<AnimationProps> = ({
  isLoaded,
  setLoaded,
  isTestPage,
}) => {
  // Context
  const { canvasState, setCanvasState } = useLoaded();

  // Device
  const { isMobile } = useDeviceDetect();

  // Lottie refs
  const lottieRef = useRef<any>(null);
  const lottieRef2 = useRef<any>(null);
  const lottieRef3 = useRef<any>(null);

  // Wrapper ref
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Mobile loop toggle
  const [showMobileLoop, setShowMobileLoop] = useState(false);

  /**
   * DESKTOP animation complete
   */
  const onDesktopComplete = () => {
    setLoaded(true);
    setCanvasState(false);
    sessionStorage.setItem("canvas", "true");
  };

  /**
   * MOBILE init animation complete
   */
  const onMobileInitComplete = () => {
    setShowMobileLoop(true);
    setLoaded(true);
    setCanvasState(false);
    sessionStorage.setItem("canvas", "true");
  };

  /**
   * Playback + visibility controller
   * FIX: Mobile wrapper always visible
   */
  useEffect(() => {
    if (!wrapperRef.current) return;

    // =========================
    // MOBILE
    // =========================
    if (isMobile) {
      wrapperRef.current.style.opacity = "1";

      if (!isLoaded && !canvasState) {
        lottieRef.current?.playSegments?.([0, 120], true);
        lottieRef2.current?.playSegments?.([0, 625], true);
      }

      return;
    }

    // =========================
    // DESKTOP
    // =========================
    if (!isLoaded && !canvasState) {
      wrapperRef.current.style.opacity = "1";
      lottieRef.current?.playSegments?.([0, 120], true);
    } else {
      wrapperRef.current.style.opacity = "0";
    }
  }, [isLoaded, canvasState, isMobile]);

  return (
    <>
      <SvgContainer ref={wrapperRef}>
        {/* =========================
            DESKTOP ANIMATION
        ========================= */}
        {!isMobile ? (
          <Lottie
            lottieRef={lottieRef}
            animationData={houseAnimation}
            loop={false}
            autoplay={false}
            onComplete={onDesktopComplete}
          />
        ) : (
          /* =========================
             MOBILE ANIMATIONS
          ========================= */
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            {/* MAIN MOBILE SVG */}
            <Lottie
              lottieRef={lottieRef}
              animationData={mobileMain}
              loop={false}
              autoplay={false}
            />

            {/* INIT OVERLAY */}
            {!showMobileLoop && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                }}
              >
                <Lottie
                  lottieRef={lottieRef2}
                  animationData={mobileInit}
                  loop={false}
                  autoplay={false}
                  onComplete={onMobileInitComplete}
                />
              </div>
            )}

            {/* LOOP LAYER */}
            {showMobileLoop && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                }}
              >
                <Lottie
                  lottieRef={lottieRef3}
                  animationData={mobileLoop}
                  loop
                  autoplay
                />
              </div>
            )}
          </div>
        )}
      </SvgContainer>

      {/* =========================
          DESKTOP HOVER LAYER
      ========================= */}
      {isLoaded && !isMobile && (
        <AnimationLayer isTestPage={isTestPage} />
      )}
    </>
  );
};

export default Animation;
