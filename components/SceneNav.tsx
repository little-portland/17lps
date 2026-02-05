import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  isLoaded: boolean; // controls fade-in after scene load
};

export default function SceneNav({ isLoaded }: Props) {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "The Space", href: "/events" },
    { label: "Access", href: "/access" },
    { label: "Dining", href: "/food" },
    { label: "After Dark", href: "/theclub" },
    { label: "Art (Nocturn)", href: "/nocturn" },
    { label: "Private Hire", href: "/about" },
    { label: "Open Days", href: "/events" },

    // Disabled (last 4)
    { label: "Club Projects", disabled: true },
    { label: "The Network", disabled: true },
    { label: "LPX Radio", disabled: true },
    { label: "Archives", disabled: true },
  ];

  return (
    <>
      {/* =====================================================
          TOP NAV BAR
      ===================================================== */}

      <header className={`scene-nav ${isLoaded ? "visible" : ""}`}>

        {/* MOBILE BURGER (top-left) */}
        <button
          className="scene-nav-burger"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>

        {/* LEFT LINKS (desktop) */}
        <nav className="scene-nav-left">
          {links.slice(0, 5).map((link) => (
            <a
              key={link.label}
              href={link.href || "#"}
              style={{
                pointerEvents: link.disabled ? "none" : "auto",
                opacity: link.disabled ? 0.35 : 1,
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* LOGO (center desktop / right mobile) */}
        <div className="scene-nav-logo">
          LOGO
        </div>

        {/* RIGHT LINKS (desktop) */}
        <nav className="scene-nav-right">
          {links.slice(5).map((link) => (
            <a
              key={link.label}
              href={link.href || "#"}
              style={{
                pointerEvents: link.disabled ? "none" : "auto",
                opacity: link.disabled ? 0.35 : 1,
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </nav>

      </header>

      {/* =====================================================
          MOBILE MENU OVERLAY
      ===================================================== */}

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
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href || "#"}
                  style={{
                    pointerEvents: link.disabled ? "none" : "auto",
                    opacity: link.disabled ? 0.35 : 1,
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
