import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

type SceneNavTheme = 'default' | 'access' | 'space' | 'tent-radio' | 'nocturn';

type NavLink = {
  label: string;
  href: string;
  activePaths: string[];
};

export default function SceneNav({
  visible = true,
  theme = 'default',
}: {
  visible?: boolean;
  theme?: SceneNavTheme;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const links: NavLink[] = [
    {
      label: 'Concept',
      href: '/concept',
      activePaths: ['/concept'],
    },
    {
      label: 'Access',
      href: '/access',
      activePaths: ['/access'],
    },
    {
      label: 'Nocturn',
      href: '/nocturn-test',
      activePaths: ['/nocturn', '/nocturn-test'],
    },
    {
      label: 'Projects',
      href: '/projects',
      activePaths: ['/projects'],
    },
    {
      label: 'Network',
      href: '#',
      activePaths: [],
    },
    {
      label: 'Archives',
      href: '#',
      activePaths: [],
    },
  ];

  const currentPath = router.asPath.split('?')[0].split('#')[0];

  const getLinkClassName = (href: string, activePaths: string[] = []) => {
    const classes: string[] = [];

    if (href === '#') classes.push('disabled');
    if (activePaths.includes(currentPath)) classes.push('active');

    return classes.join(' ');
  };

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href === '#') {
      event.preventDefault();
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <header
        className={`scene-nav scene-nav--${theme} ${visible ? 'visible' : ''} ${
          open ? 'is-open' : ''
        }`}
      >
        <button
          className={`scene-nav-burger ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          type="button"
        >
          <span />
          <span />
        </button>

        <nav className="scene-nav-left" aria-label="Primary navigation left">
          {links.slice(0, 3).map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={getLinkClassName(l.href, l.activePaths)}
              onClick={(event) => handleLinkClick(event, l.href)}
              aria-disabled={l.href === '#'}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="/"
          className="scene-nav-logo"
          aria-label="Go to home page"
          onClick={() => setOpen(false)}
        >
          <img
            src="/images/LPS-logo-bandw.png"
            alt="Logo"
            width={250}
            height={250}
          />
        </a>

        <nav className="scene-nav-right" aria-label="Primary navigation right">
          {links.slice(3).map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={getLinkClassName(l.href, l.activePaths)}
              onClick={(event) => handleLinkClick(event, l.href)}
              aria-disabled={l.href === '#'}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className={`scene-nav-mobile scene-nav--${theme} scene-nav-mobile--${theme}`}
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
                  className={getLinkClassName(l.href, l.activePaths)}
                  onClick={(event) => handleLinkClick(event, l.href)}
                  aria-disabled={l.href === '#'}
                >
                  {l.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .scene-nav.scene-nav--nocturn {
          position: relative !important;
          top: auto !important;
          left: auto !important;
          right: auto !important;
          z-index: 50 !important;
          width: min(90%, 1080px) !important;
          margin: 12px auto 8px auto !important;
          padding: 0 !important;
          display: grid !important;
          grid-template-columns: 1fr auto 1fr !important;
          align-items: center !important;
          gap: clamp(22px, 3vw, 46px) !important;
          opacity: 1 !important;
          pointer-events: auto !important;
          transform: none !important;
          border: 0 !important;
          background: transparent !important;
        }

        .scene-nav.scene-nav--nocturn.is-open {
          z-index: 1001 !important;
        }

        .scene-nav.scene-nav--nocturn::before,
        .scene-nav.scene-nav--nocturn::after {
          content: none !important;
          display: none !important;
        }

        .scene-nav--nocturn .scene-nav-left,
        .scene-nav--nocturn .scene-nav-right {
          display: flex !important;
          align-items: center !important;
          gap: clamp(24px, 2.8vw, 46px) !important;
        }

        .scene-nav--nocturn .scene-nav-left {
          justify-content: flex-end !important;
        }

        .scene-nav--nocturn .scene-nav-right {
          justify-content: flex-start !important;
        }

        .scene-nav--nocturn a {
          position: relative !important;
          font-family: Helvetica, Arial, sans-serif !important;
          font-size: clamp(15px, 1.08vw, 18px) !important;
          font-weight: 800 !important;
          line-height: 1 !important;
          letter-spacing: 0.02em !important;
          color: rgba(255, 255, 255, 0.82) !important;
          text-decoration: none !important;
          text-transform: none !important;
          transition: color 0.22s ease, opacity 0.22s ease !important;
        }

        .scene-nav--nocturn a::before,
        .scene-nav--nocturn a::after {
          content: none !important;
          display: none !important;
        }

        .scene-nav--nocturn a:hover {
          color: #ff9292 !important;
        }

        .scene-nav--nocturn a.active {
          color: #ff9292 !important;
        }

        .scene-nav--nocturn a.disabled {
          color: rgba(255, 255, 255, 0.56) !important;
          opacity: 1 !important;
          pointer-events: none !important;
          cursor: default !important;
        }

        .scene-nav--nocturn .scene-nav-logo {
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 40px !important;
          height: 40px !important;
          transform: none !important;
          flex: 0 0 40px !important;
        }

        .scene-nav--nocturn .scene-nav-logo::before,
        .scene-nav--nocturn .scene-nav-logo::after {
          content: none !important;
          display: none !important;
        }

        .scene-nav--nocturn .scene-nav-logo img {
          display: block !important;
          width: 40px !important;
          height: 40px !important;
          object-fit: contain !important;
          filter: brightness(0) invert(1) !important;
          opacity: 0.96 !important;
        }

        .scene-nav--nocturn .scene-nav-burger {
          display: none !important;
        }

        @media (max-width: 900px) {
          .scene-nav.scene-nav--nocturn {
            width: 88% !important;
            margin: 18px auto 18px auto !important;
            display: flex !important;
            align-items: center !important;
            justify-content: flex-end !important;
            min-height: 46px !important;
          }

          .scene-nav.scene-nav--nocturn.is-open {
            position: relative !important;
            z-index: 1001 !important;
          }

          .scene-nav--nocturn .scene-nav-left,
          .scene-nav--nocturn .scene-nav-right {
            display: none !important;
          }

          .scene-nav--nocturn .scene-nav-logo {
            width: 46px !important;
            height: 46px !important;
            flex-basis: 46px !important;
          }

          .scene-nav--nocturn .scene-nav-logo img {
            width: 46px !important;
            height: 46px !important;
          }

          .scene-nav--nocturn .scene-nav-burger {
            display: flex !important;
            position: absolute !important;
            left: 0 !important;
            top: 50% !important;
            width: 46px !important;
            height: 46px !important;
            transform: translateY(-50%) !important;
            border: 0 !important;
            border-radius: 0 !important;
            background: transparent !important;
            align-items: center !important;
            justify-content: center !important;
            flex-direction: column !important;
            gap: 9px !important;
            cursor: pointer !important;
            padding: 0 !important;
          }

          .scene-nav--nocturn .scene-nav-burger span {
            display: block !important;
            width: 36px !important;
            height: 3px !important;
            border-radius: 999px !important;
            background: #ffffff !important;
            transition: transform 0.22s ease, opacity 0.22s ease !important;
          }

          .scene-nav--nocturn .scene-nav-burger.open span:first-child {
            transform: translateY(6px) rotate(45deg) !important;
          }

          .scene-nav--nocturn .scene-nav-burger.open span:last-child {
            transform: translateY(-6px) rotate(-45deg) !important;
          }

          .scene-nav-mobile--nocturn {
            position: fixed !important;
            inset: 0 !important;
            z-index: 999 !important;
            background: rgba(10, 24, 109, 0.96) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }

          .scene-nav-mobile--nocturn .scene-nav-mobile-inner {
            width: min(86vw, 420px) !important;
            padding: 90px 24px 24px 24px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 22px !important;
          }

          .scene-nav-mobile--nocturn .scene-nav-mobile-inner a {
            font-family: Helvetica, Arial, sans-serif !important;
            font-size: 36px !important;
            font-weight: 800 !important;
            line-height: 1.12 !important;
            color: rgba(255, 255, 255, 0.84) !important;
            text-decoration: none !important;
          }

          .scene-nav-mobile--nocturn .scene-nav-mobile-inner a.active {
            color: #ff9292 !important;
          }

          .scene-nav-mobile--nocturn .scene-nav-mobile-inner a.disabled {
            color: rgba(255, 255, 255, 0.56) !important;
            pointer-events: none !important;
          }
        }
      `}</style>
    </>
  );
}
