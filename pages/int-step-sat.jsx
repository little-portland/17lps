import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";

//hooks
import useDeviceDetect from "@utils/useDeviceDetect";

import CenterContainer from "@components/UX/CenterContainer/CenterContainer";

import Button from "@components/UX/Button";

const BookingOptions = () => {
  useEffect(() => {
    document.body.classList.add("saturday");

    // Optional cleanup to avoid stacking classes if navigating between pages
    return () => {
      document.body.classList.remove("saturday"); 
    };
  }, []);
  return (
    <>
      <Head>
        <title>Bookings </title>
      </Head>

      <div id="bookingOptions">
        <h1 class="event-name disco3000">Disco3000</h1> 
        <div class="event-info">
            <div class="info date">
              <h2><span>SAT</span>28 Jun</h2>
            </div>
            <div class="info artists">
              <h3><span>TENT <b>//</b> </span>SEAN OD, sEmoa & alia indigo</h3>
              <h3><span>STUDIO <b>//</b> </span>LAMACHE, CEM OZDEN</h3>
            </div>
        </div>

        <div className="book-wrapper">
          <div className="override-heading">
            <h2>START WITH DINNER</h2>
          </div>
          <div className="concept">
            <h4>“Override” is our restaurant concept</h4>
          </div>
          <div className="tags">
            <h3>
              <span>FUTURIST ASIAN MENU</span>
              <span className="dot">●</span>
              <span>SENSORIAL SETTING</span>
              <span className="dot">●</span>
              <span>DINNER MERGES INTO CLUB</span>
            </h3>
          </div>

          <div className="button-wrapper new-button-wrapper">
            <Button classes="events-button new-events-button view-menu" btnType="hollow">
              <a href="https://www.little-portland.com/override-menu" target="_blank">
                <span>View Menu</span>
              </a>
            </Button>
          </div>

         <div class="button-wrapper new-button-wrapper desktop-only">
            <Button classes="events-button new-events-button"  btnType="hollow">
              <a href="https://www.sevenrooms.com/reservations/littleportland?default_date=2025-06-05&default_time=21:00&default_party_size=4" target="_blank">
                <span class="space">IN THE TENT</span>
                <p class="time">Includes Free Club Entry</p>
                <p class="details"><span>9PM</span></p>
                <p class="btn-tagline">For the full Override Experience</p>
               </a>
              </Button>
  
              <Button classes="events-button ticket"  btnType="hollow">
                <a class="book-link" href="mailto:eat@little-portland.com?subject=Chef’s Studio" target="_blank">
                <span class="space">CHEF’S STUDIO</span>
                <p class="time">Includes Free Club Entry</p>
                <p class="details chef-studio-details"><span>6-12 PAX</span><span>8PM</span></p>
                <p class="btn-tagline">Where the heads dine</p>
               </a>
              </Button>
          </div>
          
         <div class="button-wrapper new-button-wrapper button-wrapper-new desktop-only">
            <a class="menu-btn" href="https://www.little-portland.com/override" target="_blank">
              <span>[What is override?]</span>
            </a>
            <a class="menu-btn" href="https://www.little-portland.com/chefstudio" target="_blank">
                <span>[What is Chef's Studio?]</span>
              </a>
           </div>
         
         <div class="button-wrapper new-button-wrapper mobile-only">
            <Button classes="events-button new-events-button"  btnType="hollow">
              <a href="https://www.sevenrooms.com/reservations/littleportland?default_date=YYYY-MM-DD&default_time=21:00&default_party_size=4" target="_blank">
                <span class="space">IN THE TENT</span>
                <p class="time">Includes Free Club Entry</p>
                <p class="details"><span>9PM</span></p>
                <p class="btn-tagline">For the full Override Experience</p>
               </a>
              </Button>

            <a class="menu-btn" href="https://www.little-portland.com/override" target="_blank">
              <span>[What is override?]</span>
            </a>
  
              <Button classes="events-button ticket"  btnType="hollow">
                <a class="book-link" href="mailto:eat@little-portland.com?subject=Chef’s Studio" target="_blank">
                <span class="space">CHEF’S STUDIO</span>
                <p class="time">Includes Free Club Entry</p>
                <p class="details chef-studio-details"><span>6-12 PAX</span><span>8PM</span></p>
                <p class="btn-tagline">Where the heads dine</p>
               </a>
              </Button>

             <a class="menu-btn" href="https://www.little-portland.com/chefstudio" target="_blank">
                <span>[What is Chef's Studio?]</span>
            </a> 
           
          </div>
        </div>
        
        <div class="button-wrapper new-button-wrapper">
            <Button classes="events-button ticketNew" btnType="hollow">
              <a href="" target="_blank">
                CLUB ENTRY ONLY [10PM]
              </a>
            </Button>
        </div>
      </div>
    </>
  );
};

export default BookingOptions;
