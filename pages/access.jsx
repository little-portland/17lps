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
              0%, 100% {
                opacity: 0.18;
              }
              50% {
                opacity: 0.32;
              }
            }

            @keyframes buttonTypeReveal {
              from {
                width: 0;
              }
              to {
                width: 100%;
              }
            }

            .page-shell {
              min-height: 100vh;
              background: #000;
              padding: 32px 18px;
            }

            .nocturn.override {
              width: min(100%, 980px);
              margin: 0 auto;
              border: 2px solid #39ff14;
              padding: 0;
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
              background:
                repeating-linear-gradient(
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
              padding: 56px 54px 64px;
              position: relative;
              z-index: 4;
            }

            .main-poster-grid {
              display: grid;
              grid-template-columns: minmax(0, 1fr) 120px;
              column-gap: 18px;
              row-gap: 18px;
              align-items: start;
            }

            .hero-left {
              display: flex;
              flex-direction: column;
              gap: 24px;
              width: 100%;
            }

            .hero-kicker {
              color: #39ff14;
              font-family: "Courier New", monospace;
              text-transform: uppercase;
              font-size: 13px;
              letter-spacing: 0.18em;
              margin-bottom: 8px;
              font-weight: 700;
            }

            .hero-heading {
              color: #ffab00;
              font-family: "Courier New", monospace;
              text-transform: lowercase;
              font-size: clamp(36px, 7vw, 54px);
              line-height: 0.95;
              letter-spacing: 0.08em;
              margin: 0;
              font-weight: 700;
            }

            .hero-heading-line {
              display: inline-block;
              position: relative;
              white-space: nowrap;
            }

            .hero-copy {
              color: #ffab00;
              font-family: "Courier New", monospace;
              font-size: 18px;
              line-height: 1.8;
              letter-spacing: 0.06em;
              text-transform: lowercase;
            }

            .hero-copy-line {
              display: block;
            }

            .hero-copy .green {
              color: #39ff14;
            }

            .top-copy {
              grid-column: 1;
              grid-row: 1;
            }

            .top-tall {
              grid-column: 2;
              grid-row: 1 / span 2;
            }

            .mid-graphics {
              grid-column: 1;
              grid-row: 2;
              display: grid;
              grid-template-columns: minmax(0, 1.7fr) minmax(140px, 0.7fr);
              gap: 18px;
              align-items: start;
            }

            .green-panel-wrap {
              grid-column: 1;
              grid-row: 3;
            }

            .bottom-banner-wrap {
              grid-column: 1 / -1;
              grid-row: 4;
              padding-top: 10px;
            }

            .graphic-card,
            .hero-panel,
            .hero-image-wrap {
              background: #000;
              position: relative;
              overflow: hidden;
            }

            .graphic-card {
              padding: 10px;
            }

            .graphic-card::before,
            .hero-image-wrap::before {
              content: "";
              position: absolute;
              inset: 0;
              pointer-events: none;
              background:
                repeating-linear-gradient(
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
              border: 2px solid #c40000;
            }

            .graphic-card.red::after {
              background: linear-gradient(
                90deg,
                rgba(196,0,0,0) 0%,
                rgba(196,0,0,0.14) 50%,
                rgba(196,0,0,0) 100%
              );
            }

            .hero-image-wrap {
              border: 2px solid #39ff14;
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

            .graphic-tall {
              width: 100%;
            }

            .graphic-square {
              width: 100%;
            }

            .graphic-decorative {
              width: 100%;
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
              margin-bottom: 26px;
              position: relative;
              z-index: 1;
            }

            .friend-link-wrap {
              margin-top: 10px;
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

            .hero-image-wrap {
              width: 100%;
              margin: 0;
              padding: 10px;
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

              .main-poster-grid {
                grid-template-columns: 1fr;
                row-gap: 14px;
              }

              .top-copy,
              .top-tall,
              .green-panel-wrap,
              .bottom-banner-wrap {
                grid-column: 1;
                grid-row: auto;
              }

              .mid-graphics {
                grid-column: 1;
                grid-row: auto;
                grid-template-columns: 1fr;
                gap: 14px;
              }

              .top-tall {
                max-width: 120px;
              }

              .graphic-square {
                max-width: 180px;
              }

              .friend-link-wrap a {
                min-height: 54px;
                font-size: 15px;
                padding: 14px 16px;
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
            <div className="main-poster-grid">
              <div className="top-copy">
                <div className="hero-left">
                  <div>
                    <div className="hero-kicker">17 little portland street</div>
                    <h1 className="hero-heading">
                      <span className="hero-heading-line">access protocol</span>
                    </h1>
                  </div>

                  <div className="hero-copy">
                    <span className="hero-copy-line line-1">
                      entry to the club is reserved for <span className="green">friends of the club</span>.
                    </span>
                    <span className="hero-copy-line line-2">
                      submit your enquiry to begin the process.
                    </span>
                  </div>
                </div>
              </div>

              <div className="top-tall">
                <div className="graphic-card red graphic-tall">
                  <Image
                    src="/images/foc/tall-graphic.png"
                    alt="Tall decorative graphic"
                    width={300}
                    height={1000}
                    className="graphic-image"
                  />
                </div>
              </div>

              <div className="mid-graphics">
                <div className="graphic-card orange graphic-decorative">
                  <Image
                    src="/images/foc/decorative-graphic.png"
                    alt="Decorative horizontal graphic"
                    width={1000}
                    height={300}
                    className="graphic-image"
                  />
                </div>

                <div className="graphic-card orange graphic-square">
                  <Image
                    src="/images/foc/square-graphic.png"
                    alt="Square decorative graphic"
                    width={500}
                    height={500}
                    className="graphic-image"
                  />
                </div>
              </div>

              <div className="green-panel-wrap">
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

              <div className="bottom-banner-wrap">
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
