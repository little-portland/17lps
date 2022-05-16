import styled from "styled-components";
import { breakpoints } from "styles/styles";

export const CenterContainerStyle = styled.div`

position: absolute;
left: 0;
right: 0;
width: 100%;
height: 100%;
display: grid;
place-items: center;

padding: 64px;

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