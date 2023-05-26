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
        <h1 class="event-name">*Thursday Underground*</h1>
        <div class="event-info">
            <div class="info date">
              <h2>01 Jun</h2>
            </div>
            <div class="info artists">
              <h3><span>STUDIO // </span>Ralph Lawson, Subb-An</h3>
              <h3><span>TENT // </span>Georgia, Tintin</h3>
            </div>
        </div>
        <div class="button-wrapper">
          <a href="https://www.little-portland.com/bookings">
            <Button classes="events-button"  btnType="hollow">
              Book Dinner <span>(includes free club entry)</span>
            </Button>
          </a>
          <a href="https://www.little-portland.com/bookings">
            <Button classes="events-button" btnType="hollow">
              Book Club Ticket
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default BookingOptions;
