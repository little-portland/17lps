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

  // Force white background for test page
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
      {/* CANVAS PRELOADER */}
      {canvasState && !isLoaded && (
        <Canvas removeSelf={setCanvasState} />
      )}

      {/* LAYOUT */}
      <Layout
        hideNav
        eatItem={mockEatItem}
        hireItem={mockHireItem}
        main={
          <>
            {/* NAV */}
            <SceneNav visible={isMobile ? true : isLoaded} />

            {/* Scene */}
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

        {/* FILTERED SCENE */}
        <div className="scene-filter">
          <AnimationDesktopOnly
            isLoaded={isLoaded}
            setLoaded={setLoaded}
            isTestPage
          />
        </div>

        {/* OBELISK OVERLAY */}
        <svg
          viewBox="0 0 3840 2160"
          className="scene-overlay"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <motion.g
            /* ENTRY */
            initial={{
              scaleY: 0,
              opacity: 0,
            }}

            animate={{
              scaleY: 1,
              opacity: 1,
            }}

            transition={{
              delay: 2.5,
              duration: 0.9,
              ease: [0.2, 0.8, 0.2, 1.05],
            }}

            style={{
              transformOrigin: "center bottom",
            }}
          >
            {/* PULSE (separate loop layer) */}
            <motion.g
              animate={{
                scale: [1, 1.1, 1],
                filter: [
                  "brightness(1)",
                  "brightness(1.2)",
                  "brightness(1)",
                ],
              }}
              transition={{
                duration: 2.8,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 3.4, // starts after grow animation
              }}
            >
              <image
                href="/images/obelisk.png"
                x={obelisk.x}
                y={obelisk.y}
                width={obelisk.width}
                height={obelisk.height}
              />
            </motion.g>
          </motion.g>
        </svg>

      </div>
    </div>
  );
}
