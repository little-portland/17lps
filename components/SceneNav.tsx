import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

type SceneNavTheme =
  | 'default'
  | 'access'
  | 'space'
  | 'tent-radio'
  | 'nocturn'
  | 'dining';

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
  const [hasScrolled, setHasScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 8);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        } ${hasScrolled ? 'has-scrolled' : ''}`}
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
        /*
          Prevent menu items from moving up/down on hover on every page.
          This also protects against older page-level styles that might still
          add transform: translateY(...) to nav links.
        */
        .scene-nav a,
        .scene-nav a:hover,
        .scene-nav a:focus,
        .scene-nav a:active,
        .scene-nav a.active,
        .scene-nav-mobile a,
        .scene-nav-mobile a:hover,
        .scene-nav-mobile a:focus,
        .scene-nav-mobile a:active,
        .scene-nav-mobile a.active {
          transform: none !important;
        }

        .scene-nav.scene-nav--nocturn,
        .scene-nav.scene-nav--dining {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 1000 !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 12px max(5vw, calc((100vw - 1080px) / 2)) 10px
            max(5vw, calc((100vw - 1080px) / 2)) !important;
          display: grid !important;
          grid-template-columns: 1fr auto 1fr !important;
          align-items: center !important;
          gap: clamp(22px, 3vw, 46px) !important;
          opacity: 1 !important;
          pointer-events: auto !important;
          transform: none !important;
          border: 0 !important;
          background: transparent !important;
          transition: background 0.25s ease, box-shadow 0.25s ease,
            backdrop-filter 0.25s ease !important;
          box-sizing: border-box !important;
        }

        .scene-nav.scene-nav--nocturn.has-scrolled {
          background: rgba(10, 24, 109, 0.94) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12) !important;
        }

        .scene-nav.scene-nav--dining.has-scrolled {
          background: rgba(0, 0, 0, 0.94) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.28) !important;
        }

        .scene-nav.scene-nav--nocturn.is-open,
        .scene-nav.scene-nav--dining.is-open {
          z-index: 1001 !important;
        }

        .scene-nav.scene-nav--nocturn::before,
        .scene-nav.scene-nav--nocturn::after,
        .scene-nav.scene-nav--dining::before,
        .scene-nav.scene-nav--dining::after {
          content: none !important;
          display: none !important;
        }

        .scene-nav--nocturn .scene-nav-left,
        .scene-nav--nocturn .scene-nav-right,
        .scene-nav--dining .scene-nav-left,
        .scene-nav--dining .scene-nav-right {
          display: flex !important;
          align-items: center !important;
        }

        .scene-nav--nocturn .scene-nav-left,
        .scene-nav--nocturn .scene-nav-right {
          gap: clamp(24px, 2.8vw, 46px) !important;
        }

        .scene-nav--dining .scene-nav-left,
        .scene-nav--dining .scene-nav-right {
          gap: clamp(20px, 2.1vw, 34px) !important;
        }

        .scene-nav--nocturn .scene-nav-left,
        .scene-nav--dining .scene-nav-left {
          justify-content: flex-end !important;
        }

        .scene-nav--nocturn .scene-nav-right,
        .scene-nav--dining .scene-nav-right {
          justify-content: flex-start !important;
        }

        .scene-nav--nocturn a,
        .scene-nav--dining a {
          position: relative !important;
          text-decoration: none !important;
          text-transform: none !important;
          transition: color 0.22s ease, opacity 0.22s ease !important;
        }

        .scene-nav--nocturn a {
          font-family: Helvetica, Arial, sans-serif !important;
          font-size: clamp(16px, 1.12vw, 19px) !important;
          font-weight: 800 !important;
          line-height: 1 !important;
          letter-spacing: 0.02em !important;
          color: rgba(255, 255, 255, 0.82) !important;
        }

        .scene-nav--dining a {
          font-family: 'Space Mono', 'Courier New', monospace !important;
          font-size: clamp(13px, 0.9vw, 15px) !important;
          font-weight: 700 !important;
          line-height: 1 !important;
          letter-spacing: 0.025em !important;
          color: rgba(61, 207, 214, 0.86) !important;
        }

        .scene-nav--nocturn a::before,
        .scene-nav--nocturn a::after,
        .scene-nav--dining a::before,
        .scene-nav--dining a::after {
          content: none !important;
          display: none !important;
        }

        .scene-nav--nocturn a:hover,
        .scene-nav--nocturn a.active {
          color: #ff9292 !important;
        }

        .scene-nav--dining a:hover,
        .scene-nav--dining a.active {
          color: #f57658 !important;
        }

        .scene-nav--nocturn a.disabled {
          color: rgba(255, 255, 255, 0.56) !important;
          opacity: 1 !important;
          pointer-events: none !important;
          cursor: default !important;
        }

        .scene-nav--dining a.disabled {
          color: rgba(61, 207, 214, 0.5) !important;
          opacity: 1 !important;
          pointer-events: none !important;
          cursor: default !important;
        }

        .scene-nav--nocturn .scene-nav-logo,
        .scene-nav--dining .scene-nav-logo {
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
        .scene-nav--nocturn .scene-nav-logo::after,
        .scene-nav--dining .scene-nav-logo::before,
        .scene-nav--dining .scene-nav-logo::after {
          content: none !important;
          display: none !important;
        }

        .scene-nav--nocturn .scene-nav-logo img,
        .scene-nav--dining .scene-nav-logo img {
          display: block !important;
          width: 40px !important;
          height: 40px !important;
          object-fit: contain !important;
          opacity: 0.96 !important;
        }

        .scene-nav--nocturn .scene-nav-logo img {
          filter: brightness(0) invert(1) !important;
        }

        .scene-nav--dining .scene-nav-logo img {
          filter: brightness(0) saturate(100%) invert(62%) sepia(66%)
            saturate(1077%) hue-rotate(322deg) brightness(101%)
            contrast(93%) !important;
        }

        .scene-nav--nocturn .scene-nav-burger,
        .scene-nav--dining .scene-nav-burger {
          display: none !important;
        }

        @media (max-width: 900px) {
          .scene-nav.scene-nav--nocturn,
          .scene-nav.scene-nav--dining {
            width: 100% !important;
            margin: 0 !important;
            padding: 18px 6% 14px 6% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: flex-end !important;
            min-height: 72px !important;
          }

          .scene-nav.scene-nav--nocturn.is-open,
          .scene-nav.scene-nav--dining.is-open {
            z-index: 1001 !important;
          }

          .scene-nav--nocturn .scene-nav-left,
          .scene-nav--nocturn .scene-nav-right,
          .scene-nav--dining .scene-nav-left,
          .scene-nav--dining .scene-nav-right {
            display: none !important;
          }

          .scene-nav--nocturn .scene-nav-logo,
          .scene-nav--dining .scene-nav-logo {
            width: 46px !important;
            height: 46px !important;
            flex-basis: 46px !important;
          }

          .scene-nav--nocturn .scene-nav-logo img,
          .scene-nav--dining .scene-nav-logo img {
            width: 46px !important;
            height: 46px !important;
          }

          .scene-nav--nocturn .scene-nav-burger,
          .scene-nav--dining .scene-nav-burger {
            display: flex !important;
            position: absolute !important;
            left: 6% !important;
            top: 50% !important;
            width: 52px !important;
            height: 52px !important;
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
            overflow: visible !important;
          }

          .scene-nav--nocturn .scene-nav-burger span,
          .scene-nav--dining .scene-nav-burger span {
            display: block !important;
            width: 38px !important;
            height: 3px !important;
            border-radius: 999px !important;
            transition: transform 0.22s ease, opacity 0.22s ease !important;
          }

          .scene-nav--nocturn .scene-nav-burger span {
            background: #ffffff !important;
          }

          .scene-nav--dining .scene-nav-burger span {
            background: #3dcfd6 !important;
          }

          .scene-nav--nocturn .scene-nav-burger.open span,
          .scene-nav--dining .scene-nav-burger.open span {
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            width: 42px !important;
            height: 3px !important;
          }

          .scene-nav--nocturn .scene-nav-burger.open span:first-child,
          .scene-nav--dining .scene-nav-burger.open span:first-child {
            transform: translate(-50%, -50%) rotate(45deg) !important;
          }

          .scene-nav--nocturn .scene-nav-burger.open span:last-child,
          .scene-nav--dining .scene-nav-burger.open span:last-child {
            transform: translate(-50%, -50%) rotate(-45deg) !important;
          }

          .scene-nav-mobile--nocturn,
          .scene-nav-mobile--dining {
            position: fixed !important;
            inset: 0 !important;
            z-index: 999 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }

          .scene-nav-mobile--nocturn {
            background: rgba(10, 24, 109, 0.96) !important;
          }

          .scene-nav-mobile--dining {
            background: rgba(0, 0, 0, 0.96) !important;
          }

          .scene-nav-mobile--nocturn .scene-nav-mobile-inner,
          .scene-nav-mobile--dining .scene-nav-mobile-inner {
            width: min(86vw, 420px) !important;
            padding: 82px 24px 24px 24px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 18px !important;
          }

          .scene-nav-mobile--nocturn .scene-nav-mobile-inner a,
          .scene-nav-mobile--dining .scene-nav-mobile-inner a {
            text-decoration: none !important;
          }

          .scene-nav-mobile--nocturn .scene-nav-mobile-inner a {
            font-family: Helvetica, Arial, sans-serif !important;
            font-size: 28px !important;
            font-weight: 800 !important;
            line-height: 1.1 !important;
            color: rgba(255, 255, 255, 0.84) !important;
          }

          .scene-nav-mobile--dining .scene-nav-mobile-inner a {
            font-family: 'Space Mono', 'Courier New', monospace !important;
            font-size: 23px !important;
            font-weight: 700 !important;
            line-height: 1.1 !important;
            color: rgba(61, 207, 214, 0.86) !important;
          }

          .scene-nav-mobile--nocturn .scene-nav-mobile-inner a.active {
            color: #ff9292 !important;
          }

          .scene-nav-mobile--dining .scene-nav-mobile-inner a.active {
            color: #f57658 !important;
          }

          .scene-nav-mobile--nocturn .scene-nav-mobile-inner a.disabled {
            color: rgba(255, 255, 255, 0.56) !important;
            pointer-events: none !important;
          }

          .scene-nav-mobile--dining .scene-nav-mobile-inner a.disabled {
            color: rgba(61, 207, 214, 0.5) !important;
            pointer-events: none !important;
          }
        }
      `}</style>
    </>
  );
}
