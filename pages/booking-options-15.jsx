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
          <div class="event-info">
            <div class="info artists eat-heading">
              <h1>Eat at 17 Little Portland Street, London</h1>
            </div>
        </div>
        <div class="button-wrapper eat-body">
          <a href="https://www.sevenrooms.com/reservations/littleportland?client_id=726461756e9725a88ff001a4cae308fd0b5020c074f3e2a8324b11b92c890e1a9154f6d75f5af47a4328f2d005c03c4682b66fe2bcf82664bcbb340e918684fa&default_date=2024-02-03" target="_blank">
            <Button classes="events-button"  btnType="hollow">
              <div>Dinner+Tunes</div> in The Tent<span>(Middle Eastern)</span>
            </Button>
          </a>
          <a href="mailto:eat@little-portland.com?subject=Chef's Studio booking enquiry" target="_blank">
            <Button classes="events-button" btnType="hollow">
                 Chef's Studio<span>(Chinese)</span>
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default BookingOptions;
