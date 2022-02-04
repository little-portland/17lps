import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

//Libs
import Lottie from "lottie-react";
import { motion } from "framer-motion";

//main animation
import houseAnimation from "public/Web_assets/mainhouse.json";
import mobileMain from "public/Web_assets/mainmobile.json";
import mobileInit from "public/Web_assets/initialmobile2.json";
import mobileLoop from "public/Web_assets/mainMobileLoop2.json";
import AnimationLayer from "./components/AnimationLayer";

//hooks
import useDeviceDetect from "@utils/useDeviceDetect";
import { useUI } from "@components/UX/context";
import { useLoaded } from "store/context";
// import { SvgContainer } from "./styles";

//Styles
import { SvgContainer } from "./styles.js";

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
  // const loopRef = useRef<any>();
  const wrapperRef = useRef<any>();

  //Check Device
  const { isMobile } = useDeviceDetect();

  const [locked, setLocked] = useState(false);

  const onAnimationCompleteHandler = (): void => {
    setLoaded(true);

    // console.log("intro");
  };

  const onAnimationStartHandler = (): void => {
    if (locked) {
      setLoaded(false);
      console.log("outro");
    } else {
      // console.log("intro");
    }
  };

  const hhHandler = (): void => {
    setLocked(true);
    lottieRef.current.setSpeed(4);
    lottieRef.current.setDirection(-1);
    lottieRef.current.play();
    // destroy();
    // setLoaded();
  };

  const reverseHandler = (): void => {
    console.log("reverse");
    setLocked(true);
    lottieRef.current.play();
  };

  useEffect(() => {
    // setLocked(true);
    if (!isLoaded && !canvasState) {
      lottieRef.current.play();
      lottieRef2 && lottieRef2.current.play();
      wrapperRef.current.style.opacity = 1;
    } else if (isMobile) {
      lottieRef2.current.destroy();
    } else {
      wrapperRef.current.style.opacity = 0;
    }
    // setLoaded(true);

    () => {};
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
              // onComplete={() => onAnimationCompleteHandler()}
              // onEnterFrame={onAnimationStartHandler}
            />
            <Lottie
              lottieRef={lottieRef2}
              animationData={mobileInit}
              loop={false}
              autoplay={false}
              onComplete={() => onAnimationCompleteHandler()}
              // onEnterFrame={onAnimationStartHandler}
            />

            {isLoaded && (
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
