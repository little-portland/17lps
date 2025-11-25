import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";

//hooks
import useDeviceDetect from "@utils/useDeviceDetect";

import CenterContainer from "@components/UX/CenterContainer/CenterContainer"; 

import Button from "@components/UX/Button";

const BookingOptions = () => { 
  useEffect(() => {
    document.body.classList.add("dinner-options");

    return () => {
      document.body.classList.remove("dinner-options");
    };
  }, []);
  return (
    <>
      <Head>
        <title>Dinner Options</title>  
      </Head>

      <div id="bookingOptions" class="dinner-booking">
          <div class="event-info">
            <div class="info artists eat-heading">
              <h1>BOOK DINNER</h1>
              <h2>17 Little Portland Street</h2> 
            </div>
        </div>
                 
        <div className="book-wrapper">
          <div className="override-heading">
            <h2>CHOOSE DINNER OPTION</h2>
            <p class="time mobile-only">Includes Club Entry</p>
          </div>
          <div class="tags mobile-only"><h3><span>DINING CONCEPT: <span className="strongword">FUTURIST</span></span></h3></div>

         <div class="dinner-steps desktop-only"><img src="/images/dinner-steps-transition-book-dinner.svg" alt="The Tent Food" width="100%" /></div>

          <div class="button-wrapper new-button-wrapper button-wrapper-new dining-con">
            <a class="menu-btn" href="https://www.little-portland.com/food" target="_blank">
              <span>[More about our dining concept]</span>
            </a>
           </div>

          <div className="button-wrapper new-button-wrapper">
            <Button classes="events-button new-events-button view-menu" btnType="hollow">
              <a href="https://www.little-portland.com/menu" target="_blank">
                <span>View Menu</span>
              </a>
            </Button>
          </div>

         <div class="button-wrapper new-button-wrapper desktop-only">
            <Button classes="events-button new-events-button"  btnType="hollow">
              <a href="https://www.sevenrooms.com/reservations/littleportland?default_date=YYYY-MM-DD&default_time=21:00&default_party_size=4" target="_blank">
                <span class="space">IN THE TENT</span>
                <p class="time">Includes Club Entry</p>
                <p class="details"><span>8:30PM</span></p>
                <p class="btn-tagline">The Cosmic Experience</p>
               </a>
              </Button>
  
              <Button classes="events-button ticket"  btnType="hollow">
                <a class="book-link" href="mailto:eat@little-portland.com?subject=Chef’s Studio" target="_blank">
                <span class="space">CHEF’S STUDIO</span>
                <p class="time">Includes Club Entry</p>
                <p class="details chef-studio-details"><span>6-12 PAX</span><span>8PM</span></p>
                <p class="btn-tagline">Where the heads dine</p>
               </a>
              </Button>
          </div>
          
         <div class="button-wrapper new-button-wrapper button-wrapper-new desktop-only">
            <a class="menu-btn" href="https://www.little-portland.com/thetent" target="_blank">
              <span>[More about The Tent]</span>
            </a>
            <a class="menu-btn" href="https://www.little-portland.com/chefstudio" target="_blank">
                <span>[More about Chef's Studio]</span>
              </a>
           </div>
         
         <div class="button-wrapper new-button-wrapper mobile-only">
            <Button classes="events-button new-events-button"  btnType="hollow">
              <a href="https://www.sevenrooms.com/reservations/littleportland?default_date=YYYY-MM-DD&default_time=21:00&default_party_size=4" target="_blank">
                <span class="space">IN THE TENT</span>
                <p class="details"><span>8:30PM</span></p>
                <p class="btn-tagline">The Cosmic Experience</p>
               </a>
              </Button>

               <a class="menu-btn" href="https://www.little-portland.com/thetent" target="_blank">
                <span>[More about The Tent]</span>
              </a>
  
              <Button classes="events-button ticket"  btnType="hollow">
                <a class="book-link" href="mailto:eat@little-portland.com?subject=Chef’s Studio" target="_blank">
                <span class="space">CHEF’S STUDIO</span>
                <p class="details chef-studio-details"><span>6-12 PAX</span><span>8PM</span></p>
                <p class="btn-tagline">Where the heads dine</p>
               </a>
              </Button>

             <a class="menu-btn" href="https://www.little-portland.com/chefstudio" target="_blank">
                <span>[More about Chef's Studio]</span>
            </a> 
           
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingOptions;
