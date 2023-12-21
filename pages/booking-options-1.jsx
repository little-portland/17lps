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
        <h1 class="event-name nyd">OPEN NYD</h1>
        <div class="event-info">
            <div class="info date">
              <h2>01 JAN</h2>
            </div>
            <div class="info artists">
              <h3><span>STUDIO <b>//</b> </span>CASSY, JONNY ROCK,  ROB MELLO</h3>
              <h3><span>TENT <b>//</b> </span>David Triana & rakim under, harri pepper, lex wolf</h3>
            </div>
        </div>
        <div class="button-wrapper">
          <a class="not-allowed">
            <Button classes="events-button"  btnType="hollow">
              Book Dinner <span>(includes free club entry)</span>
            </Button>
          </a>
          <a href="https://sevn.ly/x4B01jeh" target="_blank">
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
