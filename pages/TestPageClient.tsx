import React, { useEffect } from "react";
import Layout from "@components/Layout/Layout-old";
import { motion } from "framer-motion";
import AnimationDesktopOnly from "@components/Animation/AnimationDesktopOnly";
import { useLoaded } from "../store/context";
import Canvas from "@components/Canvas";
import SceneNav from "@components/SceneNav";

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
            {/* Top navigation (fades in after load) */}
            <SceneNav isLoaded={isLoaded} />

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
  return (
    <div className="scene-wrapper">

      {/* =====================================================
          SCENE CONTENT
      ===================================================== */}
      <div className="scene-content">

        {/* Filtered animation layer */}
        <div className="scene-filter">
          <AnimationDesktopOnly
            isLoaded={isLoaded}
            setLoaded={setLoaded}
            isTestPage
          />
        </div>

        {/* =====================================================
            OBELISK OVERLAY
        ===================================================== */}
        <svg
          viewBox="0 0 3840 2160"
          className="scene-overlay"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <motion.image
            href="/images/obelisk.png"
            x={2445}
            y={710}
            width={140}
            height={400}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{
              delay: 2.5,
              duration: 0.9,
              ease: [0.2, 0.8, 0.2, 1.05],
            }}
          />
        </svg>

      </div>
    </div>
  );
}
