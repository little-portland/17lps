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
          <a href="https://www.little-portland.com/bookings">
            <Button classes="events-button" btnType="solid">
              Book Dinner (includes free club entry)
            </Button>
          </a>
          <a href="https://www.little-portland.com/bookings">
            <Button classes="events-button" btnType="solid">
              Book Dinner (includes free club entry)
            </Button>
          </a>
      </CenterContainer>
    </>
  );
};

export default BookingOptions;
