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

h1 {
  font-size: 1.3rem;
  text-transform: uppercase;
  text-align: center;
 }

span {
  font-size: .8rem;
  text-align: center;
  line-height: 1rem;
  font-weight: 100;
  margin-top: 1rem;
  display: inline-block;
}

@media (max-width: ${breakpoints.m}px) {
  padding: 32px;
}

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

export const IFrameContainerStyle = styled.div`
width: 60%;
height: 80vh;
placeItems: center;

div.dynamic-height-adjust {
  display: none;
}

@media (max-width: ${breakpoints.m}px) {
  width: 100%;
}

`;
