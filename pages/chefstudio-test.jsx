import React from "react";
import Head from "next/head";
import SceneNav from "@components/SceneNav";

// hooks
import useFetchContent from "@utils/useFetchContent";

const Menu = ({ menuImage }) => {
  return (
    <>
      <Head>
        <title>17 Little Portland Street - Chef&apos;s Studio</title>
      </Head>

      <main className="chef-studio-page chef-studio-page--with-scene-nav">
        <SceneNav />

        <div className="nocturn override">
          <img
            className="override-logo chef-studio-page-logo"
            src="/images/chefstudio/chefs-studio-page-top.png"
            alt="Chef's Studio"
            width="100%"
          />

          <img
            src="/images/chefstudio/chefs-studio-page-bottom.png"
            alt="Chef's Studio"
            width="100%"
          />

          <div className="override-buttons-wrapper">
            <a href="mailto:eat@little-portland.com" className="override-button">
              BOOK CHEF&apos;S STUDIO
            </a>

            <div className="row">
              <div className="column">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.little-portland.com/menu"
                  className="override-button"
                >
                  MENU
                </a>
              </div>

              <div className="column">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.little-portland.com/food"
                  className="override-button"
                >
                  DINING CONCEPT
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="nocturn-wider-section override-logo">
          <div className="image-row">
            <div className="image-column">
              <img src="/images/chefstudio/chefstudio07.jpg" alt="Chef's Studio" />
              <img src="/images/chefstudio/chefstudio08.jpg" alt="Chef's Studio" />
            </div>

            <div className="image-column">
              <img src="/images/chefstudio/chefstudio10.jpg" alt="Chef's Studio" />
              <img src="/images/chefstudio/chefstudio11.jpg" alt="Chef's Studio" />
            </div>
          </div>
        </div>

        <div className="nocturn override poem">
          <img
            src="/images/chefstudio/chefs-studio-poem.png"
            alt="Chef's Studio"
            width="100%"
          />
        </div>

        <div className="nocturn-wider-section override-logo bottom-grid">
          <div className="image-row">
            <div className="image-column">
              <img src="/images/chefstudio/chefstudio12.jpg" alt="Chef's Studio" />
              <img src="/images/chefstudio/chefstudio14.jpg" alt="Chef's Studio" />
            </div>

            <div className="image-column">
              <img src="/images/chefstudio/chefstudio09.jpg" alt="Chef's Studio" />
              <img src="/images/chefstudio/chefstudio13.jpg" alt="Chef's Studio" />
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        html {
          overflow-x: hidden !important;
        }

        body {
          background-color: #000000 !important;
          overflow: auto !important;
          overflow-x: hidden !important;
        }

        * {
          box-sizing: border-box;
        }

        .chef-studio-page {
          min-height: 100vh;
          background: #000000;
          font-family: Helvetica, "Helvetica Neue", Arial, sans-serif;
          padding-top: 52px;
        }

        /* =====================================================
           SHARED SCENENAV — CHEF'S STUDIO PAGE THEME ONLY
           SceneNav remains centralised.
        ===================================================== */

        .scene-nav {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          width: 100% !important;
          z-index: 10020 !important;

          background: rgba(0, 0, 0, 0.94) !important;
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
        }

        .scene-nav a:hover,
        .scene-nav-mobile a:hover {
          color: #ff0200 !important;
        }

        .scene-nav a.active,
        .scene-nav-mobile a.active {
          color: #ffffff !important;
        }

        .scene-nav a.disabled,
        .scene-nav-mobile a.disabled,
        .scene-nav a[aria-disabled="true"],
        .scene-nav-mobile a[aria-disabled="true"] {
          color: #ffffff !important;
          opacity: 0.38 !important;
        }

        .scene-nav-logo,
        .scene-nav-logo a,
        .scene-nav-logo svg,
        .scene-nav-logo img {
          color: #ff0200 !important;
        }

        .scene-nav-logo img {
          filter: brightness(0) saturate(100%) invert(15%) sepia(100%)
            saturate(7494%) hue-rotate(358deg) brightness(101%) contrast(113%) !important;
        }

        .scene-nav-logo svg,
        .scene-nav-logo svg *,
        .scene-nav-logo path,
        .scene-nav-logo circle,
        .scene-nav-logo rect,
        .scene-nav-logo line {
          fill: #ff0200 !important;
          stroke: #ff0200 !important;
        }

        .scene-nav .scene-nav-burger span {
          background: #ffffff !important;
        }

        .scene-nav-mobile {
          background: rgba(0, 0, 0, 0.96) !important;
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

        .chef-studio-page-logo {
          margin-top: 12px !important;
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
          margin: 50px 0 60px 0;
        }

        .override-buttons-wrapper .row {
          display: flex;
          gap: 10px;
          width: 100%;
        }

        .full-width {
          width: 100%;
        }

        .override-button {
          color: #ff0200 !important;
          border: 3px solid #ff0200 !important;
          text-decoration: none !important;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 10px 18px;
          transition:
            color 0.25s ease,
            background-color 0.25s ease,
            border-color 0.25s ease;
        }

        .override-button:hover {
          color: #000000 !important;
          background-color: #ff0200 !important;
          border: 3px solid #ff0200 !important;
        }

        .image-column img {
          border: 2px solid #ff0200;
        }

        .poem {
          margin: 18px auto 10px auto !important;
        }

        .bottom-grid {
          margin-bottom: 30px !important;
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
          width: 50%;
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
          .chef-studio-page {
            padding-top: 72px;
          }

          .scene-nav {
            background: rgba(0, 0, 0, 0.96) !important;
          }

          .scene-nav-mobile-inner {
            padding-top: 76px;
          }

          .override-logo {
            margin-top: -10px;
          }

          .chef-studio-page-logo {
            margin-top: -10px !important;
          }

          .override-buttons-wrapper {
            flex-direction: column;
            gap: 15px;
            margin: 25px 0;
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

          .column {
            width: 100% !important;
          }

          .poem {
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
