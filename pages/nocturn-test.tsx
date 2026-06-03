import React, { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';

import SceneNav from '@components/SceneNav';
import PlaylistSection from '@components/PlaylistSection/PlaylistSection';

const TRACKS = [
  {
    id: 1,
    title: 'Nocturn – Resonance x Doyenne 27 Nov 2025',
    thumbnail: '/images/nocturn/playlist/playlist-thumb.png',
    audioSrc: '/audio/nocturn/resonance.mp3',
    duration: '29:02',
  },
  {
    id: 2,
    title: 'Nocturn 06 Sonics – Eros Downstairs (Stereo)',
    thumbnail: '/images/nocturn/playlist/playlist-thumb.png',
    audioSrc: '/audio/nocturn/eros-downstairs.mp3',
    duration: '10:17',
  },
  {
    id: 3,
    title: 'Nocturn 06 Sonics – Eros Upstairs (Stereo)',
    thumbnail: '/images/nocturn/playlist/playlist-thumb.png',
    audioSrc: '/audio/nocturn/eros-upstairs.mp3',
    duration: '13:56',
  },
];

const NocturnPage = () => {
  const [activeTab, setActiveTab] = useState('archive');

  return (
    <>
      <Head>
        <style>
          {`
            body {
              background-color: #0a186d !important;
              overflow-x: hidden !important;
              overflow-y: auto !important;
              -webkit-overflow-scrolling: touch !important;
            }

            .nocturn-page-main {
              width: 100%;
              padding-top: 18px;
            }

            .nocturn {
              width: 50%;
              margin: 0 auto 42px auto;
            }

            .nocturn img {
              display: block;
              width: 100%;
              height: auto;
            }

            .nocturn-wider-section {
              width: 80%;
              margin: 0 auto 30px auto;
              box-sizing: border-box;
            }

            .subscribe {
              width: 100%;
              margin: 0 auto;
            }

            .subscribe .bookings-iframe {
              width: 30% !important;
              height: 30% !important;
              display: block !important;
              place-items: center;
              margin: 0 auto;
              min-height: 30rem !important;
            }

            .row {
              display: flex;
              flex-wrap: wrap;
              padding: 0 4px;
              box-sizing: border-box;
            }

            .column {
              flex: 50%;
              max-width: 50%;
              padding: 0 4px;
              box-sizing: border-box;
            }

            .subscribe .column {
              flex: 100%;
              max-width: 100%;
              padding: 0 4px;
            }

            .subscribe h2 {
              font-family: Helvetica, Arial, sans-serif !important;
              color: #ffffff !important;
              font-size: 20px;
              margin-top: -20px;
              margin-bottom: 28px;
              text-align: center;
              line-height: 1.5;
            }

            .subscribe .klaviyo-form-RNQ78y {
              max-width: 640px;
              margin: 0 auto;
            }

            .column img {
              margin-top: 8px;
              vertical-align: middle;
              width: 100%;
            }

            .playlist {
              width: 80%;
              margin: 0 auto 100px auto;
              box-sizing: border-box;
            }

            .playlist .row {
              display: block;
              width: 100%;
              padding: 0 !important;
            }

            .playlist .column {
              display: block;
              width: 100%;
              max-width: 100%;
              flex: none;
              padding: 0;
            }

            .playlist .column img {
              margin-top: 0;
            }

            .playlist h2 {
              text-align: center;
            }

            .column a {
              cursor: pointer !important;
            }

            .top p,
            .bottom p {
              font-size: 18px;
            }

            .bottom p {
              margin-bottom: 15px;
            }

            .form-container {
              background-color: transparent !important;
            }

            .nocturn-text-wrapper {
              margin-top: 30px !important;
              padding: 0;
              text-align: center !important;
              margin-bottom: 50px;
            }

            .nocturn-wider-section .flyer {
              transition: all 0.5s;
            }

            .nocturn-wider-section .flyer:hover {
              filter: invert(75%);
            }

            .nocturn-text {
              font-family: Helvetica, Arial, sans-serif !important;
              font-weight: bold !important;
              text-decoration: none !important;
              color: #ffffff !important;
              padding-bottom: 30px;
              line-height: 1.1;
              transition: all 0.5s;
              text-align: left !important;
            }

            .nocturn-wider-section a {
              text-decoration: none;
              color: #ffffff;
            }

            .nocturn-wider-section a:hover .nocturn-text {
              color: #ff9292 !important;
            }

            .flyers {
              margin-bottom: 80px;
            }

            .nocturn-tabs-wrapper {
              width: 80%;
              margin: 0 auto 30px auto;
              box-sizing: border-box;
            }

            .nocturn-tabs {
              display: flex;
              justify-content: space-between;
              align-items: stretch;
              margin: 0;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }

            .nocturn-tab {
              appearance: none;
              background: transparent;
              border: none;
              color: rgba(255, 255, 255, 0.72);
              font-family: Helvetica, Arial, sans-serif;
              font-size: 22px;
              font-weight: bold;
              cursor: pointer;
              padding: 0 12px 16px 12px;
              margin: 0;
              position: relative;
              transition: color 0.3s ease, transform 0.25s ease, opacity 0.25s ease;
              width: 50%;
              text-align: center;
            }

            .nocturn-tab:hover {
              color: #ffffff;
              transform: translateY(-1px);
            }

            .nocturn-tab.active {
              color: #ffffff;
              animation: tabFadeIn 0.35s ease;
            }

            .nocturn-tab.active::after {
              content: "";
              position: absolute;
              left: 0;
              bottom: -1px;
              width: 100%;
              height: 2px;
              background: #ff9292;
              animation: tabUnderline 0.3s ease;
            }

            .tab-panel {
              width: 100%;
              animation: tabContentFade 0.35s ease;
              overflow: hidden;
            }

            .contact-block {
              width: 100%;
              max-width: 640px;
              margin: 18px auto 70px auto !important;
              text-align: center !important;
            }

            .contact-button {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              min-height: 64px;
              padding: 0 34px;
              border: 2px solid #ffffff;
              border-radius: 4px;
              background: #ffffff;
              color: #0a186d !important;
              font-family: Helvetica, Arial, sans-serif;
              font-weight: 800;
              font-size: 15px;
              letter-spacing: 0.08em;
              text-decoration: none;
              box-sizing: border-box;
              transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;
            }

            .contact-button:hover {
              transform: translateY(-2px);
              background: transparent;
              color: #ffffff !important;
            }

            @keyframes tabUnderline {
              from {
                transform: scaleX(0.4);
                opacity: 0.4;
              }

              to {
                transform: scaleX(1);
                opacity: 1;
              }
            }

            @keyframes tabContentFade {
              from {
                opacity: 0;
                transform: translateY(8px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes tabFadeIn {
              from {
                opacity: 0.7;
              }

              to {
                opacity: 1;
              }
            }

            @media (max-width: 768px) {
              .nocturn-page-main {
                padding-top: 8px;
              }

              .afterhours {
                margin-bottom: 25px;
              }

              .nocturn {
                width: 90%;
                margin: 0 auto 24px auto;
              }

              .nocturn-wider-section .flyer:hover {
                filter: none !important;
              }

              .subscribe {
                width: 100% !important;
              }

              .subscribe h2 {
                margin-top: 20px !important;
                margin-bottom: 22px !important;
                font-size: 16px;
                padding: 0 18px;
              }

              .subscribe .column {
                max-height: -webkit-fill-available;
              }

              .subscribe .bookings-iframe {
                width: 100% !important;
                max-height: -webkit-fill-available;
              }

              .subscribe .bookings-iframe iframe {
                height: 550px;
                margin-top: 0;
              }

              .nocturn-text-wrapper {
                padding: 0;
                margin-bottom: 0 !important;
              }

              .bottom .nocturn-text {
                padding-left: 20px;
              }

              .nocturn-wider-section {
                width: 90%;
              }

              .nocturn-wider-section p {
                font-size: 15px;
              }

              .bottom {
                margin-top: 30px !important;
                margin-bottom: -30px !important;
                text-align: center;
              }

              .bottom p {
                font-size: 15px;
              }

              .row {
                padding: 0 !important;
                text-align: center !important;
              }

              .playlist {
                width: 90%;
                margin-top: -10px;
                margin-bottom: 65px;
              }

              .playlist h3 {
                text-align: left;
              }

              .column {
                flex: 50%;
                max-width: 50%;
              }

              .nocturn-tabs-wrapper {
                width: 90%;
                margin: 0 auto 20px auto;
              }

              .nocturn-tabs {
                margin: 0;
              }

              .nocturn-tab {
                font-size: 18px;
                padding: 0 8px 14px 8px;
              }

              .contact-block {
                width: 90%;
                margin-top: 14px !important;
              }

              .contact-button {
                min-height: 56px;
                font-size: 14px;
              }
            }
          `}
        </style>

        <title>Nocturn — Archive</title>
      </Head>

      <SceneNav theme="nocturn" />

      <main className="nocturn-page-main">
        <div className="nocturn">
          <img
            src="/images/nocturn-main-web-page-header.png"
            alt="Nocturn"
            width="100%"
          />
        </div>

        <div className="nocturn-tabs-wrapper">
          <div className="nocturn-tabs">
            <button
              type="button"
              className={`nocturn-tab ${
                activeTab === 'archive' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('archive')}
            >
              Main Archive
            </button>

            <button
              type="button"
              className={`nocturn-tab ${
                activeTab === 'playlist' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('playlist')}
            >
              Sonic Archive
            </button>
          </div>
        </div>

        {activeTab === 'archive' && (
          <div className="tab-panel">
            <div className="nocturn-wider-section flyers">
              <div className="row">
                <div className="column">
                  <a
                    href="https://www.little-portland.com/nocturn-06"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="flyer"
                      src="/images/nocturn/17LPS_Nocturn_06.png"
                      alt="Nocturn 06"
                    />
                  </a>
                </div>

                <div className="column">
                  <a
                    href="https://sevn.ly/xn6MyA5b"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="flyer"
                      src="/images/nocturn/17LPS_Nocturn_resonance_new.png"
                      alt="Nocturn Resonance"
                    />
                  </a>
                </div>
              </div>

              <div className="row">
                <div className="column afterhours">
                  <img
                    className="flyer"
                    src="/images/nocturn/Nocturn_afterhours_new_poster.gif"
                    alt="Nocturn Afterhours"
                  />
                </div>

                <div className="column">
                  <a
                    href="https://www.little-portland.com/nocturn-05"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="flyer"
                      src="/images/nocturn/nocturn-05/17LPS_Nocturn_5_Richie_Culver.gif"
                      alt="Nocturn 05"
                    />
                  </a>
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <a
                    href="https://www.little-portland.com/nocturn-04"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="flyer"
                      src="/images/nocturn/17LPS_Flyer_Nocturn_04.jpg"
                      alt="Nocturn 04"
                    />
                  </a>
                </div>

                <div className="column">
                  <a
                    href="https://www.little-portland.com/nocturn-03"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="flyer"
                      src="/images/nocturn/17LPS_Flyer_Nocturn03.gif"
                      alt="Nocturn 03"
                    />
                  </a>
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <a
                    href="https://www.little-portland.com/nocturn-02"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="flyer"
                      src="/images/nocturn/17LPS_Flyer_Nocturn_2.jpg"
                      alt="Nocturn 02"
                    />
                  </a>
                </div>

                <div className="column">
                  <a
                    href="https://www.little-portland.com/nocturn-01"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="flyer"
                      src="/images/nocturn/17LPS_Flyer_Nocturn_1.jpg"
                      alt="Nocturn 01"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'playlist' && (
          <div className="tab-panel">
            <div className="nocturn-wider-section playlist">
              <div className="row">
                <div className="column">
                  <PlaylistSection tracks={TRACKS} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="nocturn-wider-section subscribe">
          <div className="row">
            <div className="column">
              <h2>Sign up to receive updates for forthcoming projects and events</h2>

              <div className="klaviyo-form-RNQ78y"></div>

              <Script id="klaviyo-embed" strategy="afterInteractive">
                {`
                  window._klOnsite = window._klOnsite || [];
                  window._klOnsite.push(['embedForm', 'RNQ78y']);
                `}
              </Script>

              <div className="nocturn-text-wrapper bottom contact-block">
                <a
                  className="contact-button"
                  href="mailto:bianca@little-portland.com"
                >
                  CONTACT
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NocturnPage;
