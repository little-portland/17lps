import React from "react";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";

//Components
import CenterContainer from "@components/UX/CenterContainer/CenterContainer";
import { IFrameContainerStyle } from "@components/UX/CenterContainer/styles";

//hooks
import useDeviceDetect from "@utils/useDeviceDetect";
import useFetchContent from "@utils/useFetchContent";

const Menu = ({ menuImage }) => {

   //Check Device
  const { isMobile } = useDeviceDetect();

  const style = {
    width: isMobile ? "100%" : "100%", 
    height: isMobile ? "70%" : "70%",
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
            {'body{background-color: #1c043d!important;overflow:hidden!important;-webkit-overflow-scrolling:touch!important;}'}
            {'.nocturn{width: 50%;margin: 0 auto 30px auto;}'}
            {'.nocturn-wider-section{width: 80%;margin: 0 auto;margin-bottom: 30px;}'}
            {'.subscribe{width: 100%;margin: 0 auto;}'}
            {'.subscribe .bookings-iframe{width: 30%!important;height: 30% !important;display: block!important;place-items: center;margin: 0 auto;min-height: 30rem!important;}'}
            {'.row{ display: flex;flex-wrap: wrap;padding: 0 4px;}'}
            {'.column{flex: 33%;max-width: 33%;padding: 0 4px;}'}
            {'.subscribe .column{flex: 100%;max-width: 100%;padding: 0 4px;}'}
            {'.subscribe h2{font-family: Helvetica!important;color: #dddac3!important;font-size: 20px;margin-top: -20px;margin-bottom: -30px;text-align: center;line-height: 1.5;}'}
            {'.column img{ margin-top: 8px;vertical-align: middle;width: 100%;}'}
            {'.column a{ cursor:pointer!important;}'}
            {'.top{ font-size: 18px;}'}
            {'.bottom{ font-size: 18px;}'}
            {'.bottom p{ margin-bottom: 15px;}'}
            {'.form-container{ background-color:transparent!important;}'}
            {'.nocturn-text-wrapper{ margin-top: 30px!important;padding: 0;text-align: center;margin-bottom: 50px;}'}
            {'.bottom{ margin-top: -20px!important;}'}
            {'.nocturn-wider-section .flyer{transition: all 0.5s;}'}
            {'.nocturn-wider-section .flyer:hover{filter: invert(75%);}'}
            {'.nocturn-text{ font-family: Helvetica!important;font-weight: bold!important;text-decoration: none!important;color: #dddac3!important;padding-bottom: 30px;line-height: 1.1;}'}
            {'.nocturn-text{ padding-bottom: 20px;transition: all 0.5s;}'}
            {'.nocturn-text{ text-align: left!important;}'}
            {'.nocturn-wider-section a{text-decoration: none;}'}
            {'.nocturn-wider-section a:hover .nocturn-text{color: #ff00ff!important;}'}
            {'@media (max-width: 768px) { .nocturn{width: 90%;margin: 0 auto 15px auto;}.subscribe .bookings-iframe{width: 100%!important;height: 100% !important;}.subscribe h2{text-align:left;}.nocturn-text-wrapper{padding: 0 15px;text-align: center!important;margin-bottom: 20px;}.nocturn-wider-section{width: 90%;}.nocturn-wider-section p{ font-size: 20px;}.bottom{ margin-top: 10px!important;text-align: center!important;}.bottom p{ font-size: 15px;}.row{padding: 0!important;}.column{ flex: 50%;max-width: 50%;}}'}
        </style>
        <title>Nocturn</title>
      </Head>
         <div className="nocturn">
           <img src="/images/nocturn-main-web-page-header.png" alt="Nocturn" width="100%" />
         </div>
           <div className="nocturn-wider-section">
           <div className="row">
              <div className="column">
                <a href="https://www.little-portland.com/nocturn-01" target="_blank">
                  <img className="flyer" src="/images/nocturn/17LPS_Flyer_Nocturn_1.jpg" />
                  <div className="nocturn-text-wrapper"> 
                    <p className="nocturn-text page-link">Learn more &#8594;</p>
                  </div>
                </a>
              </div>
              <div className="column">
                <a href="https://www.little-portland.com/nocturn-02" target="_blank">
                  <img className="flyer" src="/images/nocturn/17LPS_Flyer_Nocturn_2.jpg" />
                  <div className="nocturn-text-wrapper"> 
                    <p className="nocturn-text page-link">Learn more &#8594;</p>
                  </div>
                </a>
              </div>
              <div className="column">
                <a href="https://www.little-portland.com/nocturn-03" target="_blank">
                  <img className="flyer" src="/images/nocturn/17LPS_Flyer_Nocturn03.gif" />
                  <div className="nocturn-text-wrapper"> 
                    <p className="nocturn-text page-link">Learn more &#8594;</p>
                  </div>
                </a>
              </div>
           </div>
         </div> 

          <div className="nocturn-wider-section subscribe">
           <div className="row">
              <div className="column">
                 <h2>Sign up to receive updates for forthcoming projects and events</h2>
                 <IFrameContainerStyle className="bookings-iframe"
                      dangerouslySetInnerHTML={{
                        __html:
                          '<iframe src="https://forms.airship.co.uk/forms/1364/nocturn" scrolling="no" style="border:0px none;" width="100%" height="100%"> </iframe>',
                      }}
                      style={style}
                    />
                <div className="nocturn-text-wrapper bottom"> 
                   <p><a className="nocturn-text" href="mailto:bianca@little-portland.com" target="_blank">bianca@little-portland.com</a></p>
                   <p><a className="nocturn-text" href="https://bianca-chu.com/" target="_blank">www.bianca-chu.com</a></p>
                </div>
              </div>
           </div>
          </div>
        <Script src="https://forms.airship.co.uk/assets/js/embed.js"></Script>
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
    }, // will be passed to the page component as props
    revalidate: 30, // In seconds
  };
}
