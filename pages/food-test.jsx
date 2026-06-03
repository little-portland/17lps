import React from "react";
import Head from "next/head";
import SceneNav from "@components/SceneNav";
import HoverImageLink from "@components/HoverImageLink";
import FoodSlideshow from "@components/UX/FoodSlideshow";

// hooks
import useFetchContent from "@utils/useFetchContent";

const Menu = ({ menuImage }) => {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/images/food/food_page_top.png" />
        <link rel="preload" as="image" href="/images/food/food_page_title_anim.gif" />
        <link rel="preload" as="image" href="/images/food/food_page_food_more_than_meal.gif" />
        <link rel="preload" as="image" href="/images/food/food_page_line_anim.gif" />
        <link rel="preload" as="image" href="/images/food/food_page_food_futurist_menu.gif" />
        <link rel="preload" as="image" href="/images/food/concept-pack-btn.png" />
        <link rel="preload" as="image" href="/images/food/concept-pack-btn-hover.png" />

        <title>17 Little Portland Street - The Tent Dinner</title>
      </Head>

      <main className="food-page food-page--with-scene-nav">
        <SceneNav />

        <div className="nocturn override food-content">
          <img src="/images/food/food_page_top.png" alt="The Tent Food" width="100%" />
          <img src="/images/food/food_page_title_anim.gif" alt="The Tent Food" width="100%" />
          <img className="futurist-menu" src="/images/food/food_page_food_more_than_meal.gif" alt="The Tent Food" width="95%" />
          <img className="line-anim" src="/images/food/food_page_line_anim.gif" alt="The Tent Food" width="100%" />
          <img className="futurist-menu" src="/images/food/food_page_food_futurist_menu.gif" alt="The Tent Food" width="95%" />
          <img src="/images/food/food_page_futurist_dinner.png" alt="The Tent Food" width="100%" />
          <img src="/images/food/food_page_food_board.png" alt="The Tent Food" width="100%" />

          <img src="/images/food/food_page_divider.png" alt="The Tent Food" width="100%" />
          <img className="dining-concept" src="/images/food/food_page_dining_concept.gif" alt="The Tent Food" width="88%" />
          <img src="/images/food/food_page_divider.png" alt="The Tent Food" width="100%" />

          <img className="override-logo" src="/images/food/food_page_food_floorplan.png" alt="The Tent Food" width="100%" />

          <div className="override-buttons-wrapper explore-btns">
            <div className="button-half-page">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.little-portland.com/thetent"
                className="override-button"
              >
                EXPLORE THE TENT
              </a>
            </div>

            <div className="button-half-page">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.little-portland.com/chefstudio"
                className="override-button"
              >
                EXPLORE CHEF&apos;S STUDIO
              </a>
            </div>
          </div>

          <img className="night-sch" src="/images/food/night-schedule.gif" alt="The Tent Food" width="100%" />

          <div className="override-buttons-wrapper">
            <a href="https://www.little-portland.com/dinner-options" className="override-button">
              BOOK DINNER
            </a>

            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.little-portland.com/explore-menu"
              className="override-button"
            >
              EXPLORE MENU
            </a>
          </div>

          <img src="/images/food/food_page_ethos.gif" alt="The Tent Food" width="100%" />
          <img src="/images/food/food_page_middle.png" alt="The Tent Food" width="100%" />
        </div>

        <div className="nocturn override" />

        <div className="override-space-bottom override-logo">
          <FoodSlideshow />
        </div>

        <div className="nocturn override footer">
          <img src="/images/food/food_page_meme.png" alt="The Tent Food" width="100%" />
          <img className="explore" src="/images/food/explore-more.gif" alt="The Tent Food" width="100%" />

          <HoverImageLink
            className="concept-pack"
            href="/docs/dining-concept-pack.pdf"
            img="/images/food/concept-pack-btn.png"
            hoverImg="/images/food/concept-pack-btn-hover.png"
            aspect="871 / 90"
            ariaLabel="Dining Concept pack"
            target="_blank"
          />

          <HoverImageLink
            className="concept-pack"
            href="/docs/Bio_bricks_report.pdf"
            img="/images/food/bio-bricks-btn.png"
            hoverImg="/images/food/bio-bricks-btn-hover.png"
            aspect="871 / 90"
            ariaLabel="Bio Bricks Report"
            target="_blank"
          />

          <HoverImageLink
            className="concept-pack"
            href="/docs/2025-on-futurist-eating.pdf"
            img="/images/food/futurist-cuisine-btn.png"
            hoverImg="/images/food/futurist-cuisine-btn-hover.png"
            aspect="871 / 90"
            ariaLabel="On Futurist Cuisine"
            target="_blank"
          />

          <img src="/images/food/thetent_page_footer.png" alt="The Tent Food" width="100%" />
        </div>
      </main>

      <style jsx global>{`
        html {
          overflow-x: hidden !important;
        }

        body {
          background-color: #d8e1e9 !important;
          overflow: auto !important;
          overflow-x: hidden !important;
        }

        * {
          box-sizing: border-box;
        }

        .food-page {
          min-height: 100vh;
          padding-top: 78px;
          background: #d8e1e9;
        }

        /* =====================================================
           FOOD PAGE NAV THEME
           Uses shared SceneNav component, only restyled here.
        ===================================================== */

        .scene-nav {
          z-index: 10020 !important;
          background: rgba(216, 225, 233, 0.92) !important;
          border-bottom: none !important;
          box-shadow: none !important;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .scene-nav-burger,
        .scene-nav-logo {
          position: relative;
          z-index: 10030 !important;
        }

        .scene-nav-mobile {
          z-index: 10010 !important;
        }

        .scene-nav,
        .scene-nav a,
        .scene-nav-mobile,
        .scene-nav-mobile a {
          color: #ff0200 !important;
          font-family: Helvetica, Arial, sans-serif !important;
          font-weight: 700 !important;
        }

        .scene-nav a.active,
        .scene-nav-mobile a.active {
          color: #000000 !important;
        }

        .scene-nav a.disabled,
        .scene-nav-mobile a.disabled {
          color: #ff0200 !important;
          opacity: 0.42 !important;
        }

        .scene-nav .scene-nav-burger span {
          background: #ff0200 !important;
        }

        .scene-nav .scene-nav-logo img {
          filter: brightness(0) saturate(100%) invert(15%) sepia(100%)
            saturate(7494%) hue-rotate(358deg) brightness(101%) contrast(113%);
        }

        .scene-nav-mobile {
          background: rgba(216, 225, 233, 0.96) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .scene-nav-mobile-inner {
          padding-top: 92px;
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
          font-family: Helvetica !important;
          font-weight: bold !important;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          align-items: stretch;
          width: 100%;
          margin: 50px 0;
          padding: 0 10px;
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

        .dining-concept {
          margin: -33px auto;
          display: block;
        }

        .explore {
          margin-bottom: 5px;
        }

        .futurist-menu {
          margin: 0 auto;
          display: block;
        }

        .food-content {
          padding-bottom: 30px;
        }

        .line-anim {
          margin-bottom: 1rem;
        }

        .image-column img {
          border: 5px solid #d9e2ea;
          outline: 2px solid #221f20;
          outline-offset: 0;
          display: inline-block;
        }

        .explore-btns {
          margin: 25px 0;
        }

        .footer {
          margin-top: 10px !important;
        }

        .concept-pack {
          width: 88%;
          margin: 0 auto;
        }

        .night-sch {
          margin: 25px 0 15px 0;
        }

        .override-buttons-wrapper .column {
          flex: 1;
        }

        .nocturn h1 {
          margin-top: 30px;
        }

        .nocturn {
          background-color: #e2e2df !important;
          width: 65%;
          margin: 30px auto;
          padding: 0;
        }

        .nocturn-wider-section {
          width: 80%;
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
          font-family: Helvetica !important;
          font-weight: bold !important;
          text-decoration: none !important;
          color: #ffffff !important;
          padding-bottom: 20px;
          line-height: 1.1;
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
          border-top: 5px solid #000;
          padding-top: 20px;
          border-bottom: 5px solid #000;
          margin-bottom: 40px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .food-page {
            padding-top: 66px;
          }

          .scene-nav {
            background: rgba(216, 225, 233, 0.94) !important;
          }

          .scene-nav-mobile-inner {
            padding-top: 82px;
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

          .spacing {
            margin-top: 15px !important;
          }

          .preloader {
            margin: 15px 0 -15px 0 !important;
          }

          .nocturn-text-two {
            padding-top: 10px;
          }

          .nocturn-wider-section {
            width: 90%;
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

          .dining-concept {
            margin: -16px auto;
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

          .night-sch {
            margin: 0;
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
