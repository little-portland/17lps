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
        <h1 class="event-name">Thursday Underground</h1>
        <div class="event-info">
            <div class="info date">
              <h2>14 MAr</h2>
            </div>
            <div class="info artists">
              <h3><span>STUDIO <b>//</b> </span>DAN ANDREI, Morgan</h3>
              <h3><span>TENT <b>//</b> </span> DAVID AGRELLA B2B TRIXIE</h3> 
            </div>
        </div>
      </div>
    </>
  );
};

export default BookingOptions;
