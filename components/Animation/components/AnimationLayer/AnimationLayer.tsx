import Image from "next/image";
import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

//final svg
import FinalSvg from "../../finalSvg";
import { useUI } from "@components/UX/context";
import { useLoaded } from "../../../../store/context";
import Modal from "@components/UX/Modal";

//Styles
import { OverlayHover } from "./styles";

import web from "public/Web_assets/still.json";
//hover animations
import plantLeft from "public/overlays/leftplant.json";
import plantMid from "public/overlays/middleplant.json";
import plantRight from "public/overlays/PLANT_RIGHT.json";
import speakersLeft from "public/overlays/SPEAKERS_LEFT_ANIMATED.json";
import speakersRight from "public/overlays/SPEAKERS_RIGHT_ANIMATED.json";
import tvLeft from "public/overlays/TV_LEFT.json";
import tvMid from "public/overlays/TV_MIDDLE.json";
import tvRight from "public/overlays/TV_RIGHT.json";
import moon from "public/overlays/MOON.json";
import bullfrog1 from "public/overlays/BULLFROG_01.json";
import bullfrog2 from "public/overlays/BULLFROG_02.json";
import bullfrog3 from "public/overlays/BULLFROG_03.json";
import bullfrog4 from "public/overlays/BULLFROG_04.json";
import bullfrog5 from "public/overlays/BULLFROG_05.json";
import bullfrog6 from "public/overlays/BULLFROG_06.json";
import bullfrog7 from "public/overlays/BULLFROG_07.json";
import bullfrog8 from "public/overlays/BULLFROG_08.json";
import dance from "public/overlays/DANCE.json";
import eat from "public/overlays/EAT.json";

