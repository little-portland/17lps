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

  const realDay = new Date().getDay();
  const debugDay: number | null = null; // set to 4, 5, 6 to test
  const day = debugDay ?? realDay;

  const gradientId =
    day === 4
      ? "obelisk-gradient-green"
      : day === 5
        ? "obelisk-gradient-red"
        : day === 6
          ? "obelisk-gradient-purple"
          : "obelisk-gradient-grey";

  const maskId = isMobile ? "obelisk-mask-mobile" : "obelisk-mask-desktop";

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
            <mask
              id={maskId}
              maskUnits="userSpaceOnUse"
              x={obelisk.x}
              y={obelisk.y}
              width={obelisk.width}
              height={obelisk.height}
              style={{ maskType: "alpha" }}
            >
              <image
                href="/images/obelisk.png"
                x={obelisk.x}
                y={obelisk.y}
                width={obelisk.width}
                height={obelisk.height}
                preserveAspectRatio="none"
              />
            </mask>

            <linearGradient
              id="obelisk-gradient-green"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#00ff00" />
              <stop offset="50%" stopColor="#7dff7d" />
              <stop offset="100%" stopColor="#00ff00" />
            </linearGradient>

            <linearGradient
              id="obelisk-gradient-red"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#fb0000" />
              <stop offset="50%" stopColor="#ff7a7a" />
              <stop offset="100%" stopColor="#fb0000" />
            </linearGradient>

            <linearGradient
              id="obelisk-gradient-purple"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#6a76db" />
              <stop offset="50%" stopColor="#b1bbff" />
              <stop offset="100%" stopColor="#6a76db" />
            </linearGradient>

            <linearGradient
              id="obelisk-gradient-grey"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#808080" />
              <stop offset="50%" stopColor="#cfcfcf" />
              <stop offset="100%" stopColor="#808080" />
            </linearGradient>
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
              }}
              transition={{
                duration: 2.8,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 3.4,
              }}
            >
              <rect
                x={obelisk.x}
                y={obelisk.y}
                width={obelisk.width}
                height={obelisk.height}
                fill={`url(#${gradientId})`}
                mask={`url(#${maskId})`}
              />
            </motion.g>
          </motion.g>
        </svg>
      </div>
    </div>
  );
}
