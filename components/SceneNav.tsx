import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function SceneNav({
  visible = true,
}: {
  visible?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "The Space", href: "/events" },
    { label: "Access", href: "/access" },
    { label: "Dining", href: "/food" },
    { label: "After Dark", href: "/theclub" },
    { label: "Art (Nocturn)", href: "/nocturn" },
    { label: "Private Hire", href: "/about" },
    { label: "Open Days", href: "/events" },
    { label: "Club Projects", href: "#" },
    { label: "The Network", href: "#" },
    { label: "LPX Radio", href: "#" },
    { label: "Archives", href: "#" },
  ];

  return (
    <>
      {/* =====================================================
         TOP NAV
      ===================================================== */}
      <header className={`scene-nav ${visible ? "visible" : ""}`}>

        {/* BURGER (mobile) */}
        <button
          className={`scene-nav-burger ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span />
          <span />
        </button>

        {/* LEFT LINKS (desktop) */}
        <nav className="scene-nav-left">
          {links.slice(0, 5).map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* LOGO */}
        <div className="scene-nav-logo">
          <img
            src="/images/LPS-logo-bandw.png"
            alt="Logo"
          />
        </div>

        {/* RIGHT LINKS (desktop) */}
        <nav className="scene-nav-right">
          {links.slice(5).map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
      </header>

      {/* =====================================================
         MOBILE OVERLAY
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
              onClick={(e) => e.stopPropagation()}
            >
              {links.map((l) => (
                <a key={l.label} href={l.href}>
                  {l.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
