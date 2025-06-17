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

      <div id="bookingOptions">
          <div class="event-info">
            <div class="info artists eat-heading">
              <h1>EAT AT</h1>
              <h2>17 Little Portland Street, London</h2> 
            </div>
        </div>
       <div class="book-wrapper">
          <div class="override-heading"><h2>BOOK OVERRIDE DINNER</h2></div>
          <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button new-events-button"  btnType="hollow">
              <a href="https://www.sevenrooms.com/reservations/littleportland?default_date=YYYY-MM-DD&default_time=21:00&default_party_size=4" target="_blank">
                <span class="space">IN THE TENT</span>
                <p class="time">Includes Free Club Entry</p>
                <p class="details"><span>9PM</span></p>
               </a>
              </Button>
  
              <Button classes="events-button ticket"  btnType="hollow">
                <a class="book-link" href="mailto:eat@little-portland.com?subject=Chef’s Studio" target="_blank">
                <span class="space">CHEF’S STUDIO</span>
                <p class="time">Includes Free Club Entry</p>
                <p class="details chef-studio-details"><span>6-12 PAX</span><span>8PM</span></p>
               </a>
              </Button>
          </div>
          <div class="button-wrapper new-button-wrapper button-wrapper-bottom">
            <a class="menu-btn" href="https://www.little-portland.com/override-menu" target="_blank">
              <span>[OVERRIDE MENU]</span>
            </a>
            <a class="menu-btn" href="https://www.little-portland.com/override" target="_blank">
                <span>[explore override]</span>
              </a>
           </div>
         </div>
         <div className="dinner-bottom dinner-first">“Override” is our restaurant concept, with futurist menus setting the stage for a sensorial experience as dinner transitions seamlessly into our hypnotic after-dark scene.</div>
         <div className="dinner-bottom"><span className="dinner-info">£65 Set Dinner</span>  <span className="dinner-circle">●</span>  <span className="dinner-info">Futurist Asian Menu</span></div>
      </div>
    </>
  );
};

export default BookingOptions;
