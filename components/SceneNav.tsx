import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

type SceneNavTheme = 'default' | 'access' | 'space' | 'tent-radio';

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
      href: '/nocturn',
      activePaths: ['/nocturn'],
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
        @media (max-width: 900px) {
          .scene-nav-mobile-inner {
            padding-top: calc(var(--scene-nav-space, 0px) + 14px) !important;
          }
        }
      `}</style>
    </>
  );
}
