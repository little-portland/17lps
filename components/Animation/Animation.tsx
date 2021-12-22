import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

//Libs
import Lottie from "lottie-react";
import { motion } from "framer-motion";

//main animation
import houseAnimation from "public/Web_assets/mainhouse.json";
import web from "public/Web_assets/Web_animation_still.json";
import Modal from "@components/UX/Modal";
import AnimationLayer from "./components/AnimationLayer";

//hooks
import useDeviceDetect from "@utils/useDeviceDetect";
import { useUI } from "@components/UX/context";
// import { SvgContainer } from "./styles";

//Styles
import { SvgContainer } from "./styles.js";

const Animation: React.FC<{
  isLoaded: boolean;
  setLoaded: (value: boolean) => void;
}> = ({ isLoaded, setLoaded }) => {
  //Router
  const router = useRouter();

  //UI Handlers
  const { displayLineup, closeLineup, closeMenu } = useUI();

  //Animation Ref
  const lottieRef = useRef<any>();
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
    if (!isLoaded) {
      lottieRef.current.play();
    } else {
      wrapperRef.current.style.opacity = 0;
      // lottieRef.current.destroy();
    }
    // setLoaded(true);

    () => {};
  }, [isLoaded]);

  return (
    <div className="svgcontainer">
      <div
        className="svgcontainerMain"
        ref={wrapperRef}
        style={{ position: "absolute" }}
      >
        {!isMobile && (
          <Lottie
            lottieRef={lottieRef}
            animationData={houseAnimation}
            loop={false}
            autoplay={false}
            onComplete={() => onAnimationCompleteHandler()}
            // onEnterFrame={onAnimationStartHandler}
          />
        )}
      </div>
      {isLoaded && <AnimationLayer />}
    </div>
  );
};

export default Animation;
