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
              <h2>14 Dec</h2>
            </div>
            <div class="info artists">
              <h3><span>STUDIO <b>//</b> </span>CLOSED</h3>
              <h3><span>TENT <b>//</b> </span>KEM, MAYBE LAURA, REMI</h3>
            </div>
        </div>
        <div class="button-wrapper">
          <a href="https://www.sevenrooms.com/reservations/littleportland?client_id=726461756e9725a88ff001a4cae308fd0b5020c074f3e2a8324b11b92c890e1a9154f6d75f5af47a4328f2d005c03c4682b66fe2bcf82664bcbb340e918684fa&default_date=2023-12-14" target="_blank">
            <Button classes="events-button"  btnType="hollow">
              Book Dinner <span>(includes free club entry)</span>
            </Button>
          </a>
          <a class="not-allowed" target="_blank">
            <Button classes="events-button ticket" btnType="hollow">
              Book Club <span>Ticket</span>
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default BookingOptions;
