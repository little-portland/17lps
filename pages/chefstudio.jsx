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
            {`html{overflow-x: hidden !important;}`}
            {`body{background-color: #000000!important;overflow: auto!important;overflow-x: initial!important;}`}
            {`.override-logo{margin-top: 30px;}`}
            {`.override .explore-zen{margin-top: 30px!important;list-style: none;padding: 0;margin: 0;width:100%;}`}
            {`.explore-zen li {width: 100%;background-image: url('/images/override/explore_zen_line_bg.png');background-repeat: no-repeat;background-position: center;padding: 20px; display: flex;justify-content: flex-end;align-items: center;}`}
            {`.explore-zen li a {margin-right: 50px;display: inline-block;width: 300px;height: 65px;background-image: url('/images/override/explore_zen_bg.png'); padding: 15px;}`}
            {`.override-buttons-wrapper {
                font-family: Helvetica !important;
                font-weight: bold !important;
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                justify-content: center;
                align-items: center;
                width: 100%;
                margin: 50px 0 60px 0;
            }
            .override-buttons-wrapper .row {
                display: flex;
                gap: 10px;
                width: 100%;
            }
            .full-width {
              width: 100%;
            }
            
            .override-button {
                color: #ff0200!important;
                border: 3px solid #ff0200!important;
            }
    
            .override-button:hover {
                color: #000000!important;
                background-color: #ff0200!important;
                border: 3px solid #ff0200!important;
            }

             .image-column img {
                border: 2px solid #ff0200;
            }
            
            .override-buttons-wrapper .column {
                flex: 1;
            }`}
          
            {`.nocturn h1{margin-top: 30px;}`}
            {`.nocturn{width: 50%;margin: 0 auto;}`}
            {`.nocturn-wider-section{width: 80%;margin: 0 auto;}`}
            {`.column{width: 50%}`}
            {`.column img{ margin-top: 8px;vertical-align: middle;width: 100%;}`}
            {`.column a{ cursor:pointer!important;}`}
            {`.top{ font-size: 35px;}`}
            {`.bottom{ font-size: 25px;}`}
            {'.image-row{ display: flex;flex-wrap: wrap;padding: 0 4px;}'}
            {'.image-column{flex: 50%;max-width: 50%;padding: 0 4px;}'}
            {'.image-column img{ margin-top: 8px;vertical-align: middle;width: 100%;}'}
            {`audio{ margin-top: 8px!important;width:100%!important;}`}
            {`.nocturn-text-wrapper{ margin-top: 30px!important;padding: 0 30px;}`}
            {`.nocturn-text-wrapper small{ margin-left: 10px;font-size: 20px;}`}
            {`.nocturn-text-wrapper img{ max-width: 100%;margin-bottom: 40px!important;display: block;margin-left: auto;margin-right: auto;}`}
            {`.nocturn-text{ font-family: Helvetica!important;font-weight: bold!important;text-decoration: none!important;color: #ffffff!important;padding-bottom: 30px;line-height: 1.1;}`}
            {`.nocturn-text{ padding-bottom: 20px;}`}
            {`.nocturn-text-two{ padding-top: 20px;}`}
            {`.question{ color: #000000!important;font-style:italic;}`}
            {`.italic{ font-style:italic!important;}`}
            {`.loading{ font-size: 50px;text-align: center;}`}
            {`.flyer{ max-width: 100%!important;}`}
            {`.preloader{ margin:30px 0 10px 0!important;}`}
            {`.spacing{ margin-top:30px!important;}`}
            {`.live{ border-top: 5px solid #000;padding-top: 20px;border-bottom: 5px solid #000;margin-bottom: 40px;text-align: center;}`}
            {`@media (max-width: 768px) { .override-buttons-wrapper {flex-direction: column;gap: 15px;}.override-buttons-wrapper .row {flex-direction: column;gap: 15px;}.nocturn{margin-top:30px;width: 90%;}.spacing{ margin-top:15px!important;}.preloader{ margin:15px 0 -15px 0!important;}.nocturn-text-two{ padding-top: 10px;}.nocturn-wider-section{width: 90%;}.nocturn-text-wrapper{padding: 0 15px;}.top p{ font-size: 20px;}.bottom p{ font-size: 15px;}.nocturn-text-wrapper small{ font-size: 12px!important;margin-left: 5px!important;}
              .explore-zen li a {
                margin-right: 30px;
                width: 150px;
                height: 32px;
                background-size: 150px 32px;
                background-repeat: no-repeat;
            }
            .explore-zen li {
              background-size: 400px 20px;
          }
          .column {
            width: 100%!important;
          }

        .override-buttons-wrapper {
            margin: 25px 0;
        }

        .override-button {
            font-size: 15px!important;
        }

        .image-column {
            flex: 100%;
            max-width: 100%;
        }

            }`}
        </style>

        <title>17 Little Portland Street - Chef's Studio</title>
      </Head>
      
         <div className="nocturn override">
           <img className="override-logo" src="/images/chefstudio/chefs-studio-page-top.png" alt="Override" width="100%" />
         </div>

         <div className="nocturn-wider-section override-logo">
           <div className="image-row">
              <div className="image-column">
                <img src="/images/chefstudio/chefstudio07.jpg" />
                <img src="/images/chefstudio/chefstudio08.jpg" />
                <img src="/images/chefstudio/chefstudio12.jpg" />
                <img src="/images/chefstudio/chefstudio14.jpg" />

              </div>
             <div className="image-column">
                <img src="/images/chefstudio/chefstudio10.jpg" />
                <img src="/images/chefstudio/chefstudio11.jpg" />
                <img src="/images/chefstudio/chefstudio09.jpg" />
                <img src="/images/chefstudio/chefstudio13.jpg" />
              </div>
           </div>
          </div>
      
         <div className="nocturn override">
                           
         <div className="override-buttons-wrapper">
           <a href="mailto:eat@little-portland.com" class="override-button">BOOK CHEF'S STUDIO</a>
           <a target="_blank" href="https://www.little-portland.com/override-menu" class="override-button">MENU</a>
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
