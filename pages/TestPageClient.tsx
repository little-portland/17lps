import React, { useState, useEffect } from "react";
import Layout from "@components/Layout/Layout-old";
import { AnimatePresence, motion } from "framer-motion";
import AnimationDesktopOnly from "@components/Animation/AnimationDesktopOnly";
import { useLoaded } from "../store/context";
import Canvas from "@components/Canvas";

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
  const [menuOpen, setMenuOpen] = useState(false);

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
      {/* Canvas preloader */}
      {canvasState && !isLoaded && (
        <Canvas removeSelf={setCanvasState} />
      )}

      <Layout
        hideNav
        eatItem={mockEatItem}
        hireItem={mockHireItem}
        main={
          <Scene
            isLoaded={isLoaded}
            setLoaded={setLoaded}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
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
  menuOpen,
  setMenuOpen,
}: {
  isLoaded: boolean;
  setLoaded: (v: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}) {
  return (
    <div className="scene-wrapper">

      {/* SCENE CONTENT */}
      <div className={`scene-content ${menuOpen ? "blurred" : ""}`}>

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

      {/* CLICK CAPTURE LAYER */}
      {!menuOpen && (
        <div
          className="scene-click-capture"
          onClick={() => setMenuOpen(true)}
        />
      )}

      {/* MENU OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="scene-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="scene-menu-nav">
                <a href="/events" target="_blank" rel="noopener noreferrer">The Space</a>
                <a href="/access" target="_blank" rel="noopener noreferrer">Access</a>
                <a href="/food" target="_blank" rel="noopener noreferrer">Dining</a>
                <a href="/theclub" target="_blank" rel="noopener noreferrer">After Dark</a>
                <a href="/nocturn" target="_blank" rel="noopener noreferrer">Art (Nocturn)</a>
                <a href="/about" target="_blank" rel="noopener noreferrer">Private Hire</a>
                <a href="/events" target="_blank" rel="noopener noreferrer">Open Days</a>

                {/* Disabled links */}
                <a className="disabled">Club Projects</a>
                <a className="disabled">The Network</a>
                <a className="disabled">LPX Radio</a>
                <a className="disabled">Archives</a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
