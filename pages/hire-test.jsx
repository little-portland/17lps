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
          width: min(24vw, 360px);
          max-width: 100%;
          min-width: 300px;
          min-height: 46px;
          padding: 9px 22px;
          background: #50286d;
          color: #ffffff !important;
          font-family: 'Space Mono', 'Courier New', monospace;
          font-size: clamp(15px, 1.25vw, 22px);
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
            width: min(42vw, 360px);
            min-width: 290px;
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
            min-height: 48px;
            padding: 10px 18px;
            font-size: clamp(15px, 4.2vw, 19px);
          }
        }
      `}</style>

      <style jsx global>{`
        /* =====================================================
           HIRE PAGE NAV OVERRIDES
           Same sizing / spacing principle as dining-test and
           nocturn-test, with page-specific hire colours.
        ===================================================== */

        .scene-nav.scene-nav--dining {
          background: transparent !important;
          width: 100% !important;
        }

        .scene-nav.scene-nav--dining.has-scrolled {
          background: rgba(161, 211, 193, 0.96) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          box-shadow: 0 8px 28px rgba(80, 40, 109, 0.14) !important;
        }

        .scene-nav--dining .scene-nav-inner,
        .scene-nav--dining nav,
        .scene-nav--dining .nav-inner,
        .scene-nav--dining .nav-wrap {
          width: 65% !important;
          max-width: none !important;
          margin-left: auto !important;
          margin-right: auto !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          display: grid !important;
          grid-template-columns: 1fr auto 1fr !important;
          align-items: center !important;
          column-gap: 58px !important;
        }

        .scene-nav--dining .scene-nav-left,
        .scene-nav--dining .nav-left,
        .scene-nav--dining .left {
          display: flex !important;
          align-items: center !important;
          justify-content: flex-end !important;
          gap: 42px !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        .scene-nav--dining .scene-nav-right,
        .scene-nav--dining .nav-right,
        .scene-nav--dining .right {
          display: flex !important;
          align-items: center !important;
          justify-content: flex-start !important;
          gap: 42px !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        .scene-nav--dining a {
          font-family: 'Space Mono', 'Courier New', monospace !important;
          font-size: 15px !important;
          font-weight: 700 !important;
          line-height: 1 !important;
          letter-spacing: 0.025em !important;
          color: #50286d !important;
          opacity: 1 !important;
          text-decoration: none !important;
          text-transform: none !important;
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
          color: rgba(80, 40, 109, 0.48) !important;
          opacity: 1 !important;
          pointer-events: none !important;
          cursor: default !important;
        }

        .scene-nav--dining a::before,
        .scene-nav--dining a::after {
          content: none !important;
          display: none !important;
        }

        .scene-nav--dining .scene-nav-logo,
        .scene-nav--dining .nav-logo,
        .scene-nav--dining .logo {
          width: 40px !important;
          height: 40px !important;
          flex: 0 0 40px !important;
          justify-self: center !important;
          margin: 0 !important;
          padding: 0 !important;
          transform: none !important;
        }

        .scene-nav--dining .scene-nav-logo img,
        .scene-nav--dining .nav-logo img,
        .scene-nav--dining .logo img {
          display: block !important;
          width: 40px !important;
          height: 40px !important;
          object-fit: contain !important;
          opacity: 0.98 !important;
          filter: brightness(0) saturate(100%) invert(18%) sepia(31%)
            saturate(1950%) hue-rotate(250deg) brightness(94%) contrast(89%) !important;
        }

        .scene-nav--dining .scene-nav-burger span {
          background: #50286d !important;
        }

        @media (max-width: 1100px) {
          .scene-nav--dining .scene-nav-inner,
          .scene-nav--dining nav,
          .scene-nav--dining .nav-inner,
          .scene-nav--dining .nav-wrap {
            width: 75% !important;
            column-gap: 44px !important;
          }

          .scene-nav--dining .scene-nav-left,
          .scene-nav--dining .nav-left,
          .scene-nav--dining .left,
          .scene-nav--dining .scene-nav-right,
          .scene-nav--dining .nav-right,
          .scene-nav--dining .right {
            gap: 32px !important;
          }

          .scene-nav--dining a {
            font-size: 14px !important;
          }
        }

        @media (max-width: 900px) {
          .scene-nav.scene-nav--dining {
            background: transparent !important;
          }

          .scene-nav.scene-nav--dining.has-scrolled,
          .scene-nav.scene-nav--dining.is-open {
            background: rgba(161, 211, 193, 0.96) !important;
          }

          .scene-nav--dining .scene-nav-inner,
          .scene-nav--dining nav,
          .scene-nav--dining .nav-inner,
          .scene-nav--dining .nav-wrap {
            width: 88% !important;
            display: flex !important;
            justify-content: space-between !important;
            column-gap: 0 !important;
          }

          .scene-nav--dining .scene-nav-logo,
          .scene-nav--dining .nav-logo,
          .scene-nav--dining .logo {
            width: 46px !important;
            height: 46px !important;
            flex-basis: 46px !important;
          }

          .scene-nav--dining .scene-nav-logo img,
          .scene-nav--dining .nav-logo img,
          .scene-nav--dining .logo img {
            width: 46px !important;
            height: 46px !important;
          }

          .scene-nav-mobile--dining {
            background: rgba(161, 211, 193, 0.98) !important;
          }

          .scene-nav-mobile--dining .scene-nav-mobile-inner a {
            font-family: 'Space Mono', 'Courier New', monospace !important;
            font-size: 23px !important;
            font-weight: 700 !important;
            line-height: 1.1 !important;
            color: #50286d !important;
          }

          .scene-nav-mobile--dining .scene-nav-mobile-inner a:hover,
          .scene-nav-mobile--dining .scene-nav-mobile-inner a.active {
            color: #50286d !important;
            opacity: 0.68 !important;
          }

          .scene-nav-mobile--dining .scene-nav-mobile-inner a.disabled {
            color: rgba(80, 40, 109, 0.48) !important;
            opacity: 1 !important;
            pointer-events: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default HireTestPage;
