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
        <link rel="preload" as="image" href="/images/theclub/the_club_page_private_hire.png" />
        <link rel="preload" as="image" href="/images/theclub/the_club_page_private_hire_hover.png" />
        <link rel="preload" as="image" href="/images/theclub/the_club_page_friend.png" />
        <link rel="preload" as="image" href="/images/theclub/the_club_page_friend_hover.png" />
        <link rel="preload" as="image" href="/images/theclub/rotating_club.gif" />

        <title>17 Little Portland Street - The Club</title>
      </Head>

      <main className="club-page club-page--with-scene-nav">
        <SceneNav />

        <div className="nocturn override">
          <img
            className="override-logo club-top-logo"
            src="/images/theclub/theclub-page-top.gif"
            alt="The Club"
            width="100%"
          />
        </div>

        <div className="nocturn override">
          <img src="/images/theclub/rotating_club.gif" alt="The Club" width="100%" />
        </div>

        <div className="nocturn override intro">
          <p>Access to the club is for Friends of the Club only.</p>
        </div>

        <div className="nocturn hire friends">
          <HoverImageLink
            href="mailto:friends@little-portland.com?subject=FOC Enquiry"
            img="/images/theclub/the_club_page_friend.png"
            hoverImg="/images/theclub/the_club_page_friend_hover.png"
            aspect="2000 / 306"
            ariaLabel="APPLY TO BECOME A FRIEND OF THE CLUB"
            target="_blank"
          />
        </div>

        <div className="nocturn override intro">
          <p>
            Or you can access the club by{" "}
            <a
              className="link"
              target="_blank"
              rel="noreferrer"
              href="https://www.little-portland.com/bookings"
            >
              booking
            </a>{" "}
            a dinner table.
          </p>
        </div>

        <div className="nocturn override">
          <div className="dance-popup">
            <div>
              <div className="category thu">
                <h3>
                  Thursday <span className="italic-word">is</span>{" "}
                  <span className="group-item">Underground</span>
                </h3>
                <p>
                  Positioned as the weekly opener,{" "}
                  <span className="group-item">Thursday Underground</span> sets the tone for the
                  entire weekend. A platform for cutting-edge electronic sound that, at its most
                  profound, transcends the boundaries of conventional music,{" "}
                  <span className="group-item">Thursday Underground</span> is an ode to artists at
                  the forefront of the underground electronic movement; a movement followed by a
                  community deeply rooted in its culture.
                </p>
              </div>

              <div className="category fri">
                <h3>
                  Friday <span className="italic-word">is</span>{" "}
                  <span className="group-item">Residents</span>
                </h3>
                <p>
                  <span className="group-item">Friday Residents</span> stands as a bridge between
                  two worlds. While influenced by both Thursday Underground and Saturday Disco3000,
                  it projects its own vibe and crowd into each. With a focus on club residents in
                  its programming, it maintains a sense of familiarity and community, making{" "}
                  <span className="group-item">Friday Residents</span> the vibrant heartbeat of the
                  weekend.
                </p>
              </div>

              <div className="category sat">
                <h3>
                  Saturday <span className="italic-word">is</span>{" "}
                  <span className="group-item">Disco3000</span>
                </h3>
                <p>
                  <span className="group-item">Disco3000</span> seeks to capture the spirit of the
                  disco era for the space age. Guided by artists who’ve journeyed across the sonic
                  spectrum time and again, it embraces a soundscape that truly resonates with the
                  soul: diverse, timeless, and filled with uplifting and euphoric elements. These
                  are the sounds of the musically enlightened.{" "}
                  <span className="group-item">Disco3000</span> is how we draw the weekend to a
                  close; a cosmic finale.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="nocturn hire">
          <HoverImageLink
            href="mailto:yo@little-portland.com"
            img="/images/theclub/the_club_page_private_hire.png"
            hoverImg="/images/theclub/the_club_page_private_hire_hover.png"
            aspect="2000 / 306"
            ariaLabel="Private hire enquiries"
            target="_blank"
          />
        </div>

        <div className="nocturn override reg-btns">
          <div className="override-buttons-wrapper">
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
                href="https://www.little-portland.com/studio"
                className="override-button"
              >
                EXPLORE THE STUDIO
              </a>
            </div>
          </div>
        </div>

        <div className="nocturn-wider-section override-logo img-grid">
          <div className="image-row">
            <div className="image-column">
              <img src="/images/theclub/the_club01.jpg" alt="The Club" />
              <img src="/images/theclub/the_club02.jpg" alt="The Club" />
              <img src="/images/theclub/the_club03.jpg" alt="The Club" />
              <img src="/images/theclub/the_club04.jpg" alt="The Club" />
              <img src="/images/theclub/the_club05.jpg" alt="The Club" />
              <img src="/images/theclub/the_club11.jpg" alt="The Club" />
            </div>

            <div className="image-column">
              <img src="/images/theclub/the_club06.jpg" alt="The Club" />
              <img src="/images/theclub/the_club07.jpg" alt="The Club" />
              <img src="/images/theclub/the_club08.jpg" alt="The Club" />
              <img src="/images/theclub/the_club09.jpg" alt="The Club" />
              <img src="/images/theclub/the_club10.jpg" alt="The Club" />
              <img src="/images/theclub/the_club12.gif" alt="The Club" />
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

        .club-page {
          min-height: 100vh;
          background: #000000;
          font-family: Helvetica, "Helvetica Neue", Arial, sans-serif;
          padding-top: 52px;
        }

        /* =====================================================
           SHARED SCENENAV — CLUB PAGE THEME ONLY
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
          color: #aacc33 !important;
        }

        .scene-nav a:hover,
        .scene-nav-mobile a:hover {
          color: #ffffff !important;
        }

        .scene-nav a.active,
        .scene-nav-mobile a.active {
          color: #aacc33 !important;
        }

        .scene-nav a.disabled,
        .scene-nav-mobile a.disabled {
          color: #ffffff !important;
          opacity: 0.45 !important;
        }

        .scene-nav-logo,
        .scene-nav-logo a,
        .scene-nav-logo svg,
        .scene-nav-logo img {
          color: #ffffff !important;
        }

        .scene-nav-logo img,
        .scene-nav-logo svg,
        .scene-nav-logo svg *,
        .scene-nav-logo path,
        .scene-nav-logo circle,
        .scene-nav-logo rect,
        .scene-nav-logo line {
          filter: brightness(0) invert(1) !important;
          fill: #ffffff !important;
          stroke: #ffffff !important;
        }

        .scene-nav .scene-nav-burger span {
          background: #aacc33 !important;
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

        .club-top-logo {
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

        .button-half-page {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 5px;
          box-sizing: border-box;
        }

        .link {
          color: #aacc33 !important;
          transition: all 0.3s ease-in-out;
          opacity: 1;
        }

        .link:hover {
          color: #aacc33 !important;
          opacity: 0.7;
        }

        .override-button {
          color: #aacc33 !important;
          border: 3px solid #aacc33 !important;
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
          background-color: #aacc33 !important;
          border: 3px solid #aacc33 !important;
        }

        .image-column img {
          border: 2px solid #aacc33;
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

        .hire {
          margin: 50px auto 50px auto !important;
        }

        .friends {
          margin: 25px auto 30px auto !important;
        }

        .img-grid {
          margin-bottom: 40px !important;
        }

        .reg-btns .override-button {
          font-family: Helvetica, "Helvetica Neue", Arial, sans-serif;
          font-weight: 900;
          background-color: #aacc33 !important;
          color: #000000 !important;
          border: 0 !important;
          font-size: 25px;
          border-radius: 50px;
          padding: 10px 15px;
        }

        .reg-btns .override-button:hover {
          background-color: #ffffff !important;
        }

        .reg-btns .button-half-page {
          width: 49% !important;
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
          .club-page {
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

          .club-top-logo {
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

          .dance-popup h3 {
            font-size: 0.7rem !important;
            padding: 5px 10px !important;
          }

          .dance-popup p {
            font-size: 0.6rem !important;
            line-height: 2 !important;
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

          .hire {
            margin: 30px auto 40px auto !important;
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

          .reg-btns .button-half-page {
            width: 98% !important;
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
