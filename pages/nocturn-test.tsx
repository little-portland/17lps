import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { useEffect } from "react";

//Components
import CenterContainer from "@components/UX/CenterContainer/CenterContainer";
import { IFrameContainerStyle } from "@components/UX/CenterContainer/styles";
import PlaylistSection from "@components/PlaylistSection/PlaylistSection";

//hooks
import useDeviceDetect from "@utils/useDeviceDetect"; 
import useFetchContent from "@utils/useFetchContent";

const Menu = ({ menuImage }) => {
  // Check Device
  const { isMobile } = useDeviceDetect();

  const [activeTab, setActiveTab] = useState("flyers");

  const style = {
    width: isMobile ? "100%" : "100%",  
    display: "grid",
    placeItems: "center",
    "@media (minWidth: 500px)": {
      display: "none", 
    },
  };
  
  return (
    <>
      <Head>
        <style>
          {`
            body{background-color:#0a186d!important;overflow:hidden!important;-webkit-overflow-scrolling:touch!important;}
            .nocturn{width: 50%;margin: 0 auto 30px auto;}
            .nocturn-wider-section{width: 80%;margin: 0 auto;margin-bottom:30px;}
            .subscribe{width: 100%;margin: 0 auto;}
            .subscribe .bookings-iframe{width: 30%!important;height: 30% !important;display: block!important;place-items: center;margin: 0 auto;min-height: 30rem!important;}
            .row{ display: flex;flex-wrap: wrap;padding: 0 4px;}
            .column{flex: 50%;max-width: 50%;padding: 0 4px;}
            .subscribe .column{flex: 100%;max-width: 100%;padding: 0 4px;}
            .subscribe h2{font-family: Helvetica!important;color: #ffffff!important;font-size: 20px;margin-top: -20px;margin-bottom: 10px;text-align: center;line-height: 1.5;}
            .column img{ margin-top: 8px;vertical-align: middle;width: 100%;}
            .playlist { width: 80%;margin: 0 auto;margin-top: -50px;margin-bottom: 100px;}
            .playlist .column { flex: 100%;max-width: 100%;}
            .playlist .column img{ margin-top: 0px;}
            .playlist h2 { text-align: center;}
            .column a{ cursor:pointer!important;}
            .top p{ font-size: 18px;}
            .bottom p{ font-size: 18px;}
            .bottom p{ margin-bottom: 15px;}
            .form-container{ background-color:transparent!important;}
            .nocturn-text-wrapper{ margin-top: 30px!important;padding:0;text-align: center!important;margin-bottom: 50px;}
            .nocturn-wider-section .flyer{transition: all 0.5s;}
            .nocturn-wider-section .flyer:hover{filter: invert(75%);}
            .nocturn-text{ font-family: Helvetica!important;font-weight: bold!important;text-decoration: none!important;color: #ffffff!important;padding-bottom: 30px;line-height: 1.1;}
            .nocturn-text{ padding-bottom: 20px;transition: all 0.5s;}
            .nocturn-text{ text-align: left!important;}
            .nocturn-wider-section a{text-decoration: none;#ffffff}
            .nocturn-wider-section a:hover .nocturn-text{color: #ff9292!important;}

            /* Tabs */
            .nocturn-tabs-wrapper{
              width: 80%;
              margin: 0 auto 30px auto;
            }
            .nocturn-tabs{
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 32px;
              border-bottom: 1px solid rgba(255,255,255,0.2);
            }
            .nocturn-tab{
              appearance: none;
              background: transparent;
              border: none;
              color: rgba(255,255,255,0.7);
              font-family: Helvetica, Arial, sans-serif;
              font-size: 18px;
              font-weight: bold;
              cursor: pointer;
              padding: 0 0 14px 0;
              margin: 0;
              position: relative;
              transition: color 0.3s ease;
            }
            .nocturn-tab:hover{
              color: #ffffff;
            }
            .nocturn-tab.active{
              color: #ffffff;
            }
            .nocturn-tab.active::after{
              content: "";
              position: absolute;
              left: 0;
              bottom: -1px;
              width: 100%;
              height: 2px;
              background: #ff9292;
            }

            .tab-panel{
              width: 100%;
            }

            @media (max-width: 768px) {
              .afterhours{margin-bottom: 25px;}
              .nocturn{width: 90%;margin:0 auto 15px auto;}
              .nocturn-wider-section .flyer:hover{filter: none!important;}
              .subscribe{width: 100%!important;}
              .subscribe h2{margin-top: 20px!important;margin-bottom: 10px!important;}
              .subscribe .column{max-height: -webkit-fill-available;}
              .subscribe .bookings-iframe{width: 100%!important;max-height: -webkit-fill-available;}
              .subscribe .bookings-iframe iframe{height:550px;margin-top:0;}
              .nocturn-text-wrapper{padding: 0;margin-bottom: 0px!important;}
              .bottom .nocturn-text{padding-left: 20px;}
              .nocturn-wider-section{width: 90%;}
              .nocturn-wider-section p{ font-size: 15px;}
              .bottom{ margin-top: 30px!important;margin-bottom: -30px!important;text-align:center;}
              .bottom p{ font-size: 15px;}
              .row{padding: 0!important;text-align: center!important;}
              .playlist { margin-top: -10px;margin-bottom: 65px;}
              .playlist h3 { text-align: left;}
              .column{ flex: 50%;max-width: 50%;}

              .nocturn-tabs-wrapper{
                width: 90%;
                margin: 0 auto 20px auto;
              }
              .nocturn-tabs{
                gap: 20px;
              }
              .nocturn-tab{
                font-size: 16px;
                padding-bottom: 12px;
              }
            }
          `}
        </style>
         
        <title>Nocturn</title>
      </Head>

      <div className="nocturn">
        <img src="/images/nocturn-main-web-page-header.png" alt="Nocturn" width="100%" />
      </div>

      {/* Tabs */}
      <div className="nocturn-tabs-wrapper">
        <div className="nocturn-tabs">
          <button
            type="button"
            className={`nocturn-tab ${activeTab === "flyers" ? "active" : ""}`}
            onClick={() => setActiveTab("flyers")}
          >
            Flyers
          </button>

          <button
            type="button"
            className={`nocturn-tab ${activeTab === "playlist" ? "active" : ""}`}
            onClick={() => setActiveTab("playlist")}
          >
            Playlist
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "flyers" && (
        <div className="tab-panel">
          <div className="nocturn-wider-section flyers">
            <div className="row">
              <div className="column">
                <a href="https://www.little-portland.com/nocturn-06" target="_blank" rel="noreferrer">
                  <img className="flyer" src="/images/nocturn/17LPS_Nocturn_06.png" />
                </a>
              </div>
              <div className="column">
                <a href="https://sevn.ly/xn6MyA5b" target="_blank" rel="noreferrer">
                  <img className="flyer" src="/images/nocturn/17LPS_Nocturn_resonance_new.png" />
                </a>
              </div>
            </div>

            <div className="row">
              <div className="column afterhours">
                <img className="flyer" src="/images/nocturn/Nocturn_afterhours_new_poster.gif" />
              </div>
              <div className="column">
                <a href="https://www.little-portland.com/nocturn-05" target="_blank" rel="noreferrer">
                  <img className="flyer" src="/images/nocturn/nocturn-05/17LPS_Nocturn_5_Richie_Culver.gif" />
                </a>
              </div>
            </div>

            <div className="row">
              <div className="column">
                <a href="https://www.little-portland.com/nocturn-04" target="_blank" rel="noreferrer">
                  <img className="flyer" src="/images/nocturn/17LPS_Flyer_Nocturn_04.jpg" />
                </a>
              </div>
              <div className="column">
                <a href="https://www.little-portland.com/nocturn-03" target="_blank" rel="noreferrer">
                  <img className="flyer" src="/images/nocturn/17LPS_Flyer_Nocturn03.gif" />
                </a>
              </div>
            </div>

            <div className="row">
              <div className="column">
                <a href="https://www.little-portland.com/nocturn-02" target="_blank" rel="noreferrer">
                  <img className="flyer" src="/images/nocturn/17LPS_Flyer_Nocturn_2.jpg" />
                </a>
              </div>
              <div className="column">
                <a href="https://www.little-portland.com/nocturn-01" target="_blank" rel="noreferrer">
                  <img className="flyer" src="/images/nocturn/17LPS_Flyer_Nocturn_1.jpg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "playlist" && (
        <div className="tab-panel">
          <div className="nocturn-wider-section playlist">
            <div className="row">
              <div className="column">
                <PlaylistSection
                  title="Sonic Archive"
                  tracks={[
                    {
                      id: 1,
                      title: "Nocturn – Resonance x Doyenne 27 Nov 2025",
                      thumbnail: "/images/nocturn/playlist/playlist-thumb.png",
                      audioSrc: "/audio/nocturn/resonance.mp3",
                      duration: "29:02",
                      downloadHref: "#",
                    },
                    {
                      id: 2,
                      title: "Nocturn 06 Sonics –  Eros Downstairs (Stereo)",
                      thumbnail: "/images/nocturn/playlist/playlist-thumb.png",
                      audioSrc: "/audio/nocturn/eros-downstairs.mp3",
                      duration: "10:17",
                      downloadHref: "#",
                    },
                    {
                      id: 3,
                      title: "Nocturn 06 Sonics –  Eros Upstairs (Stereo)",
                      thumbnail: "/images/nocturn/playlist/playlist-thumb.png",
                      audioSrc: "/audio/nocturn/eros-upstairs.mp3",
                      duration: "13:56",
                      downloadHref: "#",
                    },
                  ]}
                />
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

            <div className="nocturn-text-wrapper bottom"> 
              <p><a className="nocturn-text" href="mailto:bianca@little-portland.com">bianca@little-portland.com</a></p>
              <p><a className="nocturn-text" href="https://bianca-chu.com/" target="_blank" rel="noreferrer">www.bianca-chu.com</a></p>
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
      menuCollection{
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
