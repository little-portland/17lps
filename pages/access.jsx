import React from "react";
import Head from "next/head";
import HoverImageLink from "@components/HoverImageLink";

// hooks
import useFetchContent from "@utils/useFetchContent";

const Menu = ({ menuImage }) => {
  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href="/images/theclub/the_club_page_friend.png"
        />
        <link
          rel="preload"
          as="image"
          href="/images/theclub/the_club_page_friend_hover.png"
        />

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
            }

            * {
              box-sizing: border-box;
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
              text-transform: lowercase;
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
              grid-template-columns: 1.05fr 0.95fr;
              gap: 42px;
              align-items: start;
            }

            .hero-left {
              display: flex;
              flex-direction: column;
              gap: 26px;
            }

            .hero-kicker {
              color: #39ff14;
              font-family: "Courier New", monospace;
              text-transform: uppercase;
              font-size: 13px;
              letter-spacing: 0.18em;
              margin-bottom: 8px;
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
            }

            .hero-panel::before {
              content: "";
              position: absolute;
              inset: 10px;
              border: 1px solid rgba(57,255,20,0.28);
              pointer-events: none;
            }

            .panel-label {
              color: #39ff14;
              font-family: "Courier New", monospace;
              text-transform: lowercase;
              font-size: 14px;
              letter-spacing: 0.12em;
              margin-bottom: 18px;
            }

            .panel-copy {
              color: #ffab00;
              font-family: "Courier New", monospace;
              text-transform: lowercase;
              font-size: 16px;
              line-height: 1.8;
              letter-spacing: 0.04em;
              margin-bottom: 26px;
            }

            .friend-link-wrap {
              margin-top: 10px;
            }

            .friend-link-wrap a,
            .friend-link-wrap > div {
              display: block;
              width: 100%;
            }

            .friend-link-wrap img {
              display: block;
              width: 100%;
              height: auto;
              border: 2px solid #ffab00;
              background: #000;
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
                gap: 28px;
              }

              .hero-heading {
                font-size: 40px;
              }

              .hero-copy,
              .panel-copy {
                font-size: 14px;
                line-height: 1.7;
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
            <div className="poster-title">friends of the club</div>
          </div>

          <div className="poster-inner">
            <div className="hero-grid">
              <div className="hero-left">
                <div>
                  <div className="hero-kicker">17 little portland street</div>
                  <h1 className="hero-heading">
                    access
                    <br />
                    protocol
                  </h1>
                </div>

                <div className="hero-copy">
                  entry to the club is reserved for{" "}
                  <span className="green">friends of the club</span>.
                  <br />
                  <br />
                  submit your enquiry to begin the process.
                </div>
              </div>

              <div className="hero-panel">
                <div className="panel-label">status: accepting enquiries</div>

                <div className="panel-copy">
                  membership requests are handled via direct contact.
                  <br />
                  use the transmission panel below.
                </div>

                <div className="friend-link-wrap">
                  <HoverImageLink
                    href="mailto:friends@little-portland.com?subject=FOC Enquiry"
                    img="/images/theclub/the_club_page_friend.png"
                    hoverImg="/images/theclub/the_club_page_friend_hover.png"
                    aspect="2000 / 306"
                    ariaLabel="apply to become a friend of the club"
                    target="_blank"
                  />
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
