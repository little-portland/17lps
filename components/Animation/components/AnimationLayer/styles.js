import styled from "styled-components";
import { breakpoints } from "styles/styles";

export const OverlayHover = styled.div`
  z-Index: 9;
  padding: 200px;

  div {
    position: absolute;
    top: 0;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  
  }
  
`;