import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";

//hooks
import useDeviceDetect from "@utils/useDeviceDetect";

import CenterContainer from "@components/UX/CenterContainer/CenterContainer"; 
import Button from "@components/UX/Button";

const BookingOptions = () => {
  useEffect(() => {
    document.body.classList.add("thursday");

    return () => {
      document.body.classList.remove("thursday");
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
        <h1 className="event-name desktop-only day-category"><span className="day">Moze</span> Presents</h1>
        
        <h1 className="event-name mobile-only cat"><span className="cat-day">Moze</span> Presents</h1>

        <div className="event-info">
            <div class="info date">
              <h2><span>THU</span>30 JUL</h2>
            </div>
            <div class="info artists">
              <h3><span>TENT <b>//</b> </span>C.A.R, Jardine</h3>
              <h3><span>STUDIO <b>//</b> </span>JOSH KEIT, NATE OLDFIELD, NOIZAR</h3>
            </div>
        </div>

        <div className="button-wrapper new-button-wrapper mobile-only">
          <Button classes="events-button ticketNew" btnType="hollow">
            <a href="https://sevn.ly/x57mfF7I" target="_blank">
              CLUB ENTRY [10PM]
            </a>
          </Button>
        </div>

        <div className="button-wrapper new-button-wrapper desktop-only">
          <Button classes="events-button ticketNew" btnType="hollow">
            <a href="https://sevn.ly/x57mfF7I" target="_blank">
              CLUB ENTRY [10PM]
            </a>
          </Button>
        </div>
      </div>
    </>
  );
};

export default BookingOptions;
