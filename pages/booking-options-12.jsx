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
        <title>Bookings</title>
      </Head>

      <div id="bookingOptions">
        <h1 class="event-name dinner-tunes">Dinner+Tunes</h1>
        <div class="event-info">
            <div class="info date">
              <h2><span>THU</span>28 Mar</h2>
            </div>
            <div class="info artists">
              <h3><span>STUDIO <b>//</b> </span>Closed</h3>
              <h3><span>TENT <b>//</b> </span>MARCELINA WICK B2B B.AI</h3>
            </div>
        </div>
        <div class="button-wrapper new-button-wrapper full-width-btn">
            <Button classes="events-button new-events-button"  btnType="hollow">
              <a href="https://www.sevenrooms.com/reservations/littleportland?client_id=726461756e9725a88ff001a4cae308fd0b5020c074f3e2a8324b11b92c890e1a9154f6d75f5af47a4328f2d005c03c4682b66fe2bcf82664bcbb340e918684fa&default_date=2024-03-28" target="_blank">
              <span>BOOK DINNER</span>
              <span class="space">IN THE TENT</span>
              <p class="time">Includes Free Club Entry</p>
             </a>
             <p class="dotted-divider first-divider"></p>
             <a class="menu-btn" href="https://www.little-portland.com/menu" target="_blank">
              <span>[Middle Eastern MENU]</span>
             </a>
            </Button>
        </div>
      </div>
    </>
  );
};

export default BookingOptions;
