import styled from "styled-components";
import { breakpoints } from "styles/styles";

export const CenterContainerStyle = styled.div`

position: absolute;
left: 0;
right: 0;
width: 100vw;
height: 100vh;
display: grid;
place-items: center;

img {
    display: block;
    width: auto;
    height: auto;
    max-width: 50vw;

    //Change to 70
    max-height: 70vh;

    @media (max-width: ${breakpoints.m}px) {
      max-width: 80vw;
    }
  }
`