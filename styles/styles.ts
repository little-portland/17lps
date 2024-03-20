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
  background-color: #acd8c7;
  margin-bottom: 1.5rem;
  color: #4c021b;
  max-height: 510px;
  max-width: 550px;
  overflow: auto;
}

@media (min-width: 768px) {
  .eat-note {
    min-width: 550px;
  }
}

.eat-note h1 {
  color: #48021a;
  font-size: 3rem;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: .3rem;
}
.eat-note h2 {
  color: #fa4882;
  font-size: 1rem;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 1rem;
}
.eat-note h3 {
  font-size: 1rem;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 1rem;
}

.eat-note h4 {
  color: #fa4882;
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
  color: #fa4882;
  text-decoration: none;
  cursor: pointer;
}

.eat-note a:hover {
  color: #5C2C7C;
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
  color: #48021a;
  text-align: left;
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
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
  border: 2px solid #48021a;
  padding: 20px;
  margin-bottom: 20px;
}

.box-2 {
  padding: 20px 20px 5px 20px;
}

.box-3 {
  margin-bottom: 0;
}

.eat-note p {
  font-size: .8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 15px;
}

.eat-note .links {
  margin-bottom: 0;
}

.eat-note ul {
  list-style-image: url('/images/food-tray.svg');
  margin: 10px 15px;
}

.eat-note ul li {
  font-size: .8rem;
  font-weight: 600;
  padding-left: 5px;
  margin-bottom: 0rem;
  line-height: 20px;
}

.eat-note ul li::marker {
  font-size: 20px;
}

::-webkit-scrollbar {
  width: 6px;
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
    top: 12%;
    left: 50%;
    transform: translateX(-50%);
    text-transform: uppercase;
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

#bookingOptions .openlab-presents,  #bookingOptions .friday-residents {
    font-size: 4.4rem;
}

#bookingOptions .balearic-electric-openlab {
    font-size: 2.5rem;
}

#bookingOptions .focal-point-presents {
  font-size: 3.57rem
}

#bookingOptions .disco-saturdays {
    font-size: 4.7rem;
}

#bookingOptions .urban-future {
    font-size: 5.9rem;
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
    font-size: 6rem;
}

#bookingOptions .event-info {
    text-transform: uppercase;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: .4rem;
 }
 
  #bookingOptions .event-info .info {
    color: rgb(232, 186, 201);
    background-color: rgb(92, 44, 124);
    padding: 1rem;
 }

   #bookingOptions .event-info .date span {
    display: block;
    font-size: 4.2rem;
    margin-bottom: 0.5rem;
 }

#bookingOptions .date {
    font-size: 2.07rem;
    align-items: center;
    width: 22%;
    display: flex;
}
 
 #bookingOptions .artists {
    width: 77%;
    text-align: left;
 }

 #bookingOptions .eat-heading {
    width: 100%;
    text-align: center;
 }

  #bookingOptions .eat-heading h1 {
    font-size: 11.3rem;
    line-height: 10rem;
 }

   #bookingOptions .eat-heading h2 {
    font-size: 2rem;
    line-height: 3rem;
 }

 .eat-body a button {
   font-size: 1.5rem;
   line-height: 1.9rem;
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
 
   #bookingOptions .ticket span {
    font-size: 2.9rem !important
    line-height: 2rem;
    display: block;
 }

#bookingOptions .button-wrapper {
   display: flex;
   gap: 5px;
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
    display: inline-block; 
    padding: 15px;
    background: #e6b0c2;
    cursor: auto;
 }

 .new-button-wrapper a {
    display: block!important;
    width: 100%;
    text-decoration: none;
}

.new-button-wrapper .details span {
  font-size:  1rem;
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
    margin-top: 5px;
    font-size: 1.5rem!important;
}

.new-button-wrapper .ticketNew a {
    font-size: 2.5rem;
    line-height: 2rem;
  }

.new-button-wrapper .book-link {
    border-bottom: 1.5px dotted;
}

.new-button-wrapper .menu-btn {
    padding-top: 10px;
    font-size: 1rem!important;
    display: inline!important;
}

.new-button-wrapper span {
    font-size: 2.9rem !important;
    line-height: 2rem;
    padding-bottom: 5px;
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
}

.new-button-wrapper a, .new-button-wrapper a:hover, .new-button-wrapper a:focus {
  color: rgb(92, 44, 124);
}

/* Media Query for Mobile Devices */
  // For Iphone Pro 14 MAX and similar screen sizes  
    @media only screen and (max-device-width: 1024px) { 
     .new-button-wrapper .events-button {
        width: 100%;
     }
     
     .new-button-wrapper .ticketNew {
        margin-top: 0;
      }

      .new-button-wrapper .events-button {
        padding: 5px;
      }

      .new-button-wrapper span {
        line-height: 1.2rem;
        font-size: 1rem!important;
      }

      .new-button-wrapper .cusine {
        font-size: 0.7rem;
      }
      
      .new-button-wrapper .menu-btn {
        padding-top: 5px;
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
        .box h2 {
          font-size: 1.2rem;
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
          font-size: 2.5rem;
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
            margin-bottom: .3rem!important;
       }
       
          #bookingOptions .ticket span {
            font-size: 1rem!important;
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
          font-size: 4.7rem;
          line-height: 5rem;
       }

       #bookingOptions .eat-heading h2 {
          font-size: 1rem;
          line-height: 1.7rem;
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
