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
    width: 600px;
    top: 40%;
    left: 50%;
    transform: translate(-50%);
}

#bookingOptions a {
    display: inline-block;
    width: 100%;
}

#bookingOptions a button {
    width: 100%;
    padding: 15px 30px;
    margin-bottom: 10px
}

/* Media Query for Mobile Devices */
  // For Iphone Pro 14 MAX and similar screen sizes  
    @media only screen and (max-device-width: 1024px) { 
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
        }

        #bookingOptions buton {
            font-size: .9rem;
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
