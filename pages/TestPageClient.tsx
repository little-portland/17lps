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

  // ✅ Device detect MUST live at component top level
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
      {/* =====================================================
          CANVAS PRELOADER
      ===================================================== */}
      {canvasState && !isLoaded && (
        <Canvas removeSelf={setCanvasState} />
      )}

      {/* =====================================================
          LAYOUT
      ===================================================== */}
      <Layout
        hideNav
        eatItem={mockEatItem}
        hireItem={mockHireItem}
        main={
          <>
            {/* =================================================
                TOP NAV
                Mobile = instant
                Desktop = after animation
            ================================================= */}
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
// SCENE COMPONENT
// ------------------------------------------------------------------

function Scene({
  isLoaded,
  setLoaded,
}: {
  isLoaded: boolean;
  setLoaded: (v: boolean) => void;
}) {
  const { isMobile } = useDeviceDetect();

  /**
   * Obelisk layout values
   * Desktop vs Mobile
   */
  const obelisk = isMobile
    ? {
        x: 2690,
        y: 270,
        width: 228,
        height: 650,
      }
    : {
        x: 2445,
        y: 710,
        width: 140,
        height: 400,
      };

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

            /* -------------------------------
               ENTRY ANIMATION
            -------------------------------- */
            initial={{
              scaleY: 0,
              opacity: 0,
            }}

            /* -------------------------------
               CONTINUOUS PULSE
            -------------------------------- */
            animate={{
              scaleY: 1,
              opacity: 1,

              // Gentle breathing scale
              scale: [1, 1.2, 1],

              // Subtle brightness pulse
              filter: [
                "brightness(1)",
                "brightness(1.8)",
                "brightness(1)",
              ],
            }}

            /* -------------------------------
               TIMING
            -------------------------------- */
            transition={{
              delay: 2.5,

              // Rise up intro
              scaleY: {
                duration: 0.9,
                ease: [0.2, 0.8, 0.2, 1.05],
              },

              opacity: {
                duration: 0.9,
              },

              // Continuous pulse
              scale: {
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
              },

              filter: {
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
              },
            }}

            /* Prevents bottom anchoring stretch */
            style={{
              transformOrigin: "center bottom",
            }}
          />
        </svg>

      </div>
    </div>
  );
}
