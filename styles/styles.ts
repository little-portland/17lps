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
  font-style: medium;
  font-weight: normal;
  font-display: swap;
}


* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
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
