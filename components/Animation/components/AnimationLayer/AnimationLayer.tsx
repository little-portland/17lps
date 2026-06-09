import Image from "next/image";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Lottie = dynamic<any>(() => import("lottie-react"), {
  ssr: false,
});

import useDeviceDetect from "@utils/useDeviceDetect";

// final svg
import FinalSvg from "../../finalSvg";
import FinalSvgTest from "../../finalSvg.test";
import { useUI } from "@components/UX/context";

// Styles
import { OverlayHover } from "./styles";

import staticWeb from "public/Web_assets/Static_Web.json";
import staticWebBW from "public/Web_assets/Static_Web_BW.json";

import staticMobile from "public/Web_assets/still.json";
import staticMobileBW from "public/Web_assets/still_BW.json";

// hover animations
import plantLeft from "public/overlays/leftplant.json";
import plantLeftBW from "public/overlays/leftplant_BW.json";

import plantMid from "public/overlays/middleplant.json";
import plantMidBW from "public/overlays/middleplant_BW.json";

import plantRight from "public/overlays/PLANT_RIGHT.json";
import plantRightBW from "public/overlays/PLANT_RIGHT_BW.json";

import speakersLeft from "public/overlays/SPEAKERS_LEFT_ANIMATED.json";
import speakersLeftBW from "public/overlays/SPEAKERS_LEFT_ANIMATED_BW.json";

import speakersRight from "public/overlays/SPEAKERS_RIGHT_ANIMATED.json";
import speakersRightBW from "public/overlays/SPEAKERS_RIGHT_ANIMATED_BW.json";

import tvLeft from "public/overlays/TV_LEFT.json";
import tvLeftBW from "public/overlays/TV_LEFT_BW.json";

import tvMid from "public/overlays/TV_MIDDLE.json";
import tvMidBW from "public/overlays/TV_MIDDLE_BW.json";

import tvRight from "public/overlays/TV_RIGHT.json";
import tvRightBW from "public/overlays/TV_RIGHT_BW.json";

import moon from "public/overlays/MOON.json";
import moonBW from "public/overlays/MOON_BW.json";

import bullfrog1 from "public/overlays/BULLFROG_01.json";
import bullfrog1BW from "public/overlays/BULLFROG_01_BW.json";

import bullfrog2 from "public/overlays/BULLFROG_02.json";
import bullfrog2BW from "public/overlays/BULLFROG_02_BW.json";

import bullfrog3 from "public/overlays/BULLFROG_03_with_divider.json";
import bullfrog3BW from "public/overlays/BULLFROG_03_with_divider_BW.json";

import bullfrog4 from "public/overlays/BULLFROG_04.json";
import bullfrog4BW from "public/overlays/BULLFROG_04_BW.json";

import bullfrog5 from "public/overlays/BULLFROG_05.json";
import bullfrog5BW from "public/overlays/BULLFROG_05_BW.json";

import bullfrog6 from "public/overlays/BULLFROG_06.json";
import bullfrog6BW from "public/overlays/BULLFROG_06_BW.json";

import bullfrog7 from "public/overlays/BULLFROG_07_with_divider.json";
import bullfrog7BW from "public/overlays/BULLFROG_07_with_divider_BW.json";

import bullfrog8 from "public/overlays/BULLFROG_08.json";
import bullfrog8BW from "public/overlays/BULLFROG_08_BW.json";

type AnimationLayerProps = {
  isTestPage?: boolean;
  variant?: "default" | "bw";
};

