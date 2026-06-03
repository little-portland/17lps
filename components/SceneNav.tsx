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
        .scene-nav--nocturn {
          position: relative !important;
          top: auto !important;
          left: auto !important;
          right: auto !important;
          z-index: 50 !important;
          width: min(92%, 1280px) !important;
          margin: 34px auto 46px auto !important;
          padding: 0 !important;
          display: grid !important;
          grid-template-columns: 1fr auto 1fr !important;
          align-items: center !important;
          gap: clamp(24px, 4vw, 56px) !important;
          opacity: 1 !important;
          pointer-events: auto !important;
          transform: none !important;
        }

        .scene-nav--nocturn .scene-nav-left,
        .scene-nav--nocturn .scene-nav-right {
          display: flex !important;
          align-items: center !important;
          gap: clamp(26px, 3vw, 48px) !important;
        }

        .scene-nav--nocturn .scene-nav-left {
          justify-content: flex-end !important;
        }

        .scene-nav--nocturn .scene-nav-right {
          justify-content: flex-start !important;
        }

        .scene-nav--nocturn a {
          font-family: Helvetica, Arial, sans-serif !important;
          font-size: clamp(15px, 1.2vw, 18px) !important;
          font-weight: 800 !important;
          line-height: 1 !important;
          letter-spacing: 0.02em !important;
          color: rgba(255, 255, 255, 0.82) !important;
          text-decoration: none !important;
          text-transform: none !important;
          transition: color 0.22s ease, opacity 0.22s ease, transform 0.22s ease !important;
        }

        .scene-nav--nocturn a:hover {
          color: #ff9292 !important;
          transform: translateY(-1px) !important;
        }

        .scene-nav--nocturn a.active {
          color: #ff9292 !important;
        }

        .scene-nav--nocturn a.active::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -8px;
          height: 2px;
          background: #ff9292;
        }

        .scene-nav--nocturn a.disabled {
          color: rgba(255, 255, 255, 0.26) !important;
          pointer-events: none !important;
          cursor: default !important;
        }

        .scene-nav--nocturn .scene-nav-logo {
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 54px !important;
          height: 54px !important;
          transform: none !important;
        }

        .scene-nav--nocturn .scene-nav-logo::after {
          display: none !important;
        }

        .scene-nav--nocturn .scene-nav-logo img {
          display: block !important;
          width: 54px !important;
          height: 54px !important;
          object-fit: contain !important;
          filter: brightness(0) invert(1) !important;
          opacity: 0.96 !important;
        }

        .scene-nav--nocturn .scene-nav-burger {
          display: none !important;
        }

        @media (max-width: 900px) {
          .scene-nav--nocturn {
            width: 90% !important;
            margin: 22px auto 32px auto !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            min-height: 48px !important;
          }

          .scene-nav--nocturn .scene-nav-left,
          .scene-nav--nocturn .scene-nav-right {
            display: none !important;
          }

          .scene-nav--nocturn .scene-nav-logo {
            width: 48px !important;
            height: 48px !important;
          }

          .scene-nav--nocturn .scene-nav-logo img {
            width: 48px !important;
            height: 48px !important;
          }

          .scene-nav--nocturn .scene-nav-burger {
            display: flex !important;
            position: absolute !important;
            left: 0 !important;
            top: 50% !important;
            width: 42px !important;
            height: 42px !important;
            transform: translateY(-50%) !important;
            border: 1px solid rgba(255, 255, 255, 0.28) !important;
            border-radius: 999px !important;
            background: rgba(255, 255, 255, 0.06) !important;
            align-items: center !important;
            justify-content: center !important;
            flex-direction: column !important;
            gap: 6px !important;
            cursor: pointer !important;
          }

          .scene-nav--nocturn .scene-nav-burger span {
            display: block !important;
            width: 18px !important;
            height: 2px !important;
            border-radius: 999px !important;
            background: #ffffff !important;
            transition: transform 0.22s ease, opacity 0.22s ease !important;
          }

          .scene-nav--nocturn .scene-nav-burger.open span:first-child {
            transform: translateY(4px) rotate(45deg) !important;
          }

          .scene-nav--nocturn .scene-nav-burger.open span:last-child {
            transform: translateY(-4px) rotate(-45deg) !important;
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
            padding: calc(var(--scene-nav-space, 0px) + 14px) 24px 24px 24px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 22px !important;
          }

          .scene-nav-mobile--nocturn .scene-nav-mobile-inner a {
            font-family: Helvetica, Arial, sans-serif !important;
            font-size: 26px !important;
            font-weight: 800 !important;
            color: rgba(255, 255, 255, 0.84) !important;
            text-decoration: none !important;
          }

          .scene-nav-mobile--nocturn .scene-nav-mobile-inner a.active {
            color: #ff9292 !important;
          }

          .scene-nav-mobile--nocturn .scene-nav-mobile-inner a.disabled {
            color: rgba(255, 255, 255, 0.24) !important;
            pointer-events: none !important;
          }
        }
      `}</style>
    </>
  );
}
