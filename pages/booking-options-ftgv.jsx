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
        <h1 class="event-name friday-residents">FRIDAY RESIDENTS</h1>
        <div class="event-info">
           <div class="info date">
              <h2><span>FRI</span>11 Jul</h2>
            </div>
            <div class="info artists">
              <h3><span>TENT <b>//</b> </span>MARCELINA, VALENTINA PAHOR</h3>
              <h3><span>STUDIO <b>//</b> </span>Bas Ibellini, Mr Shiver</h3>
            </div>
        </div>
        <div class="book-wrapper">
          <div class="override-heading"><h2>BOOK OVERRIDE DINNER</h2></div>
          <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button new-events-button"  btnType="hollow">
              <a href="https://www.sevenrooms.com/reservations/littleportland?default_date=2025-07-11&default_time=21:00&default_party_size=4" target="_blank">
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
              <span>[Futurist Asian Menu]</span>
            </a>
            <a class="menu-btn explore-override" href="https://www.little-portland.com/override" target="_blank">
                <span>[explore override]</span>
              </a>
           </div>
         </div>
        <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button ticketNew" btnType="hollow">
              <a href="https://sevn.ly/xYZtXyim" target="_blank">
                CLUB GUESTLIST ONLY
              </a>
            </Button>
        </div>
      </div>
    </>
  );
};

export default BookingOptions;
