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
            <Button classes="events-button ticketNew" btnType="hollow">
              <a href="https://sevn.ly/xeLHgzuf" target="_blank">
                Gabriel Pryce (Rita’s)
                <p class="dotted-divider first-divider"></p>
                <span>28 November - From 7PM</span>
              </a>
            </Button>
        </div>

        <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button ticketNew" btnType="hollow">
              <a href="https://sevn.ly/xeLHgzuf" target="_blank">
                Gabriel Pryce (Rita’s)
                <p class="dotted-divider first-divider"></p>
                <span>28 November - From 7PM</span>
              </a>
            </Button>
        </div>

       <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button ticketNew" btnType="hollow">
              <a href="https://sevn.ly/xeLHgzuf" target="_blank">
                Gabriel Pryce (Rita’s)
                <p class="dotted-divider first-divider"></p>
                <span>28 November - From 7PM</span>
              </a>
            </Button>
        </div>
          <div>
            <p>Override sees guest chefs taking over The Tent, curating a one-night-only special set menu. Note that dietary restrictions   
will not be accommodated for these events. Visit www.little-portland.com/override to book.</p>
          </div>
      </div>
    </>
  );
};

export default BookingOptions;
