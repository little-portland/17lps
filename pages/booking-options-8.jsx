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
        <h1 class="event-name">Thursday Underground</h1>
        <div class="event-info">
            <div class="info date">
              <h2>04 APR</h2>
            </div>
            <div class="info artists">
              <h3><span>STUDIO <b>//</b> </span>GABRIEL RAI, VINCENT LEMEUX </h3>
              <h3><span>TENT <b>//</b> </span>DAVID TRIANA B2B RAKIM UNDER</h3>
            </div>
        </div>
        <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button new-events-button"  btnType="hollow">
            <a href="https://www.sevenrooms.com/reservations/littleportland?client_id=726461756e9725a88ff001a4cae308fd0b5020c074f3e2a8324b11b92c890e1a9154f6d75f5af47a4328f2d005c03c4682b66fe2bcf82664bcbb340e918684fa&default_date=2024-04-04" target="_blank">
              <span>Dinner+Tunes <br/>in the Tent</span>
              <p class="cusine">(Middle Eastern)</p>
              <p class="time">7PM - 9:30PM</p>
             </a>
             <a class="menu-btn" href="https://www.little-portland.com/menu" target="_blank">
              [MENU]
             </a>
            </Button>

            <Button classes="events-button ticket"  btnType="hollow">
              <a href="https://www.little-portland.com/bookings" target="_blank">
              <span>CHEF’S STUDIO</span>
              <p class="cusine">(Chinese)</p>
              <p class="cusine">Minimum 8 people</p>
              <p class="time">8PM</p>
             </a>
             <a class="menu-btn" href="https://www.little-portland.com/chefs-menu" target="_blank">
              [MENU]
             </a>
            </Button>
        </div>
        <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button ticketNew" btnType="hollow">
            <a href="" target="_blank">
                Book Club Ticket
              </a>
            </Button>
        </div>
      </div>
    </>
  );
};

export default BookingOptions;
