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
        <title>Bookings</title>
      </Head>

      <div id="bookingOptions">
        <h1 className="event-name desktop-only day-category"><span className="day">Friday</span> Residents</h1>
        
        <h1 className="event-name mobile-only cat"><span className="cat-day">Friday</span> Residents</h1>

        <div className="event-info">
           <div class="info date">
              <h2><span>FRI</span>31 Oct</h2>
            </div>
            <div class="info artists">
              <h3><span>TENT <b>//</b> </span>DAVID AGRELLA, PASH</h3>
              <h3><span>STUDIO <b>//</b> </span>BAS IBELLINI</h3>
            </div>
        </div>

        <div className="button-wrapper new-button-wrapper mobile-only">
          <Button classes="events-button ticketNew" btnType="hollow">
            <a href="https://sevn.ly/xVBE9LVM" target="_blank">
              CLUB ENTRY ONLY [10PM]
            </a>
          </Button>
        </div>

        <div className="or mobile-only"><h2>Or</h2></div>

        <div className="book-wrapper">
          <div className="override-heading">
            <h2>START WITH DINNER</h2>
            <p class="time mobile-only">Includes Free Club Entry</p>
          </div>
          <div class="tags mobile-only"><h3><span>DINING CONCEPT: <span className="strongword">FUTURIST</span></span></h3></div>

          <div className="concept">
            <h4>“Override” is our restaurant concept</h4>
          </div>
         <div class="dinner-steps desktop-only"><img src="/images/dinner-steps-transition-fri.svg" alt="The Tent Food" width="100%" /></div>

          <div class="button-wrapper new-button-wrapper button-wrapper-new dining-con">
            <a class="menu-btn" href="https://www.little-portland.com/food" target="_blank">
              <span>[More about our dining concept]</span>
            </a>
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
              <a href="https://www.sevenrooms.com/reservations/littleportland?default_date=2025-10-31&default_time=21:00&default_party_size=4" target="_blank">
                <span class="space">IN THE TENT</span>
                <p class="time">Includes Free Club Entry</p>
                <p class="details"><span>8:30PM</span></p>
                <p class="btn-tagline">The Cosmic Experience</p>
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
            <a class="menu-btn" href="https://www.little-portland.com/thetent" target="_blank">
              <span>[More about The Tent]</span>
            </a>
            <a class="menu-btn" href="https://www.little-portland.com/chefstudio" target="_blank">
                <span>[More about Chef's Studio]</span>
              </a>
           </div>
         
         <div class="button-wrapper new-button-wrapper mobile-only">
            <Button classes="events-button new-events-button"  btnType="hollow">
              <a href="https://www.sevenrooms.com/reservations/littleportland?default_date=2025-10-31&default_time=21:00&default_party_size=4" target="_blank">
                <span class="space">IN THE TENT</span>
                <p class="details"><span>8:30PM</span></p>
                <p class="btn-tagline">The Cosmic Experience</p>
               </a>
              </Button>

               <a class="menu-btn" href="https://www.little-portland.com/thetent" target="_blank">
                <span>[More about The Tent]</span>
              </a>
  
              <Button classes="events-button ticket"  btnType="hollow">
                <a class="book-link" href="mailto:eat@little-portland.com?subject=Chef’s Studio" target="_blank">
                <span class="space">CHEF’S STUDIO</span>
                <p class="details chef-studio-details"><span>6-12 PAX</span><span>8PM</span></p>
                <p class="btn-tagline">Where the heads dine</p>
               </a>
              </Button>

             <a class="menu-btn" href="https://www.little-portland.com/chefstudio" target="_blank">
                <span>[More about Chef's Studio]</span>
            </a> 
           
          </div>
        </div>

        <div className="or desktop-only or-desktop"><h2>Or</h2></div>
        
        <div className="button-wrapper new-button-wrapper desktop-only">
          <Button classes="events-button ticketNew" btnType="hollow">
            <a href="https://sevn.ly/xVBE9LVM" target="_blank">
              CLUB ENTRY ONLY [10PM]
            </a>
          </Button>
        </div>
      </div>
    </>
  );
};

export default BookingOptions;
