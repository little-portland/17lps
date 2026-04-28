import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

export default function SceneNav({
  visible = true,
  theme = "default",
}: {
  visible?: boolean;
  theme?: "default" | "access" | "space";
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const links = [
    { label: "The Space", href: "/the-space" },
    { label: "Access", href: "/access" },
    { label: "Dining", href: "/food" },
    { label: "After Dark", href: "/theclub" },
    { label: "Nocturn", href: "/nocturn" },
    { label: "The Network", href: "#" },
    { label: "LPX Radio", href: "/thetentradio" },
    { label: "Archives", href: "#" },
  ];

  const getLinkClassName = (href: string) => {
    const classes = [];

    if (href === "#") classes.push("disabled");
    if (router.pathname === href) classes.push("active");

    return classes.join(" ");
  };

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href === "#") {
      event.preventDefault();
    }

    setOpen(false);
  };

  return (
    <>
      <header
        className={`scene-nav scene-nav--${theme} ${visible ? "visible" : ""} ${
          open ? "is-open" : ""
        }`}
      >
        {/* BURGER (mobile) */}
        <button
          className={`scene-nav-burger ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span />
          <span />
        </button>

        {/* LEFT LINKS (desktop) */}
        <nav className="scene-nav-left">
          {links.slice(0, 4).map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={getLinkClassName(l.href)}
              onClick={(event) => handleLinkClick(event, l.href)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* LOGO */}
        <div className="scene-nav-logo">
          <img
            src="/images/LPS-logo-bandw.png"
            alt="Logo"
            width={250}
            height={250}
          />
        </div>

        {/* RIGHT LINKS (desktop) */}
        <nav className="scene-nav-right">
          {links.slice(4).map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={getLinkClassName(l.href)}
              onClick={(event) => handleLinkClick(event, l.href)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className={`scene-nav-mobile scene-nav-mobile--${theme}`}
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
                <a
                  key={l.label}
                  href={l.href}
                  className={getLinkClassName(l.href)}
                  onClick={(event) => handleLinkClick(event, l.href)}
                >
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
