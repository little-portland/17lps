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
        
        <link rel="preload" as="image" href="/images/studio/studio-page-top.gif" />
        <link rel="preload" as="image" href="/images/studio/studio-rotating.gif" /> 
        <link rel="preload" as="image" href="/images/studio/logo.gif" /> 
        <link rel="preload" as="image" href="/images/studio/night-schedule.gif" />
        <link rel="preload" as="image" href="/images/studio/studio_private_hire.gif" /> 
        <link rel="preload" as="image" href="/images/studio/studio_private_hire_hover.gif" />
        <link rel="preload" as="image" href="/images/theclub/the_club_page_friend.png" /> 
        <link rel="preload" as="image" href="/images/theclub/the_club_page_friend_hover.png" />
        <link rel="preload" as="image" href="/images/theclub/rotating_club.gif" />
        <link rel="preload" as="image" href="/images/studio/cs_studio.png" />
        <link rel="preload" as="image" href="/images/studio/acoustic.gif" />
                
        <style>
            {`html{overflow-x: hidden !important;}`}
            {`body{
                  overflow: auto!important;
                  overflow-x: initial!important;
                  background: #4e4c4e!important;}`}
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
                margin: 15px 0 60px 0;
            }
            .override-buttons-wrapper .row {
                display: flex;
                gap: 10px;
                width: 100%;
            }
            .full-width {
              width: 100%;
            }

            @keyframes flicker {
                0%, 100% { filter: drop-shadow(-2px 0 5px rgba(0,100,255,0.9)) drop-shadow(2px 0 5px rgba(0,255,120,0.7)); }
                50%      { filter: drop-shadow(0 -2px 8px rgba(0,100,255,1)) drop-shadow(0 2px 8px rgba(0,255,120,0.9)); }
              }
              
              .vhs-img {
                animation: flicker 1.5s infinite ease-in-out;
                border: 2px solid #6bddd9!important;
                border-radius: 20px;
              }

            .link {
               color: #6bddd9!important;
                transition: all 0.3s ease-in-out; 
                opacity: 1;
            }

            .link:hover {
              color: #6bddd9!important;
              opacity: .7;
            }
            
            .hollow-btn {
                color: #6adfe7!important;
                border: 3px solid #6adfe7!important;
            }
    
            .hollow-btn:hover {
                color: #4e4c4e!important;
                background-color: #6adfe7!important;
                border: 3px solid #4e4c4e!important;
            }

            .override-button {
              display: block;
              width: 100%;
              background-color: transparent;
              color: #6adfe7; /* neon cyan text */
              border: 3px solid rgba(0, 255, 120, 1) !important;
              padding: 15px 0;
              font-weight: bold;
              text-align: center;
              text-decoration: none;
              font-size: 25px!important;
              cursor: pointer;
              border-radius: 50px;
              color: #fff !important;
              transition: 0.3s ease-in-out;
              text-transform: uppercase;
              text-shadow: 0px 0 5px rgba(0, 255, 120, 0.2), 8px 0 2px rgba(7, 89, 172, 0.3) !important;
              
              /* 👇 VHS-style inner + outer glow */
              box-shadow:
                inset 0 0 6px 2px rgba(0, 255, 120, 0.8),  /* inner green glow */
                0 0 5px 3px rgba(7, 89, 172, 0.9);       /* outer blue glow */
            }

            .override-button:hover {
              box-shadow:
                inset 0 0 10px 3px rgba(0, 255, 120, 0.9),
                0 0 10px 6px rgba(37, 89, 172, 1);
              text-shadow:
                0 0 3px rgba(0, 255, 120, 0.8),
                0 0 5px rgba(7, 89, 172, 0.9);
              transform: scale(1.02);
              border: 3px solid rgba(0, 255, 120, 1) !important;
              text-shadow: 0px 0 5px rgba(0, 255, 120, 0.2), -8px 0 2px rgba(0, 180, 255, 0.3) !important;
            }

            @keyframes flicker {
              0%, 100% { 
                box-shadow:
                  inset 0 0 6px 2px rgba(0, 255, 120, 0.8),
                  5px 0 5px 3px rgba(7, 89, 172, 0.9);
              }
              50% {
                box-shadow:
                  inset 0 0 8px 3px rgba(0, 255, 120, 1),
                  -5px 0 10px 6px rgba(7, 89, 172, 1);
              }
            }
            
            .override-button {
              animation: flicker 2s infinite ease-in-out;
            }

             .image-column img {
                border: 3px solid #6bddd9;
                padding: 3px;
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
              margin: 50px auto 50px auto!important;
          }

        .friends {
              margin: 25px auto 30px auto!important;
          }

          .img-grid {
            margin-bottom: 40px!important;
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
              margin-bottom: 10px !important;
          }

        .intro p {
              font-size: 0.6rem !important;
              line-height: 2 !important;
              margin-bottom: 0px !important;
          }

        .hire {
              margin: 30px auto 40px auto!important;
          }

        .friends {
              margin: 10px auto 10px auto !important;
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

        <title>17 Little Portland Street - Studio</title>
      </Head>
      
         <div className="nocturn override">
           <img className="override-logo" src="/images/studio/studio-page-top.gif" alt="Studio" width="100%" />
           <img src="/images/studio/top-tagline.gif" alt="Studio" width="100%" />
           <img className="override-logo" src="/images/studio/studio-rotating.gif" alt="The Club" width="100%" />
           <img className="override-logo" src="/images/studio/night-schedule.gif" alt="Studio" width="100%" />
           <img className="override-logo" src="/images/studio/acoustic.gif" alt="Studio" width="100%" />
           <div className="override-buttons-wrapper">
             <a target="_blank" href="/images/studio/acoustic-test-report.pdf" class="override-button hollow-btn">Acoustic Test Report</a>
          </div>
         </div>

         <div className="nocturn override">

        <img className="override-logo" src="/images/studio/cs_studio.png" alt="Studio" width="100%" />
         <div className="override-buttons-wrapper">
             <a href="mailto:eat@little-portland.com" class="override-button hollow-btn">BOOK CHEF'S STUDIO</a>
           <div className="row">
              <div className="column">
                    <a target="_blank" href="https://www.little-portland.com/menu" class="override-button hollow-btn">MENU</a>
              </div>
              <div className="column">
                    <a target="_blank" href="https://www.little-portland.com/food" class="override-button hollow-btn">DINING CONCEPT</a>
              </div>
           </div>
          </div>
         </div>

        <div className="nocturn override">
           <img src="/images/studio/bottom-tagline.gif" alt="Studio" width="100%" />
         </div>

         <div className="nocturn hire">
            <HoverImageLink
              href="mailto:yo@little-portland.com"
              img="/images/studio/studio_private_hire.gif"
              hoverImg="/images/studio/studio_private_hire_hover.gif"
              aspect="1200 / 300"
              ariaLabel="Private hire enquiries"
              target="_blank"
            />
          </div>


         <div className="nocturn-wider-section override-logo img-grid">
           <div className="image-row override-logo">
              <div className="image-column">
                <img className="vhs-img" src="/images/theclub/the_club01.jpg" />
                <img className="vhs-img" src="/images/theclub/the_club02.jpg" />
                <img className="vhs-img" src="/images/theclub/the_club03.jpg" />
                <img className="vhs-img" src="/images/theclub/the_club04.jpg" />
                <img className="vhs-img" src="/images/theclub/the_club05.jpg" />
              </div>
              <div className="image-column">
                <img className="vhs-img" src="/images/theclub/the_club06.jpg" />
                <img className="vhs-img" src="/images/theclub/the_club07.jpg" />
                <img className="vhs-img" src="/images/theclub/the_club08.jpg" />
                <img className="vhs-img" src="/images/theclub/the_club09.jpg" />
                <img className="vhs-img" src="/images/theclub/the_club10.jpg" />
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
