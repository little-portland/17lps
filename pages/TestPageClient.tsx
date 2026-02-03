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
    {/* ✅ THIS is what mobile was missing */}

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
// SCENE COMPONENT (all interactive logic lives here)
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
      {/* CLICKABLE SCENE */}
      <div
        className={`scene-content ${menuOpen ? "blurred" : ""}`}
        onClick={() => setMenuOpen(true)}
      >
        {/* FILTERED SVG */}
        <div className="scene-filter">
          <AnimationDesktopOnly
            isLoaded={isLoaded}
            setLoaded={setLoaded}
            isTestPage
          />
        </div>

        {/* OVERLAY SVG */}
        <svg
          viewBox="0 0 3840 2160"
          className="scene-overlay"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <motion.image
            href="/images/obelisk.png"
            x={2420}
            y={620}
            width={175}
            height={500}
            style={{
              transformOrigin: "50% 0%",
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{
              delay: 2.5,
              duration: 0.9,
              ease: [0.2, 0.8, 0.2, 1.05],
            }}
          />
        </svg>
      </div> {/* ← closes .scene-content */}

     {/* MENU OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="scene-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)} // click outside closes
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()} // prevent close inside
            >
              <nav className="scene-menu-nav">
                <a href="/events" target="_blank" rel="noopener noreferrer">The Space</a>
                <a href="/access" target="_blank" rel="noopener noreferrer">Access</a>
                <a href="/food" target="_blank" rel="noopener noreferrer">Dining</a>
                <a href="/theclub" target="_blank" rel="noopener noreferrer">After Dark</a>
                <a href="/nocturn" target="_blank" rel="noopener noreferrer">Art (Nocturn)</a>
                <a href="/about" target="_blank" rel="noopener noreferrer">Private Hire</a>
                <a href="/events" target="_blank" rel="noopener noreferrer">Open Days</a>
                <a href="/artists" target="_blank" rel="noopener noreferrer">Club Projects</a>
                <a href="/about" target="_blank" rel="noopener noreferrer">The Network</a>
                <a href="/events" target="_blank" rel="noopener noreferrer">LPX Radio</a>
                <a href="/about" target="_blank" rel="noopener noreferrer">Archives</a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* closes .scene-wrapper */}
    </div>
  );
}
