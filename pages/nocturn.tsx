import React from "react";
import Head from "next/head";
import Image from "next/image";

//Components
import CenterContainer from "@components/UX/CenterContainer/CenterContainer";

//hooks
import useFetchContent from "@utils/useFetchContent";

const Menu = ({ menuImage }) => {
  
  return (
    <>
      <Head>
        <style>
            {'body{background-color: #1c043d!important;overflow:hidden!important;-webkit-overflow-scrolling:touch!important;}'}
            {'.nocturn{width: 50%;margin: 0 auto 50px auto;}'}
            {'.row{ display: flex;flex-wrap: wrap;padding: 0 4px;}'}
            {'.column{flex: 50%;max-width: 50%;padding: 0 4px;}'}
            {'.column img{ margin-top: 8px;vertical-align: middle;width: 100%;}'}
            {'.column a{ cursor:pointer!important;}'}
            {'.top{ font-size: 18px;}'}
            {'.bottom{ font-size: 25px;}'}
            {'audio{ margin-top: 8px!important;width:100%!important;}'}
            {'.nocturn-text-wrapper{ margin-top: 30px!important;padding: 0;}'}
            {'.nocturn-text-wrapper img{ max-width: 25%;margin-bottom: 30px!important;transition: all 0.5s;}'}
            {'.nocturn-text-wrapper a:hover img{filter: blur(3px);padding: 5px;background: #bfff10;}'}
            {'.nocturn-text{ font-family: Helvetica!important;font-weight: bold!important;text-decoration: none!important;color: #dddac3!important;padding-bottom: 30px;line-height: 1.1;}'}
            {'.nocturn-text{ padding-bottom: 20px;}'}
            {'@media (max-width: 768px) { .nocturn{width: 90%;}.nocturn-text-wrapper{padding: 0 15px;}.top{ font-size: 20px;}.bottom{ font-size: 15px;}.row{padding: 0!important;}.column{ flex: 50%;max-width: 50%;}}'}
        </style>
        <title>Nocturn</title>
      </Head>
         <div className="nocturn">
           <img src="/images/nocturn-main-web-page-header.png" alt="Nocturn" width="100%" />
           <div className="row">
              <div className="column">
                <a href="https://www.little-portland.com/nocturn-01" target="_blank">
                  <img src="/images/nocturn/17LPS_Flyer_Nocturn_1.jpg" />
                </a>
                <div className="nocturn-text-wrapper top"> 
                  <p className="nocturn-text">Learn more &#8594;</p>
                </div>
              </div>
              <div className="column">
                <a href="https://www.little-portland.com/nocturn-02" target="_blank">
                  <img src="/images/nocturn/17LPS_Flyer_Nocturn_2.jpg" />
                </a>
                <div className="nocturn-text-wrapper top"> 
                  <p className="nocturn-text">Learn more &#8594;</p>
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
