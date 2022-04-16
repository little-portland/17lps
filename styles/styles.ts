import styled, { createGlobalStyle, css } from "styled-components";
import reset from 'styled-reset'

export const breakpoints = {
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
};

export const GlobalStyle = createGlobalStyle`

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
 }

${reset}

:root {
  --app-height: 100%;
}

html,
body {
    padding: 0;
    margin: 0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;

    @media not all and (hover:hover) {
        height: var(--app-height);
    }
}

  body {
    color: #5c2c7c;
    background: #e8bac9;
    // height: 100vh;
    // width: 100vw;
    // overflow-x: hidden;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    font-family: 'Space Mono', monospace, sans-serif;
    font-weight: 700;
  }

  .svgcontainer {
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    max-width: 100vw;
    display: flex;
  }

  // .svgclick {
  //   opacity: 0;
  //   transition: all 0.5s linear;
  // }

  // .svgclick.ghost {
  //   opacity: 0;
  // }

  .svgContainer {
  height: 100vh;
  width: 100vw;
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;
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

