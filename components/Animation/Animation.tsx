import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";

//Libs
import Lottie from "lottie-react";
import { motion } from "framer-motion";

//main animation
import houseAnimation from "public/Web_assets/Initial_Web.json";
import mobileMain from "public/Web_assets/Main_Mobile.json";
import mobileInit from "public/Web_assets/Initial_animation_Mobile.json";
import mobileLoop from "public/Web_assets/Mobile_loop.json";
import AnimationLayer from "./components/AnimationLayer";

import eatDance from "public/Web_assets/still.json";

//hooks
import useDeviceDetect from "@utils/useDeviceDetect";
import { useUI } from "@components/UX/context";
import { useLoaded } from "store/context";

//Styles
import { SvgContainer } from "./styles";

const Animation: React.FC<{
  isLoaded: boolean;
  setLoaded: (value: boolean) => void;
}> = ({ isLoaded, setLoaded }) => {
  //UI Handlers
  const { displayLineup, closeLineup, closeMenu } = useUI();
  const { canvasState, setCanvasState } = useLoaded();

  //Animation Ref
  const lottieRef = useRef<any>();
  const lottieRef2 = useRef<any>();
  const lottieRef3 = useRef<any>();
  const lottieRefMobile = useRef<any>();
  // const loopRef = useRef<any>();
  const wrapperRef = useRef<HTMLDivElement>();
  const opacityMobileRef = useRef<HTMLDivElement>();

  //Check Device
  const { isMobile } = useDeviceDetect();

  const [showMobileLoop, setShowMobileLoop] = useState(false);

  const onAnimationCompleteHandler = (): void => {
    setLoaded(true);
    setCanvasState(false)

    sessionStorage.setItem("canvas", "true");

    //sessionStorage.setItem("isLoaded", "true");
  };

  const onMobileAnimationCompleteHandler = (): void => {
    setShowMobileLoop(true);
    setLoaded(true);
    setCanvasState(false)

    sessionStorage.setItem("canvas", "true");
    //sessionStorage.setItem("isLoaded", "true");

    if (isMobile) {
      opacityMobileRef.current.style.opacity = "0";
    }
  };

  useEffect(() => {
    if (!isLoaded && !canvasState) {
      if (lottieRef.current && typeof lottieRef.current.playSegments === "function") {
        lottieRef.current.playSegments([0, 120], true);
      }
  
      if (lottieRef2.current && typeof lottieRef2.current.playSegments === "function") {
        lottieRef2.current.playSegments([0, 625], true);
      }
  
      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = "1";
      }
    } else if (!isMobile && wrapperRef.current) {
      wrapperRef.current.style.opacity = "0";
    }
  }, [isLoaded, canvasState]);

  return (
    <>
      <SvgContainer ref={wrapperRef}>
        {!canvasState && !isMobile ? (
          <Lottie
            lottieRef={lottieRef}
            animationData={houseAnimation}
            loop={false}
            autoplay={false}
            onComplete={() => onAnimationCompleteHandler()}
            // onEnterFrame={onAnimationStartHandler}
          />
        ) : (
          <>
            <Lottie
              lottieRef={lottieRef}
              animationData={mobileMain}
              loop={false}
              autoplay={false}
              onComplete={() => onAnimationCompleteHandler()}
              // onComplete={() => console.log("complete")}
              // onEnterFrame={onAnimationStartHandler}
            />
            <div ref={opacityMobileRef}>
              <Lottie
                lottieRef={lottieRef2}
                animationData={mobileInit}
                loop={false}
                autoplay={false}
                onComplete={() => onMobileAnimationCompleteHandler()}
                // onEnterFrame={onAnimationStartHandler}
              />
            </div>

            {showMobileLoop && (
              <Lottie
                lottieRef={lottieRef3}
                animationData={mobileLoop}
                loop={true}
                autoplay={true}
                // onComplete={() => onAnimationCompleteHandler()}
                // onEnterFrame={onAnimationStartHandler}
              />
            )}
          </>
        )}
      </SvgContainer>
      {isLoaded && !isMobile && <AnimationLayer />}
    </>
  );
};

export default Animation;
