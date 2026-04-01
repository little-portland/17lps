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

      <motion.a
        href="/book"
        initial={{ opacity: 0, y: 24 }}
        animate={{
          opacity: isMobile ? 1 : isLoaded ? 1 : 0,
          y: isMobile ? 0 : isLoaded ? 0 : 24,
        }}
        transition={{
          duration: 0.6,
          ease: [0.2, 0.8, 0.2, 1],
        }}
        style={{
          position: "fixed",
          left: "50%",
          bottom: "24px",
          transform: "translateX(-50%)",
          zIndex: 9999,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "140px",
          height: "20%",
          padding: "0 20px",
          background: "#000",
          color: "#fff",
          textDecoration: "none",
          textTransform: "uppercase",
          border: "1px solid #000",
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: 1,
          cursor: "pointer",
        }}
      >
        Book
      </motion.a>
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
  const debugDay: number | null = null; // set to 4, 5, 6 etc. for testing
  const day = debugDay ?? realDay;

  const obeliskHref =
    day === 4
      ? "/images/obelisk-green.png"
      : day === 5
        ? "/images/obelisk-red.png"
        : day === 6
          ? "/images/obelisk-purple.png"
          : "/images/obelisk-grey.png";

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
              <image
                href={obeliskHref}
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
