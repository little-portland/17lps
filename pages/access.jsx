import React from "react";
import Head from "next/head";
import Image from "next/image";

// hooks
import useFetchContent from "@utils/useFetchContent";

const Menu = ({ menuImage }) => {
  return (
    <>
      <Head>
        <style>
          {`
            html {
              overflow-x: hidden !important;
              background: #000 !important;
            }

            body {
              background: #000 !important;
              overflow-x: hidden !important;
              color: #ffab00;
              margin: 0;
            }

            * {
              box-sizing: border-box;
            }

            a {
              text-decoration: none;
            }

            @keyframes cursorBlink {
              0%, 45% { opacity: 1; }
              46%, 100% { opacity: 0; }
            }

            @keyframes scanlineTopToBottom {
              0% { transform: translateY(-140%); }
              100% { transform: translateY(140%); }
            }

            @keyframes imageSweep {
              0% { transform: translateX(-120%); }
              100% { transform: translateX(120%); }
            }

            @keyframes panelAmbientPulse {
              0%, 100% { opacity: 0.18; }
              50% { opacity: 0.32; }
            }

            @keyframes buttonTypeReveal {
              from { width: 0; }
              to { width: 100%; }
            }

            .page-shell {
              min-height: 100vh;
              background: #000;
              padding: 28px 18px;
            }

            .nocturn.override {
              width: min(100%, 1120px);
              margin: 0 auto;
              border: 2px solid #39ff14;
              background: #000;
              position: relative;
              overflow: hidden;
              box-shadow: 0 0 0 1px rgba(57,255,20,0.15), 0 0 24px rgba(57,255,20,0.08);
            }

            .nocturn.override::before {
              content: "";
              position: absolute;
              inset: 0;
              pointer-events: none;
              background: repeating-linear-gradient(
                to bottom,
                rgba(255,255,255,0.02) 0px,
                rgba(255,255,255,0.02) 1px,
                transparent 1px,
                transparent 3px
              );
              opacity: 0.08;
              z-index: 2;
            }

            .nocturn.override::after {
              content: "";
              position: absolute;
              left: 0;
              right: 0;
              height: 100%;
              pointer-events: none;
              background: linear-gradient(
                to bottom,
                rgba(57,255,20,0) 0%,
                rgba(57,255,20,0.03) 35%,
                rgba(57,255,20,0.12) 50%,
                rgba(57,255,20,0.03) 65%,
                rgba(57,255,20,0) 100%
              );
              mix-blend-mode: screen;
              z-index: 3;
              animation: scanlineTopToBottom 8s linear infinite;
            }

            .poster-topbar {
              display: flex;
              align-items: center;
              gap: 14px;
              padding: 10px 16px;
              border-bottom: 2px solid #39ff14;
              min-height: 54px;
              position: relative;
              z-index: 4;
            }

            .poster-dots {
              display: flex;
              gap: 10px;
              flex-shrink: 0;
            }

            .poster-dots span {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: #ffab00;
              display: inline-block;
            }

            .poster-title {
              color: #ffab00;
              font-family: "Courier New", monospace;
              font-size: 22px;
              line-height: 1;
              letter-spacing: 0.08em;
              font-weight: 700;
            }

            .poster-inner {
              padding: 46px 56px 58px;
              position: relative;
              z-index: 4;
            }

            .content-width {
              width: 100%;
            }

            .hero-kicker {
              color: #39ff14;
              font-family: "Courier New", monospace;
              text-transform: uppercase;
              font-size: 13px;
              letter-spacing: 0.18em;
              margin-bottom: 10px;
              font-weight: 700;
            }

            .hero-heading {
              color: #ffab00;
              font-family: "Courier New", monospace;
              text-transform: lowercase;
              font-size: clamp(40px, 7vw, 62px);
              line-height: 0.95;
              letter-spacing: 0.08em;
              margin: 0 0 18px 0;
              font-weight: 700;
            }

            .access-dots-wrap {
              width: 310px;
              max-width: 100%;
              margin: 0 0 18px 0;
              line-height: 0;
              position: relative;
              z-index: 4;
            }

            .access-dots-gif {
              display: block;
              width: 100%;
              height: auto;
            }

            .hero-copy {
              color: #ffab00;
              font-family: "Courier New", monospace;
              font-size: 18px;
              line-height: 1.7;
              letter-spacing: 0.06em;
              text-transform: lowercase;
              margin-bottom: 26px;
            }

            .hero-copy-line {
              display: block;
            }

            .hero-copy .green {
              color: #39ff14;
            }

            .desktop-only {
              display: flex;
              flex-direction: column;
              gap: 18px;
              width: 100%;
            }

            .mobile-only {
              display: none;
            }

            .desktop-row-top,
            .desktop-row-middle,
            .desktop-row-bottom,
            .mobile-row-decorative,
            .mobile-row-side,
            .mobile-row-panel,
            .mobile-row-banner {
              width: 100%;
            }

            .desktop-row-top {
              display: grid;
              grid-template-columns: minmax(0, 1fr) 78px 230px;
              gap: 18px;
              align-items: stretch;
            }

            .desktop-row-middle {
              display: block;
            }

            .desktop-row-bottom {
              display: block;
            }

            .mobile-row-decorative,
            .mobile-row-side,
            .mobile-row-panel {
              margin-bottom: 14px;
            }

            .mobile-row-side {
              display: grid;
              grid-template-columns: minmax(0, 1fr) minmax(0, 0.34fr);
              gap: 14px;
              align-items: stretch;
            }

            .graphic-card,
            .hero-panel,
            .hero-image-wrap {
              background: #000;
              position: relative;
              overflow: hidden;
            }

            .graphic-card {
              padding: 5px;
            }

            .graphic-card::before,
            .hero-image-wrap::before {
              content: "";
              position: absolute;
              inset: 0;
              pointer-events: none;
              background: repeating-linear-gradient(
                to bottom,
                rgba(255,255,255,0.018) 0px,
                rgba(255,255,255,0.018) 1px,
                transparent 1px,
                transparent 4px
              );
              opacity: 0.1;
              z-index: 1;
            }

            .graphic-card::after,
            .hero-image-wrap::after {
              content: "";
              position: absolute;
              top: 0;
              bottom: 0;
              width: 100%;
              pointer-events: none;
              transform: translateX(-120%);
              z-index: 2;
              animation: imageSweep 4.8s linear infinite;
            }

            .graphic-card.orange {
              border: 2px solid #ffab00;
            }

            .graphic-card.orange::after {
              background: linear-gradient(
                90deg,
                rgba(255,171,0,0) 0%,
                rgba(255,171,0,0.12) 50%,
                rgba(255,171,0,0) 100%
              );
            }

            .graphic-card.red {
              border: 2px solid #ff2020;
            }

            .graphic-card.red::after {
              background: linear-gradient(
                90deg,
                rgba(255,32,32,0) 0%,
                rgba(255,32,32,0.12) 50%,
                rgba(255,32,32,0) 100%
              );
            }

            .hero-image-wrap {
              border: 2px solid #39ff14;
              padding: 10px;
            }

            .hero-image-wrap::after {
              background: linear-gradient(
                90deg,
                rgba(57,255,20,0) 0%,
                rgba(57,255,20,0.12) 50%,
                rgba(57,255,20,0) 100%
              );
            }

            .graphic-image {
              display: block;
              width: 100%;
              height: auto;
              position: relative;
              z-index: 0;
            }

            .desktop-graphic-frame {
              position: relative;
              width: 100%;
              height: 210px;
              z-index: 0;
            }

            .desktop-decorative-frame,
            .desktop-tall-frame,
            .desktop-square-frame {
              height: 210px;
            }

            .desktop-decorative-img,
            .desktop-tall-img,
            .desktop-square-img {
              object-fit: contain;
              object-position: center;
            }

            .square-mobile,
            .tall-mobile {
              display: flex;
              align-items: stretch;
              min-height: 210px;
            }

            .mobile-square-frame,
            .mobile-tall-frame {
              position: relative;
              width: 100%;
              height: 100%;
              min-height: 200px;
              z-index: 0;
            }

            .mobile-square-img {
              object-fit: cover;
              object-position: center;
            }

            .mobile-tall-img {
              object-fit: contain;
              object-position: center;
            }

            .hero-panel {
              border: 2px solid #39ff14;
              padding: 20px;
              min-height: 100%;
              background: rgba(57, 255, 20, 0.12);
              width: 100%;
            }

            .hero-panel::before {
              content: "";
              position: absolute;
              inset: 0;
              pointer-events: none;
              background:
                radial-gradient(circle at 20% 30%, rgba(57,255,20,0.12), transparent 42%),
                radial-gradient(circle at 80% 70%, rgba(57,255,20,0.10), transparent 45%),
                linear-gradient(to bottom, rgba(57,255,20,0.08), rgba(57,255,20,0.12));
              animation: panelAmbientPulse 4.8s ease-in-out infinite;
              z-index: 0;
            }

            .panel-label {
              color: #39ff14;
              font-family: "Courier New", monospace;
              text-transform: lowercase;
              font-size: 14px;
              letter-spacing: 0.12em;
              margin-bottom: 18px;
              position: relative;
              z-index: 1;
              font-weight: 700;
            }

            .panel-label::after {
              content: " ▋";
              color: #39ff14;
              animation: cursorBlink 1.1s steps(1, end) infinite;
            }

            .panel-copy {
              color: #ffab00;
              font-family: "Courier New", monospace;
              text-transform: lowercase;
              font-size: 16px;
              line-height: 1.8;
              letter-spacing: 0.04em;
              margin-bottom: 18px;
              position: relative;
              z-index: 1;
            }

            .friend-link-wrap {
              margin-top: 8px;
              width: 100%;
              position: relative;
              z-index: 1;
              overflow: hidden;
            }

            .friend-link-wrap a {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              min-height: 64px;
              padding: 18px 20px;
              background: #39ff14;
              color: #000 !important;
              font-family: "Courier New", monospace;
              font-size: 20px;
              font-weight: 700;
              text-transform: lowercase;
              letter-spacing: 0.08em;
              text-decoration: none !important;
              transition:
                background 0.22s ease,
                color 0.22s ease,
                box-shadow 0.22s ease,
                transform 0.22s ease;
              text-align: center;
              position: relative;
              overflow: hidden;
              box-shadow: 0 0 0 rgba(57,255,20,0);
            }

            .friend-link-wrap a:hover {
              background: #ffab00;
              color: #000 !important;
              transform: translateY(-1px);
              box-shadow: 0 0 18px rgba(255,171,0,0.16);
            }

            .button-text-wrap {
              position: relative;
              display: inline-grid;
              place-items: center;
              width: 100%;
            }

            .button-label-static,
            .button-label-typed {
              grid-area: 1 / 1;
              white-space: nowrap;
              text-align: center;
              color: #000;
            }

            .button-label-static {
              opacity: 1;
            }

            .button-label-typed {
              overflow: hidden;
              width: 0;
              opacity: 0;
              pointer-events: none;
            }

            .friend-link-wrap a:hover .button-label-static {
              opacity: 0;
            }

            .friend-link-wrap a:hover .button-label-typed {
              opacity: 1;
              animation: buttonTypeReveal 0.8s steps(36, end) 1 forwards;
            }

            .hero-image-inner {
              width: 100%;
              background: #030303;
              line-height: 0;
              position: relative;
              z-index: 0;
            }

            .hero-image {
              display: block;
              width: 100%;
              height: auto;
            }

            .desktop-banner-row,
            .mobile-row-banner {
              margin-top: 18px;
            }

            @media (prefers-reduced-motion: reduce) {
              .nocturn.override::after,
              .panel-label::after,
              .graphic-card::after,
              .hero-image-wrap::after,
              .hero-panel::before,
              .friend-link-wrap a:hover .button-label-typed {
                animation: none !important;
              }

              .friend-link-wrap a:hover .button-label-static {
                opacity: 0;
              }

              .friend-link-wrap a:hover .button-label-typed {
                width: 100% !important;
                opacity: 1 !important;
              }
            }

            @media (max-width: 768px) {
              .page-shell {
                padding: 14px;
              }

              .nocturn.override {
                width: 100%;
              }

              .poster-topbar {
                padding: 10px 12px;
                min-height: 46px;
              }

              .poster-dots span {
                width: 8px;
                height: 8px;
              }

              .poster-title {
                font-size: 15px;
              }

              .poster-inner {
                padding: 28px 18px 32px;
              }

              .hero-heading {
                font-size: 30px;
                margin-bottom: 14px;
              }

              .access-dots-wrap {
                width: 180px;
                margin-bottom: 14px;
              }

              .hero-copy,
              .panel-copy {
                font-size: 14px;
                line-height: 1.7;
              }

              .hero-kicker,
              .panel-label {
                font-size: 12px;
              }

              .desktop-only {
                display: none !important;
              }

              .mobile-only {
                display: block !important;
              }

              .mobile-row-side,
              .mobile-row-decorative,
              .mobile-row-panel {
                margin-bottom: 14px;
              }

              .friend-link-wrap a {
                min-height: 24px;
                padding: 5px 10px;
                font-size: 14px;
                line-height: 1.2;
                max-height: 60px;
              }

              .button-label-static,
              .button-label-typed {
                white-space: normal;
              }
            }
          `}
        </style>

        <title>17 Little Portland Street - Friend of the Club</title>
      </Head>

      <div className="page-shell">
        <div className="nocturn override">
          <div className="poster-topbar">
            <div className="poster-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="poster-title">friend of the club</div>
          </div>

          <div className="poster-inner">
            <div className="content-width">
              <div className="hero-kicker">17 little portland street</div>
              <h1 className="hero-heading">access protocol</h1>

              <div className="access-dots-wrap" aria-hidden="true">
                <img
                  src="/images/foc/access_page_dots-graphic.gif"
                  alt=""
                  className="access-dots-gif"
                />
              </div>

              <div className="hero-copy">
                <span className="hero-copy-line">
                  entry to the club is reserved for <span className="green">friends of the club</span>.
                </span>
                <span className="hero-copy-line">
                  submit your enquiry to begin the process.
                </span>
              </div>

              <div className="desktop-only">
                <div className="desktop-art-row desktop-row-top">
                  <div className="graphic-card orange decorative-desktop">
                    <div className="desktop-graphic-frame desktop-decorative-frame">
                      <Image
                        src="/images/foc/decorative-graphic.png"
                        alt="Decorative horizontal graphic"
                        fill
                        className="desktop-decorative-img"
                      />
                    </div>
                  </div>

                  <div className="graphic-card red tall-desktop">
                    <div className="desktop-graphic-frame desktop-tall-frame">
                      <Image
                        src="/images/foc/tall-graphic.png"
                        alt="Tall decorative graphic"
                        fill
                        className="desktop-tall-img"
                      />
                    </div>
                  </div>

                  <div className="graphic-card orange square-desktop">
                    <div className="desktop-graphic-frame desktop-square-frame">
                      <Image
                        src="/images/foc/square-graphic.png"
                        alt="Square decorative graphic"
                        fill
                        className="desktop-square-img"
                      />
                    </div>
                  </div>
                </div>

                <div className="desktop-panel-row desktop-row-middle">
                  <div className="hero-panel">
                    <div className="panel-label">status: accepting enquiries</div>

                    <div className="panel-copy">
                      membership requests are handled via direct contact.
                      <br />
                      use the transmission panel below.
                    </div>

                    <div className="friend-link-wrap">
                      <a
                        href="mailto:friends@little-portland.com?subject=FOC Enquiry"
                        aria-label="apply to become a friend of the club"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="button-text-wrap">
                          <span className="button-label-static">
                            apply to become a friend of the club
                          </span>
                          <span className="button-label-typed">
                            apply to become a friend of the club
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mobile-only">
                <div className="mobile-row-decorative">
                  <div className="graphic-card orange">
                    <Image
                      src="/images/foc/decorative-graphic.png"
                      alt="Decorative horizontal graphic"
                      width={1000}
                      height={300}
                      className="graphic-image"
                    />
                  </div>
                </div>

                <div className="mobile-row-side">
                  <div className="graphic-card orange square-mobile">
                    <div className="mobile-square-frame">
                      <Image
                        src="/images/foc/square-graphic.png"
                        alt="Square decorative graphic"
                        fill
                        className="mobile-square-img"
                      />
                    </div>
                  </div>

                  <div className="graphic-card red tall-mobile">
                    <div className="mobile-tall-frame">
                      <Image
                        src="/images/foc/tall-graphic.png"
                        alt="Tall decorative graphic"
                        fill
                        className="mobile-tall-img"
                      />
                    </div>
                  </div>
                </div>

                <div className="mobile-row-panel">
                  <div className="hero-panel">
                    <div className="panel-label">status: accepting enquiries</div>

                    <div className="panel-copy">
                      membership requests are handled via direct contact.
                      <br />
                      use the transmission panel below.
                    </div>

                    <div className="friend-link-wrap">
                      <a
                        href="mailto:friends@little-portland.com?subject=FOC Enquiry"
                        aria-label="apply to become a friend of the club"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="button-text-wrap">
                          <span className="button-label-static">
                            apply to become a friend of the club
                          </span>
                          <span className="button-label-typed">
                            apply to become a friend of the club
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="desktop-banner-row mobile-row-banner desktop-row-bottom">
                <div className="hero-image-wrap">
                  <div className="hero-image-inner">
                    <Image
                      src="/images/foc/foc-page-img1.png"
                      alt="Friends of the Club artwork"
                      width={2000}
                      height={353}
                      className="hero-image"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

  const menuImage = menuData?.menuCollection?.items?.[0]?.menuImage || null;

  return {
    props: {
      menuImage,
    },
    revalidate: 30,
  };
}
