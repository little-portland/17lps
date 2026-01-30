import React, { useState, useEffect } from "react";
import Layout from "@components/Layout/Layout-old";
import { AnimatePresence, motion } from "framer-motion";
import Animation from "@components/Animation";
import { useLoaded } from "../store/context";
import Modal from "@components/UX/Modal";

export default function TestPage() {
  const { isLoaded, setLoaded } = useLoaded();
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
    <Layout
      hideNav
      main={
        <Scene
          isLoaded={isLoaded}
          setLoaded={setLoaded}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* SCENE COMPONENT (all hooks live here safely)                         */
/* ------------------------------------------------------------------ */

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
          <Animation
            isLoaded={isLoaded}
            setLoaded={setLoaded}
            isTestPage
          />
        </div>

        {/* OVERLAY SVG */}
        <svg
          viewBox="0 0 3840 2160"
          className="scene-overlay"
          aria-hidden
        >
          <motion.image
            href="/images/obelisk.png"
            x={2420}
            y={620}
            width={175}
            height={500}
            style={{
              transformBox: "fill-box",
              transformOrigin: "50% 100%", // bottom-center of obelisk
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{
              delay: 1.6,
              duration: 0.9,
              ease: [0.2, 0.8, 0.2, 1.05],
            }}
          />
        </svg>
      </div>

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
            <nav onClick={(e) => e.stopPropagation()}>
              <a href="/events">Events</a>
              <a href="/artists">Artists</a>
              <a href="/about">About</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
