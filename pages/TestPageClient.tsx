import React, { useState, useEffect } from "react";
import Layout from "@components/Layout/Layout-old";
import { motion } from "framer-motion";
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
          <>
            <SceneNav />
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
// TOP NAVIGATION
// ------------------------------------------------------------------

function SceneNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="scene-nav">

        {/* Mobile burger */}
        <button
          className="scene-nav-burger"
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </button>

        {/* Left links (desktop) */}
        <nav className="scene-nav-left">
          <a href="/events">The Space</a>
          <a href="/access">Access</a>
          <a href="/food">Dining</a>
          <a href="/theclub">After Dark</a>
          <a href="/nocturn">Art (Nocturn)</a>
        </nav>

        {/* Logo */}
        <div className="scene-nav-logo">
          LOGO
        </div>

        {/* Right links (desktop) */}
        <nav className="scene-nav-right">
          <a href="/about">Private Hire</a>
          <a href="/events">Open Days</a>
          <a href="#">Club Projects</a>
          <a href="#">The Network</a>
          <a href="#">LPX Radio</a>
          <a href="#">Archives</a>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="scene-nav-mobile"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="scene-nav-mobile-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <a href="/events">The Space</a>
            <a href="/access">Access</a>
            <a href="/food">Dining</a>
            <a href="/theclub">After Dark</a>
            <a href="/nocturn">Art (Nocturn)</a>
            <a href="/about">Private Hire</a>
            <a href="/events">Open Days</a>
            <a href="#">Club Projects</a>
            <a href="#">The Network</a>
            <a href="#">LPX Radio</a>
            <a href="#">Archives</a>
          </div>
        </div>
      )}
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

      {/* SCENE CONTENT */}
      <div className="scene-content">

        {/* Filtered animation */}
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
    </div>
  );
}
