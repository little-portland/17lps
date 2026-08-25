import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";

//hooks
import useDeviceDetect from "@utils/useDeviceDetect";

import CenterContainer from "@components/UX/CenterContainer/CenterContainer"; 
import Button from "@components/UX/Button";

const BookingOptions = () => {
  useEffect(() => {
    document.body.classList.add("friday");

    return () => {
      document.body.classList.remove("friday");
    };
  }, []);

  return (
    <>
    <Head>
      <title>Event Bookings | Little Portland</title>
      <meta name="robots" content="noindex,follow" />
      <meta name="googlebot" content="noindex,follow" />
    </Head>

      <div id="bookingOptions">
        <h1 className="event-name desktop-only day-category"><span className="day">Friday</span> Residents</h1>
        
        <h1 className="event-name mobile-only cat"><span className="cat-day">Friday</span> Residents</h1>

        <div className="event-info">
           <div class="info date">
              <h2><span>FRI</span>11 Sep</h2>
            </div>
            <div class="info artists">
              <h3><span>TENT <b>//</b> </span>MOMUS, YENTL</h3>
              <h3><span>STUDIO <b>//</b> </span>BAS IBELLINI, DAVID TRIANA</h3>
            </div>
        </div>

        <div className="button-wrapper new-button-wrapper mobile-only">
          <Button classes="events-button ticketNew" btnType="hollow">
            <a href="https://sevn.ly/xFhQSLhd" target="_blank">
              CLUB ENTRY [10PM]
            </a>
          </Button>
        </div>

        <div className="button-wrapper new-button-wrapper desktop-only">
          <Button classes="events-button ticketNew" btnType="hollow">
            <a href="https://sevn.ly/xFhQSLhd" target="_blank">
              CLUB ENTRY [10PM]
            </a>
          </Button>
        </div>
      </div>
    </>
  );
};

export default BookingOptions;
