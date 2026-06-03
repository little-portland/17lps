import React from 'react';
import Head from 'next/head';

import SceneNav from '@components/SceneNav';

const DiningTest = () => {
  return (
    <>
      <Head>
        <title>Dining At — 17 Little Portland Street</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />

        <style>
          {`
            html,
            body {
              background: #000000 !important;
              overflow-x: hidden !important;
              overflow-y: auto !important;
              -webkit-overflow-scrolling: touch !important;
            }

            body {
              margin: 0;
            }

            /*
              Dining-test is a secondary page, so no primary nav item should appear active.
              This neutralises the active colour only on this page.
            */
            .scene-nav--dining a.active,
            .scene-nav-mobile--dining .scene-nav-mobile-inner a.active {
              color: rgba(61, 207, 214, 0.86) !important;
            }

            .scene-nav--dining a.active:hover {
              color: #f57658 !important;
            }

            .dining-page-main {
              width: 100%;
              padding-top: 86px;
              padding-bottom: 40px;
              background: #000000;
              box-sizing: border-box;
            }

            .dining-page-frame {
              width: 65%;
              margin: 0 auto;
              background: #000000;
              color: #3dcfd6;
              font-family: 'Space Mono', 'Courier New', monospace;
              box-sizing: border-box;
              padding: 30px;
            }

            .dining-hero {
              text-align: center;
              margin: 0 auto 20px auto;
            }

            .dining-hero h1 {
              margin: 0;
              color: #f57658;
              font-family: 'Space Mono', 'Courier New', monospace;
              font-size: clamp(42px, 5.3vw, 70px);
              font-weight: 700;
              line-height: 0.9;
              letter-spacing: 0.08em;
              text-transform: uppercase;
            }

            .dining-address {
              margin: 8px 0 10px 0;
              color: #3dcfd6;
              font-family: 'Space Mono', 'Courier New', monospace;
              font-size: clamp(14px, 1.2vw, 18px);
              font-weight: 700;
              line-height: 1;
              letter-spacing: 0.08em;
              text-transform: uppercase;
            }

            .void-text {
              width: 100%;
              margin: 14px auto 22px auto;
            }

            .void-text img {
              display: block;
              width: 100%;
              height: auto;
            }

            .schedule-panel {
              width: 100%;
              margin: 0 auto 22px auto;
              background: #3dcfd6;
              color: #000000;
              box-sizing: border-box;
            }

            .schedule-open {
              border-bottom: 2px solid #000000;
              padding: 11px 14px 13px 14px;
              text-align: center;
            }

            .schedule-open h3 {
              margin: 0;
              color: #000000;
              font-family: 'Space Mono', 'Courier New', monospace;
              font-size: clamp(15px, 1.4vw, 19px);
              font-weight: 700;
              line-height: 1.15;
              letter-spacing: 0.05em;
              text-transform: uppercase;
            }

            .schedule-inner {
              padding: 14px 28px 16px 28px;
              text-align: center;
            }

            .schedule-inner h4 {
              margin: 0 0 15px 0;
              color: #f57658;
              font-family: 'Space Mono', 'Courier New', monospace;
              font-size: clamp(14px, 1.25vw, 17px);
              font-weight: 700;
              line-height: 1;
              letter-spacing: 0.08em;
              text-transform: uppercase;
            }

            .schedule-container {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 24px;
              align-items: start;
            }

            .schedule-detail {
              margin: 0;
              color: #000000;
              font-family: 'Space Mono', 'Courier New', monospace;
              font-weight: 700;
              line-height: 1.05;
              text-align: center;
            }

            .schedule-detail span {
              display: block;
              min-height: 40px;
              font-size: clamp(14px, 1.25vw, 18px);
            }

            .schedule-detail small {
              display: block;
              margin-top: 7px;
              color: #000000;
              font-size: clamp(16px, 1.55vw, 22px);
              font-weight: 700;
              line-height: 1;
            }

            .dining-cta {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              min-height: 45px;
              margin: 0 auto 30px auto;
              padding: 8px 16px;
              border: 1px solid #3dcfd6;
              border-radius: 5px;
              color: #3dcfd6;
              background: transparent;
              font-family: 'Space Mono', 'Courier New', monospace;
              font-size: clamp(16px, 1.55vw, 24px);
              font-weight: 700;
              line-height: 1.1;
              letter-spacing: 0.08em;
              text-decoration: none;
              text-transform: uppercase;
              box-sizing: border-box;
              transition:
                background 0.25s ease,
                color 0.25s ease,
                transform 0.25s ease,
                box-shadow 0.25s ease;
            }

            .dining-cta:hover {
              color: #000000;
              background: #3dcfd6;
              transform: translateY(-2px);
              box-shadow: 0 0 28px rgba(61, 207, 214, 0.22);
            }

            .floorplan-section {
              width: 100%;
              margin: 0 auto 34px auto;
            }

            .floorplan-section img {
              display: block;
              width: 100%;
              height: auto;
            }

            .food-card {
              width: 100%;
              margin: 0 auto 28px auto;
              padding: 24px;
              border: 2px solid #3dcfd6;
              color: #f57658;
              box-sizing: border-box;
            }

            .food-card:last-child {
              margin-bottom: 0;
            }

            .food-card-logo {
              display: block;
              width: 100%;
              height: auto;
              margin: 0 auto 22px auto;
            }

            .food-card p {
              margin: 0 0 18px 0;
              color: #f57658;
              font-family: 'Space Mono', 'Courier New', monospace;
              font-size: clamp(14px, 1.2vw, 18px);
              font-weight: 700;
              line-height: 1.28;
              letter-spacing: 0.03em;
            }

            .food-card ul {
              list-style: none;
              margin: 0 0 22px 0;
              padding: 0;
            }

            .food-card li {
              position: relative;
              margin: 0 0 6px 0;
              padding-left: 22px;
              color: #3dcfd6;
              font-family: 'Space Mono', 'Courier New', monospace;
              font-size: clamp(14px, 1.2vw, 18px);
              font-weight: 700;
              line-height: 1.15;
              letter-spacing: 0.03em;
            }

            .food-card li::before {
              content: '○';
              position: absolute;
              left: 0;
              top: 0;
              color: #3dcfd6;
              font-size: 0.9em;
              line-height: 1.2;
            }

            .food-card-links {
              margin: 0 !important;
              color: #3dcfd6 !important;
            }

            .food-card-links a {
              display: inline-block;
              margin-right: 10px;
              color: #3dcfd6;
              font-family: 'Space Mono', 'Courier New', monospace;
              font-size: clamp(14px, 1.2vw, 18px);
              font-weight: 700;
              line-height: 1.25;
              letter-spacing: 0.03em;
              text-decoration: none;
              text-transform: uppercase;
              transition:
                color 0.25s ease,
                text-shadow 0.25s ease;
            }

            .food-card-links a:hover {
              color: #f57658;
              text-shadow: 0 0 18px rgba(245, 118, 88, 0.45);
            }

            @media (max-width: 1100px) {
              .dining-page-frame {
                width: 75%;
              }
            }

            @media (max-width: 768px) {
              .dining-page-main {
                padding-top: 82px;
                padding-bottom: 24px;
              }

              .dining-page-frame {
                width: 88%;
                padding: 20px;
              }

              .dining-hero h1 {
                font-size: clamp(36px, 9vw, 50px);
              }

              .dining-address {
                font-size: 13px;
              }

              .void-text {
                margin-top: 12px;
                margin-bottom: 18px;
              }

              .schedule-open {
                padding: 10px 8px;
              }

              .schedule-open h3 {
                font-size: 13px;
              }

              .schedule-inner {
                padding: 14px 12px 16px 12px;
              }

              .schedule-inner h4 {
                font-size: 13px;
                margin-bottom: 15px;
              }

              .schedule-container {
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
              }

              .schedule-detail span {
                min-height: 36px;
                font-size: 12px;
              }

              .schedule-detail small {
                font-size: 14px;
                margin-top: 7px;
              }

              .dining-cta {
                min-height: 42px;
                margin-bottom: 26px;
                font-size: 15px;
                letter-spacing: 0.06em;
              }

              .floorplan-section {
                margin-bottom: 28px;
              }

              .food-card {
                padding: 18px;
                margin-bottom: 22px;
                border-width: 1px;
              }

              .food-card-logo {
                margin-bottom: 18px;
              }

              .food-card p,
              .food-card li,
              .food-card-links a {
                font-size: 13px;
              }

              .food-card p {
                line-height: 1.3;
              }
            }

            @media (max-width: 520px) {
              .dining-page-frame {
                width: 94%;
                padding: 16px;
              }

              .schedule-container {
                gap: 8px;
              }

              .schedule-detail span {
                min-height: 34px;
                font-size: 11px;
              }

              .schedule-detail small {
                font-size: 13px;
              }

              .dining-cta {
                font-size: 13px;
                padding-left: 10px;
                padding-right: 10px;
              }

              .food-card {
                padding: 16px;
              }
            }
          `}
        </style>
      </Head>

      <SceneNav theme="dining" />

      <main className="dining-page-main">
        <div className="dining-page-frame">
          <section className="dining-hero">
            <h1>Dining At</h1>
            <h3 className="dining-address">17 Little Portland Street</h3>

            <div className="void-text">
              <img
                src="/images/step-into-void.png"
                alt="More than a meal. Step into the void"
              />
            </div>
          </section>

          <section className="schedule-panel" aria-label="Dining schedule">
            <div className="schedule-open">
              <h3>Open Thursdays to Saturdays</h3>
            </div>

            <div className="schedule-inner">
              <h4>Nightly Schedule</h4>

              <div className="schedule-container">
                <p className="schedule-detail">
                  <span>Chef&apos;s Studio</span>
                  <small>20:00</small>
                </p>

                <p className="schedule-detail">
                  <span>Dinner in The Tent</span>
                  <small>20:30</small>
                </p>

                <p className="schedule-detail">
                  <span>Club Opens</span>
                  <small>22:00</small>
                </p>
              </div>
            </div>
          </section>

          <a
            className="dining-cta"
            href="https://www.little-portland.com/food"
            target="_blank"
            rel="noreferrer"
          >
            &gt; Explore Our Futurist Dining Concept
          </a>

          <section className="floorplan-section">
            <img
              src="/images/floorplan_eat_popup.png"
              alt="Dining floorplan"
            />
          </section>

          <section className="food-card">
            <img
              className="food-card-logo"
              src="/images/the_tent_new_logo.png"
              alt="The Tent at the End of the Universe"
            />

            <p>
              In a floating tent, lost in space, futurist menus set the stage
              for a sensorial experience as dinner seamlessly transitions into
              our hypnotic after-dark mode - a cosmic journey.
            </p>

            <ul>
              <li>£65pp Set Dinner</li>
              <li>Futurist Menu</li>
              <li>8:30pm Start</li>
              <li>Club Access Included</li>
            </ul>

            <p className="food-card-links">
              <a
                href="https://www.sevenrooms.com/reservations/littleportland?default_date=2025-03-06&default_time=21:00&default_party_size=5"
                target="_blank"
                rel="noreferrer"
              >
                [Book]
              </a>

              <a
                href="https://www.little-portland.com/menu"
                target="_blank"
                rel="noreferrer"
              >
                [Menu]
              </a>

              <a
                href="https://www.little-portland.com/thetent"
                target="_blank"
                rel="noreferrer"
              >
                [Explore The Tent]
              </a>
            </p>
          </section>

          <section className="food-card">
            <img
              className="food-card-logo"
              src="/images/cs_logo_eat_pop_up.png"
              alt="Chef's Studio"
            />

            <p>
              Chef&apos;s Studio is an intimate and futuristic space beneath The
              Tent – the table of choice for those in the know.
            </p>

            <ul>
              <li>£65pp Set Dinner</li>
              <li>Futurist Menu</li>
              <li>6-12 PAX</li>
              <li>8pm Start</li>
            </ul>

            <p className="food-card-links">
              <a
                href="https://www.sevenrooms.com/reservations/littleportland?default_date=YYYY-MM-DD&default_time=21:00&default_party_size=5"
                target="_blank"
                rel="noreferrer"
              >
                [Book]
              </a>

              <a
                href="https://www.little-portland.com/menu"
                target="_blank"
                rel="noreferrer"
              >
                [Menu]
              </a>

              <a
                href="https://www.little-portland.com/chefstudio"
                target="_blank"
                rel="noreferrer"
              >
                [Explore Chef&apos;s Studio]
              </a>
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default DiningTest;
