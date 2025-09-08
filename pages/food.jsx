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
            {`body{background-color: #d8e1e9!important;overflow: auto!important;overflow-x: initial!important;}`} 
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
                margin: 50px 0;
                padding: 0 10px;
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
                border: 5px solid #d9e2ea;
                outline: 2px solid #221f20;
                outline-offset: 0;
                display: inline-block;
            }

            .footer {
                  margin-top: 10px!important;
            }
            
            .override-buttons-wrapper .column {
                flex: 1;
            }`}
          
            {`.nocturn h1{margin-top: 30px;}`}
            {`.nocturn{background-color: #e2e2df!important;width: 50%;margin: 0 auto;padding: 0 20px;}`}
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
            {`@media (max-width: 768px) {.override-buttons-wrapper {flex-direction: column;gap: 15px;}.override-buttons-wrapper .row {flex-direction: column;gap: 15px;}.nocturn{margin-top:30px;width: 90%;}.spacing{ margin-top:15px!important;}.preloader{ margin:15px 0 -15px 0!important;}.nocturn-text-two{ padding-top: 10px;}.nocturn-wider-section{width: 90%;}.nocturn-text-wrapper{padding: 0 15px;}.top p{ font-size: 20px;}.bottom p{ font-size: 15px;}.nocturn-text-wrapper small{ font-size: 12px!important;margin-left: 5px!important;}
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

        <title>17 Little Portland Street - The Tent</title>
      </Head>
      
         <div className="nocturn override food-content">
           <img className="override-logo" src="/images/food/food_page_top.png" alt="The Tent Food" width="100%" />
           <img className="override-logo" src="/images/food/food_page_line_anim.gif" alt="The Tent Food" width="100%" />

            <div className="override-buttons-wrapper">
             <a target="_blank" href="https://www.little-portland.com/thetent" class="override-button">EXPLORE THE TENT</a>
             <a target="_blank" href="https://www.little-portland.com/chefstudio" class="override-button">EXPLORE CHEF'S STUDIO</a>
            </div>
           
           <img src="/images/food/food_page_divider.png" alt="The Tent Food" width="100%" />

           <div className="override-buttons-wrapper">
             <a href="https://www.little-portland.com/bookings" class="override-button">BOOK</a>
             <a target="_blank" href="https://www.little-portland.com/override-menu" class="override-button">MENU</a>
             <a href="mailto:eat@little-portland.com" class="override-button">BOOK CHEF'S STUDIO</a>
            </div>

            <img src="/images/food/food_page_divider.png" alt="The Tent Food" width="100%" />

             <img src="/images/food/food_page_middle.png" alt="The Tent Food" width="100%" />

         </div>

          <div className="nocturn override">
        </div>

         <div className="nocturn-wider-section override-logo">
           <div className="image-row">
              <div className="image-column">
                <img src="/images/override/image27.jpg" />
                <img src="/images/override/image25.jpg" />
                <img src="/images/override/image26.jpg" />
                <img src="/images/override/image22.jpg" />
                <img src="/images/override/image24.jpg" />
              </div>
             <div className="image-column">
                <img src="/images/override/image15.jpg" />
                <img src="/images/override/image20.jpg" />
                <img src="/images/override/image19.jpg" />
                <img src="/images/override/image23.jpg" />
                <img src="/images/override/override_poster_Insta.png" />
              </div>
           </div>
          </div>
      
         <div className="nocturn override footer">
            <img src="/images/food/thetent_page_footer.png" alt="The Tent Food" width="100%" />
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
