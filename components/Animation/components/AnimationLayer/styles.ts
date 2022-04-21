import styled from "styled-components";
import { breakpoints } from "styles/styles";

export const OverlayHover = styled.div`

    div {
      height: 100vh;
      width: 100vw;
      position: absolute;
      top: 50%;  
      left: 50%; 
      transform: translate(-50%, -50%);
      z-index: 9999999;

      @media (max-width: ${breakpoints.m}px) {
        height: 100%;
      }
      
    }
  
`;