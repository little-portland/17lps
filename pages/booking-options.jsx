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

      <CenterContainer>
          <a>
            <Button classes="events-button" btnType="hollow">
              Book Dinner (includes free club entry)
            </Button>
          </a>
          <ul>
            <li><a target="_blank" href="https://www.little-portland.com/bookings">Book Dinner (includes free club entry)</a>.</li>
            <li><a target="_blank" href="https://www.little-portland.com/bookings">Buy Ticket / Get on Guest List</a>.</li>
          </ul>
      </CenterContainer>
    </>
  );
};

export default BookingOptions;
