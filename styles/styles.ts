import styled, { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

export const breakpoints = {
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,  
};

export const GlobalStyle = createGlobalStyle` 

@import url("https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap");
@import url("https://fonts.cdnfonts.com/css/helvetica-neue-55");
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap");  

@font-face {
  font-family: "Space Mono";
  src: url("./fonts/SpaceMono-regular.ttf") format("ttf"),  
  url("./fonts/SpaceMono-bold.ttf") format("ttf");
  font-weight: bold;
  font-display: swap;
} 

html, body { 
  overflow-y: auto!important;
}

* {
  box-sizing: border-box;
  margin: 0; 
  padding: 0;
 }

 //Bookings iframe specific styles
 .bookings-container {
  position: absolute;
  padding: 5rem;
 }

.bookings-iframe {
  margin-top: -2rem!important;
}

.bookings-body-text {
  text-align: left;
  padding: 5px 20px;
  border: 2px solid rgb(92, 44, 124);
  margin-bottom: 1.5rem;
  max-width: 80%;
}

.bookings-body-text a {
  cursor: pointer;
}

.bookings-body-text a, .bookings-body-text a:hover, .bookings-body-text a:focus {
  color: rgb(92, 44, 124);
}

.booking-heading {
  font-size: 20px;
  margin-bottom: 20px;
  max-width: 50%;
  text-align: center;
  line-height: 2rem;
  text-transform: uppercase;
}

.booking-heading a, .booking-heading a:hover, .booking-heading a:focus {
  color: rgb(92, 44, 124);
}

.bookings-body-text h1 {
  margin-bottom: 1rem;
}

.bookings-heading-0, .bookings-heading-1, .bookings-heading-2 {
  font-family: "Space Mono" !important;
  font-weight: 900;
  font-style: normal;
  font-size: 1.1rem;
  text-transform: uppercase;
}

.bookings-heading-0 {
  margin-top: 1rem;
}

.bookings-heading-1 {
  margin-top: 2rem;
}

.bookings-heading-2 {
  margin-top: 2rem;
}

.bookings-body-text ul {
  list-style-type:square;
  margin: 10px;
}

.bookings-body-text ul li {
  font-size: .8rem;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 15px;
}

/* Eat popup box styles */

.insta {
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 16px;
  background-color: #5C2C7C;
  width: 48px;
  height: 41px!important;
  padding: 8px;
  border-left: 8px solid #e8bac9;
}

.sample-menu {
  position: relative;
}

.eat-note {
  text-align: left;
  padding: 20px;
  background-color: #a1d3c1;
  margin-bottom: 1.5rem;
  color: #4c021b;
  max-height: 510px;
  max-width: 550px;
  overflow: auto;
}

.eat-modal .eat-note {
  background-color: #000000;
}

@media (min-width: 768px) {
  .eat-note {
    min-width: 550px;
  }
  
  .hire-modal .btn-wrapper-border {
    margin-top: -40px;
  }
  
}

.eat-note h1 {
  color: #50286d;
  font-size: 3rem;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: .3rem;
}

.eat-modal .eat-note h1 {
  color: #3DCFD6;
}

.eat-note h2 {
  color: #F57658; 
  font-size: 1rem;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 1rem;
}
.eat-note h3 {
  color: #3DCFD6; 
  font-size: 1rem;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 1rem;
}

.eat-note h4 {
  color: rgb(61, 207, 214)!important;
  font-size: .8rem;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.eat-note h5 {
   margin-top: 1.5rem;
   margin-bottom: 1rem;
}

.eat-note h6 {
  color: #fa4882;
  font-size: .7rem;
  text-transform: uppercase;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.eat-note b {
  color: #fa4882;
}

.eat-note hr {
  border: none;
  border-top: 1px solid #4c021b;
  margin: 20px 0;
}

.eat-note a {
  color: rgb(61, 207, 214)!important;
  text-decoration: none;
  cursor: pointer;
}

.eat-note a:hover {
  color: rgb(245, 118, 88)!important;
}

.eat-note img {
    position: relative!important;
    margin: auto!important;
    display: block!important;
    width: auto!important;
    height: auto!important;
    min-width: 100%!important;
    max-height: 100%!important;
}

.eat-note .foot-note {
  margin-bottom: 0!important; 
}

.box {
  text-align: left!important; 
}

.box h2 {
  color: rgb(61, 207, 214)!important;
  text-align: left;
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
}

.chef-studio h2 {
  font-size: 2.1rem;
  margin-bottom: 1rem;
}

.box h4 {
  text-align: left;
  font-size: 1rem;
}

.box span {
  text-align: left;
  font-size: 0.6rem;
}

.box-1, .box-2, .box-3 {
  border: 2px solid #3DCFD6;
  padding: 20px;
  margin-bottom: 20px;
}

.box-2 {
  padding: 20px 20px 5px 20px;
}

.box-3 {
  margin-bottom: 0;
}

.override-intro {
    font-size: 1rem!important;
    line-height: 1.2!important;
}

.override-boxx img {
    margin-bottom: 20px!important;
}

.override-boxx h2 {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.override-boxx h3 {
    font-size: .9rem !important;
    text-align: left;
}

.override-boxx .info {
 color: rgb(61, 207, 214)!important;
}

.override-button {
    display: block; 
    width: 100%; 
    background-color: transparent;
    color: #3DCFD6; 
    border: 3px solid #3DCFD6;
    padding: 15px 0;
    font-weight: bold;
    text-align: center; 
    text-decoration: none;
    font-size: 35px; 
    cursor: pointer;
    transition: all 0.3s ease-in-out; 
}

.override-button:hover {
    background-color: #3DCFD6;
    color: #000000; 
}

.override-heading {
  margin: -5px 0 10px 0;
}

.override-heading h2 {
    text-align: center;
    font-size: 3.4rem;
}

.chef-studio-details span {
    padding: 0 10px;
}

.chef-studio-details span:first-child {
    text-align: right;
}

.chef-studio-details span:nth-child(2) {
    text-align: left;
}

.schedule-box {
    background: #3DCFD6;
    color: #000000;
    padding: 10px;
}

.schedule-box h3, .schedule-box p {
    color: #000000!important;
}

.schedule-box h4 {
    color: #dd674b!important;
    text-align: center!important;
    margin-bottom: 1rem!important;
}

.schedule-box .schedule-container {
    display: grid;
}

.schedule-box .schedule-container .details small {
    margin-top: 10px;
    font-size: 1.1rem;
    display: block;
}

.schedule-box .details {
  grid-row: 3!important;
  display: inline-block !important;
  margin: auto!important;
  margin-bottom: 0!important;
  text-align: center!important;
}

.schedule-box .details span {
  display: block;
  text-align: center!important;
}

.open {
  margin-bottom: 2px!important;
}

.open h3 {
  margin-bottom: 0!important;
}

.header-tag {
  margin-bottom: .5rem!important;
}

.eat-note p {
  color: rgb(245, 118, 88)!important; 
  font-size: .8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 15px;
}

.menu-available {
    font-size: 1rem !important;
    margin-top: -15px !important;
    color: rgb(61, 207, 214)!important;
}

.menu-available span {
    font-size: 1rem;
    color: rgb(61, 207, 214)!important;
}

.eat-note .links {
  margin-bottom: 0;
}

.eat-note ul {
  list-style-image: url('/images/available.svg');
  margin: 0 15px 1rem 15px;
  color: rgb(61, 207, 214) !important;
}

.eat-note ul li {
  font-size: .8rem;
  font-weight: 600;
  padding-left: 5px;
  margin-bottom: 0rem;
  line-height: 20px;
}

.eat-note ul li::marker {
  font-size: 15px;
}

::-webkit-scrollbar {
  width: 6px;
}

.schedule-box h3, .schedule-box p {
    color: #000000!important;
}

.override-boxx h2 {
  color: rgb(61, 207, 214)!important;
}

/* Track */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #4c021b; 
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}
::-webkit-scrollbar-thumb:window-inactive {
  background: #4c021b; 
}

/* booking options page */

#bookingOptions {
    position: absolute;
    width: 700px;
    top: 8%;
    left: 50%;
    transform: translateX(-50%);
    text-transform: uppercase;
    padding-bottom: 50px;
}

#override-page {
    position: absolute;
    width: 700px;
    top: 12%;
    left: 50%;
    transform: translateX(-50%);
    text-transform: uppercase;
}

#override-page .takeover-date {
    float: left;
    position: absolute;
    top: 18px;
    text-align: left;
    font-size: 2.3rem!important;
}

#override-page time {
    display: block;
    font-size: 1.5rem;
}

#bookingOptions .event-name {
    font-size: 3.5rem;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: .5rem;
}

#bookingOptions .function-presents {
    font-size: 3.1rem;
}

#bookingOptions .halucinate {
    font-size: 6rem;
}

#bookingOptions .openlab-presents,  #bookingOptions .friday-residents {
    font-size: 4.4rem;
}

#bookingOptions .openlab-presents {
    font-size: 10rem;
}

#bookingOptions .possible-futures {
  font-size: 2.4rem;
}

#bookingOptions .sunday-special {
    font-size: 5.1rem;
}

#bookingOptions .warmer-people {
    font-size: 5.4rem;
}

#bookingOptions .utopia-project {
    font-size: 3.9rem;
}

#bookingOptions .balearic-electric-openlab {
    font-size: 2.5rem;
}

#bookingOptions .records {
    font-size: 2.3rem;
}

#bookingOptions .focal-point-presents {
  font-size: 6.4rem;
}

#bookingOptions .disco-saturdays {
    font-size: 4.7rem!important;
}

#bookingOptions .disco3000 {
    font-size: 8rem;
}

#bookingOptions .lick-lid {
    font-size: 5.9rem!important;
}

#bookingOptions .balance {
    font-size: 10rem;
}

#bookingOptions .override {
    font-size: 9rem; 
}

#bookingOptions .override a {
    line-height: 1;
}

#bookingOptions .guest-chef-title {
    font-size: 3.4rem;
    text-align: center;
}

.override-footnote {
    text-align: center;
    margin-top: 20px;
}

.override-btn {
    position: relative;
    font-size: 2rem !important;
    margin-top: 20px;
    padding: 15px 15px 17px 15px;
}
.override-btn .dotted-divider, .override-btn .first-divider {
    margin: 10px 0!important;
}

.override-btn span {
    margin-bottom: 0!important;
    padding-bottom: 0!important;
    font-size: 1.5rem !important;
}

.override-page img {
  margin-bottom: 10px;
}

#bookingOptions .un-mute {
    font-size: 10rem;
    margin-bottom: 0.5rem;
}

#bookingOptions .urban-future {
    font-size: 5.9rem;
}

#bookingOptions .phonica {
    font-size: 4.4rem;
}

#bookingOptions .mid-summer {
  font-size: 2.5rem;
}

#bookingOptions .nyd {
  font-size: 8.9rem;
}

#bookingOptions .chinese-ny {
    font-size: 1.5rem;
    margin-bottom: 5px;
    background: rgb(92, 44, 124);
    color: rgb(232, 186, 201);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 0 2px 0;
}

#bookingOptions .cny {
    font-size: 2.1rem;
    text-align: center;
    padding: 0 0 15px;
}

#bookingOptions .dinner-tunes {
    font-size: 5rem;
}

#bookingOptions .event-info {
    text-transform: uppercase;
    display: flex;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin-bottom: 8px;
    gap: 8px;
 }
 
  .override-page h3, .override-page p {
   text-align: center;
 }

  .override-page a  {
     text-align: right;
   }
 
  #bookingOptions .event-info .info {
    color: rgb(232, 186, 201);
    background-color: rgb(92, 44, 124);
    padding: 1rem;
    border-radius: 10px;
 }

 .dinner-booking .event-info .info {
   padding: .5rem 1rem 1rem!important;
  }

  .override-page .event-info {
    margin-bottom: 0!important;
    display: block;
    text-align: right;
 }

   #bookingOptions .event-info .date span {
    display: block;
    font-size: 3rem;
    margin-top: -5px;
    margin-bottom: 0.5rem;
 }

#bookingOptions .date {
    font-size: 1.5rem;
    width: 17.5%; 
    display: flex;
    -webkit-box-align: center;
    align-items: center;
}
 
 #bookingOptions .artists {
    width: 81.5%;
    text-align: left;
 }

 #bookingOptions .eat-heading {
    width: 100%;
    text-align: center;
 }

  #bookingOptions .eat-heading h1 {
    font-size: 6.1rem;
 }

   #bookingOptions .eat-heading h2 {
    font-size: 2.66rem;
    line-height: 3rem;
 }

 .eat-body a button {
   font-size: 1.5rem;
   line-height: 1.9rem;
 }

.eat-modal button svg, .dance-modal button svg {
  border: 3px solid #000!important;
  fill: #000!important;
}

.eat-modal button svg g, .dance-modal button svg g {
  fill: #000 !important;
}

.eat-modal button svg, .dance-modal button svg {
  filter: brightness(0);
}

.eat-modal .btn-wrapper-border button {
  color: #000000!important;
} 

.eat-modal .btn-wrapper button, .insta {
  background-color: #000000!important;
}

.eat-modal .btn-wrapper button, .eat-modal .btn-wrapper-border button {
  border: 2px solid #000000!important;
} 
 
 .tent .artists {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
 }

 .tent .event-name {
   font-size: 5rem!important;
 }
  
 #bookingOptions .artists h3 {
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.4;
 }
 
  #bookingOptions .artists h3 span {
    font-weight: 700;
 }
 
  #bookingOptions .artists h3:first-child {
    margin-bottom: 1rem;
 }

  .tent .artists h3:first-child {
   margin-bottom: 0!important;
 }
 
  #bookingOptions .events-button span {
    /*font-size: .8rem!important;*/
    display: block;
 }

   .eat-body .events-button span {
    font-size: 1rem!important;
 }

  #bookingOptions .ticket {
    display: inline!important;
    padding: 15px 15px 5px 15px;
   }

   .new-button-wrapper .events-button {
    padding-bottom: 13px;
}

  #bookingOptions .ticket .menu-btn:first-child {
    margin-right: 15px;
   }

  #bookingOptions .ticket .menu-btn:last-child {
    margin-left: 15px;
   }
 
   #bookingOptions .ticket span {
    font-size: 2.9rem !important
    line-height: 2rem;
    display: block;
 }

#bookingOptions .button-wrapper {
   display: flex;
   gap: 7px;
 }

 /*

 #bookingOptions button {
    display: inline;
    width: 100%;
    text-decoration: none;
}

#bookingOptions button a {
    width: 100%;
    padding: 50px 30px;
    margin-bottom: 10px; 
    font-size: 1.8rem;
    position: relative;
}

.tent button a {
  line-height: 1.2!important;
}

 */

#bookingOptions a {
    display: flex;
    width: 100%;
    text-decoration: none;
}

#bookingOptions a button {
    width: 100%;
    padding: 50px 30px;
    margin-bottom: 10px; 
    font-size: 1.8rem;
    position: relative;
}

.tent a button {
  line-height: 1.2!important;
}

.not-allowed {
  cursor: not-allowed;
  opacity: .6;
}

.not-allowed button {
  cursor: not-allowed;
}

/* NEW INTERMEDIARY STEP STYLES */

 .new-button-wrapper .events-button {
    width: 50%;
    display: grid; 
    padding: 15px;
    background: #e6b0c2;
    cursor: auto;
    border-radius: 10px;
 }

 .new-button-wrapper a {
    display: block!important;
    width: 100%;
    text-decoration: none;
}

.new-button-wrapper .details, .box .details {
  display: flex;
}

.schedule-box .details {
    display: block !important;
    max-width: 75px!important;
}

.new-button-wrapper .details span, .box .details span {
  font-size:  1rem;
  flex-grow: 1;
}

.new-button-wrapper .cusine {
  font-size:  .9rem;
  margin: 15px 0; 
}

.new-button-wrapper .time {
    font-style: italic;
}

.new-button-wrapper .ticketNew {
    width: 100%;
    margin-top: 8px;
    font-size: 1.5rem!important;
}

#override-page .override-btn {
  background: rgb(0, 244, 91)!important;
  border: none!important;
  border-radius: 15px;
}

#override-page .siri-btn {
  pointer-events: none;
  cursor: not-allowed;
  background: grey !important;
}
.new-button-wrapper .ticketNew a {
    font-size: 2.5rem;
    line-height: 2.5rem;
  }

  .book-only-wrapper .ticketNew {
    margin-top: 0px;
  }

.new-button-wrapper .menu-btn {
    font-size: 1rem!important;
    display: inline!important;
    align-self: end !important;
    cursor: auto;
    pointer-events: none;
    height: 25px;
}

.new-button-wrapper span {
    font-size: 2.5rem !important;
    line-height: 2rem;
    padding-bottom: 5px;
}

.override-btn span {
    margin-bottom: 0!important;
    padding-bottom: 0!important;
    font-size: 1.5rem !important;
}

.new-button-wrapper .menu-btn span {
    font-size: 1rem !important;
    cursor: pointer;
    display: inline !important;
    pointer-events: auto;
}

.book-wrapper {
    margin: 20px 0 10px;
    width: 100%;
    padding: 10px 5px 15px;
    background: rgb(232, 186, 201);
    border: 2px dotted rgb(92, 44, 124);
    border-radius: 10px;
}

.book-wrapper .button-wrapper-bottom a {
  text-align: center!important;
  margin-top: 10px!important;
}

.book-wrapper .button-wrapper-bottom a span {
  text-align: center!important;
  font-size: 1.2rem!important;
  margin-top: 10px;
}

.book-wrapper .ticket {
  padding: 15px!important;
}

.book-wrapper .details {
  padding-bottom: 0!important;
}

.book-wrapper .new-events-button {
  margin: 0 0 0 10px;
}

.dinner-booking .eat-heading {
  margin-bottom: 20px;
}

.dinner-booking .book-wrapper {
  margin-top 5px;
}

.dinner-booking .tags {
  margin: 0 0 10px!important;
  text-align: center;
}

.dinner-booking .view-menu {
    width: 100% !important;
}

.new-button-wrapper .events-button {
    background: rgb(230, 176, 194);
    border: none;
    border-radius: 5px;
    transition: 0.3s;
    color: rgb(92, 44, 124)!important;
    border: 2px solid rgb(92, 44, 124) !important;
}

.new-button-wrapper .events-button:hover {
    background: rgb(92, 44, 124)!important;
    color: rgb(230, 176, 194)!important;
}

.new-button-wrapper .events-button:hover span {
    color: rgb(230, 176, 194)!important;
}

.new-button-wrapper .events-button:hover span, .new-button-wrapper .events-button:hover p {
    color: rgb(230, 176, 194)!important;
}

.view-menu {
  width: 97%!important;
  font-size: 1.8rem !important;
  margin-bottom: 10px!important;
}

.view-menu span {
  font-size: 1.8rem !important;
  padding-bottom: 2px;
}

.book-wrapper .ticket {
  margin: 0 10px 0 0;
}

.book-wrapper .new-button-wrapper .space {
  font-weight: 700!important;
}

.new-button-wrapper p {
  padding-bottom: 10px;
  font-weight: 500;
  font-size: 1.1rem;
}

.new-button-wrapper .details span {
  font-size: 1rem!important;
}

.new-button-wrapper .space {
  font-weight: 500;
  font-size: 1.8rem !important;
  padding-top: 0.5rem;
}

.new-button-wrapper .dotted-divider {
    height: 2px;
    width: 100%;
    border-bottom: 1.5px dotted;
    margin: 0 0 10px 0 !important;
    padding: 0 !important;
    align-self: end !important;
}

.new-button-wrapper .first-divider {
  margin-bottom: -10px !important;
}

.override-btn .dotted-divider, .override-btn .first-divider {
    margin: 10px 0!important;
}

.new-button-wrapper a, .new-button-wrapper a:hover, .new-button-wrapper a:focus {
  color: rgb(92, 44, 124);
}

.full-width-btn .events-button {
    width: 100%;
}

.full-width-btn .first-divider {
    margin-bottom: 0!important;
}

.override-box {
  text-align: right!important;
}

.override-box h2 {
  text-align: right!important;
  font-size: 2rem;
  margin-top: 1rem;
}

.override-box h4 {
  text-align: right!important;
  font-size: 1.7rem;
  margin-bottom: 1rem;
}

.override-box h5 {
  text-align: right!important;
  font-size: 1.5rem;
  margin-top: 1rem;
}

.override-box .links {
  font-size: 1.3rem;
}

.override-box .override-footer {
  text-align: right!important;
  font-size: 0.8rem!important; 
  font-style: italic;
}

.override-box hr {
    border-top: 2px solid rgb(76, 2, 27);
}

.override-box .sold-out {
  pointer-events: none;
  cursor: not-allowed;
}

.override-box .links {
    margin-bottom: 2rem;
}

.override-box .footer-link {
 margin-bottom: 0!important;
}

.override-box .override-dietary {
  margin-bottom: 0!important;
}

/* Nocturn general page */

.subscribe .bookings-iframe {
    height: 60% !important;
    margin: 0 auto 20px auto!important;
}

#subscribe-form .text-input-field {
     font-size: 13px!important;
    border-top: 0px!important;
    border-left: 0px!important;
    border-right: 0px!important;
    padding: 0px!important;
    margin-top: 0px!important;
    height: 40px!important;
}

/* Hide EXPLORE OVERRIDE btn */
.button-wrapper.new-button-wrapper.button-wrapper-bottom a:nth-of-type(2)  {
  display: none;
}

.dinner-first {
    font-weight: 500;
    line-height: 1.3;
}

.dinner-bottom {
    text-align: center;
    margin-bottom: 20px;
}

/* NEW INT STEP STYLES */

/* Common Styles using CSS Variables */
.thursday, .friday, .saturday {
  --bg-color: initial;
  --text-color: initial;
  --accent-color: initial;
  background-color: var(--bg-color);
}

.thursday #bookingOptions,
.friday #bookingOptions,
.saturday #bookingOptions {
  margin-bottom: 30px;
  top: 4%;
}

.thursday #bookingOptions .event-name,
.friday #bookingOptions .event-name,
.saturday #bookingOptions .event-name {
  color: var(--accent-color);
}

.thursday #bookingOptions .event-info .info,
.friday #bookingOptions .event-info .info,
.saturday #bookingOptions .event-info .info {
  color: var(--bg-color);
  background-color: var(--accent-color);
  border-radius: 5px;
}

.thursday .book-wrapper,
.friday .book-wrapper,
.saturday .book-wrapper {
  background: var(--bg-color);
  border: 2px dotted var(--accent-color);
  border-radius: 5px;
}

.thursday .book-wrapper h3,
.friday .book-wrapper h3,
.saturday .book-wrapper h3,
.thursday h4,
.friday h4,
.saturday h4 {
  text-align: center;
  margin: 15px 0px -3px;
  color: var(--accent-color);
}

.thursday h4,
.friday h4,
.saturday h4 {
  font-size: 1.5rem;
  margin: 0px!important;
  padding: 0px!important;
}

.thursday .override-heading h2,
.friday .override-heading h2,
.saturday .override-heading h2 {
  color: var(--accent-color);
  font-size: 4rem;
}

.thursday .override-heading h2 span,
.friday .override-heading h2 span,
.saturday .override-heading h2 span {
  font-style: italic;
}

.thursday .new-button-wrapper .events-button,
.friday .new-button-wrapper .events-button,
.saturday .new-button-wrapper .events-button {
  background: #000;
  color: #fff !important;
  border: none;
  border-radius: 5px;
  transition: all 0.3s ease;
  border: none!important;
}

.thursday .new-button-wrapper .events-button:hover,
.friday .new-button-wrapper .events-button:hover,
.saturday .new-button-wrapper .events-button:hover {
  background: #fff!important;
  color: #000 !important;
}

.thursday .new-button-wrapper p,
.friday .new-button-wrapper p,
.saturday .new-button-wrapper p {
  color: #fff !important;
}

.thursday .new-button-wrapper .events-button .space,
.friday .new-button-wrapper .events-button .space,
.saturday .new-button-wrapper .events-button .space,
.thursday .new-button-wrapper .events-button .time,
.friday .new-button-wrapper .events-button .time,
.saturday .new-button-wrapper .events-button .time,
.thursday .new-button-wrapper .events-button .details span,
.friday .new-button-wrapper .events-button .details span,
.saturday .new-button-wrapper .events-button .details span,
.thursday .new-button-wrapper .ticketNew a,
.friday .new-button-wrapper .ticketNew a,
.saturday .new-button-wrapper .ticketNew a {
  color: #fff;
}

.thursday .new-button-wrapper .events-button:hover .space,
.friday .new-button-wrapper .events-button:hover .space,
.saturday .new-button-wrapper .events-button:hover .space,
.thursday .new-button-wrapper .events-button:hover .time,
.friday .new-button-wrapper .events-button:hover .time,
.saturday .new-button-wrapper .events-button:hover .time,
.thursday .new-button-wrapper .events-button:hover .details span,
.friday .new-button-wrapper .events-button:hover .details span,
.saturday .new-button-wrapper .events-button:hover .details span,
.thursday .new-button-wrapper .events-button:hover .btn-tagline,
.friday .new-button-wrapper .events-button:hover .btn-tagline,
.saturday .new-button-wrapper .events-button:hover .btn-tagline,
.thursday .new-button-wrapper .ticketNew:hover a,
.friday .new-button-wrapper .ticketNew:hover a,
.saturday .new-button-wrapper .ticketNew:hover a {
  color: #000 !important;
}

.thursday .book-wrapper .button-wrapper-bottom a span,
.friday .book-wrapper .button-wrapper-bottom a span,
.saturday .book-wrapper .button-wrapper-bottom a span {
  color: #000 !important;
  font-size: 1rem!important;
}

.thursday .book-wrapper .button-wrapper-bottom a span:hover, 
.friday .book-wrapper .button-wrapper-bottom a span:hover, 
.saturday .book-wrapper .button-wrapper-bottom a span:hover {
  color: #fff !important;
}

.thursday .button-wrapper.new-button-wrapper.button-wrapper-bottom a:nth-of-type(2),
.friday .button-wrapper.new-button-wrapper.button-wrapper-bottom a:nth-of-type(2),
.saturday .button-wrapper.new-button-wrapper.button-wrapper-bottom a:nth-of-type(2) {
  display: inline;
  margin: 60px;
}

/*.thursday .button-wrapper-bottom,
.friday .button-wrapper-bottom,
.saturday .button-wrapper-bottom {
  margin-top: 10px;
  display: inline-block !important;
  text-align: center !important;
  width: 100%;
}*/

.thursday .button-wrapper-bottom a span,
.friday .button-wrapper-bottom a span,
.saturday .button-wrapper-bottom a span{
    margin-top: 10px;
    text-align: center !important;
    font-size: 1.2rem !important;
}

.thursday .day,
.friday .day,
.saturday .day {
    font-size: 2rem !important;
    text-decoration: underline;
    font-style: italic; 
}

.thursday .view-menu a span,
.friday .view-menu a span,
.saturday .view-menu a span {
  color: #ffffff;
}

.thursday .view-menu,
.friday .view-menu,
.saturday .view-menu {
    margin-bottom: 7px !important;
}

.thursday .button-wrapper-new,
.friday .button-wrapper-new,
.saturday .button-wrapper-new {
    display: flex
    gap: 7px;
    text-align: center;
    margin: 10px 0;
}

.thursday .button-wrapper-new a span,
.friday .button-wrapper-new a span,
.saturday .button-wrapper-new a span {
  color: #000!important;
  font-size: 1.2rem !important;
}

.thursday .button-wrapper-new a:hover span,
.friday .button-wrapper-new a:hover span,
.saturday .button-wrapper-new a:hover span {
  color: #fff!important;
}

.thursday .btn-tagline,
.friday .btn-tagline,
.saturday .btn-tagline {
  font-size: 0.9rem!important;
}

/* Color Customization Per Day */

.thursday {
  --bg-color: #00ff00;
  --accent-color: #ff00e5;
  --text-color: #000000;
}

.friday {
  --bg-color: #fb0000;
  --accent-color: #1dfffe;
  --text-color: #000000;
}

.saturday {
  --bg-color: #ff00e5; 
  --accent-color: #ccfe35;
  --text-color: #000000;
}

/* Category font size */
.thursday .event-name {
  font-size: 6.5rem!important;
}

.friday .event-name {
    font-size: 7.8rem!important;
}

.saturday .event-name {
  font-size: 8rem!important;
}

.btn-tagline {
    font-size: 0.9rem!important;
    border: 1px solid;
    border-radius: 5px;
    padding-bottom: 1px !important;
}

 .tags {
    border-radius: 5px;
    margin: .7rem;
  }

   .tags h3 {
    margin: 5px 0px;
    padding: 5px;
  }

  .tags {
    border-radius: 5px;
    margin: .7rem;
    color: rgb(232, 186, 201);
    background-color: rgb(92, 44, 124);
  }

  .concept {
    display: none;
  }

  .thursday .tags {
    color: var(--bg-color)!important;
    background-color: var(--accent-color);
  }

  .friday .tags {
    color: var(--bg-color)!important;
    background-color: var(--accent-color);
  }

  .saturday .tags {
    color: var(--bg-color)!important;
    background-color: var(--accent-color);
  }

  .thursday .tags h3 {
    color: var(--bg-color)!important;
    padding: 5px;
  }

  .friday .tags h3 {
    color: var(--bg-color)!important;
    padding: 5px;
  }

  .saturday .tags h3 {
    color: var(--bg-color)!important;
    padding: 5px;
  }

  .thursday .book-wrapper, .friday .book-wrapper, .saturday .book-wrapper {
    padding: 10px 5px 5px;
  }
  
/* DANCE MODAL STYLES */

.dance-popup {
    background-image: url(/images/dance_bg_image.png);
    background-size: cover;
    background-position: center 15px;
    background-repeat: no-repeat;
    overflow: unset;
    border: 10px solid #fff;
    background-color: #000!important;
}

.dance-popup strong {
    font-weight: 600;
    font-style: italic;
}

.dance-popup img {
  width: 100%;
  height: auto;
  display: block;
  max-width: 100%;
  object-fit: contain;
}

.dance-title {
    font-size: 2.5rem !important;
    color: #fff!important;
    margin-top: 5px!important;
    margin-bottom: 20px!important;
    text-align: center!important;
}

.dance-title::before,
.dance-title::after {
  content: '*';        
}
    
.dance-title::before {
  margin-right: .25em; 
}
    
.dance-title::after  {
  margin-left:  .25em; 
}

.eat-note.dance-popup h2 {
    display: block;
    padding: 10px 20px;
    border-radius: 50px;
    font-size: 1.5rem !important;
    color: rgb(0, 0, 0) !important;
    background: rgb(255, 255, 255) !important;
    width: fit-content;
    margin: 0 auto;
    text-align: center;
}

.dance-popup .open-time {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #fff;
    font-style: italic;
    border: none!important;
    padding: 0!important;
}

.dance-popup p {
    font-size: .9rem;
    font-weight: 100;
    margin-bottom: .6rem;
    line-height: 20px;
    text-transform: uppercase;
    text-align: center;
    color: white !important;
}

.dance-popup p span {
  font-weight: 600;
}

.dance-popup {
  min-height: 650px;
}

.dance-popup h3 {
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  padding: 10px 20px;
  border-radius: 50px;
  display: block;
  border: 1px solid #ffffff;
  width: fit-content;
  margin: 20px auto;
  text-align: center;
}

.dance-popup a {
  color: #f972af!important;
  text-decoration: underline!important;
}

.dance-popup a:hover {
  color: #f972af!important;
  text-decoration: none!important;
}

.dance-popup .italic-word {
  font-style: italic;
  font-weight: 100;
}

.dance-popup .thu .group-item {
  color: #00ff00;
}

.dance-popup .fri .group-item {
  color: #fb0000;
}

.dance-popup .sat .group-item {
  color: #ff00e5;
}

.dance-popup .category {
  margin-top: 3rem;
}

.dance-popup .category p {
  text-transform: none; 
}

.dance-popup .category.thu {
  margin-top: 40%;
}

.cat-wrapper {
    position: absolute;
    top: 0;
    left: 0px;
    padding: 15px 15px 40px 25px;
    height: 100%;
    overflow: hidden;
}

.cat-scroll {
    height: 100%;
    overflow-y: scroll;
    scroll-behavior: smooth;
    padding-right: 5px;
}

.dance-popup::-webkit-scrollbar,
.cat-scroll::-webkit-scrollbar {
  width: 6px;
}

.dance-popup::-webkit-scrollbar-track,
.cat-scroll::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}

.dance-popup::-webkit-scrollbar-thumb,
.cat-scroll::-webkit-scrollbar-thumb {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

.mobile-only {
    display: none!important;
}

.desktop-only {
    display: flex!important;
 }

@media only screen and (min-device-width: 1024px) { 

  .thursday .day-category,
  .friday .day-category,
  .saturday .day-category {
    display: block!important;
  }
  
  .thursday .day-category span,
  .friday .day-category span,
  .saturday .day-category span {
    display: block!important;
  }
}

/* Hide explore Override button */

.button-wrapper.new-button-wrapper.button-wrapper-bottom .explore-override {
  display: none!important;
}

.thursday .new-button-wrapper .events-button:hover span,
.friday .new-button-wrapper .events-button:hover span,
.saturday .new-button-wrapper .events-button:hover span {
  color: #000000!important;
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    flex: 100%;
    max-width: 100%;
  }
}

/* Media Query for Mobile Devices */
  // For Iphone Pro 14 MAX and similar screen sizes  
    @media only screen and (max-device-width: 1024px) { 

    #bookingOptions .guest-chef-title {
      font-size: 2rem!important;
    }
   
  #bookingOptions .ticket .dotted-divider {
    margin-bottom: 5px!important;
   }
    
    #bookingOptions .event-info .date {
      padding-bottom: 0.3rem!important;
    }

       #bookingOptions .event-info .date span {
          display: inline;
          font-size: 1.5rem;
       }

      #bookingOptions .event-info .date span:after {
          content: "//";
          padding: 0 5px;
          font-size: 1.3rem;
       }

    .new-button-wrapper .first-divider {
      margin-bottom: auto!important;
    }
     .new-button-wrapper .events-button {
        width: 100%;
     }
     
     .new-button-wrapper .ticketNew {
        margin-top: 0;
      }

      .new-button-wrapper .ticketNew a {
        font-size: 1.5rem;
      }

      .new-button-wrapper .events-button {
        padding: 10px 5px!important;
      }

      .dinner-info {
        display: block!important;
        margin-bottom: 10px;
      }

       .dinner-circle {
        display: none!important;
      }

      .new-button-wrapper .details span {
        font-size: 1rem !important;
      }  

      .new-button-wrapper span {
        line-height: 1.2rem;
        font-size: 1.7rem!important;
      }

      .override-btn span {
        font-size: 1.4rem !important;
      }

      .override-btn time {
        margin-top: .3rem;
        font-size: 1.2rem !important;
      }

      #override-page .takeover-date {
          top: 21px;
          font-size: 1.7rem!important;
      }

      .override-heading {
          margin: 0px 0px 10px;
      }

      .override-heading h2 {
          font-size: 1.4rem;
      }

      .new-button-wrapper .cusine {
        font-size: 0.7rem;
      }
      
      .new-button-wrapper .menu-btn {
        padding-top: 5px;
      }

      .new-button-wrapper p {
          font-size: 1rem;
          padding-bottom: 0!important;
      }

      .book-wrapper {
        margin-bottom: 17px;
        padding: 10px 10px 15px
      }
      
      .dinner-options {
        padding: 10px 10px 0px;
      }
      
      .book-wrapper .button-wrapper-bottom a {
        display: block!important;
      }

     .book-wrapper .button-wrapper-bottom a {
        text-align: center!important;
        margin-top: 5px!important;
      }
      
      .book-wrapper .button-wrapper-bottom a span {
        font-size: 1rem !important;
      }

      .book-wrapper .new-events-button, .book-wrapper .ticket {
        margin: 0!important;
      }
      
       .bookings-body-text {
          max-width: none;
        }
        .bookings-heading-0, .bookings-heading-1, .bookings-heading-2 {
          font-size: .8rem;
          margin-top: 1rem;
          margin-bottom: .5rem;
        }

        .bookings-heading-0 {
          margin-top: .5rem;
        }

        .bookings-body-text ul li {
          font-size: .5rem;
          line-height: 10px;
          margin-bottom: .3rem;
        }

        .eat-note {
          max-height: 375px;
        }
        
        .eat-note h1 {
          font-size: 2.3rem;
        }
        
        .eat-note h2 {
          font-size: .7rem;
        }

        .booking-heading {
            font-size: 15px;
            margin-bottom: 10px;
            max-width: 100%;
            line-height: 1.2rem;
        }

        .header-address {
          font-size: .7rem!important;
        }

        .schedule-box .details span {
          font-size: .8rem!important;
        }

        .schedule-box .details {
          font-size: .7rem!important;
        }
                
        .box h2 {
          font-size: 1.2rem;
        }

       .chef-studio h2 {
          font-size: 1.6rem;
        }

        .subscribe .bookings-iframe {
          height: 30% !important;
          margin: 0 auto!important;
        }
        
        .insta {
          display: block;
          position: absolute;
          top: 0;
          transform: none;
          right: 16px;
          background-color: #5C2C7C;
          width: 48px;
          height: 41px!important;
          padding: 8px;
          border-left: 8px solid #e8bac9;
        }
        
      #bookingOptions {
            width: 300px;
            top: 2%;
        }
        
        #bookingOptions .event-name {
          font-size: 2.5rem!important;
        }

        #bookingOptions .override {
            font-size: 3.8rem!important;
        }
        
        #bookingOptions .event-info {
            display: block;
            margin-bottom: 0.5rem;
        }
        
       #bookingOptions .event-info .info {
          padding: .3rem .5rem .5rem .5rem;
        }
        
        #bookingOptions .date {
          text-align: center;
          font-size: 2.4;
          margin-bottom: .3rem;
          width: 100%;
          display: block;
          padding: 0.3rem 1rem;
        }
        
        #bookingOptions .artists {
            width: 100%!important;
        }
        
       #bookingOptions .artists span {
         display: block;
        }
        
       #bookingOptions .artists span b {
         display: none;
        }
        
       #bookingOptions .artists h3 {
            font-size: 1rem;
        }
        
        #bookingOptions .artists h3:first-child {
          margin-bottom: .5rem;
        }
        
        #bookingOptions .artists h3 span {
            font-size: 1.2rem;
            line-height: 1.5;
        }
        
        #bookingOptions .button-wrapper {
          display: block;
        }

        #bookingOptions button {
            font-size: 1rem!important;
            margin-bottom: .6rem!important;
       }

        #bookingOptions .focal-point-presents {
          font-size: 2.7rem
        }

        #bookingOptions .mid-summer {
          font-size: 3rem;
        }

        #bookingOptions .cny {
          font-size: 1.5rem;
        }

        #bookingOptions .dinner-tunes {
           font-size: 2.5rem;
        }
        
        .tent .event-name {
          font-size: 2.1rem !important;
        }

        .tent a button {
          padding: 20px 30px!important;
      }

        #bookingOptions .eat-heading h1 {
          font-size: 2.5rem;
       }

       #bookingOptions .eat-heading h2 {
          font-size: 1.1rem;
          line-height: 1.7rem;
       }

       .new-button-wrapper .menu-btn span {
        font-size: 1rem !important;
      }

    .new-button-wrapper .space {
        padding-top: 0.2rem;
        font-size: 1.3rem !important;
      }
     
     .new-button-wrapper .premium-menu-btn {
        display: block!important;
        margin-left: 0!important;
      }

      .new-button-wrapper .dotted-divider {
        margin: 0px!important;
      }

      .override-btn .dotted-divider {
          margin: 10px 0 !important;
      }  

      .override-btn a {
          font-size: 1.7rem !important;
          line-height: 2rem !important;
      } 

      .override-footnote {
          font-size: .9rem !important;
      }

      .override-box h2 {
        font-size: 1.1rem;
      }

      .override-box h4 {
          font-size: .9rem;
          margin-bottom: .5rem;
      }

      .override-box h5 {
        font-size: .8rem;
        margin-top: .5rem;
        margin-bottom: .5rem;
    }

    .override-box .links {
        margin-bottom: .5rem;
        font-size: .8rem;
    }

    .override-box .override-footer {
      font-size: 0.7rem !important;
    }    
    
    .override-box .footer-link {
      margin-bottom: 0!important;
    }

    /* Dance styles */

    .dance-popup {
      min-height: 500px;
    }

    .eat-note.dance-popup h2 {
      padding: 5px 10px;
      margin-bottom: 1rem!important;
      font-size: .8rem !important;
      color: #000000!important;
    }

.dance-popup .open-time {
    font-size: .7rem!important;
    margin: .5rem auto 1rem;
    text-align: center;
    color: rgb(255, 255, 255);
    font-style: italic;
    border: none !important;
    padding: 0px !important;
}

  .dance-modal {
    top: 50px!important;
  }

  .dance-popup {
    background-position: center 50px!important;
    background-color: #000!important;
  }

    .dance-popup h2 span {
      font-size: .9rem;
    }

    .dance-popup p {
        font-size: 0.6rem;
        line-height: 2;
    }

    .dance-popup h3 {
      font-size: .7rem;
      padding: 5px 10px;
    }

    .dance-popup .category {
      margin-top: 1rem;
    }

    .cat-wrapper {
      height: 200px;
    }

    .thursday #bookingOptions,
    .friday #bookingOptions,
    .saturday #bookingOptions {
      top: 2%;
    }

    .thursday .cat span,
    .friday .cat span,
    .saturday .cat span {
      display: block;
      font-weight: 100!important;
    }

    .thursday .override-heading h2, .friday .override-heading h2, .saturday .override-heading h2 {
      font-size: 26px;
    } 

    .thursday .button-wrapper-bottom, .friday .button-wrapper-bottom, .saturday .button-wrapper-bottom {
      margin-top: 0;
    }

    .thursday h4, .friday h4, .saturday h4 {
      font-size: 1.4rem;
    }

    .thursday .mobile-only .menu-btn span,
    .friday .mobile-only .menu-btn span,
    .saturday .mobile-only .menu-btn span {
      color: #000!important;
    }
    
    .thursday .book-wrapper, .friday .book-wrapper, .saturday .book-wrapper {
      padding: 10px 5px 0px;
    }

    .thursday .override-heading .time,
    .friday .override-heading .time,
    .saturday .override-heading .time {
      color: var(--accent-color);
      text-align: center;
      margin: 5px 0 -5px;
      font-style: italic;
      font-weight: 100;
    }

    .or {
        font-style: italic !important;
        margin: 10px 0px -10px !important;
        text-align: center;
        color: var(--accent-color);
        font-size: 2rem;
    }

    .tags {
      margin: 0 0 15px 0;
      width: 100%!important;
    }

    tags h3 {
      padding: 10px;
    }

    /* add asterisks around every <span> inside .tags > h3 */
    .tags h3 span::before,
    .tags h3 span::after {
      content: '*';        
    }
    
    /* (optional) small spacing so the asterisks don’t touch the text */
    .tags h3 span::before {
      margin-right: .25em; 
    }
    
    .tags h3 span::after  {
      margin-left:  .25em; 
    }

    .eat-heading {
      margin-bottom: 20px;
    }

    .book-wrapper h3,
    .dinner-booking h3 {
      text-align: center!important;
    }

    .view-menu {
        width: 100% !important;
    }

    .view-menu span {
      font-size: 1.3rem !important;
      padding-bottom: 2px;
    }

    button {
      margin-bottom: 10px;
    }

    .dinner-booking h3 span,
    .thursday .book-wrapper h3 span,
    .friday .book-wrapper h3 span,
    .saturday .book-wrapper h3 span {
      display: block;
    }

    .dinner-booking h3 .dot, 
    .thursday .book-wrapper h3 .dot,
    .friday .book-wrapper h3 .dot,
    .saturday .book-wrapper h3 .dot {
      display: none;
    }

     .dinner-booking .event-info .info {
       padding: 1rem!important;
    }
    .thursday .new-button-wrapper .ticketNew a,
    .friday .new-button-wrapper .ticketNew a,
    .saturday .new-button-wrapper .ticketNew a {
      font-size: 1.2rem;
    }

  body.thursday .button-wrapper.new-button-wrapper.button-wrapper-bottom a:nth-of-type(2),
  body.friday .button-wrapper.new-button-wrapper.button-wrapper-bottom a:nth-of-type(2),
  body.saturday .button-wrapper.new-button-wrapper.button-wrapper-bottom a:nth-of-type(2) {
      display: inline-block !important;
      margin: 5px 0px 0px 0px !important;
  }

  .mobile-only {
       margin: 0 0 10px;
       display: block!important;
    }

     .mobile-only  .menu-btn {
        padding-top: 5px;
        margin-bottom: 10px;
        display: block !important;
        text-align: center;
    }

  .desktop-only {
       display: none!important;
    }

         .dinner-booking .event-info .info {
        padding:0.5rem !important;
      }

      .dinner-booking .eat-heading h1 {
          font-size: 2.1rem!important;
       }

       .dinner-booking .eat-heading h2 {
          font-size: 1rem!important;
          line-height: 1.7rem!important;
       }
}

${reset}

html {
  overflow: hidden;
  height: -webkit-fill-available;
}

  body {
    color: #5c2c7c;
    width: 100vw;
    background: #e8bac9;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    overflow: hidden;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    font-family: Space Mono, sans-serif;
    font-weight: 700;
  }

.overlay {
  position: absolute;
  z-Index: 99;
}

.overlay-hover {
  /* position: absolute; */
  z-Index: 9;

  div {
    position: absolute;
    top: 0;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    
  }
}
`;

export const Marginals = css`
  box-sizing: border-box;
  display: flex;
  pointer-events: none;
  position: fixed;
  width: 100vw;
  z-index: 1;
`;
