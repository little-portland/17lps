import React from 'react';
import Head from 'next/head';

import SceneNav from '@components/SceneNav';

const HIRE_IMAGES = [
  {
    src: '/images/hire-page-venue.jpg',
    alt: 'Full Venue private hire capacity',
  },
  {
    src: '/images/hire-page-chef-tent.jpg',
    alt: 'The Tent private hire capacity',
  },
  {
    src: '/images/hire-page-studio.jpg',
    alt: 'The Studio private hire capacity',
  },
  {
    src: '/images/hire-page-chef-studio.jpg',
    alt: "Chef's Studio private dining capacity",
  },
];

const HireTestPage = () => {
  return (
    <>
      <Head>
        <title>Private Hire — 17 Little Portland Street</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />

        <style>
          {`
            html,
            body,
            #__next {
              min-height: 100%;
              background-color: #A1D3C1 !important;
            }

            body {
              margin: 0;
              overflow-x: hidden !important;
              overflow-y: auto !important;
              -webkit-overflow-scrolling: touch !important;
              -webkit-font-smoothing: antialiased;
            }
          `}
        </style>
      </Head>

      <SceneNav theme="dining" />

      <style jsx global>{`
        /*
          Hire page nav.
          Desktop copies the compact spacing from nocturn-test.
          Mobile explicitly hides the desktop nav groups so they don't bleed through.
        */

        .scene-nav.scene-nav--dining {
          grid-template-columns: 1fr 36px 1fr !important;
          gap: 0 !important;
          padding-top: 11px !important;
          padding-bottom: 9px !important;
          background: transparent !important;
        }

        .scene-nav.scene-nav--dining.has-scrolled {
          background: rgba(161, 211, 193, 0.96) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          box-shadow: 0 8px 28px rgba(80, 40, 109, 0.14) !important;
        }

        .scene-nav--dining .scene-nav-left,
        .scene-nav--dining .scene-nav-right {
          display: flex !important;
          align-items: center !important;
          width: 100% !important;
          gap: 28px !important;
        }

        .scene-nav--dining .scene-nav-left {
          justify-content: flex-end !important;
          padding-right: 32px !important;
        }

        .scene-nav--dining .scene-nav-right {
          justify-content: flex-start !important;
          padding-left: 32px !important;
        }

        .scene-nav--dining .scene-nav-logo {
          width: 36px !important;
          height: 36px !important;
          flex: 0 0 36px !important;
          transform: none !important;
        }

        .scene-nav--dining .scene-nav-logo img {
          width: 36px !important;
          height: 36px !important;
          object-fit: contain !important;
          opacity: 1 !important;
          filter: brightness(0) saturate(100%) invert(18%) sepia(32%)
            saturate(2131%) hue-rotate(249deg) brightness(93%) contrast(90%) !important;
        }

        .scene-nav--dining a {
          font-size: 13px !important;
          line-height: 1 !important;
          letter-spacing: 0.015em !important;
          font-family: 'Space Mono', 'Courier New', monospace !important;
          font-weight: 700 !important;
          color: #50286d !important;
          opacity: 1 !important;
          text-decoration: none !important;
          transform: none !important;
          transition: opacity 0.22s ease, color 0.22s ease !important;
          white-space: nowrap !important;
        }

        .scene-nav--dining a:hover,
        .scene-nav--dining a.active {
          color: #50286d !important;
          opacity: 0.68 !important;
          transform: none !important;
        }

        .scene-nav--dining a.disabled {
          color: rgba(80, 40, 109, 0.42) !important;
          opacity: 1 !important;
          pointer-events: none !important;
          cursor: default !important;
        }

        .scene-nav--dining a::before,
        .scene-nav--dining a::after {
          content: none !important;
          display: none !important;
        }

        .scene-nav--dining .scene-nav-burger span {
          background: #50286d !important;
        }

        .scene-nav-mobile--dining {
          background: rgba(161, 211, 193, 0.98) !important;
        }

        .scene-nav-mobile--dining .scene-nav-mobile-inner a {
          font-family: 'Space Mono', 'Courier New', monospace !important;
          color: #50286d !important;
        }

        .scene-nav-mobile--dining .scene-nav-mobile-inner a:hover,
        .scene-nav-mobile--dining .scene-nav-mobile-inner a.active {
          color: #50286d !important;
          opacity: 0.68 !important;
        }

        .scene-nav-mobile--dining .scene-nav-mobile-inner a.disabled {
          color: rgba(80, 40, 109, 0.42) !important;
          opacity: 1 !important;
          pointer-events: none !important;
        }

        @media (max-width: 900px) {
          .scene-nav.scene-nav--dining {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            grid-template-columns: none !important;
            gap: 0 !important;
            padding: 18px 6% 14px 6% !important;
            background: transparent !important;
          }

          .scene-nav.scene-nav--dining.has-scrolled,
          .scene-nav.scene-nav--dining.is-open {
            background: rgba(161, 211, 193, 0.96) !important;
          }

          .scene-nav--dining .scene-nav-left,
          .scene-nav--dining .scene-nav-right {
            display: none !important;
            visibility: hidden !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
            padding: 0 !important;
            margin: 0 !important;
            gap: 0 !important;
          }

          .scene-nav--dining .scene-nav-logo {
            display: block !important;
            width: 46px !important;
            height: 46px !important;
            flex: 0 0 46px !important;
            margin-left: auto !important;
            margin-right: 0 !important;
            order: 2 !important;
          }

          .scene-nav--dining .scene-nav-logo img {
            width: 46px !important;
            height: 46px !important;
          }

          .scene-nav--dining .scene-nav-burger {
            display: flex !important;
            order: 1 !important;
            margin-right: auto !important;
            margin-left: 0 !important;
          }
        }
      `}</style>

      <main className="hire-page">
        <div className="hire-page-frame">
          <h1 className="hire-title">PRIVATE HIRE</h1>

          <section className="hire-gallery" aria-label="Private hire spaces">
            {HIRE_IMAGES.map((image, index) => (
              <img
                key={image.src}
                className="hire-image"
                src={image.src}
                alt={image.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            ))}
          </section>
        </div>

        <div className="hire-footer">
          <a
            className="hire-mail-button"
            href="mailto:hire@little-portland.com"
            aria-label="Email hire at Little Portland"
          >
            HIRE@LITTLE-PORTLAND.COM
          </a>
        </div>
      </main>

      <style jsx>{`
        .hire-page {
          width: 100%;
          min-height: 100vh;
          padding-top: 76px;
          padding-bottom: 1px;
          background-color: #a1d3c1;
          color: #50286d;
          font-family: 'Space Mono', 'Courier New', monospace;
          box-sizing: border-box;
        }

        .hire-page-frame {
          width: 65%;
          margin: 0 auto;
          padding-top: 38px;
          box-sizing: border-box;
        }

        .hire-title {
          margin: 0 0 34px 0;
          color: #50286d;
          font-family: 'Space Mono', 'Courier New', monospace;
          font-size: clamp(48px, 5.65vw, 96px);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: 0.035em;
          text-align: center;
          text-transform: uppercase;
        }

        .hire-gallery {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
        }

        .hire-image {
          display: block;
          width: 100%;
          height: auto;
          margin: 0;
          border: 0;
        }

        .hire-footer {
          width: 65%;
          margin: 82px auto 120px auto;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .hire-mail-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: min(22vw, 340px);
          max-width: 100%;
          min-width: 280px;
          min-height: 42px;
          padding: 8px 20px;
          background: #50286d;
          color: #ffffff !important;
          font-family: 'Space Mono', 'Courier New', monospace;
          font-size: clamp(14px, 1.05vw, 18px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.01em;
          text-align: center;
          text-decoration: none;
          text-transform: uppercase;
          border: 2px solid #50286d;
          box-sizing: border-box;
          transition:
            background 0.22s ease,
            color 0.22s ease,
            opacity 0.22s ease;
        }

        .hire-mail-button:hover {
          background: transparent;
          color: #50286d !important;
        }

        @media (max-width: 1100px) {
          .hire-page-frame,
          .hire-footer {
            width: 75%;
          }

          .hire-title {
            font-size: clamp(42px, 7vw, 78px);
          }

          .hire-mail-button {
            width: auto;
            min-width: 270px;
          }
        }

        @media (max-width: 768px) {
          .hire-page {
            padding-top: 78px;
          }

          .hire-page-frame,
          .hire-footer {
            width: 88%;
          }

          .hire-page-frame {
            padding-top: 22px;
          }

          .hire-title {
            margin-bottom: 24px;
            font-size: clamp(32px, 9vw, 46px);
            letter-spacing: 0.025em;
          }

          .hire-gallery {
            gap: 16px;
          }

          .hire-footer {
            margin: 54px auto 72px auto;
          }

          .hire-mail-button {
            width: auto;
            min-width: 0;
            max-width: 100%;
            min-height: 46px;
            padding: 10px 16px;
            font-size: clamp(14px, 4vw, 18px);
          }
        }
      `}</style>
    </>
  );
};

export default HireTestPage;
