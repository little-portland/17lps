import React from "react";
import Head from "next/head";
import Image from "next/image";
import ManualSlideshow from "@components/UX/ManualSlideshow"; // adjust path if different

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
                margin: 60px auto!important;
            }
            .override-buttons-wrapper .row {
                display: flex;
                gap: 10px;
                width: 100%;
            }
            .full-width {
              width: 100%;
            }
           .events-box h2 {
              margin: 20px 20px 0 20px;
              font-size: 35px;
              font-weight: 800;
              text-align: center;
              padding: 10px;
              background: #000;
              border-radius: 50px;
              color: rgb(245, 118, 88);
            }
            .events-box h3 {
              margin-top: .5rem;
              font-size: 30px;
              font-weight: 800;
              margin-bottom: 1rem;
            }
           .events-box p {
              font-size: 1.5rem;
              font-weight: 800;
              margin-bottom: .5rem;
            }
           .events-box p small {
              font-size: 1.5rem;
              font-weight: 100!important;
            }
            .events-box .content {
                position: relative;
                padding: 20px 0;
                z-index: 1;
            }

            .events-box .content-btn {
              position: relative;
              padding: 0 0 20px 0;
              margin: 10px 0;
              z-index: 1;
          }
            .events-box .content-divider {
                border-bottom: 1px solid #000;
            }
            /*
            .events-box .content::before {
                content: '';
                position: absolute;
                top: 0; left: 0;
                width: 100%; 
                height: 100%;
                background-image: url('/images/override/slide09.png');
                background-size: cover;
                background-position: center;
                opacity: 0.5;
                z-index: -1;
            }*/
            .events-box .content:last-child {
              border: none;
            }

            .image-link {
              display: inline-block !important;
              width: 100% !important;
              height: 110px;
              background-image: url(/images/thetent/the_tent_page_private_enquire.jpg);
              background-size: 100% 100%;
              background-position: center;
              margin-bottom: 20px;
              border: none !important;
          }
          
          .image-link:hover {
            background-image: url('/images/thetent/the_tent_page_private_enquire_hover.jpg');
            border: none!important;
          }

         .tent-radio {
                background-image: url(/images/thetent/the_tent_page_tent_radio.jpg);
          }

         .tent-radio:hover {
                background-image: url(/images/thetent/the_tent_page_tent_radio_hover.jpg);
          }

          
         .tent-insta {
                background-image: url(/images/thetent/the_tent_page_insta.jpg);
          }

         .tent-insta:hover {
                background-image: url(/images/thetent/the_tent_page_insta_hover.jpg);
          }

            .openlab-box {
              background: transparent!important;
              padding: 0!important; 
            }
        
           .openlab-box h2 {
              border-radius: 0;
              margin: 0;
              background-color: rgb(61, 207, 214); 
              color: #000000;
              text-align: left!important;
            }
        
            .openlab-box p {
                color: rgb(245, 118, 88); 
                text-align: right!important;
                font-weight: 400;
              }
      
            .override-buttons-wrapper .column {
                flex: 1;
            }`}
            {`.nocturn h1{margin-top: 30px;}`}
            {`.nocturn{width: 50%;margin: 30px auto 0 auto;!important}`}
            {`.nocturn-wider-section{width: 80%;margin: 0 auto;}`}
            {`.column{width: 50%}`}
            {`.column img{ margin-top: 8px;vertical-align: middle;width: 100%;}`}
            {`.column a{ cursor:pointer!important;}`}
            {`.top{ font-size: 35px;}`}
            {`.bottom{ font-size: 25px;}`}
            {'.image-row{ display: flex;flex-wrap: wrap;padding: 0 4px;}'}
            {'.image-column{flex: 50%;max-width: 50%;padding: 0 4px;}'}
            {'.image-column img{ margin-top: 8px;vertical-align: middle;width: 100%; border: 2px solid rgb(61, 207, 214);}'}
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
            {`.override-space-top-bottom{ margin:15px 0!important;}`}
            {`.override-space-bottom{ margin-bottom:20px!important;}`}
            {`.spacing{ margin-top:30px!important;}`}
            {`.slideshow-wrapper{ max-width: 40%; margin: 0 auto;}`}
            {`.slideshow-wrapper{   object-fit: cover; height: 100%;}`}
             {`.events-box{font-family: Helvetica !important;}`}
            {`.live{ border-top: 5px solid #000;padding-top: 20px;border-bottom: 5px solid #000;margin-bottom: 40px;text-align: center;}`}
            {`@media (max-width: 768px) { .override-buttons-wrapper {flex-direction: column;gap: 15px;}.slideshow-wrapper{ max-width: 100%;margin: 0 20px;}.override-buttons-wrapper .row {flex-direction: column;gap: 15px;}.nocturn{margin-top:30px;width: 90%;}.spacing{ margin-top:15px!important;}.preloader{ margin:15px 0 -15px 0!important;}.nocturn-text-two{ padding-top: 10px;}.nocturn-wider-section{width: 90%;}.nocturn-text-wrapper{padding: 0 15px;}.top p{ font-size: 20px;}.bottom p{ font-size: 15px;}.nocturn-text-wrapper small{ font-size: 12px!important;margin-left: 5px!important;}
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
            margin: 25px auto!important;
        }

        .events-box h2 {
          font-size: 15px;
          margin: 10px 10px 0 10px;
       }
       
       .events-box h3 {
          font-size: 15px;
      }

      .events-box p, .events-box small {
        font-size: 13px!important;
    }

    .events-box .content, .events-box .content-btn {
        padding: 10px 0;
        margin: 0;
    }
        .override-button {
            font-size: 15px!important;
        }

   .events-box .overide-buton, .events-box .content-btn {
      font-size: 12px!important;
    }

    .image-link {
        height: 60px;
        margin-bottom: 0;
    }

        .image-column {
            flex: 100%;
            max-width: 100%;
        }

            }`}
        </style>

        <title>The Tent</title>
      </Head>
      
         <div className="nocturn override">
           <img className="override-logo" src="/images/thetent/the_tent_page_logo.png" alt="The Tent" width="100%" />
           <img className="override-logo" src="/images/thetent/rotating_tent.gif" alt="The Tent" width="100%" />
           <img src="/images/thetent/the_tent_page_schedule.png" alt="The Tent" width="100%" />
         </div>

          <div className="override-space-bottom override-logo">
            <ManualSlideshow />
          </div>

          <div className="nocturn override override-buttons-wrapper override-logo">
            <a  target="_blank" href="https://www.little-portland.com/bookings" class="override-button book-override">BOOK DINNER</a>
            <a target="_blank" href="https://www.little-portland.com/override-menu" class="override-button">MENU</a>
          </div>

          <div className="nocturn">
            <a target="_blank" href="mailto:yo@little-portland.com" class="image-link"></a>
          </div>

           <div className="nocturn">
            <a target="_blank" href="https://www.little-portland.com/thetentradio" class="image-link tent-radio"></a>
          </div>

          <div className="nocturn-wider-section override-logo">
           <div className="image-row">
              <div className="image-column">
                <img src="/images/thetent/the_tent01.jpg" />
                <img src="/images/override/slide09.png" />
                <img src="/images/thetent/the_tent04.jpg" />
                <img src="/images/thetent/the_tent09.jpg" />
                <img src="/images/thetent/the_tent06.jpg" />
              </div>
             <div className="image-column">
                <img src="/images/thetent/the_tent02.jpg" />
                <img src="/images/thetent/the_tent07.jpg" />
                <img src="/images/thetent/the_tent03.jpg" />
              </div>
           </div>
          </div>

          <div className="nocturn  override-logo">
            <a target="_blank" href="https://www.instagram.com/thetentattheendoftheuniverse/" class="image-link tent-insta"></a>
          </div>
      
         <div className="nocturn override">
          <img src="/images/override/override_new_page_bottom.png" alt="Override" width="100%" />
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
