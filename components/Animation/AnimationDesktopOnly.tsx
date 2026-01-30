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
  const isMobile = false;

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

    // 🔴 TEMP: disable intro animation completely
  useEffect(() => {
    setLoaded(true);
    setCanvasState(false);
  }, []);


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
    {isLoaded && !isMobile && (
      <AnimationLayer isTestPage={isTestPage} />
    )}
  </>
);

};

export default Animation;