const AnimationLayer = () => {
  //Refs
  const overlayRef = useRef<HTMLDivElement>();
  const plantLeftRef = useRef<any>();
  const plantMidRef = useRef<any>();
  const plantRightRef = useRef<any>();
  const tvLeftRef = useRef<any>();
  const tvMidRef = useRef<any>();
  const tvRightRef = useRef<any>();
  const speakersLeftRef = useRef<any>();
  const speakersRightRef = useRef<any>();
  const moonRef = useRef<any>();
  const bullfrog1Ref = useRef<any>();
  const bullfrog2Ref = useRef<any>();
  const bullfrog3Ref = useRef<any>();
  const bullfrog4Ref = useRef<any>();
  const bullfrog5Ref = useRef<any>();
  const bullfrog6Ref = useRef<any>();
  const bullfrog7Ref = useRef<any>();
  const bullfrog8Ref = useRef<any>();
  const eatRef = useRef<any>();
  const danceRef = useRef<any>();
  const ref = useRef<any>();

  //UI Handlers
  const { displayLineup, closeLineup, openLineup, openMenu, closeMenu } =
    useUI();
  const { canvasState, setCanvasState } = useLoaded();

  // Transition Animation
  const transition = { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] };

  useEffect(() => {
    const overlayAll: HTMLElement[] = Array.from(
      overlayRef.current.querySelectorAll("svg g")
    );

    // overlayAll.forEach((el) => {
    //   el.style.opacity = 0;
    // });

    const filtered = overlayAll.filter((el) => el.dataset.id);

    filtered.forEach((g) => {
      g.addEventListener("mouseenter", () => {
        const id = g.dataset.id;
        console.log(id);

        switch (id) {
          case "tv-left":
            tvLeftRef.current.play();

            break;
          case "tv-mid":
            tvMidRef.current.play();

            break;
          case "tv-right":
            tvRightRef.current.play();
            // console.log(tvRightRef.current.getDuration(true));
            break;
          case "plant-right":
            plantRightRef.current.play();
            break;
          case "plant-mid":
            plantMidRef.current.play();
            break;
          case "plant-left":
            plantLeftRef.current.play();
            break;
          case "soundsystem-left":
            speakersLeftRef.current.play();
            break;
          case "soundsystem-right":
            speakersRightRef.current.play();
            break;
          case "door":
            moonRef.current.play();
            break;
          case "speaker-top-left":
            bullfrog1Ref.current.play();
            break;
          case "speaker-top-mid-left":
            bullfrog2Ref.current.play();
            break;
          case "speaker-top-mid-right":
            bullfrog3Ref.current.play();
            break;
          case "speaker-top-right":
            bullfrog4Ref.current.play();
            break;
          case "speaker-bottom-left":
            bullfrog5Ref.current.play();
            break;
          case "speaker-bottom-mid-left":
            bullfrog6Ref.current.play();
            break;
          case "speaker-bottom-mid-right":
            bullfrog7Ref.current.play();
            break;
          case "speaker-bottom-right":
            bullfrog8Ref.current.play();
            break;
          // case "eat":
          //   eatRef.current.play();
          //   break;
          // case "dance":
          //   danceRef.current.play();
          //   break;
          default:
            console.log("defaut=lt");
        }
      });
    });

    () => {};
  }, []);

  const testHandler = () => {
    console.log(displayLineup);
    setCanvasState(false);
    openLineup();
  };

  return (
    <OverlayHover>
      <Lottie
        lottieRef={ref}
        animationData={web}
        loop={false}
        autoplay={true}
        // aria-aria-labelledby="use lottie animation"
      />

      <Lottie
        lottieRef={moonRef}
        animationData={moon}
        loop={false}
        autoplay={false}
        onComplete={(e) => moonRef.current.goToAndStop(0)}
        // onComplete={() => console.log(moonRef.current.getDuration(true))}
        // aria-aria-labelledby="use lottie animation"
      />
      {/* //PLANTS */}
      <Lottie
        lottieRef={plantLeftRef}
        animationData={plantLeft}
        loop={false}
        autoplay={false}
        onComplete={(e) => plantLeftRef.current.goToAndStop(0)}
        // aria-aria-labelledby="use lottie animation"
      />
      <Lottie
        lottieRef={plantMidRef}
        animationData={plantMid}
        loop={false}
        autoplay={false}
        onComplete={(e) => plantMidRef.current.goToAndStop(0)}
        // aria-aria-labelledby="use lottie animation"
      />
      <Lottie
        lottieRef={plantRightRef}
        animationData={plantRight}
        loop={false}
        autoplay={false}
        className={"plantRight"}
        onComplete={(e) => plantRightRef.current.goToAndStop(0)}
        // onComplete={() =>
        //   console.log(plantRightRef.current.getDuration(true))
        // }
        // aria-aria-labelledby="use lottie animation"
      />
      {/* //SPEAKERS */}
      <Lottie
        lottieRef={speakersLeftRef}
        animationData={speakersLeft}
        loop={false}
        autoplay={false}
        onComplete={(e) => speakersLeftRef.current.goToAndStop(0)}
        // aria-aria-labelledby="use lottie animation"
      />
      <Lottie
        lottieRef={speakersRightRef}
        animationData={speakersRight}
        loop={false}
        autoplay={false}
        onComplete={(e) => speakersRightRef.current.goToAndStop(0)}
        // aria-aria-labelledby="use lottie animation"
      />
      <Lottie
        lottieRef={tvLeftRef}
        animationData={tvLeft}
        loop={false}
        autoplay={false}
        onComplete={(e) => tvLeftRef.current.goToAndStop(0)}
        // aria-aria-labelledby="use lottie animation"
      />
      <Lottie
        lottieRef={tvMidRef}
        animationData={tvMid}
        loop={false}
        autoplay={false}
        onComplete={(e) => tvMidRef.current.goToAndStop(0)}
        // aria-aria-labelledby="use lottie animation"
      />
      <Lottie
        lottieRef={tvRightRef}
        animationData={tvRight}
        loop={false}
        autoplay={false}
        onComplete={(e) => tvRightRef.current.goToAndStop(0)}
        // aria-aria-labelledby="use lottie animation"
      />
      {/* BULLFROGS */}
      <Lottie
        lottieRef={bullfrog1Ref}
        animationData={bullfrog1}
        loop={false}
        autoplay={false}
        onComplete={(e) => bullfrog1Ref.current.goToAndStop(0)}
        // aria-aria-labelledby="use lottie animation"
      />
      <Lottie
        lottieRef={bullfrog2Ref}
        animationData={bullfrog2}
        loop={false}
        autoplay={false}
        onComplete={(e) => bullfrog2Ref.current.goToAndStop(0)}
        // aria-aria-labelledby="use lottie animation"
      />
      <Lottie
        lottieRef={bullfrog3Ref}
        animationData={bullfrog3}
        loop={false}
        autoplay={false}
        onComplete={(e) => bullfrog3Ref.current.goToAndStop(0)}
        // aria-aria-labelledby="use lottie animation"
      />
      <Lottie
        lottieRef={bullfrog4Ref}
        animationData={bullfrog4}
        loop={false}
        autoplay={false}
        onComplete={(e) => bullfrog4Ref.current.goToAndStop(0)}
        // aria-aria-labelledby="use lottie animation"
      />
      <Lottie
        lottieRef={bullfrog5Ref}
        animationData={bullfrog5}
        loop={false}
        autoplay={false}
        onComplete={(e) => bullfrog5Ref.current.goToAndStop(0)}
        // aria-aria-labelledby="use lottie animation"
      />
      <Lottie
        lottieRef={bullfrog6Ref}
        animationData={bullfrog6}
        loop={false}
        autoplay={false}
        onComplete={(e) => bullfrog6Ref.current.goToAndStop(0)}
        // aria-aria-labelledby="use lottie animation"
      />
      <Lottie
        lottieRef={bullfrog7Ref}
        animationData={bullfrog7}
        loop={false}
        autoplay={false}
        onComplete={(e) => bullfrog7Ref.current.goToAndStop(0)}
        // aria-aria-labelledby="use lottie animation"
      />
      <Lottie
        lottieRef={bullfrog8Ref}
        animationData={bullfrog8}
        loop={false}
        autoplay={false}
        onComplete={(e) => bullfrog8Ref.current.goToAndStop(0)}
        // aria-aria-labelledby="use lottie animation"
      />
      {/* DANCE EAT */}
      <Lottie
        lottieRef={eatRef}
        animationData={eat}
        loop={false}
        autoplay={false}
        onComplete={(e) => eatRef.current.goToAndStop(0)}
        // aria-aria-labelledby="use lottie animation"
      />
      <Lottie
        lottieRef={danceRef}
        animationData={dance}
        loop={true}
        autoplay={true}
        onComplete={(e) => danceRef.current.goToAndStop(0)}
        // aria-aria-labelledby="use lottie animation"
      />

      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {<FinalSvg openLineup={testHandler} openMenu={testHandler} />}
        {/* <button onClick={testHandler}>HELLO</button> */}
      </motion.div>
    </OverlayHover>
  );
};

export default AnimationLayer;