const AnimationLayer = ({
  isTestPage,
  variant = "default",
}: AnimationLayerProps) => {
  const SvgComponent = isTestPage ? FinalSvgTest : FinalSvg;

  const isBW = variant === "bw";

  const staticWebAnimation = isBW ? staticWebBW : staticWeb;
  const staticMobileAnimation = isBW ? staticMobileBW : staticMobile;

  const plantLeftAnimation = isBW ? plantLeftBW : plantLeft;
  const plantMidAnimation = isBW ? plantMidBW : plantMid;
  const plantRightAnimation = isBW ? plantRightBW : plantRight;

  const speakersLeftAnimation = isBW ? speakersLeftBW : speakersLeft;
  const speakersRightAnimation = isBW ? speakersRightBW : speakersRight;

  const tvLeftAnimation = isBW ? tvLeftBW : tvLeft;
  const tvMidAnimation = isBW ? tvMidBW : tvMid;
  const tvRightAnimation = isBW ? tvRightBW : tvRight;

  const moonAnimation = isBW ? moonBW : moon;

  const bullfrog1Animation = isBW ? bullfrog1BW : bullfrog1;
  const bullfrog2Animation = isBW ? bullfrog2BW : bullfrog2;
  const bullfrog3Animation = isBW ? bullfrog3BW : bullfrog3;
  const bullfrog4Animation = isBW ? bullfrog4BW : bullfrog4;
  const bullfrog5Animation = isBW ? bullfrog5BW : bullfrog5;
  const bullfrog6Animation = isBW ? bullfrog6BW : bullfrog6;
  const bullfrog7Animation = isBW ? bullfrog7BW : bullfrog7;
  const bullfrog8Animation = isBW ? bullfrog8BW : bullfrog8;

  // Refs
  const overlayRef = useRef<HTMLDivElement>(null);
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
  const ref = useRef<any>();

  // UI Handlers
  const {
    displayLineup,
    closeLineup,
    openLineup,
    openMenu,
    closeMenu,
    displayMenu,
    openHire,
    closeHire,
    displayHire,
  } = useUI();

  // Transition Animation
  const transition = { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] };

  // Check Device
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    if (!overlayRef.current) return;

    const overlayAll: HTMLElement[] = Array.from(
      overlayRef.current.querySelectorAll("svg g")
    );

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
          default:
            console.log("defaut=lt");
        }
      });
    });
  }, []);

  const testHandler = () => {
    openLineup();
  };

  return (
    <OverlayHover>
      {!isMobile ? (
        <>
          <Lottie
            lottieRef={ref}
            animationData={staticWebAnimation}
            loop={false}
            autoplay={true}
          />

          <Lottie
            lottieRef={moonRef}
            animationData={moonAnimation}
            loop={false}
            autoplay={false}
            onComplete={() => moonRef.current.goToAndStop(0)}
          />

          {/* PLANTS */}
          <Lottie
            lottieRef={plantLeftRef}
            animationData={plantLeftAnimation}
            loop={false}
            autoplay={false}
            onComplete={() => plantLeftRef.current.goToAndStop(0)}
          />

          <Lottie
            lottieRef={plantMidRef}
            animationData={plantMidAnimation}
            loop={false}
            autoplay={false}
            onComplete={() => plantMidRef.current.goToAndStop(0)}
          />

          <Lottie
            lottieRef={plantRightRef}
            animationData={plantRightAnimation}
            loop={false}
            autoplay={false}
            className={"plantRight"}
            onComplete={() => plantRightRef.current.goToAndStop(0)}
          />

          {/* SPEAKERS */}
          <Lottie
            lottieRef={speakersLeftRef}
            animationData={speakersLeftAnimation}
            loop={false}
            autoplay={false}
            onComplete={() => speakersLeftRef.current.goToAndStop(0)}
          />

          <Lottie
            lottieRef={speakersRightRef}
            animationData={speakersRightAnimation}
            loop={false}
            autoplay={false}
            onComplete={() => speakersRightRef.current.goToAndStop(0)}
          />

          <Lottie
            lottieRef={tvLeftRef}
            animationData={tvLeftAnimation}
            loop={false}
            autoplay={false}
            onComplete={() => tvLeftRef.current.goToAndStop(0)}
          />

          <Lottie
            lottieRef={tvMidRef}
            animationData={tvMidAnimation}
            loop={false}
            autoplay={false}
            onComplete={() => tvMidRef.current.goToAndStop(0)}
          />

          <Lottie
            lottieRef={tvRightRef}
            animationData={tvRightAnimation}
            loop={false}
            autoplay={false}
            onComplete={() => tvRightRef.current.goToAndStop(0)}
          />

          {/* BULLFROGS */}
          <Lottie
            lottieRef={bullfrog1Ref}
            animationData={bullfrog1Animation}
            loop={false}
            autoplay={false}
            onComplete={() => bullfrog1Ref.current.goToAndStop(0)}
          />

          <Lottie
            lottieRef={bullfrog2Ref}
            animationData={bullfrog2Animation}
            loop={false}
            autoplay={false}
            onComplete={() => bullfrog2Ref.current.goToAndStop(0)}
          />

          <Lottie
            lottieRef={bullfrog3Ref}
            animationData={bullfrog3Animation}
            loop={false}
            autoplay={false}
            onComplete={() => bullfrog3Ref.current.goToAndStop(0)}
          />

          <Lottie
            lottieRef={bullfrog4Ref}
            animationData={bullfrog4Animation}
            loop={false}
            autoplay={false}
            onComplete={() => bullfrog4Ref.current.goToAndStop(0)}
          />

          <Lottie
            lottieRef={bullfrog5Ref}
            animationData={bullfrog5Animation}
            loop={false}
            autoplay={false}
            onComplete={() => bullfrog5Ref.current.goToAndStop(0)}
          />

          <Lottie
            lottieRef={bullfrog6Ref}
            animationData={bullfrog6Animation}
            loop={false}
            autoplay={false}
            onComplete={() => bullfrog6Ref.current.goToAndStop(0)}
          />

          <Lottie
            lottieRef={bullfrog7Ref}
            animationData={bullfrog7Animation}
            loop={false}
            autoplay={false}
            onComplete={() => bullfrog7Ref.current.goToAndStop(0)}
          />

          <Lottie
            lottieRef={bullfrog8Ref}
            animationData={bullfrog8Animation}
            loop={false}
            autoplay={false}
            onComplete={() => bullfrog8Ref.current.goToAndStop(0)}
          />

          {/* DANCE / EAT / HIRE / EVENTS SVG HIT AREAS */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <SvgComponent
              openLineup={testHandler}
              openMenu={openMenu}
              openHire={openHire}
            />
          </motion.div>
        </>
      ) : (
        <>
          <Lottie
            lottieRef={ref}
            animationData={staticMobileAnimation}
            loop={false}
            autoplay={true}
          />
        </>
      )}
    </OverlayHover>
  );
};

export default AnimationLayer;