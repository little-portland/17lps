import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function SceneNav() {
  const [open, setOpen] = useState(false);

  const links = [
    "The Space",
    "Access",
    "Dining",
    "After Dark",
    "Art (Nocturn)",
    "Private Hire",
    "Open Days",
    "Club Projects",
    "The Network",
    "LPX Radio",
    "Archives",
  ];

  return (
    <>
      {/* TOP BAR */}
      <header className="scene-nav">

        {/* Mobile menu button */}
        <button
          className="scene-nav-burger"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>

        {/* Left links (desktop) */}
        <nav className="scene-nav-left">
          {links.slice(0, 5).map((l) => (
            <a key={l}>{l}</a>
          ))}
        </nav>

        {/* Logo */}
        <div className="scene-nav-logo">
          LOGO
        </div>

        {/* Right links (desktop) */}
        <nav className="scene-nav-right">
          {links.slice(5).map((l) => (
            <a key={l}>{l}</a>
          ))}
        </nav>

      </header>

      {/* MOBILE OVERLAY MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="scene-nav-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="scene-nav-mobile-inner"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {links.map((l) => (
                <a key={l}>{l}</a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
