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
            <div class="date">
              <h2>01 June</h2>
            </div>
            <div class="artists">
              <h3><span>STUDIO // </span>Ralph Lawson, Subb-An</h3>
              <h3><span>TENT // </span>Georgia, Tintin</h3>
            </div>
        </div>
          <a href="https://www.little-portland.com/bookings">
            <Button classes="events-button" btnType="hollow">
              Book Dinner (includes free club entry)
            </Button>
          </a>
          <a href="https://www.little-portland.com/bookings">
            <Button classes="events-button" btnType="hollow">
              Buy Ticket / Get on Guest List
            </Button>
          </a>
      </div>
    </>
  );
};

export default BookingOptions;
