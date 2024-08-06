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
              <h2><span>FRI</span>23 AUG</h2>
            </div>
            <div class="info artists">
              <h3><span>STUDIO <b>//</b> </span>BAS IBELLINI & FRIENDS</h3>
              <h3><span>TENT <b>//</b> </span>JUNGLE JARVIN, ROBERTA CUTOLO</h3>
            </div>
        </div>
        <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button new-events-button"  btnType="hollow">
              <a href="https://www.sevenrooms.com/reservations/littleportland?client_id=726461756e9725a88ff001a4cae308fd0b5020c074f3e2a8324b11b92c890e1a9154f6d75f5af47a4328f2d005c03c4682b66fe2bcf82664bcbb340e918684fa&default_date=2024-08-23" target="_blank">
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
              <a href="https://sevn.ly/xuebMe5L" target="_blank">
                CLUB GUESTLIST ONLY
              </a>
            </Button>
        </div>
      </div>
    </>
  );
};

export default BookingOptions;
