import React from "react";
import Head from "next/head";
import Image from "next/image";
import HoverImageLink from "@components/HoverImageLink"; // adjust path if your structure differs

//Components
import CenterContainer from "@components/UX/CenterContainer/CenterContainer";

//hooks
import useFetchContent from "@utils/useFetchContent";

const Menu = ({ menuImage }) => { 
  
  return (
    <>
      <Head>

        <link rel="preload" as="image" href="/images/theclub/the_club_page_private_hire.png" />
        <link rel="preload" as="image" href="/images/theclub/the_club_page_private_hire_hover.png" />
        
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

            .link {
               color: #aacc33!important;
                transition: all 0.3s ease-in-out; 
                opacity: 1;
            }

            .link:hover {
              color: #aacc33!important;
              opacity: .7;
            }
            
            .override-button {
                color: #aacc33!important;
                border: 3px solid #aacc33!important;
            }
    
            .override-button:hover {
                color: #000000!important;
                background-color: #aacc33!important;
                border: 3px solid #aacc33!important;
            }

             .image-column img {
                border: 2px solid #aacc33;
            }

            .dance-popup {
              border: none!important;
              margin: 50px 0 25px 0;
              min-height: auto !important;
              font-family: Helvetica !important;
              font-weight: bold !important;
          }

          .dance-popup h3 {
              color: rgb(255, 255, 255);
              font-size: 2rem!important;
          }

          .dance-popup p {
              font-size: 1.5rem!important;
              line-height: 1.6rem !important;
          }

          .intro {
              border: none!important;
              margin: 10px auto 35px auto !important;
              font-family: Helvetica !important;
              font-weight: bold !important;
              text-transform: uppercase!important;
          
          }
          
          .intro p {
              font-size: 1.5rem !important;
              line-height: 1.6rem !important;
              font-weight: 400 !important;
              margin-bottom: 0.6rem !important;
              text-align: center !important;
              color: white !important;
          }

          .hire {
              margin: 50px auto 20px auto!important;
          }
            
            .override-buttons-wrapper .column {
                flex: 1;
            }`}
          
            {`.nocturn h1{margin-top: 30px;}`}
            {`.nocturn{width: 50%;margin: 0 auto;}`}
            {`.nocturn-wider-section{width: 80%;margin: 0 auto;}`}
            {`.column{width: 33%}`}
            {`.column img{ margin-top: 8px;vertical-align: middle;width: 100%;}`}
            {`.column a{ cursor:pointer!important;}`}
            {`.top{ font-size: 35px;}`}
            {`.bottom{ font-size: 25px;}`}
            {'.image-row{ display: flex;flex-wrap: wrap;padding: 0 4px;}'}
            {'.image-column{flex: 33%;max-width: 50%;padding: 0 4px;}'}
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
            {`@media (max-width: 768px) { .override-logo { margin-top: -10px;}.override-buttons-wrapper {flex-direction: column;gap: 15px;}.override-buttons-wrapper .row {flex-direction: column;gap: 15px;}.nocturn{margin-top:30px;width: 90%;}.spacing{ margin-top:15px!important;}.preloader{ margin:15px 0 -15px 0!important;}.nocturn-text-two{ padding-top: 10px;}.nocturn-wider-section{width: 90%;}.nocturn-text-wrapper{padding: 0 15px;}.top p{ font-size: 20px;}.bottom p{ font-size: 15px;}.nocturn-text-wrapper small{ font-size: 12px!important;margin-left: 5px!important;}
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

         .dance-popup h3 {
            font-size: 0.7rem!important;
            padding: 5px 10px!important;
        }

        .dance-popup p {
            font-size: 0.6rem!important;
            line-height: 2!important;
        }

        .intro {
              margin-top: 0px !important;
          }

        .intro p {
              font-size: 0.6rem !important;
              line-height: 2 !important;
              margin-bottom: 0px !important;
          }

        .hire {
              margin: 30px auto 20px auto!important;
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

        <title>17 Little Portland Street - The Club</title>
      </Head>
      
         <div className="nocturn override">
           <img className="override-logo" src="/images/theclub/theclub-page-top.gif" alt="The Club" width="100%" />
         </div>

         <div className="nocturn override intro">
           <p>Access to the club is for Friends of the Club only.</p>
           <p>To apply to become a Friend of the Club, <a className="link" href="mailto:friends@little-potland.com?subject=FOC Enquiry">email us</a>.</p>
           <p>Or you can access the club by <a className="link" target="_blank" href="https://www.little-portland.com/bookings" >booking</a> a dinner table.</p>
         </div>

         <div className="nocturn-wider-section override-logo">
           <div className="image-row">
              <div className="image-column">
                <img src="/images/theclub/the_club01.jpg" />
                <img src="/images/theclub/the_club02.jpg" />
                <img src="/images/theclub/the_club03.jpg" />
                <img src="/images/theclub/the_club04.jpg" />
              </div>
              <div className="image-column">
                <img src="/images/theclub/the_club05.jpg" />
                <img src="/images/theclub/the_club06.jpg" />
                <img src="/images/theclub/the_club07.jpg" />
                <img src="/images/theclub/the_club08.jpg" />
              </div>
           </div>
          </div>

         <div className="nocturn override">
        <div className="dance-popup">
          <div>
                  <div className="category thu">
                    <h3>Thursday <span className="italic-word">is</span> <span className="group-item">Underground</span></h3>
                    <p><span className="group-item">Thursday Underground</span> kicks off the weekend, showcasing cutting-edge electronic artists at the forefront of the underground scene, bringing together a community deeply rooted in its culture.</p>
                  </div>
                  <div className="category fri">
                    <h3>Friday <span className="italic-word">is</span> <span className="group-item">Residents</span></h3>
                    <p><span className="group-item">Friday Residents</span> bridges Underground and Disco3000, shaping the weekend’s rhythm and flow. Focused on club residents, it brings a sense of familiarity and community. The heartbeat of the weekend.</p>
                  </div>
                  <div className="category sat">
                    <h3>Saturday <span className="italic-word">is</span> <span className="group-item">Disco3000</span></h3>
                    <p><span className="group-item">Disco3000</span> captures the evolving spirit of the disco era. Embracing a soundscape that truly resonates with the soul, it delivers a timeless and uplifting journey. A cosmic finale to the weekend.</p>
                  </div>
          </div>
        </div>
        </div>

        <div className="nocturn hire">
            <HoverImageLink
              href="mailto:yo@little-portland.com"
              img="/images/theclub/the_club_page_private_hire.png"
              hoverImg="/images/theclub/the_club_page_private_hire_hover.png"
              aspect="2000 / 306"
              ariaLabel="Private hire enquiries"
              target="_blank"
            />
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
