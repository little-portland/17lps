ideimport React, { useEffect } from "react";
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
        <title>Override</title>
      </Head>

      <div id="bookingOptions">
        <h1 class="event-name override">Override</h1>
        <div class="event-info">
            <div class="info guest-chef-title">
              <h3>Guest chef takeovers</h3>
            </div>
        </div>
        <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button ticketNew override-btn" btnType="hollow">
              <a href="https://sevn.ly/xeLHgzuf" target="_blank">
                Gabriel Pryce (Rita’s)
                <p class="dotted-divider first-divider"></p>
                <span>28 November - From 7PM</span>
              </a>
            </Button>
        </div>

        <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button ticketNew override-btn" btnType="hollow">
              <a href="https://sevn.ly/x67GScdC" target="_blank">
                Sirichai “Siri” Kularbwong (Singburi)
                <p class="dotted-divider first-divider"></p>
                <span>11 December - From 7PM</span>
              </a>
            </Button>
        </div>

       <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button ticketNew override-btn" btnType="hollow">
              <a href="https://sevn.ly/xMWA7DA6" target="_blank">
                SEB MEYERS (PLanque)
                <p class="dotted-divider first-divider"></p>
                <span>29 January - From 7PM</span>
              </a>
            </Button>
        </div>
      </div>
    </>
  );
};

export default BookingOptions;