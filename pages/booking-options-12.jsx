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
        <h1 class="event-name sunday-special">Carniva Special</h1>
        <div class="event-info">
            <div class="info date">
              <h2><span>Sun</span>09 Sep</h2>
            </div>
            <div class="info artists">
              <h3><span>TENT & STUDIO <b>//</b> </span>Isaac Carter & Friends</h3>
            </div>
        </div>
        <div class="button-wrapper new-button-wrapper book-only-wrapper">
            <Button classes="events-button ticketNew" btnType="hollow">
              <a href="https://sevn.ly/xDUNXJq4" target="_blank">
                Book Club Ticket
              </a>
            </Button>
        </div>
      </div>
    </>
  );
};

export default BookingOptions;
