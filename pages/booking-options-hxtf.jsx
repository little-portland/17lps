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
        <h1 class="event-name focal-point-presents">Focal Point</h1>
        <div class="event-info">
            <div class="info date">
              <h2><span>THU</span>27 Mar</h2>
            </div>
            <div class="info artists">
              <h3><span>TENT <b>//</b> </span>MARCELINA, Roberta Cutolo</h3>
              <h3><span>STUDIO <b>//</b> </span>CEM OZDEN, Cristi Cons</h3>
            </div>
        </div>
        <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button new-events-button"  btnType="hollow">
            <a href="https://www.sevenrooms.com/reservations/littleportland?default_date=2025-03-27&default_time=21:00&default_party_size=4" target="_blank">
              <span>BOOK DINNER</span>
              <span class="space">IN THE TENT</span>
              <p class="time">Includes Free Club Entry</p>
             </a>
             <p class="dotted-divider first-divider"></p>
             <a class="menu-btn" href="https://www.little-portland.com/menu" target="_blank">
              <span>[MENU]</span>
             </a>
            </Button>

            <Button classes="events-button ticket"  btnType="hollow">
              <a class="book-link" href="mailto:eat@little-portland.com?subject=Chef’s Studio" target="_blank">
              <span>BOOK DINNER</span>
              <span class="space">IN CHEF’S STUDIO</span>
              <p class="time">Includes Free Club Entry</p>
              <p class="details"><span>8-12 PAX</span><span>8PM</span><span>FROM £80PP</span></p>
             </a>
             <p class="dotted-divider"></p>
             <a class="menu-btn" href="https://www.little-portland.com/regular-set-menu" target="_blank">
              <span>[REGULAR MENU]</span>
             </a>
             <a class="menu-btn premium-menu-btn" href="https://www.little-portland.com/premium-set-menu" target="_blank">
              <span>[PREMIUM MENU]</span>
             </a>
            </Button>
        </div>
        <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button ticketNew" btnType="hollow">
            <a href="https://sevn.ly/xhhncbMZ" target="_blank">
                CLUB TICKETS ONLY
              </a>
            </Button>
        </div>
      </div>
    </>
  );
};

export default BookingOptions;
