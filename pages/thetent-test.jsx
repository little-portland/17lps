import React from "react";
import Head from "next/head";
import SceneNav from "@components/SceneNav";
import HoverImageLink from "@components/HoverImageLink";
import ManualSlideshow from "@components/UX/ManualSlideshow";

// hooks
import useFetchContent from "@utils/useFetchContent";

const Menu = ({ menuImage }) => {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/images/thetent/rotating_tent.gif" />
        <link rel="preload" as="image" href="/images/thetent/the_tent_page_private_enquire.jpg" />
        <link rel="preload" as="image" href="/images/thetent/the_tent_page_private_enquire_hover.jpg" />
        <link rel="preload" as="image" href="/images/thetent/the_tent_page_tent_radio.jpg" />
        <link rel="preload" as="image" href="/images/thetent/the_tent_page_tent_radio_hover.jpg" />
        <link rel="preload" as="image" href="/images/thetent/the_tent_page_insta.jpg" />
        <link rel="preload" as="image" href="/images/thetent/the_tent_page_insta_hover.jpg" />
        <link rel="preload" as="image" href="/images/thetent/the_tent_page_news.jpg" />
        <link rel="preload" as="image" href="/images/thetent/the_tent_page_news_hover.jpg" />

        <title>The Tent</title>
      </Head>

      <main className="tent-page tent-page--with-scene-nav">
        <SceneNav />

        <div className="nocturn override">
          <img
            className="override-logo tent-page-logo"
            src="/images/thetent/the_tent_page_logo-test.png"
            alt="The Tent"
            width="100%"
          />
          <img
            className="override-logo"
            src="/images/thetent/rotating_tent.gif"
            alt="The Tent"
            width="100%"
          />
          <img src="/images/thetent/the_tent_page_schedule.png" alt="The Tent" width="100%" />
        </div>

        <div className="override-space-bottom override-logo">
          <ManualSlideshow />
        </div>

        <div className="nocturn override override-buttons-wrapper override-logo">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.little-portland.com/bookings"
            className="override-button book-override"
          >
            BOOK DINNER
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

        <div className="nocturn">
          <HoverImageLink
            href="mailto:yo@little-portland.com"
            img="/images/thetent/the_tent_page_private_enquire.jpg"
            hoverImg="/images/thetent/the_tent_page_private_enquire_hover.jpg"
            aspect="2000 / 306"
            ariaLabel="Private hire enquiries"
            target="_blank"
          />
        </div>

        <div className="nocturn">
          <HoverImageLink
            href="https://openlab.fm/radio/shows/the-tent-at-the-end-of-the-universe"
            img="/images/thetent/the_tent_page_tent_radio.jpg"
            hoverImg="/images/thetent/the_tent_page_tent_radio_hover.jpg"
            aspect="2000 / 306"
            ariaLabel="The Tent Radio"
            target="_blank"
          />
        </div>

        <div className="nocturn-wider-section">
          <div className="image-row override-logo">
            <div className="image-column">
              <img src="/images/thetent/the_tent01.jpg" alt="The Tent" />
              <img src="/images/override/slide09.png" alt="The Tent" />
              <img src="/images/thetent/the_tent04.jpg" alt="The Tent" />
              <img src="/images/thetent/the_tent09.jpg" alt="The Tent" />
              <img src="/images/thetent/the_tent06.jpg" alt="The Tent" />
            </div>

            <div className="image-column">
              <img src="/images/thetent/the_tent02.jpg" alt="The Tent" />
              <img src="/images/thetent/the_tent07.jpg" alt="The Tent" />
              <img src="/images/thetent/the_tent03.jpg" alt="The Tent" />
            </div>
          </div>
        </div>

        <div className="nocturn insta-margin">
          <div className="override-buttons-wrapper explore-btns">
            <div className="button-half-page">
              <HoverImageLink
                href="https://www.instagram.com/thetentattheendoftheuniverse/"
                img="/images/thetent/the_tent_page_insta.jpg"
                hoverImg="/images/thetent/the_tent_page_insta_hover.jpg"
                aspect="1000 / 150"
                ariaLabel="Instagram"
                target="_blank"
              />
            </div>

            <div className="button-half-page">
              <HoverImageLink
                href="https://forms.airship.co.uk/forms/1364/the-tent-at-the-end-of-the-universe"
                img="/images/thetent/the_tent_page_news.jpg"
                hoverImg="/images/thetent/the_tent_page_news_hover.jpg"
                aspect="1000 / 150"
                ariaLabel="Newsletter"
                target="_blank"
              />
            </div>
          </div>
        </div>

        <div className="nocturn override">
          <img src="/images/override/override_new_page_bottom.png" alt="Override" width="100%" />
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

        .tent-page {
          min-height: 100vh;
          background: #000000;
          font-family: Helvetica, "Helvetica Neue", Arial, sans-serif;
          padding-top: 52px;
        }

        /* =====================================================
           SHARED SCENENAV — TENT PAGE THEME ONLY
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
          color: #3dcfd6 !important;
        }

        .scene-nav a:hover,
        .scene-nav-mobile a:hover {
          color: #e67e62 !important;
        }

        .scene-nav a.active,
        .scene-nav-mobile a.active {
          color: #3dcfd6 !important;
        }

        .scene-nav a.disabled,
        .scene-nav-mobile a.disabled {
          color: #e67e62 !important;
          opacity: 0.5 !important;
        }

        .scene-nav-logo,
        .scene-nav-logo a,
        .scene-nav-logo svg,
        .scene-nav-logo img {
          color: #e67e62 !important;
        }

        .scene-nav-logo img {
          filter: brightness(0) saturate(100%) invert(67%) sepia(47%) saturate(1448%)
            hue-rotate(323deg) brightness(97%) contrast(85%) !important;
        }

        .scene-nav-logo svg,
        .scene-nav-logo svg *,
        .scene-nav-logo path,
        .scene-nav-logo circle,
        .scene-nav-logo rect,
        .scene-nav-logo line {
          fill: #e67e62 !important;
          stroke: #e67e62 !important;
        }

        .scene-nav .scene-nav-burger span {
          background: #3dcfd6 !important;
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

        .tent-page-logo {
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
          align-items: stretch;
          width: 100%;
          margin: 60px auto !important;
        }

        .override-buttons-wrapper .row {
          display: flex;
          gap: 10px;
          width: 100%;
        }

        .full-width {
          width: 100%;
        }

        .button-half-page {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 5px;
          box-sizing: border-box;
        }

        .button-half-page .override-button {
          font-size: 20px !important;
        }

        .override-button {
          color: #3dcfd6 !important;
          border: 3px solid #3dcfd6 !important;
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
          background-color: #e67e62 !important;
          border: 3px solid #e67e62 !important;
        }

        .events-box h2 {
          margin: 20px 20px 0 20px;
          font-size: 35px;
          font-weight: 800;
          text-align: center;
          padding: 10px;
          background: #000000;
          border-radius: 50px;
          color: #e67e62;
        }

        .events-box h3 {
          margin-top: 0.5rem;
          font-size: 30px;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .events-box p {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .events-box p small {
          font-size: 1.5rem;
          font-weight: 100 !important;
        }

        .events-box .content {
          position: relative;
          padding: 20px 0;
          z-index: 1;
        }

        .events-box .content-btn {
          position: relative;
          padding: 0 0 20px 0;
          margin: 10px 0;
          z-index: 1;
        }

        .events-box .content-divider {
          border-bottom: 1px solid #000000;
        }

        .events-box .content:last-child {
          border: none;
        }

        .insta-margin {
          margin-top: 50px !important;
        }

        .openlab-box {
          background: transparent !important;
          padding: 0 !important;
        }

        .openlab-box h2 {
          border-radius: 0;
          margin: 0;
          background-color: #3dcfd6;
          color: #000000;
          text-align: left !important;
        }

        .openlab-box p {
          color: #e67e62;
          text-align: right !important;
          font-weight: 400;
        }

        .insta-wrapper {
          margin-top: 50px;
        }

        .explore-btns {
          margin: 25px 0;
        }

        .override-buttons-wrapper .column {
          flex: 1;
        }

        .nocturn h1 {
          margin-top: 30px;
        }

        .nocturn {
          width: 65%;
          margin: 20px auto 0 auto !important;
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
          border: 2px solid #3dcfd6;
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

        .override-space-top-bottom {
          margin: 15px 0 !important;
        }

        .override-space-bottom {
          margin-bottom: 20px !important;
        }

        .slideshow-wrapper {
          max-width: 65%;
          margin: 0 auto;
          object-fit: cover;
          height: 100%;
        }

        .events-box {
          font-family: Helvetica, "Helvetica Neue", Arial, sans-serif !important;
        }

        .live {
          border-top: 5px solid #000000;
          padding-top: 20px;
          border-bottom: 5px solid #000000;
          margin-bottom: 40px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .tent-page {
            padding-top: 72px;
          }

          .scene-nav {
            background: rgba(0, 0, 0, 0.96) !important;
          }

          .scene-nav-mobile-inner {
            padding-top: 76px;
          }

          .tent-page-logo {
            margin-top: -10px !important;
          }

          .override-buttons-wrapper {
            flex-direction: column;
            gap: 15px;
            margin: 25px auto !important;
          }

          .override-buttons-wrapper .row {
            flex-direction: column;
            gap: 15px;
          }

          .slideshow-wrapper {
            max-width: 100%;
            margin: 0 20px;
          }

          .nocturn {
            margin-top: 30px !important;
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

          .events-box h2 {
            font-size: 15px;
            margin: 10px 10px 0 10px;
          }

          .events-box h3 {
            font-size: 15px;
          }

          .events-box p,
          .events-box small {
            font-size: 13px !important;
          }

          .events-box .content,
          .events-box .content-btn {
            padding: 10px 0;
            margin: 0;
          }

          .override-button {
            font-size: 15px !important;
          }

          .button-half-page {
            width: 100%;
            margin: 0;
          }

          .button-half-page .override-button {
            font-size: 10px !important;
          }

          .events-box .overide-buton,
          .events-box .content-btn {
            font-size: 12px !important;
          }

          .image-link {
            margin-bottom: 0;
          }

          .image-column {
            flex: 100%;
            max-width: 100%;
          }

          .insta-margin {
            margin-top: 25px !important;
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
