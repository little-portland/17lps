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
              <h2>16 Jun</h2>
            </div>
            <div class="info artists">
              <h3><span>STUDIO <b>//</b> </span>BAS IBELLINI & FRIENDS</h3>
              <h3><span>TENT <b>//</b> </span>GILES SMITH, ROBERTA CUTOLO</h3>
            </div>
        </div>
        <div class="button-wrapper">
          <a href="https://www.sevenrooms.com/reservations/littleportland?default_date=2023-06-16" target="_blank">
            <Button classes="events-button"  btnType="hollow">
              Book Dinner <span>(includes free club entry)</span>
            </Button>
          </a>
          <a href="http://sevn.ly/xgjsS163" target="_blank">
            <Button classes="events-button ticket" btnType="hollow">
              GET ON CLUB <span>GUESTLIST</span>
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default BookingOptions;