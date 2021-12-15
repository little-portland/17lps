import styled, { createGlobalStyle, css } from "styled-components";

export const breakpoints = {
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
};

export const GlobalStyle = createGlobalStyle`
  body {
    color: #5c2c7c;
    background: #e8bac9;
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    font-family: 'Work Sans', sans-serif;
    font-weight: 500;
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

export const Button = styled.button`
  font-family: "Work Sans", sans-serif;
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  background: none;
  border: 2px solid #fbfbfb;
  border-radius: 100%;
  cursor: pointer;
  color: #fbfbfb;
  font-size: 34px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
  padding: 25px 0 20px 0;
  width: 300px;
  z-index: 1;
  cursor: pointer;

  @media (max-width: 700px) {
    font-size: 24px;
    width: 220px;
  }
`;
