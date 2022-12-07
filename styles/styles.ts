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
  margin-bottom: 1.5rem;
}

.bookings-heading-1, .bookings-heading-2 {
  font-family: "Space Mono" !important;
  font-weight: 900;
  font-style: normal;
  font-size: 1.1rem;
  text-transform: uppercase;
}

.bookings-heading-1 {
  margin-top: 1rem;
}

.bookings-heading-2 {
  margin-top: 2rem;
}

.bookings-body-text ul {
  list-style-type:square;
  margin: 15px;
}

.bookings-body-text ul li {
  font-size: .8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 20px;
}

/* Media Query for Mobile Devices */
  // For Iphone Pro 14 MAX and similar screen sizes  
    @media only screen and (max-device-width: 1024px) { 
       .bookings-body-text {
          max-width: none;
        }
        .bookings-heading-1, .bookings-heading-2 {
          font-size: .8rem;
          margin-top: 1rem;
          margin-bottom: .5rem;
        }

        .bookings-heading-1 {
          margin-top: .5rem;
        }

        .bookings-body-text ul li {
          font-size: .5rem;
          line-height: 10px;
          margin-bottom: .3rem;
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
