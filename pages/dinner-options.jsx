import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";

//hooks
import useDeviceDetect from "@utils/useDeviceDetect";

import CenterContainer from "@components/UX/CenterContainer/CenterContainer";

import Button from "@components/UX/Button";

const BookingOptions = () => {

  return (
    <>
      <Head>
        <title>Bookings </title>  
      </Head>

      <div id="bookingOptions" class="dinner-booking">
          <div class="event-info">
            <div class="info artists eat-heading">
              <h1>BOOK DINNER</h1>
              <h2>17 Little Portland Street</h2> 
            </div>
        </div>

          <div class="tags"><h3><span>FUTURIST ASIAN MENU</span> <span class="dot">●</span> <span>SENSORIAL SETTING</span> <span class="dot">●</span> <span>DINNER MERGES INTO CLUB</span></h3></div>
          <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button new-events-button view-menu"  btnType="hollow">
              <a href="https://www.little-portland.com/override-menu" target="_blank">
                <span>View Menu</span>
               </a>
              </Button>
          </div>
                 
       <div class="book-wrapper dinner-options">
          <div class="override-heading"><h2>Choose Dinner Option</h2></div>

         <div class="button-wrapper new-button-wrapper desktop-only">
            <Button classes="events-button new-events-button"  btnType="hollow">
              <a href="https://www.sevenrooms.com/reservations/littleportland?default_date=YYYY-MM-DD&default_time=21:00&default_party_size=4" target="_blank">
                <span class="space">IN THE TENT</span>
                <p class="time">Includes Free Club Entry</p>
                <p class="details"><span>9PM</span></p>
                <p class="btn-tagline">For the full Override Experience</p>
               </a>
              </Button>
  
              <Button classes="events-button ticket"  btnType="hollow">
                <a class="book-link" href="mailto:eat@little-portland.com?subject=Chef’s Studio" target="_blank">
                <span class="space">CHEF’S STUDIO</span>
                <p class="time">Includes Free Club Entry</p>
                <p class="details chef-studio-details"><span>6-12 PAX</span><span>8PM</span></p>
                <p class="btn-tagline">Where the heads dine</p>
               </a>
              </Button>
          </div>
          
         <div class="button-wrapper new-button-wrapper button-wrapper-bottom desktop-only">
            <a class="menu-btn" href="https://www.little-portland.com/override" target="_blank">
              <span>[What is override]</span>
            </a>
            <a class="menu-btn" href="https://www.little-portland.com/chefstudio" target="_blank">
                <span>[What is Chef's Studio]</span>
              </a>
           </div>
         
         <div class="button-wrapper new-button-wrapper mobile-only">
            <Button classes="events-button new-events-button"  btnType="hollow">
              <a href="https://www.sevenrooms.com/reservations/littleportland?default_date=YYYY-MM-DD&default_time=21:00&default_party_size=4" target="_blank">
                <span class="space">IN THE TENT</span>
                <p class="time">Includes Free Club Entry</p>
                <p class="details"><span>9PM</span></p>
                <p class="btn-tagline">For the full Override Experience</p>
               </a>
              </Button>

            <a class="menu-btn" href="https://www.little-portland.com/override" target="_blank">
              <span>[What is override]</span>
            </a>
  
              <Button classes="events-button ticket"  btnType="hollow">
                <a class="book-link" href="mailto:eat@little-portland.com?subject=Chef’s Studio" target="_blank">
                <span class="space">CHEF’S STUDIO</span>
                <p class="time">Includes Free Club Entry</p>
                <p class="details chef-studio-details"><span>6-12 PAX</span><span>8PM</span></p>
                <p class="btn-tagline">Where the heads dine</p>
               </a>
              </Button>

             <a class="menu-btn" href="https://www.little-portland.com/chefstudio" target="_blank">
                <span>[What is Chef's Studio]</span>
            </a> 
           
          </div>
         
         </div>
         <div className="dinner-bottom dinner-first">“Override” is our restaurant concept, with futurist menus setting the stage for a sensorial experience as dinner transitions seamlessly into our hypnotic after-dark scene.</div>
      </div>
    </>
  );
};

export default BookingOptions;
