import React from "react";
import Head from "next/head";

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

            .page-shell {
              min-height: 100vh;
              background: #000;
              padding: 32px 18px;
            }

            .nocturn.override {
              width: min(100%, 980px);
              margin: 0 auto;
              border: 3px solid #39ff14;
              padding: 0;
              background: #000;
              position: relative;
              box-shadow: 0 0 0 1px rgba(57,255,20,0.15), 0 0 24px rgba(57,255,20,0.08);
            }

            .poster-topbar {
              display: flex;
              align-items: center;
              gap: 14px;
              padding: 10px 16px;
              border-bottom: 3px solid #39ff14;
              min-height: 54px;
            }

            .poster-dots {
              display: flex;
              gap: 10px;
              flex-shrink: 0;
            }

            .poster-dots span {
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: #ffab00;
              display: inline-block;
            }

            .poster-title {
              color: #ffab00;
              font-family: "Courier New", monospace;
              font-size: 30px;
              line-height: 1;
              letter-spacing: 0.08em;
              font-weight: 700;
            }

            .poster-inner {
              padding: 56px 54px 64px;
              position: relative;
            }

            .hero-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 28px;
              align-items: start;
              width: 100%;
            }

            .hero-left {
              display: flex;
              flex-direction: column;
              gap: 26px;
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
              font-size: clamp(36px, 7vw, 74px);
              line-height: 0.95;
              letter-spacing: 0.08em;
              margin: 0;
              font-weight: 700;
            }

            .hero-copy {
              color: #ffab00;
              font-family: "Courier New", monospace;
              font-size: 18px;
              line-height: 1.8;
              letter-spacing: 0.06em;
              text-transform: lowercase;
              max-width: 28ch;
            }

            .hero-copy .green {
              color: #39ff14;
            }

            .hero-panel {
              border: 2px solid #39ff14;
              padding: 20px;
              min-height: 100%;
              position: relative;
              background:
                linear-gradient(to bottom, rgba(57,255,20,0.06), rgba(57,255,20,0.01)),
                #050505;
              width: 100%;
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
            }

            .friend-link-wrap a {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              min-height: 64px;
              padding: 18px 20px;
              border: 2px solid #a20903;
              background: #000;
              color: #ffab00 !important;
              font-family: "Courier New", monospace;
              font-size: 20px;
              font-weight: 700;
              text-transform: lowercase;
              letter-spacing: 0.08em;
              text-decoration: none !important;
              transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
              text-align: center;
            }

            .friend-link-wrap a:hover {
              background: #a20903;
              color: #000 !important;
              box-shadow: inset 0 0 0 1px #39ff14;
            }

            .poster-footer {
              margin-top: 44px;
              padding-top: 24px;
              border-top: 2px solid rgba(57,255,20,0.45);
              display: grid;
              grid-template-columns: 1fr auto;
              gap: 20px;
              align-items: end;
            }

            .footer-meta {
              font-family: "Courier New", monospace;
              color: #ffab00;
              text-transform: lowercase;
              font-size: 14px;
              line-height: 1.9;
              letter-spacing: 0.08em;
              font-weight: 700;
            }

            .footer-accent {
              color: #39ff14;
            }

            .signal-bars {
              display: flex;
              gap: 8px;
              align-items: end;
              height: 44px;
            }

            .signal-bars span {
              display: block;
              width: 10px;
              background: #c40000;
            }

            .signal-bars span:nth-child(1) { height: 16px; }
            .signal-bars span:nth-child(2) { height: 22px; }
            .signal-bars span:nth-child(3) { height: 28px; }
            .signal-bars span:nth-child(4) { height: 34px; }
            .signal-bars span:nth-child(5) { height: 40px; }

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
                width: 12px;
                height: 12px;
              }

              .poster-title {
                font-size: 19px;
              }

              .poster-inner {
                padding: 28px 18px 32px;
              }

              .hero-grid {
                grid-template-columns: 1fr;
                gap: 24px;
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
              .panel-label,
              .footer-meta {
                font-size: 12px;
              }

              .friend-link-wrap a {
                min-height: 54px;
                font-size: 15px;
                padding: 14px 16px;
              }

              .poster-footer {
                grid-template-columns: 1fr;
                gap: 12px;
              }
            }
          `}
        </style>

        <title>17 Little Portland Street - Friends of the Club</title>
      </Head>

      <div className="page-shell">
        <div className="nocturn override">
          <div className="poster-topbar">
            <div className="poster-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="poster-title">Friend of the Club</div>
          </div>

          <div className="poster-inner">
            <div className="hero-grid">
              <div className="hero-left">
                <div>
                  <div className="hero-kicker">17 little portland street</div>
                  <h1 className="hero-heading">
                    access protocol
                  </h1>
                </div>

                <div className="hero-copy">
                  entry to the club is reserved for <span className="green">friends of the club</span>. submit your enquiry to begin the process.
                </div>
              </div>

              <div className="hero-panel">
                <div className="panel-label">status: accepting enquiries</div>

                <div className="panel-copy">
                  membership requests are handled via direct contact. use the transmission panel below.
                </div>

                <div className="friend-link-wrap">
                  <a
                    href="mailto:friends@little-portland.com?subject=FOC Enquiry"
                    aria-label="apply to become a friend of the club"
                    target="_blank"
                    rel="noreferrer"
                  >
                    apply to become a friend of the club
                  </a>
                </div>
              </div>
            </div>

            <div className="poster-footer">
              <div className="footer-meta">
                saturday / late
                <br />
                issue 459
                <br />
                <span className="footer-accent">friends@little-portland.com</span>
              </div>

              <div className="signal-bars" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
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
