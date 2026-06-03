import React from "react";
import Head from "next/head";
import SceneNav from "@components/SceneNav";
import HoverImageLink from "@components/HoverImageLink";

// hooks
import useFetchContent from "@utils/useFetchContent";

const Menu = ({ menuImage }) => {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/images/studio/studio-page-top.gif" />
        <link rel="preload" as="image" href="/images/studio/studio-rotating.gif" />
        <link rel="preload" as="image" href="/images/studio/logo.gif" />
        <link rel="preload" as="image" href="/images/studio/night-schedule.gif" />
        <link rel="preload" as="image" href="/images/studio/studio_private_hire.gif" />
        <link rel="preload" as="image" href="/images/studio/studio_private_hire_hover.gif" />
        <link rel="preload" as="image" href="/images/theclub/the_club_page_friend.png" />
        <link rel="preload" as="image" href="/images/theclub/the_club_page_friend_hover.png" />
        <link rel="preload" as="image" href="/images/theclub/rotating_club.gif" />
        <link rel="preload" as="image" href="/images/studio/cs_studio.png" />
        <link rel="preload" as="image" href="/images/studio/acoustic.gif" />

        <title>17 Little Portland Street - Studio</title>
      </Head>

      <main className="studio-page studio-page--with-scene-nav">
        <SceneNav />

        <div className="nocturn override">
          <img
            className="header-logo"
            src="/images/studio/studio-page-top.gif"
            alt="Studio"
            width="100%"
          />

          <img src="/images/studio/logo.gif" alt="Studio" width="100%" />
          <img src="/images/studio/top-tagline.gif" alt="Studio" width="100%" />

          <img
            className="override-logo"
            src="/images/studio/studio-rotating.gif"
            alt="Studio"
            width="100%"
          />

          <img
            className="override-logo"
            src="/images/studio/night-schedule.gif"
            alt="Studio"
            width="100%"
          />

          <img
            className="studio-img studio-twenty"
            src="/images/studio/studio_angle07.jpg"
            alt="Studio"
            width="100%"
          />

          <img
            className="override-logo desktop"
            src="/images/studio/acoustic.gif"
            alt="Studio"
            width="100%"
          />

          <img
            className="override-logo mobile"
            src="/images/studio/acoustic-mobile.gif"
            alt="Studio"
            width="100%"
          />

          <div className="override-buttons-wrapper">
            <div className="row">
              <div className="column">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="/docs/acoustic-test-report.pdf"
                  className="override-button hollow-btn"
                >
                  Acoustic Test Report
                </a>
              </div>

              <div className="column">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="/docs/studio-speaker-system.pdf"
                  className="override-button hollow-btn"
                >
                  Speaker System
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="nocturn override">
          <img
            className="studio-img-no-m"
            src="/images/studio/studio_angle01.jpg"
            alt="Studio"
            width="100%"
          />
        </div>

        <div className="nocturn hire">
          <HoverImageLink
            href="mailto:yo@little-portland.com"
            img="/images/studio/studio_private_hire.gif"
            hoverImg="/images/studio/studio_private_hire_hover.gif"
            aspect="1200 / 300"
            ariaLabel="Private hire enquiries"
            target="_blank"
          />
        </div>

        <div className="nocturn override">
          <img
            className="studio-img-mb studio-thirty-five"
            src="/images/studio/studio_angle09.jpg"
            alt="Studio"
            width="100%"
          />

          <img
            className="override-logo cs-logo"
            src="/images/studio/cs_studio.png"
            alt="Studio"
            width="100%"
          />

          <div className="override-buttons-wrapper">
            <a
              target="_blank"
              rel="noreferrer"
              href="mailto:eat@little-portland.com"
              className="override-button hollow-btn"
            >
              BOOK CHEF&apos;S STUDIO
            </a>

            <div className="row">
              <div className="column">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.little-portland.com/chefstudio"
                  className="override-button hollow-btn"
                >
                  ABOUT CHEF&apos;S STUDIO
                </a>
              </div>

              <div className="column">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.little-portland.com/menu"
                  className="override-button hollow-btn"
                >
                  MENU
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="nocturn override">
          <img
            className="studio-img-mb xs-m studio-minus-five"
            src="/images/studio/studio_angle11.jpg"
            alt="Studio"
            width="100%"
          />
        </div>

        <div className="nocturn override bottom-tag">
          <img src="/images/studio/bottom-tagline.gif" alt="Studio" width="100%" />
        </div>

        <div className="nocturn-wider-section override-logo img-grid">
          <div className="image-row override-logo">
            <div className="image-column">
              <img className="vhs-img" src="/images/theclub/the_club05.jpg" alt="Studio" />
              <img className="vhs-img" src="/images/theclub/the_club07.jpg" alt="Studio" />
              <img className="vhs-img" src="/images/theclub/the_club03.jpg" alt="Studio" />
            </div>

            <div className="image-column">
              <img className="vhs-img" src="/images/theclub/the_club04.jpg" alt="Studio" />
              <img className="vhs-img" src="/images/theclub/the_club08.jpg" alt="Studio" />
              <img className="vhs-img" src="/images/theclub/the_club06.jpg" alt="Studio" />
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        html {
          overflow-x: hidden !important;
        }

        body {
          overflow: auto !important;
          overflow-x: hidden !important;
          background: #4e4c4e !important;
        }

        * {
          box-sizing: border-box;
        }

        .studio-page {
          min-height: 100vh;
          background: #4e4c4e;
          font-family: Helvetica, "Helvetica Neue", Arial, sans-serif;
          padding-top: 52px;
        }

        /* =====================================================
           SHARED SCENENAV — STUDIO PAGE THEME ONLY
           SceneNav remains centralised.
        ===================================================== */

        .scene-nav {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          width: 100% !important;
          z-index: 10020 !important;

          background: rgba(78, 76, 78, 0.94) !important;
          border-bottom: none !important;
          box-shadow: none !important;

          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);

          margin-bottom: 0 !important;
        }

        .scene-nav,
        .scene-nav a,
        .scene-nav button,
        .scene-nav-mobile,
        .scene-nav-mobile a,
        .scene-nav-mobile button {
          font-family: Helvetica, "Helvetica Neue", Arial, sans-serif !important;
          font-weight: 700 !important;
        }

        .scene-nav a,
        .scene-nav-mobile a {
          color: #ffffff !important;
          text-shadow:
            -5px 0 5px rgba(0, 255, 120, 0.2),
            5px 0 2px rgba(1, 103, 255, 1) !important;
          filter: blur(0.35px);
          transition:
            color 0.25s ease,
            text-shadow 0.25s ease,
            opacity 0.25s ease,
            transform 0.25s ease;
        }

        .scene-nav a:hover,
        .scene-nav-mobile a:hover {
          color: #6adfe7 !important;
          text-shadow:
            0 0 3px rgba(0, 255, 120, 0.8),
            0 0 5px rgba(1, 114, 250, 0.9) !important;
          transform: scale(1.02);
        }

        .scene-nav a.active,
        .scene-nav-mobile a.active {
          color: #ffffff !important;
          opacity: 1 !important;
        }

        .scene-nav a.disabled,
        .scene-nav-mobile a.disabled,
        .scene-nav a[aria-disabled="true"],
        .scene-nav-mobile a[aria-disabled="true"] {
          color: #ffffff !important;
          opacity: 0.42 !important;
          text-shadow:
            -3px 0 4px rgba(0, 255, 120, 0.12),
            3px 0 2px rgba(1, 103, 255, 0.55) !important;
        }

        .scene-nav-logo,
        .scene-nav-logo a,
        .scene-nav-logo svg,
        .scene-nav-logo img {
          color: #ffffff !important;
        }

        .scene-nav-logo img {
          filter:
            brightness(0) invert(1)
            drop-shadow(-5px 0 5px rgba(0, 255, 120, 0.35))
            drop-shadow(5px 0 3px rgba(1, 103, 255, 0.9))
            blur(0.25px) !important;
        }

        .scene-nav-logo svg {
          filter:
            drop-shadow(-5px 0 5px rgba(0, 255, 120, 0.35))
            drop-shadow(5px 0 3px rgba(1, 103, 255, 0.9))
            blur(0.25px) !important;
        }

        .scene-nav-logo svg,
        .scene-nav-logo svg *,
        .scene-nav-logo path,
        .scene-nav-logo circle,
        .scene-nav-logo rect,
        .scene-nav-logo line {
          fill: #ffffff !important;
          stroke: #ffffff !important;
        }

        .scene-nav .scene-nav-burger span {
          background: #ffffff !important;
          box-shadow:
            -3px 0 4px rgba(0, 255, 120, 0.35),
            3px 0 3px rgba(1, 103, 255, 0.9) !important;
        }

        .scene-nav-mobile {
          background: rgba(78, 76, 78, 0.96) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 10010 !important;
        }

        .scene-nav-mobile-inner {
          padding-top: 82px;
        }

        .override-logo {
          margin-top: 30px;
        }

        .override .explore-zen {
          margin-top: 30px !important;
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
        }

        .explore-zen li {
          width: 100%;
          background-image: url("/images/override/explore_zen_line_bg.png");
          background-repeat: no-repeat;
          background-position: center;
          padding: 20px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .explore-zen li a {
          margin-right: 50px;
          display: inline-block;
          width: 300px;
          height: 65px;
          background-image: url("/images/override/explore_zen_bg.png");
          padding: 15px;
        }

        .override-buttons-wrapper {
          font-family: Helvetica, "Helvetica Neue", Arial, sans-serif !important;
          font-weight: bold !important;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin: 15px 0 60px 0;
          padding: 0 8px;
        }

        .override-buttons-wrapper .row {
          display: flex;
          gap: 10px;
          width: 100%;
        }

        .full-width {
          width: 100%;
        }

        .header-logo {
          margin-top: 30px;
        }

        @keyframes flicker-img {
          0%,
          100% {
            box-shadow:
              inset 0 0 3px 3px rgba(0, 255, 120, 0.8),
              0 0 3px 3px rgba(1, 114, 250, 0.9);
          }

          50% {
            box-shadow:
              inset 0 0 5px 5px rgba(0, 255, 120, 1),
              3px 0 3px 3px rgba(1, 114, 250, 1);
          }
        }

        .vhs-img {
          animation: flicker-img 1.5s infinite ease-in-out;
          border: none !important;
          border-radius: 15px;
        }

        .link {
          color: #6bddd9 !important;
          transition: all 0.3s ease-in-out;
          opacity: 1;
        }

        .link:hover {
          color: #6bddd9 !important;
          opacity: 0.7;
        }

        .hollow-btn {
          color: #6adfe7 !important;
          border: 3px solid #6adfe7 !important;
        }

        .hollow-btn:hover {
          color: #4e4c4e !important;
          background-color: #6adfe7 !important;
          border: 3px solid #4e4c4e !important;
        }

        .override-button {
          display: block;
          width: 100%;
          background-color: transparent;
          border: 3px solid rgba(101, 216, 233, 1) !important;
          padding: 15px 0;
          font-weight: bold;
          text-align: center;
          text-decoration: none;
          font-size: 19px !important;
          cursor: pointer;
          border-radius: 50px;
          color: #ffffff !important;
          transition: 0.3s ease-in-out;
          text-transform: uppercase;
          text-shadow:
            -5px 0 5px rgba(0, 255, 120, 0.2),
            5px 0 2px rgba(1, 103, 255, 1) !important;
          filter: blur(0.5px);
          box-shadow:
            inset 0 0 6px 2px rgba(0, 255, 120, 0.8),
            0 0 5px 3px rgba(7, 89, 172, 0.9);
          animation: flicker 2s infinite ease-in-out;
        }

        .override-button:hover {
          box-shadow:
            inset 0 0 10px 3px rgba(0, 255, 120, 0.9),
            0 0 10px 6px rgba(1, 114, 250, 1);
          text-shadow:
            5px 0 5px rgba(0, 255, 120, 0.2),
            -5px 0 2px rgba(1, 103, 250, 0.3) !important;
          transform: scale(1.02);
          border: 3px solid rgba(61, 207, 214, 1) !important;
        }

        @keyframes flicker {
          0%,
          100% {
            box-shadow:
              inset 0 0 3px 3px rgba(0, 255, 120, 0.8),
              3px 0 3px 3px rgba(1, 114, 250, 0.9);
          }

          50% {
            box-shadow:
              inset 0 0 1px 1px rgba(0, 255, 120, 1),
              -3px 0 1px 1px rgba(1, 114, 250, 1);
          }
        }

        .desktop {
          display: block !important;
        }

        .mobile {
          display: none !important;
        }

        .cs-logo {
          filter: blur(0.3px);
          margin-top: 0 !important;
        }

        .image-column img {
          border: 3px solid #6bddd9;
          padding: 8px;
        }

        .dance-popup {
          border: none !important;
          margin: 50px 0 25px 0;
          min-height: auto !important;
          font-family: Helvetica, "Helvetica Neue", Arial, sans-serif !important;
          font-weight: bold !important;
        }

        .dance-popup h3 {
          color: #ffffff;
          font-size: 2rem !important;
        }

        .dance-popup p {
          font-size: 1.5rem !important;
          line-height: 1.6rem !important;
        }

        .intro {
          border: none !important;
          margin: 10px auto 35px auto !important;
          font-family: Helvetica, "Helvetica Neue", Arial, sans-serif !important;
          font-weight: bold !important;
          text-transform: uppercase !important;
        }

        .intro p {
          font-size: 1.5rem !important;
          line-height: 1.6rem !important;
          font-weight: 400 !important;
          margin-bottom: 0.6rem !important;
          text-align: center !important;
          color: #ffffff !important;
        }

        .studio-img {
          border-radius: 15px;
          margin-top: 50px !important;
        }

        .studio-img-mb {
          border-radius: 15px;
          margin-bottom: 50px !important;
        }

        .studio-img-no-m {
          border-radius: 15px;
          margin: 0 !important;
        }

        .hire {
          margin: 50px auto 50px auto !important;
        }

        .friends {
          margin: 25px auto 30px auto !important;
        }

        .img-grid {
          margin-bottom: 40px !important;
        }

        .bottom-tag {
          margin-bottom: 50px !important;
        }

        .override-buttons-wrapper .column {
          flex: 1;
        }

        .nocturn h1 {
          margin-top: 30px;
        }

        .nocturn {
          width: 65%;
          margin: 0 auto;
        }

        .nocturn-wider-section {
          width: 65%;
          margin: 0 auto;
        }

        .column {
          width: 33%;
        }

        .column img {
          margin-top: 8px;
          vertical-align: middle;
          width: 100%;
        }

        .column a {
          cursor: pointer !important;
        }

        .top {
          font-size: 35px;
        }

        .bottom {
          font-size: 25px;
        }

        .image-row {
          display: flex;
          flex-wrap: wrap;
          padding: 0 4px;
        }

        .image-column {
          flex: 50%;
          max-width: 50%;
          padding: 0 4px;
        }

        .image-column img {
          margin-top: 8px;
          vertical-align: middle;
          width: 100%;
        }

        audio {
          margin-top: 8px !important;
          width: 100% !important;
        }

        .nocturn-text-wrapper {
          margin-top: 30px !important;
          padding: 0 30px;
        }

        .nocturn-text-wrapper small {
          margin-left: 10px;
          font-size: 20px;
        }

        .nocturn-text-wrapper img {
          max-width: 100%;
          margin-bottom: 40px !important;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }

        .nocturn-text {
          font-family: Helvetica, "Helvetica Neue", Arial, sans-serif !important;
          font-weight: bold !important;
          text-decoration: none !important;
          color: #ffffff !important;
          padding-bottom: 20px;
          line-height: 1.1;
        }

        .nocturn-text-two {
          padding-top: 20px;
        }

        .question {
          color: #000000 !important;
          font-style: italic;
        }

        .italic {
          font-style: italic !important;
        }

        .loading {
          font-size: 50px;
          text-align: center;
        }

        .flyer {
          max-width: 100% !important;
        }

        .preloader {
          margin: 30px 0 10px 0 !important;
        }

        .spacing {
          margin-top: 30px !important;
        }

        .live {
          border-top: 5px solid #000000;
          padding-top: 20px;
          border-bottom: 5px solid #000000;
          margin-bottom: 40px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .studio-page {
            padding-top: 72px;
          }

          .scene-nav {
            background: rgba(78, 76, 78, 0.96) !important;
          }

          .scene-nav-mobile-inner {
            padding-top: 76px;
          }

          .override-buttons-wrapper {
            flex-direction: column;
            gap: 15px;
            margin: 5px 0 15px 0;
            padding: 0 8px;
          }

          .override-buttons-wrapper .row {
            flex-direction: column;
            gap: 15px;
          }

          .nocturn {
            margin-top: 30px;
            width: 90%;
          }

          .nocturn-wider-section {
            width: 90%;
          }

          .spacing {
            margin-top: 15px !important;
          }

          .preloader {
            margin: 15px 0 -15px 0 !important;
          }

          .nocturn-text-two {
            padding-top: 10px;
          }

          .nocturn-text-wrapper {
            padding: 0 15px;
          }

          .top p {
            font-size: 20px;
          }

          .bottom p {
            font-size: 15px;
          }

          .nocturn-text-wrapper small {
            font-size: 12px !important;
            margin-left: 5px !important;
          }

          .explore-zen li a {
            margin-right: 30px;
            width: 150px;
            height: 32px;
            background-size: 150px 32px;
            background-repeat: no-repeat;
          }

          .explore-zen li {
            background-size: 400px 20px;
          }

          .desktop {
            display: none !important;
          }

          .mobile {
            display: block !important;
          }

          .column {
            width: 100% !important;
          }

          .header-logo {
            margin-top: 0;
          }

          .override-logo {
            margin-top: 30px;
          }

          .dance-popup h3 {
            font-size: 0.7rem !important;
            padding: 5px 10px !important;
          }

          .dance-popup p {
            font-size: 0.6rem !important;
            line-height: 2 !important;
          }

          .bottom-tag {
            margin-bottom: -10px !important;
          }

          .xs-m {
            margin: 0 !important;
          }

          .intro {
            margin-top: 0 !important;
            margin-bottom: 10px !important;
          }

          .intro p {
            font-size: 0.6rem !important;
            line-height: 2 !important;
            margin-bottom: 0 !important;
          }

          .cs-logo {
            margin-top: -10px !important;
          }

          .hire {
            margin: 30px auto 30px auto !important;
          }

          .studio-twenty {
            margin-top: 15px !important;
            margin-bottom: -10px !important;
          }

          .studio-thirty-five {
            margin-bottom: 35px !important;
          }

          .studio-minus-five {
            margin-top: 5px !important;
          }

          .friends {
            margin: 10px auto 10px auto !important;
          }

          .override-button {
            font-size: 15px !important;
          }

          .image-column {
            flex: 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Menu;

export async function getStaticProps() {
  const menuData = await useFetchContent(`
    {
      menuCollection {
        items {
          menuImage {
            title
            description
            url
            width
            height
          }
        }
      }
    }
  `);

  const menuImage = menuData.menuCollection.items[0].menuImage;

  return {
    props: {
      menuImage,
    },
    revalidate: 30,
  };
}
