import React, { useEffect } from "react";
import Image from "next/image";
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
        <style>
            {'body{background-color: #000!important;}'}
            {'.override-page h3{ font-family: Oswald!important;font-weight: bold!important;text-decoration: none!important;color: #d5ccc0!important;padding-bottom: 15px;line-height: 1.1;font-size:4rem!important;}'}
            {'.override-page p{ font-family: Oswald!important;font-weight: bold!important;text-decoration: none!important;color: #d5ccc0!important;padding-bottom: 30px;line-height: 1.1;font-weight: 300 !important; font-style: italic!important;}'}
            {'.override-page a{ font-family: Oswald!important;font-weight: bold!important;text-decoration: none!important;color: #000!important;line-height: 1.1;font-size: 2.3rem!important;}'}
            {'.override-page span{display: block!important;margin-top: 15px;}'}
            {'@media (max-width: 768px) { #override-page{ width: 300px!important;top: 2%!important;}.override-page button{margin-top:10px!important;}.override-page h3 { font-size: 3rem!important;padding-bottom: 10px!important;}.override-btn a {line-height: 2.5rem !important;}.override-page a {padding: 5px 10px!important;}}'}
        </style>
        <title>Override - Guest CHef Takeovers</title>
      </Head>

      <div id="override-page" class="override-page">
        <img src="/images/override-tittle.png" alt="Override" width="100%" />           
        <div class="event-info">
            <div class="info guest-chef-title">
              <h3>Guest chef takeovers</h3>
            </div>
        </div>
        <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button ticketNew override-btn" btnType="hollow" >
              <a href="https://sevn.ly/xeLHgzuf" target="_blank">
                Gabriel Pryce (Rita’s)
                <span>28 November - From 7PM</span>
              </a>
            </Button>
        </div>

        <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button ticketNew override-btn" btnType="hollow">
              <a href="https://sevn.ly/x67GScdC" target="_blank">
                Sirichai “Siri” Kularbwong (Singburi)
                <span>11 December - From 7PM</span>
              </a>
            </Button>
        </div>

       <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button ticketNew override-btn" btnType="hollow">
              <a href="https://sevn.ly/xMWA7DA6" target="_blank">
                SEB MEYERS (PLanque)
                <span>29 January - From 7PM</span>
              </a>
            </Button>
        </div>
         <div>
           <p class="override-footnote">
           Override sees guest chefs taking over The Tent, curating a one-night-only special set menu. 
Note that dietary restrictions will not be accommodated for these events.
           </p>
         </div>
      </div>
    </>
  );
};

export default BookingOptions;
