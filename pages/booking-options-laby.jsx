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
        <h1 class="event-name disco-saturdays">Disco Saturdays</h1>
        <div class="event-info">
            <div class="info date">
              <h2><span>SAT</span>22 Mar</h2>
            </div>
            <div class="info artists">
              <h3><span>TENT <b>//</b> </span>Aegy, Demi Requismo, NIKS, Wasted Space & Grace Raw Silk</h3>
              <h3><span>STUDIO <b>//</b> </span>ANDY LV, OR:LA</h3>
            </div>
        </div>
       <div class="book-wrapper">
          <div class="override-heading"><h2>BOOK OVERRIDE DINNER</h2></div>
          <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button new-events-button"  btnType="hollow">
              <a href="https://www.sevenrooms.com/reservations/littleportland?client_id=726461756e9725a88ff001a4cae308fd0b5020c074f3e2a8324b11b92c890e1a9154f6d75f5af47a4328f2d005c03c4682b66fe2bcf82664bcbb340e918684fa&default_date=2025-03-22" target="_blank">
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
        <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button ticketNew" btnType="hollow">
              <a href="" target="_blank">
                CLUB GUESTLIST ONLY
              </a>
            </Button>
        </div>
      </div>
    </>
  );
};

export default BookingOptions;
