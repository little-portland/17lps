import React, { useEffect } from "react";
import Layout from "@components/Layout/Layout-old";
import { motion } from "framer-motion";
import AnimationDesktopOnly from "@components/Animation/AnimationDesktopOnly";
import { useLoaded } from "../store/context";
import Canvas from "@components/Canvas";
import SceneNav from "@components/SceneNav";
import useDeviceDetect from "@utils/useDeviceDetect";

// ------------------------------------------------------------------
// Mock data REQUIRED by Layout (do not remove)
// ------------------------------------------------------------------

const mockEatItem = {
  image: {
    url: "/images/placeholder.jpg",
    width: 1,
    height: 1,
    description: "placeholder",
  },
  eMail: "test@test.com",
  phoneNumber: "000000000",
};

const mockHireItem = {
  image: {
    url: "/images/placeholder.jpg",
    width: 1,
    height: 1,
    description: "placeholder",
  },
  eMail: "test@test.com",
  phoneNumber: "000000000",
};

// ------------------------------------------------------------------
// PAGE
// ------------------------------------------------------------------

export default function TestPageClient() {
  const { canvasState, setCanvasState, isLoaded, setLoaded } = useLoaded();
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    const prevBg = document.body.style.backgroundColor;
    const prevColor = document.body.style.color;

    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";

    return () => {
      document.body.style.backgroundColor = prevBg;
      document.body.style.color = prevColor;
    };
  }, []);

  return (
    <>
      {canvasState && !isLoaded && (
        <Canvas removeSelf={setCanvasState} />
      )}

      <Layout
        hideNav
        eatItem={mockEatItem}
        hireItem={mockHireItem}
        main={
          <>
            <SceneNav visible={isMobile ? true : isLoaded} />

            <Scene
              isLoaded={isLoaded}
              setLoaded={setLoaded}
            />
          </>
        }
      />
    </>
  );
}

// ------------------------------------------------------------------
// SCENE
// ------------------------------------------------------------------

function Scene({
  isLoaded,
  setLoaded,
}: {
  isLoaded: boolean;
  setLoaded: (v: boolean) => void;
}) {
  const { isMobile } = useDeviceDetect();

  const obelisk = isMobile
    ? { x: 2690, y: 270, width: 228, height: 650 }
    : { x: 2445, y: 710, width: 140, height: 400 };

  return (
    <div className="scene-wrapper">
      <div className="scene-content">

        {/* Filtered animation */}
        <div className="scene-filter">
          <AnimationDesktopOnly
            isLoaded={isLoaded}
            setLoaded={setLoaded}
            isTestPage
          />
        </div>

        {/* =========================================
            OBELISK OVERLAY
        ========================================= */}
        <svg
          viewBox="0 0 3840 2160"
          className="scene-overlay"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <motion.image
            href="/images/obelisk.png"
            x={obelisk.x}
            y={obelisk.y}
            width={obelisk.width}
            height={obelisk.height}

            /* ----------------------------------
               ENTRY STATE
            ---------------------------------- */
            initial={{
              scaleY: 0,
              opacity: 0,
            }}

            /* ----------------------------------
               SEQUENCED ANIMATION
            ---------------------------------- */
            animate={{
              scaleY: 1,
              opacity: 1,
            }}

            transition={{
              delay: 2.5,
              duration: 0.9,
              ease: [0.2, 0.8, 0.2, 1.05],
            }}

            /* ----------------------------------
               PULSE (separate loop)
            ---------------------------------- */
            whileInView={{
              scale: [1, 1.1, 1],
              filter: [
                "brightness(1)",
                "brightness(1.25)",
                "brightness(1)",
              ],
            }}

            viewport={{ once: false }}

            transition={{
              scale: {
                duration: 3.8,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 3.4, // starts AFTER grow
              },
              filter: {
                duration: 3.8,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 3.4,
              },
            }}

            style={{
              transformOrigin: "center bottom",
            }}
          />
        </svg>

      </div>
    </div>
  );
}
