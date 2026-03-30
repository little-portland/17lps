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
            <Scene isLoaded={isLoaded} setLoaded={setLoaded} />
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

  const realDay = new Date().getDay();
  const testDay = 4; // change to 4, 5, 6, etc.
  const day = testDay;

  const filterId =
    day === 4
      ? "obelisk-green"
      : day === 5
        ? "obelisk-red"
        : day === 6
          ? "obelisk-purple"
          : "obelisk-grey";

  return (
    <div className="scene-wrapper">
      <div className="scene-content">
        <div className="scene-filter">
          <AnimationDesktopOnly
            isLoaded={isLoaded}
            setLoaded={setLoaded}
            isTestPage
          />
        </div>

        <svg
          viewBox="0 0 3840 2160"
          className="scene-overlay"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            {/* 
              These filters preserve the PNG's internal shading.
              They convert the source image to luminance, then map that
              brightness into the target color.
            */}

            {/* Thursday: #00ff00 */}
            <filter id="obelisk-green" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="
                  0 0 0 0 0
                  0.2126 0.7152 0.0722 0 0
                  0 0 0 0 0
                  0 0 0 1 0
                "
              />
            </filter>

            {/* Friday: #fb0000 */}
            <filter id="obelisk-red" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="
                  0.2084 0.7009 0.0709 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 1 0
                "
              />
            </filter>

            {/* Saturday: #6a76db */}
            <filter id="obelisk-purple" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="
                  0.0884 0.2976 0.0300 0 0
                  0.0984 0.3916 0.0398 0 0
                  0.1836 0.6510 0.0658 0 0
                  0 0 0 1 0
                "
              />
            </filter>

            {/* All other days: grey */}
            <filter id="obelisk-grey" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="
                  0.1063 0.3576 0.0361 0 0
                  0.1063 0.3576 0.0361 0 0
                  0.1063 0.3576 0.0361 0 0
                  0 0 0 1 0
                "
              />
            </filter>
          </defs>

          <motion.g
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
            <motion.g
              animate={{
                scale: [1, 1.035, 1],
                opacity: [1, 0.96, 1],
              }}
              transition={{
                duration: 2.8,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 3.4,
              }}
            >
              <image
                href="/images/obelisk.png"
                x={obelisk.x}
                y={obelisk.y}
                width={obelisk.width}
                height={obelisk.height}
                filter={`url(#${filterId})`}
              />
            </motion.g>
          </motion.g>
        </svg>
      </div>
    </div>
  );
}
