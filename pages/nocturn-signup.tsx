import React from "react";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { useEffect } from "react";

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
            {'body{background-color:#0a186d!important;overflow:hidden!important;-webkit-overflow-scrolling:touch!important;}'}
            {'.nocturn{width: 50%;margin: 0 auto 30px auto;}'}
            {'.nocturn-wider-section{width: 80%;margin: 0 auto;margin-bottom:30px;}'}
            {'.subscribe{width: 100%;margin: 0;min-height: 100vh;display: flex;align-items: center;justify-content: center;}'}
            {'.subscribe .bookings-iframe{width: 30%!important;height: 30% !important;display: block!important;place-items: center;margin: 0 auto;min-height: 30rem!important;}'}
            {'.row{ display: flex;flex-wrap: wrap;padding: 0 4px;}'}
            {'.column{flex: 50%;max-width: 50%;padding: 0 4px;}'}
            {'.subscribe .column{flex: 100%;max-width: 100%;padding: 0 4px;}'}
            {'.subscribe h2{font-family: Helvetica!important;color: #ffffff!important;font-size: 20px;margin-bottom: 10px;text-align: center;line-height: 1.5;}'}
            {'.column img{ margin-top: 8px;vertical-align: middle;width: 100%;}'}
            {'.column a{ cursor:pointer!important;}'}
            {'.top p{ font-size: 18px;}'}
            {'.bottom p{ font-size: 18px;}'}
            {'.bottom p{ margin-bottom: 15px;}'}
            {'.form-container{ background-color:transparent!important;}'}
            {'.nocturn-text-wrapper{ margin-top: 30px!important;padding:0;text-align: center!important;margin-bottom: 50px;}'}
            {'.nocturn-wider-section .flyer{transition: all 0.5s;}'}
            {'.nocturn-wider-section .flyer:hover{filter: invert(75%);}'}
            {'.nocturn-text{ font-family: Helvetica!important;font-weight: bold!important;text-decoration: none!important;color: #ffffff!important;padding-bottom: 30px;line-height: 1.1;}'}
            {'.nocturn-text{ padding-bottom: 20px;transition: all 0.5s;}'}
            {'.nocturn-text{ text-align: left!important;}'}
            {'.nocturn-wider-section a{text-decoration: none;#ffffff}'} 
            {'.nocturn-wider-section a:hover .nocturn-text{color: #ff9292!important;}'}
            {'@media (max-width: 768px) { .afterhours{margin-bottom: 25px;} .nocturn{width: 90%;margin:0 auto 15px auto;}.nocturn-wider-section .flyer:hover{filter: none!important;}.subscribe{width: 100%!important;}.subscribe h2{margin-top: 20px!important;margin-bottom: 10px!important;}.subscribe .column{max-height: -webkit-fill-available;}.subscribe .bookings-iframe{width: 100%!important;max-height: -webkit-fill-available;}.subscribe .bookings-iframe iframe{height:550px;margin-top:0;}.nocturn-text-wrapper{padding: 0;margin-bottom: 0px!important;}.bottom .nocturn-text{padding-left: 20px;}.nocturn-wider-section{width: 90%;}.nocturn-wider-section p{ font-size: 15px;}.bottom{ margin-top: 30px!important;margin-bottom: -30px!important;text-align:center;}.bottom p{ font-size: 15px;}.row{padding: 0!important;text-align: center!important;}.column{ flex: 50%;max-width: 50%;}}'}
         </style>
         
        <title>Nocturn Signup</title>
      </Head>
         <div className="nocturn">
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
    }, // will be passed to the page component as props
    revalidate: 30, // In seconds
  };
}
